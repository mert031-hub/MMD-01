"use client";

/**
 * IntroOverlay — cinematic video intro that seamlessly transitions
 * into the live website.
 *
 * Place your intro video at /public/video/intro.mp4
 * (WebM fallback at /public/video/intro.webm is optional but recommended)
 *
 * Behaviour:
 *  • First-visit only (localStorage key "mm-intro-seen")
 *  • prefers-reduced-motion → skip immediately
 *  • Video not found / autoplay blocked → skip immediately
 *  • Slow connection fallback → skip after STALL_LIMIT ms
 *
 * Timeline:
 *  0 s    — video begins fullscreen, site below is preloading
 *  –0.5 s — (before video ends) last frame frozen
 *  +0.42s — overlay begins 900 ms opacity → 0 crossfade
 *  +1.32s — overlay removed, user is inside the live website
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ── constants ──────────────────────────────────────────────────── */
const STORAGE_KEY  = "mm-intro-seen";
const VIDEO_WEBM   = "/video/intro.webm";
const VIDEO_MP4    = "/video/intro.mp4";
const FREEZE_MS    = 420;   // hold last frame before fading
const CROSSFADE_MS = 900;   // overlay opacity 1→0 duration
const STALL_LIMIT  = 6000;  // max ms before canplay fires; skip if exceeded

type Phase =
  | "boot"       // pre-hydration — render nothing
  | "playing"    // video playing, site loading underneath
  | "freezing"   // last frame held, crossfade imminent
  | "fading"     // overlay animating to opacity 0
  | "done";      // overlay unmounted, user in website

export default function IntroOverlay() {
  const shouldReduce = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("boot");

  /* ref mirrors state to avoid stale closures in callbacks */
  const phaseRef  = useRef<Phase>("boot");
  const videoRef  = useRef<HTMLVideoElement>(null);
  const t1Ref     = useRef<ReturnType<typeof setTimeout> | null>(null); // stall guard
  const t2Ref     = useRef<ReturnType<typeof setTimeout> | null>(null); // freeze → fade
  const t3Ref     = useRef<ReturnType<typeof setTimeout> | null>(null); // fade → done

  /* ── helpers ──────────────────────────────────────────────────── */
  const setP = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const clearTimers = useCallback(() => {
    [t1Ref, t2Ref, t3Ref].forEach(r => {
      if (r.current) { clearTimeout(r.current); r.current = null; }
    });
  }, []);

  /** Final cleanup — unlock scroll, persist visit, remove overlay */
  const finish = useCallback(() => {
    clearTimers();
    document.body.style.overflow    = "";
    document.body.style.pointerEvents = "";
    localStorage.setItem(STORAGE_KEY, "1");
    setP("done");
  }, [clearTimers, setP]);

  /** Begin opacity crossfade then call finish */
  const startFade = useCallback(() => {
    if (phaseRef.current === "fading" || phaseRef.current === "done") return;
    setP("fading");
    t3Ref.current = setTimeout(finish, CROSSFADE_MS + 80);
  }, [setP, finish]);

  /** Freeze the last video frame, then start the crossfade */
  const startFreeze = useCallback(() => {
    if (phaseRef.current !== "playing") return; // guard against double-call
    videoRef.current?.pause();
    setP("freezing");
    clearTimers();
    t2Ref.current = setTimeout(startFade, FREEZE_MS);
  }, [setP, clearTimers, startFade]);

  /* ── mount: decide whether to show intro ─────────────────────── */
  useEffect(() => {
    /* Skip: user prefers reduced motion */
    if (shouldReduce) {
      localStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    /* Skip: already seen this session or before */
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      return;
    }

    /* Lock scroll and pointer events while overlay is up */
    document.body.style.overflow      = "hidden";
    document.body.style.pointerEvents = "none"; // let overlay handle its own

    setP("playing");

    /* Stall guard: if canplay never fires, bail after STALL_LIMIT */
    t1Ref.current = setTimeout(startFreeze, STALL_LIMIT);

    return () => {
      clearTimers();
      document.body.style.overflow      = "";
      document.body.style.pointerEvents = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  /* ── video event handlers ─────────────────────────────────────── */

  /** Cancel stall guard once data is ready */
  const handleCanPlay = useCallback(() => {
    if (t1Ref.current) { clearTimeout(t1Ref.current); t1Ref.current = null; }
    /* Restore pointer-events on the overlay only (site stays locked) */
    document.body.style.pointerEvents = "";
  }, []);

  /** Detect last 0.5 s of video → freeze */
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (phaseRef.current !== "playing" || !v?.duration || !isFinite(v.duration)) return;
    if (v.currentTime >= v.duration - 0.5) startFreeze();
  }, [startFreeze]);

  /** Fallback: video ended before timeUpdate caught it */
  const handleEnded = useCallback(() => startFreeze(), [startFreeze]);

  /** Video cannot load (404, codec, autoplay blocked) → skip */
  const handleError = useCallback(() => finish(), [finish]);

  /* ── render ───────────────────────────────────────────────────── */
  if (phase === "boot" || phase === "done") return null;

  return (
    <motion.div
      /* Start fully opaque — no entry animation */
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{
        duration: CROSSFADE_MS / 1000,
        ease: [0.4, 0, 0.15, 1],
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10002,
        backgroundColor: "#02032e",
        overflow: "hidden",
        willChange: "opacity",
        pointerEvents: "auto",
      }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          /* prevent iOS Safari from trying to go fullscreen */
          WebkitPlaysinline: true,
        } as React.CSSProperties}
      >
        {/* WebM first for smaller file size on supporting browsers */}
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4}  type="video/mp4"  />
      </video>
    </motion.div>
  );
}

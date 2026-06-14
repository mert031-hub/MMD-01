"use client";

import { useState, useEffect, useRef } from "react";
import {
  useReducedMotion,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const PARTICLES = [
  { top: "12%", left: "5%",  size: 1.5, delay: 0,   dur: 9  },
  { top: "71%", left: "18%", size: 1,   delay: 2.2, dur: 13 },
  { top: "32%", left: "42%", size: 2,   delay: 1.1, dur: 10 },
  { top: "56%", left: "60%", size: 1.5, delay: 3.5, dur: 8  },
  { top: "18%", left: "76%", size: 1,   delay: 0.8, dur: 12 },
  { top: "83%", left: "86%", size: 2,   delay: 1.9, dur: 11 },
  { top: "47%", left: "31%", size: 1,   delay: 4.0, dur: 9  },
  { top: "89%", left: "52%", size: 1.5, delay: 2.6, dur: 10 },
];

/* ─── ENGINEERING CARD ────────────────────────────────────────── */

function EngineeringCard({ shouldReduce }: { shouldReduce: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function onCardMove(e: React.MouseEvent) {
    if (shouldReduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - r.top) / r.height - 0.5) * -7,
      y: ((e.clientX - r.left) / r.width - 0.5) * 9,
    });
  }
  function onCardLeave() {
    setHovered(false);
    setRot({ x: 0, y: 0 });
  }

  const tiltTransform = shouldReduce
    ? "none"
    : `translateY(${hovered ? -5 : 0}px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        style={{
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered && !shouldReduce
            ? "0 28px 72px rgba(6,7,113,0.38), 0 8px 20px rgba(6,7,113,0.22)"
            : "0 16px 48px rgba(6,7,113,0.28), 0 4px 12px rgba(6,7,113,0.12)",
          border: "1px solid rgba(255,108,12,0.15)",
          userSelect: "none",
          backgroundColor: "#07091f",
          transform: tiltTransform,
          transition: "transform 220ms cubic-bezier(0,0,0.2,1), box-shadow 280ms ease",
          willChange: "transform",
        }}
      >
        {/* Shine sweep */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%)",
            transform: hovered && !shouldReduce ? "translateX(110%)" : "translateX(-110%)",
            transition: hovered && !shouldReduce ? "transform 650ms cubic-bezier(0.0,0.0,0.2,1)" : "none",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        <div style={{ height: 36, backgroundColor: "#05061a", borderBottom: "1px solid rgba(255,108,12,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, backgroundColor: "#ff6c0c", borderRadius: 2 }} />
            <div style={{ width: 52, height: 5, backgroundColor: "rgba(255,251,243,0.7)", borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[32, 40, 28].map((w, i) => (
              <div key={i} style={{ width: w, height: 4, backgroundColor: "rgba(255,251,243,0.18)", borderRadius: 1 }} />
            ))}
          </div>
        </div>

        <div style={{ padding: "22px 18px 18px", position: "relative", overflow: "hidden" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: `${i * 33.3}%`, top: 0, bottom: 0, width: 1, backgroundColor: "rgba(255,108,12,0.05)" }} />
          ))}
          <div style={{ fontSize: 7.5, fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff6c0c", marginBottom: 8, position: "relative" }}>
            Pi-Lot Engineering
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fffbf3", marginBottom: 4, position: "relative" }}>
            Precision<br />Engineering.
          </div>
          <div style={{ width: 24, height: 1.5, backgroundColor: "#ff6c0c", marginBottom: 10, position: "relative" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, position: "relative" }}>
            {[80, 65, 50].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 3, backgroundColor: "rgba(255,251,243,0.12)", borderRadius: 1 }} />
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#05061a", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid rgba(255,108,12,0.1)" }}>
          {["Mühendislik", "Tasarım", "Altyapı"].map((tag, i) => (
            <span key={i} style={{ fontSize: 7, fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: i === 0 ? "rgba(255,108,12,0.8)" : "rgba(255,251,243,0.25)", border: `1px solid ${i === 0 ? "rgba(255,108,12,0.3)" : "rgba(255,251,243,0.08)"}`, padding: "2px 6px", borderRadius: 2 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── HOTEL CARD ─────────────────────────────────────────────── */

function HotelCard({ shouldReduce }: { shouldReduce: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function onCardMove(e: React.MouseEvent) {
    if (shouldReduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - r.top) / r.height - 0.5) * -7,
      y: ((e.clientX - r.left) / r.width - 0.5) * 9,
    });
  }
  function onCardLeave() {
    setHovered(false);
    setRot({ x: 0, y: 0 });
  }

  const tiltTransform = shouldReduce
    ? "none"
    : `translateY(${hovered ? -6 : 0}px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        style={{
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered && !shouldReduce
            ? "0 44px 100px rgba(6,7,113,0.30), 0 14px 36px rgba(6,7,113,0.16)"
            : "0 32px 80px rgba(6,7,113,0.22), 0 8px 24px rgba(6,7,113,0.10)",
          border: "1px solid rgba(6,7,113,0.07)",
          userSelect: "none",
          backgroundColor: "#ffffff",
          transform: tiltTransform,
          transition: "transform 220ms cubic-bezier(0,0,0.2,1), box-shadow 280ms ease",
          willChange: "transform",
        }}
      >
        {/* Shine sweep */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.10) 50%, transparent 80%)",
            transform: hovered && !shouldReduce ? "translateX(110%)" : "translateX(-110%)",
            transition: hovered && !shouldReduce ? "transform 650ms cubic-bezier(0.0,0.0,0.2,1)" : "none",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        <div style={{ height: 40, backgroundColor: "rgba(255,251,243,0.97)", borderBottom: "1px solid rgba(6,7,113,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#060771" }}>
            KALEİÇİ
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {[28, 36, 24].map((w, i) => (
              <div key={i} style={{ width: w, height: 4, backgroundColor: "rgba(6,7,113,0.12)", borderRadius: 1 }} />
            ))}
            <div style={{ backgroundColor: "#ff6c0c", padding: "4px 9px", fontSize: 7, fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fffbf3" }}>
              Rezervasyon
            </div>
          </div>
        </div>

        <div style={{ height: 148, background: "linear-gradient(155deg, #c8ad89 0%, #9e7d55 40%, #6b4f2a 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "0 22px 18px" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,7,113,0.6) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", top: 18, right: 22, width: 36, height: 54, border: "1.5px solid rgba(255,251,243,0.22)", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fffbf3", marginBottom: 4 }}>
              200 yıllık<br />bir miras.
            </div>
            <div style={{ width: 22, height: 1.5, backgroundColor: "#ff6c0c" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, backgroundColor: "rgba(6,7,113,0.05)" }}>
          {["Standart", "Deluxe", "Suite"].map((room, i) => (
            <div key={i} style={{ backgroundColor: "#fffbf3", padding: "10px 12px" }}>
              <div style={{ width: "100%", height: 28, backgroundColor: i === 2 ? "#060771" : "rgba(196,168,130,0.22)", borderRadius: 2, marginBottom: 5 }} />
              <div style={{ fontSize: 7.5, fontFamily: "var(--font-body)", fontWeight: 600, color: "rgba(6,7,113,0.6)", marginBottom: 3 }}>{room}</div>
              <div style={{ width: "65%", height: 3, backgroundColor: "rgba(6,7,113,0.08)", borderRadius: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SCROLL INDICATOR ───────────────────────────────────────── */

function ScrollIndicator({
  label,
  shouldReduce,
  faded,
}: {
  label: string;
  shouldReduce: boolean;
  faded: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: faded && !shouldReduce ? 0 : 1,
        transition: "opacity 400ms ease",
        pointerEvents: "none",
      }}
    >
      <span className="text-label" style={{ color: "var(--color-text-tertiary)" }}>
        {label}
      </span>

      <div style={{ width: 1, height: 40, backgroundColor: "rgba(6,7,113,0.10)", overflow: "hidden", position: "relative", borderRadius: 1 }}>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", backgroundColor: "rgba(6,7,113,0.50)" }}
          animate={shouldReduce ? {} : { y: ["-100%", "0%", "100%"] }}
          transition={shouldReduce ? {} : { duration: 1.8, times: [0, 0.45, 1], ease: EASE_OUT, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </div>

      <motion.div
        animate={shouldReduce ? {} : { scale: [1, 1.4, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={shouldReduce ? {} : { duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--color-authority)" }}
      />
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const [ctaHover, setCtaHover] = useState(false);
  const [ctaMag, setCtaMag] = useState({ x: 0, y: 0 });
  const [phoneHover, setPhoneHover] = useState(false);
  const [headlineHover, setHeadlineHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 42, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 42, damping: 18 });

  const card1X   = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-10, 10]);
  const card1Y   = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-7,  7 ]);
  const card2X   = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [14, -14]);
  const card2Y   = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [9,  -9 ]);
  const mmDriftX = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [6,  -6 ]);
  const mmDriftY = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [4,  -4 ]);
  const gridX    = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-3, 3  ]);
  const gridY    = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-2, 2  ]);
  const dotsX    = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-10, 10]);
  const dotsY    = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-7,  7 ]);
  const headlineX = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-5, 5 ]);
  const headlineY = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-3, 3 ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleCtaMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCtaMag({
      x: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 7,
      y: ((e.clientY - rect.top - rect.height / 2) / rect.height) * 4,
    });
  };

  const lines = [t("heading1"), t("heading2"), t("heading3")];

  return (
    <motion.section
      id="hero"
      aria-label={locale === "tr" ? "Giriş" : "Introduction"}
      initial={shouldReduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--color-bg-primary)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Soft radial — top left */}
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "60%", height: "70%", background: "radial-gradient(ellipse at center, rgba(6,7,113,0.032) 0%, transparent 70%)" }} />
        {/* Soft radial — bottom right */}
        <div style={{ position: "absolute", bottom: "0%", right: "0%", width: "50%", height: "60%", background: "radial-gradient(ellipse at center, rgba(255,108,12,0.022) 0%, transparent 70%)" }} />
        {/* Micro engineering grid — with parallax */}
        <motion.div style={{ x: gridX, y: gridY, position: "absolute", inset: "-10px", backgroundImage: "linear-gradient(rgba(6,7,113,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(6,7,113,0.022) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Particles — with parallax */}
        <motion.div style={{ x: dotsX, y: dotsY, position: "absolute", inset: 0 }}>
          {!shouldReduce && PARTICLES.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: "var(--color-authority)",
                animation: `heroPDrift ${p.dur}s ${p.delay}s infinite ease-in-out`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </motion.div>
      </div>

      <div
        className="container-site hero-inner"
        style={{ flex: 1, display: "flex", alignItems: "center", paddingTop: 120, paddingBottom: 100, position: "relative", zIndex: 1 }}
      >
        <div className="hero-grid" style={{ width: "100%" }}>

          {/* ─── LEFT COLUMN ──────────────────────── */}
          <div className="hero-left">

            {/* Label — letterSpacing entrance */}
            <motion.p
              className="text-label"
              initial={shouldReduce ? {} : { opacity: 0, letterSpacing: "0.28em" }}
              animate={{ opacity: 1, letterSpacing: "0.12em" }}
              transition={{ delay: 0.1, duration: 0.75, ease: EASE_OUT }}
              style={{ color: "var(--color-action)", marginBottom: 32 }}
            >
              {t("label")}
            </motion.p>

            {/* Headline — scale + clip-path line-by-line */}
            <motion.h1
              aria-label={lines.join(" ")}
              initial={shouldReduce ? {} : { scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.22, duration: 0.9, ease: EASE_OUT }}
              style={{ marginBottom: 28, x: headlineX, y: headlineY, transformOrigin: "left center" }}
              onMouseEnter={() => !shouldReduce && setHeadlineHover(true)}
              onMouseLeave={() => setHeadlineHover(false)}
            >
              {lines.map((line, lineIdx) => (
                <span
                  key={lineIdx}
                  aria-hidden="true"
                  style={{ display: "flex", flexWrap: "wrap", columnGap: "0.26em" }}
                >
                  {line.split(" ").map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      style={{ display: "block", overflow: "hidden", lineHeight: 1.08 }}
                    >
                      <motion.span
                        initial={shouldReduce ? {} : { y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.32 + lineIdx * 0.15 + wordIdx * 0.055,
                          duration: 0.65,
                          ease: EASE_OUT,
                        }}
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(36px, 4.8vw, 76px)",
                          fontWeight: 700,
                          lineHeight: 1.08,
                          letterSpacing: "-0.025em",
                          color: "var(--color-authority)",
                          transform: headlineHover && !shouldReduce ? "translateX(-2px)" : "translateX(0)",
                          transition: "transform 280ms ease",
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Supporting */}
            <motion.p
              initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.55, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.75,
                color: "var(--color-text-secondary)",
                maxWidth: 400,
                marginBottom: 48,
              }}
            >
              {t("supporting")}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}
            >
              {/* Primary CTA — magnetic + sweep + glow + arrow animation */}
              <Link
                href="/#iletisim"
                aria-label={t("primaryCta")}
                className="btn-sweep"
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => { setCtaHover(false); setCtaMag({ x: 0, y: 0 }); }}
                onMouseMove={handleCtaMouseMove}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fffbf3",
                  backgroundColor: "var(--color-action)",
                  padding: "16px 36px",
                  borderRadius: 0,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  transition: shouldReduce ? "none" : "transform 180ms cubic-bezier(0,0,0.2,1), box-shadow 200ms ease",
                  transform: !shouldReduce && ctaHover
                    ? `translate(${ctaMag.x}px, ${ctaMag.y - 3}px)`
                    : "translate(0,0)",
                  boxShadow: ctaHover && !shouldReduce
                    ? "0 12px 36px rgba(255,108,12,0.42), 0 4px 12px rgba(255,108,12,0.24)"
                    : "0 4px 16px rgba(255,108,12,0.16)",
                  willChange: "transform",
                }}
              >
                {t("primaryCta")}
                {/* Animated arrow */}
                <motion.svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                  animate={ctaHover && !shouldReduce ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </Link>

              {/* Phone — with underline + arrow + icon shake */}
              <a
                href="tel:+905349626627"
                aria-label={`${locale === "tr" ? "Ara" : "Call"}: 0534 962 66 27`}
                onMouseEnter={() => setPhoneHover(true)}
                onMouseLeave={() => setPhoneHover(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  color: phoneHover ? "var(--color-action)" : "var(--color-authority)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 200ms ease",
                  position: "relative",
                  paddingBottom: 2,
                }}
              >
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  animate={phoneHover && !shouldReduce
                    ? { rotate: [0, -12, 10, -8, 6, 0] }
                    : { rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <path d="M2.5 3a.5.5 0 01.5-.5H4a.5.5 0 01.5.5v1.5a.5.5 0 01-.15.35l-.7.7A7.5 7.5 0 008.45 9.35l.7-.7A.5.5 0 019.5 8.5H11a.5.5 0 01.5.5V10.5a.5.5 0 01-.5.5H10C5.858 11 2.5 7.642 2.5 3.5V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </motion.svg>
                0534 962 66 27
                <span
                  aria-hidden="true"
                  style={{
                    opacity: phoneHover && !shouldReduce ? 1 : 0,
                    transform: phoneHover && !shouldReduce ? "translateX(0)" : "translateX(-6px)",
                    transition: "opacity 180ms ease, transform 200ms cubic-bezier(0,0,0.2,1)",
                    display: "inline-block",
                    fontSize: 12,
                  }}
                >
                  →
                </span>
                {/* Growing underline */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: "currentColor",
                    transform: phoneHover && !shouldReduce ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 250ms ease",
                  }}
                />
              </a>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN — Parallax composition ── */}
          <div
            className="hero-right"
            aria-hidden="true"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 460,
              }}
            >
              {/* Dot grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "radial-gradient(circle, rgba(6,7,113,0.04) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  pointerEvents: "none",
                }}
              />

              {/* Soft glow behind cards */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "10%",
                  right: "10%",
                  bottom: "15%",
                  background: "radial-gradient(ellipse at center, rgba(6,7,113,0.07) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* MM watermark — X+Y parallax + breathing */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }}>
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [0.045, 0.072, 0.045] }}
                  transition={shouldReduce ? {} : { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                  style={{
                    x: mmDriftX,
                    y: mmDriftY,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(200px, 26vw, 360px)",
                    fontWeight: 700,
                    color: "var(--color-authority)",
                    letterSpacing: "-0.06em",
                    lineHeight: 0.85,
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  MM
                </motion.span>
              </div>

              {/* Engineering card — back, top-left */}
              <motion.div
                style={{ x: card1X, y: card1Y, position: "absolute", top: "6%", left: "0%", width: "56%", zIndex: 1, rotate: 2.8 }}
              >
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0, scale: 0.9, y: 28 }}
                  animate={{ opacity: 0.88, scale: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.85, ease: EASE_OUT }}
                >
                  <motion.div
                    animate={shouldReduce ? {} : { y: [0, -8, 0], rotate: [0, 0.4, 0] }}
                    transition={shouldReduce ? {} : { duration: 6.8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                  >
                    <EngineeringCard shouldReduce={shouldReduce} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Hotel card — front, bottom-right */}
              <motion.div
                style={{ x: card2X, y: card2Y, position: "absolute", bottom: "4%", right: "0%", width: "78%", zIndex: 2, rotate: -2 }}
              >
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.35, duration: 0.8, ease: EASE_OUT }}
                >
                  <motion.div
                    animate={shouldReduce ? {} : { y: [0, -9, 0], rotate: [0, -0.5, 0] }}
                    transition={shouldReduce ? {} : { duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                  >
                    <HotelCard shouldReduce={shouldReduce} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* MM brand signature */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.55, ease: EASE_OUT }}
                style={{ position: "absolute", bottom: "1%", left: "2%", zIndex: 3, display: "flex", alignItems: "center", gap: 6 }}
              >
                <div style={{ width: 2, height: 24, backgroundColor: "var(--color-action)", borderRadius: 1, opacity: 0.7 }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "var(--color-text-tertiary)" }}>
                  MMDESIGN
                </span>
              </motion.div>

              {/* Accent corner dots */}
              <div aria-hidden="true" style={{ position: "absolute", top: "3%", right: "3%", zIndex: 0 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--color-action)", opacity: 0.4 }} />
              </div>
              <div aria-hidden="true" style={{ position: "absolute", bottom: "18%", left: "3%", zIndex: 0 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--color-authority)", opacity: 0.25 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent 0%, rgba(255,251,243,0.6) 100%)", pointerEvents: "none", zIndex: 1 }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.5, ease: EASE_OUT }}
        style={{ zIndex: 2, position: "relative" }}
      >
        <ScrollIndicator label={t("scrollLabel")} shouldReduce={shouldReduce} faded={scrolled} />
      </motion.div>

      <style>{`
        /* CTA sweep */
        .btn-sweep {
          position: relative;
          overflow: hidden;
        }
        .btn-sweep::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          transform: translateX(-110%);
          transition: none;
          pointer-events: none;
        }
        .btn-sweep:hover::after {
          transform: translateX(110%);
          transition: transform 620ms cubic-bezier(0.0, 0.0, 0.2, 1);
        }

        /* Particle drift */
        @keyframes heroPDrift {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          25% { opacity: 0.028; }
          75% { opacity: 0.018; }
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
}

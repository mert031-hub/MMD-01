"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const ORBIT_R = 185;

const RINGS: [number, string][] = [
  [190, "rgba(255,251,243,0.09)"],
  [280, "rgba(255,251,243,0.055)"],
  [360, "rgba(255,251,243,0.030)"],
  [440, "rgba(255,108,12,0.050)"],
  [530, "rgba(255,251,243,0.013)"],
];

const PARTICLES: [number, number, number, number][] = [
  [18,  14, 3,   0.30],
  [55,   8, 2,   0.16],
  [97,  16, 2.5, 0.24],
  [138,  6, 1.5, 0.14],
  [174, 12, 3,   0.26],
  [220,  9, 2,   0.14],
  [262, 15, 2.5, 0.22],
  [305,  7, 2,   0.16],
  [342, 11, 3,   0.20],
];

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);

const DISPLAY_LINES: Record<string, Record<string, string[]>> = {
  "01": {
    en: ["Design is strategy", "made visible."],
    tr: ["Tasarım, stratejinin", "görsel halidir."],
  },
  "02": {
    en: ["Every industry speaks", "a different", "digital language."],
    tr: ["Her sektörün dijital", "dili farklıdır."],
  },
  "03": {
    en: ["The best website makes", "clients", "choose you."],
    tr: ["En iyi website, sizi", "seçmeyi kolaylaştırandır."],
  },
};

/* ── Content panel: left-column layout ─────────────────────────────── */
interface PanelProps {
  num: string;
  lines: string[];
  support: string;
  vis: MotionValue<number>;
  yOff: MotionValue<number>;
  linesMotion: Array<{ y: MotionValue<number>; op: MotionValue<number> }>;
  shouldReduce: boolean;
}

function ContentPanel({ num, lines, support, vis, yOff, linesMotion, shouldReduce }: PanelProps) {
  return (
    <motion.div
      style={{
        opacity: vis,
        y: shouldReduce ? 0 : yOff,
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {/* Ghost principle number */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 9vw, 130px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,108,12,0.08)",
          marginBottom: -8,
          userSelect: "none",
        }}
      >
        {num}
      </div>

      <span
        className="text-label"
        style={{ color: "var(--color-action)", display: "block", marginBottom: 22 }}
      >
        PHILOSOPHY {num}
      </span>

      {/* Statement lines — scroll-driven per-line stagger */}
      <div style={{ marginBottom: 18 }}>
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          const lm = linesMotion[i] ?? linesMotion[linesMotion.length - 1];
          return (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.div style={{ y: shouldReduce ? 0 : lm.y, opacity: shouldReduce ? undefined : lm.op }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.4vw, 36px)",
                    fontWeight: 600,
                    fontStyle: isLast ? "italic" : "normal",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.22,
                    color: isLast ? "var(--color-action)" : "rgba(255,251,243,0.95)",
                    paddingBottom: 3,
                  }}
                >
                  {line}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Orange rule */}
      <div style={{ width: 36, height: 2, backgroundColor: "var(--color-action)", marginBottom: 16 }} />

      {/* Support text */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(12px, 0.85vw, 13px)",
          lineHeight: 1.75,
          color: "rgba(255,251,243,0.38)",
          margin: "0 0 20px",
          maxWidth: 360,
        }}
      >
        {support}
      </p>

      {/* Attribution */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,108,12,0.38)",
        }}
      >
        — MMDESIGN
      </span>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────── */
export default function Philosophy() {
  const t = useTranslations("philosophy");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Discrete step: orbit dimming + hero node identity */
  const stepFloat = useTransform(
    scrollYProgress,
    [0, 0.14, 0.20, 0.44, 0.50, 0.70, 0.76, 1.0],
    [0,  0,    1,    1,    2,    2,    3,    3]
  );
  useMotionValueEvent(stepFloat, "change", (v) => {
    setActiveStep(v < 0.5 ? 0 : v < 1.5 ? 1 : v < 2.5 ? 2 : 3);
  });

  /*
    Orbit: shifts RIGHT when active, making room for content column on left.
    The orbit ring (530px diameter) will extend to ~42% from left on a 1440px
    screen, just kissing the content column's right edge — ring frames content.
  */
  const rawOrbitX     = useTransform(scrollYProgress, [0.06, 0.20], [0, 120]);
  const rawOrbitScale = useTransform(scrollYProgress, [0.06, 0.20], [1, 0.84]);
  const orbitX     = useSpring(rawOrbitX,     { stiffness: 90, damping: 22, mass: 1 });
  const orbitScale = useSpring(rawOrbitScale, { stiffness: 90, damping: 22, mass: 1 });

  /* Quote panel fades as principles begin arriving */
  const quotePanelOp = useTransform(scrollYProgress, [0.04, 0.16], [1, 0]);

  /* Orbit trail: visible only during transitions */
  const trailOp = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.22, 0.35, 0.44, 0.58, 0.62, 0.71, 0.80, 0.90],
    [0,    0.9,  0,    0,    0.9,  0,    0,    0.9,  0,    0   ]
  );

  /* ── Step 1 ──────────────────────────────────────────────────────── */
  const s1Vis  = useTransform(scrollYProgress, [0.08, 0.20, 0.37, 0.50], [0, 1, 1, 0]);
  const s1Y    = useTransform(scrollYProgress, [0.08, 0.20, 0.37, 0.50], [28, 0, 0, -22]);
  const s1L0Y  = useTransform(scrollYProgress, [0.08, 0.17], [36, 0]);
  const s1L0Op = useTransform(scrollYProgress, [0.08, 0.17], [0, 1]);
  const s1L1Y  = useTransform(scrollYProgress, [0.11, 0.20], [36, 0]);
  const s1L1Op = useTransform(scrollYProgress, [0.11, 0.20], [0, 1]);
  const s1L2Y  = useTransform(scrollYProgress, [0.14, 0.23], [36, 0]);
  const s1L2Op = useTransform(scrollYProgress, [0.14, 0.23], [0, 1]);

  /* ── Step 2 ──────────────────────────────────────────────────────── */
  const s2Vis  = useTransform(scrollYProgress, [0.48, 0.60, 0.64, 0.75], [0, 1, 1, 0]);
  const s2Y    = useTransform(scrollYProgress, [0.48, 0.60, 0.64, 0.75], [28, 0, 0, -22]);
  const s2L0Y  = useTransform(scrollYProgress, [0.48, 0.57], [36, 0]);
  const s2L0Op = useTransform(scrollYProgress, [0.48, 0.57], [0, 1]);
  const s2L1Y  = useTransform(scrollYProgress, [0.51, 0.60], [36, 0]);
  const s2L1Op = useTransform(scrollYProgress, [0.51, 0.60], [0, 1]);
  const s2L2Y  = useTransform(scrollYProgress, [0.54, 0.63], [36, 0]);
  const s2L2Op = useTransform(scrollYProgress, [0.54, 0.63], [0, 1]);

  /* ── Step 3 ──────────────────────────────────────────────────────── */
  const s3Vis  = useTransform(scrollYProgress, [0.73, 0.84, 0.98, 1.0], [0, 1, 1, 1]);
  const s3Y    = useTransform(scrollYProgress, [0.73, 0.84], [28, 0]);
  const s3L0Y  = useTransform(scrollYProgress, [0.73, 0.82], [36, 0]);
  const s3L0Op = useTransform(scrollYProgress, [0.73, 0.82], [0, 1]);
  const s3L1Y  = useTransform(scrollYProgress, [0.76, 0.85], [36, 0]);
  const s3L1Op = useTransform(scrollYProgress, [0.76, 0.85], [0, 1]);
  const s3L2Y  = useTransform(scrollYProgress, [0.79, 0.88], [36, 0]);
  const s3L2Op = useTransform(scrollYProgress, [0.79, 0.88], [0, 1]);

  const beliefs = [
    { num: "01", text: t("belief1"), support: t("belief1Support") },
    { num: "02", text: t("belief2"), support: t("belief2Support") },
    { num: "03", text: t("belief3"), support: t("belief3Support") },
  ];

  const isActive     = activeStep > 0;
  const activeBelief = isActive ? beliefs[activeStep - 1] : null;
  const lang         = locale === "en" ? "en" : "tr";

  const stepPanels = [
    {
      ...beliefs[0],
      lines: DISPLAY_LINES["01"]?.[lang] ?? [],
      vis: s1Vis, yOff: s1Y,
      linesMotion: [{ y: s1L0Y, op: s1L0Op }, { y: s1L1Y, op: s1L1Op }, { y: s1L2Y, op: s1L2Op }],
    },
    {
      ...beliefs[1],
      lines: DISPLAY_LINES["02"]?.[lang] ?? [],
      vis: s2Vis, yOff: s2Y,
      linesMotion: [{ y: s2L0Y, op: s2L0Op }, { y: s2L1Y, op: s2L1Op }, { y: s2L2Y, op: s2L2Op }],
    },
    {
      ...beliefs[2],
      lines: DISPLAY_LINES["03"]?.[lang] ?? [],
      vis: s3Vis, yOff: s3Y,
      linesMotion: [{ y: s3L0Y, op: s3L0Op }, { y: s3L1Y, op: s3L1Op }, { y: s3L2Y, op: s3L2Op }],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="felsefe"
      aria-label="Stüdyo felsefesi"
      style={{ height: "500vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--color-authority)",
          backgroundImage:
            "radial-gradient(circle, rgba(255,251,243,0.032) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* ── CENTER DEPTH ──────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 900, height: 900, marginTop: -450, marginLeft: -450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,10,130,0.52) 0%, rgba(6,7,113,0.26) 30%, transparent 68%)",
          pointerEvents: "none", zIndex: 1,
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 300, height: 300, marginTop: -150, marginLeft: -150,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,108,12,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* ── MM MONUMENT ───────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(300px, 40vw, 640px)",
          fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1,
          color: "rgba(255,251,243,0.018)",
          userSelect: "none", pointerEvents: "none", zIndex: 0,
        }}>MM</div>
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(calc(-50% + 22px), calc(-50% + 18px))",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(300px, 40vw, 640px)",
          fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1,
          WebkitTextStroke: "1px rgba(255,251,243,0.020)",
          color: "transparent",
          userSelect: "none", pointerEvents: "none", zIndex: 0,
        }}>MM</div>

        {/*
          ══ LEFT COLUMN: Quote (idle) + Content panels (active) ═══════
          Both use the same position; quote fades out as content fades in.
          Width ~35% of viewport anchored to left edge.
        */}
        <div
          className="phil-left-col"
          style={{
            position: "absolute",
            left: "clamp(24px, 6vw, 90px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(260px, 34%, 480px)",
            zIndex: 7,
          }}
        >
          {/* Quote panel — idle only */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              translateY: "-50%",
              width: "100%",
              opacity: shouldReduce ? undefined : quotePanelOp,
              pointerEvents: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 22, height: 2, backgroundColor: "var(--color-action)" }} />
              <span className="text-label" style={{ color: "var(--color-action)" }}>{t("label")}</span>
            </div>
            <div aria-hidden="true" style={{
              fontFamily: "var(--font-display)", fontSize: 52, fontStyle: "italic",
              fontWeight: 700, color: "rgba(255,108,12,0.09)", lineHeight: 0.75,
              marginBottom: 8, userSelect: "none",
            }}>&ldquo;</div>
            <blockquote style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(13px, 1.4vw, 20px)",
              fontStyle: "italic", fontWeight: 600, lineHeight: 1.3,
              letterSpacing: "-0.015em", color: "rgba(255,251,243,0.80)",
              margin: "0 0 14px", padding: 0, border: "none",
            }}>{t("quote")}</blockquote>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "rgba(255,108,12,0.42)",
            }}>— MMDESIGN</span>
          </motion.div>

          {/* Active content panels — all 3, stacked, scroll-opacity controls visibility */}
          <div style={{ position: "relative" }}>
            {stepPanels.map((panel) => (
              <div
                key={panel.num}
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
              >
                <ContentPanel
                  num={panel.num}
                  lines={panel.lines}
                  support={panel.support}
                  vis={panel.vis}
                  yOff={panel.yOff}
                  linesMotion={panel.linesMotion}
                  shouldReduce={shouldReduce}
                />
              </div>
            ))}
            {/* Spacer so the relative container has height */}
            <div style={{ height: "min(70vh, 480px)", pointerEvents: "none" }} />
          </div>
        </div>

        {/*
          ══ ORBIT SYSTEM — shifts right when active ════════════════════
          When a principle activates, the orbit shifts +120px right, making
          room for the content column. The orbit rings then extend leftward
          toward the content, visually framing the full composition.
          The active hero node positions at orbit's LEFT EDGE — acting as
          the visual bridge between content and orbit.
        */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", zIndex: 5,
        }}>
          <motion.div
            style={{
              x: shouldReduce ? 0 : orbitX,
              scale: shouldReduce ? 1 : orbitScale,
              position: "relative", width: 460, height: 460,
            }}
          >
            {/* Rings */}
            {RINGS.map(([d, color]) => (
              <div key={d} style={{
                position: "absolute", top: "50%", left: "50%",
                width: d, height: d,
                marginTop: -(d / 2), marginLeft: -(d / 2),
                borderRadius: "50%", border: `1px solid ${color}`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Pulsing energy ring */}
            <div className="phil-energy-ring" style={{
              position: "absolute", top: "50%", left: "50%",
              width: 280, height: 280, marginTop: -140, marginLeft: -140,
              borderRadius: "50%", border: "1px solid rgba(255,108,12,0.09)",
              pointerEvents: "none",
            }} />

            {/* Orbit trail — only during transitions */}
            {!shouldReduce && (
              <motion.div className="phil-orbit-trail" style={{
                position: "absolute", top: "50%", left: "50%",
                width: ORBIT_R * 2, height: ORBIT_R * 2,
                marginTop: -ORBIT_R, marginLeft: -ORBIT_R,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, transparent 0%, rgba(255,108,12,0.018) 20%, rgba(255,108,12,0.055) 42%, rgba(255,108,12,0.018) 62%, transparent 75%)",
                pointerEvents: "none",
                opacity: trailOp,
              }} />
            )}

            {/* Tick marks */}
            {TICKS.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const isMajor = deg % 90 === 0;
              const isMid   = deg % 30 === 0 && !isMajor;
              const size    = isMajor ? 4 : isMid ? 2.5 : 1.5;
              const op      = isMajor ? 0.16 : isMid ? 0.09 : 0.046;
              return (
                <div key={`t${deg}`} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: size, height: size, borderRadius: "50%",
                  marginTop: -(size / 2), marginLeft: -(size / 2),
                  backgroundColor: `rgba(255,251,243,${op})`,
                  transform: `translate(${Math.cos(rad) * ORBIT_R}px, ${Math.sin(rad) * ORBIT_R}px)`,
                  pointerEvents: "none",
                }} />
              );
            })}

            {/* Particles — counter-rotate */}
            <div
              className={`phil-particles-wrap${shouldReduce ? " orbit-paused" : ""}`}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {PARTICLES.map(([angleDeg, radiusOffset, size, opacity], idx) => {
                const rad = (angleDeg * Math.PI) / 180;
                const r = ORBIT_R + radiusOffset + 26;
                return (
                  <div key={idx} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: size, height: size, borderRadius: "50%",
                    marginTop: -(size / 2), marginLeft: -(size / 2),
                    backgroundColor: `rgba(255,108,12,${opacity})`,
                    boxShadow: `0 0 ${size * 6}px rgba(255,108,12,${opacity * 0.8})`,
                    transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                  }} />
                );
              })}
            </div>

            {/* Orbit nodes */}
            {beliefs.map((b, i) => {
              const isNodeActive = activeStep === i + 1;
              const isDimmed     = isActive && !isNodeActive;
              return (
                <div
                  key={b.num}
                  className={`phil-orbit-n${i + 1}${shouldReduce ? " orbit-paused" : ""}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    marginTop: -26, marginLeft: -26, pointerEvents: "none",
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    backgroundColor: "rgba(255,251,243,0.06)",
                    border: "1px solid rgba(255,251,243,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: isDimmed || isNodeActive
                      ? "none"
                      : "0 0 16px rgba(255,251,243,0.06), inset 0 0 10px rgba(255,251,243,0.04)",
                    opacity:   isNodeActive ? 0 : isDimmed ? 0.11 : 1,
                    transform: isDimmed ? "scale(0.76)" : "scale(1)",
                    transition: "opacity 600ms cubic-bezier(0,0,0.2,1), transform 600ms cubic-bezier(0,0,0.2,1), box-shadow 600ms ease",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: 13,
                      fontWeight: 700, letterSpacing: "0.04em", color: "rgba(255,251,243,0.80)",
                    }}>{b.num}</span>
                  </div>
                </div>
              );
            })}

            {/* MM Core */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 96, height: 96, marginTop: -48, marginLeft: -48, zIndex: 3,
            }}>
              <div className="phil-mm-halo" style={{
                position: "absolute", top: -22, left: -22,
                width: 140, height: 140, borderRadius: "50%",
                border: "1px solid rgba(255,108,12,0.04)", pointerEvents: "none",
              }} />
              <div className="phil-mm-outer-ring" style={{
                position: "absolute", top: -10, left: -10,
                width: 116, height: 116, borderRadius: "50%",
                border: "1px solid rgba(255,108,12,0.08)", pointerEvents: "none",
              }} />
              <div className="phil-mm-center" style={{
                width: "100%", height: "100%", borderRadius: "50%",
                backgroundColor: "rgba(3,4,74,0.98)",
                border: "1px solid rgba(255,251,243,0.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "radial-gradient(circle at 38% 34%, rgba(255,108,12,0.10) 0%, transparent 60%)",
                  pointerEvents: "none",
                }} />
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                  letterSpacing: "-0.04em", color: "rgba(255,251,243,0.9)",
                  position: "relative", zIndex: 1,
                }}>MM</span>
              </div>
            </div>

            {/*
              Hero node: springs from its orbit-path position to the LEFT EDGE
              of the orbit ring — x: -(ORBIT_R - 20), y: -30.
              This positions it right between the content column and orbit center,
              acting as the visual bridge. It stays WITHIN the orbit ring system,
              not separate from it.
            */}
            <AnimatePresence>
              {isActive && !shouldReduce && (
                <motion.div
                  key={`hero-${activeStep}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    marginTop: -46, marginLeft: -46,
                    zIndex: 10, pointerEvents: "none",
                  }}
                  initial={{ x: 0, y: -(ORBIT_R - 8), scale: 0.3, opacity: 0 }}
                  animate={{ x: -(ORBIT_R - 20), y: -30, scale: 1, opacity: 1 }}
                  exit={{ x: 0, y: -(ORBIT_R - 8), scale: 0.3, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 110, damping: 14, mass: 1.05 }}
                >
                  {/* Outer pulse ring */}
                  <div className="phil-hero-pulse" style={{
                    position: "absolute", top: -12, left: -12,
                    width: 116, height: 116, borderRadius: "50%",
                    border: "1px solid rgba(255,108,12,0.26)", pointerEvents: "none",
                  }} />
                  {/* Node circle */}
                  <div style={{
                    width: 92, height: 92, borderRadius: "50%",
                    backgroundColor: "var(--color-action)",
                    border: "2px solid rgba(255,140,50,0.48)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow:
                      "0 0 28px rgba(255,108,12,0.62), 0 0 56px rgba(255,108,12,0.28), 0 0 90px rgba(255,108,12,0.12)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
                      letterSpacing: "0.04em", color: "#fff",
                    }}>{activeBelief!.num}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ──────────────────────────────────────── */}
        <div
          className="phil-indicator"
          style={{
            position: "absolute", right: "clamp(14px, 1.8vw, 28px)",
            top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            zIndex: 9, userSelect: "none",
          }}
        >
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {i > 0 && (
                <div style={{
                  width: 1, height: 24,
                  backgroundColor: activeStep >= s ? "rgba(255,108,12,0.45)" : "rgba(255,251,243,0.07)",
                  transition: "background-color 500ms ease",
                }} />
              )}
              <div style={{
                width: activeStep === s ? 9 : 5,
                height: activeStep === s ? 9 : 5,
                borderRadius: "50%",
                backgroundColor:
                  activeStep === s ? "var(--color-action)"
                  : activeStep > s  ? "rgba(255,108,12,0.3)"
                  : "rgba(255,251,243,0.1)",
                boxShadow: activeStep === s
                  ? "0 0 10px rgba(255,108,12,0.8), 0 0 20px rgba(255,108,12,0.3)"
                  : "none",
                transition: "all 400ms cubic-bezier(0,0,0.2,1)",
                margin: "4px auto",
              }} />
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.04em",
                color: activeStep === s ? "var(--color-action)" : "rgba(255,251,243,0.18)",
                transition: "color 400ms ease", marginBottom: 4,
              }}>{`0${s}`}</span>
            </div>
          ))}
        </div>

        {/* ── CSS ─────────────────────────────────────────────────── */}
        <style>{`
          @keyframes orbit-go {
            from { transform: rotate(0deg)   translateX(${ORBIT_R}px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(${ORBIT_R}px) rotate(-360deg); }
          }
          @keyframes phil-trail-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes phil-particles-drift {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes phil-mm-breathe {
            0%, 100% {
              box-shadow:
                0 0 0 0px  rgba(255,108,12,0),
                0 0 44px   rgba(6,7,113,0.88),
                0 0 90px   rgba(3,4,74,0.52),
                inset 0 0 22px rgba(3,4,74,0.8);
              transform: scale(1);
            }
            50% {
              box-shadow:
                0 0 0 10px rgba(255,108,12,0.028),
                0 0 64px   rgba(6,7,113,0.98),
                0 0 120px  rgba(3,4,74,0.72),
                inset 0 0 26px rgba(3,4,74,0.92);
              transform: scale(1.03);
            }
          }
          @keyframes phil-outer-pulse {
            0%, 100% { opacity: 0.4;  transform: scale(1); }
            50%       { opacity: 0.85; transform: scale(1.055); }
          }
          @keyframes phil-halo-breathe {
            0%, 100% { opacity: 0.3;  transform: scale(1); }
            50%       { opacity: 0.65; transform: scale(1.04); }
          }
          @keyframes phil-energy-pulse {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50%       { opacity: 0.80; transform: scale(1.015); }
          }
          @keyframes phil-hero-pulse-kf {
            0%, 100% { opacity: 0.5;  transform: scale(1); }
            60%       { opacity: 0.06; transform: scale(1.8); }
          }

          .phil-mm-center      { animation: phil-mm-breathe      7.5s ease-in-out infinite; }
          .phil-mm-outer-ring  { animation: phil-outer-pulse      7.5s ease-in-out infinite; }
          .phil-mm-halo        { animation: phil-halo-breathe     7.5s ease-in-out infinite 0.9s; }
          .phil-energy-ring    { animation: phil-energy-pulse     4.2s ease-in-out infinite; }
          .phil-orbit-trail    { animation: phil-trail-spin       28s  linear     infinite; }
          .phil-particles-wrap { animation: phil-particles-drift  90s  linear     infinite; }
          .phil-hero-pulse     { animation: phil-hero-pulse-kf    2.4s ease-out   infinite; }

          .phil-orbit-n1 { animation: orbit-go 28s linear infinite; animation-delay:    0s; }
          .phil-orbit-n2 { animation: orbit-go 28s linear infinite; animation-delay:  -9.333s; }
          .phil-orbit-n3 { animation: orbit-go 28s linear infinite; animation-delay: -18.667s; }
          .orbit-paused  { animation-play-state: paused !important; }

          @media (max-width: 1100px) {
            .phil-left-col { width: clamp(240px, 38%, 440px) !important; }
          }
          @media (max-width: 860px) {
            .phil-left-col    { width: 44% !important; left: 16px !important; }
            .phil-indicator   { display: none !important; }
          }
          @media (max-width: 640px) {
            .phil-left-col {
              width: 90vw !important;
              left: 5vw !important;
              top: auto !important;
              bottom: 8vh !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

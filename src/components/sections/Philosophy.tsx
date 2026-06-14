"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const ORBIT_R = 185;

const RINGS: [number, string][] = [
  [190, "rgba(255,251,243,0.07)"],
  [280, "rgba(255,251,243,0.044)"],
  [360, "rgba(255,251,243,0.022)"],
  [420, "rgba(255,108,12,0.048)"],
];

/* Static glow particles: [angleDeg, radiusOffset, size, opacity] */
const PARTICLES: [number, number, number, number][] = [
  [22,  16, 2.5, 0.26],
  [68,   8, 2,   0.16],
  [115, 12, 3,   0.22],
  [160,  6, 2,   0.14],
  [205, 14, 2.5, 0.24],
  [252,  8, 2,   0.14],
  [298, 10, 3,   0.20],
  [345,  6, 2,   0.17],
];

const DISPLAY_LINES: Record<string, Record<string, string[]>> = {
  "01": {
    en: ["Design is", "strategy", "made visible."],
    tr: ["Tasarım,", "stratejinin", "görsel halidir."],
  },
  "02": {
    en: ["Every industry", "speaks a different", "digital language."],
    tr: ["Her sektörün", "dijital dili", "farklıdır."],
  },
  "03": {
    en: ["The best website", "makes clients", "choose you."],
    tr: ["En iyi website,", "sizi seçmeyi", "kolaylaştırandır."],
  },
};

/* ── Giant editorial text ──────────────────────────────────────────── */

interface GiantTextProps {
  num: string;
  lines: string[];
  support: string;
  shouldReduce: boolean;
}

function GiantTextOverlay({ num, lines, support, shouldReduce }: GiantTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{ width: "100%" }}
    >
      {/* Ghost number */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(60px, 7vw, 108px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,108,12,0.055)",
          marginBottom: -4,
          userSelect: "none",
        }}
      >
        {num}
      </div>

      <span
        className="text-label"
        style={{ color: "var(--color-action)", display: "block", marginBottom: 26 }}
      >
        PHILOSOPHY
      </span>

      {/* Editorial lines — each reveals upward from clip */}
      <div style={{ marginBottom: 22 }}>
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.div
                initial={shouldReduce ? { opacity: 0 } : { y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.06 + i * 0.13,
                  ease: EASE_OUT,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 4.6vw, 72px)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: isLast ? "var(--color-action)" : "rgba(255,251,243,0.97)",
                    paddingBottom: 4,
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
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.38,
          delay: 0.06 + lines.length * 0.13 + 0.08,
          ease: EASE_OUT,
        }}
        style={{
          width: 44,
          height: 2,
          backgroundColor: "var(--color-action)",
          transformOrigin: "left",
          marginBottom: 18,
        }}
      />

      {/* Support copy */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.42,
          delay: 0.06 + lines.length * 0.13 + 0.22,
          ease: EASE_OUT,
        }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(12px, 0.9vw, 14px)",
          lineHeight: 1.72,
          color: "rgba(255,251,243,0.4)",
          margin: 0,
          maxWidth: 400,
        }}
      >
        {support}
      </motion.p>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────────────────── */

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

  const stepFloat = useTransform(
    scrollYProgress,
    [0, 0.17, 0.21, 0.42, 0.46, 0.67, 0.71, 1],
    [0, 0, 1, 1, 2, 2, 3, 3]
  );

  useMotionValueEvent(stepFloat, "change", (v) => {
    setActiveStep(v < 0.5 ? 0 : v < 1.5 ? 1 : v < 2.5 ? 2 : 3);
  });

  const beliefs = [
    { num: "01", text: t("belief1"), support: t("belief1Support") },
    { num: "02", text: t("belief2"), support: t("belief2Support") },
    { num: "03", text: t("belief3"), support: t("belief3Support") },
  ];

  const isActive = activeStep > 0;
  const activeBelief = isActive ? beliefs[activeStep - 1] : null;
  const activeLines: string[] =
    activeBelief
      ? (DISPLAY_LINES[activeBelief.num]?.[locale === "en" ? "en" : "tr"] ?? [])
      : [];

  return (
    <section
      ref={sectionRef}
      id="felsefe"
      aria-label="Stüdyo felsefesi"
      style={{ height: "500vh", position: "relative" }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--color-authority)",
          backgroundImage:
            "radial-gradient(circle, rgba(255,251,243,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >

        {/* ── ARCHITECTURAL MM MONUMENT ────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(300px, 40vw, 640px)",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            color: "rgba(255,251,243,0.012)",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          MM
        </div>
        {/* Outline echo — offset for depth */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(calc(-50% + 20px), calc(-50% + 16px))",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(300px, 40vw, 640px)",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            WebkitTextStroke: "1px rgba(255,251,243,0.016)",
            color: "transparent",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          MM
        </div>

        {/* ── QUOTE PANEL — fades out when active ──────────────────── */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              key="quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.44, ease: EASE_OUT }}
              style={{
                position: "absolute",
                left: "clamp(24px, 5vw, 80px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: 200,
                zIndex: 6,
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <div style={{ width: 26, height: 2, backgroundColor: "var(--color-action)" }} />
                <span className="text-label" style={{ color: "var(--color-action)" }}>
                  {t("label")}
                </span>
              </div>

              <div
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 56,
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "rgba(255,108,12,0.10)",
                  lineHeight: 0.75,
                  marginBottom: 8,
                  userSelect: "none",
                }}
              >
                &ldquo;
              </div>

              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(12px, 1.2vw, 17px)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  color: "rgba(255,251,243,0.78)",
                  margin: "0 0 12px",
                  padding: 0,
                  border: "none",
                }}
              >
                {t("quote")}
              </blockquote>

              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(255,108,12,0.44)",
                }}
              >
                — MMDESIGN
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GIANT TEXT OVERLAY — right side ──────────────────────── */}
        <div
          className="phil-text-overlay"
          style={{
            position: "absolute",
            right: "clamp(24px, 4.5vw, 70px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44%",
            zIndex: 8,
          }}
        >
          <AnimatePresence mode="wait">
            {isActive && activeBelief && (
              <GiantTextOverlay
                key={`gt-${activeStep}`}
                num={activeBelief.num}
                lines={activeLines}
                support={activeBelief.support}
                shouldReduce={shouldReduce}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── ORBIT SYSTEM ─────────────────────────────────────────── */}
        {/*
          Two-wrapper approach:
          1. Static centering shell (CSS transform only, no Framer Motion)
          2. Inner motion.div — x/scale shifts when active
          This way the CSS orbit-go animation on child nodes doesn't conflict
          with Framer Motion managing the wrapper's transform.
        */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        >
          <motion.div
            animate={{
              x: shouldReduce ? 0 : isActive ? -200 : 0,
              scale: shouldReduce ? 1 : isActive ? 0.76 : 1,
            }}
            transition={{ duration: 0.74, ease: EASE_OUT }}
            style={{ position: "relative", width: 460, height: 460 }}
          >
            {/* Concentric rings */}
            {RINGS.map(([d, color]) => (
              <div
                key={d}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: d,
                  height: d,
                  marginTop: -(d / 2),
                  marginLeft: -(d / 2),
                  borderRadius: "50%",
                  border: `1px solid ${color}`,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Glow particles — static dots at fixed angles */}
            {PARTICLES.map(([angleDeg, radiusOffset, size, opacity], idx) => {
              const rad = (angleDeg * Math.PI) / 180;
              const r = ORBIT_R + radiusOffset + 24;
              const px = Math.cos(rad) * r;
              const py = Math.sin(rad) * r;
              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    marginTop: -(size / 2),
                    marginLeft: -(size / 2),
                    backgroundColor: `rgba(255,108,12,${opacity})`,
                    boxShadow: `0 0 ${size * 5}px rgba(255,108,12,${opacity * 0.7})`,
                    transform: `translate(${px}px, ${py}px)`,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* Orbit nodes
                Outer div: CSS orbit-go animation controls transform.
                Inner div: CSS transition controls opacity + scale for dimming.
                No motion.div here — avoids transform conflict with orbit CSS. */}
            {beliefs.map((b, i) => {
              const isNodeActive = activeStep === i + 1;
              const isDimmed = isActive && !isNodeActive;
              return (
                <div
                  key={b.num}
                  className={`phil-orbit-n${i + 1}${shouldReduce ? " orbit-paused" : ""}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -26,
                    marginLeft: -26,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,251,243,0.055)",
                      border: "1px solid rgba(255,251,243,0.16)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isNodeActive ? 0 : isDimmed ? 0.13 : 1,
                      transform: isDimmed ? "scale(0.8)" : "scale(1)",
                      transition:
                        "opacity 480ms cubic-bezier(0,0,0.2,1), transform 480ms cubic-bezier(0,0,0.2,1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: "rgba(255,251,243,0.78)",
                      }}
                    >
                      {b.num}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* MM Center orb */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 96,
                height: 96,
                marginTop: -48,
                marginLeft: -48,
                zIndex: 3,
              }}
            >
              {/* Outer breathing ring */}
              <div
                className="phil-mm-outer-ring"
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 116,
                  height: 116,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,108,12,0.07)",
                  pointerEvents: "none",
                }}
              />
              {/* Core orb */}
              <div
                className="phil-mm-center"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(3,4,74,0.98)",
                  border: "1px solid rgba(255,251,243,0.09)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Inner premium glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 38% 34%, rgba(255,108,12,0.08) 0%, transparent 62%)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: "rgba(255,251,243,0.9)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  MM
                </span>
              </div>
            </div>

            {/* Hero node — springs from top of orbit to right edge */}
            <AnimatePresence>
              {isActive && !shouldReduce && (
                <motion.div
                  key={`hero-${activeStep}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -38,
                    marginLeft: -38,
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                  initial={{ x: 0, y: -(ORBIT_R - 8), scale: 0.3, opacity: 0 }}
                  animate={{ x: ORBIT_R + 22, y: -80, scale: 1, opacity: 1 }}
                  exit={{ x: 0, y: -(ORBIT_R - 8), scale: 0.3, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 118,
                    damping: 15,
                    mass: 0.95,
                  }}
                >
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      backgroundColor: "var(--color-action)",
                      border: "2px solid rgba(255,130,40,0.55)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 36px rgba(255,108,12,0.58), 0 0 72px rgba(255,108,12,0.26), 0 0 120px rgba(255,108,12,0.10)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: "#fff",
                      }}
                    >
                      {activeBelief!.num}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ─────────────────────────────────────── */}
        <div
          className="phil-indicator"
          style={{
            position: "absolute",
            right: "clamp(14px, 1.8vw, 28px)",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 6,
            userSelect: "none",
          }}
        >
          {[1, 2, 3].map((s, i) => (
            <div
              key={s}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    height: 24,
                    backgroundColor:
                      activeStep >= s
                        ? "rgba(255,108,12,0.4)"
                        : "rgba(255,251,243,0.07)",
                    transition: "background-color 400ms ease",
                  }}
                />
              )}
              <div
                style={{
                  width: activeStep === s ? 8 : 5,
                  height: activeStep === s ? 8 : 5,
                  borderRadius: "50%",
                  backgroundColor:
                    activeStep === s
                      ? "var(--color-action)"
                      : activeStep > s
                      ? "rgba(255,108,12,0.3)"
                      : "rgba(255,251,243,0.1)",
                  boxShadow:
                    activeStep === s ? "0 0 8px rgba(255,108,12,0.7)" : "none",
                  transition: "all 350ms cubic-bezier(0,0,0.2,1)",
                  margin: "4px auto",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color:
                    activeStep === s
                      ? "var(--color-action)"
                      : "rgba(255,251,243,0.18)",
                  transition: "color 350ms ease",
                  marginBottom: 4,
                }}
              >
                {`0${s}`}
              </span>
            </div>
          ))}
        </div>

        {/* ── CSS ─────────────────────────────────────────────────────── */}
        <style>{`
          @keyframes orbit-go {
            from { transform: rotate(0deg)   translateX(${ORBIT_R}px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(${ORBIT_R}px) rotate(-360deg); }
          }

          @keyframes phil-mm-breathe {
            0%, 100% {
              box-shadow:
                0 0 0 0px  rgba(255,108,12,0),
                0 0 48px   rgba(6,7,113,0.88),
                0 0 96px   rgba(3,4,74,0.52),
                inset 0 0 22px rgba(3,4,74,0.8);
              transform: scale(1);
            }
            50% {
              box-shadow:
                0 0 0 12px rgba(255,108,12,0.028),
                0 0 68px   rgba(6,7,113,0.98),
                0 0 128px  rgba(3,4,74,0.72),
                inset 0 0 26px rgba(3,4,74,0.92);
              transform: scale(1.028);
            }
          }

          @keyframes phil-outer-pulse {
            0%, 100% { opacity: 0.45; transform: scale(1); }
            50%       { opacity: 0.9;  transform: scale(1.05); }
          }

          .phil-mm-center     { animation: phil-mm-breathe 7.5s ease-in-out infinite; }
          .phil-mm-outer-ring { animation: phil-outer-pulse 7.5s ease-in-out infinite; }

          /* 28s period — phase offsets at 120° intervals */
          .phil-orbit-n1 { animation: orbit-go 28s linear infinite; animation-delay:    0s; }
          .phil-orbit-n2 { animation: orbit-go 28s linear infinite; animation-delay:  -9.333s; }
          .phil-orbit-n3 { animation: orbit-go 28s linear infinite; animation-delay: -18.667s; }
          .orbit-paused  { animation-play-state: paused !important; }

          @media (max-width: 1100px) {
            .phil-text-overlay { width: 42% !important; }
          }
          @media (max-width: 860px) {
            .phil-text-overlay { width: 50% !important; right: 10px !important; }
            .phil-indicator    { display: none !important; }
          }
          @media (max-width: 600px) {
            .phil-text-overlay {
              position: absolute !important;
              right: 0 !important;
              left: 0 !important;
              width: 90% !important;
              margin: 0 auto !important;
              top: auto !important;
              bottom: 10vh !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

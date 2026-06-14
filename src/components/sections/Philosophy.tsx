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
import { useTranslations } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* Orbit radius the CSS animation uses */
const ORBIT_R = 185;

/* Concentric ring visuals: [diameter px, border color] */
const RINGS: [number, string][] = [
  [190, "rgba(255,251,243,0.07)"],
  [280, "rgba(255,251,243,0.044)"],
  [360, "rgba(255,251,243,0.022)"],
  [420, "rgba(255,108,12,0.048)"],
];

/* ── Sub-components ─────────────────────────────────────────────── */

function OrbitNode({ num }: { num: string }) {
  return (
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
        {num}
      </span>
    </div>
  );
}

interface ContentBlockProps {
  num: string;
  text: string;
  support: string;
  shouldReduce: boolean;
}
function ContentBlock({ num, text, support, shouldReduce }: ContentBlockProps) {
  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 24, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -16, clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.52, ease: EASE_OUT }}
      style={{ width: "100%" }}
    >
      {/* Ghost number */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,108,12,0.08)",
          marginBottom: -10,
          userSelect: "none",
        }}
      >
        {num}
      </div>

      {/* Label */}
      <span
        className="text-label"
        style={{ color: "var(--color-action)", display: "block", marginBottom: 20 }}
      >
        PHILOSOPHY
      </span>

      {/* Statement */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(17px, 1.8vw, 28px)",
          fontStyle: "italic",
          fontWeight: 600,
          lineHeight: 1.22,
          letterSpacing: "-0.02em",
          color: "rgba(255,251,243,0.96)",
          marginBottom: 22,
        }}
      >
        {text}
      </motion.p>

      {/* Orange rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.38, delay: 0.34, ease: EASE_OUT }}
        style={{
          width: 36,
          height: 2,
          backgroundColor: "var(--color-action)",
          transformOrigin: "left",
          marginBottom: 18,
        }}
      />

      {/* Support */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.45, ease: EASE_OUT }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.72,
          color: "rgba(255,251,243,0.42)",
          margin: 0,
        }}
      >
        {support}
      </motion.p>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */

export default function Philosophy() {
  const t = useTranslations("philosophy");
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* 500vh → 4 zones: 0=idle, 1=step1, 2=step2, 3=step3 */
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

  return (
    <section
      ref={sectionRef}
      id="felsefe"
      aria-label="Stüdyo felsefesi"
      style={{ height: "500vh", position: "relative" }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────────── */}
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
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* MM Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(200px, 26vw, 420px)",
            fontWeight: 700,
            color: "rgba(255,251,243,0.015)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.04em",
          }}
        >
          MM
        </div>

        {/* ── 4-COLUMN FLEX LAYOUT ─────────────────────────────── */}
        <div
          className="container-site phil-row"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >

          {/* ── COL 1 · QUOTE ──────────────────────────────────── */}
          <div className="phil-quote" style={{ flexShrink: 0, width: 220 }}>
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
              <div style={{ width: 26, height: 2, backgroundColor: "var(--color-action)" }} />
              <span className="text-label" style={{ color: "var(--color-action)" }}>
                {t("label")}
              </span>
            </div>

            {/* Opening quotation mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 64,
                fontStyle: "italic",
                fontWeight: 700,
                color: "rgba(255,108,12,0.11)",
                lineHeight: 0.75,
                marginBottom: 6,
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.3vw, 19px)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "rgba(255,251,243,0.82)",
                margin: "0 0 14px",
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
                color: "rgba(255,108,12,0.48)",
              }}
            >
              — MMDESIGN
            </span>
          </div>

          {/* ── COL 2 · ORBIT SYSTEM ───────────────────────────── */}
          <div
            className="phil-orbit-col"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*
              Orbit stage: fixed 460×460 visual box.
              overflow: visible so the hero node can drift slightly outside.
              Nodes are centered via top/left: 50%, margin: -26px.
              Hero node same technique with margin: -32px (64px circle).
            */}
            <div
              style={{
                position: "relative",
                width: 460,
                height: 460,
                flexShrink: 0,
                overflow: "visible",
              }}
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

              {/* Orbit nodes — each centred at (50%, 50%) then CSS-animated */}
              {beliefs.map((b, i) => {
                const isActive = activeStep === i + 1;
                const isDimmed = activeStep > 0 && !isActive;
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
                      opacity: isActive ? 0 : isDimmed ? 0.18 : 1,
                      transition: "opacity 480ms cubic-bezier(0,0,0.2,1)",
                      pointerEvents: "none",
                    }}
                  >
                    <OrbitNode num={b.num} />
                  </div>
                );
              })}

              {/* MM Center orb */}
              <div
                className="phil-mm-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 88,
                  height: 88,
                  marginTop: -44,
                  marginLeft: -44,
                  zIndex: 3,
                  borderRadius: "50%",
                  backgroundColor: "rgba(3,4,74,0.98)",
                  border: "1px solid rgba(255,251,243,0.09)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: "rgba(255,251,243,0.9)",
                  }}
                >
                  MM
                </span>
              </div>

              {/*
                HERO NODE — springs out of the orbit toward the content panel.
                Starts at (0, -ORBIT_R+20) = just inside the top of the outermost ring.
                Lands at (ORBIT_R - 30, -55) = right side of the ring, slightly up.
                With overflow: visible on parent, it can drift past ring edge.
              */}
              <AnimatePresence>
                {activeStep > 0 && !shouldReduce && (
                  <motion.div
                    key={`hero-${activeStep}`}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -32,
                      marginLeft: -32,
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                    initial={{ x: 0, y: -(ORBIT_R - 16), scale: 0.32, opacity: 0 }}
                    animate={{ x: ORBIT_R - 28, y: -54, scale: 1, opacity: 1 }}
                    exit={{ x: 0, y: -(ORBIT_R - 16), scale: 0.32, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 130,
                      damping: 17,
                      mass: 0.85,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        backgroundColor: "var(--color-action)",
                        border: "1px solid rgba(255,108,12,0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          "0 0 32px rgba(255,108,12,0.42), 0 0 64px rgba(255,108,12,0.14)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 14,
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          color: "#fff",
                        }}
                      >
                        {beliefs[activeStep - 1].num}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── COL 3 · CONTENT PANEL ──────────────────────────── */}
          <div
            className="phil-content"
            style={{
              flexShrink: 0,
              width: 300,
              minHeight: 300,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AnimatePresence mode="wait">
              {activeStep > 0 ? (
                <ContentBlock
                  key={`cb-${activeStep}`}
                  num={beliefs[activeStep - 1].num}
                  text={beliefs[activeStep - 1].text}
                  support={beliefs[activeStep - 1].support}
                  shouldReduce={shouldReduce}
                />
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-label"
                  style={{ color: "rgba(255,251,243,0.16)" }}
                >
                  SCROLL TO EXPLORE
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── COL 4 · SCROLL INDICATOR ───────────────────────── */}
          <div
            className="phil-indicator"
            style={{
              flexShrink: 0,
              marginLeft: 44,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.14)",
                writingMode: "vertical-rl",
                marginBottom: "auto",
                paddingTop: 40,
              }}
            >
              SCROLL
            </span>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {[1, 2, 3].map((s, i) => (
                <div
                  key={s}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        width: 1,
                        height: 28,
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
                      width: activeStep === s ? 10 : 6,
                      height: activeStep === s ? 10 : 6,
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

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.14)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                marginTop: "auto",
                paddingBottom: 40,
              }}
            >
              EXPLORE
            </span>
          </div>
        </div>

        {/* ── CSS ────────────────────────────────────────────────── */}
        <style>{`
          /*
            Orbit trick: rotate(θ) translateX(R) rotate(-θ)
            Element must start centered at the orbit origin.
            We handle centering via top:50%/left:50%/margin:-26px above.
          */
          @keyframes orbit-go {
            from { transform: rotate(0deg)   translateX(${ORBIT_R}px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(${ORBIT_R}px) rotate(-360deg); }
          }

          @keyframes phil-mm-glow {
            0%, 100% {
              box-shadow:
                0 0 0 0   rgba(255,108,12,0),
                0 0 50px  rgba(6,7,113,0.9),
                0 0 100px rgba(3,4,74,0.55),
                inset 0 0 20px rgba(3,4,74,0.8);
            }
            50% {
              box-shadow:
                0 0 0 18px rgba(255,108,12,0.022),
                0 0 70px  rgba(6,7,113,1),
                0 0 130px rgba(3,4,74,0.75),
                inset 0 0 20px rgba(3,4,74,0.95);
            }
          }

          .phil-mm-center { animation: phil-mm-glow 7s ease-in-out infinite; }

          /* Each node is pre-centered via CSS margin, then animated */
          .phil-orbit-n1 { animation: orbit-go 26s linear infinite; animation-delay:   0s; }
          .phil-orbit-n2 { animation: orbit-go 26s linear infinite; animation-delay:  -8.667s; }
          .phil-orbit-n3 { animation: orbit-go 26s linear infinite; animation-delay: -17.333s; }
          .orbit-paused  { animation-play-state: paused !important; }

          /* ── RESPONSIVE ── */
          @media (max-width: 1200px) {
            .phil-quote   { width: 180px !important; }
            .phil-content { width: 240px !important; }
          }
          @media (max-width: 1000px) {
            .phil-quote   { display: none !important; }
            .phil-content { width: 220px !important; }
            .phil-indicator { margin-left: 24px !important; }
          }
          @media (max-width: 700px) {
            .phil-row {
              flex-direction: column !important;
              gap: 28px 0 !important;
              padding-top: 80px;
              padding-bottom: 80px;
            }
            .phil-orbit-col { width: 100% !important; }
            .phil-content {
              width: 100% !important;
              min-height: 0 !important;
            }
            .phil-indicator { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

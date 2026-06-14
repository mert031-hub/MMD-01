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

/* Orbit rings: [diameter, opacity] */
const RINGS: [number, number][] = [
  [200, 0.07],
  [290, 0.045],
  [360, 0.025],
  [400, 0.04],  // outermost faint orange-tinted ring
];

function NodeCircle({ num }: { num: string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        backgroundColor: "rgba(255,251,243,0.06)",
        border: "1px solid rgba(255,251,243,0.18)",
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

interface ContentPanelProps {
  num: string;
  text: string;
  shouldReduce: boolean;
}
function ContentPanel({ num, text, shouldReduce }: ContentPanelProps) {
  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 32, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -20, clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      style={{ width: "100%" }}
    >
      {/* Large ghost number */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,108,12,0.1)",
          marginBottom: -4,
          userSelect: "none",
        }}
      >
        {num}
      </div>

      {/* PHILOSOPHY label */}
      <span
        className="text-label"
        style={{
          color: "var(--color-action)",
          display: "block",
          marginBottom: 20,
        }}
      >
        PHILOSOPHY
      </span>

      {/* Belief text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT }}
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

      {/* Orange separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.38, delay: 0.32, ease: EASE_OUT }}
        style={{
          width: 36,
          height: 2,
          backgroundColor: "var(--color-action)",
          transformOrigin: "left",
          marginBottom: 0,
        }}
      />
    </motion.div>
  );
}

export default function Philosophy() {
  const t = useTranslations("philosophy");
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Map scroll 0→1 across 500vh → step 0/1/2/3 */
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
      {/* ─── STICKY VIEWPORT ─────────────────────────────────────── */}
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
            color: "rgba(255,251,243,0.016)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.04em",
          }}
        >
          MM
        </div>

        {/* ─── MAIN 4-COL GRID ──────────────────────────────────── */}
        <div
          className="container-site phil-grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "260px 1fr 300px 52px",
            gap: "0 44px",
            alignItems: "center",
          }}
        >

          {/* ── COL 1 · QUOTE PANEL ──────────────────────────────── */}
          <div>
            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 44,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 2,
                  backgroundColor: "var(--color-action)",
                }}
              />
              <span
                className="text-label"
                style={{ color: "var(--color-action)" }}
              >
                {t("label")}
              </span>
            </div>

            {/* Opening quotation mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 68,
                fontStyle: "italic",
                fontWeight: 700,
                color: "rgba(255,108,12,0.11)",
                lineHeight: 0.75,
                marginBottom: 4,
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(15px, 1.5vw, 22px)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.28,
                letterSpacing: "-0.015em",
                color: "rgba(255,251,243,0.88)",
                margin: "0 0 18px",
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
                color: "rgba(255,108,12,0.5)",
              }}
            >
              — MMDESIGN
            </span>

            {/* Support text — swaps per active step */}
            <div style={{ marginTop: 36, minHeight: 90 }}>
              <AnimatePresence mode="wait">
                {activeStep > 0 && (
                  <motion.div
                    key={`sup-${activeStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.38, ease: EASE_OUT }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 1,
                        backgroundColor: "rgba(255,251,243,0.1)",
                        marginBottom: 14,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        lineHeight: 1.72,
                        color: "rgba(255,251,243,0.35)",
                        margin: 0,
                      }}
                    >
                      {beliefs[activeStep - 1].support}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── COL 2 · ORBIT SYSTEM ─────────────────────────────── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 460,
            }}
          >
            {/* Concentric orbit rings */}
            {RINGS.map(([d, o], i) => (
              <div
                key={d}
                style={{
                  position: "absolute",
                  width: d,
                  height: d,
                  borderRadius: "50%",
                  border: `1px solid ${
                    i === 3
                      ? `rgba(255,108,12,${o})`
                      : `rgba(255,251,243,${o})`
                  }`,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* MM Center orb */}
            <div
              className="phil-mm-center"
              style={{
                position: "relative",
                zIndex: 2,
                width: 90,
                height: 90,
                borderRadius: "50%",
                backgroundColor: "rgba(3,4,74,0.98)",
                border: "1px solid rgba(255,251,243,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
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

            {/* Orbit node container — absolutely centered */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              {beliefs.map((b, i) => {
                const isActive = activeStep === i + 1;
                const isDimmed = activeStep > 0 && !isActive;
                return (
                  <div
                    key={b.num}
                    className={`phil-orbit-node phil-orbit-n${i + 1}${
                      shouldReduce ? " orbit-paused" : ""
                    }`}
                    style={{
                      position: "absolute",
                      opacity: isActive ? 0 : isDimmed ? 0.18 : 1,
                      transition: "opacity 450ms cubic-bezier(0,0,0.2,1)",
                    }}
                  >
                    <NodeCircle num={b.num} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── COL 3 · CONTENT PANEL ────────────────────────────── */}
          <div
            style={{
              paddingLeft: 4,
              minHeight: 300,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AnimatePresence mode="wait">
              {activeStep > 0 ? (
                <ContentPanel
                  key={`cp-${activeStep}`}
                  num={beliefs[activeStep - 1].num}
                  text={beliefs[activeStep - 1].text}
                  shouldReduce={shouldReduce}
                />
              ) : (
                <motion.p
                  key="idle-hint"
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

          {/* ── COL 4 · VERTICAL SCROLL INDICATOR ───────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                color: "rgba(255,251,243,0.16)",
                writingMode: "vertical-rl",
                marginBottom: 18,
              }}
            >
              SCROLL
            </span>

            {[1, 2, 3].map((s, i) => (
              <div
                key={s}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 1,
                      height: 26,
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
                      activeStep === s
                        ? "0 0 8px rgba(255,108,12,0.7)"
                        : "none",
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

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.16)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                marginTop: 18,
              }}
            >
              EXPLORE
            </span>
          </div>
        </div>

        {/* ─── CSS ─────────────────────────────────────────────────── */}
        <style>{`
          @keyframes orbit-go {
            from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
          }
          @keyframes phil-mm-glow {
            0%, 100% {
              box-shadow:
                0 0 0 0 rgba(255,108,12,0),
                0 0 50px rgba(6,7,113,0.9),
                0 0 100px rgba(3,4,74,0.6),
                inset 0 0 20px rgba(3,4,74,0.8);
            }
            50% {
              box-shadow:
                0 0 0 16px rgba(255,108,12,0.025),
                0 0 70px rgba(6,7,113,1),
                0 0 130px rgba(3,4,74,0.8),
                inset 0 0 20px rgba(3,4,74,0.95);
            }
          }
          .phil-mm-center { animation: phil-mm-glow 7s ease-in-out infinite; }
          .phil-orbit-node { position: absolute; }
          .phil-orbit-n1 { animation: orbit-go 26s linear infinite; animation-delay: 0s; }
          .phil-orbit-n2 { animation: orbit-go 26s linear infinite; animation-delay: -8.667s; }
          .phil-orbit-n3 { animation: orbit-go 26s linear infinite; animation-delay: -17.333s; }
          .orbit-paused  { animation-play-state: paused !important; }

          @media (max-width: 1200px) {
            .phil-grid {
              grid-template-columns: 220px 1fr 260px 44px !important;
              gap: 0 28px !important;
            }
          }
          @media (max-width: 900px) {
            .phil-grid {
              grid-template-columns: 1fr !important;
              gap: 32px 0 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

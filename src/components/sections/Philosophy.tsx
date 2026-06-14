"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const ORBIT_R = 210;

/* Orbital rings — orbit ring at ORBIT_R*2 diameter is subtly orange */
const RINGS: [number, string][] = [
  [ORBIT_R * 2, "rgba(255,108,12,0.14)"],
  [320,         "rgba(255,251,243,0.055)"],
  [540,         "rgba(255,251,243,0.028)"],
  [660,         "rgba(255,108,12,0.035)"],
  [770,         "rgba(255,251,243,0.012)"],
];

/* Orange dots on the orbit ring — give it the "dotted trail" look */
const ORBIT_DOTS: [number, number, number][] = [
  [0,   4.0, 0.75], [12, 1.5, 0.14], [24, 2.0, 0.22], [36, 1.5, 0.11],
  [48,  2.5, 0.32], [60, 1.5, 0.13], [72, 4.0, 0.70], [84, 1.5, 0.12],
  [96,  2.0, 0.20], [108,1.5, 0.11], [120,4.0, 0.68], [132,2.0, 0.18],
  [144, 1.5, 0.12], [156,2.5, 0.28], [168,1.5, 0.13], [180,4.0, 0.72],
  [192, 1.5, 0.13], [204,2.0, 0.21], [216,1.5, 0.10], [228,3.0, 0.45],
  [240, 1.5, 0.12], [252,2.5, 0.30], [264,1.5, 0.11], [276,4.0, 0.66],
  [288, 2.0, 0.19], [300,1.5, 0.13], [312,3.0, 0.48], [324,1.5, 0.13],
  [336, 2.5, 0.26], [348,1.5, 0.11],
];

/* Drifting outer particles */
const PARTICLES: [number, number, number, number][] = [
  [18,  18, 3,   0.28],
  [55,  12, 2,   0.16],
  [97,  22, 2.5, 0.22],
  [138, 10, 1.5, 0.14],
  [174, 16, 3,   0.24],
  [220, 13, 2,   0.14],
  [262, 19, 2.5, 0.20],
  [305, 11, 2,   0.16],
  [342, 15, 3,   0.22],
];

const TICKS = Array.from({ length: 48 }, (_, i) => i * 7.5);

/* Labels shown next to each orbit node (title + 2 short description lines) */
const NODE_LABELS: Record<string, { en: [string, string, string]; tr: [string, string, string] }> = {
  "01": {
    en: ["PHILOSOPHY", "Performance is", "not an option."],
    tr: ["FELSEFE",    "Performans bir", "seçenek değil."],
  },
  "02": {
    en: ["APPROACH",  "Strategy first,",    "design with purpose."],
    tr: ["YAKLAŞIM",  "Önce strateji,",     "amaçlı tasarım."],
  },
  "03": {
    en: ["PROCESS",   "Structured.",         "Transparent. Effective."],
    tr: ["SÜREÇ",     "Yapılandırılmış.",    "Şeffaf. Etkili."],
  },
};

const DISPLAY_LINES: Record<string, Record<string, string[]>> = {
  "01": {
    en: ["Design is strategy", "made visible."],
    tr: ["Tasarım, stratejinin", "görsel halidir."],
  },
  "02": {
    en: ["Every industry speaks", "a different digital language."],
    tr: ["Her sektörün dijital", "dili farklıdır."],
  },
  "03": {
    en: ["The best website makes", "clients choose you."],
    tr: ["En iyi website, sizi", "seçmeyi kolaylaştırandır."],
  },
};

/* ─── Content panel ──────────────────────────────────────────────────────── */
interface PanelProps {
  num: string;
  lines: string[];
  support: string;
  vis: MotionValue<number>;
  shouldReduce: boolean;
  activeStep: number;
  mounted: boolean;
}

function ContentPanel({ num, lines, support, vis, shouldReduce, activeStep, mounted }: PanelProps) {
  const numInt = parseInt(num, 10);
  const opacityVal = shouldReduce ? (activeStep === numInt ? 1 : 0) : vis;
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: mounted ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        opacity: opacityVal,
        pointerEvents: "none",
      }}
    >
      <div
        aria-hidden="true"
        className="phil-ghost-num"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(56px, 6vw, 96px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,108,12,0.07)",
          marginBottom: -2,
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {num}
      </div>

      <span
        className="text-label"
        style={{
          color: "var(--color-action)",
          display: "block",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        PHILOSOPHY {num}
      </span>

      <div style={{ marginBottom: 18, flexShrink: 0 }}>
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <div
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(18px, 2.2vw, 34px)",
                fontWeight: 600,
                fontStyle: isLast ? "italic" : "normal",
                letterSpacing: "-0.02em",
                lineHeight: 1.28,
                color: isLast ? "var(--color-action)" : "rgba(255,251,243,0.95)",
                paddingBottom: 2,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      <div style={{ width: 36, height: 2, backgroundColor: "var(--color-action)", marginBottom: 14, flexShrink: 0 }} />

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(11px, 0.85vw, 13px)",
          lineHeight: 1.8,
          color: "rgba(255,251,243,0.40)",
          margin: "0 0 16px",
          maxWidth: 320,
          flexShrink: 0,
        }}
      >
        {support}
      </p>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,108,12,0.38)",
          flexShrink: 0,
        }}
      >
        — MMDESIGN
      </span>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function Philosophy() {
  const t            = useTranslations("philosophy");
  const locale       = useLocale();
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef   = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const [panelMounted, setPanelMounted] = useState({
    quote: true, s1: false, s2: false, s3: false,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPanelMounted({
      quote: v <  0.16,
      s1:    v >= 0.13 && v <= 0.54,
      s2:    v >= 0.51 && v <= 0.83,
      s3:    v >= 0.80,
    });
  });

  const stepFloat = useTransform(
    scrollYProgress,
    [0,    0.10, 0.16, 0.48, 0.54, 0.78, 0.83, 1.0],
    [0,    0,    1,    1,    2,    2,    3,    3   ]
  );
  useMotionValueEvent(stepFloat, "change", (v) => {
    setActiveStep(v < 0.5 ? 0 : v < 1.5 ? 1 : v < 2.5 ? 2 : 3);
  });

  const rawOrbitX     = useTransform(scrollYProgress, [0.08, 0.26], [0, 130]);
  const rawOrbitScale = useTransform(scrollYProgress, [0.08, 0.26], [1, 0.82]);
  const orbitX     = useSpring(rawOrbitX,     { stiffness: 160, damping: 26, mass: 0.9 });
  const orbitScale = useSpring(rawOrbitScale, { stiffness: 160, damping: 26, mass: 0.9 });

  const quotePanelOp = useTransform(scrollYProgress, [0.06, 0.13], [1, 0]);

  const trailOp = useTransform(
    scrollYProgress,
    [0.06, 0.13, 0.18, 0.41, 0.44, 0.60, 0.64, 0.70, 0.73, 0.89, 0.93],
    [0,    0.9,  0,    0,    0.9,  0,    0,    0,    0.9,  0,    0   ]
  );

  const s1Vis = useTransform(scrollYProgress, [0.16, 0.24, 0.44, 0.51], [0, 1, 1, 0]);
  const s2Vis = useTransform(scrollYProgress, [0.54, 0.62, 0.73, 0.80], [0, 1, 1, 0]);
  const s3Vis = useTransform(scrollYProgress, [0.83, 0.91, 0.99, 1.00], [0, 1, 1, 1]);

  const beliefs = [
    { num: "01", support: t("belief1Support") },
    { num: "02", support: t("belief2Support") },
    { num: "03", support: t("belief3Support") },
  ];

  const isActive = activeStep > 0;
  const lang     = locale === "en" ? "en" : "tr";

  const stepPanels = [
    { num: "01", lines: DISPLAY_LINES["01"]?.[lang] ?? [], support: beliefs[0].support, vis: s1Vis, mounted: panelMounted.s1 },
    { num: "02", lines: DISPLAY_LINES["02"]?.[lang] ?? [], support: beliefs[1].support, vis: s2Vis, mounted: panelMounted.s2 },
    { num: "03", lines: DISPLAY_LINES["03"]?.[lang] ?? [], support: beliefs[2].support, vis: s3Vis, mounted: panelMounted.s3 },
  ];

  const heroNum = isActive ? (beliefs[activeStep - 1]?.num ?? "01") : "01";

  return (
    <section
      ref={sectionRef}
      id="felsefe"
      aria-label="Stüdyo felsefesi"
      style={{ height: "340vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--color-authority)",
          backgroundImage:
            "radial-gradient(circle, rgba(255,251,243,0.028) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* Depth gradients */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 1100, height: 1100, marginTop: -550, marginLeft: -550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,10,130,0.48) 0%, rgba(6,7,113,0.22) 30%, transparent 68%)",
          pointerEvents: "none", zIndex: 1,
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 420, height: 420, marginTop: -210, marginLeft: -210,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,108,12,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* MM Monument — decorative */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(300px, 40vw, 640px)",
          fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1,
          color: "rgba(255,251,243,0.016)",
          userSelect: "none", pointerEvents: "none", zIndex: 0,
        }}>MM</div>

        {/* ── Top header strip ─────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="phil-top-strip"
          style={{
            position: "absolute",
            top: "clamp(18px, 2.8vh, 32px)",
            left: "clamp(24px, 6vw, 90px)",
            right: "clamp(48px, 4vw, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 8,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 16, height: 1, backgroundColor: "rgba(255,108,12,0.38)" }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 9, fontWeight: 700, letterSpacing: "0.26em",
              textTransform: "uppercase", color: "rgba(255,251,243,0.18)",
            }}>
              STUDIO PHILOSOPHY
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { label: "NODES", value: "03" },
              { label: "CYCLE", value: "28s" },
              { label: "ORBIT", value: "Ø420" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 7, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,108,12,0.26)",
                }}>{label}</span>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.08em", color: "rgba(255,251,243,0.14)",
                }}>{value}</span>
              </div>
            ))}
            <div style={{ width: 1, height: 14, backgroundColor: "rgba(255,251,243,0.06)" }} />
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.12em", color: "rgba(255,251,243,0.10)",
            }}>
              {activeStep > 0 ? `${String(activeStep).padStart(2, "0")} / 03` : "— / 03"}
            </span>
          </div>
        </div>

        {/* ══ LEFT COLUMN ═══════════════════════════════════════════════════ */}
        <div
          className="phil-left-col"
          style={{
            position: "absolute",
            left: "clamp(24px, 6vw, 90px)",
            top: 0, bottom: 0,
            display: "flex",
            alignItems: "center",
            width: "clamp(260px, 33%, 460px)",
            zIndex: 7,
            pointerEvents: "none",
          }}
        >
          <div
            className="phil-panel-wrap"
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(300px, 56vh, 500px)",
            }}
          >
            {/* ── Quote (idle) ─────────────────────────────────────── */}
            <motion.div
              style={{
                position: "absolute", inset: 0,
                display: panelMounted.quote ? "flex" : "none",
                flexDirection: "column", justifyContent: "center",
                opacity: shouldReduce ? (activeStep === 0 ? 1 : 0) : quotePanelOp,
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ width: 22, height: 2, backgroundColor: "var(--color-action)" }} />
                <span className="text-label" style={{ color: "var(--color-action)" }}>
                  {t("label")}
                </span>
              </div>
              <div aria-hidden="true" style={{
                fontFamily: "var(--font-display)",
                fontSize: 52, fontStyle: "italic", fontWeight: 700,
                color: "rgba(255,108,12,0.09)", lineHeight: 0.75,
                marginBottom: 8, userSelect: "none",
              }}>
                &ldquo;
              </div>
              <blockquote style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.4vw, 20px)",
                fontStyle: "italic", fontWeight: 600,
                lineHeight: 1.3, letterSpacing: "-0.015em",
                color: "rgba(255,251,243,0.80)",
                margin: "0 0 14px", padding: 0, border: "none",
              }}>
                {t("quote")}
              </blockquote>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.20em", textTransform: "uppercase",
                color: "rgba(255,108,12,0.42)",
              }}>
                — MMDESIGN
              </span>
            </motion.div>

            {/* ── Content panels 01 / 02 / 03 ─────────────────────── */}
            {stepPanels.map((panel) => (
              <ContentPanel
                key={panel.num}
                num={panel.num}
                lines={panel.lines}
                support={panel.support}
                vis={panel.vis}
                mounted={panel.mounted}
                shouldReduce={shouldReduce}
                activeStep={activeStep}
              />
            ))}
          </div>
        </div>

        {/* ══ ORBIT SYSTEM ══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        >
          <motion.div
            style={{
              x: shouldReduce ? 0 : orbitX,
              scale: shouldReduce ? 1 : orbitScale,
              position: "relative",
              width: 560, height: 560,
            }}
          >
            {/* Concentric rings */}
            {RINGS.map(([d, color]) => (
              <div
                key={d}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: d, height: d,
                  marginTop: -(d / 2), marginLeft: -(d / 2),
                  borderRadius: "50%", border: `1px solid ${color}`,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Pulsing inner energy ring */}
            <div
              className="phil-energy-ring"
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: 340, height: 340, marginTop: -170, marginLeft: -170,
                borderRadius: "50%", border: "1px solid rgba(255,108,12,0.08)",
                pointerEvents: "none",
              }}
            />

            {/* Orbit conic trail */}
            {!shouldReduce && (
              <motion.div
                className="phil-orbit-trail"
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: ORBIT_R * 2, height: ORBIT_R * 2,
                  marginTop: -ORBIT_R, marginLeft: -ORBIT_R,
                  borderRadius: "50%",
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(255,108,12,0.012) 20%, rgba(255,108,12,0.040) 42%, rgba(255,108,12,0.012) 62%, transparent 75%)",
                  pointerEvents: "none", opacity: trailOp,
                }}
              />
            )}

            {/* Orange dots on the orbit ring */}
            {ORBIT_DOTS.map(([angle, size, opacity]) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <div
                  key={`od${angle}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: size, height: size, borderRadius: "50%",
                    marginTop: -(size / 2), marginLeft: -(size / 2),
                    backgroundColor: `rgba(255,108,12,${opacity})`,
                    boxShadow: opacity > 0.4
                      ? `0 0 ${size * 4}px rgba(255,108,12,${opacity * 0.7})`
                      : "none",
                    transform: `translate(${Math.cos(rad) * ORBIT_R}px, ${Math.sin(rad) * ORBIT_R}px)`,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* Fine tick marks (inner blueprint detail) */}
            {TICKS.map((deg) => {
              const rad     = (deg * Math.PI) / 180;
              const isMajor = deg % 90 === 0;
              const isMid   = deg % 30 === 0 && !isMajor;
              const size    = isMajor ? 3 : isMid ? 1.5 : 1;
              const op      = isMajor ? 0.10 : isMid ? 0.05 : 0.025;
              const r       = ORBIT_R + (isMajor ? 28 : isMid ? 22 : 16);
              return (
                <div
                  key={`t${deg}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: size, height: size, borderRadius: "50%",
                    marginTop: -(size / 2), marginLeft: -(size / 2),
                    backgroundColor: `rgba(255,251,243,${op})`,
                    transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* Counter-rotating outer particles */}
            <div
              className={`phil-particles-wrap${shouldReduce ? " orbit-paused" : ""}`}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {PARTICLES.map(([angleDeg, radiusOffset, size, opacity], idx) => {
                const rad = (angleDeg * Math.PI) / 180;
                const r   = ORBIT_R + radiusOffset + 30;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: size, height: size, borderRadius: "50%",
                      marginTop: -(size / 2), marginLeft: -(size / 2),
                      backgroundColor: `rgba(255,108,12,${opacity})`,
                      boxShadow: `0 0 ${size * 6}px rgba(255,108,12,${opacity * 0.8})`,
                      transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                    }}
                  />
                );
              })}
            </div>

            {/* ── Orbit nodes (01, 02, 03) with labels ─────────────── */}
            {beliefs.map((b, i) => {
              const isNodeActive = activeStep === i + 1;
              const lbl = NODE_LABELS[b.num]?.[lang] ?? ["", "", ""];
              return (
                <div
                  key={b.num}
                  className={`phil-orbit-n${i + 1}${shouldReduce ? " orbit-paused" : ""}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    /* Centre the 72 px circle on the orbit point */
                    marginTop: -36, marginLeft: -36,
                    pointerEvents: "none",
                  }}
                >
                  {/* Circle + label side-by-side (counter-rotation keeps both upright) */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    {/* Orange glow circle */}
                    <div
                      className={isNodeActive
                        ? "phil-orbit-node-body phil-orbit-node-active"
                        : "phil-orbit-node-body"}
                      style={{
                        width: 72, height: 72, borderRadius: "50%",
                        flexShrink: 0,
                        backgroundColor: isNodeActive
                          ? "rgba(255,251,243,0.03)"
                          : "rgba(255,108,12,0.16)",
                        border: isNodeActive
                          ? "1px solid rgba(255,251,243,0.20)"
                          : "1.5px solid rgba(255,108,12,0.65)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity:   isNodeActive ? 0.25 : 1,
                        transform: isNodeActive ? "scale(0.80)" : "scale(1)",
                        transition:
                          "background-color 400ms cubic-bezier(0,0,0.2,1), border-color 400ms cubic-bezier(0,0,0.2,1), opacity 400ms cubic-bezier(0,0,0.2,1), transform 400ms cubic-bezier(0,0,0.2,1)",
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 15, fontWeight: 700, letterSpacing: "0.04em",
                        color: isNodeActive
                          ? "rgba(255,251,243,0.40)"
                          : "rgba(255,108,12,0.96)",
                        transition: "color 400ms cubic-bezier(0,0,0.2,1)",
                      }}>
                        {b.num}
                      </span>
                    </div>

                    {/* Label — always to the right in screen coords */}
                    <div
                      style={{
                        marginLeft: 14,
                        opacity: isNodeActive ? 0.08 : 1,
                        transition: "opacity 400ms ease",
                      }}
                    >
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "rgba(255,108,12,0.72)",
                        marginBottom: 4,
                      }}>
                        {lbl[0]}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(10px, 0.75vw, 12px)",
                        fontWeight: 500,
                        lineHeight: 1.45,
                        color: "rgba(255,251,243,0.45)",
                        whiteSpace: "nowrap",
                      }}>
                        {lbl[1]}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(10px, 0.75vw, 12px)",
                        fontWeight: 500,
                        lineHeight: 1.45,
                        color: "rgba(255,251,243,0.28)",
                        whiteSpace: "nowrap",
                      }}>
                        {lbl[2]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── MM Core — large central sphere ───────────────────── */}
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: 148, height: 148,
                marginTop: -74, marginLeft: -74,
                zIndex: 3,
              }}
            >
              {/* Outer halo */}
              <div className="phil-mm-halo" style={{
                position: "absolute", top: -32, left: -32,
                width: 212, height: 212, borderRadius: "50%",
                border: "1px solid rgba(255,108,12,0.04)", pointerEvents: "none",
              }} />
              {/* Mid glow ring */}
              <div className="phil-mm-outer-ring" style={{
                position: "absolute", top: -16, left: -16,
                width: 180, height: 180, borderRadius: "50%",
                border: "1px solid rgba(255,108,12,0.09)", pointerEvents: "none",
              }} />
              {/* Core sphere */}
              <div
                className="phil-mm-center"
                style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  backgroundColor: "rgba(3,4,74,0.98)",
                  border: "1px solid rgba(255,251,243,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "radial-gradient(circle at 38% 34%, rgba(255,108,12,0.12) 0%, transparent 60%)",
                  pointerEvents: "none",
                }} />
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em",
                  color: "rgba(255,251,243,0.88)", position: "relative", zIndex: 1,
                }}>
                  MM
                </span>
              </div>
            </div>

            {/* ── Hero node — magnetic spring from orbit to left position ── */}
            <AnimatePresence mode="sync">
              {!shouldReduce && isActive && (
                <motion.div
                  key={`hero-${activeStep}`}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    marginTop: -46, marginLeft: -46,
                    zIndex: 10, pointerEvents: "none",
                  }}
                  initial={{
                    x:       ORBIT_R * 0.60,
                    y:       -ORBIT_R * 0.46,
                    scale:   0.28,
                    opacity: 0,
                  }}
                  animate={{
                    x:       -(ORBIT_R - 20),
                    y:       -30,
                    scale:   1,
                    opacity: 1,
                  }}
                  exit={{
                    scale:   0.18,
                    opacity: 0,
                    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping:   22,
                    mass:      1.1,
                  }}
                >
                  <div className="phil-hero-pulse" style={{
                    position: "absolute", top: -12, left: -12,
                    width: 116, height: 116, borderRadius: "50%",
                    border: "1px solid rgba(255,108,12,0.26)", pointerEvents: "none",
                  }} />
                  <div style={{
                    width: 92, height: 92, borderRadius: "50%",
                    backgroundColor: "var(--color-action)",
                    border: "2px solid rgba(255,140,50,0.48)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow:
                      "0 0 28px rgba(255,108,12,0.62), 0 0 56px rgba(255,108,12,0.28), 0 0 90px rgba(255,108,12,0.12)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18, fontWeight: 700, letterSpacing: "0.04em",
                      color: "#fff", position: "absolute",
                    }}>
                      {heroNum}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────── */}
        <div
          className="phil-indicator"
          style={{
            position: "absolute",
            right: "clamp(14px, 1.8vw, 28px)",
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
                  transition: "background-color 220ms ease",
                }} />
              )}
              <div style={{
                width:  activeStep === s ? 9 : 5,
                height: activeStep === s ? 9 : 5,
                borderRadius: "50%",
                backgroundColor:
                  activeStep === s ? "var(--color-action)"
                  : activeStep > s  ? "rgba(255,108,12,0.3)"
                  :                   "rgba(255,251,243,0.1)",
                boxShadow: activeStep === s
                  ? "0 0 10px rgba(255,108,12,0.8), 0 0 20px rgba(255,108,12,0.3)"
                  : "none",
                transition: "all 220ms cubic-bezier(0,0,0.2,1)",
                margin: "4px auto",
              }} />
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: 9, fontWeight: 700, letterSpacing: "0.04em",
                color: activeStep === s ? "var(--color-action)" : "rgba(255,251,243,0.18)",
                transition: "color 220ms ease", marginBottom: 4,
              }}>
                {`0${s}`}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom step-progress strip ───────────────────────────────── */}
        <div
          aria-hidden="true"
          className="phil-bottom-strip"
          style={{
            position: "absolute",
            bottom: "clamp(18px, 2.8vh, 32px)",
            left: "clamp(24px, 6vw, 90px)",
            right: "clamp(48px, 4vw, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 8, pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{
                display: "flex", alignItems: "center", gap: 7,
                opacity: activeStep === s ? 1 : activeStep > s ? 0.38 : 0.11,
                transition: "opacity 400ms ease",
              }}>
                <div style={{
                  width: activeStep === s ? 22 : 10, height: 1,
                  backgroundColor: activeStep === s
                    ? "rgba(255,108,12,0.80)" : "rgba(255,251,243,0.22)",
                  transition: "width 420ms cubic-bezier(0,0,0.2,1), background-color 400ms ease",
                }} />
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: activeStep === s ? "rgba(255,108,12,0.88)" : "rgba(255,251,243,0.30)",
                  transition: "color 400ms ease",
                }}>
                  {`0${s}`}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            height: 1, width: "clamp(48px, 7vw, 100px)",
            background: "linear-gradient(to right, rgba(255,108,12,0.16), transparent)",
          }} />
        </div>

        {/* ── CSS ──────────────────────────────────────────────────────── */}
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
                0 0 60px   rgba(6,7,113,0.90),
                0 0 130px  rgba(3,4,74,0.55),
                inset 0 0 32px rgba(3,4,74,0.85);
              transform: scale(1);
            }
            50% {
              box-shadow:
                0 0 0 14px rgba(255,108,12,0.025),
                0 0 90px   rgba(6,7,113,1.0),
                0 0 180px  rgba(3,4,74,0.75),
                inset 0 0 40px rgba(3,4,74,0.95);
              transform: scale(1.04);
            }
          }
          @keyframes phil-outer-pulse {
            0%, 100% { opacity: 0.4;  transform: scale(1); }
            50%       { opacity: 0.90; transform: scale(1.06); }
          }
          @keyframes phil-halo-breathe {
            0%, 100% { opacity: 0.3;  transform: scale(1); }
            50%       { opacity: 0.70; transform: scale(1.05); }
          }
          @keyframes phil-energy-pulse {
            0%, 100% { opacity: 0.30; transform: scale(1); }
            50%       { opacity: 0.75; transform: scale(1.018); }
          }
          @keyframes phil-hero-pulse-kf {
            0%, 100% { opacity: 0.5;  transform: scale(1); }
            60%       { opacity: 0.06; transform: scale(1.8); }
          }
          @keyframes phil-node-glow {
            0%, 100% {
              box-shadow: 0 0 8px rgba(255,108,12,0.25), 0 0 0px rgba(255,108,12,0);
            }
            45% {
              box-shadow:
                0 0 24px rgba(255,108,12,0.75),
                0 0 48px rgba(255,108,12,0.32),
                0 0 80px rgba(255,108,12,0.12);
            }
          }
          @keyframes phil-node-scale-pulse {
            0%, 100% { transform: scale(1); }
            45%       { transform: scale(1.10); }
          }

          .phil-mm-center     { animation: phil-mm-breathe     7.5s ease-in-out infinite; }
          .phil-mm-outer-ring { animation: phil-outer-pulse     7.5s ease-in-out infinite; }
          .phil-mm-halo       { animation: phil-halo-breathe   7.5s ease-in-out infinite 0.9s; }
          .phil-energy-ring   { animation: phil-energy-pulse   4.2s ease-in-out infinite; }
          .phil-orbit-trail   { animation: phil-trail-spin     28s  linear     infinite; }
          .phil-particles-wrap{ animation: phil-particles-drift 90s linear     infinite; }
          .phil-hero-pulse    { animation: phil-hero-pulse-kf  2.4s ease-out   infinite; }

          .phil-orbit-n1 { animation: orbit-go 28s linear infinite; animation-delay:     0s; }
          .phil-orbit-n2 { animation: orbit-go 28s linear infinite; animation-delay:  -9.333s; }
          .phil-orbit-n3 { animation: orbit-go 28s linear infinite; animation-delay: -18.667s; }
          .orbit-paused  { animation-play-state: paused !important; }

          /* Orange glow breathe — staggered per node */
          .phil-orbit-node-body {
            animation:
              phil-node-glow        2.6s ease-in-out infinite,
              phil-node-scale-pulse 2.6s ease-in-out infinite;
          }
          .phil-orbit-n1 .phil-orbit-node-body { animation-delay:     0s,    0s; }
          .phil-orbit-n2 .phil-orbit-node-body { animation-delay: -0.87s, -0.87s; }
          .phil-orbit-n3 .phil-orbit-node-body { animation-delay: -1.73s, -1.73s; }
          .phil-orbit-node-active {
            animation: none !important;
          }

          @media (max-width: 1100px) {
            .phil-left-col { width: clamp(240px, 38%, 440px) !important; }
          }

          @media (max-width: 860px) {
            .phil-left-col     { width: 42% !important; left: 16px !important; }
            .phil-indicator    { display: none !important; }
            .phil-top-strip    { display: none !important; }
            .phil-bottom-strip { display: none !important; }
          }

          @media (max-width: 640px) {
            .phil-left-col {
              left: 0 !important; right: 0 !important;
              top: auto !important; bottom: 0 !important;
              width: 100% !important;
              padding: 0 5vw 5vh !important;
              align-items: flex-end !important;
              background: linear-gradient(to top, var(--color-authority) 55%, transparent) !important;
              z-index: 8 !important;
            }
            .phil-panel-wrap { height: 260px !important; }
            .phil-ghost-num  { display: none !important; }
            .phil-indicator  { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

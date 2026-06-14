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
}

function ContentPanel({ num, lines, support, vis, shouldReduce, activeStep }: PanelProps) {
  const numInt = parseInt(num, 10);
  const opacityVal = shouldReduce ? (activeStep === numInt ? 1 : 0) : vis;
  return (
    /*
      Fills the shared panel-wrap container (position:absolute inset:0).
      Flex column + justify:center keeps content vertically centred.
      Opacity is the ONLY motion applied — no Y drift — so all text
      is fully readable the instant the panel reaches opacity > 0.4.
    */
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: opacityVal,
        pointerEvents: "none",
      }}
    >
      {/* Ghost principle number — decorative, aria-hidden */}
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

      {/* Full statement — all lines always visible at same time */}
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

      {/* Orange rule */}
      <div
        style={{
          width: 36,
          height: 2,
          backgroundColor: "var(--color-action)",
          marginBottom: 14,
          flexShrink: 0,
        }}
      />

      {/* Supporting paragraph */}
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

      {/* Attribution */}
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
    ── Scroll timeline (500 vh total) ──────────────────────────────────────
    0.00 – 0.07   Idle: orbit visible, quote panel fully shown
    0.07 – 0.10   Quote fades OUT (fully gone at 0.10)
    — GAP —       0.10 – 0.12 nothing visible (orbit-shift still happening)
    0.12 – 0.20   Step 1 fades IN  (starts AFTER quote is 100% gone)
    0.20 – 0.38   Step 1 readable  (~90 vh)
    0.38 – 0.46   Step 1 fades OUT (fully gone at 0.46)
    — GAP —       0.46 – 0.48
    0.48 – 0.56   Step 2 fades IN  (starts AFTER step 1 is 100% gone)
    0.56 – 0.68   Step 2 readable  (~60 vh)
    0.68 – 0.76   Step 2 fades OUT (fully gone at 0.76)
    — GAP —       0.76 – 0.78
    0.78 – 0.86   Step 3 fades IN  (starts AFTER step 2 is 100% gone)
    0.86 – 1.00   Step 3 readable  (~70 vh)
  */

  /* Discrete step drives orbit node dimming + hero node identity */
  const stepFloat = useTransform(
    scrollYProgress,
    [0,   0.08, 0.12, 0.42, 0.48, 0.72, 0.78, 1.0],
    [0,   0,    1,    1,    2,    2,    3,    3  ]
  );
  useMotionValueEvent(stepFloat, "change", (v) => {
    setActiveStep(v < 0.5 ? 0 : v < 1.5 ? 1 : v < 2.5 ? 2 : 3);
  });

  /* Orbit shift: +120 px right when active (creates left-column room) */
  const rawOrbitX     = useTransform(scrollYProgress, [0.06, 0.20], [0, 120]);
  const rawOrbitScale = useTransform(scrollYProgress, [0.06, 0.20], [1, 0.84]);
  const orbitX     = useSpring(rawOrbitX,     { stiffness: 160, damping: 26, mass: 0.9 });
  const orbitScale = useSpring(rawOrbitScale, { stiffness: 160, damping: 26, mass: 0.9 });

  /*
    Quote fades completely to 0 at 0.10.
    Step 1 does NOT start until 0.12. Gap guaranteed → zero overlap.
  */
  const quotePanelOp = useTransform(scrollYProgress, [0.04, 0.10], [1, 0]);

  /* Trail: only visible during transition windows */
  const trailOp = useTransform(
    scrollYProgress,
    [0.04, 0.10, 0.14, 0.35, 0.38, 0.56, 0.60, 0.66, 0.68, 0.86, 0.90],
    [0,    0.9,  0,    0,    0.9,  0,    0,    0,    0.9,  0,    0   ]
  );

  /*
    Panel opacity ranges are strictly sequential — zero overlap guaranteed:
    quote   exits  at 0.10  →  s1 enters at 0.12  (gap 0.10-0.12)
    s1      exits  at 0.46  →  s2 enters at 0.48  (gap 0.46-0.48)
    s2      exits  at 0.76  →  s3 enters at 0.78  (gap 0.76-0.78)
  */
  const s1Vis = useTransform(scrollYProgress, [0.12, 0.20, 0.38, 0.46], [0, 1, 1, 0]);
  const s2Vis = useTransform(scrollYProgress, [0.48, 0.56, 0.68, 0.76], [0, 1, 1, 0]);
  const s3Vis = useTransform(scrollYProgress, [0.78, 0.86, 0.98, 1.0 ], [0, 1, 1, 1]);

  const beliefs = [
    { num: "01", support: t("belief1Support") },
    { num: "02", support: t("belief2Support") },
    { num: "03", support: t("belief3Support") },
  ];

  const isActive     = activeStep > 0;
  const lang         = locale === "en" ? "en" : "tr";

  const stepPanels = [
    { num: "01", lines: DISPLAY_LINES["01"]?.[lang] ?? [], support: beliefs[0].support, vis: s1Vis },
    { num: "02", lines: DISPLAY_LINES["02"]?.[lang] ?? [], support: beliefs[1].support, vis: s2Vis },
    { num: "03", lines: DISPLAY_LINES["03"]?.[lang] ?? [], support: beliefs[2].support, vis: s3Vis },
  ];

  const heroNum = isActive ? beliefs[activeStep - 1]?.num ?? "01" : "01";

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
        {/* Depth gradients — z:1, decorative only */}
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

        {/* MM Monument — z:0, aria-hidden, purely decorative */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(300px, 40vw, 640px)",
          fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1,
          color: "rgba(255,251,243,0.018)",
          userSelect: "none", pointerEvents: "none", zIndex: 0,
        }}>MM</div>

        {/*
          ══ LEFT COLUMN ═══════════════════════════════════════════════════
          Stretches full viewport height, uses flexbox to vertically centre
          the panel-wrap. All panels (quote + 3 content) sit inside the
          same panel-wrap as position:absolute with inset:0, so they all
          occupy the same space and scroll-driven opacity decides which one
          is visible. This eliminates all stacking / overlap issues.
        */}
        <div
          className="phil-left-col"
          style={{
            position: "absolute",
            left: "clamp(24px, 6vw, 90px)",
            top: 0,
            bottom: 0,
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
              /* Fixed height so all absolutely-positioned children have a reference */
              height: "clamp(300px, 56vh, 500px)",
            }}
          >
            {/* ── Quote (idle) ─────────────────────────────────────── */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 52,
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "rgba(255,108,12,0.09)",
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
                  fontSize: "clamp(13px, 1.4vw, 20px)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  color: "rgba(255,251,243,0.80)",
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
                  color: "rgba(255,108,12,0.42)",
                }}
              >
                — MMDESIGN
              </span>
            </motion.div>

            {/* ── Content panels (01, 02, 03) ─────────────────────── */}
            {stepPanels.map((panel) => (
              <ContentPanel
                key={panel.num}
                num={panel.num}
                lines={panel.lines}
                support={panel.support}
                vis={panel.vis}
                shouldReduce={shouldReduce}
                activeStep={activeStep}
              />
            ))}
          </div>
        </div>

        {/*
          ══ ORBIT SYSTEM ══════════════════════════════════════════════════
          Centred in viewport; shifts +120 px right when a step is active.
          The outermost ring (530 px diam) extends leftward, visually
          framing the content column. z:5 — below content (z:7).
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
            style={{
              x: shouldReduce ? 0 : orbitX,
              scale: shouldReduce ? 1 : orbitScale,
              position: "relative",
              width: 460,
              height: 460,
            }}
          >
            {/* Rings */}
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

            {/* Pulsing energy ring */}
            <div
              className="phil-energy-ring"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 280,
                height: 280,
                marginTop: -140,
                marginLeft: -140,
                borderRadius: "50%",
                border: "1px solid rgba(255,108,12,0.09)",
                pointerEvents: "none",
              }}
            />

            {/* Orbit trail — only visible during transitions */}
            {!shouldReduce && (
              <motion.div
                className="phil-orbit-trail"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: ORBIT_R * 2,
                  height: ORBIT_R * 2,
                  marginTop: -ORBIT_R,
                  marginLeft: -ORBIT_R,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(255,108,12,0.018) 20%, rgba(255,108,12,0.055) 42%, rgba(255,108,12,0.018) 62%, transparent 75%)",
                  pointerEvents: "none",
                  opacity: trailOp,
                }}
              />
            )}

            {/* Tick marks */}
            {TICKS.map((deg) => {
              const rad     = (deg * Math.PI) / 180;
              const isMajor = deg % 90 === 0;
              const isMid   = deg % 30 === 0 && !isMajor;
              const size    = isMajor ? 4 : isMid ? 2.5 : 1.5;
              const op      = isMajor ? 0.16 : isMid ? 0.09 : 0.046;
              return (
                <div
                  key={`t${deg}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    marginTop: -(size / 2),
                    marginLeft: -(size / 2),
                    backgroundColor: `rgba(255,251,243,${op})`,
                    transform: `translate(${Math.cos(rad) * ORBIT_R}px, ${Math.sin(rad) * ORBIT_R}px)`,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* Counter-rotating particles */}
            <div
              className={`phil-particles-wrap${shouldReduce ? " orbit-paused" : ""}`}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {PARTICLES.map(([angleDeg, radiusOffset, size, opacity], idx) => {
                const rad = (angleDeg * Math.PI) / 180;
                const r   = ORBIT_R + radiusOffset + 26;
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
                      boxShadow: `0 0 ${size * 6}px rgba(255,108,12,${opacity * 0.8})`,
                      transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                    }}
                  />
                );
              })}
            </div>

            {/* Orbit nodes (01, 02, 03) */}
            {beliefs.map((b, i) => {
              const isNodeActive = activeStep === i + 1;
              const isDimmed     = isActive && !isNodeActive;
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
                      backgroundColor: "rgba(255,251,243,0.06)",
                      border: "1px solid rgba(255,251,243,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity:   isNodeActive ? 0 : isDimmed ? 0.11 : 1,
                      transform: isDimmed ? "scale(0.76)" : "scale(1)",
                      transition:
                        "opacity 320ms cubic-bezier(0,0,0.2,1), transform 320ms cubic-bezier(0,0,0.2,1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: "rgba(255,251,243,0.80)",
                      }}
                    >
                      {b.num}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* MM Core */}
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
              <div
                className="phil-mm-halo"
                style={{
                  position: "absolute",
                  top: -22,
                  left: -22,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,108,12,0.04)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="phil-mm-outer-ring"
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 116,
                  height: 116,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,108,12,0.08)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="phil-mm-center"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(3,4,74,0.98)",
                  border: "1px solid rgba(255,251,243,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 38% 34%, rgba(255,108,12,0.10) 0%, transparent 60%)",
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

            {/*
              Hero node — single instance that springs to the orbit LEFT EDGE
              (x: -(ORBIT_R-20), y: -30) when any step is active.
              The number text updates in-place as steps change.
              Using a single persistent motion.div avoids AnimatePresence
              re-mount flickering and the "exiting clone reads stale props"
              race condition.
            */}
            {!shouldReduce && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -46,
                  marginLeft: -46,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
                initial={{ opacity: 0, scale: 0.1, x: -(ORBIT_R - 20), y: -30 }}
                animate={{
                  x:       -(ORBIT_R - 20),
                  y:       -30,
                  scale:   isActive ? 1 : 0.1,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
              >
                {/* Expanding pulse ring */}
                <div
                  className="phil-hero-pulse"
                  style={{
                    position: "absolute",
                    top: -12,
                    left: -12,
                    width: 116,
                    height: 116,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,108,12,0.26)",
                    pointerEvents: "none",
                  }}
                />
                {/* Orange circle */}
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-action)",
                    border: "2px solid rgba(255,140,50,0.48)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 0 28px rgba(255,108,12,0.62), 0 0 56px rgba(255,108,12,0.28), 0 0 90px rgba(255,108,12,0.12)",
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={heroNum}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: "#fff",
                        position: "absolute",
                      }}
                    >
                      {heroNum}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ── Scroll indicator — z:9, right edge ─────────────────────── */}
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
            zIndex: 9,
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
                        ? "rgba(255,108,12,0.45)"
                        : "rgba(255,251,243,0.07)",
                    transition: "background-color 220ms ease",
                  }}
                />
              )}
              <div
                style={{
                  width:  activeStep === s ? 9 : 5,
                  height: activeStep === s ? 9 : 5,
                  borderRadius: "50%",
                  backgroundColor:
                    activeStep === s ? "var(--color-action)"
                    : activeStep > s  ? "rgba(255,108,12,0.3)"
                    :                   "rgba(255,251,243,0.1)",
                  boxShadow:
                    activeStep === s
                      ? "0 0 10px rgba(255,108,12,0.8), 0 0 20px rgba(255,108,12,0.3)"
                      : "none",
                  transition: "all 220ms cubic-bezier(0,0,0.2,1)",
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
                    activeStep === s ? "var(--color-action)" : "rgba(255,251,243,0.18)",
                  transition: "color 220ms ease",
                  marginBottom: 4,
                }}
              >
                {`0${s}`}
              </span>
            </div>
          ))}
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

          /* ── Responsive ─────────────────────────────────────────── */
          @media (max-width: 1100px) {
            .phil-left-col { width: clamp(240px, 38%, 440px) !important; }
          }

          @media (max-width: 860px) {
            .phil-left-col  { width: 42% !important; left: 16px !important; }
            .phil-indicator { display: none !important; }
          }

          /*
            Mobile (≤640px): stack content below orbit.
            Left col spans full width at bottom; semi-transparent gradient
            ensures it never clashes with the orbit rings above it.
          */
          @media (max-width: 640px) {
            .phil-left-col {
              left: 0 !important;
              right: 0 !important;
              top: auto !important;
              bottom: 0 !important;
              width: 100% !important;
              padding: 0 5vw 5vh !important;
              align-items: flex-end !important;
              background: linear-gradient(
                to top,
                var(--color-authority) 55%,
                transparent
              ) !important;
              z-index: 8 !important;
            }
            .phil-panel-wrap {
              height: auto !important;
              min-height: 220px !important;
            }
            /* Ghost number too large on mobile */
            .phil-ghost-num { display: none !important; }
            .phil-indicator { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

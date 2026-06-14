"use client";

import React, { useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

type CapabilityKey =
  | "websiteDesign"
  | "brandExperience"
  | "conversionOptimization"
  | "uiSystems"
  | "performance"
  | "seoFoundations"
  | "digitalConsulting";

const CAPABILITY_KEYS: CapabilityKey[] = [
  "websiteDesign",
  "brandExperience",
  "conversionOptimization",
  "uiSystems",
  "performance",
  "seoFoundations",
  "digitalConsulting",
];

/* ─── MM Orbit System ──────────────────────────────────────────────── */

const SZ = 280;
const C = SZ / 2;

const RING_DEFS = [
  { r: 52, dur: 20, rev: false, stroke: "rgba(6,7,113,0.09)", dash: undefined },
  { r: 84, dur: 36, rev: true,  stroke: "rgba(255,108,12,0.10)", dash: "4 9" },
  { r: 116, dur: 60, rev: false, stroke: "rgba(6,7,113,0.05)", dash: "2 12" },
] as const;

const NODE_DEFS = [
  { ring: 0, angle: 60,  size: 7, glow: true },
  { ring: 0, angle: 228, size: 4.5, glow: false },
  { ring: 1, angle: 138, size: 6, glow: true },
  { ring: 1, angle: 318, size: 3.5, glow: false },
  { ring: 2, angle: 78,  size: 5, glow: true },
  { ring: 2, angle: 252, size: 3, glow: false },
];

const SCATTER = [
  { x: -142, y: -52,  s: 2.5, op: 0.38, d: 0    },
  { x:  138, y:  38,  s: 2,   op: 0.30, d: 0.9  },
  { x: -108, y:  98,  s: 1.5, op: 0.24, d: 1.7  },
  { x:  110, y: -88,  s: 2,   op: 0.32, d: 0.4  },
  { x:  -72, y: -120, s: 1.5, op: 0.22, d: 2.2  },
  { x:  118, y:  82,  s: 1.5, op: 0.26, d: 1.1  },
  { x:  -40, y:  138, s: 2,   op: 0.19, d: 3.0  },
  { x:   52, y: -140, s: 1.5, op: 0.23, d: 1.8  },
];

function nodePos(angle: number, r: number, size: number) {
  const rad = (angle * Math.PI) / 180;
  return { left: r + r * Math.cos(rad) - size / 2, top: r - r * Math.sin(rad) - size / 2 };
}

function MMOrbitSystem({ shouldReduce }: { shouldReduce: boolean }) {
  return (
    <div style={{ position: "relative", width: SZ, height: SZ, margin: "auto" }} aria-hidden="true">
      {/* Static SVG rings */}
      <svg
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        width={SZ} height={SZ}
        viewBox={`0 0 ${SZ} ${SZ}`}
        fill="none"
      >
        {RING_DEFS.map(({ r, stroke, dash }, i) => (
          <circle key={i} cx={C} cy={C} r={r} stroke={stroke} strokeWidth="1" strokeDasharray={dash} />
        ))}
        {/* Subtle cross-tick at center */}
        <line x1={C - 18} y1={C} x2={C + 18} y2={C} stroke="rgba(6,7,113,0.04)" strokeWidth="1" />
        <line x1={C} y1={C - 18} x2={C} y2={C + 18} stroke="rgba(6,7,113,0.04)" strokeWidth="1" />
      </svg>

      {/* Animated rings + nodes */}
      {RING_DEFS.map(({ r, dur, rev }, ri) => (
        <div
          key={ri}
          style={{
            position: "absolute",
            width: r * 2, height: r * 2,
            top: C - r, left: C - r,
            ...(shouldReduce ? {} : {
              animation: `capOrbit${rev ? "Rev" : ""} ${dur}s linear infinite`,
            }),
            pointerEvents: "none",
          }}
        >
          {NODE_DEFS.filter(n => n.ring === ri).map((nd, ni) => {
            const pos = nodePos(nd.angle, r, nd.size);
            return (
              <div
                key={ni}
                style={{
                  position: "absolute",
                  width: nd.size, height: nd.size,
                  left: pos.left, top: pos.top,
                  borderRadius: "50%",
                  backgroundColor: "#ff6c0c",
                  opacity: nd.glow ? 1 : 0.52,
                  boxShadow: nd.glow
                    ? "0 0 8px rgba(255,108,12,0.7), 0 0 20px rgba(255,108,12,0.28)"
                    : "none",
                  ...(nd.glow && !shouldReduce
                    ? { animation: "capNodePulse 2.6s ease-in-out infinite" }
                    : {}),
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Scatter particles */}
      {!shouldReduce && SCATTER.map((sc, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: C + sc.x - sc.s / 2,
            top: C + sc.y - sc.s / 2,
            width: sc.s, height: sc.s,
            borderRadius: "50%",
            backgroundColor: "#ff6c0c",
            opacity: sc.op,
            animation: `capScatter ${3.2 + (i % 4) * 0.9}s ease-in-out ${sc.d}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* MM circle */}
      <div
        style={{
          position: "absolute",
          left: C - 38, top: C - 38,
          width: 76, height: 76, borderRadius: "50%",
          backgroundColor: "var(--color-authority)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2,
          boxShadow:
            "0 4px 24px rgba(6,7,113,0.20), 0 0 0 7px rgba(6,7,113,0.055), 0 0 0 16px rgba(6,7,113,0.022)",
        }}
      >
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: 20, fontWeight: 700,
          color: "rgba(255,251,243,0.92)", letterSpacing: "0.03em",
        }}>
          MM
        </span>
      </div>
    </div>
  );
}

/* ─── Service panel row ────────────────────────────────────────────── */

function ServiceRow({
  number,
  title,
  isLast,
  shouldReduce,
}: {
  number: string;
  title: string;
  isLast: boolean;
  shouldReduce: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "13px 22px 13px 18px",
        borderBottom: isLast ? "none" : "1px solid rgba(6,7,113,0.052)",
        backgroundColor: hov && !shouldReduce ? "rgba(255,108,12,0.030)" : "transparent",
        transition: "background-color 160ms ease",
        cursor: "default", position: "relative",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5,
        backgroundColor: "#ff6c0c",
        transform: hov && !shouldReduce ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "center",
        transition: "transform 150ms ease",
      }} />

      {/* Number */}
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.09em",
        color: hov ? "#ff6c0c" : "rgba(255,108,12,0.40)",
        width: 16, flexShrink: 0, transition: "color 150ms ease",
      }}>
        {number}
      </span>

      {/* Pip divider */}
      <div style={{ width: 1, height: 13, backgroundColor: "rgba(6,7,113,0.08)", flexShrink: 0 }} />

      {/* Title */}
      <span style={{
        fontFamily: "var(--font-body)", fontSize: 13.5,
        fontWeight: hov ? 600 : 500,
        color: hov ? "var(--color-authority)" : "rgba(6,7,113,0.58)",
        flex: 1, transition: "color 150ms ease, font-weight 0ms",
        letterSpacing: "-0.008em",
      }}>
        {title}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize: 11, color: "#ff6c0c", flexShrink: 0,
        opacity: hov && !shouldReduce ? 0.75 : 0,
        transform: hov && !shouldReduce ? "translateX(0)" : "translateX(-5px)",
        transition: "opacity 150ms ease, transform 150ms ease",
      }}>
        →
      </span>
    </div>
  );
}

/* ─── Main export ──────────────────────────────────────────────────── */

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const E = [0, 0, 0.2, 1] as const;
  const vp = { once: true as const, margin: "-60px" as const };

  const metrics = [
    { value: "20+",  label: locale === "tr" ? "Proje"        : "Projects"      },
    { value: "5+",   label: locale === "tr" ? "Sektör"       : "Industries"    },
    { value: "100%", label: locale === "tr" ? "Mobil Uyumlu" : "Mobile Ready"  },
    { value: "<24h", label: locale === "tr" ? "Yanıt Süresi" : "Response Time" },
  ];

  return (
    <>
      <style>{`
        @keyframes capOrbit    { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes capOrbitRev { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes capNodePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255,108,12,0.65), 0 0 18px rgba(255,108,12,0.22); }
          50%      { box-shadow: 0 0 14px rgba(255,108,12,0.92), 0 0 32px rgba(255,108,12,0.45); }
        }
        @keyframes capScatter {
          0%, 100% { transform: translate(0, 0)    scale(1);    }
          42%      { transform: translate(4px, -6px) scale(1.28); }
          72%      { transform: translate(-3px, 4px) scale(0.82); }
        }
        .cap-3col {
          display: grid;
          grid-template-columns: minmax(220px, 360px) 1fr minmax(260px, 420px);
          gap: 0 44px;
          align-items: center;
        }
        .cap-metrics {
          display: flex;
          align-items: center;
        }
        @media (max-width: 1100px) {
          .cap-3col { grid-template-columns: 1fr !important; }
          .cap-mm-col { display: none !important; }
        }
        @media (max-width: 600px) {
          .cap-metrics { flex-wrap: wrap; }
          .cap-metrics-item { min-width: 50% !important; border-right: none !important; }
        }
      `}</style>

      <section
        id="hizmetler"
        aria-label="Hizmetler"
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-surface)", overflow: "hidden" }}
      >
        <div className="container-site">

          {/* ── Section label ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, ease: E }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "#ff6c0c", letterSpacing: "0.09em" }}>
              {t("sectionNumber")}
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: "rgba(6,7,113,0.14)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, color: "rgba(6,7,113,0.32)", letterSpacing: "0.17em", textTransform: "uppercase" }}>
              {t("sectionTitle")}
            </span>
          </motion.div>

          {/* ── Three-column main layout ── */}
          <div className="cap-3col">

            {/* LEFT — Editorial */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.72, ease: E }}
            >
              {/* Large display headline */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(44px, 5vw, 80px)",
                  fontWeight: 700, lineHeight: 0.98,
                  letterSpacing: "-0.038em",
                  color: "var(--color-authority)",
                  margin: "0 0 22px 0",
                }}
              >
                {t("sectionTitle")}
              </h2>

              {/* Editorial sub-line */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(16px, 1.9vw, 23px)",
                  fontWeight: 400, lineHeight: 1.42,
                  letterSpacing: "-0.015em",
                  color: "rgba(6,7,113,0.40)",
                  margin: "0 0 40px 0",
                  maxWidth: 320,
                }}
              >
                {t("editorial")}
              </p>

              {/* Descriptor accent */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 20, height: 1.5, marginTop: 7, backgroundColor: "#ff6c0c", opacity: 0.6, flexShrink: 0 }} />
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: 12,
                  lineHeight: 1.65, fontStyle: "italic",
                  color: "rgba(6,7,113,0.30)", margin: 0,
                }}>
                  {t("sectionDescriptor")}
                </p>
              </div>
            </motion.div>

            {/* CENTER — MM Orbit */}
            <div className="cap-mm-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.9, ease: E }}
              >
                <MMOrbitSystem shouldReduce={shouldReduce} />
              </motion.div>
            </div>

            {/* RIGHT — Service panel */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.14, ease: E }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.98)",
                  border: "1px solid rgba(6,7,113,0.07)",
                  borderLeft: "2.5px solid rgba(255,108,12,0.55)",
                  boxShadow:
                    "0 2px 8px rgba(6,7,113,0.04), 0 8px 48px rgba(6,7,113,0.07)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                {/* Panel header */}
                <div
                  style={{
                    padding: "13px 22px",
                    borderBottom: "1px solid rgba(6,7,113,0.058)",
                    display: "flex", alignItems: "center", gap: 10,
                    backgroundColor: "rgba(255,251,243,0.55)",
                  }}
                >
                  <div style={{ width: 14, height: 1.5, backgroundColor: "#ff6c0c", opacity: 0.50 }} />
                  <span
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 9.5, fontWeight: 700,
                      letterSpacing: "0.21em", textTransform: "uppercase",
                      color: "rgba(6,7,113,0.28)",
                    }}
                  >
                    {t("panelLabel")}
                  </span>
                </div>

                {/* Rows */}
                {CAPABILITY_KEYS.map((key, i) => {
                  const item = t.raw(`items.${key}`) as { number: string; title: string; descriptor: string };
                  return (
                    <ServiceRow
                      key={key}
                      number={item.number}
                      title={item.title}
                      isLast={i === CAPABILITY_KEYS.length - 1}
                      shouldReduce={shouldReduce}
                    />
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* ── Bottom metrics band ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1, ease: E }}
            style={{ marginTop: 52 }}
          >
            <div style={{ borderTop: "1px solid rgba(6,7,113,0.07)" }} />
            <div className="cap-metrics" style={{ paddingTop: 22, paddingBottom: 22 }}>
              {metrics.map(({ value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && (
                    <div style={{ width: 1, height: 30, backgroundColor: "rgba(6,7,113,0.08)", flexShrink: 0, alignSelf: "center" }} />
                  )}
                  <div
                    className="cap-metrics-item"
                    style={{ flex: 1, textAlign: "center", padding: "0 10px" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(18px, 1.9vw, 28px)",
                        fontWeight: 700, letterSpacing: "-0.028em",
                        color: "var(--color-authority)", lineHeight: 1, marginBottom: 5,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        color: "rgba(6,7,113,0.34)",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={{ borderBottom: "1px solid rgba(6,7,113,0.07)" }} />
          </motion.div>

        </div>
      </section>
    </>
  );
}

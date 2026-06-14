"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

type CK =
  | "websiteDesign"
  | "brandExperience"
  | "conversionOptimization"
  | "uiSystems"
  | "performance"
  | "seoFoundations"
  | "digitalConsulting";

const CKS: CK[] = [
  "websiteDesign",
  "brandExperience",
  "conversionOptimization",
  "uiSystems",
  "performance",
  "seoFoundations",
  "digitalConsulting",
];

/* ── Service icons ─────────────────────────────────────────────── */

const ICON_D: Record<CK, string> = {
  websiteDesign:
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-20v20M2 12h20M12 2c-4 5-4 15 0 20M12 2c4 5 4 15 0 20",
  brandExperience:
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  conversionOptimization:
    "M22 7L13.5 15.5l-5-5L2 17M15 7h7v7",
  uiSystems:
    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  performance:
    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  seoFoundations:
    "M11 17A6 6 0 1 0 11 5a6 6 0 0 0 0 12zM21 21l-4.35-4.35",
  digitalConsulting:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4l3 3",
};

function SvcIcon({ ck, sz = 15, col = "rgba(6,7,113,0.38)" }: { ck: CK; sz?: number; col?: string }) {
  return (
    <svg
      width={sz} height={sz} viewBox="0 0 24 24"
      fill="none" stroke={col} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_D[ck]} />
    </svg>
  );
}

/* ── Metric icons ──────────────────────────────────────────────── */

const MET_ICON_D: Record<string, string> = {
  briefcase:
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  phone:
    "M17 2h-1a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h1M7 2h1a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7M12 17h.01",
  clock:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
};

function MetIcon({ name }: { name: string }) {
  return (
    <svg
      width={26} height={26} viewBox="0 0 24 24"
      fill="none" stroke="rgba(6,7,113,0.28)"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={MET_ICON_D[name] ?? ""} />
    </svg>
  );
}

/* ── Orbit geometry ────────────────────────────────────────────── */

const SZ = 460;
const C = SZ / 2; // 230

const RINGS = [
  { r: 108, dur: 36,  rev: false, stroke: "rgba(6,7,113,0.10)",     dash: undefined          },
  { r: 162, dur: 54,  rev: true,  stroke: "rgba(255,108,12,0.08)",   dash: "4 10"             },
] as const;

// 7 orbital nodes, distributed across the two rings
const ONODES: { key: CK; ring: 0 | 1; angle: number; side: "l" | "r" }[] = [
  { key: "websiteDesign",          ring: 0, angle: 55,  side: "r" },
  { key: "conversionOptimization", ring: 0, angle: 175, side: "l" },
  { key: "uiSystems",              ring: 0, angle: 285, side: "l" },
  { key: "brandExperience",        ring: 1, angle: 350, side: "r" },
  { key: "seoFoundations",         ring: 1, angle: 108, side: "l" },
  { key: "performance",            ring: 1, angle: 222, side: "l" },
  { key: "digitalConsulting",      ring: 1, angle: 313, side: "r" },
];

function npos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: r + r * Math.cos(rad), y: r - r * Math.sin(rad) };
}

// Subtle scatter particles outside orbit
const SCATTER = [
  { x: -178, y: -52,  s: 2.2, op: 0.26, d: 0    },
  { x:  168, y:  38,  s: 1.8, op: 0.20, d: 0.9  },
  { x: -126, y:  118, s: 1.5, op: 0.18, d: 1.8  },
  { x:  134, y: -108, s: 1.8, op: 0.22, d: 0.5  },
  { x:  -56, y: -158, s: 1.4, op: 0.16, d: 2.2  },
  { x:  148, y:  102, s: 1.5, op: 0.19, d: 1.2  },
];

/* ── Main ───────────────────────────────────────────────────────── */

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const locale = useLocale();
  const sr = useReducedMotion() ?? false;
  const [active, setActive] = useState<CK | null>(null);
  const [inView, setInView] = useState(false);
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reveal helper — opacity-0 until inView, then animate
  const rv = (delay = 0): React.CSSProperties =>
    sr
      ? {}
      : {
          opacity: 0,
          ...(inView ? { animation: `capFadeUp 0.65s ${delay}s ease forwards` } : {}),
        };

  // Titles map for orbit labels
  const titles = Object.fromEntries(
    CKS.map((k) => [k, (t.raw(`items.${k}`) as { title: string }).title])
  ) as Record<CK, string>;

  const metrics =
    locale === "tr"
      ? [
          { icon: "briefcase", value: "20+",  label: "Proje Tamamlandı"   },
          { icon: "users",     value: "5+",   label: "Farklı Sektör"      },
          { icon: "phone",     value: "100%", label: "Mobil Uyumlu"       },
          { icon: "clock",     value: "<24h", label: "Ort. Yanıt Süresi"  },
        ]
      : [
          { icon: "briefcase", value: "20+",  label: "Projects Completed" },
          { icon: "users",     value: "5+",   label: "Industries"         },
          { icon: "phone",     value: "100%", label: "Mobile Ready"       },
          { icon: "clock",     value: "<24h", label: "Avg. Response Time" },
        ];

  return (
    <>
      <style>{`
        @keyframes capOrbit    { to { transform: rotate(360deg);  } }
        @keyframes capOrbitRev { to { transform: rotate(-360deg); } }
        @keyframes capNodePulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(255,108,12,0);    }
          50%     { box-shadow: 0 0 0 5px rgba(255,108,12,0.22); }
        }
        @keyframes capMMBreath {
          0%,100% {
            transform:  scale(1);
            box-shadow: 0 4px 24px rgba(6,7,113,0.18),
                        0 0 0  8px rgba(6,7,113,0.05);
          }
          50% {
            transform:  scale(1.022);
            box-shadow: 0 6px 36px rgba(6,7,113,0.26),
                        0 0 0 12px rgba(6,7,113,0.08);
          }
        }
        @keyframes capScatter {
          0%,100% { transform: translate(0,0)       scale(1);    }
          40%     { transform: translate(3px,-5px)  scale(1.3);  }
          70%     { transform: translate(-2px,4px)  scale(0.78); }
        }
        @keyframes capFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes capRingIn {
          from { opacity: 0; transform: scale(0.78); }
          to   { opacity: 1; transform: scale(1);    }
        }
        .cap-layout {
          display: grid;
          grid-template-columns: minmax(200px, 300px) 1fr minmax(280px, 400px);
          gap: 0 40px;
          align-items: center;
        }
        @media (max-width: 1100px) {
          .cap-layout { grid-template-columns: 1fr; }
          .cap-orbit-col { display: none !important; }
        }
        .cap-metrics { display: flex; align-items: stretch; }
        @media (max-width: 600px) {
          .cap-metrics { flex-wrap: wrap; }
          .cap-met-item { min-width: 50%; }
        }
        .cap-cta-link { display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; transition: gap 160ms ease; }
        .cap-cta-link:hover { gap: 12px; }
        .cap-cta-link:hover .cap-cta-circle { border-color: #ff6c0c; }
      `}</style>

      <section
        ref={secRef}
        id="hizmetler"
        aria-label="Hizmetler"
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-surface)", overflow: "hidden" }}
      >
        <div className="container-site">

          {/* ── Section label ────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44, ...rv(0) }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "#ff6c0c", letterSpacing: "0.09em" }}>
              {t("sectionNumber")}
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: "rgba(6,7,113,0.14)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, color: "rgba(6,7,113,0.32)", letterSpacing: "0.17em", textTransform: "uppercase" }}>
              {t("sectionLabel")}
            </span>
          </div>

          {/* ── Three-column layout ───────────────────────────────── */}
          <div className="cap-layout">

            {/* LEFT — Editorial */}
            <div style={rv(0.08)}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(44px, 5vw, 80px)",
                fontWeight: 700, lineHeight: 0.98,
                letterSpacing: "-0.038em",
                color: "var(--color-authority)",
                margin: "0 0 14px 0",
              }}>
                {t("sectionTitle")}
              </h2>

              {/* Orange accent line */}
              <div style={{ width: 32, height: 2, backgroundColor: "#ff6c0c", marginBottom: 18 }} />

              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(15px, 1.7vw, 21px)",
                fontWeight: 400, lineHeight: 1.45,
                letterSpacing: "-0.012em",
                color: "rgba(6,7,113,0.40)",
                margin: "0 0 34px 0",
                maxWidth: 280,
              }}>
                {t("editorial")}
              </p>

              {/* CTA */}
              <Link href="/surec" className="cap-cta-link">
                <span className="cap-cta-circle" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 22, height: 22, borderRadius: "50%",
                  border: "1.5px solid rgba(255,108,12,0.42)",
                  transition: "border-color 160ms ease",
                  flexShrink: 0,
                }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                    <path d="M1.5 4.5h6M5.5 2.5l2 2-2 2" stroke="#ff6c0c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#ff6c0c",
                }}>
                  {t("ctaLabel")}
                </span>
              </Link>
            </div>

            {/* CENTER — MM Orbit */}
            <div
              className="cap-orbit-col"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-hidden="true"
            >
              <div style={{ position: "relative", width: SZ, height: SZ }}>

                {/* Static ring SVG */}
                <svg
                  style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    opacity: 0,
                    ...(inView && !sr ? { animation: "capRingIn 0.9s 0.15s ease forwards" } : {}),
                    ...(sr ? { opacity: 1 } : {}),
                  }}
                  width={SZ} height={SZ} viewBox={`0 0 ${SZ} ${SZ}`} fill="none"
                >
                  {RINGS.map(({ r, stroke, dash }, i) => (
                    <circle key={i} cx={C} cy={C} r={r} stroke={stroke} strokeWidth="1" strokeDasharray={dash} />
                  ))}
                  {/* Subtle crosshair at center */}
                  <line x1={C - 20} y1={C} x2={C + 20} y2={C} stroke="rgba(6,7,113,0.035)" strokeWidth="1" />
                  <line x1={C} y1={C - 20} x2={C} y2={C + 20} stroke="rgba(6,7,113,0.035)" strokeWidth="1" />
                </svg>

                {/* Rotating rings with labeled nodes */}
                {RINGS.map((ring, ri) => (
                  <div
                    key={ri}
                    style={{
                      position: "absolute",
                      width: ring.r * 2, height: ring.r * 2,
                      top: C - ring.r, left: C - ring.r,
                      ...(!sr ? {
                        animation: ring.rev
                          ? `capOrbitRev ${ring.dur}s linear infinite`
                          : `capOrbit ${ring.dur}s linear infinite`,
                      } : {}),
                      pointerEvents: "none",
                    }}
                  >
                    {ONODES.filter((n) => n.ring === ri).map((node, ni) => {
                      const pos = npos(node.angle, ring.r);
                      const isActive = active === node.key;
                      // counter-rotation duration/direction must match parent ring
                      const counterAnim = !sr
                        ? (ring.rev
                            ? `capOrbit ${ring.dur}s linear infinite`
                            : `capOrbitRev ${ring.dur}s linear infinite`)
                        : undefined;

                      return (
                        <div
                          key={node.key}
                          style={{
                            position: "absolute",
                            left: pos.x,
                            top: pos.y,
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "auto",
                            opacity: 0,
                            ...(inView && !sr
                              ? { animation: `capFadeUp 0.5s ${0.3 + ni * 0.08}s ease forwards` }
                              : {}),
                            ...(sr ? { opacity: 1 } : {}),
                          }}
                          onMouseEnter={() => setActive(node.key)}
                          onMouseLeave={() => setActive(null)}
                        >
                          {/* Counter-rotate to keep label upright */}
                          <div style={{ animation: counterAnim }}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              cursor: "default",
                              flexDirection: node.side === "l" ? "row" : "row",
                            }}>
                              {node.side === "l" && (
                                <span style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: 10,
                                  fontWeight: isActive ? 600 : 500,
                                  color: isActive ? "var(--color-authority)" : "rgba(6,7,113,0.42)",
                                  letterSpacing: "0.01em",
                                  whiteSpace: "nowrap",
                                  transition: "color 200ms ease",
                                  textAlign: "right",
                                }}>
                                  {titles[node.key]}
                                </span>
                              )}

                              {/* Orbital dot */}
                              <div style={{
                                width: isActive ? 10 : 7.5,
                                height: isActive ? 10 : 7.5,
                                borderRadius: "50%",
                                backgroundColor: "#ff6c0c",
                                opacity: isActive ? 1 : 0.68,
                                flexShrink: 0,
                                boxShadow: isActive
                                  ? "0 0 0 4px rgba(255,108,12,0.16), 0 0 14px rgba(255,108,12,0.55)"
                                  : "0 0 5px rgba(255,108,12,0.35)",
                                transition: "all 200ms ease",
                                ...(!isActive && !sr
                                  ? { animation: "capNodePulse 3s ease-in-out infinite" }
                                  : {}),
                              }} />

                              {node.side === "r" && (
                                <span style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: 10,
                                  fontWeight: isActive ? 600 : 500,
                                  color: isActive ? "var(--color-authority)" : "rgba(6,7,113,0.42)",
                                  letterSpacing: "0.01em",
                                  whiteSpace: "nowrap",
                                  transition: "color 200ms ease",
                                }}>
                                  {titles[node.key]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Scatter particles */}
                {!sr && SCATTER.map((sc, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: C + sc.x,
                      top: C + sc.y,
                      width: sc.s, height: sc.s,
                      borderRadius: "50%",
                      backgroundColor: "#ff6c0c",
                      opacity: sc.op,
                      animation: `capScatter ${3.5 + (i % 3) * 0.9}s ease-in-out ${sc.d}s infinite`,
                      pointerEvents: "none",
                    }}
                  />
                ))}

                {/* MM core */}
                <div style={{
                  position: "absolute",
                  left: C - 44, top: C - 44,
                  width: 88, height: 88, borderRadius: "50%",
                  backgroundColor: "var(--color-authority)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 2,
                  ...(!sr ? { animation: "capMMBreath 7s ease-in-out infinite" } : {}),
                  opacity: sr ? 1 : 0,
                  transition: !sr ? "opacity 0.7s 0.35s ease" : undefined,
                  ...(inView && !sr ? { opacity: 1 } : {}),
                  ...(sr ? { opacity: 1 } : {}),
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22, fontWeight: 700,
                    color: "rgba(255,251,243,0.94)", letterSpacing: "0.04em",
                  }}>
                    MM
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT — Service panel */}
            <div style={rv(0.18)}>
              <div style={{
                backgroundColor: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(6,7,113,0.07)",
                borderLeft: "2.5px solid rgba(255,108,12,0.55)",
                boxShadow: "0 2px 8px rgba(6,7,113,0.04), 0 8px 48px rgba(6,7,113,0.07)",
                borderRadius: 3, overflow: "hidden",
              }}>

                {/* Panel header */}
                <div style={{
                  padding: "13px 22px",
                  borderBottom: "1px solid rgba(6,7,113,0.058)",
                  display: "flex", alignItems: "center", gap: 10,
                  backgroundColor: "rgba(255,251,243,0.55)",
                }}>
                  <div style={{ width: 14, height: 1.5, backgroundColor: "#ff6c0c", opacity: 0.55 }} />
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: 9.5, fontWeight: 700,
                    letterSpacing: "0.21em", textTransform: "uppercase",
                    color: "rgba(6,7,113,0.28)",
                  }}>
                    {t("panelLabel")}
                  </span>
                </div>

                {/* Rows */}
                {CKS.map((key, i) => {
                  const item = t.raw(`items.${key}`) as { number: string; title: string };
                  const isActive = active === key;
                  const isLast = i === CKS.length - 1;
                  return (
                    <div
                      key={key}
                      onMouseEnter={() => setActive(key)}
                      onMouseLeave={() => setActive(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 18px 12px 16px",
                        borderBottom: isLast ? "none" : "1px solid rgba(6,7,113,0.048)",
                        backgroundColor: isActive ? "rgba(255,108,12,0.028)" : "transparent",
                        cursor: "default", position: "relative",
                        transition: "background-color 160ms ease",
                      }}
                    >
                      {/* Left accent */}
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5,
                        backgroundColor: "#ff6c0c",
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: "center",
                        transition: "transform 150ms ease",
                      }} />

                      {/* Number */}
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: isActive ? "#ff6c0c" : "rgba(255,108,12,0.38)",
                        width: 16, flexShrink: 0,
                        transition: "color 150ms ease",
                      }}>
                        {item.number}
                      </span>

                      {/* Icon */}
                      <SvcIcon
                        ck={key}
                        sz={15}
                        col={isActive ? "#ff6c0c" : "rgba(6,7,113,0.38)"}
                      />

                      {/* Title */}
                      <span style={{
                        fontFamily: "var(--font-body)", fontSize: 13.5,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "var(--color-authority)" : "rgba(6,7,113,0.60)",
                        flex: 1,
                        letterSpacing: "-0.008em",
                        transition: "color 150ms ease",
                      }}>
                        {item.title}
                      </span>

                      {/* Arrow */}
                      <span style={{
                        fontSize: 13, color: "#ff6c0c", flexShrink: 0,
                        opacity: isActive ? 0.8 : 0.22,
                        transition: "opacity 150ms ease",
                      }}>
                        →
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Metrics band ──────────────────────────────────────── */}
          <div style={{ marginTop: 48, ...rv(0.30) }}>
            <div style={{ borderTop: "1px solid rgba(6,7,113,0.07)" }} />
            <div className="cap-metrics" style={{ paddingTop: 20, paddingBottom: 20 }}>
              {metrics.map(({ icon, value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && (
                    <div style={{
                      width: 5, height: 5, borderRadius: "50%",
                      backgroundColor: "rgba(255,108,12,0.45)",
                      flexShrink: 0, alignSelf: "center", margin: "0 2px",
                    }} />
                  )}
                  <div
                    className="cap-met-item"
                    style={{
                      flex: 1, display: "flex", alignItems: "center",
                      gap: 10, padding: "0 10px", justifyContent: "center",
                    }}
                  >
                    <MetIcon name={icon} />
                    <div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(18px, 2vw, 26px)",
                        fontWeight: 700, letterSpacing: "-0.028em",
                        color: "var(--color-authority)", lineHeight: 1, marginBottom: 3,
                      }}>
                        {value}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 600,
                        letterSpacing: "0.09em", textTransform: "uppercase",
                        color: "rgba(6,7,113,0.34)",
                      }}>
                        {label}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={{ borderBottom: "1px solid rgba(6,7,113,0.07)" }} />
          </div>

        </div>
      </section>
    </>
  );
}

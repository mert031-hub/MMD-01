"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const STAGE_KEYS = ["discovery", "design", "build", "launch"] as const;
type StageKey = (typeof STAGE_KEYS)[number];

// Card personality — intentionally imperfect
const CARD_ROT    = [-1, 1, -0.5, 0.8] as const;  // degrees
const CARD_Y      = [0, 18, -6, 10] as const;       // px offset for stagger feel
const PIN_NAVY    = [false, false, true, false] as const; // Build gets navy

// ─── Inline SVG icons ─────────────────────────────────────────────
const ICONS: Record<StageKey, React.ReactNode> = {
  discovery: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="16" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  design: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M5 21L8 15L19.5 4.5L21.5 6.5L10 18L5 21Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17.5" y1="6" x2="20" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  build: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <polyline points="9,7 4,13 9,19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17,7 22,13 17,19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14.5" y1="5" x2="11.5" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  launch: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 3.5C13 3.5 19.5 5.5 21 13C21 13 17 11 13 13.5C9 16 7.5 20.5 7.5 20.5C7.5 20.5 7 14.5 9.5 11C12 7.5 13 3.5 13 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="20" r="1.5" fill="currentColor" />
    </svg>
  ),
};

// ─── Push pin ─────────────────────────────────────────────────────
function Pin({ navy, hovered }: { navy: boolean; hovered: boolean }) {
  const base = navy ? "#060771" : "#ff6c0c";
  const highlight = navy
    ? "rgba(130,145,255,0.75)"
    : "rgba(255,188,100,0.82)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: hovered
          ? "brightness(1.14) drop-shadow(0 3px 9px rgba(0,0,0,0.34))"
          : "drop-shadow(0 2px 5px rgba(0,0,0,0.24))",
        transition: "filter 220ms ease",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Sphere */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: `radial-gradient(circle at 38% 30%, ${highlight} 0%, ${base} 44%, rgba(0,0,0,0.42) 100%)`,
          boxShadow: `0 3px 10px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.18)`,
          position: "relative",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 220ms ease",
          flexShrink: 0,
        }}
      >
        {/* Shine */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 5,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.68)",
          }}
        />
      </div>
      {/* Neck */}
      <div
        style={{
          width: 3,
          height: 11,
          background: `linear-gradient(to bottom, ${base}, rgba(0,0,0,0.58))`,
          borderRadius: "0 0 1px 1px",
          marginTop: -1,
        }}
      />
      {/* Point */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "2.5px solid transparent",
          borderRight: "2.5px solid transparent",
          borderTop: "6px solid rgba(0,0,0,0.46)",
        }}
      />
    </div>
  );
}

// ─── Hand-drawn arrow ─────────────────────────────────────────────
function SketchArrow({ idx, delay }: { idx: number; delay: number }) {
  const variants = [
    {
      curve: "M 4 30 C 12 20, 34 40, 48 28",
      head:  "M 41 22 L 48 28 L 41 34",
    },
    {
      curve: "M 4 28 C 14 36, 36 22, 48 32",
      head:  "M 41 26 L 48 32 L 41 38",
    },
    {
      curve: "M 4 32 C 14 22, 36 38, 48 26",
      head:  "M 41 20 L 48 26 L 41 32",
    },
  ];
  const v = variants[idx] ?? variants[0];
  const stroke = "rgba(6,7,113,0.3)";

  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
      <motion.path
        d={v.curve}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      />
      <motion.path
        d={v.head}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.28, delay: delay + 0.65, ease: EASE_OUT }}
      />
    </svg>
  );
}

// ─── Main section ─────────────────────────────────────────────────
export default function Process() {
  const t = useTranslations("process");
  const shouldReduce = useReducedMotion() ?? false;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="surec"
      aria-label="Çalışma süreci"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background grid + atmosphere ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(6,7,113,0.02) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(6,7,113,0.02) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          width: 820,
          height: 620,
          background:
            "radial-gradient(ellipse at center, rgba(255,108,12,0.038) 0%, transparent 64%)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <SectionHeader
          number={t("sectionNumber")}
          title={t("sectionTitle")}
          descriptor={t("sectionDescriptor")}
        />

        {/* ── Board ── */}
        <div
          className="proc-board"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 52px 1fr 52px 1fr 52px 1fr",
            gap: 0,
            alignItems: "start",
            paddingBottom: 40,
          }}
        >
          {STAGE_KEYS.flatMap((key, i) => {
            const stage = t.raw(`stages.${key}`) as {
              number: string;
              title: string;
              description: string;
            };
            const isHov = hoveredStep === i;
            const isBuild = i === 2;
            const rot = CARD_ROT[i];
            const yOff = CARD_Y[i];
            const navy = PIN_NAVY[i];

            // Paper colours — Build gets slightly warmer/deeper
            const paperBg = isBuild ? "#f4f2eb" : "#f9f7f1";
            // Shadow depth
            const shadow = isHov
              ? `0 ${isBuild ? 22 : 16}px 52px rgba(0,0,0,${isBuild ? 0.2 : 0.15}), 0 6px 18px rgba(0,0,0,0.09), inset 0 0 0 1px rgba(0,0,0,0.05)`
              : isBuild
              ? "0 14px 38px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.05)"
              : "0 8px 28px rgba(0,0,0,0.1), 0 2px 7px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)";

            const card = (
              <motion.div
                key={key}
                initial={
                  shouldReduce ? false : { opacity: 0, y: -90 + yOff }
                }
                whileInView={{ opacity: 1, y: yOff }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 14,
                  delay: i * 0.15,
                }}
                whileHover={
                  !shouldReduce
                    ? {
                        y: yOff - 10,
                        scale: 1.024,
                        transition: {
                          type: "spring",
                          stiffness: 380,
                          damping: 22,
                        },
                      }
                    : {}
                }
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  rotate: rot,
                  // Pivot at the pin so the card hangs naturally
                  transformOrigin: "50% 14px",
                  position: "relative",
                  paddingTop: 16,
                  cursor: "default",
                }}
              >
                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                  }}
                >
                  <Pin navy={navy} hovered={isHov} />
                </div>

                {/* Paper */}
                <div
                  style={{
                    position: "relative",
                    backgroundColor: paperBg,
                    backgroundImage:
                      "repeating-linear-gradient(transparent 0px, transparent 23px, rgba(6,7,113,0.05) 23px, rgba(6,7,113,0.05) 24px)",
                    backgroundPosition: "0 54px",
                    borderRadius: "3px 5px 5px 3px",
                    padding: "36px 22px 28px 44px",
                    boxShadow: shadow,
                    transition: "box-shadow 240ms ease",
                    overflow: "visible",
                  }}
                >
                  {/* Left margin line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 36,
                      width: 1,
                      background: "rgba(255,108,12,0.17)",
                    }}
                  />

                  {/* Hole punches */}
                  {[76, 136, 196].map((top, j) => (
                    <div
                      key={j}
                      style={{
                        position: "absolute",
                        left: 12,
                        top,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--color-bg-primary)",
                        boxShadow:
                          "inset 0 1px 3px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.07)",
                      }}
                    />
                  ))}

                  {/* Step number */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: isHov
                        ? "#ff6c0c"
                        : isBuild
                        ? "rgba(255,108,12,0.9)"
                        : "rgba(255,108,12,0.65)",
                      marginBottom: 6,
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage.number}
                  </div>

                  {/* Orange accent rule */}
                  <div
                    style={{
                      width: 22,
                      height: 1.5,
                      backgroundColor: "#ff6c0c",
                      opacity: 0.62,
                      marginBottom: 14,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      color: "var(--color-authority)",
                      opacity: isHov || isBuild ? 0.8 : 0.52,
                      marginBottom: 14,
                      transition: "opacity 200ms ease",
                    }}
                  >
                    {ICONS[key as StageKey]}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(17px, 1.5vw, 22px)",
                      fontWeight: isBuild ? 700 : 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      color:
                        isHov || isBuild
                          ? "var(--color-authority-deep)"
                          : "var(--color-authority)",
                      marginBottom: 10,
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12.5,
                      lineHeight: 1.7,
                      color: isHov
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      margin: "0 0 18px",
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage.description}
                  </p>

                  {/* Bottom squiggle accent */}
                  <svg
                    width="44"
                    height="8"
                    viewBox="0 0 44 8"
                    fill="none"
                    style={{ opacity: 0.16, display: "block" }}
                  >
                    <path
                      d="M 2 4 Q 11 1 22 4 Q 33 7 42 4"
                      stroke="var(--color-authority)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Corner fold */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      borderStyle: "solid",
                      borderWidth: "0 0 18px 18px",
                      borderColor: `transparent transparent rgba(0,0,0,0.09) transparent`,
                    }}
                  />
                </div>
              </motion.div>
            );

            // Arrow connector between cards
            if (i < 3) {
              return [
                card,
                <div
                  key={`arrow-${i}`}
                  className="proc-arrow-col"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: 108, // align with card mid-section
                  }}
                >
                  <SketchArrow idx={i} delay={i * 0.15 + 0.48} />
                </div>,
              ];
            }
            return [card];
          })}
        </div>
      </div>
    </section>
  );
}

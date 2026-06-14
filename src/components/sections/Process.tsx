"use client";

import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const STAGE_KEYS = ["discovery", "design", "build", "launch"] as const;

export default function Process() {
  const t = useTranslations("process");
  const shouldReduce = useReducedMotion() ?? false;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven timeline fill
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.82", "center 0.4"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
  });
  const lineScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="surec"
      aria-label="Çalışma süreci"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(6,7,113,0.026) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(6,7,113,0.026) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          width: 720,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(255,108,12,0.042) 0%, transparent 66%)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: "12%",
          width: 380,
          height: 300,
          background:
            "radial-gradient(ellipse at center, rgba(6,7,113,0.036) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <SectionHeader
          number={t("sectionNumber")}
          title={t("sectionTitle")}
          descriptor={t("sectionDescriptor")}
        />

        <div style={{ position: "relative" }}>
          {/* ── Timeline row (hidden on mobile via CSS) ── */}
          <div
            className="proc-timeline-row"
            style={{ position: "relative", height: 48, marginBottom: 28 }}
          >
            {/* Base track */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc((100% - 144px) / 8)",
                right: "calc((100% - 144px) / 8)",
                height: 1,
                backgroundColor: "rgba(6,7,113,0.1)",
                transform: "translateY(-50%)",
              }}
            />

            {/* Scroll-driven orange fill */}
            {!shouldReduce && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "calc((100% - 144px) / 8)",
                  right: "calc((100% - 144px) / 8)",
                  height: 2,
                  transform: "translateY(-50%)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, #ff6c0c 0%, rgba(255,108,12,0.68) 100%)",
                    transformOrigin: "left",
                    scaleX: lineScaleX,
                  }}
                />
              </div>
            )}

            {/* Travelling dot */}
            {!shouldReduce && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "calc((100% - 144px) / 8)",
                  right: "calc((100% - 144px) / 8)",
                  height: 0,
                  transform: "translateY(-50%)",
                  overflow: "visible",
                }}
              >
                <div
                  className="proc-dot-travel"
                  style={{
                    position: "absolute",
                    top: -2,
                    left: 0,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: "#ff6c0c",
                    boxShadow: "0 0 7px rgba(255,108,12,0.9)",
                  }}
                />
              </div>
            )}

            {/* Nodes — grid-aligned */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0 48px",
                height: "100%",
                alignItems: "center",
              }}
            >
              {STAGE_KEYS.map((key, i) => {
                const isBuild = i === 2;
                const isHov = hoveredStep === i;
                const nodeSize = isBuild ? 14 : 9;

                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* Build pulse ring */}
                    {isBuild && !shouldReduce && (
                      <div
                        className="proc-node-pulse"
                        style={{
                          position: "absolute",
                          width: nodeSize + 16,
                          height: nodeSize + 16,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(255,108,12,0.4)",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    {/* Hover glow */}
                    <div
                      style={{
                        position: "absolute",
                        width: nodeSize + 16,
                        height: nodeSize + 16,
                        borderRadius: "50%",
                        background: "rgba(255,108,12,0.12)",
                        opacity: isHov && !shouldReduce ? 1 : 0,
                        transition: "opacity 200ms ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Node */}
                    <motion.div
                      initial={shouldReduce ? {} : { scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.12 + 0.4,
                        ease: EASE_OUT,
                      }}
                      style={{
                        width: nodeSize,
                        height: nodeSize,
                        borderRadius: "50%",
                        backgroundColor:
                          isHov || isBuild ? "#ff6c0c" : "rgba(255,108,12,0.34)",
                        boxShadow:
                          isHov || isBuild
                            ? "0 0 0 3px rgba(255,108,12,0.18), 0 0 14px rgba(255,108,12,0.28)"
                            : "none",
                        transition:
                          "background-color 200ms ease, box-shadow 200ms ease",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Step grid ── */}
          <div
            className="process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0 48px",
            }}
          >
            {STAGE_KEYS.map((key, i) => {
              const stage = t.raw(`stages.${key}`) as {
                number: string;
                title: string;
                description: string;
              };
              const isHov = hoveredStep === i;
              const isBuild = i === 2;

              return (
                <motion.div
                  key={key}
                  className="proc-step"
                  initial={shouldReduce ? {} : { opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: EASE_OUT,
                  }}
                  whileHover={
                    !shouldReduce
                      ? {
                          y: -4,
                          scale: 1.02,
                          transition: { duration: 0.25, ease: EASE_OUT },
                        }
                      : {}
                  }
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    position: "relative",
                    paddingTop: 24,
                    paddingBottom: 24,
                    cursor: "default",
                    transformOrigin: "top center",
                  }}
                >
                  {/* Top border — draw in + hover orange */}
                  <motion.div
                    initial={shouldReduce ? {} : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.12,
                      ease: EASE_OUT,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      backgroundColor: "var(--color-border)",
                      transformOrigin: "left",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: 2,
                      width:
                        isHov && !shouldReduce
                          ? "100%"
                          : isBuild && !shouldReduce
                          ? "38%"
                          : "0%",
                      background: isBuild
                        ? "linear-gradient(90deg, #ff6c0c, rgba(255,108,12,0.45))"
                        : "#ff6c0c",
                      transition: "width 300ms cubic-bezier(0,0,0.2,1)",
                      borderRadius: 1,
                    }}
                  />

                  {/* Mobile vertical node */}
                  <div
                    className="proc-step-node"
                    style={{
                      display: "none",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: isBuild
                        ? "#ff6c0c"
                        : "rgba(255,108,12,0.45)",
                      flexShrink: 0,
                    }}
                  />

                  {/* Number */}
                  <div style={{ overflow: "hidden", marginBottom: 18 }}>
                    <motion.span
                      initial={shouldReduce ? {} : { y: "110%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.12 + 0.1,
                        ease: EASE_OUT,
                      }}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: isHov
                          ? "#ff6c0c"
                          : isBuild
                          ? "rgba(255,108,12,0.88)"
                          : "rgba(255,108,12,0.62)",
                        display: "block",
                        transition: "color 200ms ease",
                      }}
                    >
                      {stage.number}
                    </motion.span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px, 1.8vw, 28px)",
                      fontWeight: isBuild ? 700 : 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      color:
                        isHov || isBuild
                          ? "var(--color-authority-deep)"
                          : "var(--color-authority)",
                      marginBottom: 14,
                      transition: "color 200ms ease",
                    }}
                  >
                    {stage.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      lineHeight: 1.65,
                      color: isHov
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      margin: 0,
                      transform:
                        isHov && !shouldReduce
                          ? "translateX(4px)"
                          : "translateX(0)",
                      transition:
                        "color 200ms ease, transform 250ms cubic-bezier(0,0,0.2,1)",
                    }}
                  >
                    {stage.description}
                  </p>

                  {/* Build: ambient glow overlay */}
                  {isBuild && !shouldReduce && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(255,108,12,0.03) 0%, transparent 55%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

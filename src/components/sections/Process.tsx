"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const STAGE_KEYS = ["discovery", "design", "build", "launch"] as const;

export default function Process() {
  const t = useTranslations("process");
  const shouldReduce = useReducedMotion() ?? false;
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <section
      id="surec"
      aria-label="Çalışma süreci"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="container-site">
        <SectionHeader
          number={t("sectionNumber")}
          title={t("sectionTitle")}
          descriptor={t("sectionDescriptor")}
        />

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

            const isHovered = hoveredStage === i;

            return (
              <motion.div
                key={key}
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: EASE_OUT,
                }}
                onMouseEnter={() => setHoveredStage(i)}
                onMouseLeave={() => setHoveredStage(null)}
                style={{
                  position: "relative",
                  paddingTop: 28,
                  paddingBottom: 24,
                  cursor: "default",
                }}
              >
                {/* Animated top border — base layer */}
                <motion.div
                  initial={shouldReduce ? {} : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
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
                    backgroundColor: isHovered ? "#ff6c0c" : "var(--color-border)",
                    transformOrigin: "left",
                    transition: "background-color 220ms ease",
                  }}
                />

                {/* Hover accent — thicker orange line on top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 2,
                    width: isHovered && !shouldReduce ? "100%" : "0%",
                    backgroundColor: "#ff6c0c",
                    transition: "width 300ms cubic-bezier(0,0,0.2,1)",
                  }}
                />

                {/* Number — clip-path reveal */}
                <div style={{ overflow: "hidden", marginBottom: 20 }}>
                  <motion.span
                    initial={shouldReduce ? {} : { y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.12 + 0.1,
                      ease: EASE_OUT,
                    }}
                    className="text-label"
                    style={{
                      color: "var(--color-action)",
                      display: "block",
                      transform: isHovered && !shouldReduce ? "scale(1.08)" : "scale(1)",
                      transformOrigin: "left center",
                      transition: "transform 200ms ease",
                    }}
                  >
                    {stage.number}
                  </motion.span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    color: isHovered ? "#060771" : "var(--color-authority)",
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
                    color: isHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    margin: 0,
                    transform: isHovered && !shouldReduce ? "translateX(4px)" : "translateX(0)",
                    transition: "color 200ms ease, transform 250ms cubic-bezier(0,0,0.2,1)",
                  }}
                >
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

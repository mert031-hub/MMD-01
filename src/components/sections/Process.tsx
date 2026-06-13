"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const STAGE_KEYS = ["discovery", "design", "build", "launch"] as const;

export default function Process() {
  const t = useTranslations("process");
  const shouldReduce = useReducedMotion() ?? false;

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
                style={{
                  position: "relative",
                  paddingTop: 28,
                  paddingBottom: 8,
                }}
              >
                {/* Animated top border line */}
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
                    backgroundColor: "var(--color-border)",
                    transformOrigin: "left",
                  }}
                />

                {/* Number — clip-path reveal */}
                <div style={{ overflow: "hidden", marginBottom: 16 }}>
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
                    color: "var(--color-authority)",
                    marginBottom: 12,
                  }}
                >
                  {stage.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                    margin: 0,
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

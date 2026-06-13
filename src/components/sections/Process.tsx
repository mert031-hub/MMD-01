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
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
                style={{
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: 28,
                  paddingBottom: 8,
                }}
              >
                <span
                  className="text-label"
                  style={{
                    color: "var(--color-action)",
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  {stage.number}
                </span>
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

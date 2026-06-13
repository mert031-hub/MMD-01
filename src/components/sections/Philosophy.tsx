"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function Philosophy() {
  const t = useTranslations("philosophy");
  const shouldReduce = useReducedMotion() ?? false;

  const beliefs = [
    { number: t("belief1Number"), text: t("belief1") },
    { number: t("belief2Number"), text: t("belief2") },
    { number: t("belief3Number"), text: t("belief3") },
  ] as const;

  return (
    <section
      id="felsefe"
      aria-label="Stüdyo felsefesi"
      style={{
        backgroundColor: "var(--color-authority)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture — MM */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(240px, 30vw, 480px)",
          fontWeight: 700,
          color: "rgba(255,251,243,0.025)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        MM
      </div>

      <div
        className="container-site section-padding"
        style={{ position: "relative" }}
      >
        {/* Main quote — dramatic entrance */}
        <div style={{ overflow: "hidden", marginBottom: 72 }}>
          <motion.blockquote
            initial={shouldReduce ? {} : { y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.6vw, 60px)",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--color-text-inverse)",
              maxWidth: 820,
              margin: 0,
              padding: 0,
              border: "none",
            }}
          >
            &ldquo;{t("quote")}&rdquo;
          </motion.blockquote>
        </div>

        {/* Beliefs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: 680,
          }}
        >
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: EASE_OUT,
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "0 24px",
                alignItems: "start",
                paddingTop: 28,
                paddingBottom: 28,
                borderTop: "1px solid var(--color-dark-border)",
              }}
            >
              <span
                className="text-label"
                style={{
                  color: "var(--color-action)",
                  paddingTop: 3,
                  display: "block",
                }}
              >
                {belief.number}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  lineHeight: 1.65,
                  color: "rgba(255,251,243,0.75)",
                  margin: 0,
                }}
              >
                {belief.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

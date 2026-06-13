"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function Philosophy() {
  const t = useTranslations("philosophy");
  const shouldReduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<number | null>(null);

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
        backgroundImage:
          "radial-gradient(circle, rgba(255,251,243,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture — MM, very subtle, slow drift */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { x: [0, 14, 0] }}
        transition={
          shouldReduce
            ? {}
            : {
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
        style={{
          position: "absolute",
          right: "-4%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(260px, 32vw, 520px)",
          fontWeight: 700,
          color: "rgba(255,251,243,0.018)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        MM
      </motion.div>

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
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: "0 24px",
                alignItems: "start",
                paddingTop: 28,
                paddingBottom: 28,
                borderTop: hovered === i
                  ? "1px solid var(--color-action)"
                  : "1px solid var(--color-dark-border)",
                transition: "border-color 200ms ease",
                cursor: "default",
              }}
            >
              {/* Number — display font, strong */}
              <div style={{ overflow: "hidden", paddingTop: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--color-action)",
                    display: "block",
                    transform: hovered === i && !shouldReduce ? "scale(1.1)" : "scale(1)",
                    transformOrigin: "left center",
                    transition: "transform 200ms ease",
                  }}
                >
                  {belief.number}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  transform: hovered === i && !shouldReduce ? "translateX(6px)" : "translateX(0)",
                  transition: "transform 200ms ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    lineHeight: 1.65,
                    color: hovered === i
                      ? "rgba(255,251,243,0.95)"
                      : "rgba(255,251,243,0.72)",
                    margin: 0,
                    transition: "color 200ms ease",
                  }}
                >
                  {belief.text}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div
            style={{
              borderTop: "1px solid var(--color-dark-border)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

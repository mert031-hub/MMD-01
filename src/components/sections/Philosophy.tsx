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
      {/* Background MM watermark */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { x: [0, 14, 0] }}
        transition={
          shouldReduce
            ? {}
            : { duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
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
        {/* Section label row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 80,
          }}
        >
          <motion.div
            initial={shouldReduce ? {} : { width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            style={{
              height: 2,
              backgroundColor: "var(--color-action)",
              flexShrink: 0,
            }}
          />
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
            className="text-label"
            style={{ color: "var(--color-action)", margin: 0 }}
          >
            {t("label")}
          </motion.p>
        </div>

        {/* Quote block */}
        <div style={{ position: "relative", marginBottom: 96 }}>
          {/* Decorative large opening quotation mark */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-28px",
              left: "-6px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(96px, 13vw, 200px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "rgba(255,108,12,0.13)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            &ldquo;
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.blockquote
              initial={shouldReduce ? {} : { y: "65%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.8vw, 64px)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "rgba(255,251,243,0.97)",
                maxWidth: 860,
                margin: "0 0 32px 0",
                padding: 0,
                border: "none",
                position: "relative",
              }}
            >
              {t("quote")}
            </motion.blockquote>
          </div>

          <motion.span
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(255,108,12,0.65)",
            }}
          >
            — MMDESIGN
          </motion.span>
        </div>

        {/* Beliefs — editorial manifesto rows */}
        <div>
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? {} : { opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.13, ease: EASE_OUT }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="phil-row"
              style={{
                paddingTop: 44,
                paddingBottom: 44,
                borderTop: "1px solid rgba(255,251,243,0.10)",
                position: "relative",
                cursor: "default",
              }}
            >
              {/* Left accent bar */}
              <span
                className="phil-accent"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: "var(--color-action)",
                  transformOrigin: "top",
                }}
              />

              <div className="phil-inner">
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 4vw, 58px)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color:
                      hovered === i
                        ? "rgba(255,108,12,1)"
                        : "rgba(255,108,12,0.38)",
                    transition: "color 220ms ease",
                    userSelect: "none",
                  }}
                >
                  {belief.number}
                </span>

                {/* Belief text */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(19px, 2.4vw, 38px)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    lineHeight: 1.22,
                    letterSpacing: "-0.015em",
                    color:
                      hovered === i
                        ? "rgba(255,251,243,0.97)"
                        : "rgba(255,251,243,0.68)",
                    margin: 0,
                    transition:
                      "color 220ms ease, transform 250ms cubic-bezier(0,0,0.2,1)",
                    transform:
                      hovered === i && !shouldReduce
                        ? "translateX(8px)"
                        : "translateX(0)",
                  }}
                >
                  {belief.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div
            style={{ borderTop: "1px solid rgba(255,251,243,0.10)" }}
          />
        </div>
      </div>

      <style>{`
        .phil-accent {
          transform: scaleY(0);
          transition: transform 320ms cubic-bezier(0,0,0.2,1);
        }
        .phil-row:hover .phil-accent {
          transform: scaleY(1);
        }
        .phil-inner {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 0 56px;
          align-items: center;
          padding-left: 0;
          transition: padding-left 280ms cubic-bezier(0,0,0.2,1);
        }
        .phil-row:hover .phil-inner {
          padding-left: 20px !important;
        }
        @media (max-width: 640px) {
          .phil-inner {
            grid-template-columns: 52px 1fr;
            gap: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}

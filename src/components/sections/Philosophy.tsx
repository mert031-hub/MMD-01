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
    { number: t("belief1Number"), text: t("belief1"), support: t("belief1Support") },
    { number: t("belief2Number"), text: t("belief2"), support: t("belief2Support") },
    { number: t("belief3Number"), text: t("belief3"), support: t("belief3Support") },
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
          fontSize: "clamp(240px, 28vw, 460px)",
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
            marginBottom: 56,
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
        <div style={{ position: "relative", marginBottom: 72 }}>
          {/* Decorative large opening quotation mark — animated */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              position: "absolute",
              top: "-24px",
              left: "-6px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(80px, 11vw, 172px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "rgba(255,108,12,0.13)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              transformOrigin: "left top",
            }}
          >
            &ldquo;
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.blockquote
              initial={shouldReduce ? {} : { y: "65%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.8vw, 48px)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "rgba(255,251,243,0.97)",
                maxWidth: 800,
                margin: "0 0 28px 0",
                padding: 0,
                border: "none",
                position: "relative",
              }}
            >
              {t("quote")}
            </motion.blockquote>
          </div>

          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}
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

        {/* Beliefs — compact editorial rows with reveal */}
        <div>
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.11, ease: EASE_OUT }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="phil-row"
              style={{
                paddingTop: 32,
                paddingBottom: 32,
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
                    fontSize: "clamp(26px, 2.8vw, 42px)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color:
                      hovered === i
                        ? "rgba(255,108,12,1)"
                        : "rgba(255,108,12,0.38)",
                    transition: "color 220ms ease",
                    userSelect: "none",
                    alignSelf: "start",
                    paddingTop: 3,
                  }}
                >
                  {belief.number}
                </span>

                {/* Belief text + support reveal */}
                <div
                  style={{
                    transition: "transform 250ms cubic-bezier(0,0,0.2,1)",
                    transform:
                      hovered === i && !shouldReduce
                        ? "translateX(8px)"
                        : "translateX(0)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(15px, 1.7vw, 26px)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      color:
                        hovered === i
                          ? "rgba(255,251,243,0.97)"
                          : "rgba(255,251,243,0.72)",
                      margin: 0,
                      transition: "color 220ms ease",
                    }}
                  >
                    {belief.text}
                  </p>

                  {/* Support text — revealed on hover, always visible on mobile */}
                  <div
                    className="phil-support"
                    style={{
                      maxHeight:
                        hovered === i && !shouldReduce ? 120 : 0,
                      opacity: hovered === i ? 1 : 0,
                      overflow: "hidden",
                      transition:
                        "max-height 380ms cubic-bezier(0,0,0.2,1), opacity 280ms ease",
                    }}
                  >
                    <div style={{ paddingTop: 14 }}>
                      <div
                        style={{
                          width: 22,
                          height: 1,
                          backgroundColor: "var(--color-action)",
                          opacity: 0.55,
                          marginBottom: 10,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(12px, 1vw, 13px)",
                          lineHeight: 1.7,
                          color: "rgba(255,251,243,0.55)",
                          margin: 0,
                          maxWidth: 480,
                        }}
                      >
                        {belief.support}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom border — animated reveal */}
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            style={{
              borderTop: "1px solid rgba(255,251,243,0.10)",
              transformOrigin: "left",
            }}
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
          grid-template-columns: 80px 1fr;
          gap: 0 44px;
          align-items: start;
          padding-left: 0;
          transition: padding-left 280ms cubic-bezier(0,0,0.2,1);
        }
        .phil-row:hover .phil-inner {
          padding-left: 18px !important;
        }
        @media (max-width: 768px) {
          .phil-support {
            max-height: 160px !important;
            opacity: 0.55 !important;
          }
        }
        @media (max-width: 640px) {
          .phil-inner {
            grid-template-columns: 44px 1fr;
            gap: 0 16px;
          }
        }
      `}</style>
    </section>
  );
}

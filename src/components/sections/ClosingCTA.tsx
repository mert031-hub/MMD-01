"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const WA_URL = "https://wa.me/905349626627";

export default function ClosingCTA() {
  const t = useTranslations("cta");
  const shouldReduce = useReducedMotion() ?? false;

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="iletisim"
      aria-label="İletişime geç"
      style={{
        backgroundColor: "var(--color-authority)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture — breathing MM */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { opacity: [0.028, 0.048, 0.028] }}
        transition={
          shouldReduce
            ? {}
            : {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
        style={{
          position: "absolute",
          left: "-4%",
          bottom: "-20%",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 28vw, 440px)",
          fontWeight: 700,
          color: "rgba(255,251,243,1)",
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
        style={{ position: "relative", textAlign: "center" }}
      >
        {/* Heading — clip-path reveal for drama */}
        <div style={{ overflow: "hidden", marginBottom: 20 }}>
          <motion.h2
            initial={shouldReduce ? {} : { y: "80%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.8vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-text-inverse)",
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            {t("heading")}
          </motion.h2>
        </div>

        {/* Supporting */}
        <motion.p
          {...fadeUp(0.18)}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            lineHeight: 1.7,
            color: "rgba(255,251,243,0.65)",
            maxWidth: 440,
            margin: "0 auto 52px",
          }}
        >
          {t("supporting")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {/* WhatsApp primary */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp üzerinden iletişime geç"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
              color: "#fffbf3",
              backgroundColor: "#25D366",
              padding: "16px 36px",
              borderRadius: 0,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1dba59";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#25D366";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("whatsapp")}
          </a>

          {/* Phone secondary */}
          <a
            href="tel:+905349626627"
            aria-label="Telefon ile ara: 0534 962 66 27"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "-0.01em",
              color: "rgba(255,251,243,0.75)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              transition: "color 200ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-inverse)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,251,243,0.75)")
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 3a.5.5 0 01.5-.5H4a.5.5 0 01.5.5v1.5a.5.5 0 01-.15.35l-.7.7A7.5 7.5 0 008.45 9.35l.7-.7A.5.5 0 019.5 8.5H11a.5.5 0 01.5.5V10.5a.5.5 0 01-.5.5H10C5.858 11 2.5 7.642 2.5 3.5V3z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            {t("phone")}
          </a>
        </motion.div>

        {/* Reassurance note */}
        <motion.p
          {...fadeUp(0.42)}
          className="text-label"
          style={{
            color: "rgba(255,251,243,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          {t("freeConsult")}
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { waUrl } from "@/lib/whatsapp";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function ClosingCTA() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: EASE_OUT },
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
      {/* Background MM watermark */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { opacity: [0.025, 0.042, 0.025] }}
        transition={
          shouldReduce
            ? {}
            : { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
        }
        style={{
          position: "absolute",
          right: "-3%",
          bottom: "-18%",
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

      {/* Two-column layout */}
      <div
        className="container-site section-padding"
        style={{ position: "relative" }}
      >
        <div className="cta-grid">

          {/* ── LEFT: Heading + supporting copy ── */}
          <div>
            {/* Orange accent */}
            <motion.div
              {...fadeUp(0)}
              style={{
                width: 40,
                height: 2,
                backgroundColor: "var(--color-action)",
                marginBottom: 36,
                opacity: 0.85,
              }}
            />

            {/* Heading */}
            <div style={{ overflow: "hidden", marginBottom: 20 }}>
              <motion.h2
                initial={shouldReduce ? {} : { y: "70%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 58px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-inverse)",
                  margin: 0,
                  maxWidth: 540,
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
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: 1.75,
                color: "rgba(255,251,243,0.55)",
                maxWidth: 420,
                margin: 0,
              }}
            >
              {t("supporting")}
            </motion.p>

            {/* Studio signature */}
            <motion.p
              {...fadeUp(0.32)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.15)",
                marginTop: 48,
              }}
            >
              MMDESIGN — İstanbul
            </motion.p>
          </div>

          {/* ── RIGHT: CTA block ── */}
          <motion.div
            {...fadeUp(0.22)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
            }}
          >
            {/* Free consult label */}
            <p
              className="text-label"
              style={{
                color: "rgba(255,251,243,0.65)",
                letterSpacing: "0.12em",
                marginBottom: 20,
              }}
            >
              {t("freeConsult")}
            </p>

            {/* WhatsApp primary — orange, full width, btn-sweep */}
            <MagneticButton strength={0.18}>
              <a
                href={waUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp üzerinden iletişime geç"
                className="btn-sweep cta-wa-btn"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#fffbf3",
                  backgroundColor: "var(--color-action)",
                  padding: "18px 40px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  whiteSpace: "nowrap",
                  transition: "box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,108,12,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("whatsapp")}
              </a>
            </MagneticButton>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "rgba(255,251,243,0.07)",
                margin: "24px 0",
              }}
            />

            {/* Phone secondary */}
            <a
              href="tel:+905349626627"
              aria-label="Telefon ile ara: 0534 962 66 27"
              className="cta-phone-link"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: "-0.01em",
                color: "rgba(255,251,243,0.55)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "color 200ms ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2.5 3a.5.5 0 01.5-.5H4a.5.5 0 01.5.5v1.5a.5.5 0 01-.15.35l-.7.7A7.5 7.5 0 008.45 9.35l.7-.7A.5.5 0 019.5 8.5H11a.5.5 0 01.5.5V10.5a.5.5 0 01-.5.5H10C5.858 11 2.5 7.642 2.5 3.5V3z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              {t("phone")}
            </a>

            {/* Availability signal */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 28,
              }}
            >
              <span
                aria-hidden="true"
                style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                  }}
                />
                <span
                  className="presence-ping"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                  }}
                />
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,251,243,0.60)",
                  letterSpacing: "0.02em",
                  margin: 0,
                }}
              >
                {t("availability")}
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .cta-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 80px;
          align-items: center;
        }
        .cta-wa-btn { width: fit-content; }
        .cta-phone-link:hover { color: rgba(255,251,243,0.88) !important; }
        @media (max-width: 900px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }
        }
      `}</style>
    </section>
  );
}

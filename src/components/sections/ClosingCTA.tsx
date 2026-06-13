"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { waUrl } from "@/lib/whatsapp";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PHONE_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M2.5 3a.5.5 0 01.5-.5H4a.5.5 0 01.5.5v1.5a.5.5 0 01-.15.35l-.7.7A7.5 7.5 0 008.45 9.35l.7-.7A.5.5 0 019.5 8.5H11a.5.5 0 01.5.5V10.5a.5.5 0 01-.5.5H10C5.858 11 2.5 7.642 2.5 3.5V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export default function ClosingCTA() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const [waHover, setWaHover] = useState(false);
  const [phoneHover, setPhoneHover] = useState(false);

  const headlineLines = [t("heading1"), t("heading2"), t("heading3")];
  const trustItems = [t("trust1"), t("trust2"), t("trust3"), t("trust4")];
  const stats = [
    { value: "20+", label: t("stat1label") },
    { value: "5+",  label: t("stat2label") },
    { value: "100%", label: t("stat3label") },
  ];

  const vpOnce = { once: true as const, margin: "-80px" as const };

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
      {/* ── Background layers ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* Engineering micro-grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,251,243,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,251,243,0.018) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />

        {/* Radial glow — top left cream */}
        <div style={{
          position: "absolute",
          top: "-15%",
          left: "-8%",
          width: "55%",
          height: "75%",
          background: "radial-gradient(ellipse at top left, rgba(255,251,243,0.035) 0%, transparent 65%)",
        }} />

        {/* Radial glow — bottom right orange */}
        <div style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(ellipse at bottom right, rgba(255,108,12,0.055) 0%, transparent 65%)",
        }} />

        {/* MM watermark */}
        <motion.div
          animate={shouldReduce ? {} : { opacity: [0.028, 0.048, 0.028] }}
          transition={shouldReduce ? {} : { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          style={{
            position: "absolute",
            right: "-3%",
            bottom: "-20%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(220px, 30vw, 480px)",
            fontWeight: 700,
            color: "rgba(255,251,243,1)",
            lineHeight: 1,
            userSelect: "none",
            letterSpacing: "-0.04em",
          }}
        >
          MM
        </motion.div>

        {/* Diagonal accent lines */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "38%",
          width: 1,
          height: "100%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,251,243,0.04) 30%, rgba(255,251,243,0.04) 70%, transparent 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="container-site section-padding" style={{ position: "relative", zIndex: 1 }}>
        <div className="cta-grid">

          {/* ─── LEFT: Headline + trust + stats ─── */}
          <div>

            {/* Accent line */}
            <motion.div
              initial={shouldReduce ? {} : { width: 0 }}
              whileInView={{ width: 40 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              style={{ height: 2, backgroundColor: "var(--color-action)", marginBottom: 44, opacity: 0.9 }}
            />

            {/* Headline — 3 lines, stagger reveal */}
            <h2
              aria-label={headlineLines.join(" ")}
              style={{ margin: "0 0 28px 0" }}
            >
              {headlineLines.map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    initial={shouldReduce ? {} : { y: "80%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={vpOnce}
                    transition={{ duration: 0.72, delay: i * 0.14, ease: EASE_OUT }}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(32px, 4.4vw, 72px)",
                      fontWeight: 700,
                      lineHeight: 1.08,
                      letterSpacing: "-0.025em",
                      color: "rgba(255,251,243,0.97)",
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>

            {/* Supporting */}
            <motion.p
              initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 0.48, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: 1.75,
                color: "rgba(255,251,243,0.55)",
                maxWidth: 400,
                margin: "0 0 44px 0",
              }}
            >
              {t("supporting")}
            </motion.p>

            {/* Trust items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduce ? {} : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vpOnce}
                  transition={{ duration: 0.42, delay: 0.56 + i * 0.1, ease: EASE_OUT }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {/* Check mark */}
                  <span
                    aria-hidden="true"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(255,108,12,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--color-action)",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgba(255,251,243,0.70)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 1.05, ease: EASE_OUT }}
              style={{
                display: "flex",
                gap: 0,
                borderTop: "1px solid rgba(255,251,243,0.08)",
                paddingTop: 28,
              }}
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    paddingRight: 24,
                    borderRight: i < stats.length - 1 ? "1px solid rgba(255,251,243,0.07)" : "none",
                    paddingLeft: i > 0 ? 24 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px, 2.2vw, 32px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "rgba(255,251,243,0.92)",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(255,251,243,0.38)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Premium glass contact card ─── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vpOnce}
            transition={{ duration: 0.72, delay: 0.22, ease: EASE_OUT }}
          >
            <div className="cta-card">

              {/* Card header label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 20, height: 1.5, backgroundColor: "var(--color-action)", opacity: 0.7 }} />
                <p
                  className="text-label"
                  style={{ color: "rgba(255,251,243,0.60)", margin: 0, letterSpacing: "0.12em" }}
                >
                  {t("freeConsult")}
                </p>
              </div>

              {/* WhatsApp CTA */}
              <MagneticButton strength={0.15}>
                <a
                  href={waUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp üzerinden iletişime geç"
                  className="btn-sweep cta-wa-btn"
                  onMouseEnter={() => setWaHover(true)}
                  onMouseLeave={() => setWaHover(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#fffbf3",
                    backgroundColor: "var(--color-action)",
                    padding: "18px 32px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    width: "100%",
                    transition: "box-shadow 200ms ease, transform 180ms ease",
                    boxShadow: waHover && !shouldReduce
                      ? "0 12px 40px rgba(255,108,12,0.42), 0 4px 12px rgba(255,108,12,0.22)"
                      : "0 4px 16px rgba(255,108,12,0.18)",
                    transform: waHover && !shouldReduce ? "translateY(-2px)" : "none",
                    willChange: "transform",
                  }}
                >
                  {WA_ICON}
                  {t("whatsapp")}
                </a>
              </MagneticButton>

              {/* Divider */}
              <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,251,243,0.07)", margin: "24px 0" }} />

              {/* Phone */}
              <a
                href="tel:+905349626627"
                aria-label={`${locale === "tr" ? "Ara" : "Call"}: 0534 962 66 27`}
                onMouseEnter={() => setPhoneHover(true)}
                onMouseLeave={() => setPhoneHover(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                  color: phoneHover && !shouldReduce ? "rgba(255,251,243,0.90)" : "rgba(255,251,243,0.55)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "color 200ms ease",
                }}
              >
                {PHONE_ICON}
                {t("phone")}
                <span
                  aria-hidden="true"
                  style={{
                    opacity: phoneHover && !shouldReduce ? 1 : 0,
                    transform: phoneHover && !shouldReduce ? "translateX(0)" : "translateX(-5px)",
                    transition: "opacity 160ms ease, transform 180ms ease",
                    display: "inline-block",
                  }}
                >
                  →
                </span>
              </a>

              {/* Divider */}
              <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,251,243,0.07)", margin: "24px 0" }} />

              {/* Availability status block */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Status line */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    aria-hidden="true"
                    style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}
                  >
                    <span style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      backgroundColor: "#25D366",
                    }} />
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
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(255,251,243,0.80)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t("availabilityStatus")}
                  </span>
                </div>

                {/* Response time metric */}
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,251,243,0.06)",
                }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "rgba(255,251,243,0.90)",
                      lineHeight: 1,
                    }}
                  >
                    {t("responseTime")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(255,251,243,0.38)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {t("responseLabel")}
                  </span>
                </div>
              </div>
            </div>

            {/* Studio signature */}
            <motion.p
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.10)",
                marginTop: 28,
                textAlign: "right",
              }}
            >
              MMDESIGN — İstanbul
            </motion.p>
          </motion.div>

        </div>
      </div>

      <style>{`
        /* Glass card */
        .cta-card {
          background: linear-gradient(145deg, rgba(255,251,243,0.065) 0%, rgba(255,251,243,0.028) 100%);
          border: 1px solid rgba(255,251,243,0.10);
          border-top-color: rgba(255,251,243,0.16);
          box-shadow:
            0 28px 72px rgba(3,4,74,0.50),
            inset 0 1px 0 rgba(255,251,243,0.08);
          padding: 36px;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        /* WA button sweep */
        .btn-sweep {
          position: relative;
          overflow: hidden;
        }
        .btn-sweep::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%);
          transform: translateX(-110%);
          transition: none;
          pointer-events: none;
        }
        .btn-sweep:hover::after {
          transform: translateX(110%);
          transition: transform 620ms cubic-bezier(0.0,0.0,0.2,1);
        }
        .cta-wa-btn { display: flex !important; }

        /* Availability pulse */
        @keyframes presencePingKf {
          0% { transform: scale(1); opacity: 0.75; }
          80%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .presence-ping {
          animation: presencePingKf 2s ease-out infinite;
        }

        /* Layout */
        .cta-grid {
          display: grid;
          grid-template-columns: 52fr 48fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .cta-card {
            padding: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}

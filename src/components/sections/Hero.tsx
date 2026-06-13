"use client";

import { useReducedMotion, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* ─── BROWSER MOCKUP ─────────────────────────────────────────── */

function ProjectMockup() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow:
          "0 24px 64px rgba(6,7,113,0.18), 0 4px 16px rgba(6,7,113,0.08)",
        transform: "rotate(-2.5deg) translateY(-8px)",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(6,7,113,0.08)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 32,
          backgroundColor: "#f0ece4",
          borderBottom: "1px solid rgba(6,7,113,0.08)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          gap: 5,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#FF5F57",
            display: "block",
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#FEBC2E",
            display: "block",
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#28C840",
            display: "block",
          }}
        />
        <div
          style={{
            flex: 1,
            height: 16,
            backgroundColor: "rgba(6,7,113,0.06)",
            borderRadius: 4,
            marginLeft: 8,
            marginRight: 10,
          }}
        />
      </div>

      {/* Site navigation */}
      <div
        style={{
          height: 44,
          backgroundColor: "#060771",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            width: 72,
            height: 10,
            backgroundColor: "rgba(255,251,243,0.85)",
            borderRadius: 2,
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          {[44, 40, 44].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 6,
                backgroundColor: "rgba(255,251,243,0.3)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero section */}
      <div
        style={{
          backgroundColor: "#fffbf3",
          padding: "28px 20px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 8,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            marginBottom: 6,
          }}
        >
          KALEİÇİ HOTEL
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#060771",
            marginBottom: 8,
          }}
        >
          200 yıllık
          <br />
          bir miras.
        </div>
        <div
          style={{
            width: 36,
            height: 1.5,
            backgroundColor: "#ff6c0c",
            marginBottom: 8,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 14 }}>
          {[90, 75, 60].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 5,
                backgroundColor: "rgba(6,7,113,0.08)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#ff6c0c",
            padding: "6px 12px",
            fontSize: 7.5,
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fffbf3",
          }}
        >
          Rezervasyon
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 4h5M4.5 2l2 2-2 2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content strip */}
      <div
        style={{
          backgroundColor: "#fff7e8",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          borderTop: "1px solid rgba(6,7,113,0.06)",
        }}
      >
        <div style={{ padding: "14px 16px" }}>
          <div
            style={{
              width: 16,
              height: 16,
              backgroundColor: "rgba(6,7,113,0.08)",
              borderRadius: 2,
              marginBottom: 6,
            }}
          />
          {[80, 60].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 4,
                backgroundColor: "rgba(6,7,113,0.07)",
                borderRadius: 2,
                marginBottom: 3,
              }}
            />
          ))}
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderLeft: "1px solid rgba(6,7,113,0.06)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "rgba(6,7,113,0.05)",
              borderRadius: 2,
              marginBottom: 6,
            }}
          />
          {[70].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 4,
                backgroundColor: "rgba(6,7,113,0.07)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SCROLL INDICATOR ───────────────────────────────────────── */

function ScrollIndicator({
  label,
  shouldReduce,
}: {
  label: string;
  shouldReduce: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        className="text-label"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {label}
      </span>
      <div
        style={{
          width: 1,
          height: 40,
          backgroundColor: "rgba(6,7,113,0.12)",
          overflow: "hidden",
          position: "relative",
          borderRadius: 1,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            backgroundColor: "rgba(6,7,113,0.55)",
          }}
          animate={shouldReduce ? {} : { y: ["-100%", "0%", "100%"] }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 1.8,
                  times: [0, 0.45, 1],
                  ease: EASE_OUT,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }
          }
        />
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const lines = [t("heading1"), t("heading2"), t("heading3")];

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: EASE_OUT },
  });

  const lineReveal = (delay: number) => ({
    initial: shouldReduce
      ? {}
      : { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
    transition: { delay, duration: 0.7, ease: EASE_OUT },
  });

  const mockupReveal = {
    initial: shouldReduce ? {} : { opacity: 0, y: 32, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay: 1.1, duration: 0.8, ease: EASE_OUT },
  };

  return (
    <section
      id="hero"
      aria-label={locale === "tr" ? "Giriş" : "Introduction"}
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--color-bg-primary)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main grid */}
      <div
        className="container-site hero-inner"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 100,
        }}
      >
        <div className="hero-grid" style={{ width: "100%" }}>
          {/* ─── LEFT COLUMN ──────────────────────── */}
          <div className="hero-left">
            {/* Label */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-label"
              style={{ color: "var(--color-action)", marginBottom: 32 }}
            >
              {t("label")}
            </motion.p>

            {/* Heading */}
            <h1
              aria-label={lines.join(" ")}
              style={{ marginBottom: 28 }}
            >
              {lines.map((line, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <motion.span
                    {...lineReveal(0.3 + i * 0.18)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(36px, 4.8vw, 76px)",
                      fontWeight: 700,
                      lineHeight: 1.08,
                      letterSpacing: "-0.025em",
                      color: "var(--color-authority)",
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting text */}
            <motion.p
              {...fadeUp(0.95)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.75,
                color: "var(--color-text-secondary)",
                maxWidth: 400,
                marginBottom: 48,
              }}
            >
              {t("supporting")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(1.1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                flexWrap: "wrap",
              }}
            >
              {/* Primary */}
              <Link
                href="/#iletisim"
                aria-label={t("primaryCta")}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fffbf3",
                  backgroundColor: "var(--color-action)",
                  padding: "16px 36px",
                  borderRadius: 0,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition:
                    "background-color 200ms ease, transform 200ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-action-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-action)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {t("primaryCta")}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                  className="hero-cta-arrow"
                >
                  <path
                    d="M2 6.5h9M7.5 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Phone */}
              <a
                href="tel:+905349626627"
                aria-label={`${locale === "tr" ? "Ara" : "Call"}: 0534 962 66 27`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  color: "var(--color-authority)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-action)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-authority)")
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
                0534 962 66 27
              </a>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN ─────────────────────── */}
          <div
            className="hero-right"
            aria-hidden="true"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* MM background — very subtle opacity breathing */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <motion.span
                animate={
                  shouldReduce
                    ? {}
                    : { opacity: [0.04, 0.065, 0.04] }
                }
                transition={
                  shouldReduce
                    ? {}
                    : {
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                      }
                }
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(180px, 22vw, 320px)",
                  fontWeight: 700,
                  color: "var(--color-authority)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.85,
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                MM
              </motion.span>
            </div>

            {/* Floating mockup */}
            <motion.div
              {...mockupReveal}
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Subtle continuous float */}
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -7, 0] }}
                transition={
                  shouldReduce
                    ? {}
                    : {
                        duration: 4.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                      }
                }
              >
                <ProjectMockup />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div {...fadeUp(1.4)}>
        <ScrollIndicator label={t("scrollLabel")} shouldReduce={shouldReduce} />
      </motion.div>
    </section>
  );
}

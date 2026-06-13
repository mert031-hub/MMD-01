"use client";

import {
  useReducedMotion,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* ─── ENGINEERING CARD (secondary, dark) ─────────────────────── */

function EngineeringCard() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow:
          "0 16px 48px rgba(6,7,113,0.28), 0 4px 12px rgba(6,7,113,0.12)",
        border: "1px solid rgba(255,108,12,0.15)",
        userSelect: "none",
        pointerEvents: "none",
        backgroundColor: "#07091f",
      }}
    >
      <div
        style={{
          height: 36,
          backgroundColor: "#05061a",
          borderBottom: "1px solid rgba(255,108,12,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 16,
              height: 16,
              backgroundColor: "#ff6c0c",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 52,
              height: 5,
              backgroundColor: "rgba(255,251,243,0.7)",
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[32, 40, 28].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 4,
                backgroundColor: "rgba(255,251,243,0.18)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "22px 18px 18px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${i * 33.3}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(255,108,12,0.05)",
            }}
          />
        ))}
        <div
          style={{
            fontSize: 7.5,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            marginBottom: 8,
            position: "relative",
          }}
        >
          Pi-Lot Engineering
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "#fffbf3",
            marginBottom: 4,
            position: "relative",
          }}
        >
          Precision
          <br />
          Engineering.
        </div>
        <div
          style={{
            width: 24,
            height: 1.5,
            backgroundColor: "#ff6c0c",
            marginBottom: 10,
            position: "relative",
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: 3, position: "relative" }}
        >
          {[80, 65, 50].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 3,
                backgroundColor: "rgba(255,251,243,0.12)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#05061a",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderTop: "1px solid rgba(255,108,12,0.1)",
        }}
      >
        {["Mühendislik", "Tasarım", "Altyapı"].map((tag, i) => (
          <span
            key={i}
            style={{
              fontSize: 7,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: i === 0 ? "rgba(255,108,12,0.8)" : "rgba(255,251,243,0.25)",
              border: `1px solid ${
                i === 0 ? "rgba(255,108,12,0.3)" : "rgba(255,251,243,0.08)"
              }`,
              padding: "2px 6px",
              borderRadius: 2,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── HOTEL CARD (main, premium warm) ───────────────────────── */

function HotelCard() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow:
          "0 32px 80px rgba(6,7,113,0.22), 0 8px 24px rgba(6,7,113,0.10)",
        border: "1px solid rgba(6,7,113,0.07)",
        userSelect: "none",
        pointerEvents: "none",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          height: 40,
          backgroundColor: "rgba(255,251,243,0.97)",
          borderBottom: "1px solid rgba(6,7,113,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#060771",
          }}
        >
          KALEİÇİ
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {[28, 36, 24].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 4,
                backgroundColor: "rgba(6,7,113,0.12)",
                borderRadius: 1,
              }}
            />
          ))}
          <div
            style={{
              backgroundColor: "#ff6c0c",
              padding: "4px 9px",
              fontSize: 7,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fffbf3",
            }}
          >
            Rezervasyon
          </div>
        </div>
      </div>

      <div
        style={{
          height: 148,
          background:
            "linear-gradient(155deg, #c8ad89 0%, #9e7d55 40%, #6b4f2a 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 22px 18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(6,7,113,0.6) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            width: 36,
            height: 54,
            border: "1.5px solid rgba(255,251,243,0.22)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fffbf3",
              marginBottom: 4,
            }}
          >
            200 yıllık
            <br />
            bir miras.
          </div>
          <div
            style={{ width: 22, height: 1.5, backgroundColor: "#ff6c0c" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1,
          backgroundColor: "rgba(6,7,113,0.05)",
        }}
      >
        {["Standart", "Deluxe", "Suite"].map((room, i) => (
          <div key={i} style={{ backgroundColor: "#fffbf3", padding: "10px 12px" }}>
            <div
              style={{
                width: "100%",
                height: 28,
                backgroundColor:
                  i === 2 ? "#060771" : "rgba(196,168,130,0.22)",
                borderRadius: 2,
                marginBottom: 5,
              }}
            />
            <div
              style={{
                fontSize: 7.5,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                color: "rgba(6,7,113,0.6)",
                marginBottom: 3,
              }}
            >
              {room}
            </div>
            <div
              style={{
                width: "65%",
                height: 3,
                backgroundColor: "rgba(6,7,113,0.08)",
                borderRadius: 1,
              }}
            />
          </div>
        ))}
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

  /* Mouse parallax — spring-eased, depth-layered */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 16 });
  const card1X = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-10, 10]);
  const card1Y = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-7, 7]);
  const card2X = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [14, -14]);
  const card2Y = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [9, -9]);
  const mmDriftX = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const lines = [t("heading1"), t("heading2"), t("heading3")];

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: EASE_OUT },
  });


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
            <motion.p
              {...fadeUp(0.1)}
              className="text-label"
              style={{ color: "var(--color-action)", marginBottom: 32 }}
            >
              {t("label")}
            </motion.p>

            <h1 aria-label={lines.join(" ")} style={{ marginBottom: 28 }}>
              {lines.map((line, lineIdx) => (
                <span
                  key={lineIdx}
                  aria-hidden="true"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: "0.26em",
                  }}
                >
                  {line.split(" ").map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      style={{
                        display: "block",
                        overflow: "hidden",
                        lineHeight: 1.08,
                      }}
                    >
                      <motion.span
                        initial={shouldReduce ? {} : { y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.28 + lineIdx * 0.14 + wordIdx * 0.055,
                          duration: 0.62,
                          ease: EASE_OUT,
                        }}
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
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

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

            <motion.div
              {...fadeUp(1.1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                flexWrap: "wrap",
              }}
            >
              {/* Primary CTA — sweep effect */}
              <Link
                href="/#iletisim"
                aria-label={t("primaryCta")}
                className="btn-sweep"
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
                  whiteSpace: "nowrap",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
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

          {/* ─── RIGHT COLUMN — Parallax composition ── */}
          <div
            className="hero-right"
            aria-hidden="true"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Composition wrapper — editorial dot grid background */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 460,
                backgroundImage:
                  "radial-gradient(circle, rgba(6,7,113,0.04) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            >
              {/* Giant MM watermark — breathing + subtle parallax drift */}
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
                    shouldReduce ? {} : { opacity: [0.045, 0.07, 0.045] }
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
                    x: mmDriftX,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(200px, 26vw, 360px)",
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

              {/* Secondary card — Engineering, top-left, behind
                  Parallax layer → entrance layer → float layer */}
              <motion.div
                style={{
                  x: card1X,
                  y: card1Y,
                  position: "absolute",
                  top: "6%",
                  left: "0%",
                  width: "56%",
                  zIndex: 1,
                  rotate: 2.8,
                }}
              >
                <motion.div
                  initial={
                    shouldReduce ? {} : { opacity: 0, scale: 0.92, y: 16 }
                  }
                  animate={{ opacity: 0.88, scale: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.9, ease: EASE_OUT }}
                >
                  <motion.div
                    animate={shouldReduce ? {} : { y: [0, -5, 0] }}
                    transition={
                      shouldReduce
                        ? {}
                        : {
                            duration: 5.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                          }
                    }
                  >
                    <EngineeringCard />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Main card — Hotel, center-right, front
                  Parallax layer → entrance layer → float layer */}
              <motion.div
                style={{
                  x: card2X,
                  y: card2Y,
                  position: "absolute",
                  bottom: "4%",
                  right: "0%",
                  width: "78%",
                  zIndex: 2,
                  rotate: -2,
                }}
              >
                <motion.div
                  initial={
                    shouldReduce ? {} : { opacity: 0, y: 32, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT }}
                >
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
                    <HotelCard />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* MM brand signature — subtle corner */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6, ease: EASE_OUT }}
                style={{
                  position: "absolute",
                  bottom: "1%",
                  left: "2%",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 2,
                    height: 24,
                    backgroundColor: "var(--color-action)",
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  MMDESIGN
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Depth gradient — softens the hero-to-content transition */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,251,243,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5, ease: EASE_OUT }}
        style={{ zIndex: 2, position: "relative" }}
      >
        <ScrollIndicator label={t("scrollLabel")} shouldReduce={shouldReduce} />
      </motion.div>
    </section>
  );
}

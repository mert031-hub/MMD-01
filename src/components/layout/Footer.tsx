"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { waUrl } from "@/lib/whatsapp";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const PARTICLES = [
  { top: "8%",  left: "4%",  size: 2,   delay: 0,   dur: 9,   orange: true  },
  { top: "21%", left: "17%", size: 1.5, delay: 1.4, dur: 11,  orange: false },
  { top: "55%", left: "9%",  size: 3,   delay: 0.8, dur: 7.5, orange: true  },
  { top: "79%", left: "3%",  size: 1.5, delay: 2.2, dur: 10,  orange: false },
  { top: "13%", left: "77%", size: 2.5, delay: 0.5, dur: 8,   orange: true  },
  { top: "46%", left: "89%", size: 1.5, delay: 1.8, dur: 9.5, orange: false },
  { top: "71%", left: "83%", size: 3,   delay: 0.3, dur: 8.5, orange: true  },
  { top: "88%", left: "53%", size: 1.5, delay: 1.1, dur: 10,  orange: false },
  { top: "33%", left: "63%", size: 1,   delay: 2.8, dur: 12,  orange: false },
  { top: "63%", left: "37%", size: 1,   delay: 0.6, dur: 10,  orange: true  },
];

const NAV_ICONS = [
  <svg key="work" width="16" height="16" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="7" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 7V5.5A1.5 1.5 0 0 1 7.5 4h3A1.5 1.5 0 0 1 12 5.5V7" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="2" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  <svg key="studio" width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M3 14L5.5 11L13 3.5L14.5 5L7 12.5L3 14Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="11.5" y1="5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>,
  <svg key="services" width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L16 6L9 10L2 6L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10L9 14L16 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="contact" width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M3 4h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5L2 15V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

const NAV_ICON_COLORS = [
  { bg: "rgba(255,108,12,0.12)", border: "rgba(255,108,12,0.18)", color: "#ff6c0c" },
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.18)", color: "#a5b4fc" },
  { bg: "rgba(255,108,12,0.12)", border: "rgba(255,108,12,0.18)", color: "#ff6c0c" },
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.18)", color: "#a5b4fc" },
];

// ── BackToTop ─────────────────────────────────────────────────────
function BackToTop({ shouldReduce }: { shouldReduce: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const s = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(s / total, 1) : 0);
      setVisible(s > 500);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const circ = 2 * Math.PI * 18;

  return (
    <motion.button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: shouldReduce ? "instant" : "smooth" })
      }
      aria-label="Back to top"
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.82, y: visible ? 0 : 10 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(6,7,113,0.88)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 8px 32px rgba(3,4,74,0.55)",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48"
           style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none"
                stroke="rgba(255,251,243,0.08)" strokeWidth="2" />
        <circle cx="24" cy="24" r="18" fill="none"
                stroke="#ff6c0c" strokeWidth="2"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
                strokeLinecap="round"
                transform="rotate(-90 24 24)"
                style={{ transition: "stroke-dashoffset 120ms linear" }} />
      </svg>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
           aria-hidden="true" style={{ position: "relative", zIndex: 1 }}>
        <path d="M5.5 9.5V1.5M1.5 5.5l4-4 4 4"
              stroke="rgba(255,251,243,0.85)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

// ── FooterLink ────────────────────────────────────────────────────
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const style: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: 12.5,
    color: hov ? "rgba(255,251,243,0.82)" : "rgba(255,251,243,0.44)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    lineHeight: 1,
    transition: "color 180ms ease, transform 180ms ease",
    paddingTop: 5,
    paddingBottom: 5,
    transform: hov ? "translateX(5px)" : "translateX(0)",
  };
  const arrow = (
    <span
      style={{
        fontSize: 9,
        color: "#ff6c0c",
        opacity: hov ? 1 : 0,
        transition: "opacity 160ms ease",
        flexShrink: 0,
      }}
    >
      →
    </span>
  );
  const inner = (
    <>
      {arrow}
      {children}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      href={href}
      style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {inner}
    </Link>
  );
}

// ── ContactRow ────────────────────────────────────────────────────
function ContactRow({
  icon,
  title,
  subtitle,
  href,
  external,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  last?: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 0",
        borderBottom: last ? "none" : "1px solid rgba(255,251,243,0.055)",
        cursor: "pointer",
      }}
    >
      {/* Icon circle — refined size */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: hov
            ? "rgba(255,108,12,0.16)"
            : "rgba(255,108,12,0.08)",
          border: "1px solid rgba(255,108,12,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 200ms ease, box-shadow 200ms ease, transform 200ms ease",
          boxShadow: hov ? "0 0 14px rgba(255,108,12,0.18)" : "none",
          transform: hov ? "scale(1.06)" : "scale(1)",
          color: "#ff6c0c",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            color: hov ? "rgba(255,251,243,0.96)" : "rgba(255,251,243,0.82)",
            marginBottom: 2,
            transition: "color 180ms ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "rgba(255,251,243,0.36)",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(255,251,243,0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: hov ? "rgba(255,251,243,0.055)" : "transparent",
          transform: hov ? "scale(1.08) translateX(2px)" : "scale(1) translateX(0)",
          transition: "all 200ms ease",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <path
            d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
            stroke="rgba(255,251,243,0.6)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}

// ── NavCol ─── shared wrapper keeps all 4 columns structurally identical
function NavCol({
  colorIndex,
  label,
  shouldReduce,
  delay,
  children,
}: {
  colorIndex: number;
  label: string;
  shouldReduce: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const c = NAV_ICON_COLORS[colorIndex];

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Accent dot */}
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: c.color,
          marginBottom: 16,
          boxShadow: hov
            ? `0 0 10px ${c.color}80`
            : `0 0 6px ${c.color}50`,
          transition: "box-shadow 250ms ease",
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: c.bg,
          border: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.color,
          marginBottom: 16,
          transition: "transform 220ms ease, box-shadow 220ms ease",
          transform: hov ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hov ? `0 4px 14px ${c.color}28` : "none",
        }}
      >
        {NAV_ICONS[colorIndex]}
      </div>

      {/* Column label */}
      <p
        className="text-label"
        style={{
          color: c.color,
          marginBottom: 12,
          letterSpacing: "0.1em",
          opacity: 0.9,
        }}
      >
        {label}
      </p>

      {children}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────
export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const shouldReduce = useReducedMotion() ?? false;
  const alternateLocale = locale === "tr" ? "en" : "tr";
  const alternateLabel = locale === "tr" ? "EN" : "TR";

  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [langHover, setLangHover] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [emailSubmitHov, setEmailSubmitHov] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const year = new Date().getFullYear();
  const copyright = t("copyright").replace("2025", String(year));

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduce || !footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    },
    [shouldReduce]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  const mmX = shouldReduce ? 0 : mousePos.x * -20;
  const mmY = shouldReduce ? 0 : mousePos.y * -12;
  const cardX = shouldReduce ? 0 : mousePos.x * 6;
  const cardY = shouldReduce ? 0 : mousePos.y * 3.5;

  const headlineLines =
    locale === "tr"
      ? ["Geleceği", "birlikte", "inşa edelim."]
      : ["Let's build", "what's", "next."];
  const headlineOrangeIdx = 2;
  const talkLabel = locale === "tr" ? "İLETİŞİME GEÇ" : "LET'S TALK";
  const fastestResp = locale === "tr" ? "En hızlı yanıt" : "Fastest response";
  const stayLabel = locale === "tr" ? "GÜNCEL KAL" : "STAY IN THE LOOP";
  const staySubtitle =
    locale === "tr"
      ? "Strateji, tasarım ve büyüme."
      : "Insights on strategy, design, and growth.";
  const emailPlaceholder =
    locale === "tr" ? "E-posta adresiniz" : "Your email address";
  const projectLabel =
    locale === "tr" ? "YENİ PROJELER" : "NEW PROJECTS";
  const acceptLabel =
    locale === "tr" ? "KABUL EDİYORUZ" : "CURRENTLY ACCEPTING";
  const locationSubtitle =
    locale === "tr" ? "Dünya genelinde" : "Available worldwide";

  return (
    <>
      <BackToTop shouldReduce={shouldReduce} />

      <footer
        ref={footerRef}
        aria-label={locale === "tr" ? "Site alt bilgisi" : "Site footer"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: "#02032e",
          color: "rgba(255,251,243,0.48)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Scroll progress line ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 2,
            width: progressWidth,
            background: "linear-gradient(90deg, #ff6c0c, #ff9048)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* ── Background grid ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,251,243,0.014) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,251,243,0.014) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* ── Gradient glows ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-8%",
            width: "50%",
            paddingBottom: "50%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,108,12,0.038) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "5%",
            right: "-6%",
            width: "38%",
            paddingBottom: "38%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "30%",
            left: "45%",
            width: "30%",
            paddingBottom: "20%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,7,113,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Particles ── */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.orange
                ? "rgba(255,108,12,0.32)"
                : "rgba(99,102,241,0.38)",
              pointerEvents: "none",
              animation: shouldReduce
                ? "none"
                : `ftPDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* ── MM monogram — dimmed watermark ── */}
        <div
          aria-hidden="true"
          className={shouldReduce ? undefined : "ft-mm-breathe"}
          style={{
            position: "absolute",
            right: "-3%",
            bottom: "18%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(160px, 20vw, 340px)",
            fontWeight: 700,
            color: "rgba(255,251,243,0.9)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.04em",
            opacity: 0.016,
            transform: `translate(${mmX}px, ${mmY}px)`,
            transition: shouldReduce ? "none" : "transform 90ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          MM
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* HERO — HEADLINE + CONTACT CARD                        */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          className="container-site"
          style={{ paddingTop: 88, paddingBottom: 20, position: "relative" }}
        >
          <div
            className="ft-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px 52px",
              alignItems: "center",   /* vertically center card with headline */
              position: "relative",
            }}
          >
            {/* ── Left: editorial headline ── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <Link
                href="/"
                aria-label={locale === "tr" ? "MMDESIGN ana sayfa" : "MMDESIGN home"}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 19,
                  letterSpacing: "-0.02em",
                  color: "rgba(255,251,243,0.9)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                MMDESIGN
              </Link>

              <div
                style={{
                  width: 26,
                  height: 2,
                  backgroundColor: "#ff6c0c",
                  marginBottom: 14,
                  opacity: 0.75,
                }}
              />

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(255,251,243,0.48)",
                  maxWidth: 280,
                  margin: "0 0 36px",
                }}
              >
                {t("description")}
              </p>

              {/* Editorial headline */}
              <div style={{ marginBottom: 28 }}>
                {headlineLines.map((line, li) => {
                  const isOrange = li === headlineOrangeIdx;
                  return (
                    <div key={li} style={{ overflow: "hidden" }}>
                      <motion.div
                        initial={shouldReduce ? {} : { y: "105%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.65,
                          delay: 0.1 + li * 0.12,
                          ease: EASE_OUT,
                        }}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(36px, 4.6vw, 70px)",
                          fontWeight: 700,
                          lineHeight: 1.05,
                          letterSpacing: "-0.025em",
                          color: isOrange ? "#ff6c0c" : "rgba(255,251,243,0.94)",
                        }}
                      >
                        {line}
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <motion.div
                initial={shouldReduce ? {} : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: "#ff6c0c",
                  opacity: 0.5,
                  transformOrigin: "left",
                }}
              />
            </motion.div>

            {/* ── Right: glass contact card ── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
              style={{
                transform: shouldReduce
                  ? "none"
                  : `translate(${cardX}px, ${cardY}px)`,
                transition: shouldReduce ? "none" : "transform 90ms ease-out",
                willChange: "transform",
              }}
            >
              <motion.div
                animate={!shouldReduce ? { y: [0, -5, 0] } : {}}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,251,243,0.035) 0%, rgba(6,7,113,0.0) 60%), rgba(4,5,60,0.60)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,251,243,0.075)",
                    borderRadius: 18,
                    padding: "22px 24px 14px",
                    boxShadow:
                      "0 20px 56px rgba(0,0,0,0.38), 0 4px 14px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,251,243,0.05)",
                  }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      paddingBottom: 16,
                      marginBottom: 0,
                      borderBottom: "1px solid rgba(255,251,243,0.055)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: 10.5,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,251,243,0.58)",
                      }}
                    >
                      {talkLabel}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                        boxShadow: "0 0 0 2px rgba(34,197,94,0.18)",
                        animation: shouldReduce
                          ? "none"
                          : "ftPing 2.2s ease-in-out infinite",
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Contact rows */}
                  <ContactRow
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    }
                    title={t("nav.whatsapp")}
                    subtitle={fastestResp}
                    href={waUrl(locale)}
                    external
                  />
                  <ContactRow
                    icon={
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                    title={t("nav.phone")}
                    subtitle={locale === "tr" ? "Türkiye" : "Turkey"}
                    href="tel:+905349626627"
                    external
                  />
                  <ContactRow
                    icon={
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    }
                    title={t("nav.location")}
                    subtitle={locationSubtitle}
                    href="#"
                    last
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ── Connecting path (desktop only) ── */}
            {!shouldReduce && (
              <div
                className="ft-conn-path"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "38%",
                  width: "24%",
                  height: 180,
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  zIndex: 1,
                  overflow: "visible",
                }}
              >
                <svg
                  viewBox="0 0 280 180"
                  fill="none"
                  width="100%"
                  height="100%"
                  overflow="visible"
                >
                  <motion.path
                    d="M 10 140 C 60 140, 160 20, 270 70"
                    stroke="#ff6c0c"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.45 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.3, delay: 0.4, ease: EASE_OUT }}
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(255,108,12,0.55))",
                    }}
                  />
                  <motion.path
                    d="M 260 63 L 270 70 L 260 78"
                    stroke="#ff6c0c"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.45 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.28, delay: 1.65, ease: EASE_OUT }}
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* NAV SECTION                                            */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          className="container-site"
          style={{ paddingTop: 56, paddingBottom: 0, position: "relative" }}
        >
          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,251,243,0.07) 15%, rgba(255,251,243,0.07) 85%, transparent 100%)",
              marginBottom: 48,
            }}
          />

          {/* 4-column nav grid — equal columns, equal rhythm */}
          <div
            className="ft-nav-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0 40px",
            }}
          >
            <NavCol colorIndex={0} label={t("nav.workTitle")} shouldReduce={shouldReduce} delay={0}>
              <FooterLink href="/projeler">{t("nav.selectedWork")}</FooterLink>
              <FooterLink href="/projeler">{t("nav.allWork")}</FooterLink>
              <FooterLink href="/projeler/pi-lot-engineering">Pi-Lot Engineering</FooterLink>
              <FooterLink href="/projeler/kaleici-hotel">Kaleiçi Hotel</FooterLink>
              <FooterLink href="/projeler/kocyigit-trade">Kocyiğit Trade</FooterLink>
            </NavCol>

            <NavCol colorIndex={1} label={t("nav.studioTitle")} shouldReduce={shouldReduce} delay={0.08}>
              <FooterLink href="/studyo">{t("nav.about")}</FooterLink>
              <FooterLink href="/#felsefe">{t("nav.philosophy")}</FooterLink>
              <FooterLink href="/surec">{t("nav.process")}</FooterLink>
            </NavCol>

            <NavCol colorIndex={2} label={t("nav.servicesTitle")} shouldReduce={shouldReduce} delay={0.16}>
              <FooterLink href="/#hizmetler">{t("nav.websiteDesign")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.brandExperience")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.consulting")}</FooterLink>
            </NavCol>

            <NavCol colorIndex={3} label={t("nav.contactTitle")} shouldReduce={shouldReduce} delay={0.24}>
              <FooterLink href={waUrl(locale)} external>
                {t("nav.whatsapp")}
              </FooterLink>
              <FooterLink href="tel:+905349626627" external>
                {t("nav.phone")}
              </FooterLink>
              <div
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontFamily: "var(--font-body)",
                  fontSize: 12.5,
                  color: "rgba(255,251,243,0.34)",
                }}
              >
                {t("nav.location")}
              </div>
            </NavCol>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* BOTTOM STRIP — newsletter + status (secondary tier)   */}
        {/* ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="container-site"
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          style={{ paddingTop: 40, paddingBottom: 0 }}
        >
          <div
            className="ft-bottom-strip"
            style={{
              display: "flex",
              gap: 12,
              alignItems: "stretch",
            }}
          >
            {/* Newsletter — reduced prominence */}
            <div
              style={{
                flex: "0 0 60%",
                background: "rgba(255,251,243,0.022)",
                border: "1px solid rgba(255,251,243,0.055)",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              {/* Email icon — smaller */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.11)",
                  border: "1px solid rgba(99,102,241,0.17)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#a5b4fc",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="1.5"
                        stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 6L9 10.5L16 6" stroke="currentColor"
                        strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Labels */}
              <div style={{ flex: "0 0 auto" }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "rgba(255,251,243,0.72)",
                    marginBottom: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {stayLabel}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11.5,
                    color: "rgba(255,251,243,0.36)",
                  }}
                >
                  {staySubtitle}
                </div>
              </div>

              {/* Input + submit */}
              {emailDone ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#22c55e",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {locale === "tr" ? "Kaydedildi!" : "You're in!"}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (emailVal.trim()) setEmailDone(true);
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 180,
                  }}
                >
                  <input
                    type="email"
                    placeholder={emailPlaceholder}
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    style={{
                      flex: 1,
                      background: "rgba(255,251,243,0.04)",
                      border: "1px solid rgba(255,251,243,0.09)",
                      borderRadius: 7,
                      padding: "9px 12px",
                      fontFamily: "var(--font-body)",
                      fontSize: 12.5,
                      color: "rgba(255,251,243,0.82)",
                      outline: "none",
                      minWidth: 0,
                    }}
                  />
                  <MagneticButton strength={0.18}>
                    <button
                      type="submit"
                      aria-label={locale === "tr" ? "Gönder" : "Subscribe"}
                      onMouseEnter={() => setEmailSubmitHov(true)}
                      onMouseLeave={() => setEmailSubmitHov(false)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: emailSubmitHov ? "#0a0ba3" : "#060771",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: emailSubmitHov
                          ? "0 0 16px rgba(6,7,113,0.55)"
                          : "0 0 8px rgba(6,7,113,0.28)",
                        transition:
                          "background 200ms ease, box-shadow 200ms ease, transform 200ms ease",
                        transform: emailSubmitHov ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 7H12M8 3L12 7L8 11"
                          stroke="rgba(255,251,243,0.88)"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>

            {/* Status panel */}
            <div
              style={{
                flex: 1,
                background: "rgba(34,197,94,0.035)",
                border: "1px solid rgba(34,197,94,0.12)",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 0 2px rgba(34,197,94,0.18)",
                    animation: shouldReduce
                      ? "none"
                      : "ftPing 2.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(34,197,94,0.7)",
                  }}
                >
                  {acceptLabel}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                  color: "rgba(255,251,243,0.84)",
                }}
              >
                {projectLabel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* BOTTOM BAR — copyright · phone · language              */}
        {/* ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="container-site"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          style={{
            paddingTop: 24,
            paddingBottom: 40,
            marginTop: 36,
            borderTop: "1px solid rgba(255,251,243,0.045)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11.5,
              color: "rgba(255,251,243,0.32)",
            }}
          >
            {copyright}
          </span>

          {/* Right group: phone + language */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a
              href="tel:+905349626627"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11.5,
                color: "rgba(255,251,243,0.32)",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,251,243,0.62)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,251,243,0.32)")
              }
            >
              0534 962 66 27
            </a>

            <Link
              href={pathname}
              locale={alternateLocale}
              aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
              onMouseEnter={() => setLangHover(true)}
              onMouseLeave={() => setLangHover(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: langHover
                  ? "rgba(255,251,243,0.85)"
                  : "rgba(255,251,243,0.42)",
                textDecoration: "none",
                transition: "color 180ms ease",
                position: "relative",
                paddingBottom: 3,
              }}
            >
              {alternateLabel}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: "#ff6c0c",
                  transform: langHover ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 200ms ease",
                }}
              />
            </Link>
          </div>
        </motion.div>

        {/* ── Keyframes ── */}
        <style>{`
          @keyframes ftPDrift {
            0%,100% { transform: translate(0,0); opacity: 0.32; }
            33%      { transform: translate(8px,-12px); opacity: 0.55; }
            66%      { transform: translate(-5px,7px); opacity: 0.18; }
          }
          @keyframes ftMMBreathe {
            0%,100% { opacity: 0.012; }
            50%      { opacity: 0.020; }
          }
          @keyframes ftPing {
            0%,100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.2); }
            50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0.0); }
          }
          .ft-mm-breathe { animation: ftMMBreathe 8s ease-in-out infinite; }

          @media (max-width: 900px) {
            .ft-hero-grid { grid-template-columns: 1fr !important; }
            .ft-conn-path { display: none !important; }
            .ft-nav-grid  { grid-template-columns: 1fr 1fr !important; gap: 36px 28px !important; }
          }
          @media (max-width: 640px) {
            .ft-bottom-strip { flex-direction: column !important; }
            .ft-bottom-strip > div { flex: none !important; width: 100% !important; }
          }
          @media (max-width: 480px) {
            .ft-nav-grid { grid-template-columns: 1fr !important; gap: 28px 0 !important; }
          }
        `}</style>
      </footer>
    </>
  );
}

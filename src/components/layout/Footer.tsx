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

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* Social links — update these as needed */
const SOCIAL_INSTAGRAM = "https://instagram.com/mmdesign.studio";
const SOCIAL_BEHANCE   = "https://behance.net/mmdesign";

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
  { top: "42%", left: "28%", size: 1.5, delay: 1.9, dur: 11,  orange: false },
  { top: "16%", left: "48%", size: 1,   delay: 3.1, dur: 9,   orange: true  },
];

/* ─── BackToTop ──────────────────────────────────────────────────────── */
function BackToTop({ shouldReduce }: { shouldReduce: boolean }) {
  const [visible, setVisible]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const s     = window.scrollY;
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
        position: "fixed", bottom: 28, right: 28,
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(6,7,113,0.88)", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 50,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
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
                strokeLinecap="round" transform="rotate(-90 24 24)"
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

/* ─── FooterLink ─────────────────────────────────────────────────────── */
function FooterLink({
  href, external, children,
}: { href: string; external?: boolean; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const style: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 12.5,
    color: hov ? "rgba(255,251,243,0.78)" : "rgba(255,251,243,0.38)",
    textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
    lineHeight: 1, transition: "color 180ms ease, transform 180ms ease",
    paddingTop: 5, paddingBottom: 5,
    transform: hov ? "translateX(5px)" : "translateX(0)",
  };
  const arrow = (
    <span style={{ fontSize: 9, color: "#ff6c0c", opacity: hov ? 1 : 0, transition: "opacity 160ms ease", flexShrink: 0 }}>→</span>
  );
  const inner = <>{arrow}{children}</>;
  if (external)
    return <a href={href} target="_blank" rel="noopener noreferrer" style={style}
               onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{inner}</a>;
  return <Link href={href} style={style}
               onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{inner}</Link>;
}

/* ─── ContactRow ─────────────────────────────────────────────────────── */
function ContactRow({
  icon, title, subtitle, href, external, last,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
  href: string; external?: boolean; last?: boolean;
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
        textDecoration: "none", display: "flex", alignItems: "center",
        gap: 12, padding: "13px 0",
        borderBottom: last ? "none" : "1px solid rgba(255,251,243,0.055)",
        cursor: "pointer",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: hov ? "rgba(255,108,12,0.16)" : "rgba(255,108,12,0.08)",
        border: "1px solid rgba(255,108,12,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: "#ff6c0c",
        transition: "background 200ms ease, box-shadow 200ms ease, transform 200ms ease",
        boxShadow: hov ? "0 0 14px rgba(255,108,12,0.18)" : "none",
        transform: hov ? "scale(1.06)" : "scale(1)",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13,
          color: hov ? "rgba(255,251,243,0.96)" : "rgba(255,251,243,0.82)",
          marginBottom: 2, transition: "color 180ms ease",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{title}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,251,243,0.36)" }}>{subtitle}</div>
      </div>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid rgba(255,251,243,0.09)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        background: hov ? "rgba(255,251,243,0.055)" : "transparent",
        transform: hov ? "scale(1.08) translateX(3px)" : "scale(1) translateX(0)",
        transition: "all 200ms ease",
      }}>
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <path d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
                stroke={hov ? "rgba(255,108,12,0.9)" : "rgba(255,251,243,0.5)"}
                strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

/* ─── NavItem — large editorial navigation ───────────────────────────── */
function NavItem({
  label, href, shouldReduce, delay, children,
}: {
  label: string; href: string; shouldReduce: boolean; delay: number;
  children?: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      <Link
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 2.2vw, 34px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          color: hov ? "rgba(255,251,243,0.94)" : "rgba(255,251,243,0.40)",
          textDecoration: "none",
          display: "block",
          paddingBottom: 12,
          marginBottom: 14,
          position: "relative",
          transition: "color 260ms ease",
        }}
      >
        {label}
        {/* Static base line */}
        <span aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          backgroundColor: "rgba(255,251,243,0.055)",
        }} />
        {/* Animated orange fill */}
        <span aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          backgroundColor: "#ff6c0c",
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 320ms cubic-bezier(0,0,0.2,1)",
          boxShadow: "0 0 8px rgba(255,108,12,0.55)",
        }} />
      </Link>
      {children && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function Footer() {
  const t            = useTranslations("footer");
  const locale       = useLocale();
  const pathname     = usePathname();
  const shouldReduce = useReducedMotion() ?? false;
  const footerRef    = useRef<HTMLElement>(null);
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 });
  const [langHover, setLangHover] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const year           = new Date().getFullYear();
  const copyright      = t("copyright").replace("2025", String(year));
  const alternateLocale = locale === "tr" ? "en" : "tr";
  const alternateLabel  = locale === "tr" ? "EN" : "TR";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce || !footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width  - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  }, [shouldReduce]);

  const handleMouseLeave = useCallback(() => setMousePos({ x: 0, y: 0 }), []);

  const mmX = shouldReduce ? 0 : mousePos.x * -20;
  const mmY = shouldReduce ? 0 : mousePos.y * -12;

  /* Localised copy */
  const isTR          = locale === "tr";
  const startLabel    = isTR ? "PROJENİZİ BAŞLATIN" : "START YOUR PROJECT";
  const acceptLabel   = isTR ? "YENİ PROJELER ALIYORUZ" : "CURRENTLY ACCEPTING PROJECTS";
  const talkLabel     = isTR ? "İLETİŞİME GEÇ" : "LET'S TALK";
  const fastestResp   = isTR ? "En hızlı yanıt" : "Fastest response";
  const locationSub   = isTR ? "Dünya genelinde" : "Available worldwide";

  /* 3 lines max — tighter vertical footprint */
  const headlineLines = isTR
    ? ["HATIRLANACAK", "BİR ŞEY", "İNŞA EDELİM."]
    : ["READY TO BUILD", "SOMETHING", "UNFORGETTABLE?"];
  const orangeIdx = headlineLines.length - 1;

  const navWorkLabel     = isTR ? "ÇALIŞMALAR" : "WORK";
  const navStudioLabel   = isTR ? "STÜDYO"     : "STUDIO";
  const navServLabel     = isTR ? "HİZMETLER"  : "SERVICES";
  const navContactLabel  = isTR ? "İLETİŞİM"   : "CONTACT";

  return (
    <>
      <BackToTop shouldReduce={shouldReduce} />

      <footer
        ref={footerRef}
        aria-label={isTR ? "Site alt bilgisi" : "Site footer"}
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
        <motion.div aria-hidden style={{
          position: "absolute", top: 0, left: 0, height: 2,
          width: progressWidth,
          background: "linear-gradient(90deg, #ff6c0c, #ff9048)",
          zIndex: 10, pointerEvents: "none",
        }} />

        {/* ── Background grid ── */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(255,251,243,0.014) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,251,243,0.014) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        {/* ── Glow gradients ── */}
        <div aria-hidden style={{
          position: "absolute", bottom: "-10%", left: "-8%",
          width: "50%", paddingBottom: "50%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,108,12,0.038) 0%, transparent 68%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: "5%", right: "-6%",
          width: "38%", paddingBottom: "38%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 68%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: "40%", left: "40%",
          width: "30%", paddingBottom: "20%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,7,113,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Faint orbit rings — echo of Philosophy section ── */}
        <div aria-hidden style={{
          position: "absolute", top: "30%", right: "15%",
          width: 560, height: 560, marginTop: -280, marginRight: -280,
          borderRadius: "50%",
          border: "1px solid rgba(255,251,243,0.024)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: "30%", right: "15%",
          width: 860, height: 860, marginTop: -430, marginRight: -430,
          borderRadius: "50%",
          border: "1px solid rgba(255,108,12,0.018)",
          pointerEvents: "none",
        }} />

        {/* ── Particles ── */}
        {PARTICLES.map((p, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", top: p.top, left: p.left,
            width: p.size, height: p.size, borderRadius: "50%",
            backgroundColor: p.orange ? "rgba(255,108,12,0.32)" : "rgba(99,102,241,0.38)",
            pointerEvents: "none",
            animation: shouldReduce ? "none" : `ftPDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }} />
        ))}

        {/* ── MM Watermark — unchanged ── */}
        <div
          aria-hidden
          className={shouldReduce ? undefined : "ft-mm-breathe"}
          style={{
            position: "absolute", right: "-3%", bottom: "18%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(160px, 20vw, 340px)",
            fontWeight: 700, color: "rgba(255,251,243,0.9)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.04em", opacity: 0.016,
            transform: `translate(${mmX}px, ${mmY}px)`,
            transition: shouldReduce ? "none" : "transform 90ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          MMDESIGN
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HERO STATEMENT                                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          className="container-site"
          style={{ paddingTop: 48, paddingBottom: 0, position: "relative" }}
        >
          <div
            className="ft-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "0 64px",
              alignItems: "start",
            }}
          >
            {/* ── Left: editorial mega-headline ── */}
            <div style={{ position: "relative" }}>

              {/* Blueprint measuring line — left edge */}
              <div aria-hidden style={{
                position: "absolute", left: -28, top: 40, bottom: 0,
                width: 1,
                background: "linear-gradient(to bottom, transparent, rgba(255,108,12,0.14) 10%, rgba(255,108,12,0.14) 90%, transparent)",
                pointerEvents: "none",
              }}>
                {[0, 25, 50, 75, 100].map(pct => (
                  <div key={pct} style={{
                    position: "absolute", top: `${pct}%`, left: 0,
                    width: pct === 0 || pct === 100 ? 9 : pct === 50 ? 6 : 4,
                    height: 1,
                    backgroundColor: "rgba(255,108,12,0.22)",
                    transform: "translateY(-0.5px)",
                  }} />
                ))}
              </div>

              {/* Floating coordinates — blueprint detail */}
              <motion.div
                aria-hidden
                initial={shouldReduce ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  marginBottom: 22, pointerEvents: "none",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 9,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,108,12,0.38)",
                }}>40°59&apos;N · 28°58&apos;E</span>
                <div style={{ width: 20, height: 1, backgroundColor: "rgba(255,108,12,0.18)" }} />
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 9,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,251,243,0.16)",
                }}>REF: MMD-{year}</span>
              </motion.div>

              {/* Small label with orange dot */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT }}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}
              >
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  backgroundColor: "#ff6c0c",
                  boxShadow: "0 0 10px rgba(255,108,12,0.8)",
                  flexShrink: 0,
                }} />
                <span className="text-label" style={{ color: "var(--color-action)" }}>
                  {startLabel}
                </span>
              </motion.div>

              {/* Massive headline — hero-section scale */}
              <div style={{ marginBottom: 36 }}>
                {headlineLines.map((line, li) => {
                  const isOrange = li === orangeIdx;
                  return (
                    <motion.div
                      key={li}
                      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.68, delay: 0.18 + li * 0.09, ease: EASE_OUT }}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(36px, 5.5vw, 80px)",
                        fontWeight: 700,
                        lineHeight: 0.92,
                        letterSpacing: "-0.03em",
                        color: isOrange ? "#ff6c0c" : "rgba(255,251,243,0.93)",
                        fontStyle: isOrange ? "italic" : "normal",
                        paddingBottom: 8,
                      }}
                    >
                      {line}
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative orange markers — editorial blueprint */}
              <span aria-hidden style={{
                position: "absolute", right: 40, top: "32%",
                fontFamily: "monospace", fontSize: 11, lineHeight: 1,
                color: "rgba(255,108,12,0.20)", userSelect: "none", pointerEvents: "none",
              }}>+</span>
              <span aria-hidden style={{
                position: "absolute", right: 100, top: "60%",
                fontFamily: "monospace", fontSize: 8,
                color: "rgba(255,108,12,0.14)", userSelect: "none", pointerEvents: "none",
              }}>×</span>
              <span aria-hidden style={{
                position: "absolute", right: 20, top: "74%",
                fontFamily: "monospace", fontSize: 9,
                color: "rgba(255,251,243,0.08)", userSelect: "none", pointerEvents: "none",
              }}>○</span>

              {/* Supporting paragraph */}
              <motion.p
                initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: 1.78,
                  color: "rgba(255,251,243,0.42)",
                  maxWidth: 420, margin: "0 0 28px",
                }}
              >
                {t("description")}
              </motion.p>

              {/* Serial / studio details row */}
              <motion.div
                aria-hidden
                initial={shouldReduce ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.72 }}
                style={{ display: "flex", alignItems: "center", gap: 14, pointerEvents: "none" }}
              >
                <div style={{ width: 20, height: 1, backgroundColor: "rgba(255,108,12,0.22)" }} />
                {[
                  "EST: 2021",
                  "ISTANBUL, TR",
                  "DIGITAL EXPERIENCE",
                ].map((txt, i) => (
                  <span key={i} style={{ display: "contents" }}>
                    {i > 0 && <div style={{ width: 1, height: 10, backgroundColor: "rgba(255,251,243,0.10)" }} />}
                    <span style={{
                      fontFamily: "var(--font-body)", fontSize: 9,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "rgba(255,251,243,0.18)",
                    }}>{txt}</span>
                  </span>
                ))}
              </motion.div>

              {/* Discipline pills — brand · web · strategy */}
              <motion.div
                aria-hidden
                initial={shouldReduce ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.84 }}
                style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, pointerEvents: "none" }}
              >
                {["BRAND", "WEB", "STRATEGY"].map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: "var(--font-body)", fontSize: 8,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "rgba(255,108,12,0.28)",
                    border: "1px solid rgba(255,108,12,0.14)",
                    borderRadius: 2,
                    padding: "3px 7px",
                  }}>{tag}</span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: status + lightweight contact panel ── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.3, ease: EASE_OUT }}
              style={{ paddingTop: 72 }}
            >
              {/* Status indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 0 2px rgba(34,197,94,0.18)",
                  animation: shouldReduce ? "none" : "ftPing 2.2s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 9,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(34,197,94,0.62)",
                }}>{acceptLabel}</span>
              </div>

              {/* LET'S TALK header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                paddingBottom: 14,
                borderBottom: "1px solid rgba(255,251,243,0.055)",
                marginBottom: 0,
              }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 10,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,251,243,0.36)",
                }}>{talkLabel}</span>
              </div>

              {/* Contact rows — lightweight, no glass card */}
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
                subtitle={isTR ? "Türkiye" : "Turkey"}
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
                subtitle={locationSub}
                href="#"
                last
              />

              {/* Orbit echo — visual link to Philosophy section */}
              <div aria-hidden style={{
                marginTop: 22, display: "flex", alignItems: "center", gap: 8,
                pointerEvents: "none",
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  border: "1px solid rgba(255,108,12,0.28)",
                }} />
                <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,108,12,0.07)" }} />
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 8,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "rgba(255,108,12,0.20)",
                }}>PHILOSOPHY ORBIT</span>
                <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,108,12,0.07)" }} />
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  backgroundColor: "rgba(255,108,12,0.28)",
                }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HORIZONTAL ORBIT LINE — full-bleed, slow traveling node        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div style={{ position: "relative", marginTop: 44, height: 20 }}>
          {/* The line */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 1,
            transform: "translateY(-50%)",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,251,243,0.05) 8%, rgba(255,251,243,0.05) 92%, transparent 100%)",
          }} />
          {/* Traveling orange node */}
          {!shouldReduce && (
            <div aria-hidden className="ft-orbit-node" style={{
              position: "absolute", top: "50%", left: 0,
              width: 10, height: 10, marginTop: -5, borderRadius: "50%",
              backgroundColor: "#ff6c0c",
              boxShadow: "0 0 14px rgba(255,108,12,0.75), 0 0 32px rgba(255,108,12,0.28)",
            }} />
          )}
          {/* Glow behind the node (wider, static) */}
          {!shouldReduce && (
            <div aria-hidden className="ft-orbit-glow" style={{
              position: "absolute", top: "50%", left: 0,
              width: 60, height: 4, marginTop: -2,
              background: "radial-gradient(ellipse, rgba(255,108,12,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* EDITORIAL NAVIGATION                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          className="container-site"
          style={{ paddingTop: 36, paddingBottom: 0, position: "relative" }}
        >
          {/* Thin divider */}
          <div style={{
            height: 1, marginBottom: 32,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,251,243,0.06) 15%, rgba(255,251,243,0.06) 85%, transparent 100%)",
          }} />

          <div className="ft-nav-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 32px",
          }}>
            <NavItem label={navWorkLabel} href="/projeler" shouldReduce={shouldReduce} delay={0}>
              <FooterLink href="/projeler">{t("nav.selectedWork")}</FooterLink>
              <FooterLink href="/projeler">{t("nav.allWork")}</FooterLink>
              <FooterLink href="/projeler/pi-lot-engineering">Pi-Lot Engineering</FooterLink>
              <FooterLink href="/projeler/kaleici-hotel">Kaleiçi Hotel</FooterLink>
              <FooterLink href="/projeler/kocyigit-trade">Kocyiğit Trade</FooterLink>
            </NavItem>

            <NavItem label={navStudioLabel} href="/studyo" shouldReduce={shouldReduce} delay={0.08}>
              <FooterLink href="/studyo">{t("nav.about")}</FooterLink>
              <FooterLink href="/#felsefe">{t("nav.philosophy")}</FooterLink>
              <FooterLink href="/surec">{t("nav.process")}</FooterLink>
            </NavItem>

            <NavItem label={navServLabel} href="/#hizmetler" shouldReduce={shouldReduce} delay={0.16}>
              <FooterLink href="/#hizmetler">{t("nav.websiteDesign")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.brandExperience")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.consulting")}</FooterLink>
            </NavItem>

            <NavItem label={navContactLabel} href={waUrl(locale)} shouldReduce={shouldReduce} delay={0.24}>
              <FooterLink href={waUrl(locale)} external>{t("nav.whatsapp")}</FooterLink>
              <FooterLink href="tel:+905349626627" external>{t("nav.phone")}</FooterLink>
              <div style={{
                paddingTop: 5, paddingBottom: 5,
                fontFamily: "var(--font-body)", fontSize: 12.5,
                color: "rgba(255,251,243,0.30)",
              }}>
                {t("nav.location")}
              </div>
            </NavItem>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* BOTTOM BAR — copyright · locale · socials                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          className="container-site"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          style={{
            paddingTop: 22, paddingBottom: 32, marginTop: 28,
            borderTop: "1px solid rgba(255,251,243,0.042)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11,
              color: "rgba(255,251,243,0.26)",
            }}>
              {copyright}
            </span>
            <span aria-hidden style={{ width: 1, height: 9, backgroundColor: "rgba(255,251,243,0.10)", display: "block" }} />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 9,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,108,12,0.22)",
            }}>BUILD {year}</span>
          </div>

          {/* Right: locale + socials */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* Language toggle */}
            <Link
              href={pathname}
              locale={alternateLocale}
              aria-label={isTR ? "Switch to English" : "Türkçeye geç"}
              onMouseEnter={() => setLangHover(true)}
              onMouseLeave={() => setLangHover(false)}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 10,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: langHover ? "rgba(255,251,243,0.82)" : "rgba(255,251,243,0.32)",
                textDecoration: "none", transition: "color 180ms ease",
                position: "relative", paddingBottom: 3,
              }}
            >
              {alternateLabel}
              <span aria-hidden style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                backgroundColor: "#ff6c0c",
                transform: langHover ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left", transition: "transform 200ms ease",
              }} />
            </Link>

            {/* Separator */}
            <div style={{ width: 1, height: 10, backgroundColor: "rgba(255,251,243,0.10)" }} />

            {/* Social links */}
            {[
              { label: "WhatsApp",  href: waUrl(locale),   external: true },
              { label: "Instagram", href: SOCIAL_INSTAGRAM, external: true },
              { label: "Behance",   href: SOCIAL_BEHANCE,  external: true },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-body)", fontSize: 10,
                  letterSpacing: "0.10em", textTransform: "uppercase",
                  color: "rgba(255,251,243,0.26)", textDecoration: "none",
                  transition: "color 180ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,251,243,0.72)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,251,243,0.26)")}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── CSS Keyframes ── */}
        <style>{`
          @keyframes ftPDrift {
            0%,100% { transform: translate(0,0);       opacity: 0.32; }
            33%      { transform: translate(8px,-12px); opacity: 0.55; }
            66%      { transform: translate(-5px,7px);  opacity: 0.18; }
          }
          @keyframes ftMMBreathe {
            0%,100% { opacity: 0.012; }
            50%      { opacity: 0.020; }
          }
          @keyframes ftPing {
            0%,100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.20); }
            50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0.00); }
          }
          @keyframes ftOrbitTravel {
            0%   { left: 1%; }
            100% { left: calc(100% - 14px); }
          }

          .ft-mm-breathe { animation: ftMMBreathe 8s ease-in-out infinite; }
          .ft-orbit-node { animation: ftOrbitTravel 22s cubic-bezier(0.455,0.03,0.515,0.955) infinite alternate; }
          .ft-orbit-glow { animation: ftOrbitTravel 22s cubic-bezier(0.455,0.03,0.515,0.955) infinite alternate; }

          @media (max-width: 960px) {
            .ft-hero-grid { grid-template-columns: 1fr !important; }
            .ft-nav-grid  { grid-template-columns: 1fr 1fr !important; gap: 36px 24px !important; }
          }
          @media (max-width: 480px) {
            .ft-nav-grid { grid-template-columns: 1fr !important; gap: 28px 0 !important; }
          }
        `}</style>
      </footer>
    </>
  );
}

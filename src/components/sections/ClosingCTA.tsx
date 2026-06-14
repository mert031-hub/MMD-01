"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { waUrl } from "@/lib/whatsapp";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const DOTS = [
  { top: "12%", left: "5%",  size: 2,   delay: 0,   dur: 9  },
  { top: "68%", left: "12%", size: 1.5, delay: 2.1, dur: 12 },
  { top: "38%", left: "24%", size: 1,   delay: 0.7, dur: 10 },
  { top: "82%", left: "38%", size: 2,   delay: 2.8, dur: 8  },
  { top: "20%", left: "90%", size: 1.5, delay: 1.4, dur: 11 },
  { top: "55%", left: "96%", size: 1,   delay: 0.3, dur: 9  },
];

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

const CLOCK_ICON = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.5 4.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const PIN_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7 1A4.5 4.5 0 002.5 5.5C2.5 9 7 13 7 13S11.5 9 11.5 5.5A4.5 4.5 0 007 1z" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="7" cy="5.5" r="1.4" fill="currentColor" />
  </svg>
);

const STAT_ICONS = [
  /* Projects Completed — briefcase */
  <svg key="proj" width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="6" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M7 6V5a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M2 10h16" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round"/>
  </svg>,
  /* Industries Served — people */
  <svg key="ind" width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3.5 17.5c0-3.6 2.9-5.5 6.5-5.5s6.5 1.9 6.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>,
  /* Mobile Compatible — phone */
  <svg key="mob" width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="5.5" y="1.5" width="9" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="10" cy="16" r="1" fill="currentColor"/>
    <path d="M8 4.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45"/>
  </svg>,
];

function renderWithAccent(text: string, accentWord: string) {
  const idx = text.toLowerCase().indexOf(accentWord.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em style={{ fontStyle: "italic", color: "#ff6c0c", fontFamily: "var(--font-display)" }}>
        {text.slice(idx, idx + accentWord.length)}
      </em>
      {text.slice(idx + accentWord.length)}
    </>
  );
}

export default function ClosingCTA() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const [waHover, setWaHover] = useState(false);
  const [waSweep, setWaSweep] = useState(false);
  const [phoneHover, setPhoneHover] = useState(false);
  const [hoveredTrust, setHoveredTrust] = useState<number | null>(null);
  const [responseCount, setResponseCount] = useState(0);
  const countedRef = useRef(false);

  /* ── Mouse parallax springs ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 38, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 20 });

  const headlineX = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-5,  5]);
  const headlineY = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-3,  3]);
  const cardX     = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [ 9, -9]);
  const cardY     = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [ 5, -5]);
  const bgX       = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [-3,  3]);
  const bgY       = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [-2,  2]);
  const ringX     = useTransform(springX, [-1, 1], shouldReduce ? [0, 0] : [12, -12]);
  const ringY     = useTransform(springY, [-1, 1], shouldReduce ? [0, 0] : [ 8, -8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduce || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
      mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    },
    [shouldReduce, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  /* ── Response time counter ── */
  useEffect(() => {
    if (shouldReduce) { setResponseCount(24); return; }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countedRef.current) {
          countedRef.current = true;
          let n = 0;
          const id = setInterval(() => {
            n++;
            setResponseCount(n);
            if (n >= 24) clearInterval(id);
          }, 28);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduce]);

  function handleWaEnter() {
    setWaHover(true);
    setWaSweep(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setWaSweep(true)));
  }
  function handleWaLeave() { setWaHover(false); setWaSweep(false); }

  const headlineLines = [t("heading1"), t("heading2"), t("heading3")];
  const trustItems    = [t("trust1"),  t("trust2"),  t("trust3"),  t("trust4")];
  const accentWord    = locale === "tr" ? "mesaj" : "message";
  const responseUnit  = locale === "tr" ? "saat" : "hrs";
  const vpOnce        = { once: true as const, margin: "-80px" as const };

  const stats = [
    { value: "20+",  label: t("stat1label"), icon: STAT_ICONS[0] },
    { value: "5+",   label: t("stat2label"), icon: STAT_ICONS[1] },
    { value: "100%", label: t("stat3label"), icon: STAT_ICONS[2] },
  ];

  return (
    <section
      ref={sectionRef}
      id="iletisim"
      aria-label="İletişime geç"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: "var(--color-authority)", position: "relative", overflow: "hidden" }}
    >
      {/* ── Background ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          style={{
            x: bgX, y: bgY,
            position: "absolute", inset: "-12px",
            backgroundImage:
              "linear-gradient(rgba(255,251,243,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,251,243,0.018) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div style={{ position: "absolute", top: "-15%", left: "-8%", width: "55%", height: "75%", background: "radial-gradient(ellipse at top left, rgba(255,251,243,0.035) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "70%", background: "radial-gradient(ellipse at bottom right, rgba(255,108,12,0.055) 0%, transparent 65%)" }} />

        <div style={{ position: "absolute", top: "50%", left: "39%", transform: "translate(-50%, -50%)", width: 320, height: 320, pointerEvents: "none" }}>
          <motion.div
            style={{ x: ringX, y: ringY, width: "100%", height: "100%", position: "relative" }}
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={shouldReduce ? {} : { duration: 44, ease: "linear", repeat: Infinity }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,251,243,0.04)" }} />
            <div style={{ position: "absolute", inset: 24, borderRadius: "50%", border: "1px solid rgba(255,108,12,0.04)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(255,108,12,0.30)", transform: "translate(-50%, -50%)" }} />
          </motion.div>
        </div>

        {!shouldReduce && DOTS.map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, left: d.left, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: "rgba(255,251,243,0.20)", animation: `ctaDotDrift ${d.dur}s ease-in-out ${d.delay}s infinite`, willChange: "transform, opacity" }} />
        ))}

        <motion.div
          animate={shouldReduce ? {} : { opacity: [0.028, 0.048, 0.028] }}
          transition={shouldReduce ? {} : { duration: 7, ease: "easeInOut", repeat: Infinity }}
          style={{ position: "absolute", right: "-3%", bottom: "-20%", fontFamily: "var(--font-display)", fontSize: "clamp(220px, 30vw, 480px)", fontWeight: 700, color: "rgba(255,251,243,1)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em" }}
        >
          MM
        </motion.div>

        <div style={{ position: "absolute", top: 0, left: "38%", width: 1, height: "100%", background: "linear-gradient(to bottom, transparent 0%, rgba(255,251,243,0.04) 30%, rgba(255,251,243,0.04) 70%, transparent 100%)" }} />
      </div>

      {/* ── Content ── */}
      <div className="container-site section-padding" style={{ position: "relative", zIndex: 1 }}>

        {/* Main grid */}
        <div className="cta-grid">

          {/* ─── LEFT ─── */}
          <motion.div style={{ x: headlineX, y: headlineY }}>

            {/* Section label */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "#ff6c0c", letterSpacing: "0.08em" }}>01</span>
              <div style={{ width: 28, height: 1, backgroundColor: "rgba(255,251,243,0.20)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, color: "rgba(255,251,243,0.32)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {locale === "tr" ? "GİRİŞ" : "INTRODUCTION"}
              </span>
            </motion.div>

            {/* Headline */}
            <h2 aria-label={headlineLines.join(" ")} style={{ margin: "0 0 24px 0" }}>
              {headlineLines.map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={vpOnce}
                    transition={{ duration: 0.80, delay: 0.06 + i * 0.14, ease: EASE_OUT }}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(30px, 3.8vw, 62px)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                      color: "rgba(255,251,243,0.97)",
                    }}
                  >
                    {renderWithAccent(line, accentWord)}
                  </motion.span>
                </div>
              ))}
            </h2>

            {/* Supporting */}
            <motion.p
              initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 0.50, ease: EASE_OUT }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: 1.75, color: "rgba(255,251,243,0.50)", maxWidth: 420, margin: "0 0 36px 0" }}
            >
              {t("supporting")}
            </motion.p>

            {/* Trust items — 2×2 horizontal grid */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 0.58, ease: EASE_OUT }}
              className="cta-trust-grid"
              style={{ marginBottom: 32 }}
            >
              {trustItems.map((item, i) => {
                const isHov = hoveredTrust === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredTrust(i)}
                    onMouseLeave={() => setHoveredTrust(null)}
                    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "default" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: `1.5px solid ${isHov ? "rgba(255,108,12,0.85)" : "rgba(255,108,12,0.48)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--color-action)", fontSize: 10, fontWeight: 700,
                        boxShadow: isHov && !shouldReduce ? "0 0 10px rgba(255,108,12,0.42)" : "none",
                        transition: "border-color 200ms ease, box-shadow 220ms ease",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                        color: isHov ? "rgba(255,251,243,0.92)" : "rgba(255,251,243,0.68)",
                        transform: isHov && !shouldReduce ? "translateX(3px)" : "translateX(0)",
                        transition: "color 200ms ease, transform 200ms ease",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Currently accepting */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vpOnce}
              transition={{ duration: 0.42, delay: 0.72, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span aria-hidden="true" style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#25D366" }} />
                <span className="presence-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#25D366" }} />
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "rgba(255,251,243,0.75)", letterSpacing: "0.01em" }}>
                {t("availabilityStatus")}
              </span>
            </motion.div>

          </motion.div>

          {/* ─── RIGHT: Contact card ─── */}
          <div>
            <motion.div style={{ x: cardX, y: cardY }}>
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 44, rotate: 1.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={vpOnce}
                transition={{ duration: 0.9, delay: 0.22, ease: EASE_OUT }}
              >
                <motion.div
                  animate={shouldReduce ? {} : { y: [0, -6, 0] }}
                  transition={shouldReduce ? {} : { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                >
                  <div className="cta-card">

                    {/* Card header label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                      <div style={{ width: 20, height: 1.5, backgroundColor: "var(--color-action)", opacity: 0.7 }} />
                      <p className="text-label" style={{ color: "rgba(255,251,243,0.55)", margin: 0, letterSpacing: "0.12em" }}>
                        {t("freeConsult")}
                      </p>
                    </div>

                    {/* WhatsApp CTA */}
                    <MagneticButton strength={0.18}>
                      <a
                        href={waUrl(locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp üzerinden iletişime geç"
                        className="cta-wa-btn"
                        onMouseEnter={handleWaEnter}
                        onMouseLeave={handleWaLeave}
                        style={{
                          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13,
                          letterSpacing: "0.06em", textTransform: "uppercase", color: "#fffbf3",
                          backgroundColor: "var(--color-action)", padding: "18px 32px",
                          textDecoration: "none", display: "flex", alignItems: "center",
                          justifyContent: "center", gap: 12, width: "100%",
                          position: "relative", overflow: "hidden",
                          transition: "box-shadow 200ms ease, transform 180ms ease",
                          boxShadow: waHover && !shouldReduce
                            ? "0 18px 52px rgba(255,108,12,0.52), 0 6px 18px rgba(255,108,12,0.30)"
                            : "0 6px 22px rgba(255,108,12,0.24)",
                          transform: waHover && !shouldReduce ? "translateY(-4px)" : "none",
                          willChange: "transform",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
                            transform: waSweep ? "translateX(110%)" : "translateX(-110%)",
                            transition: waSweep ? "transform 580ms ease" : "none",
                            pointerEvents: "none",
                          }}
                        />
                        <motion.span
                          animate={waHover && !shouldReduce ? { x: -2, scale: 1.1 } : { x: 0, scale: 1 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                        >
                          {WA_ICON}
                        </motion.span>
                        {t("whatsapp")}
                      </a>
                    </MagneticButton>

                    {/* Divider */}
                    <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,251,243,0.07)", margin: "20px 0" }} />

                    {/* Phone */}
                    <a
                      href="tel:+905349626627"
                      aria-label={`${locale === "tr" ? "Ara" : "Call"}: 0534 962 66 27`}
                      onMouseEnter={() => setPhoneHover(true)}
                      onMouseLeave={() => setPhoneHover(false)}
                      style={{
                        fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15,
                        letterSpacing: "-0.01em",
                        color: phoneHover && !shouldReduce ? "rgba(255,251,243,0.92)" : "rgba(255,251,243,0.55)",
                        textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10,
                        transition: "color 200ms ease, transform 200ms ease",
                        transform: phoneHover && !shouldReduce ? "translateX(4px)" : "translateX(0)",
                        position: "relative", paddingBottom: 2,
                      }}
                    >
                      <motion.span
                        style={{ color: "rgba(255,251,243,0.42)" }}
                        animate={phoneHover && !shouldReduce ? { rotate: [0, -9, 7, -5, 3, 0] } : { rotate: 0 }}
                        transition={{ duration: 0.42 }}
                      >
                        {PHONE_ICON}
                      </motion.span>
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
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                          backgroundColor: "rgba(255,251,243,0.38)",
                          transform: phoneHover && !shouldReduce ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "left", transition: "transform 240ms ease",
                        }}
                      />
                    </a>

                    {/* Divider */}
                    <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,251,243,0.07)", margin: "20px 0" }} />

                    {/* Response time — clock icon + counter */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "rgba(255,251,243,0.40)", flexShrink: 0 }}>
                        {CLOCK_ICON}
                      </span>
                      <div>
                        <div style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(18px, 1.8vw, 24px)",
                          fontWeight: 700, letterSpacing: "-0.025em",
                          color: "rgba(255,251,243,0.90)", lineHeight: 1,
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {"< "}{responseCount} {responseUnit}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 500,
                          color: "rgba(255,251,243,0.36)", textTransform: "uppercase",
                          letterSpacing: "0.07em", marginTop: 4,
                        }}>
                          {t("responseLabel")}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,251,243,0.07)", margin: "20px 0" }} />

                    {/* Location */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "rgba(255,251,243,0.40)", flexShrink: 0 }}>
                        {PIN_ICON}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                        color: "rgba(255,251,243,0.55)", letterSpacing: "0.01em",
                      }}>
                        {t("locationLabel")}
                      </span>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Studio signature */}
            <motion.p
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vpOnce}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,251,243,0.10)", marginTop: 24, textAlign: "right",
              }}
            >
              MMDESIGN — İstanbul
            </motion.p>
          </div>

        </div>

        {/* ─── Stats bottom bar ─── */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vpOnce}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
          style={{ marginTop: 64 }}
        >
          {/* Orange divider line + MM circle */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", marginBottom: 36 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,108,12,0.45)" }} />
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              backgroundColor: "rgba(6,7,113,0.70)",
              border: "1px solid rgba(255,251,243,0.14)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginLeft: -1, marginRight: -1,
              boxShadow: "0 0 0 6px rgba(6,7,113,0.5)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700,
                color: "rgba(255,251,243,0.80)", letterSpacing: "0.04em",
              }}>
                MM
              </span>
            </div>
            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,108,12,0.45)" }} />
          </div>

          {/* Stats row */}
          <div className="cta-stats-row">
            {stats.map(({ value, label, icon }, i) => (
              <div key={label} className="cta-stats-row-inner">
                {/* Orange separator dot */}
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 6, height: 6, borderRadius: "50%",
                      backgroundColor: "#ff6c0c", opacity: 0.7,
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Stat */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Icon circle */}
                  <div style={{
                    width: 54, height: 54, borderRadius: "50%",
                    backgroundColor: "rgba(255,251,243,0.07)",
                    border: "1px solid rgba(255,251,243,0.11)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    color: "rgba(255,251,243,0.65)",
                  }}>
                    {icon}
                  </div>

                  {/* Value + label */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(24px, 2.4vw, 34px)",
                      fontWeight: 700, letterSpacing: "-0.03em",
                      color: "rgba(255,251,243,0.92)", lineHeight: 1, marginBottom: 5,
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 500,
                      color: "rgba(255,251,243,0.36)", letterSpacing: "0.07em",
                      textTransform: "uppercase",
                    }}>
                      {label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        .cta-card {
          background: linear-gradient(145deg, rgba(255,251,243,0.065) 0%, rgba(255,251,243,0.028) 100%);
          border: 1px solid rgba(255,251,243,0.10);
          border-top-color: rgba(255,251,243,0.16);
          box-shadow: 0 28px 72px rgba(3,4,74,0.50), inset 0 1px 0 rgba(255,251,243,0.08);
          padding: 32px;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        .cta-wa-btn { display: flex !important; }
        @keyframes presencePingKf {
          0%        { transform: scale(1); opacity: 0.75; }
          80%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .presence-ping { animation: presencePingKf 2s ease-out infinite; }
        @keyframes ctaDotDrift {
          0%, 100% { transform: translate(0, 0); opacity: 0.22; }
          33%       { transform: translate(6px, -9px); opacity: 0.42; }
          66%       { transform: translate(-4px, 6px); opacity: 0.14; }
        }
        .cta-grid {
          display: grid;
          grid-template-columns: 52fr 48fr;
          gap: 80px;
          align-items: start;
        }
        .cta-trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 32px;
        }
        .cta-stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }
        .cta-stats-row-inner {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        @media (max-width: 960px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cta-card { padding: 24px !important; }
          .cta-trust-grid { grid-template-columns: 1fr !important; }
          .cta-stats-row { flex-direction: column; gap: 28px; }
          .cta-stats-row-inner { flex-direction: column; gap: 28px; }
          .cta-stats-row-inner > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
}

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
  { top: "10%", left: "6%", size: 2.5, delay: 0, dur: 8 },
  { top: "32%", left: "18%", size: 2, delay: 1.6, dur: 10 },
  { top: "60%", left: "12%", size: 3.5, delay: 0.9, dur: 7.5 },
  { top: "78%", left: "4%", size: 2, delay: 2.4, dur: 11 },
  { top: "15%", left: "78%", size: 3, delay: 0.6, dur: 9 },
  { top: "48%", left: "90%", size: 2, delay: 1.9, dur: 8 },
  { top: "72%", left: "82%", size: 3.5, delay: 0.4, dur: 9.5 },
  { top: "88%", left: "55%", size: 2, delay: 1.3, dur: 8.5 },
];

type FooterLinkProps = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
};

function FooterLink({ href, external, children }: FooterLinkProps) {
  const [hovered, setHovered] = useState(false);

  const sharedStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: 13,
    color: hovered ? "rgba(255,251,243,0.9)" : "rgba(255,251,243,0.65)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    lineHeight: 1,
    transition: "color 200ms ease, transform 200ms ease",
    paddingTop: 6,
    paddingBottom: 6,
    transform: hovered ? "translateX(4px)" : "translateX(0)",
  };

  const arrow = (
    <span
      aria-hidden="true"
      style={{
        fontSize: 9,
        color: "var(--color-action)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 180ms ease",
        lineHeight: 1,
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
        style={sharedStyle}
        className="footer-link"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      href={href}
      style={sharedStyle}
      className="footer-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </Link>
  );
}

function BackToTop({ shouldReduce }: { shouldReduce: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(scrolled / total, 1) : 0);
      setVisible(scrolled > 500);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const circumference = 2 * Math.PI * 18;

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
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <circle
          cx="24" cy="24" r="18"
          fill="none"
          stroke="rgba(255,251,243,0.08)"
          strokeWidth="2"
        />
        <circle
          cx="24" cy="24" r="18"
          fill="none"
          stroke="#ff6c0c"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1 }}
      >
        <path
          d="M5.5 9.5V1.5M1.5 5.5l4-4 4 4"
          stroke="rgba(255,251,243,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const shouldReduce = useReducedMotion() ?? false;
  const alternateLocale = locale === "tr" ? "en" : "tr";
  const alternateLabel = locale === "tr" ? "EN" : "TR";

  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [waHover, setWaHover] = useState(false);
  const [waSweep, setWaSweep] = useState(false);
  const [langHover, setLangHover] = useState(false);

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

  function handleWaEnter() {
    setWaHover(true);
    setWaSweep(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setWaSweep(true)));
  }
  function handleWaLeave() {
    setWaHover(false);
    setWaSweep(false);
  }

  const mmX = shouldReduce ? 0 : mousePos.x * -22;
  const mmY = shouldReduce ? 0 : mousePos.y * -14;

  return (
    <>
      <BackToTop shouldReduce={shouldReduce} />

      <footer
        ref={footerRef}
        aria-label={locale === "tr" ? "Site alt bilgisi" : "Site footer"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: "var(--color-authority-deep)",
          color: "rgba(255,251,243,0.45)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scroll progress line */}
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

        {/* Radial glow — bottom left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-8%",
            left: "-6%",
            width: "42%",
            paddingBottom: "42%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,108,12,0.055) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Radial glow — top right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-5%",
            right: "-5%",
            width: "32%",
            paddingBottom: "32%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,7,113,0.45) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Micro engineering grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,251,243,0.016) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,251,243,0.016) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Particles */}
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
              backgroundColor: "rgba(255,108,12,0.32)",
              pointerEvents: "none",
              animation: shouldReduce
                ? "none"
                : `footerPDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* MM watermark — CSS breathing + JS parallax */}
        <div
          aria-hidden="true"
          className={shouldReduce ? undefined : "footer-mm-breathe"}
          style={{
            position: "absolute",
            right: "-2%",
            bottom: "-15%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(200px, 26vw, 420px)",
            fontWeight: 700,
            color: "rgba(255,251,243,1)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.04em",
            opacity: 0.032,
            transform: `translate(${mmX}px, ${mmY}px)`,
            transition: shouldReduce ? "none" : "transform 90ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          MM
        </div>

        {/* Studio header */}
        <div
          className="container-site"
          style={{ paddingTop: 72, paddingBottom: 0, position: "relative" }}
        >
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            style={{
              paddingBottom: 48,
              borderBottom: "1px solid rgba(255,251,243,0.07)",
            }}
          >
            {/* Wordmark row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
                marginBottom: 24,
              }}
            >
              <div>
                <Link
                  href="/"
                  aria-label={locale === "tr" ? "MMDESIGN ana sayfa" : "MMDESIGN home"}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "rgba(255,251,243,0.92)",
                    textDecoration: "none",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  MMDESIGN
                </Link>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "rgba(255,251,243,0.65)",
                    maxWidth: 300,
                    margin: 0,
                  }}
                >
                  {t("description")}
                </p>
              </div>

              {/* WhatsApp CTA */}
              <MagneticButton strength={0.22}>
                <a
                  href={waUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    locale === "tr"
                      ? "WhatsApp'tan iletişime geç"
                      : "Contact via WhatsApp"
                  }
                  onMouseEnter={handleWaEnter}
                  onMouseLeave={handleWaLeave}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "#060771",
                    backgroundColor: waHover ? "#1dba59" : "#25D366",
                    padding: "12px 22px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition:
                      "background-color 220ms ease, transform 220ms ease, box-shadow 220ms ease",
                    transform: waHover ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: waHover
                      ? "0 16px 40px rgba(37,211,102,0.38)"
                      : "0 4px 16px rgba(37,211,102,0.12)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                  }}
                  className="footer-wa-btn"
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                      transform: waSweep ? "translateX(110%)" : "translateX(-110%)",
                      transition: waSweep ? "transform 560ms ease" : "none",
                      pointerEvents: "none",
                    }}
                  />
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("nav.whatsapp")}
                </a>
              </MagneticButton>
            </div>

            {/* Orange accent line */}
            <motion.div
              initial={shouldReduce ? {} : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT }}
              style={{
                width: 48,
                height: 2,
                backgroundColor: "var(--color-action)",
                opacity: 0.6,
                transformOrigin: "left",
              }}
            />
          </motion.div>
        </div>

        {/* Nav grid */}
        <div
          className="container-site"
          style={{ paddingTop: 48, paddingBottom: 0, position: "relative" }}
        >
          <div
            className="footer-nav-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px 48px",
            }}
          >
            {/* Work */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0, ease: EASE_OUT }}
            >
              <p
                className="text-label"
                style={{
                  color: "rgba(255,251,243,0.55)",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                {t("nav.workTitle")}
              </p>
              <FooterLink href="/projeler">{t("nav.selectedWork")}</FooterLink>
              <FooterLink href="/projeler">{t("nav.allWork")}</FooterLink>
              <FooterLink href="/projeler/pi-lot-engineering">Pi-Lot Engineering</FooterLink>
              <FooterLink href="/projeler/kaleici-hotel">Kaleiçi Hotel</FooterLink>
              <FooterLink href="/projeler/kocyigit-trade">Kocyiğit Trade</FooterLink>
            </motion.div>

            {/* Studio */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            >
              <p
                className="text-label"
                style={{
                  color: "rgba(255,251,243,0.55)",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                {t("nav.studioTitle")}
              </p>
              <FooterLink href="/studyo">{t("nav.about")}</FooterLink>
              <FooterLink href="/#felsefe">{t("nav.philosophy")}</FooterLink>
              <FooterLink href="/surec">{t("nav.process")}</FooterLink>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
            >
              <p
                className="text-label"
                style={{
                  color: "rgba(255,251,243,0.55)",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                {t("nav.servicesTitle")}
              </p>
              <FooterLink href="/#hizmetler">{t("nav.websiteDesign")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.brandExperience")}</FooterLink>
              <FooterLink href="/#hizmetler">{t("nav.consulting")}</FooterLink>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            >
              <p
                className="text-label"
                style={{
                  color: "rgba(255,251,243,0.55)",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                {t("nav.contactTitle")}
              </p>
              <FooterLink href={waUrl(locale)} external>
                {t("nav.whatsapp")}
              </FooterLink>
              <FooterLink href="tel:+905349626627" external>
                {t("nav.phone")}
              </FooterLink>
              <div
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,251,243,0.42)",
                }}
              >
                {t("nav.location")}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="container-site"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
          style={{
            paddingTop: 32,
            paddingBottom: 48,
            marginTop: 48,
            borderTop: "1px solid rgba(255,251,243,0.06)",
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
              fontSize: 12,
              color: "rgba(255,251,243,0.42)",
            }}
          >
            {copyright}
          </span>

          {/* Language switcher */}
          <Link
            href={pathname}
            locale={alternateLocale}
            aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
            className="footer-link"
            onMouseEnter={() => setLangHover(true)}
            onMouseLeave={() => setLangHover(false)}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: langHover ? "rgba(255,251,243,0.88)" : "rgba(255,251,243,0.52)",
              textDecoration: "none",
              transition: "color 200ms ease",
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
                transition: "transform 220ms ease",
              }}
            />
          </Link>

          <a
            href="tel:+905349626627"
            className="footer-link"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "-0.01em",
              color: "rgba(255,251,243,0.42)",
              textDecoration: "none",
              transition: "color 150ms ease",
            }}
          >
            0534 962 66 27
          </a>
        </motion.div>

        <style>{`
          .footer-link:hover { color: rgba(255,251,243,0.9) !important; }
          .footer-wa-btn:hover { background-color: #1dba59 !important; }
          @keyframes footerPDrift {
            0%, 100% { transform: translate(0, 0); opacity: 0.32; }
            33%       { transform: translate(7px, -11px); opacity: 0.58; }
            66%       { transform: translate(-5px, 7px); opacity: 0.22; }
          }
          @keyframes footerMMBreathe {
            0%, 100% { opacity: 0.028; }
            50%       { opacity: 0.048; }
          }
          .footer-mm-breathe {
            animation: footerMMBreathe 8s ease-in-out infinite;
          }
          @media (max-width: 767px) {
            .footer-nav-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .footer-nav-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </>
  );
}

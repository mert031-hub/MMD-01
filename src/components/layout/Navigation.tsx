"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "work" as const, href: "/projeler" },
  { key: "studio" as const, href: "/studyo" },
  { key: "services" as const, href: "/hizmetler" },
  { key: "process" as const, href: "/surec" },
] as const;

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const EASE_IN = [0.4, 0.0, 1, 1] as const;
const EASE_IN_OUT = [0.4, 0.0, 0.2, 1] as const;

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3, ease: EASE_IN_OUT } },
};

const overlayExitVariants = {
  opacity: 0,
  transition: { duration: 0.25, ease: EASE_IN },
};

const linkVariants = {
  closed: { opacity: 0, y: 24 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),
};

const bottomVariants = {
  closed: { opacity: 0, y: 16 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.42, duration: 0.45, ease: EASE_OUT },
  },
};

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 80);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]"
      );
      firstFocusable?.focus();
    }
  }, [menuOpen]);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      "a, button, [tabindex]:not([tabindex='-1'])"
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    return pathname.startsWith(href);
  };

  const alternateLocale = locale === "tr" ? "en" : "tr";
  const localeLabel = locale === "tr" ? "EN" : "TR";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          backgroundColor: scrolled
            ? "rgba(255,251,243,0.82)"
            : "transparent",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(6,7,113,0.07)"
            : "1px solid transparent",
          transition:
            "background-color 350ms cubic-bezier(0.4,0,0.2,1), border-color 350ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <nav
          className="container-site"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-label={locale === "tr" ? "Ana navigasyon" : "Main navigation"}
        >
          {/* ─── LOGO ─────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label={
              locale === "tr" ? "MMDESIGN ana sayfa" : "MMDESIGN home"
            }
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.01em",
              color: "var(--color-authority)",
              textDecoration: "none",
              transition: "opacity 150ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            MMDESIGN
          </Link>

          {/* ─── DESKTOP NAV LINKS ────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`nav-link${isActive(href) ? " nav-active" : ""}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isActive(href)
                    ? "var(--color-action)"
                    : "var(--color-text-primary)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  !isActive(href) &&
                  (e.currentTarget.style.color = "var(--color-action)")
                }
                onMouseLeave={(e) =>
                  !isActive(href) &&
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* ─── RIGHT CLUSTER ────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Language Toggle */}
            <Link
              href={pathname}
              locale={alternateLocale}
              aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
              className="hidden-mobile"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-tertiary)",
                textDecoration: "none",
                transition: "color 150ms ease",
                userSelect: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-authority)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-tertiary)")
              }
            >
              {localeLabel}
            </Link>

            {/* CTA Button — sweep effect */}
            <Link
              href="/#iletisim"
              className="hidden-mobile btn-sweep"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fffbf3",
                backgroundColor: "var(--color-action)",
                padding: "10px 22px",
                borderRadius: 0,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
                transition: "transform 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t("cta")}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              ref={hamburgerRef}
              aria-label={menuOpen ? t("mobileMenuClose") : t("mobileMenuOpen")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="show-mobile"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                width: 40,
                height: 40,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  backgroundColor: "var(--color-authority)",
                  transformOrigin: "center",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms",
                  transform: menuOpen
                    ? "translateY(3.25px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  backgroundColor: "var(--color-authority)",
                  transition: "opacity 200ms",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  backgroundColor: "var(--color-authority)",
                  transformOrigin: "center",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms",
                  transform: menuOpen
                    ? "translateY(-3.25px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── MOBILE MENU OVERLAY ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={
              locale === "tr" ? "Navigasyon menüsü" : "Navigation menu"
            }
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit={overlayExitVariants}
            onKeyDown={handleMenuKeyDown}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "var(--color-authority)",
              display: "flex",
              flexDirection: "column",
              padding: "80px 20px 48px",
              overflowY: "auto",
            }}
          >
            <nav
              aria-label={
                locale === "tr" ? "Mobil navigasyon" : "Mobile navigation"
              }
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}
            >
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(36px, 9vw, 64px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: isActive(href)
                        ? "var(--color-action)"
                        : "var(--color-text-inverse)",
                      textDecoration: "none",
                      display: "block",
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--color-dark-border)",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) =>
                      !isActive(href) &&
                      (e.currentTarget.style.color = "var(--color-action)")
                    }
                    onMouseLeave={(e) =>
                      !isActive(href) &&
                      (e.currentTarget.style.color = "var(--color-text-inverse)")
                    }
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              variants={bottomVariants}
              initial="closed"
              animate="open"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 40,
              }}
            >
              <Link
                href="/#iletisim"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#fffbf3",
                  backgroundColor: "var(--color-action)",
                  padding: "16px 32px",
                  borderRadius: 0,
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--color-action-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--color-action)")
                }
              >
                {t("cta")}
              </Link>

              <Link
                href={pathname}
                locale={alternateLocale}
                onClick={() => setMenuOpen(false)}
                aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,251,243,0.5)",
                  textDecoration: "none",
                  textAlign: "center",
                  padding: "8px 0",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-inverse)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,251,243,0.5)")
                }
              >
                {localeLabel === "EN" ? "Switch to English" : "Türkçeye Geç"}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }

        /* Premium underline — slides left-to-right on hover, stays for active */
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--color-action);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 280ms cubic-bezier(0,0,0.2,1);
        }
        .nav-link:hover::after,
        .nav-link.nav-active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link.nav-active {
          color: var(--color-action) !important;
        }
      `}</style>
    </>
  );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { waUrl } from "@/lib/whatsapp";

type FooterLinkProps = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
};

function FooterLink({ href, external, children }: FooterLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 13,
          color: "rgba(255,251,243,0.65)",
          textDecoration: "none",
          display: "block",
          lineHeight: 1,
          transition: "color 150ms ease",
          paddingTop: 5,
          paddingBottom: 5,
        }}
        className="footer-link"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: 13,
        color: "rgba(255,251,243,0.65)",
        textDecoration: "none",
        display: "block",
        lineHeight: 1,
        transition: "color 150ms ease",
        paddingTop: 5,
        paddingBottom: 5,
      }}
      className="footer-link"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const alternateLocale = locale === "tr" ? "en" : "tr";
  const alternateLabel = locale === "tr" ? "EN" : "TR";

  const year = new Date().getFullYear();
  const copyright = t("copyright").replace("2025", String(year));

  return (
    <footer
      aria-label={locale === "tr" ? "Site alt bilgisi" : "Site footer"}
      style={{
        backgroundColor: "var(--color-authority-deep)",
        color: "rgba(255,251,243,0.45)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant MM watermark */}
      <div
        aria-hidden="true"
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
          opacity: 0.03,
        }}
      >
        MM
      </div>

      {/* Studio header */}
      <div
        className="container-site"
        style={{
          paddingTop: 72,
          paddingBottom: 0,
          position: "relative",
        }}
      >
        <div
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
            <a
              href={waUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={locale === "tr" ? "WhatsApp'tan iletişime geç" : "Contact via WhatsApp"}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.04em",
                color: "#060771",
                backgroundColor: "#25D366",
                padding: "12px 22px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background-color 150ms ease, transform 150ms ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              className="footer-wa-btn"
            >
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
          </div>

          {/* Orange accent line */}
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "var(--color-action)",
              opacity: 0.6,
            }}
          />
        </div>
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
          <div>
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
          </div>

          {/* Studio */}
          <div>
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
          </div>

          {/* Services */}
          <div>
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
          </div>

          {/* Contact */}
          <div>
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
            <FooterLink href={waUrl(locale)} external>{t("nav.whatsapp")}</FooterLink>
            <FooterLink href="tel:+905349626627" external>{t("nav.phone")}</FooterLink>
            <div
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,251,243,0.55)",
              }}
            >
              {t("nav.location")}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-site"
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
            color: "rgba(255,251,243,0.55)",
          }}
        >
          {copyright}
        </span>

        <Link
          href={pathname}
          locale={alternateLocale}
          aria-label={
            locale === "tr" ? "Switch to English" : "Türkçeye geç"
          }
          className="footer-link"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,251,243,0.55)",
            textDecoration: "none",
          }}
        >
          {alternateLabel}
        </Link>

        <a
          href="tel:+905349626627"
          className="footer-link"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            letterSpacing: "-0.01em",
            color: "rgba(255,251,243,0.55)",
            textDecoration: "none",
          }}
        >
          0534 962 66 27
        </a>
      </div>

      {/* Hover + mobile styles */}
      <style>{`
        .footer-link:hover { color: rgba(255,251,243,0.8) !important; }
        .footer-wa-btn:hover { background-color: #1dba59 !important; transform: translateY(-1px); }
        @media (max-width: 767px) {
          .footer-nav-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-nav-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

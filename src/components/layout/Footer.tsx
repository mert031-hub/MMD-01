import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: 13,
        color: "rgba(255,251,243,0.45)",
        textDecoration: "none",
        display: "block",
        lineHeight: 1,
        transition: "color 150ms ease",
        paddingTop: 5,
        paddingBottom: 5,
      }}
      /* inline hover via CSS — server component can't use onMouseEnter */
      className="footer-link"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
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
      }}
    >
      {/* Top row: wordmark + tagline */}
      <div
        className="container-site"
        style={{
          paddingTop: 64,
          paddingBottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,251,243,0.07)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Link
            href="/"
            aria-label={locale === "tr" ? "MMDESIGN ana sayfa" : "MMDESIGN home"}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.01em",
              color: "rgba(255,251,243,0.9)",
              textDecoration: "none",
            }}
          >
            MMDESIGN
          </Link>
          <span
            className="text-label"
            style={{
              color: "rgba(255,251,243,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {t("tagline")}
          </span>
        </div>
      </div>

      {/* Nav grid */}
      <div
        className="container-site"
        style={{ paddingTop: 48, paddingBottom: 0 }}
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
                color: "rgba(255,251,243,0.6)",
                marginBottom: 16,
                letterSpacing: "0.1em",
              }}
            >
              {t("nav.workTitle")}
            </p>
            <FooterLink href="/projeler">{t("nav.selectedWork")}</FooterLink>
            <FooterLink href="/projeler">{t("nav.allWork")}</FooterLink>
          </div>

          {/* Studio */}
          <div>
            <p
              className="text-label"
              style={{
                color: "rgba(255,251,243,0.6)",
                marginBottom: 16,
                letterSpacing: "0.1em",
              }}
            >
              {t("nav.studioTitle")}
            </p>
            <FooterLink href="/studyo">{t("nav.about")}</FooterLink>
            <FooterLink href="/#felsefe">{t("nav.philosophy")}</FooterLink>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-label"
              style={{
                color: "rgba(255,251,243,0.6)",
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
                color: "rgba(255,251,243,0.6)",
                marginBottom: 16,
                letterSpacing: "0.1em",
              }}
            >
              {t("nav.contactTitle")}
            </p>
            <FooterLink href="https://wa.me/905349626627">
              {t("nav.whatsapp")}
            </FooterLink>
            <FooterLink href="tel:+905349626627">{t("nav.phone")}</FooterLink>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-site"
        style={{
          paddingTop: 32,
          paddingBottom: 40,
          marginTop: 48,
          borderTop: "1px solid rgba(255,251,243,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(255,251,243,0.3)",
          }}
        >
          {copyright}
        </span>

        <Link
          href="/"
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
            color: "rgba(255,251,243,0.3)",
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
            color: "rgba(255,251,243,0.3)",
            textDecoration: "none",
          }}
        >
          0534 962 66 27
        </a>
      </div>

      {/* Hover styles */}
      <style>{`
        .footer-link:hover { color: rgba(255,251,243,0.8) !important; }
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

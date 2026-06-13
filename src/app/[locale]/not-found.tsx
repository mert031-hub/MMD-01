import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  let locale = "tr";
  try {
    locale = await getLocale();
  } catch {
    // fallback when locale context unavailable
  }

  const isTr = locale !== "en";

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--color-authority-deep)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      {/* Watermark "404" */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 30vw, 440px)",
          fontWeight: 700,
          color: "rgba(255,251,243,1)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.06em",
          opacity: 0.025,
          whiteSpace: "nowrap",
        }}
      >
        404
      </div>

      {/* Orange accent line */}
      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 2,
          backgroundColor: "var(--color-action)",
          marginBottom: 40,
          opacity: 0.8,
          position: "relative",
        }}
      />

      {/* Label */}
      <p
        className="text-label"
        style={{
          color: "var(--color-action)",
          marginBottom: 20,
          position: "relative",
        }}
      >
        {isTr ? "Sayfa bulunamadı" : "Page not found"}
      </p>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 3.5vw, 56px)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "rgba(255,251,243,0.92)",
          marginBottom: 20,
          maxWidth: 600,
          position: "relative",
        }}
      >
        {isTr
          ? "Bu sayfa artık burada değil."
          : "This page no longer exists."}
      </h1>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 1.3vw, 17px)",
          lineHeight: 1.7,
          color: "rgba(255,251,243,0.48)",
          marginBottom: 52,
          maxWidth: 440,
          position: "relative",
        }}
      >
        {isTr
          ? "Aradığınız içerik taşınmış ya da kaldırılmış olabilir. Ana sayfaya veya projeler bölümüne dönebilirsiniz."
          : "The content you were looking for may have moved or been removed. You can return to the homepage or browse our work."}
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fffbf3",
            backgroundColor: "var(--color-action)",
            padding: "14px 28px",
            textDecoration: "none",
            display: "inline-block",
            transition: "background-color 150ms ease, transform 150ms ease",
          }}
          className="notfound-primary"
        >
          {isTr ? "Ana Sayfa" : "Home"}
        </Link>

        <Link
          href="/projeler"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,251,243,0.55)",
            textDecoration: "none",
            display: "inline-block",
            transition: "color 150ms ease",
            padding: "14px 4px",
          }}
          className="notfound-secondary"
        >
          {isTr ? "Projeler →" : "Work →"}
        </Link>
      </div>

      {/* Studio signature */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,251,243,0.12)",
          marginTop: 72,
          position: "relative",
        }}
      >
        MMDESIGN — İstanbul
      </p>

      <style>{`
        .notfound-primary:hover {
          background-color: var(--color-action-hover) !important;
          transform: translateY(-1px);
        }
        .notfound-secondary:hover {
          color: rgba(255,251,243,0.85) !important;
        }
      `}</style>
    </div>
  );
}

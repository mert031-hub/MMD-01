import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  let locale = "tr";
  try {
    locale = await getLocale();
  } catch {
    // fallback to "tr" if locale context isn't available
  }

  const isTr = locale !== "en";

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg-primary)",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <p
        className="text-label"
        style={{ color: "var(--color-action)", marginBottom: 24 }}
      >
        404
      </p>

      <h1
        className="text-display-xl"
        style={{
          color: "var(--color-authority)",
          fontFamily: "var(--font-display)",
          marginBottom: 24,
          maxWidth: 640,
        }}
      >
        {isTr ? "Sayfa bulunamadı." : "Page not found."}
      </h1>

      <p
        className="text-body-lg"
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: 48,
          maxWidth: 480,
        }}
      >
        {isTr
          ? "Aradığınız sayfa mevcut değil veya taşınmış olabilir."
          : "The page you're looking for doesn't exist or may have been moved."}
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#fffbf3",
          backgroundColor: "var(--color-action)",
          padding: "16px 32px",
          textDecoration: "none",
          display: "inline-block",
          transition: "background-color 150ms ease",
        }}
        className="notfound-cta"
      >
        {isTr ? "Ana Sayfaya Dön" : "Back to Home"}
      </Link>

      <style>{`
        .notfound-cta:hover {
          background-color: var(--color-action-hover) !important;
        }
      `}</style>
    </div>
  );
}

import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-plus-jakarta-sans)",
        background: "#fffbf3",
        color: "#111111",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            marginBottom: 24,
          }}
        >
          {t("label")}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(40px, 5vw, 80px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "#060771",
            letterSpacing: "-0.02em",
          }}
        >
          MMDESIGN
        </h1>
        <p style={{ marginTop: 24, color: "#444444", fontSize: 16 }}>
          {t("supporting")}
        </p>
      </div>
    </main>
  );
}

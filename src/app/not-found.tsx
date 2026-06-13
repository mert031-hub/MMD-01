import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#03044a",
          color: "#fffbf3",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            marginBottom: 20,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "rgba(255,251,243,0.92)",
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          Page not found.
        </h1>
        <Link
          href="/"
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fffbf3",
            backgroundColor: "#ff6c0c",
            padding: "14px 28px",
            textDecoration: "none",
            marginTop: 12,
            display: "inline-block",
          }}
        >
          Home
        </Link>
      </body>
    </html>
  );
}

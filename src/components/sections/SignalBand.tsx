"use client";

import { useRef, useEffect, useState } from "react";

const ITEMS = [
  "Pi-Lot Engineering",
  "Kaleiçi Hotel",
  "Seda İşisağ",
  "Kocyiğit Trade",
  "Mühendislik",
  "Konaklama",
  "Klinik & Sağlık",
  "Turizm",
  "Kişisel Marka",
  "Ticaret",
  "Restoran",
  "KOBİ",
];

const DOT = (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "var(--color-action)",
      flexShrink: 0,
      verticalAlign: "middle",
      marginBottom: 1,
    }}
  />
);

function MarqueeRow({ paused }: { paused: boolean }) {
  /* Duplicate items so the loop is seamless */
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        animation: `marquee-slide 36s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
        willChange: "transform",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {doubled.map((item, i) => (
        <span
          key={i}
          style={{ display: "inline-flex", alignItems: "center", gap: 28 }}
        >
          <span
            className="text-label"
            style={{
              color: "var(--color-text-secondary)",
              letterSpacing: "0.06em",
              fontSize: 11,
            }}
          >
            {item}
          </span>
          {DOT}
        </span>
      ))}
    </div>
  );
}

function StaticRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {ITEMS.map((item, i) => (
        <span
          key={i}
          style={{ display: "inline-flex", alignItems: "center", gap: 24 }}
        >
          <span
            className="text-label"
            style={{
              color: "var(--color-text-secondary)",
              letterSpacing: "0.06em",
              fontSize: 11,
            }}
          >
            {item}
          </span>
          {i < ITEMS.length - 1 && DOT}
        </span>
      ))}
    </div>
  );
}

export default function SignalBand() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Çalıştığımız sektörler"
      style={{
        backgroundColor: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        height: 72,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {reducedMotion ? (
        <div className="container-site" style={{ width: "100%" }}>
          <StaticRow />
        </div>
      ) : (
        <>
          {/* Fade edges */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background:
                "linear-gradient(to right, var(--color-bg-surface), transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background:
                "linear-gradient(to left, var(--color-bg-surface), transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            <MarqueeRow paused={paused} />
          </div>
        </>
      )}
    </div>
  );
}

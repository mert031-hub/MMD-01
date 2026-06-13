"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Item = { text: string; type: "statement" | "industry" };

const ITEMS_TR: Item[] = [
  { text: "Gerçek projeler.", type: "statement" },
  { text: "Gerçek işler.", type: "statement" },
  { text: "Şablon değil.", type: "statement" },
  { text: "Konaklama", type: "industry" },
  { text: "Mühendislik", type: "industry" },
  { text: "Ticaret", type: "industry" },
  { text: "Sağlık", type: "industry" },
  { text: "Turizm", type: "industry" },
  { text: "Kişisel Marka", type: "industry" },
  { text: "7 sektör.", type: "statement" },
];

const ITEMS_EN: Item[] = [
  { text: "Real projects.", type: "statement" },
  { text: "Real businesses.", type: "statement" },
  { text: "No templates.", type: "statement" },
  { text: "Hospitality", type: "industry" },
  { text: "Engineering", type: "industry" },
  { text: "Trade", type: "industry" },
  { text: "Health", type: "industry" },
  { text: "Tourism", type: "industry" },
  { text: "Personal Brand", type: "industry" },
  { text: "7 industries.", type: "statement" },
];

const DOT = (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 3,
      height: 3,
      borderRadius: "50%",
      backgroundColor: "var(--color-border-strong)",
      flexShrink: 0,
      verticalAlign: "middle",
      marginBottom: 1,
    }}
  />
);

function MarqueeRow({ items, paused }: { items: Item[]; paused: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        animation: "marquee-slide 48s linear infinite",
        animationPlayState: paused ? "paused" : "running",
        willChange: "transform",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {doubled.map((item, i) => (
        <span
          key={i}
          style={{ display: "inline-flex", alignItems: "center", gap: 32 }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: item.type === "statement" ? 600 : 400,
              fontSize: 11,
              letterSpacing: item.type === "statement" ? "0.04em" : "0.1em",
              textTransform: item.type === "industry" ? "uppercase" : "none",
              color:
                item.type === "statement"
                  ? "var(--color-action)"
                  : "var(--color-text-tertiary)",
            }}
          >
            {item.text}
          </span>
          {DOT}
        </span>
      ))}
    </div>
  );
}

function StaticRow({ items }: { items: Item[] }) {
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
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: "inline-flex", alignItems: "center", gap: 24 }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: item.type === "statement" ? 600 : 400,
              fontSize: 11,
              letterSpacing: item.type === "statement" ? "0.04em" : "0.1em",
              textTransform: item.type === "industry" ? "uppercase" : "none",
              color:
                item.type === "statement"
                  ? "var(--color-action)"
                  : "var(--color-text-tertiary)",
            }}
          >
            {item.text}
          </span>
          {i < items.length - 1 && DOT}
        </span>
      ))}
    </div>
  );
}

export default function SignalBand() {
  const locale = useLocale();
  const items = locale === "en" ? ITEMS_EN : ITEMS_TR;

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
      aria-label={locale === "en" ? "Our work and approach" : "Çalışmalarımız ve yaklaşımımız"}
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
          <StaticRow items={items} />
        </div>
      ) : (
        <>
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
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            <MarqueeRow items={items} paused={paused} />
          </div>
        </>
      )}
    </div>
  );
}

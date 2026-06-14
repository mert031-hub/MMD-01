"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

type CapabilityKey =
  | "websiteDesign"
  | "brandExperience"
  | "conversionOptimization"
  | "uiSystems"
  | "performance"
  | "seoFoundations"
  | "digitalConsulting";

const CAPABILITY_KEYS: CapabilityKey[] = [
  "websiteDesign",
  "brandExperience",
  "conversionOptimization",
  "uiSystems",
  "performance",
  "seoFoundations",
  "digitalConsulting",
];

const CAPABILITY_ICONS: Record<CapabilityKey, React.ReactNode> = {
  websiteDesign: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 17.5h7M10 14.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M5 7.5h5M5 10h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45"/>
    </svg>
  ),
  brandExperience: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l2.2 5h5L13.5 10l1.8 5L10 12.5 4.7 15l1.8-5L2.8 7h5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  conversionOptimization: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 14L7.5 8.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17.5h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  ),
  uiSystems: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  performance: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 2.5L4.5 11h6l-2 6.5L17 9h-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  seoFoundations: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M13.5 13.5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  digitalConsulting: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 3.5v3M10 13.5v3M3.5 10h3M13.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

// Orange scatter dots: [x, y, size, opacity] — offsets from MM circle center
const MM_SCATTER: Array<[number, number, number, number]> = [
  // Left cluster
  [-108, -52, 7, 0.95],
  [-92, 22, 5, 0.80],
  [-80, -88, 4, 0.68],
  [-125, 40, 3.5, 0.58],
  [-70, 68, 3, 0.50],
  [-145, -5, 2.5, 0.40],
  [-55, -112, 2, 0.35],
  [-118, -78, 2, 0.30],
  // Right cluster (mirrored)
  [108, -52, 7, 0.95],
  [92, 22, 5, 0.80],
  [80, -88, 4, 0.68],
  [125, 40, 3.5, 0.58],
  [70, 68, 3, 0.50],
  [145, -5, 2.5, 0.40],
  [55, -112, 2, 0.35],
  [118, -78, 2, 0.30],
  // Top arc
  [0, -128, 4, 0.62],
  [-35, -118, 2.5, 0.40],
  [35, -118, 2.5, 0.40],
  [-62, -105, 1.5, 0.28],
  [62, -105, 1.5, 0.28],
  // Bottom arc
  [0, 98, 3, 0.48],
  [-22, 92, 2, 0.33],
  [22, 92, 2, 0.33],
];

function CapabilityCard({
  number,
  title,
  descriptor,
  icon,
  delayMs,
  shouldReduce,
}: {
  number: string;
  title: string;
  descriptor: string;
  icon: React.ReactNode;
  delayMs: number;
  shouldReduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(shouldReduce);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduce]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 14,
        borderTop: "1px solid rgba(6,7,113,0.09)",
        borderRight: "1px solid rgba(6,7,113,0.09)",
        borderBottom: "1px solid rgba(6,7,113,0.09)",
        borderLeft: "3px solid #ff6c0c",
        boxShadow: hovered
          ? "0 6px 24px rgba(6,7,113,0.09)"
          : "0 2px 8px rgba(6,7,113,0.04)",
        padding: "18px 18px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 9,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(14px)",
        transition: shouldReduce
          ? "none"
          : `opacity 480ms ease ${delayMs}ms, transform 480ms ease ${delayMs}ms, box-shadow 200ms ease`,
      }}
    >
      {/* Top row: icon circle + number */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: hovered ? "rgba(255,108,12,0.09)" : "#fdf8f0",
            border: "1px solid rgba(6,7,113,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: hovered ? "#ff6c0c" : "var(--color-authority)",
            transition: "background-color 200ms ease, color 200ms ease",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.07em",
            color: "#ff6c0c",
            paddingTop: 3,
          }}
        >
          {number}
        </span>
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "clamp(13px, 0.95vw, 15px)",
          color: hovered ? "#ff6c0c" : "var(--color-authority)",
          margin: 0,
          lineHeight: 1.3,
          transition: "color 200ms ease",
        }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.58,
          color: "rgba(6,7,113,0.48)",
          margin: 0,
          flex: 1,
        }}
      >
        {descriptor}
      </p>

      {/* Arrow */}
      <div style={{ textAlign: "right", marginTop: 2 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 14,
            color: "#ff6c0c",
            opacity: hovered ? 1 : 0.45,
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
}

function CenterMM() {
  const CONNECTOR_Y_OFFSETS = [-5, 0, 5] as const;
  const CONNECTOR_DOT_COUNT = 8;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 320,
      }}
    >
      {/* Dots and connectors layer — overflow visible so dots bleed into card columns */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Orange scatter dots */}
        {MM_SCATTER.map(([x, y, size, opacity], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              marginLeft: x - size / 2,
              marginTop: y - size / 2,
              borderRadius: "50%",
              backgroundColor: "#ff6c0c",
              opacity,
            }}
          />
        ))}

        {/* Left connector dots — fade in toward MM */}
        {CONNECTOR_Y_OFFSETS.map((yOff) =>
          Array.from({ length: CONNECTOR_DOT_COUNT }).map((_, j) => (
            <div
              key={`lc-${yOff}-${j}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "rgba(6,7,113,0.22)",
                marginLeft: -(70 + j * 10) - 1,
                marginTop: yOff - 1,
                opacity: 0.25 + (j / (CONNECTOR_DOT_COUNT - 1)) * 0.55,
              }}
            />
          ))
        )}

        {/* Right connector dots — fade out away from MM */}
        {CONNECTOR_Y_OFFSETS.map((yOff) =>
          Array.from({ length: CONNECTOR_DOT_COUNT }).map((_, j) => (
            <div
              key={`rc-${yOff}-${j}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "rgba(6,7,113,0.22)",
                marginLeft: 69 + j * 10 - 1,
                marginTop: yOff - 1,
                opacity: 0.25 + ((CONNECTOR_DOT_COUNT - 1 - j) / (CONNECTOR_DOT_COUNT - 1)) * 0.55,
              }}
            />
          ))
        )}
      </div>

      {/* MM Circle */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          backgroundColor: "var(--color-authority)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
          boxShadow:
            "0 4px 28px rgba(6,7,113,0.24), 0 0 0 8px rgba(6,7,113,0.055), 0 0 0 18px rgba(6,7,113,0.025)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 700,
            color: "rgba(255,251,243,0.92)",
            letterSpacing: "0.02em",
          }}
        >
          MM
        </span>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const shouldReduce = useReducedMotion() ?? false;

  const leftKeys = CAPABILITY_KEYS.slice(0, 4);
  const rightKeys = CAPABILITY_KEYS.slice(4);

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .cap-desktop-grid { display: none !important; }
          .cap-mobile-stack { display: flex !important; }
        }
      `}</style>

      <section
        id="hizmetler"
        aria-label="Hizmetler ve Yetenekler"
        className="section-padding"
        style={{
          backgroundColor: "var(--color-bg-surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeader
            number={t("sectionNumber")}
            title={t("sectionTitle")}
            descriptor={t("sectionDescriptor")}
          />

          {/* Desktop: 3-column card grid with center MM */}
          <div
            className="cap-desktop-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 180px 1fr",
              gap: "0 20px",
              alignItems: "center",
            }}
          >
            {/* Left column — 4 cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {leftKeys.map((key, i) => {
                const item = t.raw(`items.${key}`) as {
                  number: string;
                  title: string;
                  descriptor: string;
                };
                return (
                  <CapabilityCard
                    key={key}
                    number={item.number}
                    title={item.title}
                    descriptor={item.descriptor}
                    icon={CAPABILITY_ICONS[key]}
                    delayMs={i * 60}
                    shouldReduce={shouldReduce}
                  />
                );
              })}
            </div>

            {/* Center MM node */}
            <CenterMM />

            {/* Right column — 3 cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {rightKeys.map((key, i) => {
                const item = t.raw(`items.${key}`) as {
                  number: string;
                  title: string;
                  descriptor: string;
                };
                return (
                  <CapabilityCard
                    key={key}
                    number={item.number}
                    title={item.title}
                    descriptor={item.descriptor}
                    icon={CAPABILITY_ICONS[key]}
                    delayMs={(i + 2) * 60}
                    shouldReduce={shouldReduce}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile: single-column card stack */}
          <div
            className="cap-mobile-stack"
            style={{ display: "none", flexDirection: "column", gap: 14 }}
          >
            {CAPABILITY_KEYS.map((key, i) => {
              const item = t.raw(`items.${key}`) as {
                number: string;
                title: string;
                descriptor: string;
              };
              return (
                <CapabilityCard
                  key={key}
                  number={item.number}
                  title={item.title}
                  descriptor={item.descriptor}
                  icon={CAPABILITY_ICONS[key]}
                  delayMs={i * 50}
                  shouldReduce={shouldReduce}
                />
              );
            })}
          </div>

          {/* Bottom strip */}
          <div
            style={{
              borderTop: "1px solid rgba(6,7,113,0.08)",
              marginTop: 48,
              paddingTop: 22,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 10.5,
                letterSpacing: "0.22em",
                color: "rgba(6,7,113,0.35)",
                textTransform: "uppercase",
              }}
            >
              ✦ BUILT FOR THOSE WHO CARE ABOUT DETAILS
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

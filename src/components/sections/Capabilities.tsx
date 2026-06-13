"use client";

import React from "react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

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

function CapabilityItem({
  number,
  title,
  descriptor,
  icon,
  delay,
  shouldReduce,
}: {
  number: string;
  title: string;
  descriptor: string;
  icon: React.ReactNode;
  delay: number;
  shouldReduce: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: 24,
        paddingBottom: 24,
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: "0 20px",
        alignItems: "start",
        cursor: "default",
      }}
    >
      {/* Number */}
      <span
        className="text-label"
        style={{
          color: hovered ? "var(--color-action)" : "var(--color-text-tertiary)",
          paddingTop: 3,
          display: "block",
          transition: "color 200ms ease",
          userSelect: "none",
        }}
      >
        {number}
      </span>

      {/* Content */}
      <div
        style={{
          transform: hovered && !shouldReduce ? "translateX(4px)" : "translateX(0)",
          transition: "transform 200ms ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              color: hovered ? "var(--color-action)" : "rgba(6,7,113,0.35)",
              transition: "color 200ms ease, transform 200ms ease",
              transform: hovered && !shouldReduce ? "scale(1.12)" : "scale(1)",
              transformOrigin: "left center",
              display: "flex",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.3,
              color: hovered ? "var(--color-action)" : "var(--color-authority)",
              marginBottom: 0,
              transition: "color 200ms ease",
            }}
          >
            {title}
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1.55,
            color: "var(--color-text-secondary)",
            margin: 0,
          }}
        >
          {descriptor}
        </p>
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const shouldReduce = useReducedMotion() ?? false;

  const leftKeys = CAPABILITY_KEYS.slice(0, 4);
  const rightKeys = CAPABILITY_KEYS.slice(4);

  return (
    <section
      id="hizmetler"
      aria-label="Hizmetler ve Yetenekler"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
    >
      <div className="container-site">
        <SectionHeader
          number={t("sectionNumber")}
          title={t("sectionTitle")}
          descriptor={t("sectionDescriptor")}
        />

        <div
          className="capabilities-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 80px",
          }}
        >
          {/* Left column — items 1-4, stagger 0–0.21s */}
          <div>
            {leftKeys.map((key, i) => {
              const item = t.raw(`items.${key}`) as {
                number: string;
                title: string;
                descriptor: string;
              };
              return (
                <CapabilityItem
                  key={key}
                  number={item.number}
                  title={item.title}
                  descriptor={item.descriptor}
                  icon={CAPABILITY_ICONS[key]}
                  delay={i * 0.07}
                  shouldReduce={shouldReduce}
                />
              );
            })}
            <div style={{ borderTop: "1px solid var(--color-border)" }} />
          </div>

          {/* Right column — items 5-7, offset stagger */}
          <div>
            {rightKeys.map((key, i) => {
              const item = t.raw(`items.${key}`) as {
                number: string;
                title: string;
                descriptor: string;
              };
              return (
                <CapabilityItem
                  key={key}
                  number={item.number}
                  title={item.title}
                  descriptor={item.descriptor}
                  icon={CAPABILITY_ICONS[key]}
                  delay={(i + 2) * 0.07}
                  shouldReduce={shouldReduce}
                />
              );
            })}
            <div style={{ borderTop: "1px solid var(--color-border)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

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

function CapabilityItem({
  number,
  title,
  descriptor,
  delay,
  shouldReduce,
}: {
  number: string;
  title: string;
  descriptor: string;
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
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.3,
            color: hovered ? "var(--color-action)" : "var(--color-authority)",
            marginBottom: 6,
            transition: "color 200ms ease",
          }}
        >
          {title}
        </p>
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

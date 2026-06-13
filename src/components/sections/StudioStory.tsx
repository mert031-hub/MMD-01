"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const PILLAR_DATA = [
  {
    number: "01",
    titleTr: "Sektör Odağı",
    titleEn: "Industry Focus",
    descTr: "Her sektörün dijital dili farklıdır. Şablonlar bu farkı yok sayar.",
    descEn: "Every industry speaks a different digital language. Templates ignore this difference.",
  },
  {
    number: "02",
    titleTr: "Dönüşüm Önceliği",
    titleEn: "Conversion Priority",
    descTr: "Tasarımın amacı beğenilmek değil, dönüştürmektir.",
    descEn: "The purpose of design is not to be admired, but to convert.",
  },
  {
    number: "03",
    titleTr: "Uzun Vadeli Bakış",
    titleEn: "Long-term Thinking",
    descTr: "Bugünün web sitesi, yarının büyümesinin temelidir.",
    descEn: "Today's website is the foundation of tomorrow's growth.",
  },
];

function PillarCard({
  pillar,
  isTr,
  delay,
  shouldReduce,
}: {
  pillar: (typeof PILLAR_DATA)[number];
  isTr: boolean;
  delay: number;
  shouldReduce: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "2px solid",
        borderTopColor: hovered ? "var(--color-action)" : "var(--color-border-strong)",
        paddingTop: 24,
        transition: "border-top-color 220ms ease",
        cursor: "default",
      }}
    >
      <span
        className="text-label"
        style={{
          color: hovered ? "var(--color-action)" : "var(--color-text-tertiary)",
          display: "block",
          marginBottom: 10,
          transition: "color 220ms ease",
        }}
      >
        {pillar.number}
      </span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.4,
          color: hovered ? "var(--color-action)" : "var(--color-authority)",
          margin: "0 0 8px 0",
          transition: "color 220ms ease",
          transform: hovered && !shouldReduce ? "translateX(4px)" : "translateX(0)",
          transitionProperty: "color, transform",
          transitionDuration: "220ms",
          transitionTimingFunction: "ease",
        }}
      >
        {isTr ? pillar.titleTr : pillar.titleEn}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.65,
          color: "var(--color-text-secondary)",
          margin: 0,
        }}
      >
        {isTr ? pillar.descTr : pillar.descEn}
      </p>
    </motion.div>
  );
}

export default function StudioStory({ isTr }: { isTr: boolean }) {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
    >
      <div className="container-site">
        {/* Orange accent line */}
        <motion.div
          initial={shouldReduce ? {} : { width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          style={{
            height: 2,
            backgroundColor: "var(--color-action)",
            marginBottom: 40,
          }}
        />

        {/* Display headline */}
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--color-authority)",
            maxWidth: 720,
            marginBottom: 48,
          }}
        >
          {isTr
            ? "İki değer, bir ölçüt: işe yarayan tasarım."
            : "Two values, one standard: design that works."}
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "var(--color-border-strong)",
            marginBottom: 48,
            transformOrigin: "left",
          }}
        />

        {/* Two-column layout: paragraphs left, pillars right */}
        <div className="studio-story-layout">
          {/* Left: body paragraphs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              isTr
                ? "MMDESIGN, hizmet sektörüne özel dijital deneyimler için kurulmuş bir stüdyodur. Güzel görünen ama dönüştüremeyen web sitelerinin gerçek bir maliyeti vardır: fırsatlar, güven ve büyüme. Biz bu maliyeti ortadan kaldırmak için varız."
                : "MMDESIGN is a studio built for digital experiences in the service sector. Websites that look good but don't convert have a real cost: missed opportunities, lost trust, and stunted growth. We exist to eliminate that cost.",
              isTr
                ? "Her müşteri ilişkisi aynı soruyla başlar: 'Sizi tanımayan biri, dijitalde sizi nasıl görüyor?' Bu soruyu ciddiye almak, tasarımın ötesinde bir yaklaşımı gerektirir."
                : "Every client relationship starts with the same question: 'How does someone who doesn't know you yet see you online?' Taking that question seriously requires an approach that goes beyond design.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_OUT }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Right: pillar grid */}
          <div className="pillar-grid">
            {PILLAR_DATA.map((pillar, i) => (
              <PillarCard
                key={pillar.number}
                pillar={pillar}
                isTr={isTr}
                delay={i * 0.08}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .studio-story-layout {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 64px;
          align-items: start;
        }
        .pillar-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .studio-story-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 767px) {
          .pillar-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}

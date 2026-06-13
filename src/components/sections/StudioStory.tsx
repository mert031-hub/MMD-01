import React from "react";

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

export default function StudioStory({ isTr }: { isTr: boolean }) {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
    >
      <div className="container-site">
        {/* Orange accent line */}
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: "var(--color-action)",
            marginBottom: 40,
          }}
        />

        {/* Display headline */}
        <h2
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
        </h2>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "var(--color-border-strong)",
            marginBottom: 48,
          }}
        />

        {/* Two-column layout: paragraphs left, pillars right */}
        <div className="studio-story-layout">
          {/* Left: body paragraphs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                lineHeight: 1.75,
                color: "var(--color-text-secondary)",
                maxWidth: 640,
                margin: 0,
              }}
            >
              {isTr
                ? "MMDESIGN, hizmet sektörüne özel dijital deneyimler için kurulmuş bir stüdyodur. Güzel görünen ama dönüştüremeyen web sitelerinin gerçek bir maliyeti vardır: fırsatlar, güven ve büyüme. Biz bu maliyeti ortadan kaldırmak için varız."
                : "MMDESIGN is a studio built for digital experiences in the service sector. Websites that look good but don't convert have a real cost: missed opportunities, lost trust, and stunted growth. We exist to eliminate that cost."}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                lineHeight: 1.75,
                color: "var(--color-text-secondary)",
                maxWidth: 640,
                margin: 0,
              }}
            >
              {isTr
                ? "Her müşteri ilişkisi aynı soruyla başlar: 'Sizi tanımayan biri, dijitalde sizi nasıl görüyor?' Bu soruyu ciddiye almak, tasarımın ötesinde bir yaklaşımı gerektirir."
                : "Every client relationship starts with the same question: 'How does someone who doesn't know you yet see you online?' Taking that question seriously requires an approach that goes beyond design."}
            </p>
          </div>

          {/* Right: pillar grid */}
          <div className="pillar-grid">
            {PILLAR_DATA.map((pillar) => (
              <div
                key={pillar.number}
                style={{
                  borderTop: "1px solid var(--color-border-strong)",
                  paddingTop: 24,
                }}
              >
                <span
                  className="text-label"
                  style={{
                    color: "var(--color-action)",
                    display: "block",
                    marginBottom: 10,
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
                    color: "var(--color-authority)",
                    margin: "0 0 8px 0",
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
              </div>
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

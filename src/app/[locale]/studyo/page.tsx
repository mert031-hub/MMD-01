import type { Metadata } from "next";
import StudioStory from "@/components/sections/StudioStory";
import Philosophy from "@/components/sections/Philosophy";
import ClosingCTA from "@/components/sections/ClosingCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== "en";
  return {
    title: isTr ? "Stüdyo" : "Studio",
    description: isTr
      ? "MMDESIGN stüdyosu — dijital strateji ve deneyim tasarımına yaklaşımımız."
      : "MMDESIGN studio — our approach to digital strategy and experience design.",
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  const isTr = locale !== "en";

  const descriptors = isTr
    ? [
        { label: "Konum", value: "İstanbul" },
        { label: "Odak", value: "Hizmet Sektörü" },
        { label: "Yaklaşım", value: "Şablonsuz" },
      ]
    : [
        { label: "Location", value: "Istanbul" },
        { label: "Focus", value: "Service Sector" },
        { label: "Approach", value: "No Templates" },
      ];

  return (
    <>
      <div style={{ height: 72 }} aria-hidden="true" />

      {/* Page intro */}
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBottom: 0,
        }}
      >
        <div className="container-site">
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: "var(--color-action)",
              marginBottom: 32,
            }}
          />
          <p
            className="text-label"
            style={{ color: "var(--color-action)", marginBottom: 24 }}
          >
            {isTr ? "Stüdyo" : "Studio"}
          </p>
          <h1
            className="text-display-xl"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
              maxWidth: 720,
              marginBottom: 28,
            }}
          >
            {isTr
              ? "Tasarım, stratejinin görsel halidir."
              : "Design is strategy made visible."}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: 520,
              margin: "0 0 56px 0",
            }}
          >
            {isTr
              ? "Dijital varlığınız, potansiyel müşterinin sizi değerlendirdiği ilk zemin. Biz bu zemini doğru inşa etmek için varız."
              : "Your digital presence is the first ground on which a potential client evaluates you. We exist to build that ground right."}
          </p>

          {/* Studio descriptors */}
          <div className="studio-intro-stats">
            {descriptors.map(({ label, value }) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  className="text-label"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2vw, 28px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--color-authority)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioStory isTr={isTr} />
      <Philosophy />
      <ClosingCTA />

      <style>{`
        .studio-intro-stats {
          display: flex;
          gap: 64px;
          flex-wrap: wrap;
          border-top: 1px solid var(--color-border);
          padding-top: 32px;
        }
        @media (max-width: 600px) {
          .studio-intro-stats {
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}


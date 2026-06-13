import type { Metadata } from "next";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Capabilities from "@/components/sections/Capabilities";
import ClosingCTA from "@/components/sections/ClosingCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== "en";
  return {
    title: isTr ? "Hizmetler" : "Services",
    description: isTr
      ? "MMDESIGN hizmetleri — website tasarımından marka deneyimine, performans mühendisliğinden dijital danışmanlığa."
      : "MMDESIGN services — from website design and brand experience to performance engineering and digital consulting.",
  };
}

const SERVICE_LIST_TR = [
  ["01", "Website Tasarımı"],
  ["02", "Marka Deneyimi"],
  ["03", "Dönüşüm Optimizasyonu"],
  ["04", "UI Sistemleri"],
  ["05", "Performans Mühendisliği"],
  ["06", "SEO Temelleri"],
  ["07", "Dijital Danışmanlık"],
] as const;

const SERVICE_LIST_EN = [
  ["01", "Website Design"],
  ["02", "Brand Experience"],
  ["03", "Conversion Optimisation"],
  ["04", "UI Systems"],
  ["05", "Performance Engineering"],
  ["06", "SEO Foundations"],
  ["07", "Digital Consulting"],
] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const isTr = locale !== "en";
  const services = isTr ? SERVICE_LIST_TR : SERVICE_LIST_EN;

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
          <div className="hizmetler-intro-grid">

            {/* Left: heading block */}
            <div>
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
                {isTr ? "Hizmetler" : "Services"}
              </p>
              <h1
                className="text-display-xl"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-display)",
                  maxWidth: 560,
                  marginBottom: 28,
                }}
              >
                {isTr
                  ? "Strateji ile başlar, deneyim ile tamamlanır."
                  : "It starts with strategy. It ends with experience."}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                {isTr
                  ? "Tasarım kararlarımızın her biri, ziyaretçiyi müşteriye dönüştüren bir yapıya hizmet eder. Şablonsuz, sektöre özgü, ölçülebilir."
                  : "Every design decision we make serves a structure that turns visitors into clients. No templates, sector-specific, measurable."}
              </p>
            </div>

            {/* Right: service index list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              {services.map(([num, name], i) => (
                <div
                  key={num}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    padding: "11px 0",
                    borderTop: "1px solid var(--color-border)",
                    borderBottom: i === services.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "var(--color-action)",
                      flexShrink: 0,
                      userSelect: "none",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "clamp(13px, 1.1vw, 15px)",
                      letterSpacing: "-0.01em",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <ProblemSolution isTr={isTr} />
      <Capabilities />
      <ClosingCTA />

      <style>{`
        .hizmetler-intro-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 64px;
          align-items: end;
        }
        @media (max-width: 900px) {
          .hizmetler-intro-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </>
  );
}


import type { Metadata } from "next";
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

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const isTr = locale !== "en";

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
              maxWidth: 720,
            }}
          >
            {isTr
              ? "Strateji ile başlar, deneyim ile tamamlanır."
              : "It starts with strategy. It ends with experience."}
          </h1>
        </div>
      </section>

      <Capabilities />
      <ClosingCTA />
    </>
  );
}

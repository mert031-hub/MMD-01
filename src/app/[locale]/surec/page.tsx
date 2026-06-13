import type { Metadata } from "next";
import Process from "@/components/sections/Process";
import ProcessDetail from "@/components/sections/ProcessDetail";
import ClosingCTA from "@/components/sections/ClosingCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== "en";
  return {
    title: isTr ? "Süreç" : "Process",
    description: isTr
      ? "MMDESIGN çalışma süreci — keşiften lansmanına, her adım bir amaca hizmet eder."
      : "MMDESIGN process — from discovery to launch, every step serves a purpose.",
  };
}

export default async function ProcessPage({ params }: Props) {
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
            {isTr ? "Süreç" : "Process"}
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
              ? "Her adım bir amaca hizmet eder."
              : "Every step serves a purpose."}
          </h1>
        </div>
      </section>

      <Process />
      <ProcessDetail isTr={isTr} />
      <ClosingCTA />
    </>
  );
}

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
            {isTr ? "Stüdyo" : "Studio"}
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
              ? "Tasarım, stratejinin görsel halidir."
              : "Design is strategy made visible."}
          </h1>
        </div>
      </section>

      <StudioStory isTr={isTr} />
      <Philosophy />
      <ClosingCTA />
    </>
  );
}

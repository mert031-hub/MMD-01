import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { projects } from "@/lib/projects";
import WorkIndexList from "@/components/ui/WorkIndexList";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workIndex" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WorkIndexPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workIndex" });

  return (
    <>
      {/* Page header */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-primary)", paddingBottom: 0 }}
      >
        <div className="container-site">
          <p
            className="text-label"
            style={{ color: "var(--color-action)", marginBottom: 24 }}
          >
            {t("label")}
          </p>
          <h1
            className="text-display-xl"
            style={{ color: "var(--color-text-primary)", maxWidth: 720 }}
          >
            {t("heading")}
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--color-text-secondary)",
              marginTop: 24,
              maxWidth: 520,
            }}
          >
            {t("descriptor")}
          </p>
        </div>
      </section>

      {/* Project list */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingTop: 80,
          paddingBottom: 120,
        }}
      >
        <div className="container-site">
          <WorkIndexList
            projects={projects.map((project, i) => ({
              slug: project.slug,
              name: project.name,
              industryLabel:
                locale === "tr" ? project.industry.tr : project.industry.en,
              transformation:
                locale === "tr"
                  ? project.transformation.tr
                  : project.transformation.en,
              indexLabel: `${String(i + 1).padStart(2, "0")} — ${locale === "tr" ? project.industry.tr : project.industry.en}`,
              viewLabel: t("viewProject"),
              desktopImage: project.images.desktop,
            }))}
          />
        </div>
      </section>
    </>
  );
}

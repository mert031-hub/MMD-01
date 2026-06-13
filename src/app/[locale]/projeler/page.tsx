import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/projects";

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
          <div
            style={{
              height: 1,
              backgroundColor: "var(--color-border-strong)",
              marginBottom: 0,
            }}
          />
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projeler/${project.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border)",
              }}
              className="work-index-row"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 32,
                  paddingTop: 40,
                  paddingBottom: 40,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="text-label"
                    style={{
                      color: "var(--color-text-tertiary)",
                      marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} —{" "}
                    {locale === "tr" ? project.industry.tr : project.industry.en}
                  </p>
                  <h2
                    className="text-h2"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: 12,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {project.name}
                  </h2>
                  <p
                    className="text-body"
                    style={{
                      color: "var(--color-text-secondary)",
                      maxWidth: 560,
                    }}
                  >
                    {locale === "tr"
                      ? project.transformation.tr
                      : project.transformation.en}
                  </p>
                </div>

                <span
                  className="work-index-arrow"
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--color-action)",
                    whiteSpace: "nowrap",
                    alignSelf: "center",
                    transition: "transform 200ms ease",
                    flexShrink: 0,
                  }}
                >
                  {t("viewProject")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .work-index-row:hover .work-index-arrow {
          transform: translateX(6px);
        }
        .work-index-row:hover h2 {
          color: var(--color-authority) !important;
        }
      `}</style>
    </>
  );
}

import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/ui/JsonLd";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ProjectScreenshot from "@/components/ui/ProjectScreenshot";
import CaseNavigation from "@/components/ui/CaseNavigation";
import { getProject, getAllSlugs, getAdjacentProjects } from "@/lib/projects";
import { waUrl } from "@/lib/whatsapp";

const BASE_URL = "https://mmdesign.com.tr";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const transformation =
    locale === "tr" ? project.transformation.tr : project.transformation.en;

  const ogUrl = `/og?title=${encodeURIComponent(project.name)}`;

  return {
    title: project.name,
    description: transformation,
    openGraph: {
      title: `${project.name} — MMDESIGN`,
      description: transformation,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "caseStudy" });

  const industry =
    locale === "tr" ? project.industry.tr : project.industry.en;
  const transformation =
    locale === "tr" ? project.transformation.tr : project.transformation.en;
  const challenge =
    locale === "tr" ? project.challenge.tr : project.challenge.en;
  const approach =
    locale === "tr" ? project.approach.tr : project.approach.en;
  const deliverables =
    locale === "tr" ? project.deliverables.tr : project.deliverables.en;

  const { prev: prevProject, next: nextProject, index: projectIndex } =
    getAdjacentProjects(slug);

  const desktopImagePublicPath = project.images.desktop;
  const desktopImageFsPath = path.join(
    process.cwd(),
    "public",
    desktopImagePublicPath
  );
  const hasDesktopImage = fs.existsSync(desktopImageFsPath);

  const mobileImagePublicPath = project.images.mobile;
  const hasDesktopMobileImage =
    mobileImagePublicPath !== undefined &&
    fs.existsSync(path.join(process.cwd(), "public", mobileImagePublicPath));

  const pageUrl =
    locale === "tr"
      ? `${BASE_URL}/projeler/${slug}`
      : `${BASE_URL}/en/projeler/${slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "tr" ? "Ana Sayfa" : "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "tr" ? "Projeler" : "Work",
        item:
          locale === "tr"
            ? `${BASE_URL}/projeler`
            : `${BASE_URL}/en/projeler`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <JsonLd data={breadcrumb} />

      {/* Back link + project header */}
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--color-authority-deep)",
          paddingBottom: 80,
        }}
      >
        <div className="container-site">
          <Link
            href="/projeler"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,251,243,0.5)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 64,
              transition: "color 150ms ease",
            }}
            className="case-back-link"
          >
            ← {t("backToWork")}
          </Link>

          <p
            className="text-label"
            style={{ color: "var(--color-action)", marginBottom: 24 }}
          >
            {industry}
          </p>

          <h1
            className="text-display-xl"
            style={{
              color: "rgba(255,251,243,0.95)",
              maxWidth: 820,
              fontFamily: "var(--font-display)",
            }}
          >
            {project.name}
          </h1>

          <p
            className="text-body-lg"
            style={{
              color: "rgba(255,251,243,0.6)",
              marginTop: 24,
              maxWidth: 640,
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
            }}
          >
            {transformation}
          </p>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 32,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,251,243,0.5)",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
              className="case-live-link"
            >
              {t("visitLive")}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 2h6v6M8 2L2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* Desktop screenshot — enhanced with browser chrome + lightbox */}
      {hasDesktopImage && (
        <section
          style={{
            backgroundColor: "var(--color-bg-inset)",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <div className="container-site" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                paddingTop: 64,
                paddingBottom: 64,
              }}
            >
              {/* Desktop screenshot with browser chrome */}
              <div style={{ flex: 1 }}>
                <ProjectScreenshot
                  src={`/${desktopImagePublicPath}`}
                  alt={`${project.name} desktop screenshot`}
                  liveUrl={project.liveUrl}
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 80vw, 960px"
                />
              </div>

              {/* Mobile screenshot — optional */}
              {hasDesktopMobileImage && (
                <div
                  style={{
                    width: 120,
                    flexShrink: 0,
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow:
                      "0 8px 32px rgba(6,7,113,0.15), 0 2px 6px rgba(6,7,113,0.08)",
                    position: "relative",
                    aspectRatio: "9 / 19.5",
                  }}
                  className="case-mobile-shot"
                >
                  <Image
                    src={`/${mobileImagePublicPath}`}
                    alt={`${project.name} mobile screenshot`}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Challenge + Approach */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className="container-site">
          <div className="case-grid">
            <div>
              <p
                className="text-label"
                style={{
                  color: "var(--color-action)",
                  marginBottom: 24,
                }}
              >
                {t("challengeLabel")}
              </p>
              <p
                className="text-body-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {challenge}
              </p>
            </div>

            <div>
              <p
                className="text-label"
                style={{
                  color: "var(--color-action)",
                  marginBottom: 24,
                }}
              >
                {t("approachLabel")}
              </p>
              <p
                className="text-body-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {approach}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section
        style={{
          backgroundColor: "var(--color-bg-surface)",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div className="container-site">
          <div
            style={{
              height: 1,
              backgroundColor: "var(--color-border)",
              marginBottom: 48,
            }}
          />

          <p
            className="text-label"
            style={{ color: "var(--color-text-tertiary)", marginBottom: 32 }}
          >
            {t("deliverablesLabel")}
          </p>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 40px",
            }}
          >
            {deliverables.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-action)",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          <div
            style={{
              height: 1,
              backgroundColor: "var(--color-border)",
              marginTop: 48,
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className="container-site">
          <div style={{ maxWidth: 640 }}>
            <h2
              className="text-h2"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-display)",
                marginBottom: 32,
              }}
            >
              {t("ctaHeading")}
            </h2>
            <a
              href={waUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fffbf3",
                backgroundColor: "var(--color-action)",
                padding: "16px 32px",
                textDecoration: "none",
                transition: "background-color 150ms ease, transform 150ms ease",
              }}
              className="case-cta-btn"
            >
              {t("ctaAction")}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Dynamic Project Navigation (client component) ──────── */}
      <CaseNavigation
        prev={
          prevProject
            ? {
                slug: prevProject.slug,
                name: prevProject.name,
                industry: locale === "tr" ? prevProject.industry.tr : prevProject.industry.en,
                projectIndex: projectIndex - 1,
              }
            : null
        }
        next={
          nextProject
            ? {
                slug: nextProject.slug,
                name: nextProject.name,
                industry: locale === "tr" ? nextProject.industry.tr : nextProject.industry.en,
                projectIndex: projectIndex + 1,
              }
            : null
        }
        labels={{
          prevProject: t("prevProject"),
          nextProject: t("nextProject"),
          backToWork: t("backToWork"),
        }}
      />

      <style>{`
        .case-back-link:hover { color: rgba(255,251,243,0.9) !important; }
        .case-live-link:hover { color: rgba(255,251,243,0.9) !important; }
        .case-cta-btn:hover {
          background-color: var(--color-action-hover) !important;
          transform: translateY(-1px);
        }
        .case-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        @media (max-width: 767px) {
          .case-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .case-mobile-shot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

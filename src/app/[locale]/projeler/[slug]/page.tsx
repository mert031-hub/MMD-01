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

      {/* Desktop screenshot or browser-chrome placeholder */}
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
            <div style={{ flex: 1 }}>
              {hasDesktopImage ? (
                <ProjectScreenshot
                  src={`/${desktopImagePublicPath}`}
                  alt={`${project.name} desktop screenshot`}
                  liveUrl={project.liveUrl}
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 80vw, 960px"
                />
              ) : (
                <div
                  style={{
                    borderRadius: 6,
                    overflow: "hidden",
                    boxShadow: "0 16px 64px rgba(6,7,113,0.18), 0 2px 8px rgba(6,7,113,0.08)",
                  }}
                >
                  {/* Browser chrome bar */}
                  <div
                    style={{
                      backgroundColor: "#f0ece3",
                      borderBottom: "1px solid rgba(6,7,113,0.08)",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28ca41" }} />
                    </div>
                    {project.liveUrl && (
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(6,7,113,0.05)",
                          borderRadius: 4,
                          padding: "4px 10px",
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          color: "rgba(6,7,113,0.45)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 320,
                          margin: "0 auto",
                        }}
                      >
                        {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </div>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} — ${locale === "tr" ? "canlı siteyi aç" : "open live site"}`}
                        style={{
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "var(--font-body)",
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(6,7,113,0.4)",
                          textDecoration: "none",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2 2h6v6M8 2L2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {locale === "tr" ? "Canlı" : "Live"}
                      </a>
                    )}
                  </div>

                  {/* Content area */}
                  <div
                    style={{
                      aspectRatio: "16 / 10",
                      backgroundColor: "#03044a",
                      backgroundImage: "radial-gradient(circle, rgba(255,251,243,0.04) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 20,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(13px, 1.8vw, 18px)",
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        color: "rgba(255,251,243,0.35)",
                        margin: 0,
                      }}
                    >
                      {project.liveUrl
                        ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                        : project.name}
                    </p>
                    <div style={{ width: 36, height: 1.5, backgroundColor: "#ff6c0c", opacity: 0.7 }} />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255,251,243,0.5)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {locale === "tr" ? "Canlı siteyi ziyaret et" : "Visit live site"}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2.5 2.5h7v7M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {hasDesktopMobileImage && (
              <div
                style={{
                  width: 120,
                  flexShrink: 0,
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(6,7,113,0.15), 0 2px 6px rgba(6,7,113,0.08)",
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

      {/* Challenge + Approach */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-primary)", position: "relative", overflow: "hidden" }}
      >
        {/* Background chapter watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(160px, 20vw, 300px)",
            fontWeight: 700,
            color: "rgba(6,7,113,0.025)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          01
        </div>

        <div className="container-site" style={{ position: "relative" }}>
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

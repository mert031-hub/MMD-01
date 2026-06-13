"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";

type ProjectItem = {
  slug: string;
  name: string;
  industryLabel: string;
  transformation: string;
  indexLabel: string;
  viewLabel: string;
  desktopImage: string;
};

type Props = {
  projects: ProjectItem[];
};

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const GRADIENT_PALETTES = [
  "linear-gradient(135deg, #03044a 0%, #060771 60%, #0a0ba3 100%)",
  "linear-gradient(135deg, #03044a 0%, #060771 50%, #bf1a1a 100%)",
  "linear-gradient(135deg, #060771 0%, #03044a 70%, #ff6c0c22 100%)",
  "linear-gradient(135deg, #03044a 0%, #060771 60%, #0a0ba3 100%)",
  "linear-gradient(135deg, #060771 0%, #0a0ba3 50%, #03044a 100%)",
  "linear-gradient(135deg, #03044a 0%, #bf1a1a 40%, #060771 100%)",
  "linear-gradient(135deg, #060771 0%, #03044a 60%, #ff6c0c22 100%)",
];

function PreviewPanel({
  project,
  index,
}: {
  project: ProjectItem | null;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const gradient = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

  return (
    <div
      style={{
        position: "sticky",
        top: 140,
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.slug}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            style={{
              position: "absolute",
              inset: 0,
              background: gradient,
            }}
          >
            {!imgError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`/${project.desktopImage}`}
                alt={`${project.name} preview`}
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            ) : (
              /* Branded gradient placeholder */
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: gradient,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  padding: 28,
                }}
              >
                {/* Orange accent */}
                <div
                  style={{
                    width: 32,
                    height: 1.5,
                    backgroundColor: "var(--color-action)",
                    marginBottom: 16,
                    opacity: 0.8,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    fontWeight: 600,
                    color: "rgba(255,251,243,0.9)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {project.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,251,243,0.35)",
                    marginTop: 8,
                    margin: "8px 0 0",
                  }}
                >
                  {project.industryLabel}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Empty state */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(6,7,113,0.04) 0%, rgba(6,7,113,0.08) 100%)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 5vw, 72px)",
                fontWeight: 700,
                color: "rgba(6,7,113,0.06)",
                letterSpacing: "-0.04em",
                userSelect: "none",
              }}
            >
              MM
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkIndexList({ projects }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="work-index-layout">
      {/* Left: project list */}
      <div>
        <div
          style={{
            height: 1,
            backgroundColor: "var(--color-border-strong)",
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
            onMouseEnter={() => {
              setActiveSlug(project.slug);
              setActiveIndex(i);
            }}
            onMouseLeave={() => setActiveSlug(null)}
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
                  {project.indexLabel}
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
                    maxWidth: 520,
                  }}
                >
                  {project.transformation}
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
                {project.viewLabel} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Right: preview panel — desktop only */}
      <div className="work-index-preview-col">
        <PreviewPanel project={activeProject} index={activeIndex} />
      </div>

      <style>{`
        .work-index-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 0 64px;
          align-items: start;
        }
        .work-index-preview-col {
          padding-top: 1px; /* align with top border */
        }
        .work-index-row:hover .work-index-arrow {
          transform: translateX(6px);
        }
        .work-index-row:hover h2 {
          color: var(--color-authority) !important;
        }
        @media (max-width: 1279px) {
          .work-index-layout {
            grid-template-columns: 1fr !important;
          }
          .work-index-preview-col {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

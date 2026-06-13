"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  "linear-gradient(135deg, #060771 0%, #03044a 70%, #0a0ba3 100%)",
  "linear-gradient(135deg, #03044a 0%, #060771 60%, #0a0ba3 100%)",
  "linear-gradient(135deg, #060771 0%, #0a0ba3 50%, #03044a 100%)",
  "linear-gradient(135deg, #03044a 0%, #bf1a1a 40%, #060771 100%)",
  "linear-gradient(135deg, #060771 0%, #03044a 60%, #0a0ba3 100%)",
];

function PreviewPanel({
  project,
  index,
}: {
  project: ProjectItem | null;
  index: number;
}) {
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
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{
              position: "absolute",
              inset: 0,
              background: gradient,
              backgroundImage: `${gradient}`,
            }}
          >
            {/* Dot grid overlay */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(255,251,243,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 32,
                background: "linear-gradient(to top, rgba(3,4,74,0.7) 0%, transparent 55%)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-action)",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                {project.industryLabel}
              </span>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 2vw, 28px)",
                  fontWeight: 600,
                  color: "rgba(255,251,243,0.95)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: "0 0 14px 0",
                }}
              >
                {project.name}
              </p>

              <div
                style={{
                  width: 28,
                  height: 1.5,
                  backgroundColor: "var(--color-action)",
                  marginBottom: 14,
                  opacity: 0.8,
                }}
              />

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(12px, 1.1vw, 14px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "rgba(255,251,243,0.6)",
                  margin: 0,
                  maxWidth: 280,
                }}
              >
                {project.transformation}
              </p>
            </div>
          </motion.div>
        ) : (
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
  const shouldReduce = useReducedMotion() ?? false;

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
          <motion.div
            key={project.slug}
            initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: i * 0.055, ease: EASE_OUT }}
          >
            <Link
              href={`/projeler/${project.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border)",
                position: "relative",
              }}
              className="work-index-row"
              onMouseEnter={() => {
                setActiveSlug(project.slug);
                setActiveIndex(i);
              }}
              onMouseLeave={() => setActiveSlug(null)}
            >
              {/* Left accent bar — grows on hover */}
              <span
                className="work-index-accent"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: "#ff6c0c",
                  transformOrigin: "top",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 32,
                  paddingTop: 40,
                  paddingBottom: 40,
                  paddingLeft: 0,
                  flexWrap: "wrap",
                  transition: "padding-left 280ms cubic-bezier(0,0,0.2,1)",
                }}
                className="work-index-inner"
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
                      transition: "color 200ms ease",
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
          </motion.div>
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
          padding-top: 1px;
        }
        .work-index-accent {
          transform: scaleY(0);
          transition: transform 320ms cubic-bezier(0,0,0.2,1);
        }
        .work-index-row:hover .work-index-accent {
          transform: scaleY(1);
        }
        .work-index-row:hover .work-index-inner {
          padding-left: 16px !important;
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

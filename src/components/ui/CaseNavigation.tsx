"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

type NavItem = {
  slug: string;
  name: string;
  industry: string;
  projectIndex: number;
};

type Props = {
  prev: NavItem | null;
  next: NavItem | null;
  labels: {
    prevProject: string;
    nextProject: string;
    backToWork: string;
  };
};

const PREVIEW_GRADIENTS = [
  "linear-gradient(135deg, #03044a 0%, #060771 60%, #0a0ba3 100%)",
  "linear-gradient(135deg, #03044a 0%, #060771 50%, #bf1a1a 100%)",
  "linear-gradient(135deg, #060771 0%, #03044a 70%, rgba(255,108,12,0.15) 100%)",
  "linear-gradient(135deg, #03044a 0%, #060771 60%, #0a0ba3 100%)",
  "linear-gradient(135deg, #060771 0%, #0a0ba3 50%, #03044a 100%)",
  "linear-gradient(135deg, #03044a 0%, #bf1a1a 40%, #060771 100%)",
  "linear-gradient(135deg, #060771 0%, #03044a 60%, rgba(255,108,12,0.12) 100%)",
];

function NavCol({
  item,
  direction,
  label,
  shouldReduce,
}: {
  item: NavItem;
  direction: "prev" | "next";
  label: string;
  shouldReduce: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isPrev = direction === "prev";
  const gradient = PREVIEW_GRADIENTS[item.projectIndex % PREVIEW_GRADIENTS.length];

  return (
    <Link
      href={`/projeler/${item.slug}`}
      style={{ textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient preview — fades in on hover */}
      <AnimatePresence>
        {hovered && !shouldReduce && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: gradient,
              opacity: 0.18,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "56px 0 48px",
          textAlign: isPrev ? "left" : "right",
        }}
      >
        {/* Direction label */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: hovered ? "rgba(255,251,243,0.55)" : "rgba(255,251,243,0.3)",
            marginBottom: 16,
            transition: "color 200ms ease",
          }}
        >
          {isPrev ? `← ${label}` : `${label} →`}
        </p>

        {/* Industry label */}
        <p
          className="text-label"
          style={{
            color: hovered ? "rgba(255,251,243,0.5)" : "rgba(255,251,243,0.28)",
            marginBottom: 12,
            letterSpacing: "0.1em",
            transition: "color 200ms ease",
          }}
        >
          {String(item.projectIndex + 1).padStart(2, "0")} — {item.industry}
        </p>

        {/* Project name — clip-path reveal */}
        <div style={{ overflow: "hidden" }}>
          <motion.p
            animate={shouldReduce ? {} : { x: hovered ? (isPrev ? -4 : 4) : 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.4vw, 36px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: hovered ? "rgba(255,251,243,0.95)" : "rgba(255,251,243,0.7)",
              transition: "color 200ms ease",
              margin: 0,
            }}
          >
            {item.name}
          </motion.p>
        </div>

        {/* Orange underline accent on hover */}
        <motion.div
          aria-hidden="true"
          animate={shouldReduce ? {} : { width: hovered ? (isPrev ? "100%" : "100%") : "0%" }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          style={{
            height: 1,
            backgroundColor: "var(--color-action)",
            marginTop: 20,
            opacity: 0.6,
            marginLeft: isPrev ? 0 : "auto",
            transformOrigin: isPrev ? "left" : "right",
          }}
        />
      </div>
    </Link>
  );
}

export default function CaseNavigation({ prev, next, labels }: Props) {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section
      aria-label="Project navigation"
      style={{
        backgroundColor: "var(--color-authority-deep)",
        borderTop: "1px solid rgba(255,251,243,0.06)",
      }}
    >
      <div className="container-site">
        {/* Prev / Next grid */}
        <div className="case-proj-nav">
          {prev ? (
            <NavCol
              item={{ ...prev, projectIndex: prev.projectIndex }}
              direction="prev"
              label={labels.prevProject}
              shouldReduce={shouldReduce}
            />
          ) : (
            <div />
          )}

          {/* Vertical divider */}
          <div
            aria-hidden="true"
            style={{
              width: 1,
              backgroundColor: "rgba(255,251,243,0.07)",
              alignSelf: "stretch",
            }}
          />

          {next ? (
            <NavCol
              item={{ ...next, projectIndex: next.projectIndex }}
              direction="next"
              label={labels.nextProject}
              shouldReduce={shouldReduce}
            />
          ) : (
            <div />
          )}
        </div>

        {/* All projects link */}
        <div
          style={{
            borderTop: "1px solid rgba(255,251,243,0.06)",
            paddingTop: 28,
            paddingBottom: 48,
            textAlign: "center",
          }}
        >
          <Link
            href="/projeler"
            className="case-all-link"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,251,243,0.3)",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
          >
            ← {labels.backToWork}
          </Link>
        </div>
      </div>

      <style>{`
        .case-proj-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0 48px;
        }
        .case-all-link:hover { color: rgba(255,251,243,0.7) !important; }
        @media (max-width: 767px) {
          .case-proj-nav {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .case-proj-nav > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

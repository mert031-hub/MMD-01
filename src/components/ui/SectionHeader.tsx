"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

interface SectionHeaderProps {
  number: string;
  title: string;
  descriptor: string;
  light?: boolean;
}

export default function SectionHeader({
  number,
  title,
  descriptor,
  light = false,
}: SectionHeaderProps) {
  const shouldReduce = useReducedMotion() ?? false;
  const textColor = light
    ? "var(--color-text-inverse)"
    : "var(--color-authority)";
  const secondaryColor = light
    ? "rgba(255,251,243,0.55)"
    : "var(--color-text-secondary)";

  return (
    <div style={{ marginBottom: 72, position: "relative" }}>
      {/* Number + expanding line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <motion.span
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--color-action)",
            lineHeight: 1,
          }}
        >
          {number}
        </motion.span>

        {/* Expanding accent line */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
          style={{
            height: 1,
            width: 40,
            backgroundColor: light
              ? "rgba(255,251,243,0.2)"
              : "var(--color-border-strong)",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Title — clip-path reveal from below */}
      <div style={{ overflow: "hidden", marginBottom: 16 }}>
        <motion.h2
          initial={shouldReduce ? {} : { y: "105%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.5vw, 40px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: textColor,
            margin: 0,
          }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Descriptor — fade up last */}
      <motion.p
        initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          lineHeight: 1.65,
          color: secondaryColor,
          maxWidth: 400,
          margin: 0,
        }}
      >
        {descriptor}
      </motion.p>
    </div>
  );
}

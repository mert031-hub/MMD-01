"use client";

import { motion } from "framer-motion";

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
  const textColor = light ? "var(--color-text-inverse)" : "var(--color-authority)";
  const secondaryColor = light ? "rgba(255,251,243,0.6)" : "var(--color-text-secondary)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      style={{ marginBottom: 64 }}
    >
      <p
        className="text-label"
        style={{ color: "var(--color-action)", marginBottom: 12 }}
      >
        {number}
      </p>
      <h2
        className="text-h2"
        style={{ color: textColor, marginBottom: 8 }}
      >
        {title}
      </h2>
      <p
        className="text-body-sm"
        style={{ color: secondaryColor, maxWidth: 400 }}
      >
        {descriptor}
      </p>
    </motion.div>
  );
}

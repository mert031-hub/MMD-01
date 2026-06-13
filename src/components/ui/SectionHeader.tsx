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
  const textColor = light
    ? "var(--color-text-inverse)"
    : "var(--color-authority)";
  const secondaryColor = light
    ? "rgba(255,251,243,0.6)"
    : "var(--color-text-secondary)";

  return (
    <div style={{ marginBottom: 64 }}>
      {/* Number label — fade up first */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="text-label"
        style={{ color: "var(--color-action)", marginBottom: 12 }}
      >
        {number}
      </motion.p>

      {/* Title — clip-path reveal from below */}
      <div style={{ overflow: "hidden" }}>
        <motion.h2
          initial={{ y: "105%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT }}
          className="text-h2"
          style={{ color: textColor, marginBottom: 8 }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Descriptor — fade up last */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
        className="text-body-sm"
        style={{ color: secondaryColor, maxWidth: 400 }}
      >
        {descriptor}
      </motion.p>
    </div>
  );
}

"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ReadingProgress() {
  const shouldReduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  if (shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "var(--color-action)",
        transformOrigin: "left",
        zIndex: 50,
        opacity: 0.75,
      }}
    />
  );
}

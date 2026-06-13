"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const THRESHOLD = 600;

export default function BackToTop() {
  const shouldReduce = useReducedMotion() ?? false;
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > THRESHOLD);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? {} : { opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          aria-label={locale === "tr" ? "Sayfanın başına dön" : "Back to top"}
          style={{
            position: "fixed",
            bottom: 88,
            right: 24,
            zIndex: 88,
            width: 40,
            height: 40,
            backgroundColor: "var(--color-authority)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(6,7,113,0.18), 0 1px 4px rgba(6,7,113,0.10)",
            transition: "background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-action)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,108,12,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-authority)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(6,7,113,0.18), 0 1px 4px rgba(6,7,113,0.10)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 11V3M3 7l4-4 4 4"
              stroke="#fffbf3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

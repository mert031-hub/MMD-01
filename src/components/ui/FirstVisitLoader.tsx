"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const STORAGE_KEY = "mm-first-visited";

export default function FirstVisitLoader() {
  const shouldReduce = useReducedMotion() ?? false;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (shouldReduce) {
      localStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    const alreadyVisited = localStorage.getItem(STORAGE_KEY);
    if (alreadyVisited) return;

    let timerId: ReturnType<typeof setTimeout>;

    const rafId = requestAnimationFrame(() => {
      setShow(true);
      timerId = setTimeout(() => {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, "1");
      }, 1400);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [shouldReduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="first-visit-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10001,
            backgroundColor: "var(--color-authority-deep)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Logotype text */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#ffffff",
                userSelect: "none",
              }}
            >
              MMDESIGN
            </motion.span>

            {/* Orange accent line growing from 0 to 48px */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT }}
              style={{
                height: 1,
                backgroundColor: "var(--color-action)",
                borderRadius: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

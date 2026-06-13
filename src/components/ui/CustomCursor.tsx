"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

type CursorState = "default" | "link" | "button" | "project";

function subscribePointerFine(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getPointerFineSnapshot = () => window.matchMedia("(pointer: fine)").matches;
const getPointerFineServerSnapshot = () => false;

export default function CustomCursor() {
  const shouldReduce = useReducedMotion() ?? false;
  const locale = useLocale();

  const isPointerFine = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot
  );

  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!isPointerFine || shouldReduce) return;

    document.documentElement.classList.add("cursor-active");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as Element;
      if (target.closest(".work-index-row")) {
        setCursorState("project");
      } else if (target.closest("button, [role='button']")) {
        setCursorState("button");
      } else if (target.closest("a, [role='link']")) {
        setCursorState("link");
      } else {
        setCursorState("default");
      }
    };

    const onLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isPointerFine, shouldReduce, mouseX, mouseY]);

  if (!isPointerFine || shouldReduce) return null;

  const ringSize =
    cursorState === "project" ? 48
    : cursorState === "button" ? 40
    : cursorState === "link" ? 34
    : 26;

  const viewLabel = locale === "tr" ? "Gör" : "View";

  return (
    <>
      {/* Dot — follows cursor instantly */}
      <motion.div
        aria-hidden="true"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "var(--color-authority)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      />

      {/* Ring — spring lag */}
      <motion.div
        aria-hidden="true"
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? (cursorState === "default" ? 0.5 : 0.8) : 0,
          borderColor:
            cursorState === "project"
              ? "var(--color-action)"
              : "var(--color-authority)",
        }}
        transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1.5px solid var(--color-authority)",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* "View"/"Gör" label inside ring on project rows */}
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-action)",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {viewLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

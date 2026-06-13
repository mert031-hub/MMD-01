"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion() ?? false;

  if (shouldReduce) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

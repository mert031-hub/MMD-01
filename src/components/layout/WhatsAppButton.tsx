"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { waUrl } from "@/lib/whatsapp";

const SCROLL_THRESHOLD = 480;
const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  // Show after scroll threshold
  useEffect(() => {
    const check = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Hide when the main contact section is visible — avoids duplication
  useEffect(() => {
    const ctaEl = document.getElementById("iletisim");
    if (!ctaEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(ctaEl);
    return () => observer.disconnect();
  }, []);

  const show = visible && !ctaInView;
  const label = locale === "tr" ? "Projenizi Konuşalım" : "Let's Talk";

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("label")}
          initial={shouldReduce ? {} : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduce ? {} : { opacity: 0, x: 12 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          style={{
            position: "fixed",
            bottom: "max(28px, env(safe-area-inset-bottom, 28px))",
            right: 24,
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            gap: 9,
            backgroundColor: "var(--color-authority)",
            color: "rgba(255,251,243,0.9)",
            padding: "11px 18px 11px 14px",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow:
              "0 4px 20px rgba(6,7,113,0.2), 0 1px 4px rgba(6,7,113,0.10)",
            transition:
              "background-color 200ms ease, box-shadow 200ms ease, transform 150ms ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-action)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 28px rgba(255,108,12,0.22), 0 2px 8px rgba(255,108,12,0.10)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-authority)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(6,7,113,0.2), 0 1px 4px rgba(6,7,113,0.10)";
          }}
        >
          {/* WhatsApp icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            style={{ flexShrink: 0, opacity: 0.8 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {label}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

type StageDetail = {
  number: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
};

const STAGES_TR: StageDetail[] = [
  {
    number: "01",
    title: "Keşif",
    duration: "1–3 gün",
    summary: "Projenin temelini atıyoruz. Sektörünüzü, hedef kitlenizi ve rakiplerinizi analiz ederek tasarımın neyi çözmesi gerektiğini netleştiriyoruz.",
    deliverables: [
      "Sektör ve rakip analizi",
      "Hedef kitle profili",
      "İçerik ve sayfa yapısı haritası",
      "Teknik gereksinimler listesi",
    ],
  },
  {
    number: "02",
    title: "Tasarım",
    duration: "5–10 gün",
    summary: "Marka kimliğinizi yansıtan, dönüşüme odaklı bir tasarım sistemi oluşturuyoruz. Her karar estetikten önce işlevsel bir gerekçeye dayanır.",
    deliverables: [
      "Renk, tipografi ve ikon sistemi",
      "Ana sayfa ve kritik sayfa wireframe'leri",
      "Yüksek çözünürlüklü UI tasarımları",
      "Mobil ve masaüstü versiyonlar",
    ],
  },
  {
    number: "03",
    title: "Geliştirme",
    duration: "7–14 gün",
    summary: "Tasarımı hızlı, erişilebilir ve arama motorlarına uyumlu bir şekilde koda dönüştürüyoruz. Şablon yok; her satır bu projeye özel.",
    deliverables: [
      "Mobil öncelikli, responsive yapı",
      "Core Web Vitals optimizasyonu",
      "SEO teknik altyapısı",
      "İçerik yönetim sistemi entegrasyonu",
    ],
  },
  {
    number: "04",
    title: "Lansman",
    duration: "1–2 gün",
    summary: "Canlıya geçmeden önce her detayı test ediyoruz. Lansman sonrasında 30 gün boyunca destek sunuyoruz.",
    deliverables: [
      "Çapraz tarayıcı ve cihaz testi",
      "Domain ve SSL kurulumu",
      "Analitik ve dönüşüm takibi",
      "30 gün lansman sonrası destek",
    ],
  },
];

const STAGES_EN: StageDetail[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "1–3 days",
    summary: "We lay the foundation. By analysing your industry, audience and competitors, we clarify exactly what the design needs to solve.",
    deliverables: [
      "Industry & competitor analysis",
      "Target audience profile",
      "Content & sitemap architecture",
      "Technical requirements list",
    ],
  },
  {
    number: "02",
    title: "Design",
    duration: "5–10 days",
    summary: "We build a design system that reflects your brand and drives conversion. Every decision is grounded in function before aesthetics.",
    deliverables: [
      "Colour, typography & icon system",
      "Homepage & key-page wireframes",
      "High-fidelity UI designs",
      "Mobile & desktop versions",
    ],
  },
  {
    number: "03",
    title: "Build",
    duration: "7–14 days",
    summary: "We turn design into fast, accessible, search-engine-ready code. No templates — every line is written for this project.",
    deliverables: [
      "Mobile-first, responsive build",
      "Core Web Vitals optimisation",
      "SEO technical foundation",
      "CMS integration",
    ],
  },
  {
    number: "04",
    title: "Launch",
    duration: "1–2 days",
    summary: "We test every detail before going live and provide 30 days of post-launch support.",
    deliverables: [
      "Cross-browser & device testing",
      "Domain & SSL setup",
      "Analytics & conversion tracking",
      "30-day post-launch support",
    ],
  },
];

function StagePanel({
  stage,
  isOpen,
  onToggle,
  shouldReduce,
}: {
  stage: StageDetail;
  isOpen: boolean;
  onToggle: () => void;
  shouldReduce: boolean;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "28px 0",
          display: "grid",
          gridTemplateColumns: "48px 1fr auto",
          gap: "0 24px",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: isOpen ? "#ff6c0c" : "var(--color-text-tertiary)",
            transition: "color 200ms ease",
          }}
        >
          {stage.number}
        </span>

        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 1.8vw, 26px)",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: isOpen ? "var(--color-authority)" : "var(--color-text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {stage.title}
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: "var(--color-action)",
              opacity: isOpen ? 1 : 0.6,
              transition: "opacity 200ms ease",
              whiteSpace: "nowrap" as const,
            }}
          >
            {stage.duration}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 280ms cubic-bezier(0,0,0.2,1)",
              flexShrink: 0,
            }}
          >
            <path
              d="M8 3v10M3 8h10"
              stroke={isOpen ? "#ff6c0c" : "var(--color-text-tertiary)"}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 64px",
                paddingBottom: 40,
                paddingLeft: 72,
              }}
              className="process-detail-inner"
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {stage.summary}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {stage.deliverables.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "#ff6c0c",
                        flexShrink: 0,
                        marginTop: 5,
                        display: "block",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProcessDetail({ isTr }: { isTr: boolean }) {
  const shouldReduce = useReducedMotion() ?? false;
  const stages = isTr ? STAGES_TR : STAGES_EN;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
      aria-label={isTr ? "Aşama detayları" : "Stage details"}
    >
      <div className="container-site">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="text-label"
          style={{ color: "var(--color-action)", marginBottom: 16 }}
        >
          {isTr ? "Her aşamada ne elde edersiniz?" : "What do you get at each stage?"}
        </motion.p>

        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.2vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--color-authority)",
            marginBottom: 56,
          }}
        >
          {isTr ? "Şeffaf süreç, net çıktılar." : "Transparent process, clear outputs."}
        </motion.h2>

        <div>
          {stages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={shouldReduce ? {} : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_OUT }}
            >
              <StagePanel
                stage={stage}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                shouldReduce={shouldReduce}
              />
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid var(--color-border)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .process-detail-inner {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

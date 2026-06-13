"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* ─── PROJECT MOCKUPS ────────────────────────────────────────── */

function EngineeringMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(6,7,113,0.1)",
        boxShadow: "0 8px 40px rgba(6,7,113,0.12), 0 2px 8px rgba(6,7,113,0.06)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Nav */}
      <div
        style={{
          backgroundColor: "#070829",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid rgba(255,108,12,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#ff6c0c",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                border: "1.5px solid #fffbf3",
                borderRadius: 1,
              }}
            />
          </div>
          <div
            style={{
              width: 60,
              height: 7,
              backgroundColor: "rgba(255,251,243,0.75)",
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {[36, 44, 36, 50].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 5,
                backgroundColor: "rgba(255,251,243,0.25)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          backgroundColor: "#07091f",
          padding: "36px 24px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${i * 25}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(255,108,12,0.06)",
            }}
          />
        ))}
        <div
          style={{
            fontSize: 9,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            marginBottom: 10,
            position: "relative",
          }}
        >
          Pi-Lot Engineering
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "#fffbf3",
            marginBottom: 4,
            position: "relative",
          }}
        >
          Precision
          <br />
          Engineering.
        </div>
        <div
          style={{
            width: 28,
            height: 1.5,
            backgroundColor: "#ff6c0c",
            marginBottom: 12,
            position: "relative",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginBottom: 16,
            position: "relative",
          }}
        >
          {[88, 72, 56].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 4,
                backgroundColor: "rgba(255,251,243,0.15)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "1px solid rgba(255,108,12,0.5)",
            padding: "6px 12px",
            fontSize: 7.5,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ff6c0c",
            position: "relative",
          }}
        >
          Projelerimiz
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1.5 4h5M4.5 2l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          backgroundColor: "#0b0d2a",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid rgba(255,108,12,0.1)",
        }}
      >
        {["15+ Proje", "8 Sektör", "2018'den"].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "12px 14px",
              borderRight:
                i < 2 ? "1px solid rgba(255,108,12,0.1)" : "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 8,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                color: "rgba(255,251,243,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              {stat}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(6,7,113,0.1)",
        boxShadow: "0 8px 40px rgba(6,7,113,0.12), 0 2px 8px rgba(6,7,113,0.06)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Nav */}
      <div
        style={{
          backgroundColor: "rgba(255,251,243,0.95)",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          borderBottom: "1px solid rgba(6,7,113,0.08)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#060771",
          }}
        >
          KALEİÇİ
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {[32, 36, 28].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 5,
                backgroundColor: "rgba(6,7,113,0.15)",
                borderRadius: 1,
              }}
            />
          ))}
          <div
            style={{
              backgroundColor: "#ff6c0c",
              padding: "4px 8px",
              fontSize: 7,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fffbf3",
            }}
          >
            Rezervasyon
          </div>
        </div>
      </div>

      {/* Full-image hero area */}
      <div
        style={{
          height: 140,
          background:
            "linear-gradient(160deg, #c4a882 0%, #9c7a52 40%, #6b4f2a 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 20px 18px",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(6,7,113,0.55) 0%, transparent 60%)",
          }}
        />
        {/* Subtle arch/detail */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            width: 40,
            height: 60,
            border: "1.5px solid rgba(255,251,243,0.2)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#fffbf3",
              marginBottom: 4,
            }}
          >
            200 yıllık
            <br />
            bir miras.
          </div>
          <div
            style={{
              width: 24,
              height: 1.5,
              backgroundColor: "#ff6c0c",
            }}
          />
        </div>
      </div>

      {/* Room cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1,
          backgroundColor: "rgba(6,7,113,0.06)",
        }}
      >
        {["Standart", "Deluxe", "Suite"].map((room, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#fffbf3",
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 32,
                backgroundColor: i === 2 ? "#060771" : "rgba(196,168,130,0.25)",
                borderRadius: 2,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                fontSize: 8,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: 3,
              }}
            >
              {room}
            </div>
            <div
              style={{
                width: "70%",
                height: 3,
                backgroundColor: "rgba(6,7,113,0.1)",
                borderRadius: 1,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(6,7,113,0.1)",
        boxShadow: "0 8px 40px rgba(6,7,113,0.12), 0 2px 8px rgba(6,7,113,0.06)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Nav */}
      <div
        style={{
          backgroundColor: "#060771",
          height: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: "#ff6c0c",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 64,
              height: 6,
              backgroundColor: "rgba(255,251,243,0.8)",
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[32, 40, 32, 44].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 5,
                backgroundColor: "rgba(255,251,243,0.3)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Split hero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
        }}
      >
        {/* Left text */}
        <div
          style={{
            backgroundColor: "#fffbf3",
            padding: "28px 20px 24px",
            borderRight: "1px solid rgba(6,7,113,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 8,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ff6c0c",
              marginBottom: 8,
            }}
          >
            Kocyiğit Trade
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#060771",
              marginBottom: 6,
            }}
          >
            Güvenilir
            <br />
            Ticaret.
          </div>
          <div
            style={{
              width: 24,
              height: 1.5,
              backgroundColor: "#ff6c0c",
              marginBottom: 10,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginBottom: 14,
            }}
          >
            {[90, 76, 60].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}%`,
                  height: 4,
                  backgroundColor: "rgba(6,7,113,0.08)",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "inline-flex",
              gap: 8,
            }}
          >
            <div
              style={{
                backgroundColor: "#060771",
                padding: "5px 10px",
                fontSize: 7,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fffbf3",
              }}
            >
              İletişim
            </div>
            <div
              style={{
                border: "1px solid rgba(6,7,113,0.2)",
                padding: "5px 10px",
                fontSize: 7,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "rgba(6,7,113,0.6)",
              }}
            >
              Katalog
            </div>
          </div>
        </div>

        {/* Right metrics */}
        <div
          style={{
            backgroundColor: "#fff7e8",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[
            { label: "Ürün Kategorisi", val: 80 },
            { label: "Aktif Müşteri", val: 65 },
            { label: "Yıllık Deneyim", val: 90 },
          ].map(({ label, val }) => (
            <div key={label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 7,
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    color: "rgba(6,7,113,0.6)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 7,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    color: "#060771",
                  }}
                >
                  {val}%
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  backgroundColor: "rgba(6,7,113,0.08)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${val}%`,
                    height: "100%",
                    backgroundColor: val > 75 ? "#060771" : "#ff6c0c",
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner strip */}
      <div
        style={{
          backgroundColor: "#fffbf3",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderTop: "1px solid rgba(6,7,113,0.06)",
        }}
      >
        <span
          style={{
            fontSize: 7,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(6,7,113,0.35)",
          }}
        >
          Ortaklar
        </span>
        {[48, 40, 52, 36].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 8,
              backgroundColor: "rgba(6,7,113,0.08)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── PROJECT VISUALS ────────────────────────────────────────── */

const MOCKUPS = {
  pilotEngineering: EngineeringMockup,
  kaleichiHotel: HotelMockup,
  kocyigitTrade: TradeMockup,
} as const;

type ProjectKey = keyof typeof MOCKUPS;

const DESKTOP_IMAGES: Record<ProjectKey, string> = {
  pilotEngineering: "/projects/pi-lot/desktop.png",
  kaleichiHotel: "/projects/kaleici-hotel/desktop.png",
  kocyigitTrade: "/projects/kocyigit-trade/desktop.png",
};

function ProjectVisual({
  projectId,
}: {
  projectId: ProjectKey;
}) {
  const [failed, setFailed] = useState(false);
  const FallbackComponent = MOCKUPS[projectId];

  if (failed) {
    return <FallbackComponent />;
  }

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(6,7,113,0.1)",
        boxShadow:
          "0 8px 40px rgba(6,7,113,0.12), 0 2px 8px rgba(6,7,113,0.06)",
        position: "relative",
        aspectRatio: "16 / 10",
      }}
    >
      <Image
        src={DESKTOP_IMAGES[projectId]}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 45vw"
        style={{ objectFit: "cover", objectPosition: "top center" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* ─── PROJECT SPREAD ─────────────────────────────────────────── */

interface Project {
  id: ProjectKey;
  industryKey: string;
  nameKey: string;
  transformationKey: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    id: "pilotEngineering",
    industryKey: "work.projects.pilotEngineering.industry",
    nameKey: "work.projects.pilotEngineering.name",
    transformationKey: "work.projects.pilotEngineering.transformation",
    href: "/projeler/pi-lot-engineering",
  },
  {
    id: "kaleichiHotel",
    industryKey: "work.projects.kaleichiHotel.industry",
    nameKey: "work.projects.kaleichiHotel.name",
    transformationKey: "work.projects.kaleichiHotel.transformation",
    href: "/projeler/kaleici-hotel",
  },
  {
    id: "kocyigitTrade",
    industryKey: "work.projects.kocyigitTrade.industry",
    nameKey: "work.projects.kocyigitTrade.name",
    transformationKey: "work.projects.kocyigitTrade.transformation",
    href: "/projeler/kocyigit-trade",
  },
];

/* ─── TRANSLATED PROJECT SPREAD ─────────────────────────────── */

function TranslatedProjectSpread({
  project,
  index,
  shouldReduce,
}: {
  project: Project;
  index: number;
  shouldReduce: boolean;
}) {
  const t = useTranslations();
  const reversed = index % 2 === 1;

  const projectId = project.id;
  const industry = t(`work.projects.${projectId}.industry` as Parameters<typeof t>[0]);
  const name = t(`work.projects.${projectId}.name` as Parameters<typeof t>[0]);
  const transformation = t(`work.projects.${projectId}.transformation` as Parameters<typeof t>[0]);
  const viewProjectLabel = t("work.viewProject");
  const textMotion = {
    initial: shouldReduce ? {} : { opacity: 0, x: reversed ? 24 : -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true as const, margin: "-80px" },
    transition: { duration: 0.6, ease: EASE_OUT },
  };

  const mockupMotion = {
    initial: shouldReduce ? {} : { opacity: 0, x: reversed ? -24 : 24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true as const, margin: "-80px" },
    transition: { duration: 0.6, delay: 0.1, ease: EASE_OUT },
  };

  const textBlock = (
    <motion.div
      {...textMotion}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        className="text-label"
        style={{ color: "var(--color-action)", marginBottom: 16 }}
      >
        {industry}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(24px, 2.8vw, 44px)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-authority)",
          marginBottom: 20,
        }}
      >
        {name}
      </h3>
      <div
        style={{
          width: 40,
          height: 2,
          backgroundColor: "var(--color-action)",
          marginBottom: 20,
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 1.4vw, 18px)",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
          maxWidth: 360,
          marginBottom: 36,
        }}
      >
        {transformation}
      </p>
      <Link
        href={project.href}
        aria-label={`${viewProjectLabel}: ${name}`}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 13,
          color: "var(--color-authority)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          letterSpacing: "-0.01em",
          transition: "color 150ms ease, border-color 150ms ease",
          alignSelf: "flex-start",
          paddingBottom: 2,
          borderBottom: "1px solid rgba(6,7,113,0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--color-action)";
          (e.currentTarget.style as CSSStyleDeclaration).borderBottomColor = "var(--color-action)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--color-authority)";
          (e.currentTarget.style as CSSStyleDeclaration).borderBottomColor = "rgba(6,7,113,0.2)";
        }}
      >
        {viewProjectLabel}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 6h8M6.5 2.5l3.5 3.5-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.div>
  );

  const mockupBlock = (
    <motion.div {...mockupMotion} style={{ width: "100%" }}>
      <ProjectVisual projectId={project.id} />
    </motion.div>
  );

  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <div
        className="project-spread-grid"
        style={{
          display: "grid",
          gridTemplateColumns: reversed ? "4fr 5fr" : "5fr 4fr",
          gap: "48px 64px",
          alignItems: "center",
        }}
      >
        {reversed ? (
          <>
            {textBlock}
            {mockupBlock}
          </>
        ) : (
          <>
            {mockupBlock}
            {textBlock}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── WORK PREVIEW ───────────────────────────────────────────── */

export default function WorkPreview() {
  const t = useTranslations("work");
  const locale = useLocale();
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section
      id="projeler"
      aria-label={locale === "tr" ? "Seçili Projeler" : "Selected Work"}
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="container-site">
        <SectionHeader
          number={t("sectionNumber")}
          title={t("sectionTitle")}
          descriptor={t("sectionDescriptor")}
        />

        <div>
          {PROJECTS.map((project, index) => (
            <TranslatedProjectSpread
              key={project.id}
              project={project}
              index={index}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 48,
            textAlign: "center",
          }}
        >
          <Link
            href="/projeler"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--color-authority)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              letterSpacing: "-0.01em",
              transition: "color 150ms ease",
              paddingBottom: 2,
              borderBottom: "1px solid rgba(6,7,113,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-action)";
              (e.currentTarget.style as CSSStyleDeclaration).borderBottomColor = "var(--color-action)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-authority)";
              (e.currentTarget.style as CSSStyleDeclaration).borderBottomColor = "rgba(6,7,113,0.2)";
            }}
          >
            {t("viewAll")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M7.5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

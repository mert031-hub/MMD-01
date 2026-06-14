"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

type CapabilityKey =
  | "websiteDesign"
  | "brandExperience"
  | "conversionOptimization"
  | "uiSystems"
  | "performance"
  | "seoFoundations"
  | "digitalConsulting";

const CAPABILITY_KEYS: CapabilityKey[] = [
  "websiteDesign",
  "brandExperience",
  "conversionOptimization",
  "uiSystems",
  "performance",
  "seoFoundations",
  "digitalConsulting",
];

const CAPABILITY_ICONS: Record<CapabilityKey, React.ReactNode> = {
  websiteDesign: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 17.5h7M10 14.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M5 7.5h5M5 10h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45"/>
    </svg>
  ),
  brandExperience: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l2.2 5h5L13.5 10l1.8 5L10 12.5 4.7 15l1.8-5L2.8 7h5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  conversionOptimization: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 14L7.5 8.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17.5h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  ),
  uiSystems: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  performance: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 2.5L4.5 11h6l-2 6.5L17 9h-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  seoFoundations: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M13.5 13.5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  digitalConsulting: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 3.5v3M10 13.5v3M3.5 10h3M13.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

const PARTICLES = [
  { left: "6%", top: "8%" },
  { left: "19%", top: "68%" },
  { left: "38%", top: "24%" },
  { left: "55%", top: "81%" },
  { left: "70%", top: "17%" },
  { left: "83%", top: "55%" },
  { left: "91%", top: "90%" },
  { left: "30%", top: "47%" },
];
const PARTICLE_SIZES = [1.5, 1, 2, 1.5, 1, 2, 1, 1.5];
const PARTICLE_DURATIONS = [10, 13, 8, 11, 14, 9, 12, 10];
const PARTICLE_DELAYS = [0, 2.5, 1, 3.5, 0.5, 4, 1.5, 2];

function parseNumber(str: string): number {
  return parseInt(str.replace(/\D/g, ""), 10) || 0;
}

function formatNumber(n: number, target: string): string {
  const digits = target.replace(/\D/g, "").length;
  return String(n).padStart(digits, "0");
}

function CapabilityItem({
  number,
  title,
  descriptor,
  icon,
  delay,
  shouldReduce,
}: {
  number: string;
  title: string;
  descriptor: string;
  icon: React.ReactNode;
  delay: number;
  shouldReduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(shouldReduce);
  const [active, setActive] = useState(shouldReduce);
  const [hovered, setHovered] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const sweepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const targetNum = parseNumber(number);
  const [displayNum, setDisplayNum] = useState(shouldReduce ? targetNum : 0);
  const countedRef = useRef(shouldReduce);

  /* number reveal — staggered independently */
  const numRevealedRef = useRef(shouldReduce);
  const numTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [numberVisible, setNumberVisible] = useState(shouldReduce);

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEntered(true);
            setActive(true);
            if (!countedRef.current) {
              countedRef.current = true;
              const total = 400;
              const steps = targetNum;
              if (steps <= 0) {
                setDisplayNum(targetNum);
              } else {
                const stepMs = Math.max(35, Math.floor(total / steps));
                let current = 0;
                const interval = setInterval(() => {
                  current += 1;
                  setDisplayNum(current);
                  if (current >= targetNum) clearInterval(interval);
                }, stepMs);
              }
            }
            if (!numRevealedRef.current) {
              numRevealedRef.current = true;
              numTimerRef.current = setTimeout(
                () => setNumberVisible(true),
                delay * 1000
              );
            }
          } else {
            setActive(false);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduce, targetNum, delay]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (!shouldReduce) {
      if (sweepTimer.current) clearTimeout(sweepTimer.current);
      setSweeping(true);
      sweepTimer.current = setTimeout(() => setSweeping(false), 700);
    }
  }, [shouldReduce]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  useEffect(() => {
    return () => {
      if (sweepTimer.current) clearTimeout(sweepTimer.current);
      if (numTimerRef.current) clearTimeout(numTimerRef.current);
    };
  }, []);

  const itemOpacity = !entered ? 0 : active ? 1 : 0.55;
  const itemTranslateY = !entered ? "12px" : "0px";
  const transitionStyle = entered ? "opacity 500ms ease, transform 500ms ease" : "none";

  /* number element transform */
  let numTransform: string;
  if (!numberVisible) {
    numTransform = "translateY(10px) scale(0.92)";
  } else if (active && !shouldReduce) {
    numTransform = "translateY(0) scale(1.05)";
  } else {
    numTransform = "translateY(0) scale(1)";
  }

  /* number color */
  const numColor = hovered
    ? "#ff6c0c"
    : active
    ? "rgba(255,108,12,0.88)"
    : "rgba(255,108,12,0.52)";

  /* node fill + glow */
  const nodeActive = active || hovered;

  const displayStr = formatNumber(displayNum, number);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 14,
        display: "grid",
        gridTemplateColumns: "54px 1fr",
        gap: "0 20px",
        alignItems: "start",
        cursor: "default",
        position: "relative",
        /* no overflow:hidden here — moved to inner sweep wrapper */
        opacity: itemOpacity,
        transform: `translateY(${itemTranslateY})`,
        transition: transitionStyle,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "var(--color-action)",
          transform: active ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 380ms cubic-bezier(0,0,0.2,1)",
        }}
      />

      {/* Hover gradient sweep — own overflow:hidden wrapper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,108,12,0.06) 50%, transparent 100%)",
            transform: sweeping ? "translateX(100%)" : "translateX(-100%)",
            transition: sweeping
              ? "transform 650ms cubic-bezier(0.0,0.0,0.2,1)"
              : "none",
          }}
        />
      </div>

      {/* Number column — node + number in flex row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          paddingTop: 3,
          position: "relative",
          zIndex: 2,
          userSelect: "none",
        }}
      >
        {/* Timeline node */}
        <div
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            flexShrink: 0,
            backgroundColor: nodeActive ? "#ff6c0c" : "transparent",
            border: `1.5px solid ${nodeActive ? "#ff6c0c" : "rgba(255,108,12,0.32)"}`,
            boxShadow: nodeActive && !shouldReduce
              ? "0 0 0 3px rgba(255,108,12,0.12)"
              : "none",
            transition:
              "background-color 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
          }}
        />

        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: numColor,
            display: "block",
            opacity: numberVisible ? 1 : 0,
            transform: numTransform,
            transition:
              "color 220ms ease, opacity 300ms ease, transform 300ms cubic-bezier(0,0,0.2,1)",
          }}
        >
          {displayStr}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          transform: hovered && !shouldReduce ? "translateX(6px)" : "translateX(0)",
          transition: "transform 200ms ease",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span
            style={{
              color: hovered ? "var(--color-action)" : "rgba(6,7,113,0.35)",
              transition: "color 200ms ease, transform 200ms ease",
              transform: hovered && !shouldReduce ? "scale(1.12)" : "scale(1)",
              transformOrigin: "left center",
              display: "flex",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.3,
              color: hovered ? "var(--color-action)" : "var(--color-authority)",
              marginBottom: 0,
              transition: "color 200ms ease",
            }}
          >
            {title}
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1.55,
            color: "var(--color-text-secondary)",
            margin: 0,
          }}
        >
          {descriptor}
        </p>
      </div>
    </div>
  );
}

const TWO_PI_R = 2 * Math.PI * 14;

function CenterSpine({ progress }: { progress: number }) {
  const [topLineH, setTopLineH] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTopLineH(56);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const dashOffset = TWO_PI_R * (1 - progress);
  const dotOpacity = progress > 0.05 ? 0.85 : 0.25;
  const showPulse = progress > 0.05;

  return (
    <div
      className="cap-spine"
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top line */}
      <div
        style={{
          width: 1,
          height: topLineH,
          backgroundColor: "var(--color-border)",
          transition: "height 600ms ease",
          flexShrink: 0,
        }}
      />

      {/* SVG ring */}
      <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
        {showPulse && (
          <>
            <div className="cap-pulse" />
            <div className="cap-pulse" />
          </>
        )}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="var(--color-action)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={TWO_PI_R}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 18 18)"
            style={{ transition: "stroke-dashoffset 350ms ease" }}
          />
          <circle
            cx="18"
            cy="18"
            r="2.5"
            fill="var(--color-action)"
            opacity={dotOpacity}
            style={{ transition: "opacity 350ms ease" }}
          />
        </svg>
      </div>

      {/* Bottom line */}
      <div
        style={{
          flex: 1,
          width: 1,
          backgroundColor: "var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${progress * 100}%`,
            background: "var(--color-action)",
            opacity: 0.45,
            transition: "height 350ms ease",
          }}
        />
      </div>
    </div>
  );
}

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const shouldReduce = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(shouldReduce ? 1 : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduce) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const entered = window.innerHeight - rect.top;
        const total = rect.height + window.innerHeight;
        const p = Math.min(1, Math.max(0, entered / total));
        setProgress(p);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduce]);

  const leftKeys = CAPABILITY_KEYS.slice(0, 4);
  const rightKeys = CAPABILITY_KEYS.slice(4);

  return (
    <>
      <style>{`
        .cap-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--color-action);
          opacity: 0;
          animation: capPulse 2s ease-out infinite;
        }
        .cap-pulse:nth-child(2) { animation-delay: 1s; }
        @keyframes capPulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          30% { opacity: 0.025; }
          70% { opacity: 0.015; }
        }
        .cap-spine { display: flex; flex-direction: column; align-items: center; }
        @media (max-width: 1023px) {
          .cap-spine { display: none !important; }
          .capabilities-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="hizmetler"
        aria-label="Hizmetler ve Yetenekler"
        className="section-padding"
        style={{
          backgroundColor: "var(--color-bg-surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background particles */}
        <div
          className="cap-particles"
          aria-hidden="true"
          data-reduced={shouldReduce}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
        >
          {!shouldReduce &&
            PARTICLES.map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  width: PARTICLE_SIZES[i],
                  height: PARTICLE_SIZES[i],
                  borderRadius: "50%",
                  backgroundColor: "var(--color-authority)",
                  pointerEvents: "none",
                  animation: `particleDrift ${PARTICLE_DURATIONS[i]}s ease-in-out ${PARTICLE_DELAYS[i]}s infinite`,
                }}
              />
            ))}
        </div>

        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeader
            number={t("sectionNumber")}
            title={t("sectionTitle")}
            descriptor={t("sectionDescriptor")}
          />

          {/* Grid wrapper with spine */}
          <div style={{ position: "relative" }}>
            <CenterSpine progress={progress} />

            <div
              className="capabilities-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 80px",
              }}
            >
              {/* Left column — items 0-3 */}
              <div>
                {leftKeys.map((key, i) => {
                  const item = t.raw(`items.${key}`) as {
                    number: string;
                    title: string;
                    descriptor: string;
                  };
                  return (
                    <CapabilityItem
                      key={key}
                      number={item.number}
                      title={item.title}
                      descriptor={item.descriptor}
                      icon={CAPABILITY_ICONS[key]}
                      delay={i * 0.07}
                      shouldReduce={shouldReduce}
                    />
                  );
                })}
                <div style={{ borderTop: "1px solid var(--color-border)" }} />
              </div>

              {/* Right column — items 4-6 */}
              <div>
                {rightKeys.map((key, i) => {
                  const item = t.raw(`items.${key}`) as {
                    number: string;
                    title: string;
                    descriptor: string;
                  };
                  return (
                    <CapabilityItem
                      key={key}
                      number={item.number}
                      title={item.title}
                      descriptor={item.descriptor}
                      icon={CAPABILITY_ICONS[key]}
                      delay={(i + 2) * 0.07}
                      shouldReduce={shouldReduce}
                    />
                  );
                })}
                <div style={{ borderTop: "1px solid var(--color-border)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

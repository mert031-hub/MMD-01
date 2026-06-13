"use client";

import { useState, useCallback } from "react";
import { useEffect } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  liveUrl?: string;
  sizes?: string;
};

export default function ProjectScreenshot({ src, alt, liveUrl, sizes }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const open = useCallback(() => setLightboxOpen(true), []);
  const close = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, close]);

  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <>
      {/* Browser chrome + screenshot */}
      <div
        style={{
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 16px 64px rgba(6,7,113,0.18), 0 2px 8px rgba(6,7,113,0.08)",
          cursor: "zoom-in",
        }}
        onClick={open}
        role="button"
        tabIndex={0}
        aria-label={`${alt} — tam ekranda görüntüle`}
        onKeyDown={(e) => e.key === "Enter" && open()}
        className="project-screenshot-shell"
      >
        {/* Browser chrome bar */}
        <div
          style={{
            backgroundColor: "#f0ece3",
            borderBottom: "1px solid rgba(6,7,113,0.08)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Traffic light dots */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#ffbd2e",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#28ca41",
              }}
            />
          </div>

          {/* URL bar */}
          {displayUrl && (
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(6,7,113,0.05)",
                borderRadius: 4,
                padding: "4px 10px",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "rgba(6,7,113,0.45)",
                letterSpacing: "0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 320,
                margin: "0 auto",
              }}
            >
              {displayUrl}
            </div>
          )}

          {/* Expand hint */}
          <div
            aria-hidden="true"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-body)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(6,7,113,0.28)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Zoom
          </div>
        </div>

        {/* Screenshot image */}
        <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(max-width: 767px) 100vw, (max-width: 1280px) 80vw, 960px"}
            style={{ objectFit: "cover", objectPosition: "top center" }}
            priority
          />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10002,
            backgroundColor: "rgba(3,4,74,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Kapat"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "rgba(255,251,243,0.6)",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 150ms ease",
            }}
            className="lb-close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            ESC
          </button>

          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 1200,
              maxHeight: "88vh",
              aspectRatio: "16 / 10",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 32px 96px rgba(0,0,0,0.6)",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      )}

      <style>{`
        .project-screenshot-shell:hover {
          box-shadow: 0 20px 72px rgba(6,7,113,0.22), 0 4px 12px rgba(6,7,113,0.10) !important;
        }
        .lb-close:hover {
          color: rgba(255,251,243,0.95) !important;
        }
      `}</style>
    </>
  );
}

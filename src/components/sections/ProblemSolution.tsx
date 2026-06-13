"use client";

import { useReducedMotion, motion } from "framer-motion";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

type Row = {
  problemTr: string;
  problemEn: string;
  solutionTitleTr: string;
  solutionTitleEn: string;
  solutionDescTr: string;
  solutionDescEn: string;
};

const ROWS: Row[] = [
  {
    problemTr: "Web siteniz var, ama müşteri getirmiyor.",
    problemEn: "You have a website, but it's not bringing clients.",
    solutionTitleTr: "Strateji önce, tasarım sonra.",
    solutionTitleEn: "Strategy first, design second.",
    solutionDescTr:
      "Ziyaretçinin nasıl düşündüğünü anlamadan yapılan tasarım tahmin üzerine kuruludur. Biz önce kararı anlayıp, sonra tasarıyoruz.",
    solutionDescEn:
      "Design built without understanding how visitors think is built on guesswork. We understand the decision first, then design.",
  },
  {
    problemTr: "Rakipleriniz dijitalde daha güçlü görünüyor.",
    problemEn: "Your competitors look more established online.",
    solutionTitleTr: "Sektörünüze özgü dijital otorite.",
    solutionTitleEn: "Digital authority specific to your sector.",
    solutionDescTr:
      "Dijital güven, sektörünüzün diline özgü bir tasarım dili gerektirir. Genel şablonlar bu farkı yaratamaz.",
    solutionDescEn:
      "Digital trust requires a design language specific to your industry's tone. Generic templates can't create this distinction.",
  },
  {
    problemTr: "Web sitenizin işe yarayıp yaramadığını bilmiyorsunuz.",
    problemEn: "You don't know if your website is actually working.",
    solutionTitleTr: "Net hedefler, ölçülebilir yapı.",
    solutionTitleEn: "Clear goals, measurable structure.",
    solutionDescTr:
      "Her kararın arkasında bir neden vardır. Web siteniz bir maliyet değil, yatırım olarak çalışmalıdır.",
    solutionDescEn:
      "Every decision has a reason behind it. Your website should work as an investment, not a cost.",
  },
];

export default function ProblemSolution({ isTr }: { isTr: boolean }) {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-authority-deep)" }}
    >
      <div className="container-site">
        {/* Orange accent line */}
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: "var(--color-action)",
            marginBottom: 32,
          }}
        />

        {/* Label */}
        <p
          className="text-label"
          style={{
            color: "var(--color-action)",
            marginBottom: 16,
          }}
        >
          {isTr ? "Neden MMDESIGN?" : "Why MMDESIGN?"}
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 3.8vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "rgba(255,251,243,0.95)",
            maxWidth: 680,
            marginBottom: 64,
          }}
        >
          {isTr
            ? "Tanıdık sorunlar, gerçek çözümler."
            : "Familiar problems, real solutions."}
        </h2>

        {/* Problem-solution rows */}
        <div>
          {ROWS.map((row, index) => (
            <motion.div
              key={index}
              initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: shouldReduce ? 0 : index * 0.1,
                duration: 0.5,
                ease: EASE_OUT,
              }}
              style={{
                borderBottom: "1px solid rgba(255,251,243,0.06)",
                padding: "48px 0",
              }}
            >
              <div className="ps-row">
                {/* Left: Problem (col 1, ~45%) */}
                <div className="ps-problem">
                  <span
                    className="text-label"
                    style={{
                      color: "rgba(255,251,243,0.55)",
                      display: "block",
                      marginBottom: 14,
                    }}
                  >
                    {isTr ? "Durum" : "Challenge"}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontStyle: "italic",
                      fontWeight: 400,
                      lineHeight: 1.35,
                      color: "rgba(255,251,243,0.55)",
                      margin: 0,
                    }}
                  >
                    {isTr ? row.problemTr : row.problemEn}
                  </p>
                </div>

                {/* Right: Solution (col 2, ~55%) */}
                <div className="ps-solution">
                  <span
                    className="text-label"
                    style={{
                      color: "var(--color-action)",
                      display: "block",
                      marginBottom: 14,
                    }}
                  >
                    {isTr ? "Yaklaşımımız" : "Our Approach"}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 17,
                      fontWeight: 700,
                      lineHeight: 1.45,
                      color: "rgba(255,251,243,0.9)",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {isTr ? row.solutionTitleTr : row.solutionTitleEn}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "rgba(255,251,243,0.5)",
                      margin: 0,
                    }}
                  >
                    {isTr ? row.solutionDescTr : row.solutionDescEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .ps-row {
          display: grid;
          grid-template-columns: 45fr 55fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .ps-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ps-problem {
            order: 2;
          }
          .ps-solution {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}

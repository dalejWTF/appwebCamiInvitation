"use client";

import * as React from "react";

const MONTHS = [
  "ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO",
  "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"
];
const WEEKDAYS = [
  "DOMINGO","LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES","SÁBADO"
];

export default function BigDate({
  date,
  className,
  dayClassName,
  labelsClassName,
  tone = "dark",
}: {
  date: Date | string | number;
  className?: string;
  dayClassName?: string;
  labelsClassName?: string;
  tone?: "light" | "dark";
}) {
  const d = new Date(date);
  const year = d.getFullYear();
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const dow = WEEKDAYS[d.getDay()];

  const mutedColor  = tone === "light" ? "rgba(255,255,255,0.72)" : "var(--inkSoft)";
  const hairlineCol = tone === "light" ? "rgba(255,255,255,0.35)" : "var(--border)";

  return (
    <section className={`w-full text-center ${className ?? ""}`}>
      <div className="grid items-center gap-5 sm:gap-8" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        <span
          className={`justify-self-end inline-block px-3 py-1 whitespace-nowrap uppercase tracking-[0.3em] text-[10px] sm:text-xs ${labelsClassName ?? ""}`}
          style={{
            color: mutedColor,
            borderTop: `1px solid ${hairlineCol}`,
            borderBottom: `1px solid ${hairlineCol}`,
          }}
        >
          {dow}
        </span>

        <span
          className={`leading-none font-light ${dayClassName ?? ""}`}
          style={{
            fontSize: "clamp(64px, 16vw, 120px)",
            lineHeight: 0.9,
            color: "var(--ink)",
            textShadow: "0 10px 28px rgba(139,92,246,0.12)",
          }}
          aria-label={`Día ${day}`}
        >
          {day}
        </span>

        <span
          className={`justify-self-start inline-block px-3 py-1 whitespace-nowrap uppercase tracking-[0.3em] text-[10px] sm:text-xs ${labelsClassName ?? ""}`}
          style={{
            color: mutedColor,
            borderTop: `1px solid ${hairlineCol}`,
            borderBottom: `1px solid ${hairlineCol}`,
          }}
        >
          {year}
        </span>
      </div>

      <div
        className={`uppercase tracking-[0.35em] text-[11px] sm:text-xs ${labelsClassName ?? ""}`}
        style={{ color: mutedColor }}
      >
        {month}
      </div>
    </section>
  );
}
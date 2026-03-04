"use client";

import * as React from "react";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

type Props = {
  title?: string;
  name: string;
  address?: string;
  time?: string;
  mapUrl: string;
  className?: string;
};

export default function VenueBlock({
  title,
  name,
  address,
  time,
  mapUrl,
  className,
}: Props) {
  return (
    <section className={`w-full ${className ?? ""}`}>
      <div className="relative mx-auto w-full max-w-[520px] py-6">
        <div
          className={[
            "relative rounded-2xl px-7 py-7 text-center",
            "border backdrop-blur-md",
          ].join(" ")}
          style={{
            background:
  "radial-gradient(600px 260px at 50% 20%, rgba(255, 255, 255, 0.22) 0%, rgba(248, 248, 248, 0.14) 40%, transparent 75%)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* detalle superior sutil */}
          <div
            aria-hidden
            className="absolute left-1/2 top-3 h-[2px] w-16 -translate-x-1/2 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.65), transparent)",
            }}
          />

          {title && (
            <div
              className={`${greatVibes.className} text-[28px] sm:text-[34px] leading-none`}
              style={{ color: "var(--ink)" }}
            >
              {title}
            </div>
          )}

          {time && (
            <div
              className="mt-2 text-[12px] sm:text-[13px] uppercase tracking-[0.18em]"
              style={{ color: "var(--inkSoft)" }}
            >
              {time}
            </div>
          )}

          <h3
            className={`${cormorant.className} mt-3 uppercase text-[15px] sm:text-[18px]`}
            style={{ letterSpacing: "0.12em", color: "var(--ink)" }}
          >
            {name}
          </h3>

          {address && (
            <p
              className={`${cormorant.className} mt-3 text-sm leading-relaxed`}
              style={{ color: "var(--inkSoft)" }}
            >
              {address}
            </p>
          )}

          <div className="mt-5">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${name} en el mapa`}
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(245,243,255,0.92))",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                boxShadow: "0 10px 22px rgba(167,139,250,0.14)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              Ver mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
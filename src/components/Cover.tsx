"use client";

import * as React from "react";
import { Great_Vibes, MonteCarlo, Tangerine } from "next/font/google";
import Image from "next/image";

type CSSVarProps<T extends string> = React.CSSProperties & Record<T, string>;

const lilyVarStyle: CSSVarProps<"--lily"> = {
  "--lily": "clamp(320px,32vw,360px)",
};

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes", display: "swap" });
const monteCarlo = MonteCarlo({ subsets: ["latin"], weight: "400", variable: "--font-montecarlo", display: "swap" });
const tangerine = Tangerine({ subsets: ["latin"], weight: "400", variable: "--font-tangerine", display: "swap" });

export default function Cover() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#faf7fc]">
      {/* --- NIVEL DE FONDO (z-0): Mariposas y Gradiente --- */}
      <Image
        src="/butterflies-cover.png"
        alt=""
        aria-hidden
        width={400}
        height={250}
        className="pointer-events-none select-none absolute top-0 right-0 z-0"
        style={{
          width: "300px",
          height: "auto",
          opacity: 0.95,
          top: "-10%",
          transform: "scaleX(-1)",
        }}
        priority={false}
      />

      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, #ffe4d6 0%, transparent 70%)",
        }}
      />

      {/* --- NIVEL MEDIO (z-10): Acuarelas / Polvo --- */}
      <Image
        src="/dust-bg.png"
        alt=""
        aria-hidden
        width={400}
        height={250}
        className="pointer-events-none select-none absolute z-10"
        style={{
          width: "320px",
          height: "auto",
          opacity: 0.35,
          top: "-15%",
          right: "10%",
        }}
        priority={false}
      />

      <Image
        src="/dust-bg.png"
        alt=""
        aria-hidden
        width={400}
        height={250}
        className="pointer-events-none select-none absolute z-10"
        style={{
          width: "280px",
          height: "auto",
          opacity: 0.45,
          top: "20%",
          left: "10%",
          transform: "rotate(30deg)",
        }}
        priority={false}
      />

      {/* --- NIVEL DE FRENTE (z-20): Contenido principal --- */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-md mx-auto mt-8">
        <div className="flex flex-col items-start w-full pl-4 md:pl-8 mb-10">
          <Image
            src="/monograma1.png"
            alt="CV"
            width={160}
            height={160}
            aria-hidden
            className="pointer-events-none select-none mb-2"
            style={{ width: "140px", height: "auto" }}
            priority={false}
          />

          <h1 className={`${tangerine.className} text-[#1a1a1a] text-5xl md:text-6xl text-left leading-tight`}>
            Camila Villamagua
          </h1>
        </div>

        <div className="relative flex items-center justify-center" style={lilyVarStyle}>
          <Image
            src="/decorative-horizontal.png"
            alt=""
            width={640}
            height={200}
            aria-hidden
            className="pointer-events-none select-none"
            style={{ width: "var(--lily)", height: "auto" }}
            priority={false}
          />
        </div>

        <div className="flex items-center justify-center gap-3 w-full my-8">
          <h2
            className="text-xl md:text-2xl tracking-[0.4em] uppercase whitespace-nowrap text-[#1a1a1a] flex items-center gap-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Mis
            <span
              className={`${monteCarlo.className} text-6xl md:text-7xl mx-1`}
              style={{
                background:
                  "linear-gradient(145deg, #e9d5ff 0%, #8b5cf6 40%, #6d28d9 60%, #ddd6fe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              XV
            </span>
            Años
          </h2>
        </div>

        <div className="relative flex items-center justify-center" style={lilyVarStyle}>
          <Image
            src="/decorative-horizontal.png"
            alt=""
            width={640}
            height={200}
            aria-hidden
            className="pointer-events-none select-none"
            style={{ width: "var(--lily)", height: "auto", transform: "scaleY(-1)" }}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
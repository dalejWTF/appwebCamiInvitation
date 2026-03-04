"use client";

import * as React from "react";
import { Mea_Culpa, Great_Vibes } from "next/font/google";

const meaCulpa = Mea_Culpa({ subsets: ["latin"], weight: "400", variable: "--font-meaculpa", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes", display: "swap" });

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownBanner({ date, className }: { date: Date; className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [now, setNow] = React.useState<number>(0);

  React.useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = (Math.max(0, date.getTime() - now) / 1000) | 0;
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const values = [
    { value: String(days), label: "Días" },
    { value: pad(hours), label: "Horas" },
    { value: pad(minutes), label: "Minutos" },
    { value: pad(seconds), label: "Segundos" },
  ];

  const renderRow = (vs: Array<{ value: string; label: string }>) => (
    // 1. Reducimos el gap en móvil (gap-1) y lo mantenemos en PC (sm:gap-3)
    <div className="mt-2 flex items-end justify-center gap-1 sm:gap-3 font-medium tabular-nums">
      {vs.map((u, i) => (
        <React.Fragment key={u.label}>
          {/* 2. Flex-1 en móvil para que se adapten, min-w-16 en PC */}
          <div className="text-center flex-1 sm:flex-none sm:min-w-16">
            {/* 3. Reducimos el tamaño del número en móvil (text-3xl) */}
            <div className="text-4xl sm:text-5xl leading-none" style={{ color: "var(--ink)" }}>
              {u.value}
            </div>
            {/* 4. Reducimos el tamaño de la letra y el espaciado (tracking) en móvil */}
            <div
              className={`mt-1 text-[14px] sm:text-[20px] tracking-normal sm:tracking-[0.08em] ${greatVibes.className}`}
              style={{ color: "var(--inkSoft)" }}
            >
              {u.label}
            </div>
          </div>
          {i < vs.length - 1 && (
            // 5. Ajustamos la posición de los dos puntos para que no queden tan abajo en móvil
            <span className="pb-7 sm:pb-10 text-lg sm:text-2xl" style={{ color: "rgba(167,139,250,0.55)" }}>
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      // Añadí overflow-hidden por seguridad para que si algo sobresale, no rompa el borde
      className={["relative overflow-hidden rounded-2xl my-9 w-full px-2 py-4 sm:px-6 sm:py-5", className ?? ""].join(" ")}
      style={{
        background:
          "radial-gradient(800px 300px at 50% -30%, rgba(167,139,250,0.25), transparent 60%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(250,247,252,0.90))",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        backdropFilter: "blur(10px)",
      }}
    >
      {mounted ? (
        <div className="w-full">
          <div className={`text-center text-[32px] sm:text-[36px] ${greatVibes.className}`} style={{ color: "var(--inkSoft)" }}>
            Faltan…
          </div>
          {renderRow(values)}
        </div>
      ) : (
        <div className="w-full" suppressHydrationWarning>
          <div className={`text-center text-[32px] sm:text-[36px] ${meaCulpa.className}`} style={{ color: "var(--inkSoft)" }}>
            Faltan…
          </div>
          {renderRow([
            { value: "--", label: "DÍAS" },
            { value: "--", label: "HORAS" },
            { value: "--", label: "MINUTOS" },
            { value: "--", label: "SEGUNDOS" },
          ])}
        </div>
      )}
    </section>
  );
}
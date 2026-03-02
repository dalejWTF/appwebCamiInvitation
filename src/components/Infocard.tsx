"use client";

import * as React from "react";

type Props = React.PropsWithChildren<{
  icon?: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  iconWrapperClassName?: string;
  accentColor?: string;
}>;

export default function InfoCard({
  icon,
  title,
  children,
  className,
  titleClassName,
  bodyClassName,
  iconWrapperClassName,
  accentColor,
}: Props) {
  const accent = accentColor ?? "var(--lilac)";

  return (
    <div
      className={[
        "mx-auto w-full max-w-[520px] rounded-3xl px-6 py-6 border backdrop-blur-md",
        className ?? "",
      ].join(" ")}
      style={{
        background:
          "radial-gradient(900px 380px at 50% -18%, rgba(167,139,250,0.18), transparent 60%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.74), rgba(250,247,252,0.92))",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      {icon && (
        <div
          className={[
            "mx-auto grid size-12 place-items-center rounded-2xl border",
            "shadow-[0_10px_24px_rgba(167,139,250,0.16)]",
            iconWrapperClassName ?? "",
          ].join(" ")}
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(245,243,255,0.92))",
            borderColor: "var(--border)",
            color: accent,
          }}
        >
          {icon}
        </div>
      )}

      <div className="mt-4 text-center">
        <div
          className={["font-semibold tracking-wider", titleClassName ?? ""].join(" ")}
          style={{ color: "var(--ink)" }}
        >
          {title}
        </div>

        <div className={["mt-2", bodyClassName ?? ""].join(" ")} style={{ color: "var(--inkSoft)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
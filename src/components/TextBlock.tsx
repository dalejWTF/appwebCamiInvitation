// components/TextBlock.tsx
"use client";

export default function TextBlock({
  title,
  paragraphs,
  className,
  titleClassName,
  paragraphClassName,
}: {
  title?: string;
  paragraphs: string[];
  className?: string;
  titleClassName?: string;
  paragraphClassName?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-visible w-full px-3",
        "[--corner:clamp(120px,22vw,120px)]",
        "sm:[--corner:clamp(84px,16vw,180px)]",
        className ?? "",
      ].join(" ")}
    >
      
      <div className="space-y-2 text-sm text-slate-700 text-[25px] sm:text-[29px]">
        {paragraphs.map((p, i) => (
          <p key={i} className={paragraphClassName}>{p}</p>
        ))}
      </div>
      
    </div>
  );
}

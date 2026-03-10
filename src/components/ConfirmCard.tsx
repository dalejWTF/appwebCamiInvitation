// components/ConfirmCard.tsx
"use client";

import { CheckCircle2, CalendarCheck2, XCircle } from "lucide-react";
import RsvpButton from "@/components/RsvpButton";

type Family = { id: string; nombreFamilia: string; nroPersonas: number };

export default function ConfirmCard({
  confirmed,
  declined = false,
  checking,
  prefillFamilyId,
  prefillFamily,
  onConfirmed,
  onDeclined,
  className,
  titleClassName,   // p.ej. greatVibes.className
  textClassName,    // p.ej. lora.className
  deadlineText = "Por favor confirma tu asistencia para celebrar juntos este día tan especial.",
  titleWhenOpen = "Confirmar asistencia",
  titleWhenDone = "¡Gracias por confirmar!",
  titleWhenDeclined = "¡Respuesta registrada!", 
  hideIfNoPrefill = true,
  messageWhenConfirmed = "¡Nos hace mucha ilusión compartir este día contigo! 💜", // 👈 Emoji cambiado a púrpura
  messageWhenDeclined = "No hay problema, nos encontraremos en una siguiente ocasión",
}: {
  confirmed: boolean;
  declined?: boolean;
  checking?: boolean;
  prefillFamilyId?: string;
  prefillFamily?: Family;
  onConfirmed?: () => void;
  onDeclined?: () => void;
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  deadlineText?: string;
  titleWhenOpen?: string;
  titleWhenDone?: string;
  titleWhenDeclined?: string;
  hideIfNoPrefill?: boolean;
  messageWhenConfirmed?: string;
  messageWhenDeclined?: string;
}) {
  const hasPrefill = Boolean(prefillFamilyId || prefillFamily);
  if (hideIfNoPrefill && !hasPrefill) return null;

  const showForm = !confirmed && !declined;

  return (
    <section className={`w-full ${className ?? ""}`}>
      <div
        className="mx-auto w-full max-w-[520px] sm:max-w-[720px] px-6 py-8 text-center rounded-2xl"
        style={{
          backgroundColor: "#FFFFFF",
          // 👈 Sombra con un tono lila muy suave en lugar de azul oscuro
          boxShadow: "0 8px 30px rgba(139, 92, 246, 0.12)", 
        }}
      >
        {/* encabezado */}
        <div className="mx-auto grid place-items-center">
          <div
            className="grid place-items-center rounded-2xl"
            aria-hidden
            // 👈 Fondo del ícono usando el mismo color de tu Cover (#faf7fc)
            style={{ width: 48, height: 48, backgroundColor: "#faf7fc" }} 
          >
            {confirmed ? (
              // 👈 Tono púrpura elegante para el check
              <CheckCircle2 className="size-6" style={{ color: "#8b5cf6" }} />
            ) : declined ? (
              // 👈 Tono rosa/vino suave para declinar (combina mejor que el rojo puro)
              <XCircle className="size-6" style={{ color: "#e11d48" }} />
            ) : (
              // 👈 Tono púrpura profundo para el calendario
              <CalendarCheck2 className="size-6" style={{ color: "#6d28d9" }} />
            )}
          </div>
        </div>

        {/* 👈 Color de título cambiado a #1a1a1a para coincidir con tu Cover */}
        <h3 className={`mt-4 text-4xl sm:text-5xl ${titleClassName ?? ""}`} style={{ color: "#1a1a1a" }}>
          {confirmed ? titleWhenDone : (declined ? titleWhenDeclined : titleWhenOpen)}
        </h3>

        {showForm ? (
          <>
            <p className={`mt-2 text-sm text-gray-600 ${textClassName ?? ""}`}>{deadlineText}</p>

            {hasPrefill && !checking && (
              <div className="mt-5">
                <RsvpButton
                  triggerLabel="Confirmar"
                  prefillFamilyId={prefillFamilyId}
                  prefillFamily={prefillFamily}
                  greetingTemplate="{{nombre}}"
                  titleClassName={titleClassName}
                  textClassName={textClassName}
                  note="Nos encantará contar con tu presencia. Con su confirmación, nos ayudará a planificar mejor este día tan especial."
                  requirePrefill
                  onConfirmed={onConfirmed}
                  onDeclined={onDeclined}
                />
              </div>
            )}

            <p className={`mt-3 text-xs text-gray-500 ${textClassName ?? ""}`} style={{ lineHeight: 1.4 }}>
              Si necesitas actualizar tu respuesta más adelante, contáctanos.
            </p>
          </>
        ) : confirmed ? (
          <p className={`mt-2 text-sm text-gray-600 ${textClassName ?? ""}`}>
            {messageWhenConfirmed}
          </p>
        ) : (
          <p className={`mt-2 text-sm text-gray-600 ${textClassName ?? ""}`}>
            {messageWhenDeclined}
          </p>
        )}
      </div>
    </section>
  );
}
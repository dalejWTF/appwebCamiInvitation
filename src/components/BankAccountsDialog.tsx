// components/BankAccountsDialog.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Copy, Check, Banknote, QrCode, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type BankAccount = {
  bank: string;
  holder: string;
  account: string;
  dni: string;
  qr?: string;
};

const CORNER_TOP = "/butterflies-cover.png"; // puedes cambiar a otro adorno si quieres
const DUST = "/dust-bg.png";

export default function BankAccountsDialog({
  open,
  onOpenChange,
  accounts,
  title = "Cuentas para regalo",
  description = "Gracias por tu cariño. Puedes usar cualquiera de estas cuentas:",
  onShowQR,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accounts: BankAccount[];
  title?: string;
  description?: string;
  onShowQR?: (account: BankAccount) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl rounded-[28px] p-0 overflow-hidden"
        style={{
          border: "1px solid var(--border)",
          background:
            "radial-gradient(900px 420px at 50% -18%, rgba(191,175,230,0.22), transparent 62%)," +
            "linear-gradient(180deg, rgba(250,247,252,0.96), rgba(245,243,255,0.92))",
          boxShadow: "0 26px 90px rgba(42,27,61,0.28)",
        }}
      >
        {/* decor suave tipo cover */}
        <Image
          src={CORNER_TOP}
          alt=""
          width={420}
          height={260}
          aria-hidden
          className="pointer-events-none select-none absolute right-[-12%] top-[-18%]"
          style={{
            width: "18rem",
            height: "auto",
            opacity: 0.18,
            transform: "scaleX(-1) rotate(-6deg)",
            filter: "saturate(0.8)",
          }}
          priority={false}
        />
        <Image
          src={DUST}
          alt=""
          width={420}
          height={260}
          aria-hidden
          className="pointer-events-none select-none absolute left-[-12%] bottom-[-22%]"
          style={{
            width: "18rem",
            height: "auto",
            opacity: 0.22,
            transform: "rotate(18deg)",
          }}
          priority={false}
        />

        {/* header */}
        <DialogHeader className="pt-7 pb-3 text-center relative z-10">
          <div
            className="mx-auto grid place-items-center size-12 rounded-2xl border"
            style={{
              borderColor: "var(--border)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(245,243,255,0.92))",
              boxShadow: "0 14px 30px rgba(156,134,200,0.18)",
            }}
          >
            <Banknote className="size-5" style={{ color: "var(--lilac)" }} />
          </div>

          <DialogTitle
            className="mt-3 text-3xl tracking-wide text-center"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </DialogTitle>

          <DialogDescription
            className="mt-1 text-sm text-center"
            style={{ color: "var(--inkSoft)" }}
          >
            {description}
          </DialogDescription>

          <div
            className="mx-auto mt-4 h-px w-28"
            style={{ background: "linear-gradient(90deg, transparent, rgba(156,134,200,0.55), transparent)" }}
          />
        </DialogHeader>

        {/* contenido */}
        <div className="relative z-10 px-5 pb-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {accounts.map((acc, i) => (
              <li
                key={i}
                className="rounded-2xl border p-4 sm:p-5 backdrop-blur-md"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "radial-gradient(700px 220px at 50% -40%, rgba(191,175,230,0.20), transparent 70%)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.80), rgba(250,247,252,0.92))",
                  boxShadow: "0 16px 38px rgba(42,27,61,0.10)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold" style={{ color: "var(--ink)" }}>
                      {acc.bank}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] border"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--inkSoft)",
                          background: "rgba(255,255,255,0.55)",
                        }}
                      >
                        <Sparkles className="size-3" style={{ color: "var(--lilac)" }} />
                        Regalo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <FieldRow label="Titular" value={acc.holder} />
                  <FieldRow label="Nro. de cuenta" value={acc.account} copyable />
                  <FieldRow label="CI/RUC" value={acc.dni} copyable />
                </div>

                <div
                  className="my-4 h-px w-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(156,134,200,0.45), transparent)" }}
                />

                <div className="flex flex-wrap gap-2">
                  <CopyAllButton acc={acc} />

                  {acc.qr && (
                    <Button
                      type="button"
                      className="rounded-xl border"
                      onClick={() => onShowQR?.(acc)}
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(245,243,255,0.92))",
                        borderColor: "var(--border)",
                        color: "var(--ink)",
                        boxShadow: "0 12px 26px rgba(156,134,200,0.14)",
                      }}
                    >
                      <QrCode className="mr-2 size-4" style={{ color: "var(--lilac)" }} />
                      Ver QR
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center">
            <Button
              className="rounded-2xl px-6 py-6 text-base"
              onClick={() => onOpenChange(false)}
              style={{
                background: "linear-gradient(145deg, rgba(191,175,230,0.85), rgba(156,134,200,0.95))",
                color: "white",
                boxShadow: "0 16px 34px rgba(156,134,200,0.28)",
              }}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldRow({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="text-sm leading-snug">
        <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--inkFaint, rgba(42,27,61,0.52))" }}>
          {label}
        </div>
        <div className="font-medium break-words" style={{ color: "var(--ink)" }}>
          {value}
        </div>
      </div>

      {copyable && (
        <Button
          size="sm"
          variant="outline"
          className="h-9 rounded-xl border"
          onClick={handleCopy}
          aria-label={`Copiar ${label}`}
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(245,243,255,0.92))",
            borderColor: "var(--border)",
            color: "var(--ink)",
            boxShadow: "0 10px 22px rgba(156,134,200,0.12)",
          }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      )}
    </div>
  );
}

function CopyAllButton({ acc }: { acc: BankAccount }) {
  const [copied, setCopied] = React.useState(false);
  const text = `Banco: ${acc.bank}\nTitular: ${acc.holder}\nCuenta: ${acc.account}\nCI/RUC: ${acc.dni}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <Button
      onClick={handleCopy}
      className="rounded-xl border"
      style={{
        background: "linear-gradient(145deg, rgba(191,175,230,0.18), rgba(255,255,255,0.84))",
        borderColor: "var(--border)",
        color: "var(--ink)",
        boxShadow: "0 12px 26px rgba(156,134,200,0.14)",
      }}
    >
      {copied ? (
        <>
          <Check className="mr-2 size-4" /> Copiado
        </>
      ) : (
        <>
          <Copy className="mr-2 size-4" /> Copiar datos
        </>
      )}
    </Button>
  );
}
"use client";

import * as React from "react";
import BigDate from "@/components/BigDate";
import TextBlock from "@/components/TextBlock";
import Cover from "@/components/Cover";
import BackgroundAudio from "@/components/BackgroundAudio";
import RevealSection from "@/components/RevealSection";
import InfoCard from "./Infocard";
import { Button } from "@/components/ui/button";
import HeroCover from "@/components/HeroCover";
import VenueBlock from "@/components/VenueBlock";
import BankAccountsDialog from "@/components/BankAccountsDialog";
import ConfirmCard from "@/components/ConfirmCard";

import { Gift, Banknote, Crown } from "lucide-react";

import Image from "next/image";
import {
    Great_Vibes,
    Cormorant_Garamond,
    Lora,
    Mr_De_Haviland,
    Mea_Culpa,
    Tangerine,
    Lavishly_Yours,
    Rouge_Script,
} from "next/font/google";

import dynamic from "next/dynamic";
const CountdownBanner = dynamic(() => import("@/components/CountdownBanner"), { ssr: false });

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-lora", display: "swap" });
const mr_de_haviland = Mr_De_Haviland({ subsets: ["latin"], weight: "400", variable: "--font-mrdehaviland", display: "swap" });
const mea_culpa = Mea_Culpa({ subsets: ["latin"], weight: "400", variable: "--font-meaculpa", display: "swap" });
const tangerine = Tangerine({ subsets: ["latin"], weight: "400", variable: "--font-tangerine", display: "swap" });
const lavishlyYours = Lavishly_Yours({ subsets: ["latin"], weight: "400", variable: "--font-lavishlyyours", display: "swap" });
const rougeScript = Rouge_Script({ subsets: ["latin"], weight: "400", variable: "--font-rougescript", display: "swap" });

const HB_DATE = new Date("2026-03-14T15:00:00");
const CHURCH_NAME = "Iglesia San Sebastián";
const CHURCH_MAPS_URL = "https://maps.app.goo.gl/17vsUHS1KF9sGEsF9";
const RECEPTION_NAME = "";
const RECEPTION_MAPS_URL = "https://maps.app.goo.gl/kf2hNRTEoQJUwNkX6";

const accounts = [
    { bank: "Cta Ahorros Banco de Loja", holder: "VILLAMAGUA TORRES, CAMILA ELIZABETH", account: "2903295785", dni: "1150174132" },
];

// Paleta Lila (alineada al cover)
const LILA = {
    // Texto en morado oscuro (no negro)
    ink: "#2A1B3D", // morado tinta
    inkSoft: "rgba(42,27,61,0.72)",
    inkFaint: "rgba(42,27,61,0.52)",

    // Lilas más suaves (menos “neón”)
    lilac: "#9C86C8",
    lilac2: "#BFAFE6",
    lilac3: "#E9E2F6",

    // Papel/acuarela
    blush: "#FAF7FC",
    card: "rgba(255,255,255,0.78)",
    border: "rgba(156,134,200,0.30)",
    shadow: "0 14px 40px rgba(42,27,61,0.10)",
};

const SOFT_BTN_BG = "rgba(250,247,252,0.88)";
const SOFT_BTN_BG_HOVER = "rgba(245,243,255,0.96)";
const SOFT_TEXT = LILA.ink;

type CSSVars = Record<`--${string}`, string>;
type Family = { id: string; nombreFamilia: string; nroPersonas: number };

function withVars(vars: CSSVars, base: React.CSSProperties = {}): React.CSSProperties & CSSVars {
    return { ...base, ...vars };
}

export default function InvitationClient({ familyIdFromUrl }: { familyIdFromUrl?: string }) {
    const [prefillFamily, setPrefillFamily] = React.useState<Family | undefined>(undefined);
    const [confirmed, setConfirmed] = React.useState(false);
    const [declined, setDeclined] = React.useState(false);
    const [checking, setChecking] = React.useState(true);


    // Lee estado desde el backend por familyId
    React.useEffect(() => {
        if (!familyIdFromUrl) { setChecking(false); return; }
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`/api/guests?familyId=${encodeURIComponent(familyIdFromUrl)}`, { cache: "no-store" });
                if (!res.ok) throw new Error(`GET /api/guests?familyId failed: ${res.status}`);
                const data = await res.json();

                // Normalización (acepta varios esquemas del backend):
                const rawStr = (data.status ?? data.rsvp ?? data.response ?? data.answer ?? "")
                    .toString()
                    .trim()
                    .toLowerCase();
                const yesLike = ["si", "sí", "yes", "true"];
                const noLike = ["no", "false"];
                const responded = data.responded === true;
                const isYes =
                    yesLike.includes(rawStr) ||
                    data.status === "si" ||
                    data.confirmed === true ||
                    (responded && data.attending === true);

                const isNo =
                    noLike.includes(rawStr) ||
                    data.status === "no" ||
                    data.declined === true ||
                    (responded && data.attending === false);

                if (!cancelled) {
                    setConfirmed(Boolean(isYes));
                    setDeclined(Boolean(isNo) && !isYes);
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (!cancelled) setChecking(false);
            }
        })();
        return () => { cancelled = true; };
    }, [familyIdFromUrl]);

    // Prefill de familia
    React.useEffect(() => {
        if (!familyIdFromUrl) return;
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/guests", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                const list: Family[] = data.families ?? [];
                const fam = list.find((f) => f.id === familyIdFromUrl);
                if (!cancelled) setPrefillFamily(fam);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => { cancelled = true; };
    }, [familyIdFromUrl]);
    const [open, setOpen] = React.useState(false);

    const mainStyle = withVars(
        {
            "--ink": LILA.ink,
            "--inkSoft": LILA.inkSoft,
            "--inkFaint": LILA.inkFaint,
            "--lilac": LILA.lilac,
            "--lilac2": LILA.lilac2,
            "--lilac3": LILA.lilac3,
            "--blush": LILA.blush,
            "--card": LILA.card,
            "--border": LILA.border,
            "--shadow": LILA.shadow,
        },
        { overscrollBehaviorY: "contain" }
    );

    return (
        <main
            className={`paper-invite relative h-dvh w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar ${lora.className}`}
            style={mainStyle}
        >
            <BackgroundAudio src="audio/theme.mp3" title="Cancion Cami" artist="Tokito Remix" />

            <div className="mx-auto max-w-[640px]">
                {/* 1 — Cover (se queda tal cual les gustó) */}
                <RevealSection>
                    <Cover />
                </RevealSection>

                {/* 2 — Texto + Fecha + Countdown (mismo mood que cover: acuarela + suave) */}
                <RevealSection>
                    <section
                        className="relative px-4 sm:px-6 py-7 sm:py-9"
                        style={{
                            background:
                                "radial-gradient(900px 420px at 50% -12%, rgba(167,139,250,0.22), transparent 60%)," +
                                "linear-gradient(180deg, rgba(250,247,252,1) 0%, rgba(245,243,255,1) 100%)",
                            boxShadow: "var(--shadow)",
                            borderTop: "1px solid var(--border)",
                            borderBottom: "1px solid var(--border)",
                        }}
                    >
                        <div className="mx-auto w-full max-w-[560px] text-center">
                            <TextBlock
                                className="bg-transparent shadow-none p-0"
                                paragraphClassName={`text-center leading-[1.2] ${rougeScript.className}`}
                                paragraphs={[
                                    "Porque esta noche es muy importante para mi, quiero compartirla con las personas que llevo en el corazón " +
                                    "y por ser una de ellas, quisiera que estes presente en una de las noches más inolvidables de mi vida",
                                ]}
                            />

                            <div style={{ color: "var(--ink)" }}>
                                <BigDate
                                    date={HB_DATE}
                                    tone="dark"
                                    className={`mx-auto ${cormorant.className}`}
                                    dayClassName={greatVibes.className}
                                    labelsClassName={lora.className}
                                />
                            </div>

                            <CountdownBanner date={HB_DATE} className="my-0" />
                        </div>
                    </section>
                </RevealSection>

                {/* 3 — Información (suave, lila, con el adorno de rosas ya que lo tienen) */}
                <RevealSection>
                    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#faf7fc]">
                            <div className="z-10 pb-9 py-9 space-y-10">
                                {/* ====== CEREMONIA ====== */}
                                <div className="relative">
                                    <Image
                                        src="/butterfly1.png"
                                        alt=""
                                        width={240}
                                        height={240}
                                        className="
                                            pointer-events-none select-none
                                            absolute z-20
                                            -top-6 -right-6
                                            w-[clamp(55px,12vw,110px)] h-auto
                                            opacity-90
                                        "
                                        style={{ filter: "saturate(0.95)" }}
                                    />
                                    <VenueBlock
                                        title="Ceremonia"
                                        name={CHURCH_NAME}
                                        address="Simón Bolivar y Lourdes, Loja"
                                        time="03:00 PM"
                                        mapUrl={CHURCH_MAPS_URL}
                                    />
                                </div>

                                {/* ====== RECEPCIÓN ====== */}
                                <div className="relative">
                                    <Image
                                        src="/butterfly1.png"
                                        alt=""
                                        width={240}
                                        height={240}
                                        className="
                                            pointer-events-none select-none
                                            absolute z-20
                                            -top-6 -right-6
                                            w-[clamp(55px,12vw,110px)] h-auto
                                            opacity-90
                                        "
                                        style={{ filter: "saturate(0.95)" }}
                                    />
                                    <VenueBlock
                                        title="Recepción"
                                        name={RECEPTION_NAME}
                                        address="Calle Monte Sinaí, La Laguna, Loja"
                                        time="7:00 PM"
                                        mapUrl={RECEPTION_MAPS_URL}
                                    />
                                </div>
                            </div>
                    </section>
                </RevealSection>

                {/* 4 — Regalos (glass lila + botón degradado suave) */}
                <RevealSection className="py-9">
                    <InfoCard
                        title="Código de Vestimenta"
                        titleClassName={`${mea_culpa.className} text-4xl`}
                        icon={<Crown className="size-6" style={{ color: "var(--lilac)" }} />}
                    >
                        <p className={`${rougeScript.className} text-[26px] sm:text-[33px]`} style={{ color: "var(--inkSoft)" }}>
                            Para esta ocasión tan especial, el código de vestimenta es elegante.
                        </p>
                    </InfoCard>
                    <div className="my-6" />

                    <InfoCard
                        title="Regalos"
                        titleClassName={`${mea_culpa.className} text-4xl`}
                        icon={<Gift className="size-6" style={{ color: "var(--lilac)" }} />}
                    >
                        <p className={`${rougeScript.className} text-[26px] sm:text-[33px]`} style={{ color: "var(--inkSoft)" }}>
                            El mejor regalo es tu presencia! <br />
                            Pero si deseas obsequiarme algo, aquí te dejo mi cuenta para que puedas hacerlo de forma segura y confiable. <br />
                            Agradezco de corazón tu cariño y apoyo en este día tan especial.
                        </p>

                        <div className={`mt-4 flex items-center justify-center gap-3 flex-wrap text-center ${rougeScript.className} text-[26px] sm:text-[33px]`}>
                            {accounts.length > 0 && (
                                <Button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="rounded-xl px-5 py-2 w-auto text-[19px] sm:text-[25px] border"
                                    style={{
                                        backgroundColor: SOFT_BTN_BG,
                                        color: SOFT_TEXT,
                                        borderColor: "var(--border)",
                                        boxShadow: "0 12px 28px rgba(139,92,246,0.14)",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SOFT_BTN_BG_HOVER)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SOFT_BTN_BG)}
                                >
                                    <Banknote className="mr-2 size-4" style={{ color: "var(--lilac)" }} />
                                    Ver cuenta
                                </Button>
                            )}
                        </div>
                    </InfoCard>
                </RevealSection>

                {/* 5 — Confirmación — SOLO si hay id */}
                {familyIdFromUrl && (
                    <RevealSection>
                        <section className="mb-9">
                            <ConfirmCard
                                confirmed={confirmed}
                                declined={declined}
                                checking={checking}
                                prefillFamilyId={familyIdFromUrl}
                                prefillFamily={prefillFamily}
                                onConfirmed={() => { setConfirmed(true); setDeclined(false); }}
                                onDeclined={() => { setConfirmed(false); setDeclined(true); }}
                                titleClassName={greatVibes.className}
                                textClassName={lora.className}
                                hideIfNoPrefill
                                messageWhenConfirmed="¡Nos hace mucha ilusión compartir este día contigo! 💙"
                                messageWhenDeclined="No hay problema, nos encontraremos en una siguiente ocasión"
                            />
                        </section>
                    </RevealSection>
                )}

                {/* 6 — Cierre */}
                <RevealSection>
                    <HeroCover src="/shinobu1.png" alt="Nos vemos pronto" objectPosition="45% 10%">
                        <h1
                            className={`text-center text-5xl sm:text-8xl ${greatVibes.className} text-white`}
                            style={{ textShadow: "0 12px 36px rgba(167,139,250,0.55)" }}
                        >
                            ¡Nos vemos en la fiesta!
                        </h1>
                    </HeroCover>
                </RevealSection>
            </div>

            {/* DIALOG CUENTAS (bonito) */}
            <BankAccountsDialog
                open={open}
                onOpenChange={setOpen}
                accounts={accounts}
            />
        </main>
    );
}
// src/components/InvitationClient.tsx
"use client";

import * as React from "react";
import BigDate from "@/components/BigDate";
import TextBlock from "@/components/TextBlock";
import Cover from "@/components/Cover";
import BackgroundAudio from "@/components/BackgroundAudio";
import RevealSection from "@/components/RevealSection";
import InfoCard from "./Infocard";
import { Button } from "@/components/ui/button";
import HeroCover from "./HeroCover";

import { Gift, Sparkles, Banknote } from "lucide-react";
import {
    Great_Vibes,
    Cormorant_Garamond,
    Lora,
    Mr_De_Haviland,
    Mea_Culpa,
    Tangerine,
    Lavishly_Yours,
    Rouge_Script
} from "next/font/google";

import dynamic from "next/dynamic";
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-lora", display: "swap" });
const mr_de_haviland = Mr_De_Haviland({ subsets: ["latin"], weight: "400", variable: "--font-mrdehaviland", display: "swap" });
const mea_culpa = Mea_Culpa({ subsets: ["latin"], weight: "400", variable: "--font-meaculpa", display: "swap" });
const tangerine = Tangerine({ subsets: ["latin"], weight: "400", variable: "--font-tangerine", display: "swap" });
const lavishlyYours = Lavishly_Yours({ subsets: ["latin"], weight: "400", variable: "--font-lavishlyyours", display: "swap" });
const rougeScript = Rouge_Script({ subsets: ["latin"], weight: "400", variable: "--font-rougescript", display: "swap" });

const CountdownBanner = dynamic(() => import("@/components/CountdownBanner"), { ssr: false });
const HB_DATE = new Date("2026-03-14T18:30:00");

const accounts = [
    { bank: "Cta Ahorros Banco de Loja", holder: "VILLAMAGUA TORRES, CAMILA ELIZABETH", account: "2903295785", dni: "1150174132" },
]


const SOFT_BTN_BG = "#EAF3FB";
const SOFT_BTN_BG_HOVER = "#E1EEF8";
const SOFT_TEXT = "#0F172A";

export default function InvitationClient() {
    const [open, setOpen] = React.useState(false);

    return (
        <main
            className={`paper-invite relative h-dvh w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar ${lora.className}`}
            style={{ overscrollBehaviorY: "contain" }}
        >
            <BackgroundAudio
                src="audio/theme.mp3"
                title="Cancion Cami"
                artist="Tokito Remix"
            />
            <div className="mx-auto max-w-[640px]">
                {/* 1 — Presentacion inicial */}
                <RevealSection>
                    <Cover />
                </RevealSection>

                {/* 2 — Texto y CountDown */}
                <RevealSection>
                    <section
                        className="relative px-4 sm:px-6 py-6 sm:py-8"
                        style={{
                            background: "linear-gradient(0deg, #F7FBFE 0%, #EFF7FD 100%)",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="mx-auto w-full max-w-[560px] text-center">
                            <TextBlock
                                className={`bg-transparent shadow-none p-0`}
                                paragraphClassName={`text-slate-700 text-center leading-[1.2] ${rougeScript.className}`}
                                paragraphs={[
                                    "Porque esta noche es muy importante para mi, quiero compartirla con las personas que llevo en el corazón " +
                                    "y por ser una de ellas, quisiera que estes presente en una de las noches más inolvidables de mi vida",
                                ]}
                            />
                            <BigDate
                                date={HB_DATE}
                                tone="dark"
                                className={`mx-auto ${cormorant.className}`}
                                dayClassName={greatVibes.className}
                                labelsClassName={lora.className}
                            />
                            <CountdownBanner date={HB_DATE} className="my-0" />
                        </div>
                    </section>
                </RevealSection>
                
                {/* 4 — Regalos */}
                <RevealSection className="pb-9">

                    <InfoCard
                        title={<span className={`${mea_culpa.className} text-4xl`}>{`Regalos`}</span>}
                        icon={<Gift className="size-6" style={{ color: "#3579AD" }} />}
                    >
                        <p className={`${rougeScript.className} text-[26px] sm:text-[33px]`}>
                            Tu presencia es lo más valioso para nosotros. Si deseas hacernos un regalo, hemos preparado algunas opciones para facilitarte el proceso.
                        </p>

                        <div className={`mt-4 flex items-center justify-center gap-3 flex-wrap text-center ${rougeScript.className} text-[26px] sm:text-[33px]`}>
                            {accounts.length > 0 && (
                                <Button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="rounded-xl px-5 py-2 w-auto text-[19px] sm:text-[25px]"
                                    style={{
                                        backgroundColor: SOFT_BTN_BG,
                                        color: SOFT_TEXT,
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SOFT_BTN_BG_HOVER)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SOFT_BTN_BG)}
                                >
                                    <Banknote className="mr-2 size-4" />
                                    Ver cuentas
                                </Button>
                            )}
                        </div>
                    </InfoCard>
                </RevealSection>

                {/* 5 — Cierre */}
                <RevealSection>
                    <HeroCover src="/shinobu.png" alt="Nos vemos pronto" objectPosition="60% 20%">
                        <h1 className={`text-center text-5xl sm:text-8xl ${greatVibes.className} text-white drop-shadow`}>
                            ¡Nos vemos en la fiesta!
                        </h1>
                    </HeroCover>
                </RevealSection>
            </div>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-2xl">
                        {/* Botón para cerrar (X) */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <h3 className={`text-3xl text-center text-[#3579AD] mb-4 ${cormorant.className} font-semibold`}>
                            Datos Bancarios
                        </h3>

                        <div className={`space-y-4 text-slate-700 ${lora.className}`}>
                            {accounts.map((acc, index) => (
                                <div key={index} className="bg-[#F7FBFE] p-4 rounded-xl border border-[#E1EEF8]">
                                    <p className="mb-1"><strong>Banco:</strong> {acc.bank}</p>
                                    <p className="mb-1"><strong>Titular:</strong> {acc.holder}</p>
                                    <p className="mb-1"><strong>Cuenta:</strong> {acc.account}</p>
                                    <p><strong>CI/RUC:</strong> {acc.dni}</p>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => setOpen(false)}
                            className="w-full mt-6 rounded-xl py-6 text-lg"
                            style={{ backgroundColor: "#3579AD", color: "white" }}
                        >
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}
        </main>


    );
}
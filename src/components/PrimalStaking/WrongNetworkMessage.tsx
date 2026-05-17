"use client";

import { AlertCircle } from "lucide-react";

export default function WrongNetworkMessage() {
    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">

            <div className="relative overflow-hidden rounded-[34px] border border-[#4f6db3] bg-[#0c3db8] shadow-[0_25px_90px_rgba(0,0,0,0.45)] max-w-2xl w-full">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,transparent_100%)] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="relative p-12 lg:p-16 text-center">
                    <div className="relative w-28 h-28 rounded-[30px] bg-[#082c89] border border-[#7394ff] flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
                        <div className="absolute inset-0 rounded-[30px] bg-cyan-400/10 blur-xl" />
                        <AlertCircle className="relative w-14 h-14 text-cyan-200" />
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                        Wrong Network
                    </h2>

                    <p className="max-w-xl mx-auto text-cyan-100 text-xl leading-relaxed font-medium mb-10">
                        This application only works on ApeChain.
                        Please switch your wallet network to continue using PrimalFi.
                    </p>

                    <div className="inline-flex items-center gap-3 px-6 py-4 rounded-[20px] bg-[#082c89] border border-[#7394ff]">
                        <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />
                        <span className="text-cyan-100 font-black uppercase tracking-[0.18em] text-sm">
                            ApeChain Required
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
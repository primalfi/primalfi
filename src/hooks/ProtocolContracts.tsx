"use client";

import {
    PRIMAL_PROTOCOL_ADDRESS,
    PRIMAL_APE_ADDRESS
} from "../config/contracts";

import { Shield, Coins, Vault } from "lucide-react";

export default function ProtocolContracts() {
    return (
        <div className="relative max-w-7xl mx-auto">

            {/* OUTER GLOW */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px]" />

            {/* MAIN CARD */}
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-[#4f6db3]
                    bg-[#0c3db8]

                "
            >

                {/* TOP LIGHT */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />

                {/* DOT PATTERN */}
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* HEADER */}
                <div className="relative border-b border-[#5d7cd1] px-8 py-6">

                    <div className="flex items-center justify-center">
                        <h2
                            className="
                                text-white
                                text-3xl
                                md:text-4xl
                                font-black
                                tracking-[0.18em]
                                uppercase
                            "
                        >
                            Protocol Contracts
                        </h2>
                    </div>
                </div>

                {/* BODY */}
                <div className="relative p-6 md:p-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* prAPE TOKEN */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[26px]
                                border
                                border-[#5f7fe0]
                                bg-gradient-to-b
                                from-[#2457db]
                                to-[#1d4fcb]
                                p-6
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]
                            "
                        >

                            {/* INNER LIGHT */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                            <div className="relative">

                                {/* ICON */}
                                <div
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-[#1848ca]
                                        border
                                        border-[#6e8eff]
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >
                                    <Coins className="w-7 h-7 text-cyan-200" />
                                </div>

                                {/* TITLE */}
                                <p
                                    className="
                                        text-cyan-100
                                        text-sm
                                        font-black
                                        uppercase
                                        tracking-[0.18em]
                                        mb-4
                                    "
                                >
                                    prAPE Token
                                </p>

                                {/* ADDRESS */}
                                <a
                                    href={`https://apescan.io/address/${PRIMAL_APE_ADDRESS}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        block
                                        text-white
                                        text-sm
                                        font-semibold
                                        break-all
                                        hover:text-cyan-200
                                        transition-colors
                                    "
                                >
                                    {PRIMAL_APE_ADDRESS}
                                </a>
                            </div>
                        </div>

                        {/* PROTOCOL */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[26px]
                                border
                                border-[#5f7fe0]
                                bg-gradient-to-b
                                from-[#2457db]
                                to-[#1d4fcb]
                                p-6
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]
                            "
                        >

                            {/* INNER LIGHT */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                            <div className="relative">

                                {/* ICON */}
                                <div
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-[#1848ca]
                                        border
                                        border-[#6e8eff]
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >
                                    <Shield className="w-7 h-7 text-cyan-200" />
                                </div>

                                {/* TITLE */}
                                <p
                                    className="
                                        text-cyan-100
                                        text-sm
                                        font-black
                                        uppercase
                                        tracking-[0.18em]
                                        mb-4
                                    "
                                >
                                    Primal Protocol
                                </p>

                                {/* ADDRESS */}
                                <a
                                    href={`https://apescan.io/address/${PRIMAL_PROTOCOL_ADDRESS}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        block
                                        text-white
                                        text-sm
                                        font-semibold
                                        break-all
                                        hover:text-cyan-200
                                        transition-colors
                                    "
                                >
                                    {PRIMAL_PROTOCOL_ADDRESS}
                                </a>
                            </div>
                        </div>

                        {/* TREASURY */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[26px]
                                border
                                border-[#5f7fe0]
                                bg-gradient-to-b
                                from-[#2457db]
                                to-[#1d4fcb]
                                p-6
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]
                            "
                        >

                            {/* INNER LIGHT */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                            <div className="relative">

                                {/* ICON */}
                                <div
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-[#1848ca]
                                        border
                                        border-[#6e8eff]
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >
                                    <Vault className="w-7 h-7 text-cyan-200" />
                                </div>

                                {/* TITLE */}
                                <p
                                    className="
                                        text-cyan-100
                                        text-sm
                                        font-black
                                        uppercase
                                        tracking-[0.18em]
                                        mb-4
                                    "
                                >
                                    Treasury Address
                                </p>

                                {/* ADDRESS */}
                                <a
                                    href="https://apescan.io/address/0x4735C804D381FFDefC0E6F2bab12424A58F331f7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        block
                                        text-white
                                        text-sm
                                        font-semibold
                                        break-all
                                        hover:text-cyan-200
                                        transition-colors
                                    "
                                >
                                    0x4735C804D381FFDefC0E6F2bab12424A58F331f7
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
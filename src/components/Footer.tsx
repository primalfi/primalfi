// components/Footer.tsx

"use client";

import Link from "next/link";

import {
    FaXTwitter,
    FaDiscord,
} from "react-icons/fa6";

import {
    BookSearch,
    Code,
    ImageUp,
    Layers,
} from "lucide-react";

import { motion } from "framer-motion";
import { FaGithub, FaTelegram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 mt-32">

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[#082c89]" />

            {/* TOP GLOW */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-400/10 blur-[180px]" />

            {/* LEFT GLOW */}
            <div className="absolute left-[-250px] top-[20%] w-[500px] h-[500px] rounded-full bg-blue-300/10 blur-[160px]" />

            {/* RIGHT GLOW */}
            <div className="absolute right-[-250px] bottom-[0%] w-[500px] h-[500px] rounded-full bg-cyan-300/10 blur-[160px]" />

            {/* RADIAL LIGHT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

            {/* GRID */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: "90px 90px",
                }}
            />

            {/* DOTS */}
            <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                    backgroundImage: `
                        radial-gradient(rgba(255,255,255,0.20) 1.2px, transparent 1.2px)
                    `,
                    backgroundSize: "24px 24px",
                }}
            />

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)]" />

            <div className="relative max-w-7xl mx-auto px-6 py-24">

                {/* TOP */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">

                    {/* LEFT */}
                    <div>

                        {/* BADGE */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="
                                inline-flex
                                items-center
                                gap-3
                                px-5
                                py-3
                                rounded-full
                                border
                                border-cyan-300/15
                                bg-white/[0.04]
                                backdrop-blur-xl
                                mb-8
                            "
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-300 blur-md opacity-80" />
                                <div className="relative w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                            </div>

                            <span className="text-cyan-100 text-sm font-black tracking-[0.22em] uppercase">
                                ApeChain Staking Layer
                            </span>
                        </motion.div>

                        {/* TITLE */}
                        <div className="mb-8">
                            <h2 className="text-6xl font-black tracking-tight text-white leading-none">
                                PrimalFi
                            </h2>

                            <p className="text-cyan-200/80 mt-4 text-xl font-medium">
                                Share-based staking infrastructure for ApeChain
                            </p>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-[#c4d4ff] text-xl leading-relaxed max-w-3xl font-medium">
                            PrimalFi is the first DeFi liquidity layer on ApeChain that replaces traditional staking yield with an index-based system where protocol-wide rewards drive all value accrual.
                        </p>

                        {/* STATUS */}
                        <div className="flex flex-wrap gap-4 mt-10">

                            {/* MAINNET */}
                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    flex
                                    items-center
                                    gap-3
                                    px-6
                                    py-4
                                    rounded-2xl
                                    border
                                    border-cyan-300/10
                                    bg-white/[0.04]
                                    backdrop-blur-2xl
                                    shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                                "
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5" />

                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-90" />
                                    <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                </div>

                                <span className="relative text-[#dcecff] font-semibold tracking-wide">
                                    ApeChain Mainnet Live
                                </span>
                            </div>

                            {/* VERSION */}
                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    flex
                                    items-center
                                    gap-3
                                    px-6
                                    py-4
                                    rounded-2xl
                                    border
                                    border-cyan-300/10
                                    bg-white/[0.04]
                                    backdrop-blur-2xl
                                    shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                                "
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5" />

                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-90" />
                                    <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                </div>

                                <span className="relative text-[#dcecff] font-semibold tracking-wide">
                                    Alpha 1.0.0
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                        {/* PROTOCOL */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[30px]
                                border
                                border-cyan-300/10
                                bg-white/[0.03]
                                backdrop-blur-xl
                                p-8
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

                            <div className="relative">
                                <p className="text-white font-black text-2xl mb-8">
                                    Resources
                                </p>

                                <div className="space-y-5">
                                    <a
                                        href="/protocol"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <Layers className="text-xl" />
                                        Protocol
                                    </a>

                                    <a
                                        href="/docs"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <BookSearch className="text-xl" />
                                        Docs
                                    </a>

                                    <a
                                        href="/contracts"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <Code className="text-xl" />
                                        Contracts
                                    </a>

                                    <a
                                        href="/brandkit"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <ImageUp className="text-xl" />
                                        Brand Kit
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* COMMUNITY */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[30px]
                                border
                                border-cyan-300/10
                                bg-white/[0.03]
                                backdrop-blur-xl
                                p-8
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

                            <div className="relative">
                                <p className="text-white font-black text-2xl mb-8">
                                    Community
                                </p>

                                <div className="space-y-5">

                                    <a
                                        href="https://x.com/primalfi_xyz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <FaXTwitter className="text-xl" />
                                        Twitter
                                    </a>

                                    <a
                                        href="#"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <FaDiscord className="text-xl" />
                                        Discord
                                    </a>

                                    <a
                                        href="#"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <FaTelegram className="text-xl" />
                                        Telegram
                                    </a>
                                    
                                    <a
                                        href="https://github.com/primalfi?tab=repositories"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            text-[#c4d4ff]
                                            hover:text-white
                                            transition-all
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        <FaGithub className="text-xl" />
                                        GitHub
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="relative my-16">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
                </div>

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* COPYRIGHT */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <p className="text-[#9bb6d3] font-medium">
                            © 2026 PrimalFi. Built for ApeChain.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="flex items-center gap-8 text-sm">

                        <Link
                            href="/terms"
                            className="
                                text-[#9bb6d3]
                                hover:text-white
                                transition-colors
                                font-semibold
                            "
                        >
                            Terms
                        </Link>

                        <Link
                            href="/privacy"
                            className="
                                text-[#9bb6d3]
                                hover:text-white
                                transition-colors
                                font-semibold
                            "
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
"use client";

import {
    Vault,
    Coins,
    TrendingUp,
    RefreshCcw,
    Layers3,
    Activity,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Componente para detectar cuando un elemento entra en viewport
const AnimatedOnScroll = ({ children, delay = 0, direction = "up", threshold = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 },
        none: { y: 0, x: 0 }
    };

    const startOffset = directions[direction] || directions.up;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...startOffset }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...startOffset }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

// Componente para cards con efecto hover y entrada escalonada
const StaggeredCard = ({ children, index, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function PrimalProtocolSection() {
    return (
        <section className="relative py-32 overflow-hidden">

            <div className="relative max-w-7xl mx-auto px-6">

                {/* ================= HEADER ================= */}
                <AnimatedOnScroll direction="up" delay={0.2}>
                    <div className="text-center mb-24">
                        <motion.div
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 mb-7"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-2 h-2 rounded-full bg-cyan-300"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <p className="text-cyan-200 font-black uppercase tracking-[0.25em] text-sm">
                                Primal Protocol Mechanics
                            </p>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
                            prAPE an Indexed
                            <motion.span
                                className="block text-cyan-300"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Liquidity Token
                            </motion.span>
                        </h2>
                    </div>
                </AnimatedOnScroll>

                {/* ================= MAIN FORMULA ================= */}
                <AnimatedOnScroll direction="up" delay={0.3}>
                    <motion.div
                        className="relative overflow-hidden rounded-[36px] border border-[#5d7cd1] bg-[#0d3cb1] p-10 md:p-14 mb-24 shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)
                                `,
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                            {/* LEFT */}
                            <div>
                                <motion.div
                                    className="flex items-center gap-4 mb-7"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center"
                                        whileHover={{ rotate: 10, scale: 1.05 }}
                                    >
                                        <Activity className="w-8 h-8 text-cyan-300" />
                                    </motion.div>
                                    <h3 className="text-4xl font-black text-white">Core accounting model</h3>
                                </motion.div>

                                <p className="text-[#bdd0ff] text-xl leading-relaxed mb-10">
                                    The protocol never stores a user balance directly.
                                    Instead, every position is reconstructed dynamically
                                    using immutable shares and a global growth index.
                                </p>

                                <motion.div
                                    className="rounded-[24px] border border-[#5f7fe0] bg-[#1646be] px-7 py-6 font-mono text-cyan-100 text-lg overflow-x-auto"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    balance = scaledAmount × liquidityIndex / 1e18
                                </motion.div>
                            </div>

                            {/* RIGHT */}
                            <div className="space-y-5">
                                {[
                                    {
                                        title: "scaledAmount",
                                        text: "Fixed protocol shares received when staking. This value NEVER changes."
                                    },
                                    {
                                        title: "liquidityIndex",
                                        text: "Global multiplier that represents accumulated protocol growth."
                                    },
                                    {
                                        title: "Real Balance",
                                        text: "User balances are reconstructed dynamically from immutable shares × liquidityIndex."
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-[24px] border border-[#5f7fe0] bg-[#1646be] p-6 cursor-pointer"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        whileHover={{ x: 6, borderColor: "rgba(34,211,238,0.5)" }}
                                    >
                                        <motion.h4
                                            className="text-white text-xl font-black mb-3"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {item.title}
                                        </motion.h4>
                                        <p className="text-[#bdd0ff] leading-relaxed">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatedOnScroll>

                {/* ================= FLOW ================= */}
                <div className="mb-28">
                    <AnimatedOnScroll direction="up" delay={0.2}>
                        <div className="text-center mb-16">
                            <motion.h3
                                className="text-5xl font-black text-white mb-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                How the system works
                            </motion.h3>
                            <motion.div
                                className="w-24 h-1 bg-cyan-400/50 mx-auto rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: 96 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            />
                        </div>
                    </AnimatedOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Vault,
                                title: "1. USER STAKES",
                                text: "APE enters the protocol and becomes productive liquidity."
                            },
                            {
                                icon: Layers3,
                                title: "2. SHARES CREATED",
                                text: "Immutable scaled shares are calculated from the current index."
                            },
                            {
                                icon: Coins,
                                title: "3. prAPE MINTED",
                                text: "Users receive prAPE as liquid protocol ownership."
                            },
                            {
                                icon: TrendingUp,
                                title: "4. INDEX GROWS",
                                text: "Rewards expand liquidityIndex and increase balances globally."
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <StaggeredCard key={index} index={index} className="relative overflow-hidden rounded-[30px] border border-[#5d7cd1] bg-[#0d3cb1] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] group">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />

                                    <div className="relative">
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center mb-6"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon className="w-8 h-8 text-cyan-300" />
                                        </motion.div>

                                        <h4 className="text-white text-2xl font-black mb-4">
                                            {item.title}
                                        </h4>

                                        <p className="text-[#bdd0ff] leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </StaggeredCard>
                            );
                        })}
                    </div>
                </div>

                {/* ================= EXPLANATION GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28">
                    {/* LEFT */}
                    <AnimatedOnScroll direction="right" delay={0.2}>
                        <motion.div
                            className="relative overflow-hidden rounded-[36px] border border-[#5d7cd1] bg-[#0d3cb1] p-10 shadow-[0_25px_80px_rgba(0,0,0,0.3)] group cursor-pointer"
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />

                            <div className="relative">
                                <motion.div
                                    className="flex items-center gap-4 mb-7"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center"
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <RefreshCcw className="w-7 h-7 text-cyan-300" />
                                    </motion.div>
                                    <h3 className="text-3xl font-black text-white">Rewards do NOT mint more tokens</h3>
                                </motion.div>

                                <div className="space-y-5 text-[#bdd0ff] text-lg leading-relaxed">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Rewards accumulate inside the protocol reserve.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        The protocol updates ONLY one global variable:
                                    </motion.p>

                                    <motion.div
                                        className="rounded-[22px] border border-[#5f7fe0] bg-[#1646be] p-6 font-mono text-cyan-100 overflow-x-auto"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        newIndex = oldIndex × (TVL + rewards) / TVL
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        This increases every user balance instantly.
                                    </motion.p>

                                    <motion.p
                                        className="text-white font-bold"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        No rebasing. No inflation. No balance rewrites.
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatedOnScroll>

                    {/* RIGHT */}
                    <AnimatedOnScroll direction="left" delay={0.3}>
                        <motion.div
                            className="relative overflow-hidden rounded-[36px] border border-[#5d7cd1] bg-[#0d3cb1] p-10 shadow-[0_25px_80px_rgba(0,0,0,0.3)] group cursor-pointer"
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />

                            <div className="relative">
                                <motion.div
                                    className="flex items-center gap-4 mb-7"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center"
                                        whileHover={{ rotate: -90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ShieldCheck className="w-7 h-7 text-cyan-300" />
                                    </motion.div>
                                    <h3 className="text-3xl font-black text-white">Why this model scales</h3>
                                </motion.div>

                                <div className="space-y-5 text-[#bdd0ff] text-lg leading-relaxed">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Traditional staking systems must update balances individually.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Primal only updates liquidityIndex globally.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Every account reflects the new value automatically.
                                    </motion.p>

                                    <motion.div
                                        className="rounded-[22px] border border-[#5f7fe0] bg-[#1646be] p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <p className="text-white font-black text-xl mb-4">Result</p>
                                        <ul className="space-y-3 text-cyan-100">
                                            {["Instant global reward distribution", "Gas efficient architecture", "Massive user scalability", "No manual claiming required"].map((item, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + idx * 0.05 }}
                                                >
                                                    • {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatedOnScroll>
                </div>

                {/* ================= WITHDRAW ================= */}
                <AnimatedOnScroll direction="up" delay={0.4}>
                    <motion.div
                        className="relative overflow-hidden rounded-[42px] border border-[#5d7cd1] bg-[#082c89] p-12 shadow-[0_30px_120px_rgba(0,0,0,0.35)] group"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/[0.04] to-transparent" />

                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)
                                `,
                                backgroundSize: "26px 26px",
                            }}
                        />

                        <div className="relative max-w-4xl">
                            <motion.div
                                className="flex items-center gap-4 mb-8"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ArrowRight className="w-8 h-8 text-cyan-300" />
                                </motion.div>
                                <h3 className="text-4xl font-black text-white">Withdraw mechanics</h3>
                            </motion.div>

                            <div className="space-y-6 text-[#c7d8ff] text-xl leading-relaxed">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Withdrawals reconstruct the current value of immutable shares
                                    using the latest liquidityIndex.
                                </motion.p>

                                <motion.div
                                    className="rounded-[24px] border border-[#5f7fe0] bg-[#1646be] p-7 font-mono text-cyan-100 overflow-x-auto"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    withdrawValue = scaledAmount × liquidityIndex / 1e18
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Early withdrawals trigger a penalty redirected into the reward reserve.
                                </motion.p>

                                <motion.p
                                    className="text-white font-bold"
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Early exits directly benefit long-term stakers and protocol sustainability.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatedOnScroll>
            </div>
        </section>
    );
}
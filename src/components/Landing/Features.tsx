"use client";

import { motion } from "framer-motion";
import AnimatedOnScroll from "./AnimatedOnScroll";

const Features = () => {
    const featuresList = [
        "Immutable scaled share accounting",
        "Dynamic liquidityIndex value growth",
        "Liquid ERC-20 staking asset (prAPE)",
        "Automatic balance appreciation",
        "No rebasing or inflation mechanics",
        "Fully on-chain balance reconstruction",
        "Transferable indexed staking positions",
        "RewardReserve distribution model",
        "Protocol-level early exit penalties",
        "7-day withdraw queue protection",
        "Instant global reward distribution",
        "APE-native liquidity infrastructure",
    ];

    return (
        <section id="features" className="relative pt-12 pb-12">
            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <AnimatedOnScroll direction="up" delay={0.2}>
                    <div className="text-center max-w-5xl mx-auto mb-24">
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
                                Protocol Features
                            </p>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-white">
                            Built around
                            <span className="block text-cyan-300">
                                indexed liquidity
                            </span>
                        </h2>
                        <p className="text-[#c4d4ff] text-2xl leading-relaxed font-medium">
                            Primal Protocol combines liquid staking, scaled accounting, and global index growth into a unified on-chain liquidity system.
                        </p>
                    </div>
                </AnimatedOnScroll>

                {/* Grid de Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                    {featuresList.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative rounded-[30px] border border-[#5d7cd1] bg-[#0d3cb1] px-8 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] cursor-pointer overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, threshold: 0.2 }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.4)" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[30px]" />
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full"
                                transition={{ duration: 0.6 }}
                            />
                            <div className="relative flex items-center gap-5">
                                <motion.div
                                    className="relative w-4 h-4 rounded-full bg-cyan-300 shrink-0 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-cyan-300"
                                        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                                    />
                                </motion.div>
                                <p className="text-white text-lg font-semibold leading-relaxed">
                                    {feature}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
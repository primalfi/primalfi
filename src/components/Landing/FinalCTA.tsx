"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedOnScroll from "./AnimatedOnScroll";

const FinalCTA = () => {
    return (
        <section className="relative pt-12 pb-12">
            <div className="relative max-w-5xl mx-auto px-6 text-center">
                {/* Token Logo Animado */}
                <AnimatedOnScroll direction="up" delay={0.2}>
                    <motion.div
                        className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#1140b3] border border-[#6f8fff] shadow-[0_20px_80px_rgba(0,0,0,0.35)] mb-12"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <img src="/prape.png" alt="prape" className="relative w-30 h-30 object-contain" />
                    </motion.div>
                </AnimatedOnScroll>

                {/* Título */}
                <AnimatedOnScroll direction="up" delay={0.3}>
                    <h2 className="text-5xl md:text-7xl font-black leading-[0.92] tracking-tight mb-8 text-white">
                        The future of
                        <span className="block text-cyan-300">
                            ApeChain staking
                        </span>
                    </h2>
                </AnimatedOnScroll>

                {/* Descripción */}
                <AnimatedOnScroll direction="up" delay={0.4}>
                    <p className="text-[#c4d4ff] text-2xl leading-relaxed max-w-4xl mx-auto mb-14 font-medium">
                        PrimalFi is a share-based staking protocol on ApeChain.
                        Users deposit APE and receive prAPE, a liquid staking token
                        representing ownership of the protocol liquidity pool.
                        Value grows automatically through liquidityIndex expansion.
                    </p>
                </AnimatedOnScroll>

                {/* Botón de Acción */}
                <AnimatedOnScroll direction="up" delay={0.5}>
                    <Link href="/stake" passHref>
                        <motion.button
                            className="group relative overflow-hidden inline-flex items-center gap-4 px-12 py-6 rounded-[24px] bg-[#0d3cb1] hover:bg-[#1646be] border border-[#6f8fff] cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            />
                            <span className="relative text-white text-xl font-black tracking-[0.12em] uppercase">
                                Enter the Protocol
                            </span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <ArrowRight className="relative w-6 h-6 text-cyan-200" />
                            </motion.div>
                        </motion.button>
                    </Link>
                </AnimatedOnScroll>
            </div>
        </section>
    );
};

export default FinalCTA;
"use client";

import { motion } from "framer-motion";
import RadarCore from "../Radar/RadarCore";
import AnimatedOnScroll from "./AnimatedOnScroll";

const WhatIsPrimal = () => {
    return (
        <section id="about" className="relative pt-12 pb-12">
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Columna Izquierda: Texto */}
                    <AnimatedOnScroll direction="right" delay={0.2}>
                        <div>
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
                                    About Primal Protocol
                                </p>
                            </motion.div>

                            <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight mb-10 text-white">
                                A liquid staking
                                <span className="block text-cyan-300">
                                    liquidity protocol
                                </span>
                                for ApeChain
                            </h2>

                            <div className="space-y-7">
                                {[
                                    "PrimalFi allows users to stake APE into a fully on-chain liquidity system while receiving prAPE, a liquid asset representing ownership inside the protocol.",
                                    "Instead of using rebasing or manual reward claiming, PrimalFi uses an indexed accounting model where protocol growth is reflected globally through liquidityIndex expansion.",
                                    "As rewards enter the system, the value backing every prAPE position increases automatically, creating a scalable liquidity layer for ApeChain DeFi."
                                ].map((text, index) => (
                                    <motion.p
                                        key={index}
                                        className="text-[#c4d4ff] text-xl leading-relaxed font-medium"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </AnimatedOnScroll>

                    {/* Columna Derecha: Radar */}
                    <AnimatedOnScroll direction="left" delay={0.3}>
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-cyan-400/10 blur-[80px]"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <RadarCore />
                        </div>
                    </AnimatedOnScroll>
                </div>
            </div>
        </section>
    );
};

export default WhatIsPrimal;
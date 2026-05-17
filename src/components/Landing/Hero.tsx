"use client";

import { motion } from "framer-motion";
import { Sparkles, Vault, ShieldCheck } from "lucide-react";
import AnimatedOnScroll from "./AnimatedOnScroll";
import StaggeredCard from "./StaggeredCard";
import RightPanel from "./RightPanel";

const Hero = ({ stats }) => {
    return (
        <section id="home" className="relative max-w-7xl mx-auto px-6 pt-40 pb-12">
            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-20 items-center">
                {/* Columna Izquierda: Texto y Tarjetas */}
                <AnimatedOnScroll direction="right" delay={0.2}>
                    <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Badge con Sparkles */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#4f6db3] bg-[#0c3db8] backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.08)] mb-8"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-4 h-4 text-white" />
                            </motion.div>
                            <span className="text-white text-sm font-semibold tracking-wide">
                                The first share-based DeFi protocol on ApeChain
                            </span>
                        </motion.div>

                        {/* Título Principal */}
                        <motion.h1
                            className="text-6xl md:text-8xl leading-[0.92] font-black tracking-tight max-w-5xl text-white"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Unlock the Full
                            <motion.span
                                className="block text-cyan-300"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Potential of APE
                            </motion.span>
                        </motion.h1>

                        {/* Descripción */}
                        <motion.p
                            className="text-[#c4d4ff] text-xl md:text-2xl mt-10 max-w-3xl leading-relaxed font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            PrimalFi is the first DeFi liquidity layer on ApeChain that replaces traditional staking yield with an index-based system where protocol-wide rewards drive all value accrual.
                        </motion.p>

                        {/* Tarjetas de Características (prAPE Model e Index-Based) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                            <StaggeredCard index={0} className="border border-[#4f6db3] bg-[#0c3db8] rounded-[32px] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-5">
                                        <motion.div
                                            className="w-14 h-14 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center"
                                            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                                        >
                                            <Vault className="w-7 h-7 text-cyan-200" />
                                        </motion.div>
                                        <h3 className="text-2xl font-black text-white">prAPE Model</h3>
                                    </div>
                                    <p className="text-cyan-100 leading-relaxed text-lg">
                                        Users deposit APE and receive prAPE representing a proportional share of the protocol reserves.
                                    </p>
                                </div>
                            </StaggeredCard>

                            <StaggeredCard index={1} className="border border-[#4f6db3] bg-[#0c3db8] rounded-[32px] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-5">
                                        <motion.div
                                            className="w-14 h-14 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center"
                                            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                                        >
                                            <ShieldCheck className="w-7 h-7 text-cyan-200" />
                                        </motion.div>
                                        <h3 className="text-2xl font-black text-white">Index-Based System</h3>
                                    </div>
                                    <p className="text-cyan-100 leading-relaxed text-lg">
                                        Value changes are driven exclusively by the Liquidity Index, not staking rewards or inflation.
                                    </p>
                                </div>
                            </StaggeredCard>
                        </div>
                    </motion.div>
                </AnimatedOnScroll>

                {/* Columna Derecha: Panel de Estado (RightPanel) */}
                <RightPanel stats={stats} />
            </div>
        </section>
    );
};

export default Hero;
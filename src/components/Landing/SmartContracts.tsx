"use client";

import { motion } from "framer-motion";
import { Database, Blocks, RefreshCcw, Activity } from "lucide-react";
import PrimalProtocolSection from "../PrimalProtocol";
import AnimatedOnScroll from "./AnimatedOnScroll";
import StaggeredCard from "./StaggeredCard";

const SmartContracts = () => {
    return (
        <section id="architecture" className="relative pt-12 pb-12">
            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <AnimatedOnScroll direction="up" delay={0.2}>
                    <div className="max-w-5xl mx-auto mb-20 text-center">
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
                                Smart Contract Architecture
                            </p>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black leading-[0.95] mb-8 text-white tracking-tight">
                            Indexed liquidity
                            <motion.span
                                className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent"
                                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: "200%" }}
                            >
                                accounting engine
                            </motion.span>
                        </h2>
                    </div>
                </AnimatedOnScroll>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {[
                        { icon: Database, title: "Underlying Liquidity", text: "The protocol tracks totalUnderlying liquidity separately from prAPE supply. All real value inside the system is derived from the underlying pool state." },
                        { icon: Blocks, title: "Scaled Share Accounting", text: "Each deposit is converted into immutable scaledAmount shares using the current liquidityIndex. These shares never change after staking." },
                        { icon: RefreshCcw, title: "Global Index Expansion", text: "Rewards stored in rewardReserve increase the liquidityIndex through distributeRewards(), instantly updating the value of every position globally." },
                        { icon: Activity, title: "Queued Withdraw System", text: "Withdrawals burn prAPE, reconstruct the user's current indexed value, and enter a 7-day withdraw queue before claim execution." },
                    ].map((item, index) => (
                        <StaggeredCard key={index} index={index} className="group relative rounded-[32px] border border-[#4f6db3] bg-[#0c3db8] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.30)]">
                            <motion.div
                                className="absolute -top-24 right-[-50px] w-[180px] h-[180px] rounded-full bg-cyan-400/10 blur-[80px]"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                            />
                            <div className="relative">
                                <motion.div
                                    className="w-20 h-20 rounded-[28px] bg-[#1848ca] border border-[#6e8eff] flex items-center justify-center mb-8 shadow-[0_10px_40px_rgba(6,182,212,0.15)]"
                                    whileHover={{ rotate: 10, scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <item.icon className="w-9 h-9 text-cyan-200" />
                                </motion.div>
                                <h3 className="text-3xl font-black mb-5 text-white tracking-tight">{item.title}</h3>
                                <p className="text-[#bdd0ea] leading-relaxed text-lg font-medium">{item.text}</p>
                            </div>
                        </StaggeredCard>
                    ))}
                </div>
            </div>
            <div id="mechanics">
                <PrimalProtocolSection />
            </div>
        </section>
    );
};

export default SmartContracts;
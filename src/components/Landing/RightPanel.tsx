"use client";

import { motion } from "framer-motion";
import AnimatedOnScroll from "./AnimatedOnScroll";
import { ProtocolMode } from "../../config/contracts";

interface ProtocolStats {
    tvl: string;
    totalUnderlying: string;
    totalStaked: string;
    liquidityIndex: number;
    exchangeRate: number;
    protocolFee: number;
    earlyPenalty: number;
    rewardReserve: string;
    protocolMode: ProtocolMode;
    protocolModeName: string;
    protocolBalance: string;
    distributionBps: number;
    distributionPercent: number;
}

interface RightPanelProps {
    stats: ProtocolStats;
}

const RightPanel = ({ stats }: RightPanelProps) => {

    return (
        <AnimatedOnScroll direction="left" delay={0.3}>
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
                whileHover={{ scale: 1.02 }}
            >
                {/* Outer Glow */}
                <motion.div
                    className="absolute inset-0 bg-cyan-500/15 blur-[100px]"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Main Card */}
                <div className="relative rounded-[30px] border border-[#4f6db3] bg-[#0c3db8] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    {/* Header */}
                    <div className="relative border-b border-[#5d7cd1] px-8 py-7">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-100 text-sm uppercase tracking-[0.25em] font-black">
                                    Protocol Overview
                                </p>
                                <h3 className="text-white text-5xl font-black mt-3 tracking-tight">
                                    prAPE
                                </h3>
                            </div>
                            <motion.div
                                className="w-20 h-20 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img src="/prape.png" alt="prape" className="w-18 h-18 object-contain" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="relative p-6 md:p-8">
                        {/* Exchange Rate Box */}
                        <motion.div
                            className="relative rounded-[28px] border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-7 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.20em] mb-5">
                                Liquidity Index
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-white text-5xl md:text-6xl font-black leading-none">
                                        1 prAPE
                                    </h2>
                                    <motion.p
                                        className="text-cyan-200 text-2xl md:text-3xl font-black mt-4"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        ≈ {(stats?.liquidityIndex || 0).toFixed(6)} APE
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats List */}
                        <div className="space-y-5">
                            {/* TVL */}
                            <motion.div
                                className="relative rounded-[24px] border border-[#5473d1] bg-[#1646be] px-6 py-5 cursor-pointer"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.16em]">
                                            Total Value Locked
                                        </p>
                                    </div>
                                    <motion.p
                                        className="text-white text-2xl font-black tracking-tight text-right"
                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                    >
                                        {parseFloat(stats?.tvl || "0").toLocaleString("en-US", {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1
                                        })} APE
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* Circulating prAPE */}
                            <motion.div
                                className="relative rounded-[24px] border border-[#5473d1] bg-[#1646be] px-6 py-5 cursor-pointer"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.16em]">
                                            Circulating prAPE
                                        </p>
                                    </div>
                                    <motion.p
                                        className="text-white text-2xl font-black tracking-tight text-right"
                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                    >
                                        {parseFloat(stats?.totalStaked || "0").toLocaleString("en-US", {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1
                                        })} prAPE
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* Exchange Rate (prAPE to APE) */}
                            <motion.div
                                className="relative rounded-[24px] border border-[#5473d1] bg-[#1646be] px-6 py-5 cursor-pointer"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.16em]">
                                            Protocol Exchange Rate
                                        </p>
                                        <p className="text-cyan-300 text-xs mt-1">1 prAPE</p>
                                    </div>
                                    <motion.p
                                        className="text-white text-2xl font-black tracking-tight text-right"
                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                                    >
                                        = {(stats?.exchangeRate || 0).toFixed(2)} APE
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatedOnScroll>
    );
};

export default RightPanel;
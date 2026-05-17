"use client";

import { Vault, Coins, Percent, TrendingUpDown, Fuel, Gift, Shield, AlertTriangle } from "lucide-react";
import DynamicAPY from "./DynamicAPY";
import { ProtocolMode } from "../../config/contracts";

interface ProtocolStatsProps {
    stats: {
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
    };
    estimatedAPY: number;
}

export default function ProtocolStats({ stats, estimatedAPY }: ProtocolStatsProps) {

    // Get protocol mode color and icon
    const getProtocolModeDisplay = () => {
        switch (stats.protocolMode) {
            case ProtocolMode.Live:
                return { color: "text-green-400", bg: "bg-green-500/50", border: "border-green-500/30", icon: <Shield className="w-4 h-4 text-green-400" />, text: "LIVE" };
            case ProtocolMode.DepositsPaused:
                return { color: "text-yellow-400", bg: "bg-yellow-500/50", border: "border-yellow-500/30", icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />, text: "DEPOSITS PAUSED" };
            case ProtocolMode.WithdrawalsPaused:
                return { color: "text-orange-400", bg: "bg-orange-500/50", border: "border-orange-500/30", icon: <AlertTriangle className="w-4 h-4 text-orange-400 " />, text: "WITHDRAWALS PAUSED" };
            case ProtocolMode.EmergencyOnly:
                return { color: "text-red-400", bg: "bg-red-500/50", border: "border-red-500/30", icon: <Shield className="w-4 h-4 text-red-400" />, text: "EMERGENCY ONLY" };
            default:
                return { color: "text-gray-400", bg: "bg-gray-500/50", border: "border-gray-500/30", icon: <Shield className="w-4 h-4 text-gray-400" />, text: "UNKNOWN" };
        }
    };

    const modeDisplay = getProtocolModeDisplay();

    return (
        <section className="py-10">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <p className="text-cyan-300 font-black uppercase tracking-[0.25em] mb-2 text-xs">
                        Protocol Analytics
                    </p>
                    <h2 className="text-3xl font-black text-white">Protocol Stats</h2>
                </div>

                {/* Protocol Mode Badge */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${modeDisplay.bg} ${modeDisplay.border}`}>
                    {modeDisplay.icon}
                    <span className={`text-xs font-black tracking-wider ${modeDisplay.color}`}>
                        {modeDisplay.text}
                    </span>
                </div>
            </div>

            {/* Row 1 - 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* TVL */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <Vault className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">TVL</span>
                    </div>
                    <p className="text-white text-2xl font-black">
                        {parseFloat(stats.tvl).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                    <p className="text-cyan-300 text-xs font-bold mt-1">APE Locked</p>
                </div>

                {/* prAPE Supply */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <Coins className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">SUPPLY</span>
                    </div>
                    <p className="text-white text-2xl font-black">
                        {parseFloat(stats.totalStaked).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                    <p className="text-cyan-300 text-xs font-bold mt-1">prAPE Minted</p>
                </div>

                {/* APY */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <Percent className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">APY</span>
                    </div>
                    <div className="text-white text-3xl font-black">
                        <DynamicAPY
                            estimatedAPY={estimatedAPY}
                            liquidityIndex={stats.liquidityIndex}
                            protocolBalance={stats.protocolBalance}
                        />
                    </div>
                    <p className="text-cyan-300 text-xs font-bold mt-1">Dynamic yield</p>
                </div>
            </div>

            {/* Row 2 - 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">


                {/* Liquidity Index */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <TrendingUpDown className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">INDEX</span>
                    </div>
                    <p className="text-white text-2xl font-black">{stats.liquidityIndex.toFixed(6)}</p>
                    <p className="text-cyan-300 text-xs font-bold mt-1">APE per prAPE</p>
                </div>

                {/* Exchange Rate */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <TrendingUpDown className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">RATE</span>
                    </div>
                    <p className="text-white text-2xl font-black">{stats.exchangeRate.toFixed(6)}</p>
                    <p className="text-cyan-300 text-xs font-bold mt-1">prAPE → APE</p>
                </div>

                {/* Fees & Penalty */}
                <div className="rounded-[20px] border border-[#4f6db3] bg-[#0c3db8] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between mb-3">
                        <Fuel className="w-6 h-6 text-cyan-200" />
                        <span className="text-xs text-cyan-200 font-black tracking-[0.18em]">FEES</span>
                    </div>
                    <p className="text-white text-xl font-black">Stake: {stats.protocolFee}%</p>
                    <p className="text-orange-300 text-sm font-bold mt-1">Early Penalty: {stats.earlyPenalty}%</p>
                </div>
            </div>
        </section>
    );
}
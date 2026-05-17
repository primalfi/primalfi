"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Info, ArrowRight, AlertTriangle, ShieldAlert } from "lucide-react";
import DynamicAPY from "./DynamicAPY";
import toast from "react-hot-toast";

import { ProtocolMode } from "../../config/contracts";

interface StakingPanelProps {
    userAPEBalance: string;
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
        treasurySplit?: number;
    };
    estimatedAPY: number;
    periodDays: number;
    setPeriodDays: (days: number) => void;
    onStake: (amount: string, periodDays: number) => Promise<void>;
    isLoading: boolean;
}

const periods = [
    { days: 30, label: "30 Days" },
    { days: 60, label: "60 Days" },
    { days: 90, label: "90 Days" },
];

export default function StakingPanel({
    userAPEBalance,
    stats,
    estimatedAPY,
    periodDays,
    setPeriodDays,
    onStake,
    isLoading,
}: StakingPanelProps) {
    const [amount, setAmount] = useState("");

    const parsedAmount = parseFloat(amount || "0");

    // Calculate fees based on protocol fee (200 = 2%)
    const protocolFeePercent = stats.protocolFee || 2;
    const feeAmount = parsedAmount * (protocolFeePercent / 100);

    // Treasury split (2500 = 25% of fee goes to treasury, 75% to rewards reserve)
    const treasurySplitPercent = stats.treasurySplit ? stats.treasurySplit / 100 : 25;

    const receiveAmount = parsedAmount - feeAmount;

    // Check if deposits are allowed
    const canDeposit = stats.protocolMode === ProtocolMode.Live ||
        stats.protocolMode === ProtocolMode.WithdrawalsPaused;

    const isEmergencyMode = stats.protocolMode === ProtocolMode.EmergencyOnly;

    const handleStake = async () => {
        if (!canDeposit) {
            toast.error("Deposits are currently paused");
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        if (parseFloat(amount) > parseFloat(userAPEBalance)) {
            toast.error("Insufficient balance");
            return;
        }

        await onStake(amount, periodDays);
        setAmount("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-2xl mx-auto"
        >
            <div className="absolute inset-0 bg-cyan-500/15 blur-[100px]" />

            <div className="relative overflow-hidden rounded-[30px] border border-[#4f6db3] bg-[#0c3db8] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* MODE WARNING BANNER */}
                {!canDeposit && (
                    <div className="relative bg-red-500/20 border-b border-red-500/50 p-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                            {isEmergencyMode ? (
                                <ShieldAlert className="w-5 h-5 text-red-400" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            )}
                            <p className="text-red-200 font-bold text-sm uppercase tracking-wider">
                                {isEmergencyMode
                                    ? "EMERGENCY MODE ACTIVE - DEPOSITS DISABLED"
                                    : "DEPOSITS PAUSED - NEW STAKES NOT ACCEPTED"}
                            </p>
                            {isEmergencyMode && (
                                <ShieldAlert className="w-5 h-5 text-red-400" />
                            )}
                        </div>
                    </div>
                )}

                {/* Period Tabs */}
                <div className="grid grid-cols-3 border-b border-[#5d7cd1]">
                    {periods.map((period) => (
                        <button
                            key={period.days}
                            onClick={() => canDeposit && setPeriodDays(period.days)}
                            disabled={!canDeposit}
                            className={`
                                relative py-5 text-center transition-all border-r border-[#5d7cd1] last:border-r-0
                                ${periodDays === period.days ? "bg-[#2457db]" : "bg-[#0d3cb1] hover:bg-[#1848ca]"}
                                ${!canDeposit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            `}
                        >
                            {periodDays === period.days && (
                                <div className="absolute inset-0 bg-cyan-400/10" />
                            )}
                            <div className="relative">
                                <p className="text-white text-lg font-black tracking-[0.18em] uppercase">
                                    {period.days}D
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="relative p-6 md:p-8">
                    {/* Input Section */}
                    <div className={`relative rounded-[28px] border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-6 ${!canDeposit ? 'opacity-60' : ''}`}>
                        <div className="flex items-start justify-between mb-5">
                            <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.20em]">
                                Stake
                            </p>
                            <div className="flex items-center gap-3">
                                <p className="text-cyan-200 text-sm font-semibold whitespace-nowrap">
                                    Balance:{" "}
                                    {parseFloat(userAPEBalance || "0").toLocaleString("en-US", {
                                        maximumFractionDigits: 4,
                                    })}
                                </p>
                                <button
                                    onClick={() => canDeposit && setAmount(userAPEBalance)}
                                    disabled={!canDeposit}
                                    className="px-4 py-2 rounded-xl bg-[#082c89] hover:bg-[#0d2875] text-cyan-200 font-black text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-5 flex-1">
                                <div className="w-[50px] h-[50px] rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center shrink-0">
                                    <img src="/apecoin.png" alt="APE" className="w-[45px] h-[45px] object-contain" />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => canDeposit && setAmount(e.target.value)}
                                        placeholder="0"
                                        step="0.01"
                                        disabled={!canDeposit}
                                        className="no-spinner bg-transparent outline-none w-full text-white text-4xl font-black leading-none placeholder:text-[#8fb0ff] disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-4">
                                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1848ca] border border-[#6e8eff]">
                                    <img src="/apecoin.png" alt="APE" className="w-8 h-8 rounded-full" />
                                    <span className="text-white text-2xl font-black">APE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="relative z-20 flex justify-center -my-5">
                        <div className="w-15 h-15 rounded-full bg-[#0d2d86] border-[3px] border-[#ff9d7d] flex items-center justify-center shadow-lg">
                            <ArrowDown className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Receive Section */}
                    <div className={`relative rounded-[28px] border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-6 ${!canDeposit ? 'opacity-60' : ''}`}>
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-cyan-100 text-sm font-black uppercase tracking-[0.20em]">
                                Receive
                            </p>
                            <p className="text-cyan-200 text-sm font-semibold">
                                Staking Index position
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-5 flex-1">
                                <div className="w-[50px] h-[50px] rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center shrink-0">
                                    <img src="/prape.png" alt="prAPE" className="w-[45px] h-[45px] object-contain" />
                                </div>
                                <div className="w-full">
                                    <p className="text-white text-4xl font-black leading-none">
                                        {receiveAmount > 0 ? receiveAmount.toFixed(6) : "0"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1848ca] border border-[#6e8eff]">
                                <img src="/prape.png" alt="prAPE" className="w-8 h-8 rounded-full" />
                                <span className="text-white text-2xl font-black">prAPE</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-6 rounded-[24px] border border-[#5473d1] bg-[#1646be] px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-cyan-100 text-lg font-medium">Platform Fee</p>
                                <div className="relative group">
                                    <Info className="w-4 h-4 text-[#617b94] cursor-help" />
                                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-72 p-3 bg-white border border-[#e6eef5] rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                        <p className="text-xs text-[#617b94]">
                                            {protocolFeePercent}% fee on each stake.
                                            {treasurySplitPercent}% goes to treasury,
                                            {(100 - treasurySplitPercent)}% goes to rewards reserve.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white text-2xl font-black">{protocolFeePercent}%</p>
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center gap-2">
                                <p className="text-cyan-100 text-lg font-medium">Estimated APY</p>
                                <div className="relative group">
                                    <Info className="w-4 h-4 text-[#617b94] cursor-help" />
                                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 p-3 bg-white border border-[#e6eef5] rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                        <p className="text-xs text-[#617b94]">
                                            APY is calculated from liquidity index growth and reward distributions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <DynamicAPY
                                estimatedAPY={estimatedAPY}
                                liquidityIndex={stats.liquidityIndex}
                                protocolBalance={stats.protocolBalance}
                            />
                        </div>

                        <div className="mt-5 pt-5 border-t border-[#5f7fe0]/40 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-cyan-200 font-medium">Total Fee</p>
                                <p className="text-white font-black">
                                    {feeAmount > 0 ? feeAmount.toFixed(6) : "0"} APE
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-cyan-200 font-medium">You Receive</p>
                                <p className="text-white font-black">
                                    {receiveAmount > 0 ? receiveAmount.toFixed(6) : "0"} prAPE
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-cyan-200 font-medium">Lock Time</p>
                                <p className="text-white font-black">{periodDays} Days</p>
                            </div>
                        </div>
                    </div>

                    {/* Stake Button */}
                    <button
                        onClick={handleStake}
                        disabled={!amount || isLoading || parseFloat(amount) > parseFloat(userAPEBalance) || !canDeposit}
                        className="group relative overflow-hidden w-full mt-7 py-6 rounded-[22px] bg-[#082c89] hover:bg-[#0b37a5] border border-[#78a1ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {isLoading ? (
                            <div className="relative flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span className="text-white font-black tracking-[0.18em] uppercase">Processing</span>
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center gap-4 cursor-pointer">
                                <span className="text-white text-xl font-black tracking-[0.18em] uppercase">
                                    {!canDeposit
                                        ? (isEmergencyMode ? "Emergency Mode" : "Deposits Paused")
                                        : "Stake APE"}
                                </span>
                                <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
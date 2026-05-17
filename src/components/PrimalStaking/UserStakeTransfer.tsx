"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Send,
    Wallet,
    Info,
    Coins,
    ShieldAlert,
    AlertTriangle,
    Eye,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import toast from "react-hot-toast";
import { ProtocolMode } from "../../config/contracts";

interface Stake {
    currentValue: string;
    index: number;
    isUnlocked?: boolean;
    period?: number;
    formattedDeposited?: string;
    timeRemaining?: string;
}

interface TransferStakePositionProps {
    stakes: Stake[];
    transferStakePosition: (
        to: string,
        amount: string
    ) => Promise<any>;
    onTransferSuccess?: () => Promise<void>;
    loading?: boolean;
    protocolMode?: ProtocolMode;
    canTransfer?: boolean;
}

export default function TransferStakePosition({
    stakes,
    transferStakePosition,
    onTransferSuccess,
    loading,
    protocolMode = ProtocolMode.Live,
    canTransfer = true,
}: TransferStakePositionProps) {

    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // =====================================================
    // CHECK IF TRANSFERS ARE ALLOWED
    // =====================================================

    const isTransferAllowed = useMemo(() => {
        if (protocolMode === ProtocolMode.EmergencyOnly) {
            return false;
        }
        return canTransfer;
    }, [protocolMode, canTransfer]);

    const getDisabledReason = (): string => {
        if (protocolMode === ProtocolMode.EmergencyOnly) {
            return "Transfers are disabled in Emergency Mode";
        }
        if (protocolMode === ProtocolMode.DepositsPaused) {
            return "Transfers may be limited while deposits are paused";
        }
        if (!canTransfer) {
            return "Transfers are currently disabled";
        }
        return "";
    };

    // =====================================================
    // TOTAL BALANCE (ALL STAKES)
    // =====================================================

    const totalBalance = useMemo(() => {
        return stakes.reduce((total, stake) => {
            const value = parseFloat(stake.currentValue || "0");
            return total + (isNaN(value) ? 0 : value);
        }, 0);
    }, [stakes]);

    const activeStakesCount = stakes.length;

    // =====================================================
    // FIFO PREVIEW - Calculate which positions will be transferred
    // =====================================================

    const fifoPreview = useMemo(() => {
        const transferAmount = parseFloat(amount) || 0;
        if (transferAmount <= 0 || stakes.length === 0) {
            return { positions: [], totalToTransfer: 0, remainingAmount: 0 };
        }

        // Sort stakes by index (oldest first = FIFO)
        const sortedStakes = [...stakes].sort((a, b) => a.index - b.index);
        
        const positions: {
            index: number;
            value: number;
            toTransfer: number;
            isFullyTransferred: boolean;
            period: number;
            isUnlocked: boolean;
        }[] = [];
        
        let remainingToTransfer = transferAmount;
        let totalToTransfer = 0;

        for (const stake of sortedStakes) {
            const stakeValue = parseFloat(stake.currentValue || "0");
            
            if (remainingToTransfer <= 0) break;
            
            if (stakeValue <= remainingToTransfer) {
                // Transfer entire position
                positions.push({
                    index: stake.index,
                    value: stakeValue,
                    toTransfer: stakeValue,
                    isFullyTransferred: true,
                    period: stake.period || 0,
                    isUnlocked: stake.isUnlocked || false,
                });
                totalToTransfer += stakeValue;
                remainingToTransfer -= stakeValue;
            } else {
                // Transfer partial from this position
                positions.push({
                    index: stake.index,
                    value: stakeValue,
                    toTransfer: remainingToTransfer,
                    isFullyTransferred: false,
                    period: stake.period || 0,
                    isUnlocked: stake.isUnlocked || false,
                });
                totalToTransfer += remainingToTransfer;
                remainingToTransfer = 0;
            }
        }

        return { 
            positions, 
            totalToTransfer, 
            remainingAmount: remainingToTransfer 
        };
    }, [stakes, amount]);

    // =====================================================
    // TRANSFER
    // =====================================================

    const handleTransfer = async () => {
        if (!isTransferAllowed) {
            const reason = getDisabledReason();
            return toast.error(reason || "Transfers are currently disabled");
        }

        if (!receiver) {
            return toast.error("Enter receiver address");
        }

        if (!/^0x[a-fA-F0-9]{40}$/.test(receiver)) {
            return toast.error("Invalid Ethereum address");
        }

        if (receiver.toLowerCase() === (typeof window !== 'undefined' && (window as any).ethereum?.selectedAddress?.toLowerCase())) {
            return toast.error("Cannot transfer to yourself");
        }

        if (!amount || parseFloat(amount) <= 0) {
            return toast.error("Invalid amount");
        }

        if (parseFloat(amount) > totalBalance) {
            return toast.error("Amount exceeds total balance");
        }

        if (activeStakesCount === 0) {
            return toast.error("No active stakes to transfer");
        }

        // Check if amount exceeds what's available (FIFO)
        if (fifoPreview.remainingAmount > 0) {
            return toast.error(`Insufficient balance. Only ${totalBalance.toFixed(4)} prAPE available to transfer.`);
        }

        // Confirm transfer with user
        const confirmMessage = `You are about to transfer ${parseFloat(amount).toFixed(4)} prAPE to ${receiver.slice(0, 6)}...${receiver.slice(-4)}\n\n${fifoPreview.positions.length} position(s) will be affected. Continue?`;
        
        if (!window.confirm(confirmMessage)) {
            return;
        }

        try {
            setIsSubmitting(true);

            const result = await transferStakePosition(receiver, amount);

            if (result?.success) {
                toast.success(`Successfully transferred ${parseFloat(amount).toFixed(4)} prAPE`);

                if (onTransferSuccess) {
                    await onTransferSuccess();
                }

                setReceiver("");
                setAmount("");
                setShowPreview(false);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.reason || error?.message || "Transfer failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // =====================================================
    // SET MAX AMOUNT
    // =====================================================

    const handleSetMax = () => {
        if (!isTransferAllowed) {
            toast.error(getDisabledReason());
            return;
        }
        if (totalBalance > 0) {
            setAmount(totalBalance.toFixed(6));
        }
    };

    // =====================================================
    // GET PERIOD LABEL
    // =====================================================

    const getPeriodLabel = (period: number): string => {
        if (period === 2592000) return "30D";
        if (period === 5184000) return "60D";
        if (period === 7776000) return "90D";
        return `${period / 86400}D`;
    };

    return (
        <section id="transfer" className="py-14 border-t border-[#dce8f2]/10">
            <div className="mb-10">
                <p className="text-cyan-300 font-bold uppercase tracking-[0.25em] mb-4">
                    Transfer Primal Ape
                </p>
                <h2 className="text-5xl font-black text-white">
                    Token Transfer
                </h2>
            </div>

            {/* WARNING BANNERS */}
            {protocolMode === ProtocolMode.EmergencyOnly && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-[20px] border border-red-500/50 bg-red-500/10 p-5 flex items-center gap-4"
                >
                    <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
                    <div>
                        <p className="text-red-200 font-bold">EMERGENCY MODE ACTIVE</p>
                        <p className="text-red-300 text-sm">
                            Transfers are disabled during emergency mode for security reasons.
                        </p>
                    </div>
                </motion.div>
            )}

            {protocolMode === ProtocolMode.DepositsPaused && isTransferAllowed && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-[20px] border border-yellow-500/50 bg-yellow-500/10 p-5 flex items-center gap-4"
                >
                    <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0" />
                    <div>
                        <p className="text-yellow-200 font-bold">Deposits Paused</p>
                        <p className="text-yellow-300 text-sm">
                            Transfers are still available, but new deposits are temporarily disabled.
                        </p>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-[#4f6db3]
                    bg-[#0c3db8]
                    shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                    ${!isTransferAllowed ? 'opacity-75' : ''}
                `}
            >
                <div className="relative p-8">

                    {/* TOTAL BALANCE */}
                    <div className="mb-8">
                        <label className="text-cyan-200 text-sm font-black uppercase tracking-[0.18em] block mb-4">
                            Your Positions
                        </label>

                        <div className="rounded-[24px] border border-[#5473d1] bg-[#1646be] p-6 relative overflow-hidden">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#082c89] border border-[#7394ff] flex items-center justify-center">
                                        <img src="/prape.png" alt="prAPE" className="w-10 h-10 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-black">Total prAPE Balance</p>
                                        <p className="text-cyan-100 text-2xl font-black">{totalBalance.toFixed(6)} prAPE</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-cyan-200 text-xs font-bold uppercase tracking-[0.2em]">Active Positions</p>
                                    <p className="text-white font-black text-xl">{activeStakesCount}</p>
                                </div>
                            </div>

                            {totalBalance > 0 && isTransferAllowed && (
                                <div className="mt-4 pt-4 border-t border-[#5f7fe0]/30 flex justify-between items-center">
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="px-4 py-2 rounded-xl bg-[#0d2d86] hover:bg-[#123aa3] text-cyan-200 font-black text-sm transition-all cursor-pointer flex items-center gap-2"
                                    >
                                        {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        {showPreview ? "Hide FIFO Preview" : "Show FIFO Preview"}
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleSetMax}
                                        className="px-4 py-2 rounded-xl bg-[#082c89] hover:bg-[#0d2875] text-cyan-200 font-black text-sm transition-all cursor-pointer"
                                    >
                                        MAX
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* FIFO PREVIEW */}
                    {showPreview && fifoPreview.positions.length > 0 && parseFloat(amount) > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mb-8 rounded-[24px] border border-cyan-500/30 bg-[#0d2d86]/50 p-5 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="w-5 h-5 text-cyan-300" />
                                <p className="text-cyan-100 font-bold text-sm">FIFO Transfer Preview</p>
                            </div>
                            
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {fifoPreview.positions.map((pos, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded-xl p-3 border ${
                                            pos.isFullyTransferred
                                                ? "border-orange-500/50 bg-orange-500/10"
                                                : "border-cyan-500/50 bg-cyan-500/10"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white font-black">#{pos.index}</span>
                                                <span className="text-cyan-300 text-xs px-2 py-0.5 rounded bg-[#0c3db8]">
                                                    {getPeriodLabel(pos.period)}
                                                </span>
                                                {pos.isUnlocked ? (
                                                    <span className="text-green-300 text-xs">Unlocked</span>
                                                ) : (
                                                    <span className="text-yellow-300 text-xs">Locked</span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">
                                                    {pos.toTransfer.toFixed(4)} prAPE
                                                </p>
                                                <p className="text-cyan-300 text-xs">
                                                    {pos.isFullyTransferred ? "Full position" : `Partial (of ${pos.value.toFixed(4)})`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-cyan-500/30 flex justify-between">
                                <span className="text-cyan-200 font-bold">Total to Transfer:</span>
                                <span className="text-white font-black">{fifoPreview.totalToTransfer.toFixed(6)} prAPE</span>
                            </div>
                            
                            {fifoPreview.remainingAmount > 0 && (
                                <div className="mt-2 text-red-300 text-sm">
                                    ⚠️ Insufficient balance: {fifoPreview.remainingAmount.toFixed(4)} prAPE exceeds available
                                </div>
                            )}
                            
                            <p className="text-cyan-300 text-xs mt-3">
                                * Positions are transferred in order of creation (oldest first)
                            </p>
                        </motion.div>
                    )}

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* ADDRESS */}
                        <div>
                            <label className="text-cyan-200 text-sm font-black uppercase tracking-[0.18em] block mb-4">
                                Receiver Address
                            </label>
                            <div className="relative">
                                <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                                <input
                                    type="text"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    placeholder="0x..."
                                    disabled={!isTransferAllowed}
                                    className="w-full h-16 rounded-[22px] border border-[#5f7fe0] bg-[#1848ca] pl-14 pr-5 text-2xl text-white font-semibold outline-none placeholder:text-cyan-300/60 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* AMOUNT */}
                        <div>
                            <label className="text-cyan-200 text-sm font-black uppercase tracking-[0.18em] block mb-4">
                                Transfer Amount
                            </label>
                            <div className="relative">
                                <Coins className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    disabled={!isTransferAllowed}
                                    className="w-full h-16 rounded-[22px] border border-[#5f7fe0] bg-[#1848ca] pl-14 pr-5 text-white text-2xl font-black outline-none placeholder:text-cyan-300/60 disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* INFO - FIFO EXPLANATION */}
                    <div className="mb-8 rounded-[24px] border border-[#5473d1] bg-[#1646be] p-5">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-cyan-200 shrink-0" />
                            <div>
                                <p className="text-cyan-100 text-sm leading-relaxed">
                                    The protocol will automatically take from your <strong className="text-white">oldest active positions first (FIFO)</strong> while preserving lock time and yield distribution.
                                </p>
                                <p className="text-cyan-300 text-xs mt-2">
                                    ⚡ Maximum 50 positions per transfer transaction (automatically handled by the protocol).
                                </p>
                                <p className="text-cyan-300 text-xs mt-1">
                                    💡 Enter an amount above to preview which positions will be transferred.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleTransfer}
                        disabled={
                            loading ||
                            isSubmitting ||
                            !receiver ||
                            !amount ||
                            !isTransferAllowed ||
                            totalBalance === 0 ||
                            fifoPreview.remainingAmount > 0
                        }
                        className="group relative overflow-hidden w-full py-6 rounded-[22px] bg-[#082c89] hover:bg-[#0b37a5] border border-[#78a1ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="relative flex items-center justify-center gap-4">
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-white text-xl font-black tracking-[0.18em] uppercase">Processing</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-white text-xl font-black tracking-[0.18em] uppercase">
                                        {!isTransferAllowed
                                            ? "Transfers Disabled"
                                            : totalBalance === 0
                                                ? "No Positions to Transfer"
                                                : fifoPreview.remainingAmount > 0
                                                    ? "Insufficient Balance"
                                                    : "Transfer prAPE"}
                                    </span>
                                    {isTransferAllowed && totalBalance > 0 && fifoPreview.remainingAmount === 0 && (
                                        <Send className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
                                    )}
                                </>
                            )}
                        </div>
                    </button>

                    {!isTransferAllowed && (
                        <p className="text-center text-red-300 text-sm mt-4">⚠️ {getDisabledReason()}</p>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
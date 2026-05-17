"use client";

import { useState, useEffect } from "react";
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    Wallet,
    ArrowRight,
    XCircle,
    ShieldAlert
} from "lucide-react";

import { formatAPE } from "../../utils/ethers";
import { MIN_QUEUE_TIME, ProtocolMode } from "../../config/contracts";
import toast from "react-hot-toast";

interface WithdrawQueueProps {
    userAddress: string;
    onClaimSuccess: () => void;
    earlyPenalty: number;
    onEmptyState?: (hasData: boolean) => void;
    protocolMode?: ProtocolMode;
    isEmergencyMode?: boolean;
    onClaimWithdraw?: (queueIndex: number, requestId: number) => Promise<any>;
    withdrawQueue?: any[];
}

interface WithdrawRequest {
    user: string;
    amount: string;
    amountRaw: string;
    requestTime: number;
    claimed: boolean;
    queueIndex: number;
    requestId: number;
    canClaim: boolean;
    timeRemaining: string;
}

export default function WithdrawQueue({
    userAddress,
    onClaimSuccess,
    earlyPenalty,
    onEmptyState,
    protocolMode = ProtocolMode.Live,
    isEmergencyMode = false,
    onClaimWithdraw,
    withdrawQueue: externalWithdrawQueue,
}: WithdrawQueueProps) {

    const [requests, setRequests] = useState<WithdrawRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [claimingRequest, setClaimingRequest] = useState<{ queueIndex: number; requestId: number } | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Emergency mode allows immediate claim without queue time
    const effectiveMinQueueTime = isEmergencyMode ? 0 : MIN_QUEUE_TIME;

    // Función para procesar los datos de withdrawQueue
    const processWithdrawQueue = () => {
        if (!externalWithdrawQueue || externalWithdrawQueue.length === 0) {
            setRequests([]);
            setIsInitialLoading(false);
            if (onEmptyState) {
                onEmptyState(false);
            }
            return;
        }

        const formattedRequests: WithdrawRequest[] = externalWithdrawQueue
            .filter((req: any) => req.user?.toLowerCase() === userAddress?.toLowerCase())
            .map((req: any) => {
                const requestTime = req.requestTime;
                const now = Math.floor(Date.now() / 1000);
                const unlockTime = requestTime + effectiveMinQueueTime;
                const canClaim = isEmergencyMode ? true : (now >= unlockTime);
                
                let timeRemaining = "";
                if (canClaim) {
                    timeRemaining = isEmergencyMode ? "Emergency - Claim Now" : "Ready to claim";
                } else {
                    const remainingSecs = unlockTime - now;
                    const days = Math.floor(remainingSecs / (24 * 60 * 60));
                    const hours = Math.floor((remainingSecs % (24 * 60 * 60)) / (60 * 60));
                    if (days > 0) {
                        timeRemaining = `${days}d ${hours}h`;
                    } else if (hours > 0) {
                        timeRemaining = `${hours}h`;
                    } else {
                        timeRemaining = "Less than 1 hour";
                    }
                }

                return {
                    user: req.user,
                    amount: req.formattedAmount || formatAPE(req.amount),
                    amountRaw: req.amount,
                    requestTime: req.requestTime,
                    claimed: req.claimed || false,
                    queueIndex: req.queueIndex ?? req.index,
                    requestId: req.id ?? req.requestId,
                    canClaim,
                    timeRemaining
                };
            });

        // Ordenar: primero los que están listos para claim, luego los pendientes
        const sortedRequests = formattedRequests.sort((a, b) => {
            if (a.canClaim && !b.canClaim) return -1;
            if (!a.canClaim && b.canClaim) return 1;
            return a.requestTime - b.requestTime;
        });

        setRequests(sortedRequests);
        setIsInitialLoading(false);
        
        const hasPending = sortedRequests.filter(r => !r.claimed).length > 0;
        if (onEmptyState) {
            onEmptyState(hasPending);
        }
    };

    useEffect(() => {
        processWithdrawQueue();
    }, [externalWithdrawQueue, userAddress, isEmergencyMode]);

    // Recargar cada 10 segundos para actualizar timers
    useEffect(() => {
        const interval = setInterval(() => {
            processWithdrawQueue();
        }, 10000);
        return () => clearInterval(interval);
    }, [externalWithdrawQueue, userAddress, isEmergencyMode]);

    const handleClaim = async (queueIndex: number, requestId: number) => {
        if (!onClaimWithdraw) {
            toast.error("Claim function not available");
            return;
        }

        setClaimingRequest({ queueIndex, requestId });
        setIsLoading(true);

        try {
            const result = await onClaimWithdraw(queueIndex, requestId);
            
            if (result?.success) {
                toast.success("Withdrawal claimed successfully!");
                processWithdrawQueue();
                onClaimSuccess();
            } else {
                toast.error(result?.message || "Claim failed");
            }
        } catch (error: any) {
            console.error("Error claiming withdraw:", error);
            
            let errorMessage = error.message;
            if (errorMessage.includes("QUEUE_TIME")) {
                errorMessage = "You must wait 7 days before claiming";
            } else if (errorMessage.includes("ALREADY_CLAIMED")) {
                errorMessage = "This withdrawal was already claimed";
            } else if (errorMessage.includes("INSUFFICIENT_LIQUIDITY")) {
                errorMessage = "Pool has insufficient liquidity";
            } else if (errorMessage.includes("INVALID_REQUEST_ID")) {
                errorMessage = "Invalid request ID. Please refresh and try again";
            } else if (errorMessage.includes("NOT_OWNER")) {
                errorMessage = "You are not the owner of this withdrawal request";
            }
            toast.error(errorMessage);
        } finally {
            setClaimingRequest(null);
            setIsLoading(false);
        }
    };

    const pendingRequests = requests.filter(r => !r.claimed);
    const claimedRequests = requests.filter(r => r.claimed);
    const readyToClaim = pendingRequests.filter(r => r.canClaim);

    if (pendingRequests.length === 0 && !isInitialLoading) {
        return (
            <div className="relative overflow-hidden border border-[#4f6db3] bg-[#0c3db8] rounded-[36px] p-14 backdrop-blur-2xl text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center mx-auto mb-8">
                        <Clock className="w-14 h-14 text-cyan-200" />
                    </div>
                    <h3 className="text-white text-4xl font-black tracking-[0.10em] uppercase mb-5">
                        No Withdraw Requests
                    </h3>
                    <p className="text-cyan-100 text-xl max-w-xl mx-auto leading-relaxed">
                        Your withdrawal queue will appear here once you request an unstake from the PrimalProtocol liquidity pool.
                    </p>
                </div>
            </div>
        );
    }

    const getProgressPercentage = (requestTime: number) => {
        if (isEmergencyMode) return 100;
        const now = Math.floor(Date.now() / 1000);
        const total = MIN_QUEUE_TIME;
        const elapsed = Math.min(Math.max(now - requestTime, 0), total);
        return (elapsed / total) * 100;
    };

    const isClaiming = (queueIndex: number, requestId: number) => {
        return claimingRequest?.queueIndex === queueIndex && claimingRequest?.requestId === requestId;
    };

    return (
        <div className="relative overflow-hidden rounded-[30px] border border-[#4f6db3] bg-[#0c3db8] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            {/* TOP LIGHT */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />

            {/* DOTS */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }}
            />

            {/* HEADER */}
            <div className="relative border-b border-[#5d7cd1] px-7 py-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#1140b3] border border-[#7394ff] flex items-center justify-center">
                            <Clock className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white text-2xl font-black tracking-[0.12em] uppercase">
                                Withdraw Queue
                            </h3>
                            <p className="text-cyan-200 text-sm font-medium mt-1">
                                {isEmergencyMode ? "Emergency Mode - Instant Claims" : "Funds unlock after 7 days"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isEmergencyMode && (
                            <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50">
                                <span className="text-red-300 text-sm font-black flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4" />
                                    EMERGENCY
                                </span>
                            </div>
                        )}
                        <div className="px-4 py-2 rounded-full bg-[#1848ca] border border-[#6e8eff]">
                            <span className="text-cyan-100 text-sm font-black">{readyToClaim.length} READY</span>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-[#1848ca] border border-[#6e8eff]">
                            <span className="text-cyan-100 text-sm font-black">{pendingRequests.length} PENDING</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="relative p-6">
                {/* READY TO CLAIM */}
                {readyToClaim.length > 0 && (
                    <div className="mb-7">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                            <h4 className="text-cyan-100 text-sm font-black uppercase tracking-[0.18em]">
                                {isEmergencyMode ? "Ready To Claim (Emergency)" : "Ready To Claim"}
                            </h4>
                        </div>
                        <div className="space-y-4">
                            {readyToClaim.map((req) => (
                                <div key={`${req.queueIndex}-${req.requestId}`} className="rounded-[24px] border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-5">
                                    <div className="flex items-center justify-between flex-wrap gap-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-[#1140b3] border border-[#7394ff] flex items-center justify-center">
                                                <Wallet className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white text-3xl font-black">
                                                    {parseFloat(req.amount).toLocaleString(undefined, {
                                                        minimumFractionDigits: 4,
                                                        maximumFractionDigits: 4
                                                    })} APE
                                                </p>
                                                <p className="text-cyan-200 text-sm mt-1">
                                                    Requested: {new Date(req.requestTime * 1000).toLocaleDateString()}
                                                </p>
                                                <p className="text-cyan-300 text-xs">Request ID: #{req.requestId}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleClaim(req.queueIndex, req.requestId)}
                                            disabled={isLoading && isClaiming(req.queueIndex, req.requestId)}
                                            className="group relative overflow-hidden px-7 py-4 rounded-2xl bg-[#082c89] hover:bg-[#0b37a5] border border-[#78a1ff] transition-all disabled:opacity-50"
                                        >
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            {isLoading && isClaiming(req.queueIndex, req.requestId) ? (
                                                <div className="relative flex items-center gap-3">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span className="text-white font-black uppercase">Claiming</span>
                                                </div>
                                            ) : (
                                                <div className="relative flex items-center gap-3">
                                                    <span className="text-white font-black uppercase">Claim APE</span>
                                                    <ArrowRight className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PENDING */}
                {pendingRequests.filter(r => !r.canClaim).length > 0 && (
                    <div className="mb-7">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-yellow-300" />
                            <h4 className="text-cyan-100 text-sm font-black uppercase tracking-[0.18em]">Pending Withdrawals</h4>
                        </div>
                        <div className="space-y-4">
                            {pendingRequests.filter(r => !r.canClaim).map((req) => {
                                const progress = getProgressPercentage(req.requestTime);
                                return (
                                    <div key={`${req.queueIndex}-${req.requestId}`} className="rounded-[24px] border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-5">
                                        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                                            <div>
                                                <p className="text-white text-3xl font-black">{parseFloat(req.amount).toLocaleString()} APE</p>
                                                <p className="text-cyan-200 text-sm mt-1">Requested: {new Date(req.requestTime * 1000).toLocaleDateString()}</p>
                                                <p className="text-cyan-300 text-xs">Request ID: #{req.requestId}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-yellow-200 text-lg font-black">{req.timeRemaining}</p>
                                                <p className="text-cyan-200 text-xs mt-1">Unlock Timer</p>
                                            </div>
                                        </div>
                                        {!isEmergencyMode && (
                                            <>
                                                <div className="w-full h-3 rounded-full bg-[#0d2d86] overflow-hidden border border-[#5371cf]">
                                                    <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-300 transition-all duration-500" style={{ width: `${progress}%` }} />
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <p className="text-cyan-200 text-sm">Queue Progress</p>
                                                    <p className="text-white text-sm font-black">{Math.floor(progress)}%</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CLAIMED HISTORY */}
                {claimedRequests.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-5 h-5 text-red-300" />
                            <h4 className="text-cyan-100 text-sm font-black uppercase tracking-[0.18em]">Claimed Withdrawals</h4>
                        </div>
                        <div className="space-y-3">
                            {claimedRequests.map((req) => (
                                <div key={`${req.queueIndex}-${req.requestId}`} className="rounded-[20px] border border-[#4764b9] bg-[#12379c] p-4 opacity-70">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-cyan-100 text-2xl font-black line-through">{parseFloat(req.amount).toLocaleString()} APE</p>
                                            <p className="text-cyan-300 text-sm mt-1">Successfully claimed</p>
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-[#082c89] border border-[#78a1ff]">
                                            <span className="text-cyan-100 text-sm font-black">CLAIMED</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* INFO PANEL */}
                <div className="relative overflow-hidden mt-7 rounded-[26px] border border-[#5f7fe0] bg-[linear-gradient(180deg,#1646be_0%,#1039a3_100%)] px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300/10 blur-3xl pointer-events-none" />
                    <div className="relative flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#0f35a0] border border-[#7394ff] flex items-center justify-center shrink-0">
                            <AlertCircle className="w-7 h-7 text-yellow-300" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-black text-sm leading-tight">
                                {isEmergencyMode ? "Emergency Mode Active" : "Early Withdrawal Penalty"}
                            </p>
                            <p className="text-cyan-100 text-sm mt-1 leading-relaxed">
                                {isEmergencyMode 
                                    ? "Emergency mode is active. You can claim withdrawals immediately without queue wait time. Early withdrawal penalties still apply."
                                    : `Withdrawals before the lock period ends will incur a ${earlyPenalty}% penalty fee. If this is not your case, no penalty applies.`}
                            </p>
                        </div>
                        {!isEmergencyMode && (
                            <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-300/30 text-yellow-200 font-black text-sm shrink-0">
                                {earlyPenalty}% Fee
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
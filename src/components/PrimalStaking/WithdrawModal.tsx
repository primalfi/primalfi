"use client";

import { useState } from "react";

import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  X,
  Clock,
  ShieldAlert,
} from "lucide-react";

import { motion } from "framer-motion";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdrawSuccess: () => void;
  stake: any;
  earlyPenalty: number;
  exchangeRate: number;
  isEmergencyMode?: boolean;
  onNormalWithdraw?: (stake: any) => Promise<void>;
  onEmergencyWithdraw?: (stake: any) => Promise<void>;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onWithdrawSuccess,
  stake,
  earlyPenalty,
  exchangeRate,
  isEmergencyMode = false,
  onNormalWithdraw,
  onEmergencyWithdraw,
}: WithdrawModalProps) {

  const [isLoading, setIsLoading] = useState(false);

  const handleNormalWithdraw = async () => {
    if (!stake || !onNormalWithdraw) return;

    setIsLoading(true);

    try {
      await onNormalWithdraw(stake);
      onWithdrawSuccess();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyWithdraw = async () => {
    if (!stake || !onEmergencyWithdraw) return;

    setIsLoading(true);

    try {
      await onEmergencyWithdraw(stake);
      onWithdrawSuccess();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !stake) return null;

  // CORREGIDO: Usar currentValue (valor actual en prAPE) en lugar de deposited
  const prAPEAmount = parseFloat(stake.currentValue || "0");
  const depositedOriginal = parseFloat(stake.formattedDeposited || "0");
  const currentValue = parseFloat(stake.currentValue || "0");
  const isEarly = !stake.isUnlocked;
  const isReady = stake.isUnlocked && !isEmergencyMode;

  const unlockDate = new Date(stake.unlockTime * 1000);
  const now = new Date();

  // Calculate time remaining for normal queue (7 days after request)
  const queueDate = new Date();
  queueDate.setDate(queueDate.getDate() + 7);

  const penaltyAmount = isEarly && !isEmergencyMode
    ? currentValue * (earlyPenalty / 100)
    : 0;

  const finalAmount = (isEarly && !isEmergencyMode)
    ? currentValue - penaltyAmount
    : currentValue;

  // Calculate profit/loss
  const profit = currentValue - depositedOriginal;
  const profitPercent = depositedOriginal > 0 ? (profit / depositedOriginal) * 100 : 0;

  const showEmergencyButton = isEmergencyMode && !stake.isUnlocked;
  const showNormalButton = !isEmergencyMode && (stake.isUnlocked || isEarly);
  const showQueueWarning = !isEmergencyMode && !stake.isUnlocked;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 overflow-x-hidden">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md"
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="
          relative
          w-full
          max-w-5xl
          max-h-[95vh]
          overflow-y-auto
          overflow-x-hidden
          rounded-[28px]
          border
          border-[#4f6db3]
          bg-[#0c3db8]
          shadow-[0_30px_120px_rgba(0,0,0,0.45)]
        "
      >

        {/* HEADER */}
        <div className="relative border-b border-[#5d7cd1] px-5 py-5">

          <div className="flex items-start justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className={`
                w-12 h-12
                rounded-[20px]
                border
                flex items-center justify-center
                shrink-0
                ${isEmergencyMode
                  ? "bg-red-500/15 border-red-400/40"
                  : isEarly
                    ? "bg-orange-500/15 border-orange-400/40"
                    : "bg-cyan-400/10 border-cyan-300/30"
                }
              `}>
                {isEmergencyMode ? (
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                ) : isEarly ? (
                  <AlertTriangle className="w-6 h-6 text-orange-300" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-cyan-200" />
                )}
              </div>

              <div>

                <p className="text-cyan-200 text-[10px] font-black uppercase tracking-[0.25em] mb-1">
                  {isEmergencyMode ? "Emergency Mode" : "Request Withdraw"}
                </p>

                <h2 className="text-white text-2xl sm:text-3xl font-black leading-none">
                  {isEmergencyMode
                    ? "Emergency Withdraw"
                    : isEarly
                      ? "Early Withdraw"
                      : "Withdraw Stake"}
                </h2>

                <p className="text-cyan-100/70 mt-2 text-sm">
                  {isEmergencyMode
                    ? "Emergency mode active. Withdraw immediately with penalty."
                    : isEarly
                      ? "Penalty fee will be applied. Funds enter 7-day queue."
                      : "Ready to withdraw. Funds enter 7-day queue."}
                </p>

              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 cursor-pointer rounded-xl bg-[#123ea7] border border-[#6485e8] flex items-center justify-center hover:bg-[#1a4bc4] transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

          </div>
        </div>

        {/* BODY */}
        <div className="p-5">

          {/* EMERGENCY MODE WARNING */}
          {isEmergencyMode && (
            <div className="mb-5 rounded-2xl border border-red-500/50 bg-red-500/10 p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-red-200 font-bold text-sm">Emergency Mode Active</p>
                  <p className="text-red-300 text-sm mt-1">
                    You can withdraw your stake immediately without queue wait time.
                    Early withdrawal penalty of {earlyPenalty}% still applies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* QUEUE WARNING FOR NORMAL WITHDRAWALS */}
          {showQueueWarning && !isEmergencyMode && (
            <div className="mb-5 rounded-2xl border border-yellow-500/50 bg-yellow-500/10 p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-yellow-200 font-bold text-sm">7-Day Withdrawal Queue</p>
                  <p className="text-yellow-300 text-sm mt-1">
                    Your withdrawal will enter a 7-day queue. You can claim your APE after {queueDate.toLocaleDateString()}.
                    Early withdrawal penalty of {earlyPenalty}% applies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* FROM - prAPE Amount (CORREGIDO: usa currentValue) */}
            <div className="rounded-2xl border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-4">

              <p className="text-cyan-100 text-xs font-black uppercase tracking-[0.2em] mb-3">
                Position Value
              </p>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center shrink-0">
                  <img src="/prape.png" className="w-8 h-8 object-contain" alt="prAPE" />
                </div>

                <div className="min-w-0">

                  <p className="text-white text-2xl sm:text-3xl font-black leading-none">
                    {prAPEAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })}
                  </p>

                  <p className="text-cyan-200 text-sm mt-1">
                    prAPE Current Value
                  </p>

                  {/* Mostrar depositado original como referencia */}
                  <p className="text-cyan-300 text-xs mt-0.5">
                    Originally: {depositedOriginal.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })} prAPE
                  </p>

                </div>

              </div>

            </div>

            {/* RECEIVE - APE Amount */}
            <div className="rounded-2xl border border-[#5f7fe0] bg-gradient-to-b from-[#2457db] to-[#1d4fcb] p-4">

              <p className="text-cyan-100 text-xs font-black uppercase tracking-[0.2em] mb-3">
                You Receive
              </p>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#1140b3] border border-[#7394ff] flex items-center justify-center shrink-0">
                  <img src="/apecoin.png" className="w-8 h-8 object-contain" alt="APE" />
                </div>

                <div className="min-w-0">

                  <p className="text-white text-2xl sm:text-3xl font-black leading-none">
                    {finalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })}
                  </p>

                  <p className="text-cyan-200 text-sm mt-1">
                    {isEmergencyMode ? "Immediate APE" : "Withdrawable APE"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* INFO PANEL */}
          <div className="mt-4 rounded-2xl border border-[#5473d1] bg-[#1646be] p-4 text-sm">

            <div className="flex justify-between mb-2">
              <span className="text-cyan-100">Position Index</span>
              <span className="text-white font-bold">#{stake.index}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-cyan-100">Lock Period</span>
              <span className="text-white font-bold">
                {stake.period === 2592000 ? "30 Days" :
                  stake.period === 5184000 ? "60 Days" :
                    stake.period === 7776000 ? "90 Days" : `${stake.period / 86400} Days`}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-cyan-100">Unlock Date</span>
              <span className="text-white font-bold">
                {unlockDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>

            {/* Mostrar profit si está unlocked */}
            {!isEarly && !isEmergencyMode && (
              <div className="flex justify-between mb-2">
                <span className="text-cyan-100">Profit / Loss</span>
                <span className={`font-bold ${profit >= 0 ? "text-green-300" : "text-red-300"}`}>
                  {profit >= 0 ? "+" : ""}{profit.toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4
                  })} APE ({profitPercent.toFixed(2)}%)
                </span>
              </div>
            )}

            {isEarly && !isEmergencyMode && (
              <>
                <div className="flex justify-between mb-2">
                  <span className="text-cyan-100">Current Value</span>
                  <span className="text-white font-bold">
                    {currentValue.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })} APE
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-cyan-100">Early Penalty ({earlyPenalty}%)</span>
                  <span className="text-orange-300 font-bold">
                    -{penaltyAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })} APE
                  </span>
                </div>
              </>
            )}

            <div className="border-t border-[#5f7fe0]/40 my-2 pt-2 flex justify-between">
              <span className="text-cyan-100 font-bold">Final Amount</span>
              <span className="text-green-300 font-black text-base">
                {finalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 4
                })} APE
              </span>
            </div>

          </div>

          {/* EXCHANGE RATE INFO */}
          <div className="mt-3 text-center">
            <p className="text-cyan-300 text-xs">
              1 prAPE ≈ {exchangeRate.toFixed(6)} APE
            </p>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

            {/* CANCEL */}
            <button
              onClick={onClose}
              className="
                h-14
                cursor-pointer
                rounded-xl
                bg-[#123ea7]
                border
                border-[#6485e8]
                text-white
                font-black
                transition-all
                duration-300
                hover:brightness-110
                hover:scale-[1.02]
                active:scale-[0.97]
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              "
            >
              Cancel
            </button>

            {/* EMERGENCY WITHDRAW BUTTON */}
            {showEmergencyButton && onEmergencyWithdraw && (
              <button
                onClick={handleEmergencyWithdraw}
                disabled={isLoading}
                className="
                  h-14
                  cursor-pointer
                  rounded-xl
                  font-black
                  relative
                  overflow-hidden
                  transition-all
                  duration-300
                  active:scale-[0.97]
                  hover:scale-[1.02]
                  shadow-[0_10px_35px_rgba(239,68,68,0.35)]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  bg-gradient-to-r
                  from-red-600
                  to-red-700
                  border
                  border-red-400
                "
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {isLoading ? (
                  <div className="relative flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white">Processing Emergency...</span>
                  </div>
                ) : (
                  <span className="relative text-white flex items-center justify-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    Emergency Withdraw
                  </span>
                )}
              </button>
            )}

            {/* NORMAL WITHDRAW BUTTON */}
            {showNormalButton && onNormalWithdraw && (
              <button
                onClick={handleNormalWithdraw}
                disabled={isLoading}
                className={`
                  h-14
                  cursor-pointer
                  rounded-xl
                  font-black
                  relative
                  overflow-hidden
                  transition-all
                  duration-300
                  active:scale-[0.97]
                  hover:scale-[1.02]
                  shadow-[0_10px_35px_rgba(0,0,0,0.25)]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex
                  items-center
                  justify-center
                  gap-2

                  ${isEarly && !isEmergencyMode
                    ? "bg-gradient-to-r from-orange-500 to-red-500 border border-orange-300"
                    : "bg-[#082c89] border border-[#78a1ff] hover:brightness-110"
                  }
                `}
              >

                {/* SHINE EFFECT */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {isLoading ? (
                  <div className="relative flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white">Processing...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative text-white">
                      {isEarly && !isEmergencyMode ? "Request Early Withdraw" : "Request Withdraw"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </>
                )}

              </button>
            )}

          </div>

          {/* QUEUE INFO FOOTER */}
          {!isEmergencyMode && (
            <div className="mt-4 text-center">
              <p className="text-cyan-300 text-xs flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                Withdrawals require 7-day queue before claiming APE
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

import {
  Vault,
  ArrowUpRight,
  Link2,
  Lock,
  Unlock,
  Layers3,
  Wallet,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

interface Stake {
  deposited: any;
  scaledAmount?: any;
  unlockTime: number;
  period: number;
  index: number;
  owner?: string;
  formattedDeposited: string;
  currentValue: string;
  timeRemaining: string;
  isUnlocked: boolean;
  profit?: string;
  profitPercent?: string;
}

interface UserStakesProps {
  stakes: Stake[];
  onWithdraw: (stake: Stake) => void;
  onEmergencyWithdraw?: (stake: Stake) => void;
  exchangeRate?: number;
  earlyPenalty?: number;
  isEmergencyMode?: boolean;
  canWithdraw?: boolean;
}

export default function UserStakes({
  stakes,
  onWithdraw,
  onEmergencyWithdraw,
  earlyPenalty = 15,
  isEmergencyMode = false,
  canWithdraw = true,
}: UserStakesProps) {

  // =====================================================
  // FORMATTERS
  // =====================================================

  const formatAmount = (
    value: number
  ) => {

    if (!value || isNaN(value)) {
      return "0.00000";
    }

    return value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }
    );
  };

  const shortenAddress = (
    address?: string
  ) => {

    if (!address) {
      return "--";
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // =====================================================
  // DATES
  // =====================================================

  const getUnlockDate = (
    unlockTime: number
  ) => {

    if (unlockTime === 0) {
      return "No lock";
    }

    return new Date(
      unlockTime * 1000
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // PERIODS
  // =====================================================

  const getPeriodLabel = (
    period: number
  ) => {

    if (period === 2592000) {
      return {
        text: "30D",
        apy: "8%",
      };
    }

    if (period === 5184000) {
      return {
        text: "60D",
        apy: "12%",
      };
    }

    if (period === 7776000) {
      return {
        text: "90D",
        apy: "18%",
      };
    }

    return {
      text: `${period / 86400}D`,
      apy: "--",
    };
  };

  // =====================================================
  // CALCULATE EARLY PENALTY AMOUNT
  // =====================================================

  const getEarlyPenaltyAmount = (
    currentValue: number,
    isUnlocked: boolean
  ): number => {
    if (isUnlocked) return 0;
    return (currentValue * earlyPenalty) / 100;
  };

  const getPenaltyColor = (profit: number, isUnlocked: boolean) => {
    if (isUnlocked) return "text-green-300";
    if (profit >= 0) return "text-yellow-300";
    return "text-red-300";
  };

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (stakes.length === 0) {

    return (

      <div className="relative max-w-7xl mx-auto">

        {/* GLOW */}
        <div className="absolute inset-0 bg-cyan-500/15 blur-[100px]" />

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-[#4f6db3]
            bg-[#0c3db8]
            p-14
            text-center
            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
          "
        >

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)]" />

          {/* DOTS */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative">

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-[#1140b3]
                border
                border-[#7394ff]
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              "
            >
              <Vault className="w-14 h-14 text-cyan-200" />
            </div>

            <h3
              className="
                text-white
                text-4xl
                font-black
                tracking-[0.10em]
                uppercase
                mb-5
              "
            >
              No Active Stakes
            </h3>

            <p className="text-cyan-100 text-xl max-w-xl mx-auto leading-relaxed">
              Your staking positions will appear here once you
              deposit APE into the protocol.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // COMPONENT
  // =====================================================

  return (

    <div className="space-y-8">

      {/* EMERGENCY MODE BANNER */}
      {isEmergencyMode && (
        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-red-500/50
            bg-red-500/10
            p-5
            text-center
          "
        >
          <div className="flex items-center justify-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <p className="text-red-200 font-bold">
              ⚠️ EMERGENCY MODE ACTIVE ⚠️
            </p>
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-red-300 text-sm mt-2">
            You can withdraw your stakes immediately without queue. Early withdrawal penalties still apply.
          </p>
        </div>
      )}

      {stakes.map(
        (stake, idx) => {

          const deposited =
            parseFloat(
              stake.formattedDeposited || "0"
            );

          const currentValue =
            parseFloat(
              stake.currentValue || "0"
            );

          const profit =
            currentValue - deposited;

          const penaltyAmount = getEarlyPenaltyAmount(currentValue, stake.isUnlocked);
          const penaltyPercent = stake.isUnlocked ? 0 : earlyPenalty;
          const amountAfterPenalty = currentValue - penaltyAmount;

          const periodInfo =
            getPeriodLabel(
              stake.period
            );

          const unlockDate =
            getUnlockDate(
              stake.unlockTime
            );

          // Determine button action
          const handleWithdrawClick = () => {
            if (isEmergencyMode && onEmergencyWithdraw) {
              onEmergencyWithdraw(stake);
            } else {
              onWithdraw(stake);
            }
          };

          const isButtonDisabled = !canWithdraw && !isEmergencyMode && !stake.isUnlocked;

          return (

            <motion.div
              key={`${stake.index}-${idx}`}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06
              }}
              className="relative"
            >

              {/* GLOW */}
              <div className="absolute inset-0 bg-cyan-500/15 blur-[90px]" />

              {/* CARD */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#4f6db3]
                  bg-[#0c3db8]
                  shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                "
              >

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)]" />

                {/* DOTS */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)
                    `,
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* TOP BAR */}
                <div className="relative border-b border-[#5d7cd1]">

                  <div className="grid grid-cols-1 md:grid-cols-3">

                    {/* STATUS */}
                    <div
                      className={`
                        border-b
                        md:border-b-0
                        md:border-r
                        border-[#5d7cd1]
                        px-6
                        py-5
                        ${stake.isUnlocked ? 'bg-[#0a5c2e]' : 'bg-[#7a250c]'}
                      `}
                    >

                      <div className="flex items-center gap-3">

                        {stake.isUnlocked ? (
                          <Unlock className="w-5 h-5 text-green-300" />
                        ) : (
                          <Lock className="w-5 h-5 text-orange-300" />
                        )}

                        <p
                          className="
                            text-white
                            text-lg
                            font-black
                            tracking-[0.16em]
                            uppercase
                          "
                        >
                          {stake.isUnlocked
                            ? "Unlocked"
                            : "Locked"}
                        </p>
                      </div>

                      <p className="text-cyan-200 text-sm mt-2 font-semibold">
                        {stake.isUnlocked
                          ? "Ready to withdraw"
                          : `${stake.timeRemaining} remaining`}
                      </p>

                      {!stake.isUnlocked && !isEmergencyMode && (
                        <p className="text-orange-200 text-xs mt-1 font-semibold">
                          ⚠️ Early penalty: {penaltyPercent}%
                        </p>
                      )}
                    </div>

                    {/* PERIOD */}
                    <div
                      className="
                        border-b
                        md:border-b-0
                        md:border-r
                        border-[#5d7cd1]
                        px-6
                        py-5
                        bg-[#1548c2]
                      "
                    >

                      <div className="flex items-center gap-3">

                        <Layers3 className="w-5 h-5 text-cyan-200" />

                        <p
                          className="
                            text-white
                            text-lg
                            font-black
                            tracking-[0.16em]
                            uppercase
                          "
                        >
                          {periodInfo.text}
                        </p>
                      </div>

                      <p className="text-cyan-200 text-sm mt-2 font-semibold">
                        Lock Period Position
                      </p>
                    </div>

                    {/* POSITION ID */}
                    <div
                      className="
                        px-6
                        py-5
                        bg-[#0d3cb1]
                      "
                    >

                      <div className="flex items-center gap-3">

                        <Link2 className="w-5 h-5 text-cyan-200" />

                        <p
                          className="
                            text-white
                            text-lg
                            font-black
                            tracking-[0.16em]
                            uppercase
                          "
                        >
                          Position #{stake.index}
                        </p>
                      </div>

                      <p className="text-cyan-200 text-sm mt-2 font-semibold">
                        Transferable
                      </p>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="relative p-6 md:p-8">

                  {/* HEADER */}
                  <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-8 mb-8">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                      <div
                        className="
                          w-[80px]
                          h-[80px]
                          rounded-full
                          bg-[#1140b3]
                          border
                          border-[#7394ff]
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <img
                          src="/prape.png"
                          alt="prAPE"
                          className="w-[75px] h-[75px] object-contain"
                        />
                      </div>

                      <div>

                        <h3
                          className="
                            text-white
                            text-4xl
                            font-black
                            tracking-tight
                          "
                        >
                          prAPE Position
                        </h3>

                        <div className="flex items-center gap-2 mt-4">

                          <Wallet className="w-4 h-4 text-cyan-300" />

                          <p className="text-cyan-100 text-sm font-semibold">
                            Current Owner:
                          </p>

                          <span className="text-white text-sm font-black tracking-wide">
                            {shortenAddress(stake.owner)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTON */}
                    <button
                      onClick={handleWithdrawClick}
                      disabled={isButtonDisabled}
                      className={`
                        cursor-pointer
                        group
                        relative
                        overflow-hidden
                        px-8
                        py-5
                        rounded-[20px]
                        border
                        transition-all
                        hover:scale-[1.02]
                        inline-flex
                        items-center
                        justify-center
                        gap-4
                        min-w-[260px]

                        ${isButtonDisabled
                          ? "bg-[#3a3a5c] border-[#6a6a8a] cursor-not-allowed opacity-50"
                          : isEmergencyMode
                            ? "bg-red-600/80 border-red-400 hover:bg-red-600"
                            : stake.isUnlocked
                              ? "bg-[#082c89] border-[#78a1ff]"
                              : "bg-[#7a250c] border-[#ff946f]"
                        }
                      `}
                    >

                      {/* SHINE */}
                      {!isButtonDisabled && (
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      )}

                      {isEmergencyMode && (
                        <AlertTriangle className="relative w-5 h-5 text-white" />
                      )}

                      <span
                        className="
                          relative
                          text-white
                          text-lg
                          font-black
                          tracking-[0.12em]
                          uppercase
                        "
                      >
                        {isButtonDisabled
                          ? "Withdrawals Paused"
                          : isEmergencyMode
                            ? "Emergency Withdraw"
                            : stake.isUnlocked
                              ? "Withdraw Position"
                              : `Early Withdraw`}
                      </span>

                      <ArrowUpRight className="relative w-5 h-5 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">

                    {/* INITIAL */}
                    <div
                      className="
                        rounded-[24px]
                        border
                        border-[#5f7fe0]
                        bg-gradient-to-b
                        from-[#2457db]
                        to-[#1d4fcb]
                        p-6
                      "
                    >

                      <p
                        className="
                          text-cyan-100
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.20em]
                          mb-4
                        "
                      >
                        Initial Stake
                      </p>

                      <h4 className="text-white text-3xl font-black break-all">
                        {formatAmount(deposited)}
                      </h4>

                      <p className="text-cyan-200 text-sm mt-3">
                        APE Deposited
                      </p>
                    </div>

                    {/* CURRENT */}
                    <div
                      className="
                        rounded-[24px]
                        border
                        border-[#5f7fe0]
                        bg-gradient-to-b
                        from-[#2457db]
                        to-[#1d4fcb]
                        p-6
                      "
                    >

                      <p
                        className="
                          text-cyan-100
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.20em]
                          mb-4
                        "
                      >
                        Current Value
                      </p>

                      <h4 className="text-white text-3xl font-black break-all">
                        {formatAmount(currentValue)}
                      </h4>

                      <p className="text-cyan-200 text-sm mt-3">
                        Dynamic Index Value
                      </p>
                    </div>

                    {/* REVENUE */}
                    <div
                      className="
                        rounded-[24px]
                        border
                        border-[#5f7fe0]
                        bg-gradient-to-b
                        from-[#2457db]
                        to-[#1d4fcb]
                        p-6
                      "
                    >

                      <p
                        className="
                          text-cyan-100
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.20em]
                          mb-4
                        "
                      >
                        Revenue
                      </p>

                      <h4
                        className={`
                          text-3xl
                          font-black
                          break-all
                          ${getPenaltyColor(profit, stake.isUnlocked)}
                        `}
                      >
                        {profit >= 0 ? "+" : ""}
                        {formatAmount(profit)}
                      </h4>

                      <p className="text-cyan-200 text-sm mt-3">
                        Accumulated Yield
                      </p>
                    </div>

                    {/* UNLOCK */}
                    <div
                      className="
                        rounded-[24px]
                        border
                        border-[#5f7fe0]
                        bg-gradient-to-b
                        from-[#2457db]
                        to-[#1d4fcb]
                        p-6
                      "
                    >

                      <p
                        className="
                          text-cyan-100
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.20em]
                          mb-4
                        "
                      >
                        Unlock Date
                      </p>

                      <h4 className="text-white text-lg font-black leading-relaxed">
                        {unlockDate}
                      </h4>

                      <p className="text-cyan-200 text-sm mt-3">
                        Withdrawal Availability
                      </p>
                    </div>
                  </div>

                  {/* PENALTY WARNING FOR EARLY WITHDRAW */}
                  {!stake.isUnlocked && !isEmergencyMode && (
                    <div
                      className="
                        mt-6
                        rounded-[24px]
                        border
                        border-orange-500/50
                        bg-orange-500/10
                        p-5
                      "
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                        <div>
                          <p className="text-orange-200 font-bold text-sm">
                            Early Withdrawal Penalty
                          </p>
                          <p className="text-orange-300 text-sm">
                            You will lose {penaltyPercent}% ({formatAmount(penaltyAmount)} APE) of your position value if you withdraw before the lock period ends.
                            After penalty, you receive ≈ {formatAmount(amountAfterPenalty)} APE.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EMERGENCY WITHDRAW INFO */}
                  {isEmergencyMode && !stake.isUnlocked && (
                    <div
                      className="
                        mt-6
                        rounded-[24px]
                        border
                        border-red-500/50
                        bg-red-500/10
                        p-5
                      "
                    >
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                          <p className="text-red-200 font-bold text-sm">
                            Emergency Mode Active
                          </p>
                          <p className="text-red-300 text-sm">
                            You can withdraw immediately without queue wait time.
                            Early withdrawal penalty of {penaltyPercent}% still applies.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOOTER - TRANSFER SECTION */}
                  <div
                    className="
                      mt-6
                      rounded-[24px]
                      border
                      border-[#5f7fe0]
                      bg-[#0a2f96]
                      p-5
                    "
                  >

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

                      <div>

                        <p
                          className="
                            text-white
                            text-sm
                            font-black
                            tracking-[0.18em]
                            uppercase
                            mb-2
                          "
                        >
                          Transfer prAPE
                        </p>

                        <p className="text-cyan-100 text-sm leading-relaxed">
                          You can transfer your staked tokens (FIFO) to another address using our exclusive tool.
                        </p>
                      </div>

                      <div
                        className="
                          px-5
                          py-3
                          rounded-[16px]
                          border
                          border-cyan-400/30
                          bg-cyan-400/10
                          shrink-0
                          cursor-pointer
                        "
                      >
                        <a href="#transfer">
                          <button className="text-white text-sm font-black tracking-[0.18em] uppercase cursor-pointer">
                            Transfer
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        }
      )}
    </div>
  );
}
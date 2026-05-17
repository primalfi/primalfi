"use client";

import { useState, useEffect } from "react";

import {
  ShieldCheck,
  ArrowRight,
  X,
  Settings2,
  Coins,
  Flame,
  AlertTriangle,
  ShieldAlert,
  Play,
  Pause,
  AlertOctagon,
  Activity,
  Database,
  TrendingUp,
  Gift,
  Edit2,
  Save,
  XCircle
} from "lucide-react";

import { ProtocolMode } from "../../config/contracts";
import { formatAPE, formatIndex } from "../../utils/ethers";
import toast from "react-hot-toast";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;

  // Current stats from hook
  currentFee: number;
  currentPenalty: number;
  currentDistributionPercent: number;
  currentProtocolMode: ProtocolMode;
  currentProtocolModeName: string;

  isOwner: boolean;

  // Actions
  distributeRewards: () => Promise<any>;
  distributeAllRewards: () => Promise<any>;
  injectRewards: (amount: string) => Promise<any>;
  setDistributionBps: (bps: number) => Promise<any>;
  setProtocolMode?: (mode: ProtocolMode) => Promise<any>;
  setFee?: (fee: number) => Promise<any>;
  setPenalty?: (penalty: number) => Promise<any>;

  // READ FUNCTIONS
  totalUnderlying?: string;
  totalStaked?: string;
  rewardReserve?: string;
  liquidityIndex?: number;
  exchangeRate?: number;
  protocolBalance?: string;
  treasury?: string;
  treasurySplit?: number;
  queueSize?: number;
  minQueueTime?: number;
  maxTransferIterations?: number;
  precision?: number;
}

export default function AdminPanel({
  isOpen,
  onClose,
  onSuccess,

  currentFee,
  currentPenalty,
  currentDistributionPercent,
  currentProtocolMode,
  currentProtocolModeName,

  isOwner,

  distributeRewards,
  distributeAllRewards,
  injectRewards,
  setDistributionBps,
  setProtocolMode,
  setFee,
  setPenalty,

  // READ VALUES
  totalUnderlying = "0",
  totalStaked = "0",
  rewardReserve = "0",
  liquidityIndex = 1,
  exchangeRate = 1,
  protocolBalance = "0",
  treasury = "",
  treasurySplit = 2500,
  queueSize = 100000,
  minQueueTime = 604800,
  maxTransferIterations = 50,
  precision = 1e18
}: AdminPanelProps) {

  const [injectAmount, setInjectAmount] = useState("");
  const [distributionPercent, setDistributionPercentState] = useState("70");
  const [isLoading, setIsLoading] = useState(false);
  const [isInjecting, setIsInjecting] = useState(false);
  const [isUpdatingDistribution, setIsUpdatingDistribution] = useState(false);
  const [isDistributingAll, setIsDistributingAll] = useState(false);
  const [isUpdatingMode, setIsUpdatingMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ProtocolMode>(currentProtocolMode);

  // Estados para editar Fee y Penalty
  const [isEditingFee, setIsEditingFee] = useState(false);
  const [isEditingPenalty, setIsEditingPenalty] = useState(false);
  const [editFeeValue, setEditFeeValue] = useState(currentFee.toString());
  const [editPenaltyValue, setEditPenaltyValue] = useState(currentPenalty.toString());
  const [isUpdatingFee, setIsUpdatingFee] = useState(false);
  const [isUpdatingPenalty, setIsUpdatingPenalty] = useState(false);

  // =====================================================
  // SYNC DISTRIBUTION %
  // =====================================================

  useEffect(() => {
    if (currentDistributionPercent !== undefined && currentDistributionPercent !== null) {
      setDistributionPercentState(String(currentDistributionPercent));
    }
  }, [currentDistributionPercent]);

  // =====================================================
  // SYNC MODE
  // =====================================================

  useEffect(() => {
    setSelectedMode(currentProtocolMode);
  }, [currentProtocolMode]);

  // =====================================================
  // SYNC FEE & PENALTY
  // =====================================================

  useEffect(() => {
    setEditFeeValue(currentFee.toString());
    setEditPenaltyValue(currentPenalty.toString());
  }, [currentFee, currentPenalty]);

  // =====================================================
  // DISTRIBUTE PARTIAL
  // =====================================================

  const handleDistributeRewards = async () => {
    setIsLoading(true);
    try {
      const result = await distributeRewards();
      if (result.success) {
        toast.success("Rewards distributed successfully");
        onSuccess();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // DISTRIBUTE ALL
  // =====================================================

  const handleDistributeAllRewards = async () => {
    setIsDistributingAll(true);
    try {
      const result = await distributeAllRewards();
      if (result.success) {
        onSuccess();
      }
    } finally {
      setIsDistributingAll(false);
    }
  };

  // =====================================================
  // INJECT
  // =====================================================

  const handleInjectRewards = async () => {
    if (!injectAmount || Number(injectAmount) <= 0) {
      return;
    }
    setIsInjecting(true);
    try {
      const result = await injectRewards(injectAmount);
      if (result.success) {
        setInjectAmount("");
        onSuccess();
      }
    } finally {
      setIsInjecting(false);
    }
  };

  // =====================================================
  // UPDATE DISTRIBUTION
  // =====================================================

  const handleUpdateDistribution = async () => {
    const percent = Number(distributionPercent);
    if (isNaN(percent) || percent <= 0 || percent > 100) {
      return;
    }
    const bps = Math.floor(percent * 100);
    setIsUpdatingDistribution(true);
    try {
      const result = await setDistributionBps(bps);
      if (result.success) {
        onSuccess();
      }
    } finally {
      setIsUpdatingDistribution(false);
    }
  };

  // =====================================================
  // UPDATE PROTOCOL MODE
  // =====================================================

  const handleUpdateProtocolMode = async () => {
    if (!setProtocolMode) return;
    setIsUpdatingMode(true);
    try {
      const result = await setProtocolMode(selectedMode);
      if (result.success) {
        onSuccess();
      }
    } finally {
      setIsUpdatingMode(false);
    }
  };

  // =====================================================
  // UPDATE FEE
  // =====================================================

  const handleUpdateFee = async () => {
    if (!setFee) {
      toast.error("Set fee function not available");
      return;
    }

    const newFee = Number(editFeeValue);
    if (isNaN(newFee) || newFee < 0 || newFee > 10) {
      toast.error("Fee must be between 0% and 10%");
      return;
    }

    // Convertir porcentaje a BPS (ej: 2% = 200)
    const feeBps = Math.floor(newFee * 100);

    setIsUpdatingFee(true);
    try {
      const result = await setFee(feeBps);
      if (result.success) {
        toast.success(`Protocol fee updated to ${newFee}%`);
        setIsEditingFee(false);
        onSuccess();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.reason || error?.message || "Failed to update fee");
    } finally {
      setIsUpdatingFee(false);
    }
  };

  // =====================================================
  // UPDATE PENALTY
  // =====================================================

  const handleUpdatePenalty = async () => {
    if (!setPenalty) {
      toast.error("Set penalty function not available");
      return;
    }

    const newPenalty = Number(editPenaltyValue);
    if (isNaN(newPenalty) || newPenalty < 0 || newPenalty > 30) {
      toast.error("Penalty must be between 0% and 30%");
      return;
    }

    // Convertir porcentaje a BPS (ej: 15% = 1500)
    const penaltyBps = Math.floor(newPenalty * 100);

    setIsUpdatingPenalty(true);
    try {
      const result = await setPenalty(penaltyBps);
      if (result.success) {
        toast.success(`Early penalty updated to ${newPenalty}%`);
        setIsEditingPenalty(false);
        onSuccess();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.reason || error?.message || "Failed to update penalty");
    } finally {
      setIsUpdatingPenalty(false);
    }
  };

  // =====================================================
  // GET MODE STYLES
  // =====================================================

  const getModeStyles = (mode: ProtocolMode) => {
    switch (mode) {
      case ProtocolMode.Live:
        return { bg: "bg-green-100", border: "border-green-200", text: "text-green-700", icon: <Play className="h-5 w-5" />, label: "Live" };
      case ProtocolMode.DepositsPaused:
        return { bg: "bg-yellow-100", border: "border-yellow-200", text: "text-yellow-700", icon: <Pause className="h-5 w-5" />, label: "Deposits Paused" };
      case ProtocolMode.WithdrawalsPaused:
        return { bg: "bg-orange-100", border: "border-orange-200", text: "text-orange-700", icon: <Pause className="h-5 w-5" />, label: "Withdrawals Paused" };
      case ProtocolMode.EmergencyOnly:
        return { bg: "bg-red-100", border: "border-red-200", text: "text-red-700", icon: <AlertOctagon className="h-5 w-5" />, label: "Emergency Only" };
      default:
        return { bg: "bg-gray-100", border: "border-gray-200", text: "text-gray-700", icon: <Activity className="h-5 w-5" />, label: "Unknown" };
    }
  };

  const currentModeStyles = getModeStyles(currentProtocolMode);

  const formatNumber = (value: string | number, decimals: number = 2) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const treasurySplitPercent = treasurySplit / 100;

  if (!isOpen || !isOwner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/70 backdrop-blur-2xl">

      <div className="relative w-full max-w-6xl overflow-hidden rounded-[42px] border border-white/40 bg-white/75 shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur-3xl">

        {/* BG FX */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-20 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-[120px]" />
          <div className="absolute -bottom-32 right-0 h-[360px] w-[360px] rounded-full bg-blue-300/20 blur-[120px]" />
        </div>

        {/* HEADER */}
        <div className="relative flex items-center justify-between border-b border-[#e6eef5] px-8 py-7">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-200 bg-cyan-100 shadow-[0_10px_30px_rgba(6,182,212,0.15)]">
              <ShieldCheck className="h-8 w-8 text-cyan-600" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-600">
                Protocol Controls
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-[#08111f]">
                Admin Panel
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e6eef5] bg-white transition-all hover:scale-105 hover:bg-red-50 cursor-pointer"
          >
            <X className="h-5 w-5 text-[#08111f]" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="relative max-h-[82vh] space-y-6 overflow-y-auto p-8">

          {/* CURRENT MODE BANNER */}
          <div className={`flex items-center gap-4 rounded-[28px] border ${currentModeStyles.border} ${currentModeStyles.bg} p-5`}>
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${currentModeStyles.bg} border ${currentModeStyles.border}`}>
              {currentModeStyles.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-black uppercase tracking-[0.2em] ${currentModeStyles.text}`}>
                Current Protocol Mode
              </p>
              <h3 className={`text-3xl font-black ${currentModeStyles.text}`}>
                {currentProtocolModeName}
              </h3>
            </div>
            {currentProtocolMode === ProtocolMode.EmergencyOnly && (
              <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />
            )}
          </div>

          {/* SECTION 1: CORE STATS */}
          <div className="rounded-[28px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5">
              <Database className="h-6 w-6 text-cyan-600" />
              <h3 className="text-xl font-black text-[#08111f]">Protocol Core Stats</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-[#6c8297]">Total Underlying</p>
                <p className="text-lg font-black text-[#08111f]">{formatNumber(totalUnderlying)} APE</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Total Staked (prAPE)</p>
                <p className="text-lg font-black text-[#08111f]">{formatNumber(totalStaked)} prAPE</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Protocol Balance</p>
                <p className="text-lg font-black text-[#08111f]">{formatNumber(protocolBalance)} APE</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Reward Reserve</p>
                <p className="text-lg font-black text-green-600">{formatNumber(rewardReserve)} APE</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: INDEX & RATES CON EDITABLES */}
          <div className="rounded-[28px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="h-6 w-6 text-cyan-600" />
              <h3 className="text-xl font-black text-[#08111f]">Index & Protocol Fees</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Liquidity Index - Solo lectura */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-[#6c8297]">Liquidity Index</p>
                <p className="text-xl font-black text-[#08111f]">{liquidityIndex.toFixed(6)}</p>
                <p className="text-xs text-cyan-600">1 prAPE = {liquidityIndex.toFixed(6)} APE</p>
              </div>

              {/* Exchange Rate - Solo lectura */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-[#6c8297]">Exchange Rate</p>
                <p className="text-xl font-black text-[#08111f]">{exchangeRate.toFixed(6)}</p>
                <p className="text-xs text-cyan-600">prAPE → APE</p>
              </div>

              {/* PROTOCOL FEE - EDITABLE */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-cyan-700 uppercase tracking-wide">Protocol Fee</p>
                  {!isEditingFee ? (
                    <button
                      onClick={() => setIsEditingFee(true)}
                      className="p-1 rounded-lg hover:bg-cyan-200 transition-colors"
                      title="Edit fee"
                    >
                      <Edit2 className="w-4 h-4 text-cyan-600" />
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdateFee}
                        disabled={isUpdatingFee}
                        className="p-1 rounded-lg hover:bg-green-200 transition-colors"
                        title="Save"
                      >
                        <Save className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingFee(false);
                          setEditFeeValue(currentFee.toString());
                        }}
                        className="p-1 rounded-lg hover:bg-red-200 transition-colors"
                        title="Cancel"
                      >
                        <XCircle className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
                {isEditingFee ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editFeeValue}
                      onChange={(e) => setEditFeeValue(e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-24 px-3 py-2 text-xl font-black text-[#08111f] bg-white border border-cyan-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <span className="text-xl font-black text-[#08111f]">%</span>
                    {isUpdatingFee && <div className="w-5 h-5 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />}
                  </div>
                ) : (
                  <p className="text-3xl font-black text-[#08111f]">{currentFee}%</p>
                )}
                <p className="text-xs text-cyan-600 mt-1">Fee on each stake (max 10%)</p>
              </div>

              {/* EARLY PENALTY - EDITABLE */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-orange-700 uppercase tracking-wide">Early Penalty</p>
                  {!isEditingPenalty ? (
                    <button
                      onClick={() => setIsEditingPenalty(true)}
                      className="p-1 rounded-lg hover:bg-orange-200 transition-colors"
                      title="Edit penalty"
                    >
                      <Edit2 className="w-4 h-4 text-orange-600" />
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdatePenalty}
                        disabled={isUpdatingPenalty}
                        className="p-1 rounded-lg hover:bg-green-200 transition-colors"
                        title="Save"
                      >
                        <Save className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingPenalty(false);
                          setEditPenaltyValue(currentPenalty.toString());
                        }}
                        className="p-1 rounded-lg hover:bg-red-200 transition-colors"
                        title="Cancel"
                      >
                        <XCircle className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
                {isEditingPenalty ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editPenaltyValue}
                      onChange={(e) => setEditPenaltyValue(e.target.value)}
                      step="0.5"
                      min="0"
                      max="30"
                      className="w-24 px-3 py-2 text-xl font-black text-[#08111f] bg-white border border-orange-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <span className="text-xl font-black text-[#08111f]">%</span>
                    {isUpdatingPenalty && <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />}
                  </div>
                ) : (
                  <p className="text-3xl font-black text-[#08111f]">{currentPenalty}%</p>
                )}
                <p className="text-xs text-orange-600 mt-1">Penalty for early withdrawal (max 30%)</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: CONFIGURATION */}
          <div className="rounded-[28px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5">
              <Settings2 className="h-6 w-6 text-cyan-600" />
              <h3 className="text-xl font-black text-[#08111f]">Protocol Configuration</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-[#6c8297]">Distribution BPS</p>
                <p className="text-lg font-black text-[#08111f]">{currentDistributionPercent}%</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Treasury Split</p>
                <p className="text-lg font-black text-[#08111f]">{treasurySplitPercent}%</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-xs text-[#6c8297]">Treasury Address</p>
                <p className="text-sm font-mono font-black text-[#08111f] truncate">{treasury || "Not set"}</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: TECHNICAL CONSTANTS */}
          <div className="rounded-[28px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5">
              <Activity className="h-6 w-6 text-cyan-600" />
              <h3 className="text-xl font-black text-[#08111f]">Technical Constants</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-[#6c8297]">Queue Size</p>
                <p className="text-lg font-black text-[#08111f]">{queueSize.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Min Queue Time</p>
                <p className="text-lg font-black text-[#08111f]">{formatTime(minQueueTime)}</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Max Transfer Iterations</p>
                <p className="text-lg font-black text-[#08111f]">{maxTransferIterations}</p>
              </div>
              <div>
                <p className="text-xs text-[#6c8297]">Precision</p>
                <p className="text-lg font-black text-[#08111f]">{precision.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* PROTOCOL MODE SELECTOR */}
          {setProtocolMode && (
            <div className="rounded-[32px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200 bg-purple-100">
                  <Activity className="h-7 w-7 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#08111f]">Protocol Mode</h3>
                  <p className="text-[#6c8297]">Change protocol operating mode</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { mode: ProtocolMode.Live, label: "🟢 Live", color: "green", description: "Full functionality" },
                    { mode: ProtocolMode.DepositsPaused, label: "🟡 Deposits Paused", color: "yellow", description: "No new stakes" },
                    { mode: ProtocolMode.WithdrawalsPaused, label: "🟠 Withdrawals Paused", color: "orange", description: "No withdrawals" },
                    { mode: ProtocolMode.EmergencyOnly, label: "🔴 Emergency Only", color: "red", description: "Emergency withdrawals only" }
                  ].map((option) => (
                    <button
                      key={option.mode}
                      onClick={() => setSelectedMode(option.mode)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${selectedMode === option.mode
                        ? `border-${option.color}-500 bg-${option.color}-50`
                        : "border-[#e6eef5] bg-white hover:border-gray-300"
                        }`}
                    >
                      <p className={`font-black ${selectedMode === option.mode ? `text-${option.color}-700` : "text-[#08111f]"}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-[#6c8297] mt-1">{option.description}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleUpdateProtocolMode}
                  disabled={isUpdatingMode || selectedMode === currentProtocolMode}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(147,51,234,0.20)] transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                >
                  {isUpdatingMode ? "Updating Mode..." : `Switch to ${getModeStyles(selectedMode).label}`}
                </button>
              </div>
            </div>
          )}

          {/* WARNING - Emergency Mode */}
          {currentProtocolMode === ProtocolMode.EmergencyOnly && (
            <div className="flex items-start gap-4 rounded-[28px] border border-red-200 bg-red-50/90 p-5">
              <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-black text-red-800">Emergency Mode Active</h4>
                <p className="mt-1 text-sm leading-relaxed text-red-600">
                  In emergency mode, only emergency withdrawals are allowed. New stakes and normal withdrawals are disabled.
                </p>
              </div>
            </div>
          )}

          {/* WARNING - Deposits/Withdrawals Paused */}
          {(currentProtocolMode === ProtocolMode.DepositsPaused || currentProtocolMode === ProtocolMode.WithdrawalsPaused) && (
            <div className="flex items-start gap-4 rounded-[28px] border border-amber-200 bg-amber-50/90 p-5">
              <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-black text-amber-800">
                  {currentProtocolMode === ProtocolMode.DepositsPaused ? "Deposits Paused" : "Withdrawals Paused"}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-amber-600">
                  {currentProtocolMode === ProtocolMode.DepositsPaused
                    ? "New stakes are currently disabled. Existing positions can still be withdrawn."
                    : "Withdrawals are currently disabled. New stakes can still be created."}
                </p>
              </div>
            </div>
          )}

          {/* DISTRIBUTION CONFIG */}
          <div className="rounded-[32px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-100">
                <Settings2 className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#08111f]">Reward Distribution</h3>
                <p className="text-[#6c8297]">Configure how much reserve gets distributed per cycle</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="70"
                  value={distributionPercent}
                  onChange={(e) => setDistributionPercentState(e.target.value)}
                  className="h-16 w-full rounded-2xl border border-[#dbe7f3] bg-white px-6 pr-16 text-xl font-black text-[#08111f] outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-black text-[#6c8297]">%</div>
              </div>

              <div className="flex items-center justify-between text-sm text-[#6c8297] bg-gray-50 p-3 rounded-xl">
                <span>Current Reserve: {formatNumber(rewardReserve)} APE</span>
                <span>Distribution: {distributionPercent || 0}% = {((parseFloat(rewardReserve || "0") * (parseFloat(distributionPercent || "0") / 100))).toFixed(2)} APE</span>
              </div>

              <button
                onClick={handleUpdateDistribution}
                disabled={isUpdatingDistribution}
                className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
              >
                {isUpdatingDistribution ? "Updating Distribution..." : `Update to ${distributionPercent || 0}%`}
              </button>
            </div>
          </div>

          {/* ACTION GRID */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* INJECT */}
            <div className="rounded-[32px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-100">
                  <Gift className="h-7 w-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#08111f]">Inject Rewards</h3>
                  <p className="text-[#6c8297]">Add APE into reward reserve</p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="0.00"
                  value={injectAmount}
                  onChange={(e) => setInjectAmount(e.target.value)}
                  className="h-16 w-full rounded-2xl border border-[#dbe7f3] bg-white px-6 text-xl font-black text-[#08111f] outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
                />
                <button
                  onClick={handleInjectRewards}
                  disabled={isInjecting}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(14,165,233,0.20)] transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                >
                  {isInjecting ? "Injecting Rewards..." : "Inject Rewards"}
                </button>
              </div>
            </div>

            {/* DISTRIBUTE */}
            <div className="space-y-6">

              {/* PARTIAL */}
              <div className="rounded-[32px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-200 bg-green-100">
                    <Coins className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#08111f]">Partial Distribution</h3>
                    <p className="text-[#6c8297]">Distribute configured reserve percentage</p>
                  </div>
                </div>

                <button
                  onClick={handleDistributeRewards}
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(34,197,94,0.20)] transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? "Distributing Rewards..." : `Distribute ${Number(currentDistributionPercent || 0).toFixed(0)}%`}
                </button>
              </div>

              {/* FULL */}
              <div className="rounded-[32px] border border-[#e6eef5] bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-200 bg-red-100">
                    <Flame className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#08111f]">Full Distribution</h3>
                    <p className="text-[#6c8297]">Distribute 100% of reserve</p>
                  </div>
                </div>

                <button
                  onClick={handleDistributeAllRewards}
                  disabled={isDistributingAll}
                  className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(239,68,68,0.22)] transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                >
                  {isDistributingAll ? "Distributing All..." : "Distribute ALL Rewards"}
                </button>
              </div>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="group flex w-full items-center justify-center gap-4 rounded-[28px] bg-gradient-to-r from-cyan-500 to-sky-500 py-5 text-xl font-black text-white shadow-[0_20px_60px_rgba(14,165,233,0.25)] transition-all hover:scale-[1.01] cursor-pointer"
          >
            Close Panel
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
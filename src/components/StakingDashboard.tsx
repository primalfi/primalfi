"use client";

import { useMemo, useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallets";
import { usePrimalProtocol } from "../hooks/usePrimalProtocol";
import UserStakesSection from "./PrimalStaking/UserStakesSection";
import AdminPanel from "./PrimalStaking/AdminPanel";
import WithdrawModal from "./PrimalStaking/WithdrawModal";
import TransferStakePosition from "./PrimalStaking/UserStakeTransfer";
import ProtocolContracts from "../hooks/ProtocolContracts";
import WrongNetworkMessage from "./PrimalStaking/WrongNetworkMessage";
import HeroSection from "./PrimalStaking/HeroSection";
import StakingPanel from "./PrimalStaking/StakingPanel";
import ProtocolStats from "./PrimalStaking/ProtocolStats";
import WithdrawQueueSection from "./PrimalStaking/WithdrawQueueSection";
import AdminSection from "./PrimalStaking/AdminSection";
import { ProtocolMode } from "../config/contracts";
import toast from "react-hot-toast";

export default function StakingDashboard() {
    const { address, isCorrectNetwork } = useWallet();
    const [selectedStake, setSelectedStake] = useState<any>(null);
    const [withdrawStatus, setWithdrawStatus] = useState<"loading" | "empty" | "hasData">("loading");
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [periodDays, setPeriodDays] = useState<number>(30);
    const [isLoading, setIsLoading] = useState(false);

    const {
        stats,
        userStakes,
        userAPEBalance,
        isOwner,
        estimatedAPY,
        refreshData,
        stake,
        requestWithdraw,
        claimWithdraw,
        emergencyWithdraw,
        distributeRewards,
        distributeAllRewards,
        injectRewards,
        setDistributionBps,
        setProtocolMode,
        transferStakePosition,
        withdrawQueue,
        canDeposit,
        canWithdraw,
        isEmergencyMode,
        setFee,
        setPenalty
    } = usePrimalProtocol(address || undefined);

    useEffect(() => {
        setWithdrawStatus("loading");
    }, [address]);

    const totalPositions = userStakes.length;
    const activeStakeValue = useMemo(() => {
        return userStakes.reduce((acc: number, stake: any) => {
            const value = Number(stake.currentValue || stake.value || 0);
            return acc + value;
        }, 0);
    }, [userStakes]);

    const handleStake = async (amount: string, periodDays: number) => {
        if (!canDeposit) {
            toast.error(isEmergencyMode ? "Cannot stake in emergency mode" : "Deposits are currently paused");
            return;
        }
        try {
            setIsLoading(true);
            const result = await stake(amount, periodDays);
            if (result.success) {
                toast.success("Stake created successfully");
                refreshData();
            }
        } catch (error) {
            console.error(error);
            toast.error("Transaction failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNormalWithdraw = async (stake: any) => {
        if (!canWithdraw && !isEmergencyMode) {
            toast.error("Withdrawals are currently paused");
            return;
        }

        try {
            const result = await requestWithdraw(stake.index);
            if (result.success) {
                toast.success("Withdrawal request submitted. Funds will be available in 7 days.");
                refreshData();
                setIsWithdrawModalOpen(false);
                setSelectedStake(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Withdrawal request failed");
        }
    };

    const handleEmergencyWithdraw = async (stake: any) => {
        if (!isEmergencyMode) {
            toast.error("Emergency mode is not active");
            return;
        }

        try {
            const result = await emergencyWithdraw(stake.index);
            if (result.success) {
                toast.success("Emergency withdrawal completed");
                refreshData();
                setIsWithdrawModalOpen(false);
                setSelectedStake(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Emergency withdrawal failed");
        }
    };

    if (!isCorrectNetwork) {
        return <WrongNetworkMessage />;
    }

    return (
        <div className="relative overflow-hidden text-[#08111f] min-h-screen">
            {/* BG FX */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <HeroSection />

                <StakingPanel
                    userAPEBalance={userAPEBalance}
                    stats={stats}
                    estimatedAPY={estimatedAPY}
                    periodDays={periodDays}
                    setPeriodDays={setPeriodDays}
                    onStake={handleStake}
                    isLoading={isLoading}
                />

                <ProtocolStats
                    stats={stats}
                    estimatedAPY={estimatedAPY}
                />

                <UserStakesSection
                    userStakes={userStakes}
                    totalPositions={totalPositions}
                    activeStakeValue={activeStakeValue}
                    stats={stats}
                    isEmergencyMode={isEmergencyMode}
                    canWithdraw={canWithdraw}
                    onWithdraw={(stake) => {
                        setSelectedStake(stake);
                        setIsWithdrawModalOpen(true);
                    }}
                    onEmergencyWithdraw={(stake) => {
                        handleEmergencyWithdraw(stake);
                    }}
                />

                {withdrawQueue && withdrawQueue.length > 0 && (
                    <WithdrawQueueSection
                        address={address || ""}
                        stats={stats}
                        onRefreshData={refreshData}
                        onEmptyState={(hasData) => setWithdrawStatus(hasData ? "hasData" : "empty")}
                        onClaimWithdraw={claimWithdraw}
                        withdrawQueue={withdrawQueue}
                        isEmergencyMode={isEmergencyMode}
                    />
                )}

                <section className="py-14">
                    <TransferStakePosition
                        stakes={userStakes}
                        transferStakePosition={transferStakePosition}
                        onTransferSuccess={refreshData}
                        protocolMode={stats.protocolMode}
                        canTransfer={canDeposit}
                    />
                </section>

                <section className="py-14 border-t border-[#dce8f2]/10">
                    <ProtocolContracts />
                </section>

                {isOwner && <AdminSection onOpenAdminPanel={() => setIsAdminPanelOpen(true)} />}
            </div>

            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => {
                    setIsWithdrawModalOpen(false);
                    setSelectedStake(null);
                }}
                onWithdrawSuccess={refreshData}
                stake={selectedStake}
                earlyPenalty={stats.earlyPenalty}
                exchangeRate={stats.exchangeRate}
                isEmergencyMode={isEmergencyMode}
                onNormalWithdraw={handleNormalWithdraw}
                onEmergencyWithdraw={handleEmergencyWithdraw}
            />

            <AdminPanel
                isOpen={isAdminPanelOpen}
                onClose={() => setIsAdminPanelOpen(false)}
                onSuccess={refreshData}
                
                // Existing props
                currentFee={stats.protocolFee}
                currentPenalty={stats.earlyPenalty}
                currentDistributionPercent={stats.distributionPercent}
                currentProtocolMode={stats.protocolMode}
                currentProtocolModeName={stats.protocolModeName}
                isOwner={isOwner}
                
                // NEW READ PROPS
                totalUnderlying={stats.totalUnderlying}
                totalStaked={stats.totalStaked}
                rewardReserve={stats.rewardReserve}
                liquidityIndex={stats.liquidityIndex}
                exchangeRate={stats.exchangeRate}
                protocolBalance={stats.protocolBalance}
                treasury={stats.treasury}
                treasurySplit={stats.treasurySplit}
                
                // Actions
                distributeRewards={distributeRewards}
                distributeAllRewards={distributeAllRewards}
                injectRewards={injectRewards}
                setDistributionBps={setDistributionBps}
                setProtocolMode={setProtocolMode}
                setFee={setFee}
                setPenalty={setPenalty}
            />
        </div>
    );
}
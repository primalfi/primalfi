"use client";

import { useState, useEffect, useCallback } from "react";

import { getApechainProvider } from "../utils/ethers";

import {
    getPrimalProtocolContract,
    getPrimalProtocolContractReadOnly,
    getPrimalApeContractReadOnly,
    getPrimalApeContract,
    parseAPE,
    formatAPE,
    getAPEBalance,
    formatIndex,
} from "../utils/ethers";

import {
    PERIODS,
    PRIMAL_PROTOCOL_ADDRESS,
    ProtocolMode
} from "../config/contracts";

import toast from "react-hot-toast";

export interface Stake {
    owner: string;

    deposited: any;
    scaledAmount: any;

    unlockTime: number;
    period: number;

    index: number;

    formattedDeposited: string;
    currentValue: string;

    profit: string;
    profitPercent: string;

    timeRemaining: string;

    isUnlocked: boolean;
}

export interface WithdrawQueueItem {
    id: number;
    user: string;
    amount: string;
    requestTime: number;
    claimed: boolean;
    canClaim: boolean;
    formattedAmount: string;
}

export interface ProtocolStats {
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

    treasury?: string;
    treasurySplit?: number;
}

export const usePrimalProtocol = (
    userAddress?: string
) => {

    const [loading, setLoading] =
        useState(false);

    const [refreshing, setRefreshing] =
        useState(false);

    const [stats, setStats] =
        useState<ProtocolStats>({
            tvl: "0",

            totalUnderlying: "0",
            totalStaked: "0",

            liquidityIndex: 1,
            exchangeRate: 1,

            protocolFee: 2,
            earlyPenalty: 15,

            rewardReserve: "0",

            protocolMode: ProtocolMode.Live,
            protocolModeName: "Live",

            protocolBalance: "0",

            distributionBps: 7000,
            distributionPercent: 70
        });

    const [userStakes, setUserStakes] =
        useState<Stake[]>([]);

    const [withdrawQueue, setWithdrawQueue] =
        useState<WithdrawQueueItem[]>([]);

    const [userPrAPEBalance, setUserPrAPEBalance] =
        useState("0");

    const [userAPEBalance, setUserAPEBalance] =
        useState("0");

    const [lastRewardsDate, setLastRewardsDate] =
        useState<Date | undefined>(undefined);

    const [isOwner, setIsOwner] =
        useState(false);

    // =====================================================
    // HELPER: GET PROTOCOL MODE NAME
    // =====================================================

    const getProtocolModeName = (mode: number): string => {
        switch (mode) {
            case 0: return "Live";
            case 1: return "Deposits Paused";
            case 2: return "Withdrawals Paused";
            case 3: return "Emergency Only";
            default: return "Unknown";
        }
    };

    // =====================================================
    // LOAD PROTOCOL STATS
    // =====================================================

    const loadProtocolStats = useCallback(
        async () => {

            try {

                const protocol =
                    getPrimalProtocolContractReadOnly();

                const prAPE =
                    getPrimalApeContractReadOnly();

                if (
                    !protocol ||
                    !prAPE ||
                    !PRIMAL_PROTOCOL_ADDRESS
                ) {
                    return;
                }

                const apeProvider = getApechainProvider();

                const protocolBalanceWei = await apeProvider.getBalance(PRIMAL_PROTOCOL_ADDRESS);

                const protocolBalance =
                    formatAPE(protocolBalanceWei);

                const [
                    totalUnderlying,
                    liquidityIndex,
                    exchangeRate,
                    fee,
                    penalty,
                    rewardReserve,
                    protocolMode,
                    totalSupply,
                    distributionBps
                ] = await Promise.all([
                    protocol.totalUnderlying(),
                    protocol.liquidityIndex(),
                    protocol.exchangeRate(),
                    protocol.protocolFee(),
                    protocol.earlyPenalty(),
                    protocol.rewardReserve(),
                    protocol.protocolMode(),
                    prAPE.totalSupply(),
                    protocol.distributionBps()
                ]);

                const modeNum = Number(protocolMode);

                setStats({
                    tvl: protocolBalance,

                    totalUnderlying:
                        formatAPE(totalUnderlying),

                    totalStaked:
                        formatAPE(totalSupply),

                    liquidityIndex:
                        formatIndex(liquidityIndex),

                    exchangeRate:
                        formatIndex(exchangeRate),

                    protocolFee:
                        Number(fee) / 100,

                    earlyPenalty:
                        Number(penalty) / 100,

                    rewardReserve:
                        formatAPE(rewardReserve),

                    protocolMode: modeNum as ProtocolMode,
                    protocolModeName: getProtocolModeName(modeNum),

                    protocolBalance,

                    distributionBps:
                        Number(distributionBps),

                    distributionPercent:
                        Number(distributionBps) / 100
                });

            } catch (error) {

                console.error(
                    "Error loading protocol stats:",
                    error
                );
            }

        },
        []
    );

    // =====================================================
    // LOAD WITHDRAW QUEUE
    // =====================================================

    const loadWithdrawQueue = useCallback(
        async () => {

            if (!userAddress) {
                setWithdrawQueue([]);
                return;
            }

            try {

                const protocol =
                    getPrimalProtocolContractReadOnly();

                if (!protocol) {
                    return;
                }

                // PRUEBA CON ESTOS MÉTODOS (uno debería funcionar)
                let queueLength = 0;

                try {
                    // Intentar con getWithdrawQueueRealLength
                    queueLength = Number(await protocol.getWithdrawQueueRealLength());
                    console.log("✅ getWithdrawQueueRealLength:", queueLength);
                } catch (e) {
                    console.log("getWithdrawQueueRealLength failed, trying withdrawQueueLength");
                    try {
                        queueLength = Number(await protocol.withdrawQueueLength());
                        console.log("✅ withdrawQueueLength:", queueLength);
                    } catch (e2) {
                        console.log("withdrawQueueLength failed, trying getWithdrawQueueLength");
                        try {
                            queueLength = Number(await protocol.getWithdrawQueueLength());
                            console.log("✅ getWithdrawQueueLength:", queueLength);
                        } catch (e3) {
                            console.error("All queue length methods failed", e3);
                        }
                    }
                }

                if (queueLength === 0) {
                    setWithdrawQueue([]);
                    return;
                }

                const items: WithdrawQueueItem[] = [];

                // Escanear la ring buffer
                let scanned = 0;
                let index = 0;
                const maxScan = 100;

                while (scanned < maxScan && index < 1000) {
                    try {
                        const request = await protocol.withdrawQueue(index);

                        // Si no hay más requests, salir
                        if (!request || !request.user || request.user === "0x0000000000000000000000000000000000000000") {
                            break;
                        }

                        console.log(`📊 WithdrawQueue[${index}]:`, {
                            user: request.user,
                            amount: request.amount?.toString(),
                            claimed: request.claimed,
                            id: request.id?.toString()
                        });

                        if (request.user &&
                            request.user.toLowerCase() === userAddress.toLowerCase()) {

                            const canClaim = await protocol.canClaimWithdraw(index);

                            items.push({
                                id: Number(request.id),
                                user: request.user,
                                amount: request.amount.toString(),
                                requestTime: Number(request.requestTime),
                                claimed: request.claimed,
                                canClaim,
                                formattedAmount: formatAPE(request.amount)
                            });
                        }

                        scanned++;
                        index++;
                    } catch (err) {
                        console.log(`Error at index ${index}, stopping scan`, err);
                        break;
                    }
                }

                console.log("📊 Final WithdrawQueue items:", items);
                setWithdrawQueue(items);

            } catch (error) {

                console.error(
                    "Error loading withdraw queue:",
                    error
                );
            }

        },
        [userAddress]
    );

    // =====================================================
    // LOAD LAST REWARD
    // =====================================================

    const loadLastReward = useCallback(
        async () => {

            try {

                const protocol =
                    getPrimalProtocolContractReadOnly();

                if (!protocol) {
                    return;
                }

                const len =
                    await protocol.getRewardsHistoryLength();

                if (Number(len) === 0) {

                    setLastRewardsDate(undefined);

                    return;
                }

                const last =
                    await protocol.getRewardAt(
                        Number(len) - 1
                    );

                setLastRewardsDate(
                    new Date(
                        Number(last.timestamp) * 1000
                    )
                );

            } catch (error) {

                console.error(
                    "Error loading last reward:",
                    error
                );
            }

        },
        []
    );

    // =====================================================
    // LOAD USER STAKES
    // =====================================================

    const loadUserStakes = useCallback(
        async () => {

            if (!userAddress) {

                setUserStakes([]);

                return;
            }

            try {

                const protocol =
                    getPrimalProtocolContractReadOnly();

                const prAPE =
                    getPrimalApeContractReadOnly();

                if (
                    !protocol ||
                    !prAPE
                ) {
                    return;
                }

                const indexes =
                    await protocol.getUserStakeIndexes(
                        userAddress
                    );

                const stakePromises =
                    indexes.map(
                        async (
                            indexBN: any
                        ) => {

                            const stakeIndex =
                                Number(indexBN);

                            try {

                                const [
                                    stake,
                                    currentValue
                                ] = await Promise.all([
                                    protocol.getStakeInfo(
                                        stakeIndex
                                    ),
                                    protocol.getStakeValue(
                                        stakeIndex
                                    )
                                ]);

                                // =====================================================
                                // SKIP INVALID
                                // =====================================================

                                if (
                                    !stake ||
                                    !stake.active
                                ) {
                                    return null;
                                }

                                if (
                                    stake.owner
                                        .toLowerCase() !==
                                    userAddress
                                        .toLowerCase()
                                ) {
                                    return null;
                                }

                                const unlockTime =
                                    Number(
                                        stake.unlockTime
                                    );

                                const now =
                                    Math.floor(
                                        Date.now() / 1000
                                    );

                                const isUnlocked =
                                    now >= unlockTime;

                                const remainingSecs =
                                    isUnlocked
                                        ? 0
                                        : unlockTime - now;

                                const days =
                                    Math.floor(
                                        remainingSecs /
                                        (24 * 60 * 60)
                                    );

                                const hours =
                                    Math.floor(
                                        (
                                            remainingSecs %
                                            (24 * 60 * 60)
                                        ) / (60 * 60)
                                    );

                                const timeRemaining =
                                    isUnlocked
                                        ? "Unlocked"
                                        : `${days}d ${hours}h`;

                                const depositedNum =
                                    parseFloat(
                                        formatAPE(
                                            stake.deposited
                                        )
                                    );

                                const currentNum =
                                    parseFloat(
                                        formatAPE(
                                            currentValue
                                        )
                                    );

                                const profit =
                                    currentNum -
                                    depositedNum;

                                const profitPercent =
                                    depositedNum > 0
                                        ? (
                                            profit /
                                            depositedNum
                                        ) * 100
                                        : 0;

                                const parsedStake: Stake = {
                                    owner:
                                        stake.owner,

                                    deposited:
                                        stake.deposited,

                                    scaledAmount:
                                        stake.scaledAmount,

                                    unlockTime,

                                    period:
                                        Number(
                                            stake.period
                                        ),

                                    index:
                                        stakeIndex,

                                    formattedDeposited:
                                        depositedNum.toFixed(3),

                                    currentValue:
                                        currentNum.toFixed(3),

                                    profit:
                                        profit.toFixed(3),

                                    profitPercent:
                                        profitPercent.toFixed(2),

                                    timeRemaining,

                                    isUnlocked
                                };

                                return parsedStake;

                            } catch (error) {

                                console.error(
                                    `Error loading stake ${stakeIndex}:`,
                                    error
                                );

                                return null;
                            }
                        }
                    );

                const resolvedStakes =
                    await Promise.all(
                        stakePromises
                    );

                const filteredStakes =
                    resolvedStakes
                        .filter(Boolean)
                        .sort(
                            (
                                a: any,
                                b: any
                            ) =>
                                b.index - a.index
                        ) as Stake[];

                setUserStakes(
                    filteredStakes
                );

                const balance =
                    await prAPE.balanceOf(
                        userAddress
                    );

                setUserPrAPEBalance(
                    formatAPE(balance)
                );

                const apeBalance =
                    await getAPEBalance(
                        userAddress
                    );

                setUserAPEBalance(
                    apeBalance
                );

            } catch (error) {

                console.error(
                    "Error loading user stakes:",
                    error
                );
            }

        },
        [userAddress]
    );

    // =====================================================
    // CHECK OWNER
    // =====================================================

    const checkOwner = useCallback(
        async () => {

            if (!userAddress) {

                setIsOwner(false);

                return;
            }

            try {

                const protocol =
                    getPrimalProtocolContractReadOnly();

                if (!protocol) {
                    return;
                }

                const owner =
                    await protocol.owner();

                setIsOwner(
                    userAddress.toLowerCase() ===
                    owner.toLowerCase()
                );

            } catch (error) {

                console.error(
                    "Error checking owner:",
                    error
                );
            }

        },
        [userAddress]
    );

    // =====================================================
    // STAKE
    // =====================================================

    const stake = async (
        amount: string,
        periodDays: number
    ) => {

        // Check if deposits are allowed
        if (stats.protocolMode === ProtocolMode.DepositsPaused ||
            stats.protocolMode === ProtocolMode.EmergencyOnly) {
            toast.error("Deposits are currently paused");
            return { success: false };
        }

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const amountWei =
                parseAPE(amount);

            const periodInSeconds =
                PERIODS[
                periodDays as keyof typeof PERIODS
                ];

            const tx =
                await contract.stake(
                    periodInSeconds,
                    {
                        value: amountWei,
                        gasLimit: 900000
                    }
                );

            await tx.wait();

            toast.success(
                `Staked ${amount} APE successfully`
            );

            await Promise.all([
                loadProtocolStats(),
                loadUserStakes()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Stake failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // REQUEST WITHDRAW
    // =====================================================

    const requestWithdraw = async (
        stakeIndex: number
    ) => {

        // Check if withdrawals are allowed
        if (stats.protocolMode === ProtocolMode.WithdrawalsPaused) {
            toast.error("Withdrawals are currently paused");
            return { success: false };
        }

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.requestWithdraw(
                    stakeIndex,
                    {
                        gasLimit: 1200000
                    }
                );

            await tx.wait();

            toast.success(
                "Withdrawal requested"
            );

            await Promise.all([
                loadUserStakes(),
                loadProtocolStats(),
                loadWithdrawQueue()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Withdraw failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // CLAIM WITHDRAW (ACTUALIZADO: requiere index y requestId)
    // =====================================================

    const claimWithdraw = async (
        queueIndex: number,
        requestId: number
    ) => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.claimWithdraw(
                    queueIndex,
                    requestId,
                    {
                        gasLimit: 600000
                    }
                );

            await tx.wait();

            toast.success(
                "Withdraw claimed"
            );

            await Promise.all([
                loadProtocolStats(),
                loadUserStakes(),
                loadWithdrawQueue()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Claim failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // EMERGENCY WITHDRAW (NUEVO)
    // =====================================================

    const emergencyWithdraw = async (
        stakeIndex: number
    ) => {

        if (stats.protocolMode !== ProtocolMode.EmergencyOnly) {
            toast.error("Emergency mode is not active");
            return { success: false };
        }

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.emergencyWithdraw(
                    stakeIndex,
                    {
                        gasLimit: 600000
                    }
                );

            await tx.wait();

            toast.success(
                "Emergency withdrawal completed"
            );

            await Promise.all([
                loadUserStakes(),
                loadProtocolStats()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Emergency withdraw failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // TRANSFER STAKE POSITION
    // =====================================================

    const transferStakePosition = async (
        to: string,
        amount: string
    ) => {

        setLoading(true);

        try {

            const prAPE =
                await getPrimalApeContract();

            if (!prAPE) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await prAPE.transfer(
                    to,
                    parseAPE(amount),
                    {
                        gasLimit: 1200000
                    }
                );

            await tx.wait();

            toast.success(
                "Position transferred successfully"
            );

            await Promise.all([
                loadUserStakes(),
                loadProtocolStats()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Transfer failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // SET PROTOCOL MODE (NUEVO)
    // =====================================================

    const setProtocolMode = async (
        mode: ProtocolMode
    ) => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.setProtocolMode(
                    mode,
                    {
                        gasLimit: 400000
                    }
                );

            await tx.wait();

            toast.success(
                `Protocol mode changed to ${getProtocolModeName(mode)}`
            );

            await loadProtocolStats();

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Set protocol mode failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // SET FEE
    // =====================================================

    const setFee = async (feeBps: number) => {
        setLoading(true);

        try {
            const contract = await getPrimalProtocolContract();
            if (!contract) throw new Error("Contract not found");

            const tx = await contract.setFee(feeBps, { gasLimit: 400000 });
            await tx.wait();

            toast.success(`Protocol fee updated to ${feeBps / 100}%`);
            await loadProtocolStats();

            return { success: true, tx };

        } catch (error: any) {
            console.error(error);
            toast.error(error?.reason || error?.message || "Set fee failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // SET PENALTY
    // =====================================================

    const setPenalty = async (penaltyBps: number) => {
        setLoading(true);

        try {
            const contract = await getPrimalProtocolContract();
            if (!contract) throw new Error("Contract not found");

            const tx = await contract.setPenalty(penaltyBps, { gasLimit: 400000 });
            await tx.wait();

            toast.success(`Early penalty updated to ${penaltyBps / 100}%`);
            await loadProtocolStats();

            return { success: true, tx };

        } catch (error: any) {
            console.error(error);
            toast.error(error?.reason || error?.message || "Set penalty failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // DISTRIBUTE REWARDS (PARTIAL)
    // =====================================================

    const distributeRewards = async () => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.distributeRewards({
                    gasLimit: 900000
                });

            await tx.wait();

            toast.success(
                "Partial rewards distributed"
            );

            await Promise.all([
                loadProtocolStats(),
                loadUserStakes(),
                loadLastReward()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Distribution failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // DISTRIBUTE ALL REWARDS
    // =====================================================

    const distributeAllRewards = async () => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.distributeAllRewards({
                    gasLimit: 900000
                });

            await tx.wait();

            toast.success(
                "All rewards distributed"
            );

            await Promise.all([
                loadProtocolStats(),
                loadUserStakes(),
                loadLastReward()
            ]);

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Distribution failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // SET DISTRIBUTION %
    // =====================================================

    const setDistributionBps = async (
        bps: number
    ) => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.setDistributionBps(
                    bps,
                    {
                        gasLimit: 400000
                    }
                );

            await tx.wait();

            toast.success(
                "Distribution updated"
            );

            await loadProtocolStats();

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Update failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // INJECT REWARDS
    // =====================================================

    const injectRewards = async (
        amount: string
    ) => {

        setLoading(true);

        try {

            const contract =
                await getPrimalProtocolContract();

            if (!contract) {
                throw new Error(
                    "Contract not found"
                );
            }

            const tx =
                await contract.injectRewards({
                    value: parseAPE(amount),
                    gasLimit: 700000
                });

            await tx.wait();

            toast.success(
                `${amount} APE injected`
            );

            await loadProtocolStats();

            return {
                success: true,
                tx
            };

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.reason ||
                error?.message ||
                "Inject failed"
            );

            return {
                success: false
            };

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // REFRESH
    // =====================================================

    const refreshData = useCallback(
        async () => {

            setRefreshing(true);

            try {

                await Promise.all([
                    loadProtocolStats(),
                    loadUserStakes(),
                    loadWithdrawQueue(),
                    checkOwner(),
                    loadLastReward()
                ]);

            } finally {

                setRefreshing(false);
            }

        },
        [
            loadProtocolStats,
            loadUserStakes,
            loadWithdrawQueue,
            checkOwner,
            loadLastReward
        ]
    );

    // =====================================================
    // EFFECTS
    // =====================================================

    useEffect(() => {

        loadProtocolStats();

        loadLastReward();

    }, [
        loadProtocolStats,
        loadLastReward
    ]);

    useEffect(() => {

        if (userAddress) {

            loadUserStakes();

            loadWithdrawQueue();

            checkOwner();

        } else {

            setUserStakes([]);

            setWithdrawQueue([]);

            setUserPrAPEBalance("0");

            setUserAPEBalance("0");

            setIsOwner(false);
        }

    }, [
        userAddress,
        loadUserStakes,
        loadWithdrawQueue,
        checkOwner
    ]);

    // =====================================================
    // AUTO REFRESH
    // =====================================================

    useEffect(() => {

        const interval =
            setInterval(() => {

                loadProtocolStats();

                if (userAddress) {
                    loadUserStakes();
                    loadWithdrawQueue();
                }

            }, 15000);

        return () =>
            clearInterval(interval);

    }, [
        userAddress,
        loadProtocolStats,
        loadUserStakes,
        loadWithdrawQueue
    ]);

    // =====================================================
    // DERIVED VALUES
    // =====================================================

    const totalStakedValue =
        userStakes.reduce(
            (total, stake) => {

                return (
                    total +
                    parseFloat(
                        stake.currentValue
                    )
                );

            },
            0
        );

    const totalProfit =
        userStakes.reduce(
            (total, stake) => {

                const profit =
                    parseFloat(
                        stake.currentValue
                    ) -
                    parseFloat(
                        stake.formattedDeposited
                    );

                return (
                    total +
                    (
                        profit > 0
                            ? profit
                            : 0
                    )
                );

            },
            0
        );

    const estimatedAPY =
        stats.liquidityIndex > 1
            ? (
                stats.liquidityIndex - 1
            ) * 100
            : 0;

    // Check if deposits/withdrawals are allowed
    const canDeposit = stats.protocolMode === ProtocolMode.Live ||
        stats.protocolMode === ProtocolMode.WithdrawalsPaused;

    const canWithdraw = stats.protocolMode === ProtocolMode.Live ||
        stats.protocolMode === ProtocolMode.DepositsPaused;

    const isEmergencyMode = stats.protocolMode === ProtocolMode.EmergencyOnly;

    return {
        loading,
        refreshing,
        stats,
        userStakes,
        withdrawQueue,
        userPrAPEBalance,
        userAPEBalance,
        isOwner,
        estimatedAPY,
        totalStakedValue,
        totalProfit,
        canDeposit,
        canWithdraw,
        isEmergencyMode,
        stake,
        requestWithdraw,
        claimWithdraw,
        emergencyWithdraw,
        distributeRewards,
        distributeAllRewards,
        transferStakePosition,
        setDistributionBps,
        setProtocolMode,
        injectRewards,
        lastRewardsDate,
        refreshData,
        setFee,
        setPenalty,
    };
};
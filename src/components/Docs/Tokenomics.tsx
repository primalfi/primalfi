// components/Tokenomics.tsx
'use client'

import Link from 'next/link'
import {
    ArrowRight,
    TrendingUp,
    Coins,
    Wallet,
    Lock,
    RefreshCw,
    Database,
    PieChart,
    TimerReset,
    Shield,
    GitBranch,
    AlertTriangle,
    BarChart3,
    Workflow,
    DollarSign
} from 'lucide-react'

export default function Tokenomics() {
    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-4xl font-bold text-white">
                    Economic Architecture
                </h1>

                <p className="mt-3 max-w-5xl leading-8 text-gray-300">
                    PrimalFi introduces a liquidity-index staking architecture
                    designed around sustainable rewards, reserve-backed yield,
                    transferable staking exposure, and automatic compounding.
                    Instead of relying on inflationary farming emissions, the
                    protocol distributes value through dynamic liquidity index
                    growth backed by real protocol reserves.
                </p>
            </div>

            {/* OVERVIEW */}
            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-5 backdrop-blur-xl">
                    <Coins className="h-8 w-8 text-cyan-300" />

                    <p className="mt-4 text-sm text-gray-400">
                        Yield Asset
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        prAPE
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Transferable yield-bearing token
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-5 backdrop-blur-xl">
                    <TrendingUp className="h-8 w-8 text-green-400" />

                    <p className="mt-4 text-sm text-gray-400">
                        Reward System
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        Dynamic APY
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Rewards scale with protocol reserves
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-5 backdrop-blur-xl">
                    <RefreshCw className="h-8 w-8 text-purple-400" />

                    <p className="mt-4 text-sm text-gray-400">
                        Yield Mechanic
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        Auto-Compounding
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Index-based value appreciation
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-5 backdrop-blur-xl">
                    <Lock className="h-8 w-8 text-orange-400" />

                    <p className="mt-4 text-sm text-gray-400">
                        Liquidity Model
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        Queued Withdrawals
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Cooldown protected exits
                    </p>
                </div>
            </div>

            {/* PRAPE */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                        <Coins className="h-7 w-7" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            prAPE Token
                        </h2>

                        <p className="text-sm text-cyan-100/70">
                            Transferable staking exposure asset
                        </p>
                    </div>
                </div>

                <p className="mt-6 leading-8 text-gray-300">
                    prAPE represents proportional ownership of the underlying
                    PrimalFi staking pool. When users deposit APE into the
                    protocol, prAPE is minted using scaled accounting based on
                    the current liquidity index.
                </p>

                <p className="mt-5 leading-8 text-gray-400">
                    Unlike traditional farming tokens, prAPE does not depend on
                    continuous inflationary emissions. Instead, the value of the
                    token increases as rewards are distributed into the protocol
                    reserve and reflected through liquidity index growth.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Standard
                        </p>

                        <p className="mt-2 text-xl font-bold text-white">
                            ERC-20
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Decimals
                        </p>

                        <p className="mt-2 text-xl font-bold text-white">
                            18
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Supply Model
                        </p>

                        <p className="mt-2 text-xl font-bold text-white">
                            Dynamic
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Reward Type
                        </p>

                        <p className="mt-2 text-xl font-bold text-white">
                            Auto-Compounding
                        </p>
                    </div>
                </div>
            </div>

            {/* VALUE FLOW */}
            <div className="rounded-3xl border border-cyan-400/20 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <Workflow className="h-8 w-8 text-cyan-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Protocol Value Flow
                        </h2>

                        <p className="text-sm text-cyan-100/70">
                            Economic circulation inside PrimalFi
                        </p>
                    </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                    <pre className="rounded-3xl border border-white/10 bg-[#030712]/90 p-6 text-sm leading-8 text-cyan-100">
                        {`User Deposits APE
        ↓
Protocol Fee Applied
        ↓
Treasury + Reward Reserve
        ↓
Reward Reserve Accumulates
        ↓
Rewards Distributed
        ↓
Liquidity Index Increases
        ↓
prAPE Value Appreciates
        ↓
Stakers Receive Auto-Compounding Yield`}
                    </pre>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <Wallet className="h-6 w-6 text-green-400" />

                        <p className="mt-4 font-semibold text-white">
                            Deposits
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Users provide APE liquidity to mint prAPE staking
                            exposure.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <PieChart className="h-6 w-6 text-purple-300" />

                        <p className="mt-4 font-semibold text-white">
                            Fee Allocation
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Fees are split between treasury operations and
                            reward reserves.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <Database className="h-6 w-6 text-cyan-300" />

                        <p className="mt-4 font-semibold text-white">
                            Reward Reserve
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Rewards accumulate inside the protocol reserve
                            before distribution.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <TrendingUp className="h-6 w-6 text-orange-300" />

                        <p className="mt-4 font-semibold text-white">
                            Index Growth
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Distributed rewards increase the global liquidity
                            index.
                        </p>
                    </div>
                </div>
            </div>

            {/* LIQUIDITY INDEX */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-green-400" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Liquidity Index Architecture
                        </h2>

                        <p className="text-sm text-gray-400">
                            Core accounting engine of the protocol
                        </p>
                    </div>
                </div>

                <p className="mt-6 leading-8 text-gray-300">
                    PrimalFi uses a scaled accounting system inspired by
                    advanced DeFi lending architectures. Instead of updating
                    every user balance individually, the protocol tracks
                    proportional ownership through a global liquidity index.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-6">
                        <p className="text-lg font-semibold text-white">
                            Scaled Balance Formula
                        </p>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                            <p className="font-mono text-sm text-cyan-100">
                                scaledBalance =
                            </p>

                            <p className="mt-2 font-mono text-sm text-cyan-100">
                                (amount × PRECISION) / liquidityIndex
                            </p>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-gray-400">
                            Internally the protocol stores scaled balances
                            instead of raw balances, allowing all users to
                            receive rewards proportionally.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-green-400/10 bg-green-400/5 p-6">
                        <p className="text-lg font-semibold text-white">
                            Real Balance Formula
                        </p>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                            <p className="font-mono text-sm text-green-100">
                                realBalance =
                            </p>

                            <p className="mt-2 font-mono text-sm text-green-100">
                                (scaledBalance × liquidityIndex) / PRECISION
                            </p>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-gray-400">
                            As the liquidity index increases, the redeemable
                            value of prAPE increases automatically without
                            changing scaled ownership.
                        </p>
                    </div>
                </div>
            </div>

            {/* REWARD SYSTEM */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <DollarSign className="h-8 w-8 text-yellow-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Reward Reserve System
                        </h2>

                        <p className="text-sm text-gray-400">
                            Reserve-backed yield distribution
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-lg font-semibold text-white">
                            Reward Sources
                        </p>

                        <ul className="mt-5 space-y-4 text-sm leading-7 text-gray-400">
                            <li>
                                • Protocol deposit fees
                            </li>

                            <li>
                                • Early withdrawal penalties
                            </li>

                            <li>
                                • Treasury reward injections
                            </li>

                            <li>
                                • Manual reward reserve funding
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
                        <p className="text-lg font-semibold text-white">
                            Distribution Mechanics
                        </p>

                        <p className="mt-4 text-sm leading-8 text-gray-300">
                            Rewards are accumulated inside rewardReserve and
                            later distributed through distributeRewards() or
                            distributeAllRewards(). Distribution increases the
                            liquidity index globally, automatically increasing
                            the redeemable value of all active staking
                            positions.
                        </p>
                    </div>
                </div>
            </div>

            {/* WITHDRAW SYSTEM */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <TimerReset className="h-8 w-8 text-orange-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Withdrawal Queue System
                        </h2>

                        <p className="text-sm text-gray-400">
                            Liquidity protection architecture
                        </p>
                    </div>
                </div>

                <p className="mt-6 leading-8 text-gray-300">
                    Withdrawals are processed through a ring-buffer queue
                    system with cooldown protection. This architecture reduces
                    sudden liquidity shocks and improves protocol solvency
                    during periods of high volatility.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Queue Delay
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            7 Days
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Queue Capacity
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            100,000
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <p className="text-sm text-gray-400">
                            Queue Model
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            FIFO
                        </p>
                    </div>
                </div>
            </div>

            {/* TRANSFER SYSTEM */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/65 p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <GitBranch className="h-8 w-8 text-purple-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Transferable Staking Architecture
                        </h2>

                        <p className="text-sm text-gray-400">
                            Advanced position transfer mechanics
                        </p>
                    </div>
                </div>

                <p className="mt-6 leading-8 text-gray-300">
                    PrimalFi allows staking exposure to remain transferable
                    through prAPE while preserving unlock times, scaled
                    balances, reward exposure, and proportional ownership.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-lg font-semibold text-white">
                            Full Transfers
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Entire staking positions can be transferred between
                            wallets while maintaining unlock periods and
                            liquidity index exposure.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-lg font-semibold text-white">
                            Partial Transfers
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            The protocol supports stake splitting, allowing
                            users to partially transfer scaled staking
                            positions without affecting the remaining exposure.
                        </p>
                    </div>
                </div>
            </div>

            {/* SECURITY */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-8">
                <div className="flex items-center gap-4">
                    <Shield className="h-8 w-8 text-yellow-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Economic Security
                        </h2>

                        <p className="text-sm text-yellow-100/70">
                            Protocol protection systems
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-yellow-400/10 bg-black/20 p-6">
                        <p className="font-semibold text-white">
                            Reentrancy Protection
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Critical operations use ReentrancyGuard to reduce
                            attack surface during deposits, withdrawals, and
                            reward distribution.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-yellow-400/10 bg-black/20 p-6">
                        <p className="font-semibold text-white">
                            Emergency Withdrawals
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Emergency protocol mode enables direct exits during
                            abnormal conditions or liquidity emergencies.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-yellow-400/10 bg-black/20 p-6">
                        <p className="font-semibold text-white">
                            Queue Protection
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            Withdrawal queues reduce bank-run style liquidity
                            drain scenarios and protect reserve stability.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-yellow-400/10 bg-black/20 p-6">
                        <p className="font-semibold text-white">
                            Anti-Overflow Checks
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                            The protocol integrates TVL checks, overflow
                            protections, and liquidity index validation.
                        </p>
                    </div>
                </div>
            </div>

            {/* RISKS */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-8">
                <div className="flex items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-red-300" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Risk Considerations
                        </h2>

                        <p className="text-sm text-red-100/70">
                            Important ecosystem risks
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {[
                        'Withdrawal requests require cooldown periods before claiming.',
                        'Market volatility may affect staking participation and liquidity.',
                        'Reward generation depends on reserve growth and protocol activity.',
                    ].map((risk, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-red-400/10 bg-black/20 p-5"
                        >
                            <p className="text-sm leading-7 text-gray-300">
                                {risk}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-2">
                <Link
                    href="/protocol"
                    className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/40 hover:from-cyan-500/30 hover:to-blue-500/30"
                >
                    Explore Protocol Mechanics

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}
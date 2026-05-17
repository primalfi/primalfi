// components/ProtocolMechanics.tsx
'use client'

import Link from 'next/link'
import {
    ArrowRight,
    ShieldCheck,
    Layers3,
    Coins,
    RefreshCw,
    TimerReset,
    Activity,
    Database,
    Workflow,
    AlertTriangle,
    Cpu,
    Wallet,
    LineChart,
    GaugeCircle,
} from 'lucide-react'

export default function ProtocolMechanics() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white">
                    Protocol Mechanics
                </h1>

                <p className="mt-3 max-w-3xl text-base leading-7 text-gray-300">
                    Deep technical overview of the PrimalFi architecture,
                    including liquidity index accounting, scaled balances,
                    withdrawal queue infrastructure, reward distribution,
                    transferable staking positions, and protocol-level
                    security systems.
                </p>
            </div>

            {/* Liquidity Index */}
            <div className="overflow-hidden rounded-3xl border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                            <LineChart className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Liquidity Index System
                            </h2>

                            <p className="mt-1 text-gray-300">
                                Auto-compounding accounting model powered by
                                scaled balances and a global liquidity index.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    <p className="leading-7 text-gray-300">
                        PrimalFi uses a liquidity index architecture inspired by
                        modern DeFi lending protocols. Instead of manually
                        distributing rewards to each user wallet, the protocol
                        increases a global liquidity index that automatically
                        updates the value of all staking positions.
                    </p>

                    <p className="leading-7 text-gray-300">
                        Every stake is internally stored as a scaled balance.
                        When rewards are distributed, the liquidity index grows,
                        increasing the real value of all scaled balances without
                        modifying every individual stake.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                                Scaling Formula
                            </p>

                            <code className="block rounded-xl bg-[#030712] p-4 text-sm text-cyan-100">
                                scaledAmount = (deposit × PRECISION) /
                                liquidityIndex
                            </code>

                            <p className="mt-4 text-sm leading-6 text-gray-400">
                                Converts deposits into internal protocol shares
                                based on the current liquidity index.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-blue-400/10 bg-black/20 p-5">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-300">
                                Real Balance Formula
                            </p>

                            <code className="block rounded-xl bg-[#030712] p-4 text-sm text-cyan-100">
                                realBalance = (scaledAmount × liquidityIndex) /
                                PRECISION
                            </code>

                            <p className="mt-4 text-sm leading-6 text-gray-400">
                                Converts scaled shares into the real yield-bearing
                                value visible to users.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/5 p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                <RefreshCw className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-cyan-100">
                                    Auto-Compounding Rewards
                                </p>

                                <p className="mt-2 max-w-4xl text-sm leading-7 text-cyan-50/70">
                                    Rewards are never manually claimed. When the
                                    liquidity index increases, every prAPE holder
                                    automatically receives proportional value
                                    growth based on their scaled balance exposure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Staking Engine */}
            <div className="overflow-hidden rounded-3xl border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                            <Workflow className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Staking Engine
                            </h2>

                            <p className="mt-1 text-gray-300">
                                Multi-position staking architecture with
                                mergeable positions and transferable yield.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div className="rounded-2xl border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <Coins className="h-5 w-5 text-emerald-300" />

                            <p className="font-semibold text-white">
                                Deposit Processing
                            </p>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            When a user deposits assets, the protocol deducts the
                            protocol fee, routes treasury allocations, injects
                            reward reserve allocations, and converts the remaining
                            balance into scaled staking exposure.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <TimerReset className="h-5 w-5 text-cyan-300" />

                            <p className="font-semibold text-white">
                                Time-Locked Positions
                            </p>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Every stake contains an unlock timestamp and lock
                            duration. Users may withdraw before unlock time, but
                            early exits trigger protocol penalties that are
                            recycled back into reward reserves.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <Layers3 className="h-5 w-5 text-purple-300" />

                            <p className="font-semibold text-white">
                                Auto-Merge Logic
                            </p>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Stakes with identical owner, unlock time, and staking
                            duration automatically merge into a single position,
                            reducing storage fragmentation and improving gas
                            efficiency.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5 text-yellow-300" />

                            <p className="font-semibold text-white">
                                Transferable Yield Positions
                            </p>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            prAPE transfers automatically synchronize stake
                            ownership inside the protocol. Yield exposure and
                            staking positions can move between wallets without
                            requiring unstaking.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reward Distribution */}
            <div className="overflow-hidden rounded-3xl border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
                            <GaugeCircle className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Dynamic Reward Distribution
                            </h2>

                            <p className="mt-1 text-gray-300">
                                Reward injection and liquidity-index based APY
                                mechanics.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    <p className="leading-7 text-gray-300">
                        The protocol uses a reward reserve system that accumulates
                        protocol revenue, penalties, and manually injected rewards.
                        Distribution events increase the liquidity index and
                        dynamically adjust protocol APY depending on total TVL and
                        reward injection size.
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                            <p className="text-sm text-cyan-200">
                                Reward Reserve
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                Accumulates
                            </p>

                            <p className="mt-2 text-sm leading-6 text-cyan-50/70">
                                Protocol fees, penalties, and owner-injected
                                rewards.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                            <p className="text-sm text-purple-200">
                                Distribution BPS
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                Dynamic
                            </p>

                            <p className="mt-2 text-sm leading-6 text-purple-50/70">
                                Controls how much reserve is distributed into the
                                index.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                            <p className="text-sm text-emerald-200">
                                APY System
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                Variable
                            </p>

                            <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                                Yield changes dynamically depending on reward flow
                                and TVL size.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-purple-400/10 bg-purple-400/5 p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
                                <Activity className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-purple-100">
                                    Reward History Tracking
                                </p>

                                <p className="mt-2 max-w-4xl text-sm leading-7 text-purple-50/70">
                                    Every reward distribution stores a historical
                                    snapshot including reward amount, previous
                                    liquidity index, updated liquidity index, and
                                    distribution timestamp for transparent protocol
                                    accounting.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdraw Queue */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
                            <Database className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Withdrawal Queue Infrastructure
                            </h2>

                            <p className="mt-1 text-gray-300">
                                Ring-buffer queue architecture for liquidity
                                management and withdrawal protection.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    <p className="leading-7 text-gray-300">
                        Withdrawals are processed through a ring-buffer queue
                        system. Instead of instantly removing liquidity from the
                        protocol, users enter a cooldown phase before assets can
                        be claimed.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                            <p className="text-sm text-gray-400">
                                Minimum Queue Time
                            </p>

                            <p className="mt-2 text-3xl font-bold text-white">
                                7 Days
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Protects liquidity reserves and reduces rapid
                                withdrawal attacks.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                            <p className="text-sm text-gray-400">
                                Queue Capacity
                            </p>

                            <p className="mt-2 text-3xl font-bold text-white">
                                100,000
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Large ring-buffer architecture optimized for
                                scalable withdrawal handling.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-orange-400/10 bg-orange-400/5 p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
                                <AlertTriangle className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-orange-100">
                                    Queue Protection Logic
                                </p>

                                <p className="mt-2 max-w-4xl text-sm leading-7 text-orange-50/70">
                                    The queue system reduces liquidity shocks,
                                    improves protocol solvency management, and
                                    creates additional resistance against rapid
                                    exit scenarios and exploit-driven draining
                                    events.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol Modes */}
            <div className="overflow-hidden rounded-3xl border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
                            <ShieldCheck className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Protocol Safety Modes
                            </h2>

                            <p className="mt-1 text-gray-300">
                                Operational state management for protocol-level
                                protection.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <p className="text-lg font-semibold text-emerald-200">
                            Live
                        </p>

                        <p className="mt-3 text-sm leading-7 text-emerald-50/70">
                            Full protocol functionality enabled including deposits,
                            withdrawals, transfers, and reward distributions.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <p className="text-lg font-semibold text-yellow-200">
                            DepositsPaused
                        </p>

                        <p className="mt-3 text-sm leading-7 text-yellow-50/70">
                            Blocks new deposits while maintaining withdrawals and
                            existing protocol operations.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <p className="text-lg font-semibold text-orange-200">
                            WithdrawalsPaused
                        </p>

                        <p className="mt-3 text-sm leading-7 text-orange-50/70">
                            Temporarily disables withdrawal requests while allowing
                            deposits and reward management.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
                        <p className="text-lg font-semibold text-red-200">
                            EmergencyOnly
                        </p>

                        <p className="mt-3 text-sm leading-7 text-red-50/70">
                            Activates emergency withdrawals and restricts standard
                            protocol functionality during critical events.
                        </p>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6">
                <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                        <Cpu className="h-6 w-6" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-yellow-100">
                            Security Architecture
                        </h2>

                        <p className="mt-4 max-w-5xl leading-7 text-yellow-50/70">
                            PrimalFi integrates ReentrancyGuard protections,
                            ownership validation, isolated reward accounting,
                            queue-based withdrawals, emergency operational modes,
                            bounded transfer iterations, and overflow protection
                            checks to strengthen protocol resilience and reduce
                            attack surface exposure.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-2">
                <Link
                    href="/contracts"
                    className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/40 hover:from-cyan-500/30 hover:to-blue-500/30"
                >
                    Explore Smart Contracts

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}
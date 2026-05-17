// components/SmartContracts.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowRight,
    ShieldCheck,
    FileCode2,
    Coins,
    Activity,
    Terminal,
    Lock,
    Layers3
} from 'lucide-react'

export default function SmartContracts() {
    const [selectedContract, setSelectedContract] = useState('primalProtocol')

    const contracts = {
        primalProtocol: {
            name: 'PrimalProtocol',
            description:
                'Core staking infrastructure responsible for deposits, reward distribution, withdrawal requests, liquidity accounting, and protocol-level mechanics.',
            functions: [
                {
                    name: 'stake(uint256 period)',
                    description:
                        'Create a staking position using one of the supported lock periods.'
                },
                {
                    name: 'requestWithdraw(uint256 stakeIndex)',
                    description:
                        'Initiates the withdrawal process and activates the cooldown period.'
                },
                {
                    name: 'claimWithdraw(uint256 index, uint256 requestId)',
                    description:
                        'Claims an approved withdrawal after the cooldown has completed.'
                },
                {
                    name: 'distributeRewards()',
                    description:
                        'Distributes accumulated rewards into the liquidity index system.'
                },
                {
                    name: 'injectRewards()',
                    description:
                        'Injects additional protocol rewards into the staking reserve.'
                },
            ],
            events: [
                {
                    name: 'Staked(address user, uint256 amount, uint256 period)',
                    description:
                        'Triggered whenever a new staking position is created.'
                },
                {
                    name: 'RewardsDistributed(uint256 rewards, uint256 oldIndex, uint256 newIndex)',
                    description:
                        'Emitted after rewards are distributed into the protocol.'
                },
                {
                    name: 'WithdrawClaimed(address user, uint256 amount)',
                    description:
                        'Triggered when a withdrawal is successfully claimed.'
                },
            ]
        },

        primalApe: {
            name: 'PrimalApe',
            description:
                'Yield-bearing ERC20 asset representing protocol staking exposure and auto-compounding rewards.',
            functions: [
                {
                    name: 'transfer(address to, uint256 amount)',
                    description:
                        'Transfers prAPE positions and associated yield exposure.'
                },
                {
                    name: 'balanceOf(address account)',
                    description:
                        'Returns the current balance including accrued rewards.'
                },
                {
                    name: 'scaledBalanceOf(address user)',
                    description:
                        'Returns the internal scaled balance used by the liquidity index.'
                },
                {
                    name: 'getIndex()',
                    description:
                        'Returns the current liquidity index value of the protocol.'
                },
            ],
            events: [
                {
                    name: 'Transfer(address from, address to, uint256 value)',
                    description:
                        'Standard ERC20 transfer event.'
                },
                {
                    name: 'ProtocolUpdated(address protocol)',
                    description:
                        'Emitted when the protocol controller address changes.'
                },
            ]
        }
    }

    const current = contracts[selectedContract as keyof typeof contracts]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Smart Contracts
                </h1>

                <p className="mt-2 max-w-2xl text-gray-300">
                    Explore the core infrastructure powering PrimalFi, including
                    staking mechanics, liquidity indexing, reward accounting,
                    and yield-bearing token architecture.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setSelectedContract('primalProtocol')}
                    className={`cursor-pointer group flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                        selectedContract === 'primalProtocol'
                            ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                            : 'border-cyan-400/10 bg-black/20 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    <Layers3 className="h-4 w-4" />
                    PrimalProtocol
                </button>

                <button
                    onClick={() => setSelectedContract('primalApe')}
                    className={`cursor-pointer group flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                        selectedContract === 'primalApe'
                            ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                            : 'border-cyan-400/10 bg-black/20 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    <Coins className="h-4 w-4" />
                    PrimalApe
                </button>
            </div>

            {/* Contract Info */}
            <div className="overflow-hidden rounded-3xl border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="border-b border-cyan-400/10 bg-black/20 p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                    <FileCode2 className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {current.name}
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-5 max-w-2xl leading-7 text-gray-300">
                                {current.description}
                            </p>
                        </div>

                        <div className="inline-flex h-fit items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                            <ShieldCheck className="h-4 w-4" />
                            Verified Contract
                        </div>
                    </div>
                </div>

                {/* Functions */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-cyan-300" />

                        <h3 className="text-xl font-semibold text-white">
                            Functions
                        </h3>
                    </div>

                    <div className="mt-5 space-y-4">
                        {current.functions.map((func, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/5"
                            >
                                <code className="text-sm font-semibold text-cyan-300">
                                    {func.name}
                                </code>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    {func.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Events */}
                    <div className="mt-10 flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-purple-300" />

                        <h3 className="text-xl font-semibold text-white">
                            Events
                        </h3>
                    </div>

                    <div className="mt-5 space-y-4">
                        {current.events.map((event, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-purple-400/20 hover:bg-purple-400/5"
                            >
                                <code className="text-sm font-semibold text-purple-300">
                                    {event.name}
                                </code>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Security */}
                    <div className="mt-10 rounded-3xl border border-yellow-400/15 bg-yellow-400/5 p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                                <Lock className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-yellow-200">
                                    Security Architecture
                                </p>

                                <p className="mt-2 max-w-3xl text-sm leading-7 text-yellow-100/70">
                                    The protocol integrates ReentrancyGuard protections,
                                    ownership controls, cooldown-based withdrawals,
                                    emergency protection mechanisms, and isolated reward
                                    accounting to improve overall protocol resilience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol Logic */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <Layers3 className="h-5 w-5 text-cyan-300" />

                    <h2 className="text-2xl font-bold text-white">
                        Protocol Logic & Mechanics
                    </h2>
                </div>

                <p className="mt-4 max-w-4xl leading-7 text-gray-400">
                    PrimalFi is designed around a scalable liquidity index architecture
                    that allows staking positions to auto-compound passively without
                    requiring users to manually claim rewards. Instead of increasing
                    token balances directly every distribution cycle, the protocol updates
                    a global liquidity index that continuously increases the value of each
                    prAPE token over time.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {/* Liquidity Index */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                <Activity className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Liquidity Index
                                </h3>

                                <p className="mt-1 text-sm text-cyan-100/60">
                                    Auto-compounding reward engine
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            Rewards are distributed by increasing the global
                            <span className="mx-1 font-semibold text-cyan-300">
                                liquidityIndex
                            </span>
                            variable. Every staking position stores a scaled balance,
                            allowing rewards to compound automatically without updating
                            every user individually on-chain.
                        </p>
                    </div>

                    {/* Scaled Accounting */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
                                <Coins className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Scaled Accounting
                                </h3>

                                <p className="mt-1 text-sm text-purple-100/60">
                                    Gas optimized balance model
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            prAPE balances are internally stored using scaled values instead
                            of real balances. This architecture dramatically reduces gas
                            costs and allows balances to grow dynamically based on the
                            current protocol index.
                        </p>
                    </div>

                    {/* Auto Merge */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                                <Layers3 className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Auto-Merge Engine
                                </h3>

                                <p className="mt-1 text-sm text-emerald-100/60">
                                    Intelligent stake consolidation
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            Deposits using the same lock duration and unlock date are
                            automatically merged into a single staking position. This
                            reduces storage fragmentation while simplifying portfolio
                            management for users.
                        </p>
                    </div>

                    {/* Transferable Stakes */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
                                <ArrowRight className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Transferable Positions
                                </h3>

                                <p className="mt-1 text-sm text-orange-100/60">
                                    Yield ownership mobility
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            When prAPE tokens are transferred, the protocol synchronizes
                            ownership of the underlying staking positions automatically.
                            Partial transfers create proportional split positions while
                            preserving reward exposure and unlock schedules.
                        </p>
                    </div>

                    {/* Withdraw Queue */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
                                <Lock className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Withdrawal Queue
                                </h3>

                                <p className="mt-1 text-sm text-red-100/60">
                                    Delayed liquidity protection
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            Withdrawals enter a cooldown queue before becoming claimable.
                            The protocol uses a ring-buffer architecture for gas efficiency
                            while helping stabilize liquidity and reduce sudden outflows.
                        </p>
                    </div>

                    {/* Dynamic APY */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-black/20 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-400/10 text-pink-300">
                                <Terminal className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Dynamic APY Model
                                </h3>

                                <p className="mt-1 text-sm text-pink-100/60">
                                    Real yield based distribution
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            APY is not fixed. Yield generation depends entirely on rewards
                            injected into the protocol and the current TVL. As more rewards
                            are distributed through the liquidity index, the exchange rate
                            between prAPE and underlying assets continuously increases.
                        </p>
                    </div>
                </div>

                {/* Flow */}
                <div className="mt-8 rounded-3xl border border-white/10 bg-[#030712]/80 p-6">
                    <h3 className="text-lg font-semibold text-white">
                        Protocol Flow
                    </h3>

                    <div className="mt-5 overflow-x-auto">
                        <pre className="text-sm leading-7 text-cyan-100">
{`User Deposit
    ↓
Protocol Fee Applied
    ↓
Deposit Converted Into Scaled Balance
    ↓
prAPE Minted To User
    ↓
Rewards Injected Into Reserve
    ↓
Liquidity Index Increases
    ↓
prAPE Value Appreciates Automatically
    ↓
User Requests Withdraw
    ↓
Cooldown Queue Activated
    ↓
Withdrawal Claim Available`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Architecture */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-cyan-300" />

                    <h2 className="text-2xl font-bold text-white">
                        Contract Architecture
                    </h2>
                </div>

                <div className="mt-5 overflow-x-auto">
                    <pre className="rounded-2xl border border-white/10 bg-[#030712]/90 p-6 text-sm leading-7 text-cyan-100">
{`PrimalProtocol
├── Core Accounting
│   ├── liquidityIndex
│   ├── totalUnderlying
│   └── rewardReserve
│
├── Staking Engine
│   ├── StakeInfo[]
│   ├── Merge System
│   └── Yield Tracking
│
├── Withdrawal Queue
│   ├── Cooldown Requests
│   ├── Ring Buffer Queue
│   └── Penalty Logic
│
└── Reward Distribution
    ├── Treasury Allocation
    ├── Dynamic APY
    └── Auto-Compounding`}
                    </pre>
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-2">
                <Link
                    href="/contracts"
                    className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/40 hover:from-cyan-500/30 hover:to-blue-500/30"
                >
                    Explore Terminal

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}
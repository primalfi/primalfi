// components/FAQ.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ChevronDown,
    HelpCircle,
    ShieldCheck,
    Coins,
    Layers3,
    ArrowRight
} from 'lucide-react'

interface FAQItem {
    question: string
    answer: string
    icon: React.ReactNode
}

const faqs: FAQItem[] = [
    {
        question: 'How does prAPE generate yield?',
        answer:
            'prAPE is a yield-bearing asset powered by the PrimalProtocol liquidity index system. Rewards injected into the protocol increase the global liquidity index, which automatically increases the underlying value represented by each prAPE token without requiring manual reward claims.',
        icon: <Coins className="h-5 w-5" />
    },

    {
        question: 'What happens when I stake APE?',
        answer:
            'When users stake APE into the protocol, a protocol fee is applied and the remaining value becomes part of the protocol liquidity pool. The protocol mints prAPE representing the user position while internally tracking scaled balances tied to the liquidity index.',
        icon: <Layers3 className="h-5 w-5" />
    },

    {
        question: 'How are rewards distributed?',
        answer:
            'Rewards accumulate inside the rewardReserve and can later be distributed through distributeRewards() or distributeAllRewards(). Instead of directly sending rewards to wallets, the protocol increases the liquidityIndex, allowing all stakers to auto-compound proportionally.',
        icon: <Coins className="h-5 w-5" />
    },

    {
        question: 'Can I withdraw before the lock period ends?',
        answer:
            'Yes. Users may request withdrawals before unlockTime, but an early withdrawal penalty is applied. The penalty is redirected back into the rewardReserve, strengthening protocol sustainability and redistributing value to long-term stakers.',
        icon: <ShieldCheck className="h-5 w-5" />
    },

    {
        question: 'Why does the protocol use a withdrawal queue?',
        answer:
            'PrimalProtocol uses a ring-buffer withdrawal queue architecture with a minimum cooldown period of 7 days. This mechanism improves liquidity management, reduces sudden liquidity drain risk, and helps protect the protocol from abusive withdrawal behavior.',
        icon: <ShieldCheck className="h-5 w-5" />
    },

    {
        question: 'What are scaled balances?',
        answer:
            'Scaled balances are internal accounting units used to separate user ownership from reward growth. User balances remain fixed internally while the liquidity index increases over time, allowing rewards to compound globally without modifying every individual wallet balance.',
        icon: <Layers3 className="h-5 w-5" />
    },

    {
        question: 'Does prAPE automatically compound rewards?',
        answer:
            'Yes. Rewards are reflected directly through liquidity index appreciation, meaning users automatically gain additional underlying value without needing to manually harvest or restake rewards.',
        icon: <Coins className="h-5 w-5" />
    },

    {
        question: 'Can prAPE be transferred?',
        answer:
            'Yes. prAPE is fully transferable. When transferred, the protocol also transfers the associated scaled staking exposure and reward participation through the handleTransfer() synchronization mechanism.',
        icon: <Layers3 className="h-5 w-5" />
    },

    {
        question: 'How does the protocol remain sustainable?',
        answer:
            'PrimalFi avoids aggressive inflationary emissions. The protocol uses real reward injections, dynamic distribution mechanics, treasury allocation, withdrawal penalties, and liquidity index accounting to create a more sustainable economic model.',
        icon: <ShieldCheck className="h-5 w-5" />
    },

    {
        question: 'What security protections exist?',
        answer:
            'The smart contracts integrate ReentrancyGuard protections, protocol operational modes, ownership controls, emergency withdrawal functionality, queue-based liquidity management, and isolated reward accounting mechanisms.',
        icon: <ShieldCheck className="h-5 w-5" />
    },

    {
        question: 'What are the available staking periods?',
        answer:
            'The protocol currently supports 30-day, 60-day, and 90-day staking periods. Unlock timestamps are normalized at the smart contract level to improve merge efficiency and staking management.',
        icon: <Layers3 className="h-5 w-5" />
    },

    {
        question: 'What happens to penalties collected from early withdrawals?',
        answer:
            'All early withdrawal penalties are redirected into the protocol rewardReserve. This value may later be redistributed back to long-term participants through the liquidity index reward distribution system.',
        icon: <Coins className="h-5 w-5" />
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                    <HelpCircle className="h-4 w-4" />
                    Protocol Knowledge Base
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
                    Frequently Asked Questions
                </h1>

                <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                    Explore the core mechanics behind PrimalFi including staking,
                    liquidity indexing, reward distribution, withdrawal queues,
                    protocol sustainability, and prAPE yield architecture.
                </p>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-white/10 bg-[#082567]/70 backdrop-blur-xl">
                <div className="divide-y divide-white/10">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index

                        return (
                            <div
                                key={index}
                                className="group transition-all duration-300"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-start justify-between gap-6 p-6 text-left transition-all duration-300 hover:bg-cyan-400/5"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                            {faq.icon}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {faq.question}
                                            </h3>

                                            <p className="mt-2 text-sm leading-7 text-gray-400">
                                                {isOpen
                                                    ? faq.answer
                                                    : faq.answer.slice(0, 110) +
                                                      '...'}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-1 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-all duration-300 ${
                                            isOpen
                                                ? 'rotate-180 border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
                                                : ''
                                        }`}
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6 backdrop-blur-xl">
                    <p className="text-sm font-medium text-cyan-300">
                        Auto-Compounding
                    </p>

                    <p className="mt-3 text-sm leading-7 text-cyan-100/80">
                        Rewards compound automatically through liquidity index
                        appreciation without requiring manual reward claims.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6 backdrop-blur-xl">
                    <p className="text-sm font-medium text-purple-300">
                        Queue-Based Liquidity
                    </p>

                    <p className="mt-3 text-sm leading-7 text-purple-100/80">
                        Withdrawal requests pass through a cooldown queue system
                        designed to improve protocol liquidity stability.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#082567]/70 p-6 backdrop-blur-xl">
                    <p className="text-sm font-medium text-emerald-300">
                        Sustainable Rewards
                    </p>

                    <p className="mt-3 text-sm leading-7 text-emerald-100/80">
                        The protocol prioritizes sustainable yield generation
                        instead of relying on aggressive inflationary emissions.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#082567]/70 p-8 backdrop-blur-xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-white">
                            Explore the PrimalFi Architecture
                        </h2>

                        <p className="mt-3 leading-7 text-gray-300">
                            Dive deeper into protocol mechanics, liquidity index
                            accounting, staking infrastructure, reward flows,
                            and smart contract architecture powering the
                            PrimalFi ecosystem.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/protocol"
                            className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-400/20"
                        >
                            Protocol Mechanics

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/contracts"
                            className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                        >
                            Smart Contracts

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
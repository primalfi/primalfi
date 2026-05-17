// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../../components/Docs/Sidebar'
import Tokenomics from '../../components/Docs/Tokenomics'
import SmartContracts from '../../components/Docs/SmartContracts'
import ProtocolMechanics from '../../components/Docs/ProtocolMechanics'
import FAQ from '../../components/Docs/FAQ'

export default function Home() {
    const [activeSection, setActiveSection] = useState('overview')
    const [isDark, setIsDark] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    const sections = {
        overview: <Overview />,
        tokenomics: <Tokenomics />,
        contracts: <SmartContracts />,
        mechanics: <ProtocolMechanics />,
        faq: <FAQ />
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0b46c5]">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* Base */}
                <div className="absolute inset-0 bg-[#0b46c5]" />

                {/* Center Light */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10)_0%,transparent_45%)]" />

                {/* Top Light */}
                <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1400px] h-[800px] rounded-full bg-cyan-300/10 blur-[180px]" />

                {/* Left Glow */}
                <div className="absolute left-[-250px] top-[10%] w-[700px] h-[700px] rounded-full bg-[#60a5fa]/10 blur-[160px]" />

                {/* Right Glow */}
                <div className="absolute right-[-250px] top-[15%] w-[700px] h-[700px] rounded-full bg-cyan-300/10 blur-[180px]" />

                {/* Lower Light */}
                <div className="absolute bottom-[-350px] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-blue-300/10 blur-[200px]" />

                {/* Center Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/5 blur-[120px]" />

                {/* Radial Rings */}
                <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at center, transparent 0%, transparent 52%, rgba(255,255,255,0.06) 52.5%, transparent 53%),
                            radial-gradient(circle at center, transparent 0%, transparent 64%, rgba(255,255,255,0.04) 64.5%, transparent 65%),
                            radial-gradient(circle at center, transparent 0%, transparent 76%, rgba(255,255,255,0.03) 76.5%, transparent 77%)
                        `,
                    }}
                />

                {/* Grid Dots */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(rgba(255,255,255,0.22) 1.4px, transparent 1.4px)`,
                        backgroundSize: "24px 24px",
                        opacity: 0.30,
                    }}
                />

                {/* Large Grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
                        `,
                        backgroundSize: "120px 120px",
                        opacity: 0.20,
                    }}
                />

                {/* Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.25)_100%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Sidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <div className="lg:pl-72">

                    {/* Mobile Header */}
                    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#082567]/70 px-4 backdrop-blur-xl lg:hidden">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
                            aria-label="Open menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                                <span className="text-lg font-black text-white">P</span>
                            </div>

                            <div>
                                <p className="text-lg font-black tracking-[0.18em] text-white uppercase">
                                    PrimalFi
                                </p>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                                    Documentation
                                </p>
                            </div>
                        </div>
                    </div>

                    <main className="relative z-10 pb-10 pt-6 lg:pt-10">
                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                            {sections[activeSection as keyof typeof sections]}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

// Overview
function Overview() {
    return (
        <div className="space-y-8">
            {/* About */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#082567]/70 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2">
                        <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                        <span className="text-xs font-black tracking-[0.22em] text-cyan-100 uppercase">
                            About The Protocol
                        </span>
                    </div>

                    <h2 className="mt-6 text-4xl font-black tracking-tight text-white">
                        What is PrimalFi?
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-cyan-100/85">
                        PrimalFi is an advanced DeFi staking protocol designed to create a
                        sustainable and scalable yield ecosystem powered by liquidity index
                        mechanics and auto-compounding rewards.
                    </p>

                    <p className="mt-5 text-lg leading-8 text-cyan-100/80">
                        Instead of traditional staking systems that require users to manually
                        claim rewards, PrimalFi introduces <span className="font-bold text-white">prAPE</span>,
                        a yield-bearing asset that automatically increases in value over time
                        as rewards are distributed across the protocol.
                    </p>

                    <p className="mt-5 text-lg leading-8 text-cyan-100/80">
                        The protocol uses an internal <span className="font-bold text-white">Liquidity Index</span> accounting model inspired by institutional-grade DeFi systems,
                        allowing rewards to be distributed proportionally and efficiently
                        to every participant without increasing gas costs.
                    </p>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">

                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5 backdrop-blur-md">
                            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                                Auto Compounding
                            </p>

                            <p className="mt-3 text-sm leading-7 text-cyan-100/80">
                                Rewards are automatically reflected through the liquidity index,
                                eliminating the need for manual claiming.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5 backdrop-blur-md">
                            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                                Yield Bearing Asset
                            </p>

                            <p className="mt-3 text-sm leading-7 text-cyan-100/80">
                                prAPE represents staking positions while continuously accruing
                                value from protocol rewards.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-5 backdrop-blur-md">
                            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                                Protocol Security
                            </p>

                            <p className="mt-3 text-sm leading-7 text-cyan-100/80">
                                Time-locked positions, withdrawal queues, emergency systems,
                                and controlled reward distribution mechanisms.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute right-[-100px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-cyan-300/10 blur-[120px]" />
            </div>
        </div>
    )
}
"use client";

import { motion } from "framer-motion";

import {
    ShieldCheck,
    Coins,
    Layers3,
    Vault,
    Lock,
    Database,
    TrendingUp,
    ChevronRight,
    Sparkles,
    CircleDollarSign,
} from "lucide-react";

export default function TechnicalDocsPage() {

    const sections = [
        {
            title: "Protocol Architecture",
            description:
                "Core system architecture and liquidity index mechanics.",
            icon: Layers3,
            accent: "from-cyan-400 to-sky-500",
            glow: "bg-cyan-500/20",
            content: [
                {
                    subtitle: "Dual Contract System",
                    points: [
                        "PrimalProtocol manages staking, accounting, rewards, penalties and withdraw queues.",
                        "PrimalApe (prAPE) manages transferable liquid staking balances.",
                        "Both contracts operate together using scaled accounting architecture.",
                    ],
                },
                {
                    subtitle: "Liquidity Index Model",
                    points: [
                        "Yield accrues through liquidityIndex growth.",
                        "prAPE redemption value increases automatically over time.",
                        "No rebasing transactions or user interactions are required.",
                    ],
                },
            ],
        },

        {
            title: "PrimalProtocol Contract",
            description:
                "Main staking engine, reward system and accounting layer.",
            icon: Vault,
            accent: "from-blue-400 to-indigo-500",
            glow: "bg-blue-500/20",
            content: [
                {
                    subtitle: "Stake Flow",
                    points: [
                        "Users deposit native APE using stake(period).",
                        "Protocol fees are split between treasury and reward reserve.",
                        "Scaled staking positions are created internally.",
                        "prAPE is minted to the user instantly.",
                    ],
                },

                {
                    subtitle: "Stake Accounting",
                    points: [
                        "Every position stores owner, deposited amount and scaledAmount.",
                        "unlockTime defines penalty-free withdrawals.",
                        "Positions remain transferable while active.",
                    ],
                },

                {
                    subtitle: "Reward Distribution",
                    points: [
                        "injectRewards() increases rewardReserve.",
                        "distributeRewards() expands liquidityIndex.",
                        "All holders benefit proportionally without loops.",
                    ],
                },

                {
                    subtitle: "Withdraw Queue",
                    points: [
                        "Withdrawals are asynchronous.",
                        "Users enter a 7 day queue before claiming.",
                        "prAPE is burned immediately on withdrawal request.",
                    ],
                },

                {
                    subtitle: "Transferable Stake Positions",
                    points: [
                        "Stake ownership follows prAPE transfers.",
                        "Partial transfers create split stake positions.",
                        "Enables liquid secondary staking markets.",
                    ],
                },
            ],
        },

        {
            title: "prAPE Token",
            description:
                "Liquid staking asset powered by scaled balances.",
            icon: Coins,
            accent: "from-cyan-300 to-blue-500",
            glow: "bg-sky-500/20",
            content: [
                {
                    subtitle: "Scaled Balances",
                    points: [
                        "Internal balances are stored as scaled values.",
                        "Visible balances are derived from liquidityIndex.",
                        "Creates automatic compounding yield behavior.",
                    ],
                },

                {
                    subtitle: "Mint & Burn",
                    points: [
                        "Only protocol contract can mint or burn prAPE.",
                        "Minting converts deposits into scaled balances.",
                        "Burning occurs during withdrawal requests.",
                    ],
                },

                {
                    subtitle: "Transfer Synchronization",
                    points: [
                        "Transfers trigger handleTransfer().",
                        "Stake ownership remains synchronized.",
                        "Yield rights move with the token.",
                    ],
                },
            ],
        },

        {
            title: "Security Model",
            description:
                "Protection systems and protocol safety mechanisms.",
            icon: ShieldCheck,
            accent: "from-emerald-400 to-cyan-500",
            glow: "bg-emerald-500/20",
            content: [
                {
                    subtitle: "Reentrancy Protection",
                    points: [
                        "Critical functions use ReentrancyGuard.",
                        "Protects withdrawals and staking operations.",
                        "Prevents recursive callback exploits.",
                    ],
                },

                {
                    subtitle: "Owner Controls",
                    points: [
                        "Owner can pause protocol operations.",
                        "Protocol fee and penalties are configurable.",
                        "Distribution settings remain adjustable.",
                    ],
                },

                {
                    subtitle: "Protocol Limits",
                    points: [
                        "Maximum fee capped at 10%.",
                        "Maximum penalty capped at 30%.",
                        "All critical addresses validated.",
                    ],
                },
            ],
        },

        {
            title: "Staking Mechanics",
            description:
                "How yield accrual and exchange rates function.",
            icon: Lock,
            accent: "from-orange-400 to-red-500",
            glow: "bg-orange-500/20",
            content: [
                {
                    subtitle: "Yield Accrual",
                    points: [
                        "Yield is backed by protocol reserves.",
                        "Rewards increase liquidityIndex globally.",
                        "Every prAPE token appreciates automatically.",
                    ],
                },

                {
                    subtitle: "Exchange Rate",
                    points: [
                        "Exchange rate represents APE backing per prAPE.",
                        "Rate increases after reward distributions.",
                        "Growth reflects protocol performance.",
                    ],
                },

                {
                    subtitle: "Reward Reserve",
                    points: [
                        "Protocol fees accumulate in reserve.",
                        "Penalties recycle value back into protocol yield.",
                        "Rewards are distributed progressively.",
                    ],
                },
            ],
        },

        {
            title: "Technical Advantages",
            description:
                "Core advantages of PrimalFi architecture.",
            icon: TrendingUp,
            accent: "from-fuchsia-400 to-pink-500",
            glow: "bg-fuchsia-500/20",
            content: [
                {
                    subtitle: "Gas Efficiency",
                    points: [
                        "No per-user reward updates.",
                        "No expensive reward loops.",
                        "Global index accounting minimizes gas.",
                    ],
                },

                {
                    subtitle: "Composable DeFi Asset",
                    points: [
                        "prAPE remains fully ERC20 compatible.",
                        "Can integrate with lending and LP protocols.",
                        "Enables external DeFi composability.",
                    ],
                },

                {
                    subtitle: "Liquid Staking",
                    points: [
                        "Users maintain liquidity while staking.",
                        "Positions remain transferable.",
                        "Supports secondary markets.",
                    ],
                },
            ],
        },
    ];

    return (

        <div className="relative overflow-hidden min-h-screen text-white">

            <div className="relative max-w-7xl mx-auto px-6 py-24">

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-28"
                >

                    <div className="
                        inline-flex
                        items-center
                        gap-3
                        px-6
                        py-3
                        rounded-full
                        border
                        border-cyan-400/20
                        bg-white/5
                        backdrop-blur-xl
                        mb-10
                    ">

                        <Database className="w-4 h-4 text-cyan-300" />

                        <span className="
                            text-cyan-200
                            text-sm
                            font-black
                            tracking-[0.24em]
                            uppercase
                        ">
                            Technical Documentation
                        </span>

                    </div>

                    <h1 className="
                        text-6xl
                        md:text-8xl
                        font-black
                        leading-[0.95]
                        tracking-tight
                        mb-8
                    ">
                        Deep Dive Into
                        <br />

                        <span className="
                            bg-gradient-to-r
                            from-cyan-300
                            via-sky-300
                            to-blue-500
                            bg-clip-text
                            text-transparent
                        ">
                            PrimalFi Protocol
                        </span>
                    </h1>

                    {/* HERO STATS */}
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-5
                        mt-16
                    ">

                        {[
                            {
                                label: "Core Contracts",
                                value: "2",
                                icon: Layers3,
                            },
                            {
                                label: "Liquid Asset",
                                value: "prAPE",
                                icon: Coins,
                            },
                            {
                                label: "Yield Model",
                                value: "Index",
                                icon: CircleDollarSign,
                            },
                        ].map((item) => {

                            const Icon = item.icon;

                            return (

                                <div
                                    key={item.label}
                                    className="
                                        relative
                                        overflow-hidden
                                        rounded-[28px]
                                        border
                                        border-white/10
                                        bg-white/[0.04]
                                        backdrop-blur-xl
                                        p-6
                                        text-left
                                    "
                                >

                                    <div className="
                                        absolute
                                        inset-0
                                        bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_100%)]
                                    " />

                                    <div className="relative">

                                        <div className="
                                            w-12
                                            h-12
                                            rounded-2xl
                                            bg-cyan-400/10
                                            border
                                            border-cyan-400/20
                                            flex
                                            items-center
                                            justify-center
                                            mb-5
                                        ">

                                            <Icon className="w-6 h-6 text-cyan-300" />

                                        </div>

                                        <p className="text-4xl font-black mb-2">
                                            {item.value}
                                        </p>

                                        <p className="text-slate-400 font-medium">
                                            {item.label}
                                        </p>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </motion.div>

                {/* SECTION GRID */}
                <div className="space-y-12">

                    {sections.map((section, index) => {

                        const Icon = section.icon;

                        return (

                            <motion.section
                                key={section.title}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.04,
                                }}
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-[40px]
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    backdrop-blur-2xl
                                "
                            >

                                {/* GLOW */}
                                <div className={`
                                    absolute
                                    -top-20
                                    right-0
                                    w-[320px]
                                    h-[320px]
                                    rounded-full
                                    blur-[120px]
                                    ${section.glow}
                                `} />

                                {/* GRID */}
                                <div className="
                                    grid
                                    lg:grid-cols-[340px_1fr]
                                    bg-[#0c3db8]
                                ">

                                    {/* LEFT PANEL */}
                                    <div className="
                                        relative
                                        border-b
                                        lg:border-b-0
                                        lg:border-r
                                        border-white/10
                                        p-8
                                        lg:p-10
                                        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                                    ">

                                        <div className={`
                                            w-20
                                            h-20
                                            rounded-[28px]
                                            bg-cyan-200/20
                                            flex
                                            items-center
                                            justify-center
                                            shadow-2xl
                                            mb-8
                                        `}>

                                            <Icon className="w-10 h-10 text-white" />

                                        </div>

                                        <p className="
                                            text-cyan-300
                                            text-xs
                                            font-black
                                            uppercase
                                            tracking-[0.24em]
                                            mb-4
                                        ">
                                            Documentation
                                        </p>

                                        <h2 className="
                                            text-4xl
                                            font-black
                                            leading-tight
                                            mb-6
                                        ">
                                            {section.title}
                                        </h2>

                                        <p className="
                                            text-slate-400
                                            text-lg
                                            leading-relaxed
                                        ">
                                            {section.description}
                                        </p>

                                    </div>

                                    {/* RIGHT PANEL */}
                                    <div className="
                                        p-6
                                        md:p-10
                                    ">

                                        <div className="
                                            grid
                                            md:grid-cols-2
                                            gap-6
                                        ">

                                            {section.content.map((item) => (

                                                <div
                                                    key={item.subtitle}
                                                    className="
                                                        relative
                                                        overflow-hidden
                                                        rounded-[28px]
                                                        border
                                                        border-white/10
                                                        p-7
                                                        group
                                                        transition-all
                                                        hover:border-cyan-400/30
                                                        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                                                    "
                                                >

                                                    {/* HOVER FX */}
                                                    <div className="
                                                        absolute
                                                        inset-0
                                                        opacity-0
                                                        group-hover:opacity-100
                                                        transition-opacity
                                                        bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,transparent_100%)]
                                                    " />

                                                    <div className="relative">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            mb-6
                                                        ">

                                                            <div className="
                                                                w-10
                                                                h-10
                                                                rounded-xl
                                                                bg-cyan-400/10
                                                                border
                                                                border-cyan-400/20
                                                                flex
                                                                items-center
                                                                justify-center
                                                                shrink-0
                                                            ">

                                                                <Sparkles className="w-4 h-4 text-cyan-300" />

                                                            </div>

                                                            <h3 className="
                                                                text-2xl
                                                                font-black
                                                                leading-tight
                                                            ">
                                                                {item.subtitle}
                                                            </h3>

                                                        </div>

                                                        <div className="space-y-4">

                                                            {item.points.map((point) => (

                                                                <div
                                                                    key={point}
                                                                    className="
                                                                        flex
                                                                        items-start
                                                                        gap-3
                                                                    "
                                                                >

                                                                    <div className="
                                                                        mt-1
                                                                        w-5
                                                                        h-5
                                                                        rounded-full
                                                                        bg-cyan-400/10
                                                                        border
                                                                        border-cyan-400/20
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        shrink-0
                                                                    ">

                                                                        <ChevronRight className="w-3 h-3 text-cyan-300" />

                                                                    </div>

                                                                    <p className="
                                                                        text-slate-300
                                                                        leading-relaxed
                                                                        text-[15px]
                                                                    ">
                                                                        {point}
                                                                    </p>

                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>

                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </motion.section>
                        );
                    })}

                </div>

            </div>
        </div>
    );
}
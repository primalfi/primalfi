// components/Docs/Sidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from "next/image";

import {
    LayoutDashboard,
    Coins,
    FileCode2,
    Cpu,
    CircleHelp,
    X,
    ArrowLeft
} from 'lucide-react'

interface SidebarProps {
    activeSection: string
    setActiveSection: (section: string) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const navigation = [
    {
        id: 'overview',
        name: 'Overview',
        icon: LayoutDashboard,
    },
    {
        id: 'tokenomics',
        name: 'Economic Architecture',
        icon: Coins,
    },
    {
        id: 'contracts',
        name: 'Smart Contracts',
        icon: FileCode2,
    },
    {
        id: 'mechanics',
        name: 'Protocol Mechanics',
        icon: Cpu,
    },
    {
        id: 'faq',
        name: 'FAQ',
        icon: CircleHelp,
    },
]

export default function Sidebar({
    activeSection,
    setActiveSection,
    isOpen,
    setIsOpen
}: SidebarProps) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        const checkMobile = () => {
            const mobile = window.innerWidth < 1024
            setIsMobile(mobile)
        }

        checkMobile()

        window.addEventListener('resize', checkMobile)

        return () =>
            window.removeEventListener('resize', checkMobile)

    }, [])

    const handleNavigation = (sectionId: string) => {

        setActiveSection(sectionId)

        if (isMobile) {
            setIsOpen(false)
        }
    }

    return (
        <>
            {/* MOBILE OVERLAY */}
            {isMobile && isOpen && (
                <div
                    className="
                        fixed inset-0 z-40
                        bg-black/60
                        backdrop-blur-sm
                        transition-opacity
                        lg:hidden
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isMobile && !isOpen
                        ? '-translate-x-full'
                        : 'translate-x-0'}
                    lg:translate-x-0 lg:transform-none
                `}
            >

                <div className="
                    relative flex h-full w-72 flex-col overflow-hidden
                    border-r border-[#294a9b]
                    bg-[#08142f]/95
                    backdrop-blur-2xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                ">

                    {/* BG EFFECTS */}
                    <div className="absolute inset-0 pointer-events-none">

                        <div className="
                            absolute inset-0
                            bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)]
                        " />

                        <div
                            className="absolute inset-0 opacity-[0.07]"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)
                                `,
                                backgroundSize: '26px 26px',
                            }}
                        />

                    </div>

                    {/* HEADER */}
                    <div className="
                        relative z-10
                        flex h-20 items-center justify-between
                        border-b border-[#294a9b]
                        px-5
                    ">

                        <div className="flex items-center gap-3">

                            <div>
                                <Image
                                    src="/prhead.png"
                                    alt="PrimalFi Logo"
                                    width={45}
                                    height={45}
                                    className="relative"
                                    priority
                                />
                            </div>

                            <div>
                                <p className="
                                    text-lg font-black uppercase tracking-[0.12em]
                                    text-white
                                ">
                                    PrimalFi
                                </p>

                                <p className="text-xs text-cyan-200">
                                    Protocol Docs
                                </p>
                            </div>

                        </div>

                        {/* CLOSE */}
                        {isMobile && (
                            <button
                                onClick={() => setIsOpen(false)}
                                className="
                                    rounded-xl p-2
                                    text-cyan-200
                                    hover:bg-[#163d9c]
                                    transition-all
                                    cursor-pointer
                                "
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}

                    </div>

                    {/* NAVIGATION */}
                    <nav className="
                        relative z-10
                        flex-1 space-y-2
                        overflow-y-auto
                        px-3 py-5
                    ">

                        {navigation.map((item) => {

                            const Icon = item.icon

                            const active =
                                activeSection === item.id

                            return (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        handleNavigation(item.id)
                                    }
                                    className={`
                                        group relative w-full overflow-hidden
                                        rounded-2xl border
                                        px-4 py-3 cursor-pointer
                                        transition-all duration-300
                                        ${active
                                            ? `
                                                border-white/10 bg-[#082567]/70
                                            `
                                            : `
                                                border-transparent
                                                bg-transparent
                                                hover:border-[#3558b7]
                                                hover:bg-[#102a68]
                                            `
                                        }
                                    `}
                                >

                                    {active && (
                                        <div className="
                                            absolute inset-0
                                            bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,transparent_100%)]
                                        " />
                                    )}

                                    <div className="
                                        relative flex items-center gap-4
                                    ">

                                        <div className={`
                                            flex h-11 w-11 items-center justify-center
                                            rounded-2xl border
                                            transition-all
                                            ${active
                                                ? `
                                                    border-[#8fb0ff]
                                                    bg-[#1140b3]
                                                `
                                                : `
                                                    border-[#294a9b]
                                                    bg-[#0b2257]
                                                    group-hover:border-[#5b7ce0]
                                                `
                                            }
                                        `}>
                                            <Icon
                                                className={`
                                                    h-5 w-5
                                                    ${active
                                                        ? 'text-white'
                                                        : 'text-cyan-200'}
                                                `}
                                            />
                                        </div>

                                        <div className="text-left">
                                            <p className={`
                                                text-sm font-black uppercase tracking-[0.10em]
                                                ${active
                                                    ? 'text-white'
                                                    : 'text-cyan-100'}
                                            `}>
                                                {item.name}
                                            </p>
                                        </div>

                                    </div>

                                </button>
                            )
                        })}

                    </nav>

                    {/* FOOTER */}
                    <div className="
                        relative z-10
                        border-t border-[#294a9b]
                        p-4
                    ">

                        <div className="
                            rounded-2xl
                            border border-[#3558b7]
                            bg-[#102a68]
                            p-4
                        ">

                            <p className="
                                text-xs uppercase tracking-[0.18em]
                                text-cyan-300
                            ">
                                Network
                            </p>

                            <p className="
                                mt-2 text-sm font-black text-white
                            ">
                                ApeChain Mainnet
                            </p>



                        </div>
                        {/* BACK BUTTON */}
                        <Link
                            href="/"
                            className="
                                    group mt-4 flex items-center justify-center gap-2
                                    rounded-2xl
                                    border border-cyan-400/20
                                    bg-gradient-to-r
                                    from-cyan-500/10
                                    to-blue-500/10
                                    px-4 py-3
                                    text-sm font-bold uppercase tracking-[0.08em]
                                    text-cyan-100
                                    transition-all duration-300
                                    hover:border-cyan-300/40
                                    hover:from-cyan-500/20
                                    hover:to-blue-500/20
                                    hover:text-white
                                    hover:shadow-[0_10px_30px_rgba(59,130,246,0.25)]
                                "
                        >
                            <ArrowLeft className="
                                    h-4 w-4
                                    transition-transform duration-300
                                    group-hover:-translate-x-1
                                " />

                            Back To Main
                        </Link>
                    </div>

                </div>

            </div>
        </>
    )
}
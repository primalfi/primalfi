"use client";

import { useEffect, useState } from "react";
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import { useWallet } from "../hooks/useWallets";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { isConnecting } = useWallet();
    const pathname = usePathname();

    const hideConnectButton = [
        "/",
        "/protocol",
        "/brandkit",
        "/terms",
        "/privacy",
        "/contracts"
    ].includes(pathname);

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setShowHeader(true);
                setLastScrollY(currentScrollY);
                return;
            }

            setShowHeader(currentScrollY < lastScrollY);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const menuItems = [
        { label: "About", id: "about" },
        { label: "Architecture", id: "architecture" },
        { label: "Mechanics", id: "mechanics" },
        { label: "Features", id: "features" },
        { label: "Protocol", href: "/protocol" },
        { label: "Docs", href: "/docs" },
    ];

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 w-full z-50
                    transition-all duration-500 ease-out
                    ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">

                    <nav
                        className="
                            relative
                            h-[84px]
                            px-5 lg:px-7
                            flex
                            items-center
                            justify-between
                            rounded-[30px]
                            border
                            border-white/10
                            bg-[#082c89]/70
                            backdrop-blur-[30px]
                            overflow-hidden
                            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                        "
                    >

                        {/* BACKGROUND FX */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_35%)]" />

                        <div
                            className="absolute inset-0 opacity-[0.18]"
                            style={{
                                backgroundImage: `
                                    radial-gradient(rgba(255,255,255,0.22) 1.2px, transparent 1.2px)
                                `,
                                backgroundSize: "22px 22px",
                            }}
                        />

                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />

                        {/* LEFT */}
                        <Link
                            href="/"
                            className="relative flex items-center gap-4 group shrink-0"
                        >
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="
                                    relative
                                    w-12
                                    h-12
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <Image
                                    src="/prhead.png"
                                    alt="PrimalFi Logo"
                                    width={45}
                                    height={45}
                                    className="relative"
                                    priority
                                />
                            </motion.div>

                            <div className="leading-none">
                                <h1 className="text-[30px] font-black tracking-tight text-white">
                                    PrimalFi
                                </h1>

                                <p className="text-[11px] uppercase tracking-[0.30em] text-cyan-200/70 mt-1">
                                    ApeChain Staking Layer
                                </p>
                            </div>
                        </Link>

                        {/* DESKTOP MENU */}
                        <div className="hidden xl:flex items-center gap-2">
                            {menuItems.map((item, index) => {
                                const content = (
                                    <>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400/10 to-blue-400/10" />

                                        <span className="relative text-[15px] font-bold tracking-wide text-[#c7dcff] group-hover:text-white transition-colors">
                                            {item.label}
                                        </span>
                                    </>
                                );

                                const classes = `
                                    group
                                    relative
                                    h-[52px]
                                    px-6
                                    rounded-2xl
                                    border
                                    border-transparent
                                    hover:border-cyan-300/20
                                    hover:bg-white/[0.03]
                                    transition-all
                                    duration-300
                                    flex
                                    items-center
                                    justify-center
                                    overflow-hidden
                                `;

                                if (item.href) {
                                    return (
                                        <a
                                            key={index}
                                            href={item.href}
                                            rel="noopener noreferrer"
                                            className={classes}
                                        >
                                            {content}
                                        </a>
                                    );
                                }

                                return (
                                    <a
                                        key={index}
                                        href={`/#${item.id}`}
                                        className={classes}
                                    >
                                        {content}
                                    </a>
                                );
                            })}
                        </div>

                        {/* RIGHT */}
                        <div className="relative flex items-center gap-3">

                            {/* VERSION */}
                            {pathname !== "/stake" && (
                                <Link
                                    href="/stake"
                                    className="
                                        hidden
                                        lg:inline-flex
                                        relative
                                        overflow-hidden
                                        items-center
                                        justify-center
                                        h-[52px]
                                        px-7
                                        rounded-2xl
                                        border
                                        border-cyan-300/20
                                        bg-gradient-to-b
                                        from-cyan-400/20
                                        to-blue-500/20
                                        backdrop-blur-xl
                                        shadow-[0_10px_40px_rgba(34,211,238,0.18)]
                                        hover:shadow-[0_18px_60px_rgba(34,211,238,0.28)]
                                        hover:scale-[1.02]
                                        transition-all
                                        duration-300
                                        group
                                    "
                                >
                                    {/* GLOW */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                    {/* PULSE DOT */}
                                    <div className="relative mr-3">
                                        <div className="absolute inset-0 bg-cyan-300 blur-md opacity-80" />
                                        <div className="relative w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                                    </div>

                                    <span className="relative text-sm font-black tracking-[0.18em] uppercase text-white">
                                        Join Protocol
                                    </span>
                                </Link>
                            )}

                            {/* CONNECT */}
                            {!hideConnectButton && (
                                <div className="hidden md:block relative">
                                    <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-[22px]" />

                                    <ConnectWallet
                                        theme={lightTheme({
                                            colors: {
                                                modalBg: "#082c89",
                                                borderColor: "transparent",
                                                separatorLine: "#0c3db8",
                                                secondaryText: "#c4c4c4",
                                                primaryText: "#ffffff",
                                                connectedButtonBg: "transparent",
                                                primaryButtonBg: "transparent",
                                                primaryButtonText: "#ffffff",
                                                secondaryButtonHoverBg: "#0c3db8",
                                                connectedButtonBgHover: "transparent",
                                                walletSelectorButtonHoverBg: "#0c3db8",
                                                secondaryButtonText: "#ffffff",
                                                secondaryButtonBg: "#0c3db8",
                                            },
                                        })}
                                        btnTitle={isConnecting ? "Connecting..." : "Connect Wallet"}
                                        className="
                                            !relative
                                            !overflow-hidden
                                            !border
                                            !border-cyan-300/15
                                            !bg-[#0d3cb1]
                                            hover:!bg-[#1646be]
                                            !rounded-2xl
                                            !px-7
                                            !h-[56px]
                                            !text-white
                                            !font-black
                                            !shadow-[0_20px_50px_rgba(14,165,233,0.25)]
                                            hover:!shadow-[0_25px_70px_rgba(14,165,233,0.40)]
                                            hover:!scale-[1.02]
                                            !transition-all
                                        "
                                        modalSize="wide"
                                        hideBuyButton
                                        hideSendButton
                                        hideReceiveButton
                                        modalTitle="Connect Wallet"
                                        switchToActiveChain
                                        showThirdwebBranding
                                        modalTitleIconUrl="/prhead.png"
                                    />
                                </div>
                            )}

                            {/* MOBILE BUTTON */}
                            <button
                                onClick={() => setMobileMenu(!mobileMenu)}
                                className="
                                    xl:hidden
                                    relative
                                    w-12
                                    h-12
                                    rounded-2xl
                                    border
                                    border-cyan-300/15
                                    bg-[#0d3cb1]
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                "
                            >
                                {mobileMenu ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.25 }}
                        className="
                            fixed
                            top-[105px]
                            left-4
                            right-4
                            z-40
                            xl:hidden
                        "
                    >
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[30px]
                                border
                                border-cyan-300/10
                                bg-[#082c89]/90
                                backdrop-blur-[30px]
                                p-5
                                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                            "
                        >

                            <div
                                className="absolute inset-0 opacity-[0.14]"
                                style={{
                                    backgroundImage: `
                                        radial-gradient(rgba(255,255,255,0.25) 1.2px, transparent 1.2px)
                                    `,
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            <div className="relative flex flex-col gap-2">
                                {menuItems.map((item, index) => {
                                    const content = (
                                        <>
                                            <span className="text-white font-bold text-lg">
                                                {item.label}
                                            </span>

                                            <ChevronRight className="w-5 h-5 text-cyan-200" />
                                        </>
                                    );

                                    const classes = `
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-white/5
                                        bg-white/[0.03]
                                        px-5
                                        h-[64px]
                                        hover:bg-cyan-400/10
                                        transition-all
                                    `;

                                    if (item.href) {
                                        return (
                                            <a
                                                key={index}
                                                href={item.href}
                                                rel="noopener noreferrer"
                                                className={classes}
                                                onClick={() => setMobileMenu(false)}
                                            >
                                                {content}
                                            </a>
                                        );
                                    }

                                    return (
                                        <a
                                            key={index}
                                            href={`/#${item.id}`}
                                            className={classes}
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            {content}
                                        </a>
                                    );
                                })}

                                {!hideConnectButton && (
                                    <div className="pt-3">
                                        <ConnectWallet
                                            theme={lightTheme({
                                                colors: {
                                                    modalBg: "#082c89",
                                                    borderColor: "transparent",
                                                    separatorLine: "#0c3db8",
                                                    secondaryText: "#c4c4c4",
                                                    primaryText: "#ffffff",
                                                    connectedButtonBg: "transparent",
                                                    primaryButtonBg: "transparent",
                                                    primaryButtonText: "#ffffff",
                                                    secondaryButtonHoverBg: "#0c3db8",
                                                    connectedButtonBgHover: "transparent",
                                                    walletSelectorButtonHoverBg: "#0c3db8",
                                                    secondaryButtonText: "#ffffff",
                                                    secondaryButtonBg: "#0c3db8",
                                                },
                                            })}
                                            btnTitle={
                                                isConnecting
                                                    ? "Connecting..."
                                                    : "Connect Wallet"
                                            }
                                            className="
                                                !w-full
                                                !h-[58px]
                                                !rounded-2xl
                                                !bg-[#0d3cb1]
                                                !border
                                                !border-cyan-300/15
                                                !text-white
                                                !font-black
                                            "
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
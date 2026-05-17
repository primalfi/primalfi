"use client";

import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import { motion } from "framer-motion";

import { Wallet } from "lucide-react";

import { useWallet } from "../../hooks/useWallets";

import StakingDashboard from "@/src/components/StakingDashboard";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import BackgroundEffects from "@/src/components/Landing/BackgroundEffects";

export default function Home() {
    const { isConnected } = useWallet();
    const { isConnecting } = useWallet();

    return (
        <main className="relative overflow-hidden min-h-screen text-white">

            {/* BACKGROUND */}
            <BackgroundEffects />

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <div className="relative pt-24">

                {!isConnected ? (

                    <div className="relative flex items-center justify-center min-h-[80vh] px-6 mt-20">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative max-w-3xl w-full"
                        >

                            {/* MAIN CARD */}
                            <div className="
                                relative
                                overflow-hidden
                                rounded-[42px]
                                border
                                border-[#4f6db3]
                                bg-[#0c3db8]
                                shadow-[0_30px_120px_rgba(0,0,0,0.45)]
                            ">

                                {/* TOP LIGHT */}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,transparent_100%)] pointer-events-none" />

                                {/* GRID */}
                                <div
                                    className="absolute inset-0 opacity-[0.06]"
                                    style={{
                                        backgroundImage: `
                                            radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)
                                        `,
                                        backgroundSize: "28px 28px",
                                    }}
                                />

                                <div className="relative p-10 md:p-14 text-center">

                                    {/* TITLE */}
                                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95]">

                                        Stake your

                                        <span className="block bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-100 bg-clip-text text-transparent">
                                            ApeCoin
                                        </span>

                                    </h1>

                                    {/* SUBTITLE */}
                                    <p className="mt-6 text-cyan-100 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                                        Deposit APE into the PrimalFi liquid staking protocol
                                        and receive prAPE while earning yield over time.
                                    </p>

                                    {/* CONNECT CARD */}
                                    <div className="
                                        relative
                                        overflow-hidden
                                        mt-12
                                        rounded-[32px]
                                        border
                                        border-[#7394ff]
                                        bg-[#082c89]
                                        p-10
                                        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                                    ">

                                        {/* INNER LIGHT */}
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)] pointer-events-none" />

                                        {/* ICON */}
                                        <div className="
                                            relative
                                            w-24
                                            h-24
                                            rounded-[30px]
                                            bg-[#0b37a5]
                                            border
                                            border-[#7394ff]
                                            flex
                                            items-center
                                            justify-center
                                            mx-auto
                                            mb-7
                                            shadow-[0_0_40px_rgba(34,211,238,0.15)]
                                        ">
                                            <Wallet className="w-11 h-11 text-cyan-200" />
                                        </div>

                                        {/* TEXT */}
                                        <h2 className="text-3xl font-black text-white mb-4">
                                            Connect Wallet
                                        </h2>

                                        <p className="text-cyan-100/80 text-lg mb-8 font-medium leading-relaxed">
                                            Connect your wallet to access the PrimalFi staking dashboard and start earning rewards.
                                        </p>

                                        {/* BUTTON */}
                                        <div className="flex justify-center">
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
                                                    !border-cyan-200
                                                    !bg-transparent
                                                    hover:!scale-[1.02]
                                                    !rounded-2xl
                                                    !px-7
                                                    !h-[56px]
                                                    !text-white
                                                    !font-black
                                                    !shadow-[0_18px_50px_rgba(14,165,233,0.30)]
                                                    hover:!shadow-[0_25px_70px_rgba(14,165,233,0.40)]
                                                    !transition-all
                                                "
                                                modalSize="wide"
                                                hideBuyButton={true}
                                                hideSendButton={true}
                                                hideReceiveButton={true}
                                                modalTitle={"Connect Wallet"}
                                                switchToActiveChain={true}
                                                showThirdwebBranding={true}
                                                modalTitleIconUrl={"/prhead.png"}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                ) : (

                    <StakingDashboard />

                )}
            </div>

            {/* FOOTER */}
            <Footer />
        </main>
    );
}
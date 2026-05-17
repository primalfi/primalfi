"use client";

import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl mb-8">
                    <RefreshCcw className="w-4 h-4 text-cyan-300" />
                    <p className="text-cyan-200 text-sm font-black uppercase tracking-[0.22em]">
                        Liquid Index Staking
                    </p>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
                    Stake APE.
                    <br />
                    <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                        Keep Liquidity.
                    </span>
                </h1>
            </div>
        </motion.div>
    );
}
"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";

interface AdminSectionProps {
    onOpenAdminPanel: () => void;
}

export default function AdminSection({ onOpenAdminPanel }: AdminSectionProps) {
    return (
        <section className="pt-4">
            <button
                onClick={onOpenAdminPanel}
                className="w-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-[28px] px-8 py-6 flex items-center justify-between transition-all shadow-[0_20px_60px_rgba(14,165,233,0.25)] text-white cursor-pointer"
            >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center">
                        <ShieldCheck className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-xl font-black">Admin Panel</p>
                        <p className="text-white/80">Manage protocol parameters</p>
                    </div>
                </div>
                <ArrowRight className="w-6 h-6 text-white" />
            </button>
        </section>
    );
}
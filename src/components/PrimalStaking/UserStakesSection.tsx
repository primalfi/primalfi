"use client";

import UserStakes from "./UserStakes";
import { ProtocolMode } from "../../config/contracts";

interface UserStakesSectionProps {
    userStakes: any[];
    totalPositions: number;
    activeStakeValue: number;
    stats: any;
    isEmergencyMode?: boolean;
    canWithdraw?: boolean;
    onWithdraw: (stake: any) => void;
    onEmergencyWithdraw?: (stake: any) => void;
}

export default function UserStakesSection({
    userStakes,
    totalPositions,
    activeStakeValue,
    stats,
    isEmergencyMode = false,
    canWithdraw = true,
    onWithdraw,
    onEmergencyWithdraw,
}: UserStakesSectionProps) {
    return (
        <section className="py-14 border-t border-[#dce8f2]/10">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-5">
                <div>
                    <p className="text-cyan-300 font-bold uppercase tracking-[0.25em] mb-4">
                        User Dashboard
                    </p>
                    <h2 className="text-5xl font-black text-white">Your Stakes</h2>
                </div>

                <div className="bg-blue-800 rounded-2xl px-6 py-4 border border-blue-700">
                    <p className="text-white text-xl font-black">{totalPositions} Active Positions</p>
                    <p className="text-cyan-300 text-sm font-semibold mt-1">
                        {activeStakeValue.toLocaleString("en-US", { maximumFractionDigits: 2 })} APE value
                    </p>
                </div>
            </div>

            <UserStakes
                stakes={userStakes}
                onWithdraw={onWithdraw}
                onEmergencyWithdraw={onEmergencyWithdraw}
                exchangeRate={stats.exchangeRate}
                earlyPenalty={stats.earlyPenalty}
                isEmergencyMode={isEmergencyMode}
                canWithdraw={canWithdraw}
            />
        </section>
    );
}
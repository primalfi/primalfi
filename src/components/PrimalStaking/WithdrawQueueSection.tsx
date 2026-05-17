"use client";

import WithdrawQueue from "./WithdrawQueue";
import { ProtocolMode } from "../../config/contracts";

interface WithdrawQueueSectionProps {
    address: string;
    stats: any;
    onRefreshData: () => Promise<void>;
    onEmptyState: (hasData: boolean) => void;
    onClaimWithdraw: (queueIndex: number, requestId: number) => Promise<any>;
    withdrawQueue: any[];
    isEmergencyMode: boolean;
}

export default function WithdrawQueueSection({
    address,
    stats,
    onRefreshData,
    onEmptyState,
    onClaimWithdraw,
    withdrawQueue,
    isEmergencyMode = false,
}: WithdrawQueueSectionProps) {
    return (
        <section className="py-14 border-t border-[#dce8f2]/10">
            <div className="mb-10">
                <p className="text-cyan-300 font-bold uppercase tracking-[0.25em] mb-4">
                    Withdrawals
                </p>
                <h2 className="text-5xl font-black text-white">Withdraw Queue</h2>
            </div>

            <WithdrawQueue
                userAddress={address}
                onClaimSuccess={onRefreshData}
                earlyPenalty={stats.earlyPenalty}
                onEmptyState={onEmptyState}
                protocolMode={stats.protocolMode}
                isEmergencyMode={isEmergencyMode}
                onClaimWithdraw={onClaimWithdraw}
                withdrawQueue={withdrawQueue}
            />
        </section>
    );
}
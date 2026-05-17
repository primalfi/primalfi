"use client";

interface DynamicAPYProps {
    estimatedAPY: number;
    liquidityIndex: number;
    protocolBalance: string;
    lastRewardsDate?: Date;
}

export default function DynamicAPY({
    estimatedAPY,
    liquidityIndex,
}: DynamicAPYProps) {

    // Calculate APY from liquidity index growth
    // If liquidityIndex > 1, it means the index has grown
    const indexAPY = liquidityIndex > 1 ? (liquidityIndex - 1) * 100 : 0;
    
    // Use the higher of estimatedAPY and indexAPY, or combine them
    const displayAPY = Math.max(estimatedAPY, indexAPY);
    
    // Determine color based on APY value
    const getAPYColor = () => {
        if (displayAPY >= 20) return "text-green-400";
        if (displayAPY >= 10) return "text-cyan-400";
        if (displayAPY >= 5) return "text-yellow-400";
        return "text-white";
    };

    return (
        <div className="relative flex items-center gap-2">
            <span className={`text-2xl font-black ${getAPYColor()}`}>
                {displayAPY.toFixed(2)}%
            </span>
        </div>
    );
}
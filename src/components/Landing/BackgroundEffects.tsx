const BackgroundEffects = () => {
    return (
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
    );
};

export default BackgroundEffects;
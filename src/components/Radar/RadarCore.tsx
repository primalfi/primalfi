"use client"

export default function RadarCore() {
    return (
        <div className="relative flex items-center justify-center w-[270px] h-[270px] sm:w-[600px] sm:h-[600px] overflow-hidden">

            {/* OUTER ORBIT */}
            <div className="absolute w-[85%] h-[85%] border border-cyan-400/80 rounded-full animate-spin-slow" />

            {/* APE ORBIT */}
            <div
                className="absolute w-[85%] h-[85%]"
                style={{ animation: "orbit 15s linear infinite" }}
            >
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ animation: "spin-reverse-slow 15s linear infinite" }}
                >
                    <img
                        src="/apecoin.png"
                        alt="APE"
                        width={45}
                        height={45}
                        className="sm:w-[45px] sm:h-[45px] drop-shadow-[0_0_10px_#00FFFF]"
                    />
                </div>
            </div>


            {/* INNER ORBIT */}
            <div className="absolute w-[50%] h-[50%] border border-cyan-400/80 rounded-full animate-spin-reverse-slow" />

            {/* prAPE ORBIT */}
            <div
                className="absolute w-[50%] h-[50%]"
                style={{ animation: "orbit-reverse 14s linear infinite" }}
            >
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ animation: "spin-slow 14s linear infinite" }}
                >
                    <img
                        src="/prape.png"
                        alt="prAEP"
                        width={40}
                        height={40}
                        className="sm:w-[40px] sm:h-[40px] drop-shadow-[0_0_10px_#00FFFF]"
                    />
                </div>
            </div>

            {/* CENTER CORE */}
            <div className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_40px_#00FFFF]" />
        </div>
    )
}
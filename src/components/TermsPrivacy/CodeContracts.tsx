// src/components/ApeScanContractsViewer.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileCode2,
    ChevronRight,
    ChevronDown,
    Braces,
    ShieldCheck,
    Eye,
    PenSquare,
    Loader2,
    ExternalLink,
    Database,
} from "lucide-react";

import { ethers } from "ethers";

type AbiInput = {
    name?: string;
    type: string;
};

type AbiItem = {
    type: string;
    name?: string;
    stateMutability?: string;
    inputs?: AbiInput[];
    outputs?: AbiInput[];
};

type ContractData = {
    address: string;
    name: string;
    description: string;
    sourceCode: string;
    abi: AbiItem[];
};

function FunctionCard({
    item,
    type,
    address,
}: {
    item: AbiItem;
    type: "read" | "write";
    address: string;
}) {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [loadingResult, setLoadingResult] = useState(false);

    const signature = `${item.name}(${(item.inputs || [])
        .map((i) => i.type)
        .join(", ")})`;

    useEffect(() => {
        if (type !== "read" || !item.name) {
            return;
        }

        const hasInputs = (item.inputs || []).length > 0;

        if (hasInputs) {
            setResult("Requires inputs");
            return;
        }

        const loadData = async () => {
            try {
                setLoadingResult(true);
                const provider = new ethers.providers.JsonRpcProvider(
                    "https://rpc.apechain.com"
                );
                const contract = new ethers.Contract(address, [item], provider);
                const value = await contract[item.name]();

                if (value?._isBigNumber) {
                    setResult(value.toString());
                } else if (Array.isArray(value)) {
                    const parsed = value.map((v) => {
                        if (v?._isBigNumber) {
                            return v.toString();
                        }
                        return String(v);
                    });
                    setResult(JSON.stringify(parsed, null, 2));
                } else if (typeof value === "object") {
                    setResult(JSON.stringify(value, null, 2));
                } else {
                    setResult(String(value));
                }
            } catch (err) {
                console.error(err);
                setResult("Error loading");
            } finally {
                setLoadingResult(false);
            }
        };

        loadData();
    }, [item, type, address]);

    return (
        <div className="rounded-[28px] border overflow-hidden backdrop-blur-xl transition-all duration-300 border-white/10 bg-white/[0.03] hover:border-cyan-400/20">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div className={`
                        w-14 h-14 rounded-2xl border flex items-center justify-center
                        ${type === "read" 
                            ? "border-cyan-400/20 bg-cyan-400/10"
                            : "border-orange-400/20 bg-orange-400/10"
                        }
                    `}>
                        {type === "read" ? (
                            <Eye className="w-6 h-6 text-cyan-300" />
                        ) : (
                            <PenSquare className="w-6 h-6 text-orange-300" />
                        )}
                    </div>
                    <div className="text-left">
                        <p className="text-white font-black text-xl mb-1">
                            {item.name}
                        </p>
                        <p className="text-[#9cb3e0] text-sm font-mono break-all">
                            {signature}
                        </p>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-white/10 p-6">
                            <div>
                                <p className={`
                                    font-black uppercase tracking-[0.18em] text-xs mb-4
                                    ${type === "read" ? "text-cyan-200" : "text-orange-200"}
                                `}>
                                    Result
                                </p>
                                <div className={`
                                    rounded-2xl border px-5 py-4
                                    ${type === "read"
                                        ? "border-cyan-400/20 bg-cyan-400/5"
                                        : "border-orange-400/20 bg-orange-400/5"
                                    }
                                `}>
                                    {type === "write" ? (
                                        <p className="text-orange-200 font-mono break-all">
                                            Wallet interaction required
                                        </p>
                                    ) : loadingResult ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 animate-spin text-cyan-300" />
                                            <p className="text-cyan-200 font-medium">Loading...</p>
                                        </div>
                                    ) : (
                                        <pre className="text-cyan-200 font-mono whitespace-pre-wrap break-all text-sm leading-[1.8]">
                                            {result}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ApeScanContractsViewer() {
    const [contracts, setContracts] = useState<ContractData[]>([]);
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<"code" | "read" | "write">("code");

    // Lista de contratos a mostrar
    const contractAddresses = [
        {
            address: "0x19A4790E37C1F9B74388CAD0bf256CDD819eAaac",
            name: "PrimalProtocol.sol",
            description: "Core staking protocol and reward distribution"
        },
        {
            address: "0xD1f948479a8D1A3374C1e0dDd5D5F49aC9821AC2",
            name: "PrimalApe.sol",
            description: "Liquid staking ERC20 token"
        }
    ];

    useEffect(() => {
        const fetchAllContracts = async () => {
            setLoading(true);
            const fetchedContracts: ContractData[] = [];

            for (const contractInfo of contractAddresses) {
                try {
                    const url = `https://api.etherscan.io/v2/api?chainid=33139&module=contract&action=getsourcecode&address=${contractInfo.address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    const result = data.result?.[0];

                    if (result) {
                        let cleanSource = result.SourceCode || "";
                        
                        try {
                            if (cleanSource.startsWith("{{")) {
                                cleanSource = cleanSource.slice(1, -1);
                                const parsed = JSON.parse(cleanSource);
                                const sources = parsed.sources;
                                let mergedCode = "";
                                for (const path in sources) {
                                    mergedCode += `// FILE: ${path}\n\n`;
                                    mergedCode += sources[path].content;
                                    mergedCode += "\n\n";
                                }
                                cleanSource = mergedCode;
                            }
                        } catch {}

                        let parsedAbi: AbiItem[] = [];
                        try {
                            parsedAbi = JSON.parse(result.ABI);
                        } catch {}

                        fetchedContracts.push({
                            address: contractInfo.address,
                            name: contractInfo.name,
                            description: contractInfo.description,
                            sourceCode: cleanSource,
                            abi: parsedAbi,
                        });
                    }
                } catch (err) {
                    console.error(`Error fetching ${contractInfo.address}:`, err);
                }
            }

            setContracts(fetchedContracts);
            setLoading(false);
        };

        fetchAllContracts();
    }, []);

    const current = contracts[selected];
    const readFunctions = current?.abi.filter((item) => 
        item.type === "function" && (item.stateMutability === "view" || item.stateMutability === "pure")
    ) || [];
    
    const writeFunctions = current?.abi.filter((item) => 
        item.type === "function" && item.stateMutability !== "view" && item.stateMutability !== "pure"
    ) || [];

    if (loading) {
        return (
            <section className="relative overflow-hidden py-28">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-300" />
                </div>
            </section>
        );
    }

    if (contracts.length === 0) {
        return (
            <section className="relative overflow-hidden py-28">
                <div className="text-center text-white/60">No contracts found</div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden py-28">
            {/* BG FX */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-xl mb-8">
                        <ShieldCheck className="w-4 h-4 text-cyan-300" />
                        <p className="text-cyan-200 text-xs uppercase tracking-[0.25em] font-black">
                            ApeChain Smart Contracts
                        </p>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-black leading-none mb-8">
                        PrimalFi
                        <br />
                        <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                            Contract Explorer
                        </span>
                    </h2>
                </motion.div>

                {/* LAYOUT - MISMO ESTILO QUE EL EJEMPLO */}
                <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-8">
                    
                    {/* SIDEBAR - IGUAL AL EJEMPLO */}
                    <div className="rounded-[34px] border border-[#4f6db3] bg-[#082c89] shadow-[0_25px_90px_rgba(0,0,0,0.45)] overflow-hidden h-fit">
                        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                            <Braces className="w-5 h-5 text-cyan-300" />
                            <p className="text-white font-black text-lg">contracts</p>
                        </div>

                        <div className="p-4 space-y-3">
                            {contracts.map((contract, index) => {
                                const active = selected === index;
                                return (
                                    <button
                                        key={contract.address}
                                        onClick={() => setSelected(index)}
                                        className={`
                                            w-full cursor-pointer text-left rounded-2xl border transition-all duration-300 p-5
                                            ${active
                                                ? "border-cyan-400/30 bg-cyan-400/10"
                                                : "border-white/10 bg-white/[0.03] hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
                                            }
                                        `}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <FileCode2 className="w-5 h-5 text-cyan-300" />
                                                    <p className="text-white font-black text-lg">
                                                        {contract.name}
                                                    </p>
                                                </div>
                                                <p className="text-[#c4d4ff] text-sm leading-relaxed">
                                                    {contract.description}
                                                </p>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Database className="w-3 h-3 text-[#7e96d6]" />
                                                    <p className="text-[#7e96d6] text-xs font-mono">
                                                        {contract.address.slice(0, 10)}...
                                                        {contract.address.slice(-8)}
                                                    </p>
                                                </div>
                                            </div>
                                            {active ? (
                                                <ChevronDown className="w-5 h-5 text-cyan-300 shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-[#7e96d6] shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* MAIN PANEL */}
                    <div className="rounded-[34px] border border-white/10 bg-[#08111f] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                        
                        {/* TABS - IGUAL AL EJEMPLO PERO CON MÁS OPCIONES */}
                        <div className="border-b border-white/10 bg-white/[0.03] px-6 pt-5">
                            <div className="flex gap-1">
                                {[
                                    { id: "code", label: "Source Code", icon: FileCode2 },
                                    { id: "read", label: "Read Contract", icon: Eye },
                                    { id: "write", label: "Write Contract", icon: PenSquare },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    const active = tab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setTab(item.id as any)}
                                            className={`
                                                relative px-6 py-4 rounded-t-2xl transition-all cursor-pointer
                                                flex items-center gap-2 font-black uppercase tracking-[0.1em] text-sm
                                                ${active
                                                    ? "text-cyan-300 bg-[#08111f]"
                                                    : "text-white/50 hover:text-white/80"
                                                }
                                            `}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.label}
                                            {active && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-400"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CONTENT - CON ANIMACIÓN */}
                        <AnimatePresence mode="wait">
                            {tab === "code" && (
                                <motion.div
                                    key="code"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {/* TOPBAR CON COPY */}
                                    <div className="flex items-center justify-between px-7 py-5 border-b border-white/10 bg-white/[0.03]">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                            </div>
                                            <p className="text-white font-black text-lg">
                                                {current.name}
                                            </p>
                                            <a
                                                href={`https://apescan.io/address/${current.address}`}
                                                target="_blank"
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 hover:bg-cyan-400/15 transition-all"
                                            >
                                                <ExternalLink className="w-3 h-3 text-cyan-300" />
                                                <span className="text-cyan-300 text-xs font-bold">View on ApeScan</span>
                                            </a>
                                        </div>


                                    </div>

                                    {/* CODE DISPLAY */}
                                    <pre className="overflow-x-auto p-8 text-[15px] leading-[1.8] text-[#d7e6ff] font-mono">
                                        <code>{current.sourceCode}</code>
                                    </pre>
                                </motion.div>
                            )}

                            {tab === "read" && (
                                <motion.div
                                    key="read"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    className="p-6 space-y-5"
                                >
                                    {readFunctions.map((fn, index) => (
                                        <FunctionCard
                                            key={index}
                                            item={fn}
                                            type="read"
                                            address={current.address}
                                        />
                                    ))}
                                    {readFunctions.length === 0 && (
                                        <div className="text-center text-white/40 py-20">
                                            No read functions available
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {tab === "write" && (
                                <motion.div
                                    key="write"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    className="p-6 space-y-5"
                                >
                                    {writeFunctions.map((fn, index) => (
                                        <FunctionCard
                                            key={index}
                                            item={fn}
                                            type="write"
                                            address={current.address}
                                        />
                                    ))}
                                    {writeFunctions.length === 0 && (
                                        <div className="text-center text-white/40 py-20">
                                            No write functions available
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
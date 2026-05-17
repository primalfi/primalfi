import { ethers } from "ethers";

import {
    PRIMAL_PROTOCOL_ADDRESS,
    PRIMAL_PROTOCOL_ABI,
    PRIMAL_APE_ADDRESS,
    PRIMAL_APE_ABI
} from "../config/contracts";

declare global {
    interface Window {
        ethereum: any;
    }
}

//
// =====================================================
// 🔥 APECHAIN RPC (SOURCE OF TRUTH)
// =====================================================
//

const APECHAIN_RPC = "https://rpc.apechain.com";

export const getApechainProvider = (): ethers.providers.JsonRpcProvider => {
    return new ethers.providers.JsonRpcProvider(APECHAIN_RPC);
};

//
// =====================================================
// 🟡 WALLET PROVIDER (WRITE ONLY)
// =====================================================
//

export const getProvider = () => {
    if (typeof window !== "undefined" && window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    }
    return null;
};

export const getSigner = async () => {
    const provider = getProvider();
    if (!provider) return null;

    try {
        return await provider.getSigner();
    } catch (e) {
        console.error("Signer error:", e);
        return null;
    }
};

//
// =====================================================
// 🔵 READ ONLY CONTRACTS (RPC)
// =====================================================
//

export const getPrimalProtocolContractReadOnly = () => {
    const provider = getApechainProvider();

    return new ethers.Contract(
        PRIMAL_PROTOCOL_ADDRESS,
        PRIMAL_PROTOCOL_ABI,
        provider
    );
};

export const getPrimalApeContractReadOnly = () => {
    const provider = getApechainProvider();

    return new ethers.Contract(
        PRIMAL_APE_ADDRESS,
        PRIMAL_APE_ABI,
        provider
    );
};

//
// =====================================================
// 🟢 WRITE CONTRACTS (WALLET)
// =====================================================
//

export const getPrimalProtocolContract = async () => {
    const signer = await getSigner();
    if (!signer) return null;

    return new ethers.Contract(
        PRIMAL_PROTOCOL_ADDRESS,
        PRIMAL_PROTOCOL_ABI,
        signer
    );
};

export const getPrimalApeContract = async () => {
    const signer = await getSigner();
    if (!signer) return null;

    return new ethers.Contract(
        PRIMAL_APE_ADDRESS,
        PRIMAL_APE_ABI,
        signer
    );
};

//
// =====================================================
// 🔧 HELPERS SAFE
// =====================================================
//

export const formatAPE = (value: ethers.BigNumberish): string => {
    try {
        return ethers.utils.formatEther(value || "0");
    } catch {
        return "0";
    }
};

export const parseAPE = (value: string): ethers.BigNumber => {
    try {
        return ethers.utils.parseEther(value || "0");
    } catch {
        return ethers.BigNumber.from(0);
    }
};

export const formatIndex = (value: ethers.BigNumberish): number => {
    try {
        return Number(ethers.utils.formatEther(value || "0"));
    } catch {
        return 0;
    }
};

export const getAPEBalance = async (address: string): Promise<string> => {
    try {
        const provider = getApechainProvider();

        const balance = await provider.getBalance(address);

        return formatAPE(balance);
    } catch (e) {
        console.error("Balance error:", e);
        return "0";
    }
};

//
// =====================================================
// 🔥 NETWORK CHECK
// =====================================================
//

export const isApeChain = async (): Promise<boolean> => {
    try {
        const provider = getProvider();

        if (!provider) return false;

        const network = await provider.getNetwork();

        return Number(network.chainId) === 33139;
    } catch {
        return false;
    }
};

//
// =====================================================
// ⏱ TIME FORMAT
// =====================================================
//

export const formatTimeRemaining = (seconds: number): string => {
    if (!seconds || seconds <= 0) return "0s";

    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;

    return `${seconds}s`;
};
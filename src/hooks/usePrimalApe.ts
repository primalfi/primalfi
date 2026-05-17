"use client";

import { useState, useCallback } from "react";
import {
    getPrimalApeContractReadOnly,
    formatAPE
} from "../utils/ethers";

const PRECISION = 1e18;

export const usePrimalApe = () => {

    const [loading, setLoading] = useState(false);

    // =====================================================
    // TOKEN INFO
    // =====================================================
    const getTokenInfo = useCallback(async () => {
        setLoading(true);

        try {
            const prAPE = getPrimalApeContractReadOnly();
            if (!prAPE) return null;

            const [
                name,
                symbol,
                decimals,
                totalSupply,
                protocol,
                index,
                scaledSupply
            ] = await Promise.all([
                prAPE.name(),
                prAPE.symbol(),
                prAPE.decimals(),
                prAPE.totalSupply(),
                prAPE.protocol(),
                prAPE.getIndex(),
                prAPE.scaledTotalSupply()
            ]);

            return {
                name,
                symbol,
                decimals: Number(decimals),

                // real token supply (human)
                totalSupply: formatAPE(totalSupply),

                // raw scaled supply (debug / protocol view)
                scaledTotalSupply: scaledSupply.toString(),

                protocol,

                // IMPORTANT: index is NOT token amount
                index: index.toString(),

                // helper: exchange rate (UI friendly)
                exchangeRate: formatAPE(index)
            };

        } catch (error) {
            console.error("Error getting prAPE token info:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // USER INFO
    // =====================================================
    const getUserInfo = useCallback(async (address: string) => {
        if (!address) return null;

        setLoading(true);

        try {
            const prAPE = getPrimalApeContractReadOnly();
            if (!prAPE) return null;

            const [
                balance,
                scaledBalance,
                index
            ] = await Promise.all([
                prAPE.balanceOf(address),
                prAPE.scaledBalanceOf(address),
                prAPE.getIndex()
            ]);

            return {
                address,

                balance: formatAPE(balance),

                scaledBalance: scaledBalance.toString(),

                index: index.toString(),

                // useful UI metric
                exchangeRate: formatAPE(index)
            };

        } catch (error) {
            console.error("Error getting prAPE user info:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // OFFCHAIN TRANSFER PREVIEW (FIXED)
    // =====================================================
    const getScaledTransferAmount = useCallback(
        async (amount: string) => {

            if (!amount || isNaN(Number(amount))) return null;

            try {
                const prAPE = getPrimalApeContractReadOnly();
                if (!prAPE) return null;

                const index = await prAPE.getIndex();

                // OFFCHAIN CORRECT FORMULA
                const scaled =
                    (BigInt(Math.floor(Number(amount) * 1e18)) * BigInt(PRECISION)) /
                    BigInt(index.toString());

                return scaled.toString();

            } catch (error) {
                console.error("Error computing scaled transfer:", error);
                return null;
            }
        },
        []
    );

    return {
        loading,
        getTokenInfo,
        getUserInfo,
        getScaledTransferAmount
    };
};
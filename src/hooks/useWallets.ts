"use client";

import { useAddress, useMetamask, useDisconnect, useConnectionStatus } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';
import { getProvider, isApeChain } from '../utils/ethers';
import toast from 'react-hot-toast';

export const useWallet = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnect = useDisconnect();
    const connectionStatus = useConnectionStatus();

    const [chainId, setChainId] = useState<number | null>(null);
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const checkNetwork = async () => {
            const isApe = await isApeChain();
            setIsCorrectNetwork(isApe);

            const provider = getProvider();
            if (provider) {
                const network = await provider.getNetwork();
                setChainId(network.chainId);
            }
        };

        if (address) {
            checkNetwork();
        }
    }, [address]);

    useEffect(() => {
        if (!window.ethereum) return;

        const handleChainChange = async () => {
            const isApe = await isApeChain();
            setIsCorrectNetwork(isApe);

            const provider = getProvider();
            if (provider) {
                const network = await provider.getNetwork();
                setChainId(network.chainId);
            }
        };

        window.ethereum.on("chainChanged", handleChainChange);

        return () => {
            window.ethereum.removeListener("chainChanged", handleChainChange);
        };
    }, []);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            await connectWithMetamask();
            toast.success('Wallet conectada correctamente');
        } catch (error) {
            toast.error('Error al conectar wallet');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
            toast.success('Wallet desconectada');
        } catch (error) {
            toast.error('Error al desconectar');
        }
    };

    const switchToApeChain = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x8173' }],
                });
                toast.success('Cambiado a ApeChain');
            } catch (error: any) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x8173',
                                chainName: 'ApeChain',
                                nativeCurrency: {
                                    name: 'ApeCoin',
                                    symbol: 'APE',
                                    decimals: 18
                                },
                                rpcUrls: ['https://rpc.apechain.com'],
                                blockExplorerUrls: ['https://apescan.io/']
                            }]
                        });
                        toast.success('Red ApeChain agregada');
                    } catch (addError) {
                        toast.error('Error al agregar la red');
                    }
                } else {
                    toast.error('Error al cambiar de red');
                }
            }
        }
    };

    return {
        address,
        connect: handleConnect,
        disconnect: handleDisconnect,
        isConnected: connectionStatus === "connected",
        isConnecting: isConnecting || connectionStatus === "connecting",
        chainId,
        isCorrectNetwork,
        switchToApeChain
    };
};
"use client";

import {
    ThirdwebProvider,
    metamaskWallet,
    walletConnect,
    okxWallet,
    trustWallet,
    rabbyWallet,
    phantomWallet,
    coinbaseWallet,
    rainbowWallet,
    imTokenWallet,
    oneKeyWallet,
    safeWallet,
} from "@thirdweb-dev/react";
import { ReactNode } from "react";

const Apechain = {
    slug: "apechain",
    name: "ApeChain",
    chain: "APE",
    rpc: ["https://rpc.apechain.com"],
    faucets: [],
    nativeCurrency: {
        name: "ApeCoin",
        symbol: "APE",
        decimals: 18,
    },
    features: [{ name: "EIP155" }, { name: "EIP1559" }],
    infoURL: "https://apechain.com/",
    shortName: "APE",
    chainId: 33139,
    networkId: 33139,
    icon: {
        url: "apecoin.png",
        width: 512,
        height: 512,
        format: "png",
    },
    explorers: [
        {
            name: "Apescan",
            url: "https://apescan.io/",
            standard: "EIP3091",
        },
    ],
    testnet: false
};

export default function ThirdwebClient({ children }: { children: ReactNode }) {
    return (
        <ThirdwebProvider
            autoConnect={true}
            activeChain={Apechain}
            supportedChains={[Apechain]}
            supportedWallets={[
                metamaskWallet(),
                okxWallet(),
                rainbowWallet(),
                coinbaseWallet(),
                rabbyWallet(),
                phantomWallet(),
                trustWallet(),
                imTokenWallet(),
                safeWallet(),
                oneKeyWallet(),
                walletConnect(),
            ]}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        >
            {children}
        </ThirdwebProvider>
    );
}
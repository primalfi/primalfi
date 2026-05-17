"use client";

import React from "react";

export default function PrimalFiPrivacyPolicy() {
    return (
        <div className="min-h-screen text-[#08111f] px-6 py-20">
            <div className="max-w-5xl mx-auto bg-white border border-white rounded-[32px] p-10 md:p-14 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">

                <h1 className="text-5xl font-black mb-6">
                    Privacy Policy — PrimalFi
                </h1>

                <p className="text-[#617b94] mb-10">
                    Last updated: May 10, 2026<br />
                    Website: https://primalfi.xyz
                </p>

                {/* 1 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">1. Overview</h2>

                    <p>
                        This Privacy Policy describes how PrimalFi ("we", "our", or "us") handles information
                        in connection with your access and use of the PrimalFi protocol, website, interfaces,
                        and related services (collectively, the "Services").
                    </p>

                    <p>
                        PrimalFi is a decentralized, non-custodial protocol. Most interactions occur directly
                        between users and blockchain smart contracts.
                    </p>
                </section>

                {/* 2 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">2. No Custody of User Data or Funds</h2>

                    <p>
                        PrimalFi does not collect, store, or control user funds, private keys, or wallet credentials.
                    </p>

                    <p>
                        All blockchain interactions are executed via self-custodial wallets and public smart contracts.
                        We do not have access to or control over user assets or identity-linked wallet data.
                    </p>
                </section>

                {/* 3 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">3. Information We May Collect</h2>

                    <p>Depending on how you use the Services, we may collect limited information such as:</p>

                    <ul className="list-disc ml-6 space-y-2 text-[#617b94]">
                        <li>Public blockchain wallet addresses</li>
                        <li>On-chain transaction data (publicly available)</li>
                        <li>Device and browser information (via analytics tools)</li>
                        <li>Interaction logs with the interface (non-identifiable)</li>
                    </ul>

                    <p>
                        This information is primarily used to improve performance, security, and user experience.
                    </p>
                </section>

                {/* 4 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">4. Blockchain Data is Public</h2>

                    <p>
                        You acknowledge that blockchain networks are public by design.
                        Any transaction you make using PrimalFi is permanently recorded on-chain
                        and may be visible to anyone.
                    </p>

                    <p>
                        PrimalFi does not control or erase blockchain data.
                    </p>
                </section>

                {/* 5 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">5. Cookies and Analytics</h2>

                    <p>
                        The interface may use minimal cookies or analytics tools to measure performance,
                        detect bugs, and improve usability.
                    </p>

                    <p>
                        These tools do not aim to personally identify users and are used strictly for operational purposes.
                    </p>
                </section>

                {/* 6 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">6. Third-Party Services</h2>

                    <p>
                        PrimalFi may integrate or interact with third-party services such as wallets,
                        RPC providers, indexing services, or analytics platforms.
                    </p>

                    <p>
                        We are not responsible for the privacy practices of third-party services.
                        Users should review their respective privacy policies before use.
                    </p>
                </section>

                {/* 7 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">7. Data Security</h2>

                    <p>
                        While we implement reasonable measures to secure the interface,
                        no system is completely secure.
                    </p>

                    <p>
                        You acknowledge that interacting with blockchain applications involves inherent security risks.
                    </p>
                </section>

                {/* 8 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">8. No Personal Data Sale</h2>

                    <p>
                        PrimalFi does not sell, rent, or trade personal information.
                    </p>

                    <p>
                        We do not engage in advertising-based profiling or user data monetization.
                    </p>
                </section>

                {/* 9 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">9. Your Rights</h2>

                    <p>
                        Since PrimalFi is a decentralized protocol, there is no traditional account system.
                        Therefore, we do not maintain personal identity data that can be accessed, modified, or deleted.
                    </p>
                </section>

                {/* 10 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-black">10. Changes to This Policy</h2>

                    <p>
                        We may update this Privacy Policy from time to time.
                        Continued use of the Services constitutes acceptance of any changes.
                    </p>

                    <p className="text-[#617b94] text-sm mt-6">
                        Contact: support@primalfi.xyz
                    </p>
                </section>

            </div>
        </div>
    );
}
"use client";

export default function TermsPage() {
    return (
        <div className="min-h-screen text-[#08111f] px-6 py-20">
            <div className="max-w-5xl mx-auto bg-white border border-white rounded-[32px] p-10 md:p-14 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">

                <h1 className="text-5xl font-black mb-6">
                    Terms of Service — PrimalFi
                </h1>

                <p className="text-[#617b94] mb-10">
                    Last updated: May 10, 2026<br />
                    Website: https://primalfi.xyz
                </p>

                {/* 1 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">1. Welcome to PrimalFi</h2>

                    <p>
                        These Terms of Service ("Terms") govern your access and use of the PrimalFi website,
                        interfaces, dashboards, smart contract interactions, and any related services
                        (collectively, the "Services").
                    </p>

                    <p>
                        PrimalFi is a decentralized, non-custodial liquid staking protocol deployed on public blockchain networks.
                        The protocol is composed of autonomous smart contracts that operate without central control.
                    </p>

                    <p>
                        PrimalFi does not custody, control, or manage user funds or cryptoassets at any time.
                        All interactions occur directly between users and smart contracts via self-custodial wallets.
                    </p>

                    <p className="font-semibold text-red-500 uppercase">
                        ARBITRATION NOTICE: These Terms include binding arbitration and waiver of class actions where permitted by law.
                    </p>
                </section>

                {/* 2 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">2. Non-Custodial Nature of the Protocol</h2>

                    <p>
                        You acknowledge and agree that PrimalFi is a non-custodial system.
                        We do not hold, store, access, or control any user funds, private keys, or wallets.
                    </p>

                    <p>
                        All transactions are executed via smart contracts deployed on blockchain networks,
                        and are irreversible once confirmed.
                    </p>

                    <p>
                        Users are solely responsible for the security of their wallets, private keys, and credentials.
                    </p>
                </section>

                {/* 3 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">3. Risk Disclosure</h2>

                    <p>
                        Interaction with decentralized finance protocols involves significant risk, including but not limited to:
                    </p>

                    <ul className="list-disc ml-6 space-y-2 text-[#617b94]">
                        <li>Loss of funds due to smart contract vulnerabilities</li>
                        <li>Market volatility and asset depreciation</li>
                        <li>Network congestion or blockchain failures</li>
                        <li>Oracle manipulation or inaccurate pricing data</li>
                        <li>Regulatory uncertainty or legal restrictions</li>
                    </ul>

                    <p className="font-semibold">
                        By using PrimalFi, you expressly accept all associated risks.
                    </p>
                </section>

                {/* 4 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">4. No Financial Advice</h2>

                    <p>
                        All information provided through PrimalFi is for informational purposes only and does not constitute financial,
                        investment, legal, or tax advice.
                    </p>

                    <p>
                        Nothing on the platform should be interpreted as a recommendation to buy, sell, stake, or hold any asset.
                    </p>
                </section>

                {/* 5 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">5. Fees and Network Costs</h2>

                    <p>
                        Users are responsible for all blockchain-related costs including gas fees,
                        validator fees, and any third-party protocol fees.
                    </p>

                    <p>
                        PrimalFi may charge protocol-level fees as defined by smart contract parameters,
                        which may change via governance or protocol updates.
                    </p>
                </section>

                {/* 6 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">6. Smart Contract Execution</h2>

                    <p>
                        All actions executed through PrimalFi are processed by autonomous smart contracts.
                        These contracts determine outcomes algorithmically without human intervention.
                    </p>

                    <p>
                        Users acknowledge that smart contract execution is final and cannot be reversed,
                        canceled, or modified by PrimalFi.
                    </p>
                </section>

                {/* 7 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">7. Limitation of Liability</h2>

                    <p>
                        To the maximum extent permitted by law, PrimalFi and its contributors shall not be liable
                        for any direct, indirect, incidental, consequential, or special damages arising from use of the Services.
                    </p>

                    <p>
                        This includes but is not limited to loss of funds, lost profits, protocol failure, or smart contract exploits.
                    </p>

                    <p className="font-semibold text-red-500">
                        Total liability shall not exceed $100 USD where applicable law permits limitation.
                    </p>
                </section>

                {/* 8 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">8. Prohibited Use</h2>

                    <p>You agree not to use PrimalFi for:</p>

                    <ul className="list-disc ml-6 space-y-2 text-[#617b94]">
                        <li>Illegal or sanctioned activity</li>
                        <li>Market manipulation or fraud</li>
                        <li>Exploiting or attacking smart contracts</li>
                        <li>Money laundering or terrorism financing</li>
                        <li>Unauthorized scraping or protocol abuse</li>
                    </ul>
                </section>

                {/* 9 */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-2xl font-black">9. Termination</h2>

                    <p>
                        Access to the interface may be restricted or discontinued at any time without notice,
                        especially in cases of suspected abuse, legal compliance, or security concerns.
                    </p>
                </section>

                {/* 10 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-black">10. Governing Law</h2>

                    <p>
                        These Terms shall be governed by applicable international principles for decentralized systems
                        and, where applicable, jurisdictional law depending on user location.
                    </p>

                    <p className="text-[#617b94] text-sm mt-6">
                        Contact: support@primalfi.xyz
                    </p>
                </section>

            </div>
        </div>
    );
}
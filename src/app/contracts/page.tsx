// app/page.tsx
"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import BackgroundEffects from "@/src/components/Landing/BackgroundEffects";
import ApeScanContractsViewer from "@/src/components/TermsPrivacy/CodeContracts";

export default function Home() {
    return (
        <main className="relative overflow-hidden min-h-screen text-white">
            <BackgroundEffects />
            <Header />
            <div className="relative pt-24">
                <ApeScanContractsViewer />
            </div>
            <Footer />
        </main>
    );
}
"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import BackgroundEffects from "@/src/components/Landing/BackgroundEffects";
import BrandKitSection from "@/src/components/TermsPrivacy/BrandKit";

export default function Home() {

    return (
        <main className="relative overflow-hidden min-h-screen text-white">

            {/* BACKGROUND */}
            <BackgroundEffects />

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <div className="relative pt-24">
                <BrandKitSection />
            </div>

            {/* FOOTER */}
            <Footer />
        </main>
    );
}
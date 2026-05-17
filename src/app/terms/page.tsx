"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import TermsPage from "@/src/components/TermsPrivacy/Terms";
import BackgroundEffects from "@/src/components/Landing/BackgroundEffects";

export default function LandingPage() {

    return (
        <div className="relative overflow-hidden bg-[#f6fbff] text-[#08111f]">

            <BackgroundEffects />

            {/* HEADER */}
            <Header />

            {/* FINAL CTA */}
            <section className="relative py-36 border-t border-[#dce8f2] overflow-hidden">
                <TermsPage />
            </section>

            <section>
                <Footer />
            </section>
        </div>
    );
}
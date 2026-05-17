"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import PrivacyPage from "@/src/components/TermsPrivacy/Privacy";

export default function LandingPage() {

    return (
        <div className="relative overflow-hidden bg-[#f6fbff] text-[#08111f]">

            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_30%)]" />

                <div className="absolute top-[-180px] left-[-140px] w-[520px] h-[520px] rounded-full bg-cyan-300/20 blur-[120px]" />

                <div className="absolute top-[10%] right-[-180px] w-[620px] h-[620px] rounded-full bg-sky-300/15 blur-[150px]" />

                <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] rounded-full bg-blue-200/20 blur-[180px]" />

                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            {/* HEADER */}
            <Header />

            {/* FINAL CTA */}
            <section className="relative py-36 border-t border-[#dce8f2] overflow-hidden">
                <PrivacyPage />
            </section>

            <section>
                <Footer />
            </section>
        </div>
    );
}
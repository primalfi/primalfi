"use client";

import { useEffect, useState } from "react";
import { usePrimalProtocol } from "../hooks/usePrimalProtocol";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundEffects from "../components/Landing/BackgroundEffects";
import Hero from "../components/Landing/Hero";
import WhatIsPrimal from "../components/Landing/WhatIsPrimal";
import SmartContracts from "../components/Landing/SmartContracts";
import Features from "../components/Landing/Features";
import FinalCTA from "../components/Landing/FinalCTA";

export default function LandingPage() {
  const { stats } = usePrimalProtocol();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden text-[#08111f]">
      {/* BACKGROUND */}
      <BackgroundEffects />

      {/* HEADER */}
      <Header scrolled={scrolled} />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* Hero */}
      <Hero stats={stats} />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* ABOUT */}
      <WhatIsPrimal />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* SMART CONTRACTS SYSTEM */}
      <SmartContracts />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* FEATURES */}
      <Features />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* FINAL CTA */}
      <FinalCTA />

      {/* SEPARATOR */}
      <div className="h-[30px]" />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
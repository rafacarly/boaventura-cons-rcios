import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import PorQueBoaventura from "../components/landing/PorQueBoaventura";
import ComoFunciona from "../components/landing/ComoFunciona";
import Modalidades from "../components/landing/Modalidades";
import Vantagens from "../components/landing/Vantagens";
import FormularioMultietapas from "../components/landing/FormularioMultietapas";
import Planos from "../components/landing/Planos";
import ProvaSocial from "../components/landing/ProvaSocial";
import Comparativo from "../components/landing/Comparativo";
import FAQ from "../components/landing/FAQ";
import CTAFinal from "../components/landing/CTAFinal";
import Footer from "../components/landing/Footer";
import BannerCTA from "../components/landing/BannerCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BannerCTA />
      <HeroSection />
      <PorQueBoaventura />
      <ComoFunciona />
      <Modalidades />
      <Vantagens />
      <FormularioMultietapas />
      <Planos />
      <ProvaSocial />
      <Comparativo />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
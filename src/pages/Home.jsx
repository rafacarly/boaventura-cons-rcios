import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import PorQueBoaventura from "../components/landing/PorQueBoaventura";
import ComoFunciona from "../components/landing/ComoFunciona";
import Modalidades from "../components/landing/Modalidades";
import Vantagens from "../components/landing/Vantagens";
import FormularioMultietapas from "../components/landing/FormularioMultietapas";
import PlanosDestaque from "../components/landing/PlanosDestaque";
import ProvaSocial from "../components/landing/ProvaSocial";
import Comparativo from "../components/landing/Comparativo";
import FAQ from "../components/landing/FAQ";
import CTAFinal from "../components/landing/CTAFinal";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PorQueBoaventura />
      <ComoFunciona />
      <Modalidades />
      <Vantagens />
      <FormularioMultietapas />
      <PlanosDestaque />
      <ProvaSocial />
      <Comparativo />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
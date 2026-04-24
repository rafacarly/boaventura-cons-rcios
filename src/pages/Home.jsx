import React, { useState } from "react";
import { useInjectTag } from "@/hooks/useInjectTag";
import Navbar from "../components/landing/Navbar";
import SplashScreen from "../components/SplashScreen";
import HeroSection from "../components/landing/HeroSection";
import SobrePaula from "../components/landing/SobrePaula";
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
import WhatsAppFloat from "../components/landing/WhatsAppFloat";
import BlogSection from "../components/landing/BlogSection";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  useInjectTag("google_tag_home");
  useInjectTag("meta_pixel_id");

  return (
    <div className="min-h-screen">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <Navbar />
      <WhatsAppFloat />
      <BannerCTA />
      <HeroSection />
      <SobrePaula />
      <PorQueBoaventura />
      <ComoFunciona />
      <Modalidades />
      <Vantagens />
      <FormularioMultietapas />
      <Planos />
      <ProvaSocial />
      <Comparativo />
      <BlogSection />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
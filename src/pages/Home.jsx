import React, { lazy, Suspense } from "react";
import { useInjectTag } from "@/hooks/useInjectTag";
import Navbar from "../components/landing/Navbar";
import BannerCTA from "../components/landing/BannerCTA";
import WhatsAppFloat from "../components/landing/WhatsAppFloat";

// Lazy load de seções abaixo da dobra
const HeroSection = lazy(() => import("../components/landing/HeroSection"));
const SobrePaula = lazy(() => import("../components/landing/SobrePaula"));
const PorQueBoaventura = lazy(() => import("../components/landing/PorQueBoaventura"));
const ComoFunciona = lazy(() => import("../components/landing/ComoFunciona"));
const Modalidades = lazy(() => import("../components/landing/Modalidades"));
const Vantagens = lazy(() => import("../components/landing/Vantagens"));
const FormularioMultietapas = lazy(() => import("../components/landing/FormularioMultietapas"));
const Planos = lazy(() => import("../components/landing/Planos"));
const ProvaSocial = lazy(() => import("../components/landing/ProvaSocial"));
const Comparativo = lazy(() => import("../components/landing/Comparativo"));
const FAQ = lazy(() => import("../components/landing/FAQ"));
const CTAFinal = lazy(() => import("../components/landing/CTAFinal"));
const Footer = lazy(() => import("../components/landing/Footer"));
const BlogSection = lazy(() => import("../components/landing/BlogSection"));

export default function Home() {
  useInjectTag("google_tag_home");
  useInjectTag("meta_pixel_id");

  return (
    <div className="min-h-screen">
      <Navbar />
      <WhatsAppFloat />
      <BannerCTA />
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}
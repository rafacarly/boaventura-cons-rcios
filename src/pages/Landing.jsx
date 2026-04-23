import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import FormularioMultietapas from "../components/landing/FormularioMultietapas";
import SobrePaula from "../components/landing/SobrePaula";
import Planos from "../components/landing/Planos";
import Comparativo from "../components/landing/Comparativo";
import Footer from "../components/landing/Footer";
import WhatsAppFloat from "../components/landing/WhatsAppFloat";

export default function Landing() {
  const formularioRef = useRef(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <WhatsAppFloat />

      {/* Hero com Imagem de Capa */}
      <section className="relative h-96 md:h-screen bg-brown-dark overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80"
          alt="Consórcio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/90 via-brown-dark/70 to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-brown-caramel" />
                Realize seus sonhos
              </p>
              <h1 className="text-4xl md:text-6xl font-heading text-brown-sand leading-tight mb-4">
                A forma mais inteligente de conquistar
                <span className="text-brown-caramel"> seu consórcio</span>
              </h1>
              <p className="text-lg md:text-xl font-body text-brown-sand/80 mb-8">
                Sem juros, sem surpresas. Apenas estratégia patrimonial.
              </p>
              <button
                onClick={() => formularioRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-brown-caramel hover:bg-brown-medium text-white font-heading font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Começar Agora
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulário em Destaque */}
      <section ref={formularioRef} className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading text-brown-dark mb-4">
              Descubra qual consórcio é ideal para você
            </h2>
            <p className="text-lg font-body text-brown-medium max-w-2xl mx-auto">
              Responda algumas perguntas rápidas e receba uma estratégia personalizada
            </p>
          </motion.div>
          <FormularioMultietapas />
        </div>
      </section>

      {/* Quem Somos */}
      <SobrePaula />

      {/* Planos */}
      <Planos />

      {/* Comparativo */}
      <Comparativo />

      <Footer />
    </div>
  );
}
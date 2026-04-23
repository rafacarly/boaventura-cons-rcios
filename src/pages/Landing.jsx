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

      {/* Hero com Imagem e Formulário lado a lado */}
      <section ref={formularioRef} className="min-h-screen bg-white flex items-center py-20 md:py-0">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-0 px-4 sm:px-6 lg:px-8">
          {/* Lado Esquerdo - Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-center min-h-screen"
          >
            <div className="w-full h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
                alt="Consórcio"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Lado Direito - Texto e Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center md:pl-8 lg:pl-12"
          >
            <div className="mb-8">
              <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-brown-caramel" />
                Realize seus sonhos
              </p>
              <h1 className="text-3xl md:text-4xl font-heading text-brown-dark leading-tight mb-3">
                A forma mais inteligente de conquistar
                <span className="text-brown-caramel"> seu consórcio</span>
              </h1>
              <p className="text-base md:text-lg font-body text-brown-medium">
                Sem juros, sem surpresas. Apenas estratégia patrimonial.
              </p>
            </div>

            <div className="bg-brown-sand/30 rounded-2xl p-6 md:p-8 border border-brown-caramel/15">
              <h2 className="text-xl md:text-2xl font-heading text-brown-dark mb-6">
                Descubra seu consórcio ideal
              </h2>
              <FormularioMultietapas />
            </div>
          </motion.div>
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
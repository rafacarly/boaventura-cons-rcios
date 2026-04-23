import React from "react";
import { motion } from "framer-motion";
import FormularioMultietapas from "../components/landing/FormularioMultietapas";
import SobrePaula from "../components/landing/SobrePaula";
import Planos from "../components/landing/Planos";
import Comparativo from "../components/landing/Comparativo";
import Footer from "../components/landing/Footer";
import WhatsAppFloat from "../components/landing/WhatsAppFloat";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <WhatsAppFloat />

      {/* Formulário como Hero Principal */}
      <section className="py-12 md:py-20 bg-brown-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormularioMultietapas />
        </div>
      </section>

      {/* Quem Somos */}
      <SobrePaula />

      {/* Planos em Destaque */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-brown-caramel" />
              Planos
              <span className="w-6 h-px bg-brown-caramel" />
            </p>
            <h2 className="text-3xl md:text-4xl font-heading text-brown-dark mb-4">
              Comece com parcelas que cabem no seu bolso
            </h2>
          </motion.div>
          <Planos />
        </div>
      </section>

      {/* Comparativo */}
      <Comparativo />

      <Footer />
    </div>
  );
}
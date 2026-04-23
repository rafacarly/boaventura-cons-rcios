import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5571992764466";

export default function BannerCTA() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-brown-dark">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80"
          alt="Casal realizando sonhos"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/90 via-brown-dark/60 to-brown-dark/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="text-brown-caramel font-heading font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-brown-caramel" />
              Boaventura | Consórcios
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-tight">
              a <span className="text-brown-caramel font-black">melhor escolha</span>
              <br />
              de consórcio
              <br />
              <span className="text-white/70">da Bahia</span>
            </h2>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="w-full lg:w-auto"
          >
            <div className="bg-brown-caramel rounded-3xl p-8 md:p-10 shadow-2xl shadow-brown-caramel/30 min-w-[300px] relative">
              {/* WhatsApp badge */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-4 -right-4 bg-green-500 text-white flex items-center gap-2 px-4 py-2 rounded-full font-heading font-bold text-sm shadow-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Online
              </a>

              <p className="text-white/80 font-body text-lg leading-snug mb-6">
                o <span className="font-bold text-white">primeiro passo</span> é<br />
                o mais <span className="font-bold text-white">importante</span>
              </p>

              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-3 bg-brown-dark text-white rounded-full px-8 py-4 font-heading font-bold text-lg border-2 border-white/10 hover:border-white/30 transition-all mb-6"
              >
                <span><span className="font-light">iniciar</span> simulação</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <div className="border-t border-white/20 pt-5">
                <p className="text-white font-heading font-bold text-xs uppercase tracking-widest mb-1">
                  simulação gratuita
                </p>
                <p className="text-white/70 font-body text-sm">
                  em menos de <span className="font-bold text-white">UM minuto</span> você descobre<br />
                  sua <span className="font-bold text-white">estratégia</span> personalizada
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
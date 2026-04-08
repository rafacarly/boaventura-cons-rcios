import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Home, TrendingUp, Shield, Users, Award, ArrowRight } from "lucide-react";

const TABS = [
  {
    id: "carro",
    label: "Carro",
    icon: Car,
    images: [
      "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/51c474cb1_generated_035ec33b.png",
      "https://images.unsplash.com/photo-1617469767537-b85ba699c72d?w=800&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
    ],
    headline: "Seu próximo carro com planejamento e sem juros.",
    sub: "Parcelas acessíveis e poder de compra à vista. O caminho mais inteligente para seu veículo."
  },
  {
    id: "casa",
    label: "Casa",
    icon: Home,
    images: [
      "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/366912ea4_generated_dfaacabd.png",
      "https://images.unsplash.com/photo-1512917774080-9991f1c52f1d?w=800&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
    ],
    headline: "A casa dos seus sonhos, sem juros de financiamento.",
    sub: "Planejamento inteligente para conquistar seu imóvel com parcelas que cabem no bolso."
  },
  {
    id: "investimento",
    label: "Investimento",
    icon: TrendingUp,
    images: [
      "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/b2406dd9d_generated_37d09505.png",
      "https://images.unsplash.com/photo-1579621970563-ebec5330e82f?w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f70504504?w=800&q=80"
    ],
    headline: "Multiplique seu patrimônio com estratégia.",
    sub: "Use o consórcio como ferramenta de investimento inteligente e conquiste mais."
  }
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const tab = TABS[activeTab];
  const currentImage = tab.images[imageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % tab.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tab.images.length]);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Background diagonal */}
      <div className="absolute inset-0 bg-brown-dark" />
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-accent/10 blur-3xl" 
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-brown-sand" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className="text-brown-sand">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(i);
                    setImageIndex(0);
                  }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-body font-medium transition-all border-2 whitespace-nowrap ${
                    activeTab === i
                      ? "bg-blue-accent text-white border-blue-accent"
                      : "bg-transparent text-brown-sand/70 border-brown-sand/30 hover:border-blue-accent hover:text-blue-accent"
                  }`}
                >
                  <t.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading leading-tight mb-4">
                  {tab.headline}
                </h1>
                <p className="text-base sm:text-lg text-brown-sand/70 font-body leading-relaxed mb-8 max-w-lg">
                  {tab.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToForm}
                  className="bg-blue-accent hover:bg-cyan-400 text-white rounded-full px-8 py-6 text-base font-heading font-bold gap-2 shadow-lg shadow-blue-accent/30 w-full sm:w-auto"
                >
                  Solicitar simulação
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToForm}
                  variant="outline"
                  className="border-2 border-blue-accent text-blue-accent hover:bg-blue-accent/10 rounded-full px-8 py-6 text-base font-heading font-bold w-full sm:w-auto"
                >
                  Quero entender mais
                </Button>
              </motion.div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-sm text-brown-sand/60 font-body">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-accent" />
                <span>Sem juros</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-accent" />
                <span>+2.000 clientes</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-accent" />
                <span>Atendimento consultivo</span>
              </div>
            </div>
          </div>

          {/* Right - Image Slider */}
          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab.id}-${imageIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-md lg:max-w-lg"
              >
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={currentImage}
                    alt={tab.label}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                  />
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {tab.images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === imageIndex ? "bg-blue-accent w-6" : "bg-blue-accent/40 w-2"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 sm:left-4 bg-brown-caramel text-white px-5 py-3 rounded-2xl shadow-xl"
                >
                  <p className="text-xs font-body font-semibold">Solicite agora sua</p>
                  <p className="text-sm font-heading">Carta de Crédito</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
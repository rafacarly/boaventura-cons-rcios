import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Home, TrendingUp, Shield, Users, Award, ArrowRight } from "lucide-react";

const TABS = [
  {
    id: "casa",
    label: "Casa",
    icon: Home,
    image: "/__generating__/img_2bc535c033e7.png",
    headline: "A casa dos seus sonhos, sem juros de financiamento.",
    sub: "Planejamento inteligente para conquistar seu imóvel com parcelas que cabem no bolso."
  },
  {
    id: "carro",
    label: "Carro",
    icon: Car,
    image: "/__generating__/img_c5f20bf062e2.png",
    headline: "Seu próximo carro com planejamento e sem juros.",
    sub: "Parcelas acessíveis e poder de compra à vista. O caminho mais inteligente para seu veículo."
  },
  {
    id: "investimento",
    label: "Investimento",
    icon: TrendingUp,
    image: "/__generating__/img_334873126588.png",
    headline: "Multiplique seu patrimônio com estratégia.",
    sub: "Use o consórcio como ferramenta de investimento inteligente e conquiste mais."
  }
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Background diagonal */}
      <div className="absolute inset-0 bg-brown-dark" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-brown-sand" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className="text-brown-sand">
            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                    activeTab === i
                      ? "bg-brown-caramel text-white"
                      : "bg-brown-graphite text-brown-sand/70 hover:bg-brown-medium hover:text-white"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading leading-tight mb-4">
                  {tab.headline}
                </h1>
                <p className="text-base sm:text-lg text-brown-sand/70 font-body leading-relaxed mb-8 max-w-lg">
                  {tab.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                onClick={scrollToForm}
                className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-6 text-base font-body font-semibold gap-2"
              >
                Solicitar simulação
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={scrollToForm}
                variant="outline"
                className="border-brown-sand/30 text-brown-sand hover:bg-brown-sand/10 rounded-full px-8 py-6 text-base font-body"
              >
                Quero entender mais
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-sm text-brown-sand/60 font-body">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brown-caramel" />
                <span>Sem juros</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brown-caramel" />
                <span>+2.000 clientes</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brown-caramel" />
                <span>Atendimento consultivo</span>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="w-full max-w-md lg:max-w-lg overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={tab.image}
                    alt={tab.label}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                  />
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
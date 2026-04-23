import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCounter from "@/components/landing/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Car, Home, TrendingUp, Bike, ArrowRight, Shield, Users, Award, ChevronDown } from "lucide-react";

const SLIDES = [
  {
    id: "carro",
    label: "Carros",
    icon: Car,
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/51c474cb1_generated_035ec33b.png",
    headline: "Seu carro novo,",
    highlight: "sem juros.",
    sub: "Planeje seu próximo veículo com parcelas que cabem no seu bolso e poder de compra à vista.",
  },
  {
    id: "imovel",
    label: "Imóveis",
    icon: Home,
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/366912ea4_generated_dfaacabd.png",
    headline: "Sua casa dos sonhos,",
    highlight: "sem financiamento.",
    sub: "A forma mais inteligente de conquistar o imóvel ideal com planejamento e transparência.",
  },
  {
    id: "moto",
    label: "Motos",
    icon: Bike,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    headline: "Liberdade em cada curva,",
    highlight: "sem juros.",
    sub: "Conquiste sua moto do seu jeito, com parcelas flexíveis e suporte consultivo.",
  },
  {
    id: "investimento",
    label: "Investimento",
    icon: TrendingUp,
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/b2406dd9d_generated_37d09505.png",
    headline: "Multiplique seu patrimônio",
    highlight: "com estratégia.",
    sub: "Use o consórcio como ferramenta de investimento inteligente e conquiste mais.",
  },
];

const STATS = [
  { value: "+2.000", label: "Clientes atendidos" },
  { value: "100%", label: "Sem juros" },
  { value: "15+", label: "Anos de experiência" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-brown-dark pt-16 md:pt-20">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 6 + i, delay: i * 0.5 }}
            className="absolute w-px bg-white"
            style={{ left: `${(i + 1) * 12}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Glow blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-brown-caramel blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-accent blur-3xl"
      />

      {/* Category Selector - top */}
      <div className="relative z-10 flex justify-center pt-8 pb-4">
        <div className="flex gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${
                active === i
                  ? "bg-brown-caramel text-white shadow-lg"
                  : "text-brown-sand/70 hover:text-brown-sand"
              }`}
            >
              <s.icon className="w-4 h-4" />
              <span className="hidden sm:block">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-brown-caramel font-heading font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2"
                >
                  <span className="w-8 h-px bg-brown-caramel" />
                  Boaventura | Consórcios
                </motion.p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading text-brown-sand leading-tight mb-3">
                  {slide.headline}
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading leading-tight mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-caramel to-blue-accent">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-brown-sand/70 font-body leading-relaxed mb-10 max-w-lg">
                  {slide.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={scrollToForm}
                  className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-6 text-base font-heading font-bold gap-2 shadow-xl shadow-brown-caramel/30 w-full sm:w-auto"
                >
                  Simular agora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => document.getElementById("por-que")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  className="border-2 border-brown-sand/30 text-brown-sand hover:bg-brown-sand/10 hover:border-brown-sand/60 rounded-full px-8 py-6 text-base font-heading w-full sm:w-auto"
                >
                  Saiba mais
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <p className="text-2xl font-heading font-bold text-brown-caramel">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-xs font-body text-brown-sand/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative hidden lg:flex justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 to-transparent" />
                </div>

                {/* Floating card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-2xl border border-brown-caramel/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brown-caramel flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-body text-brown-medium">Sem juros</p>
                      <p className="text-sm font-heading font-bold text-brown-dark">100% seguro</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 bg-brown-caramel rounded-2xl p-4 shadow-xl"
                >
                  <p className="text-xs font-body text-white/80">Carta de crédito</p>
                  <p className="text-lg font-heading font-bold text-white">Sob medida</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="absolute bottom-8 right-0 flex flex-col gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i ? "bg-brown-caramel h-8 w-2" : "bg-brown-sand/30 h-2 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1 text-brown-sand/30 cursor-pointer"
          onClick={scrollToForm}
        >
          <span className="text-xs font-body">Descubra mais</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80H1440V0C1440 0 1080 80 720 80C360 80 0 0 0 0V80Z" fill="hsl(30, 50%, 97%)" />
        </svg>
      </div>
    </section>
  );
}
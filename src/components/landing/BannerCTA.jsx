import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "5571992764466";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80",
    tag: "Realize seus sonhos",
    headline: "o primeiro passo para",
    highlight: "sua grande conquista",
    sub: "começa aqui.",
  },
  {
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80",
    tag: "Consórcio de Imóvel",
    headline: "a casa dos sonhos",
    highlight: "da sua família",
    sub: "sem juros, com planejamento.",
  },
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80",
    tag: "Liberdade e conquista",
    headline: "viaje com quem",
    highlight: "você ama",
    sub: "com o carro que sempre quis.",
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=80",
    tag: "Consórcio de Carro",
    headline: "família unida",
    highlight: "no carro novo",
    sub: "sem entrada, sem juros.",
  },
];

export default function BannerCTA() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const prev = () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((p) => (p + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-brown-dark" style={{ height: "560px" }}>

      {/* Background images with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/85 via-brown-dark/55 to-brown-dark/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

          {/* Left - Animated Text */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <p className="text-brown-caramel font-heading font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-brown-caramel" />
                  {slide.tag}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-tight mb-2">
                  {slide.headline}
                  <br />
                  <span className="text-brown-caramel font-black">{slide.highlight}</span>
                </h2>
                <p className="text-xl md:text-2xl font-heading text-white/60 mt-1">{slide.sub}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots + arrows */}
            <div className="flex items-center gap-4 mt-8">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${i === current ? "bg-brown-caramel w-8 h-2" : "bg-white/30 w-2 h-2"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right - CTA Card (fixed, doesn't change) */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="bg-brown-caramel rounded-3xl p-8 shadow-2xl shadow-brown-caramel/40 w-full lg:w-[320px] relative">
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
          </div>

        </div>
      </div>
    </section>
  );
}
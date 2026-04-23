import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const WHATSAPP_NUMBER = "5571992764466";

const DEFAULT_SLIDES = [
  {
    imagem_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80",
    tag: "Realize seus sonhos",
    headline: "a melhor configuração",
    highlight: "de consórcio do país",
  },
  {
    imagem_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&q=80",
    tag: "Consórcio de Carro",
    headline: "família feliz",
    highlight: "no carro novo",
  },
  {
    imagem_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    tag: "Consórcio de Imóvel",
    headline: "a casa dos sonhos",
    highlight: "da sua família",
  },
  {
    imagem_url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80",
    tag: "Qualidade de vida",
    headline: "viaje com quem",
    highlight: "você mais ama",
  },
];

export default function BannerCTA() {
  const [current, setCurrent] = useState(0);

  const { data: dbSlides = [] } = useQuery({
    queryKey: ["bannerSlides"],
    queryFn: () => base44.entities.BannerSlide.list("ordem", 100),
  });

  const slides = dbSlides.filter(s => s.ativo !== false).length > 0
    ? dbSlides.filter(s => s.ativo !== false).sort((a, b) => a.ordem - b.ordem)
    : DEFAULT_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];
  if (!slide) return null;

  const imageUrl = slide.imagem_url || slide.image;

  return (
    <section
      className="relative overflow-hidden bg-brown-dark md:h-[480px] h-[calc(100svh-64px)]"
      style={{ marginTop: "64px" }}
    >
      {/* Background images */}
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
            src={imageUrl}
            alt={slide.tag}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/5" style={{backgroundImage: "linear-gradient(to right, rgba(30,10,0,0.82), rgba(80,30,0,0.35) 50%, rgba(0,0,0,0.05))"}} />
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-8 h-2" : "bg-white/40 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 py-8 lg:py-0">

        {/* Left - Text */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p
                className="text-white/60 text-sm uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              >
                {slide.tag}
              </p>
              <h2
                className="text-white leading-tight"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                {slide.headline}
                <br />
                <span style={{ fontWeight: 900 }}>{slide.highlight}</span>
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right - CTA Card (visible on all screens) */}
        <div className="flex flex-shrink-0 w-full lg:w-auto justify-center">
          <div className="bg-[#18b0e1] rounded-2xl w-full max-w-[220px] lg:max-w-[300px] relative flex flex-col items-center justify-center p-4 lg:p-8 text-center shadow-2xl">

            {/* WhatsApp Online badge */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-4 -right-4 bg-green-500 text-white flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-xl hover:bg-green-600 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <MessageCircle className="w-4 h-4" />
              Online
            </a>

            {/* Text */}
            <p
              className="text-white text-xl leading-snug mb-6"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
            >
              o <strong style={{ fontWeight: 900 }}>primeiro</strong> passo é<br />
              o mais <strong style={{ fontWeight: 900 }}>importante</strong>
            </p>

            {/* Pulsing button */}
            <motion.button
              onClick={scrollToForm}
              animate={{
                boxShadow: [
                  "0 0 0px 0px rgba(255,255,255,0.5)",
                  "0 0 0px 12px rgba(255,255,255,0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-3 bg-[#111] text-white rounded-full px-6 py-4 mb-5 border-2 border-white/20 hover:border-white/50 transition-all"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span style={{ fontWeight: 900 }}>iniciar</span>
              <span style={{ fontWeight: 300 }}>simulação</span>
              <PlayCircle className="w-5 h-5" />
            </motion.button>

            <p
              className="text-white/60 text-xs leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              em menos de <strong className="text-white">UM minuto</strong> você monta<br />
              sua <strong className="text-white">estratégia</strong> personalizada
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const DEPOIMENTOS = [
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/91a4349bf_generated_8c21d13b.png",
    nome: "Mariana e Pedro",
    tipo: "🏠 Imóvel",
    cidade: "Salvador, BA",
    frase: "Conquistamos nosso apartamento sem precisar de entrada. O atendimento da Boaventura foi incrível — explicaram tudo com calma e clareza.",
  },
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/cb5b0e855_generated_1b0cde25.png",
    nome: "Rafael Oliveira",
    tipo: "🚗 Carro",
    cidade: "Feira de Santana, BA",
    frase: "Troquei de carro negociando à vista com a carta de crédito. Economizei muito comparado ao financiamento. Recomendo demais!",
  },
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/1ab553d88_generated_eb09548a.png",
    nome: "Luciana Mendes",
    tipo: "💰 Investimento",
    cidade: "Vitória da Conquista, BA",
    frase: "Uso consórcio como estratégia de investimento. A equipe da Boaventura me mostrou como multiplicar meu patrimônio de forma planejada.",
  },
];

export default function ProvaSocial() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p - 1 + DEPOIMENTOS.length) % DEPOIMENTOS.length);
  const next = () => setCurrent((p) => (p + 1) % DEPOIMENTOS.length);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-brown-dark hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Title on dark bg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pr-8"
          >
            <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-brown-caramel" />
              Conquistas reais
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark lg:text-brown-sand leading-tight mb-6">
              Histórias de quem já conquistou.
            </h2>
            <p className="text-brown-medium lg:text-brown-sand/60 font-body leading-relaxed mb-8">
              Mais de 2.000 famílias e profissionais realizaram seus objetivos com a Boaventura | Consórcios.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brown-caramel" fill="currentColor" />
              ))}
              <span className="text-sm font-body text-brown-medium lg:text-brown-sand/60 ml-2">5.0 avaliação média</span>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-brown-caramel/30 text-brown-caramel hover:bg-brown-caramel hover:text-white transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 rounded-full bg-brown-caramel text-white hover:bg-brown-medium transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-brown-sand rounded-3xl p-8 shadow-2xl border border-brown-caramel/10 relative"
              >
                <Quote className="w-12 h-12 text-brown-caramel/20 absolute top-6 right-6" />

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={DEPOIMENTOS[current].foto}
                    alt={DEPOIMENTOS[current].nome}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-heading text-brown-dark text-xl">{DEPOIMENTOS[current].nome}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-body font-semibold text-brown-caramel bg-brown-caramel/10 px-2 py-0.5 rounded-full">
                        {DEPOIMENTOS[current].tipo}
                      </span>
                      <MapPin className="w-3 h-3 text-brown-medium" />
                      <span className="text-xs font-body text-brown-medium">{DEPOIMENTOS[current].cidade}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-brown-caramel" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="font-body text-brown-graphite leading-relaxed text-base italic">
                  "{DEPOIMENTOS[current].frase}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {DEPOIMENTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "bg-brown-caramel w-8 h-2" : "bg-brown-caramel/30 w-2 h-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
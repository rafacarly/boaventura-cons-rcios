import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Handshake, Target, Eye, HeartHandshake, TrendingUp, Star, Car } from "lucide-react";
import AnimatedCounter from "@/components/landing/AnimatedCounter";

const ITEMS = [
  {
    icon: Handshake,
    title: "Atendimento consultivo",
    desc: "Nada de vendas forçadas. Entendemos seu momento e indicamos o melhor caminho para sua vida.",
    featured: true,
  },
  {
    icon: Target,
    title: "Estratégia patrimonial",
    desc: "Consórcio como ferramenta de planejamento, não apenas como parcela.",
  },
  {
    icon: Eye,
    title: "Transparência total",
    desc: "Sem letras miúdas. Cada etapa explicada com clareza e honestidade.",
  },
  {
    icon: HeartHandshake,
    title: "Acompanhamento humano",
    desc: "Uma pessoa real do início à conquista, cuidando de cada detalhe.",
  },
  {
    icon: TrendingUp,
    title: "Visão de futuro",
    desc: "Orientamos sobre como usar o crédito para crescer patrimonialmente.",
  },
];

const NUMBERS = [
  { value: "+2.000", label: "Clientes satisfeitos" },
  { value: "15+", label: "Anos de experiência" },
  { value: "100%", label: "Dedicação ao cliente" },
];

function CarTrackDark() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const carX = useTransform(scrollYProgress, [0, 0.7], ["0%", "85%"]);

  return (
    <div ref={ref} className="relative flex items-center w-full max-w-sm mb-4">
      <div className="flex-1 flex items-center gap-1 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="h-0.5 flex-1 bg-brown-caramel/50 rounded-full" />
        ))}
      </div>
      <motion.div style={{ left: carX }} className="absolute top-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.35, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full bg-brown-caramel flex items-center justify-center shadow-md shadow-brown-caramel/40"
        >
          <Car className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PorQueBoaventura() {
  return (
    <section id="por-que" className="py-20 md:py-32 bg-brown-sand relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brown-caramel/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-brown-caramel" />
              Por que a Boaventura
            </p>
            {/* Car Track */}
            <CarTrackDark />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark leading-tight">
              Mais do que consórcio.{" "}
              <span className="text-brown-caramel">Estratégia para sua vida.</span>
            </h2>
          </motion.div>

          {/* Numbers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 lg:justify-end"
          >
            {NUMBERS.map((n, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-brown-caramel">
                  <AnimatedCounter value={n.value} />
                </p>
                <p className="text-xs font-body text-brown-medium mt-1">{n.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative p-8 rounded-3xl transition-all duration-300 ${
                item.featured
                  ? "bg-brown-dark text-brown-sand md:row-span-2 flex flex-col justify-between shadow-2xl"
                  : "bg-white border border-brown-caramel/10 hover:border-brown-caramel/40 hover:shadow-xl"
              }`}
            >
              {item.featured && (
                <div className="absolute top-6 right-6">
                  <Star className="w-5 h-5 text-brown-caramel" fill="currentColor" />
                </div>
              )}
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                  item.featured
                    ? "bg-brown-caramel/20 group-hover:bg-brown-caramel/30"
                    : "bg-brown-caramel/10 group-hover:bg-brown-caramel/20"
                }`}>
                  <item.icon className={`w-7 h-7 ${item.featured ? "text-brown-caramel" : "text-brown-caramel"}`} />
                </div>
                <h3 className={`text-xl font-heading mb-3 ${item.featured ? "text-brown-sand" : "text-brown-dark"}`}>
                  {item.title}
                </h3>
                <p className={`font-body leading-relaxed ${item.featured ? "text-brown-sand/70" : "text-brown-medium text-sm"}`}>
                  {item.desc}
                </p>
              </div>
              {item.featured && (
                <div className="mt-8 pt-6 border-t border-brown-graphite">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brown-caramel/20 flex-shrink-0 flex items-center justify-center">
                      <span className="text-brown-caramel text-xs font-bold">★</span>
                    </div>
                    <p className="text-sm font-body text-brown-sand/60 italic leading-relaxed">
                      "A Boaventura mudou a forma como eu enxergo planejamento financeiro. Atendimento incrível."
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
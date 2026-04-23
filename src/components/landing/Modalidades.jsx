import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Car, Home, TrendingUp, Bike } from "lucide-react";

const CARDS = [
  {
    icon: Car,
    title: "Consórcio de Carro",
    sub: "Dirija o futuro, hoje.",
    desc: "Parcelas acessíveis e poder de compra à vista. Planeje seu próximo veículo sem pagar juros.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/51c474cb1_generated_035ec33b.png",
    cta: "Simular carro",
  },
  {
    icon: Home,
    title: "Consórcio de Imóvel",
    sub: "Elevando sonhos, construindo lares.",
    desc: "A forma mais inteligente de conquistar a casa própria com planejamento e transparência.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/366912ea4_generated_dfaacabd.png",
    cta: "Simular imóvel",
  },
  {
    icon: Bike,
    title: "Consórcio de Moto",
    sub: "Liberdade em cada curva.",
    desc: "Conquiste sua moto do jeito que você planejou, sem juros e com suporte especializado.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    cta: "Simular moto",
  },
  {
    icon: TrendingUp,
    title: "Consórcio de Investimento",
    sub: "Grandes sonhos, muitas possibilidades.",
    desc: "Use o consórcio como estratégia patrimonial e multiplique seu patrimônio de forma planejada.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/b2406dd9d_generated_37d09505.png",
    cta: "Simular investimento",
  },
];

function CarTrack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const carX = useTransform(scrollYProgress, [0, 0.8], ["0%", "88%"]);

  return (
    <div ref={ref} className="relative flex items-center w-full max-w-lg mx-auto mb-2">
      <div className="flex-1 flex items-center gap-1 overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="h-0.5 flex-1 bg-brown-caramel/30 rounded-full" />
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

export default function Modalidades() {
  const [hovered, setHovered] = useState(null);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="modalidades" className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Modalidades
            <span className="w-6 h-px bg-brown-caramel" />
          </p>

          <CarTrack />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark mt-4">
            A melhor escolha para{" "}
            <span className="text-brown-caramel">seu consórcio.</span>
          </h2>
          <p className="text-brown-medium font-body mt-4 max-w-xl mx-auto">
            Soluções pensadas para cada objetivo — do primeiro carro à expansão do patrimônio.
          </p>
        </motion.div>

        {/* Stacked Cards - like Embracon */}
        <div className="flex flex-col gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={scrollToForm}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ height: hovered === i ? 320 : 220 }}
            >
              {/* Background Image */}
              <motion.img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hovered === i ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/80 via-brown-dark/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Icon */}
                <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-white" />
                </div>

                <div>
                  <p className="text-xs font-body text-white/60 font-semibold uppercase tracking-widest mb-1">
                    {card.sub}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-heading text-white mb-2">
                    {card.title}
                  </h3>

                  <AnimatePresence>
                    {hovered === i && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm font-body text-white/75 mb-4 max-w-md leading-relaxed"
                      >
                        {card.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="flex items-center gap-2 text-white font-heading font-bold text-sm"
                    animate={{ gap: hovered === i ? "0.75rem" : "0.5rem" }}
                  >
                    <span>{card.cta}</span>
                    <motion.div
                      animate={{ x: hovered === i ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
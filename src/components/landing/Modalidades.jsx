import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Car, Home, TrendingUp, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

const CARDS = [
  {
    icon: Car,
    title: "Consórcio de Carro",
    sub: "Dirija o futuro, hoje.",
    desc: "Parcelas acessíveis e poder de compra à vista. Planeje seu próximo veículo sem pagar juros.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/51c474cb1_generated_035ec33b.png",
    cta: "Simular carro",
    color: "from-blue-accent/80",
  },
  {
    icon: Home,
    title: "Consórcio de Imóvel",
    sub: "Elevando sonhos, construindo lares.",
    desc: "A forma mais inteligente de conquistar a casa própria com planejamento e transparência.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/366912ea4_generated_dfaacabd.png",
    cta: "Simular imóvel",
    color: "from-brown-caramel/80",
    featured: true,
  },
  {
    icon: Bike,
    title: "Consórcio de Moto",
    sub: "Liberdade em cada curva.",
    desc: "Conquiste sua moto do jeito que você planejou, sem juros e com suporte especializado.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    cta: "Simular moto",
    color: "from-brown-graphite/80",
  },
  {
    icon: TrendingUp,
    title: "Consórcio de Investimento",
    sub: "Grandes sonhos, muitas possibilidades.",
    desc: "Use o consórcio como estratégia patrimonial e multiplique seu patrimônio de forma planejada.",
    image: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/b2406dd9d_generated_37d09505.png",
    cta: "Simular investimento",
    color: "from-brown-dark/80",
  },
];

export default function Modalidades() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="modalidades" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Modalidades
            <span className="w-6 h-px bg-brown-caramel" />
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark">
            Escolha o caminho para sua{" "}
            <span className="text-brown-caramel">próxima conquista.</span>
          </h2>
          <p className="text-brown-medium font-body mt-4 max-w-xl mx-auto">
            Soluções pensadas para cada objetivo — do primeiro carro à expansão do patrimônio.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                card.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={scrollToForm}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.color} to-transparent opacity-80`} />

                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-body text-white/70 mb-1 font-semibold uppercase tracking-wide">{card.sub}</p>
                <h3 className="text-xl font-heading text-white mb-2">{card.title}</h3>
                <p className="text-sm font-body text-white/70 mb-4 leading-relaxed hidden group-hover:block transition-all">
                  {card.desc}
                </p>
                <div className="flex items-center gap-2 text-white font-heading font-bold text-sm group-hover:gap-3 transition-all">
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={scrollToForm}
            className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-10 py-6 text-base font-heading font-bold gap-2 shadow-lg shadow-brown-caramel/20 hover:scale-105 transition-all"
          >
            Quero minha simulação gratuita
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
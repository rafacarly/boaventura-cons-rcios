import React from "react";
import { motion } from "framer-motion";
import { Handshake, Target, Eye, HeartHandshake } from "lucide-react";

const ITEMS = [
  {
    icon: Handshake,
    title: "Atendimento consultivo",
    desc: "Nada de vendas forçadas. Entendemos seu momento e indicamos o melhor caminho.",
    featured: true
  },
  {
    icon: Target,
    title: "Estratégia patrimonial",
    desc: "Consórcio como ferramenta de planejamento, não apenas como parcela."
  },
  {
    icon: Eye,
    title: "Mais clareza na escolha",
    desc: "Transparência total em cada etapa, sem letras pequenas."
  },
  {
    icon: HeartHandshake,
    title: "Acompanhamento humano",
    desc: "Uma pessoa real acompanhando sua jornada do início à conquista."
  }
];

export default function PorQueBoaventura() {
  return (
    <section className="py-16 md:py-24 bg-brown-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Por que a Boaventura
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark max-w-xl">
            Mais do que consórcio. <span className="text-brown-caramel">Estratégia para sua vida.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                item.featured
                  ? "bg-brown-dark text-brown-sand md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between"
                  : "bg-white border border-brown-caramel/10 hover:border-brown-caramel/30"
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  item.featured ? "bg-brown-caramel/20" : "bg-brown-caramel/10"
                }`}>
                  <item.icon className={`w-6 h-6 ${item.featured ? "text-brown-caramel" : "text-brown-caramel"}`} />
                </div>
                <h3 className={`text-xl font-heading mb-3 ${item.featured ? "text-brown-sand" : "text-brown-dark"}`}>
                  {item.title}
                </h3>
                <p className={`font-body leading-relaxed ${item.featured ? "text-brown-sand/70 text-base" : "text-brown-medium text-sm"}`}>
                  {item.desc}
                </p>
              </div>
              {item.featured && (
                <div className="mt-8 pt-6 border-t border-brown-graphite">
                  <p className="text-sm font-body text-brown-sand/50">
                    "A Boaventura mudou a forma como eu enxergo planejamento financeiro."
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CARDS = [
  {
    title: "Consórcio de Carro",
    desc: "Parcelas acessíveis e poder de compra à vista. Planeje seu próximo veículo sem juros.",
    image: "/__generating__/img_c5f20bf062e2.png",
    cta: "Simular carro"
  },
  {
    title: "Consórcio de Imóvel",
    desc: "A forma mais inteligente de conquistar a casa própria, com planejamento e sem juros.",
    image: "/__generating__/img_2bc535c033e7.png",
    cta: "Simular imóvel"
  },
  {
    title: "Consórcio para Investimento",
    desc: "Use o consórcio como estratégia patrimonial. Multiplique seu patrimônio de forma planejada.",
    image: "/__generating__/img_334873126588.png",
    cta: "Simular investimento"
  }
];

export default function Modalidades() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="modalidades" className="py-16 md:py-24 bg-brown-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Modalidades
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark">
            Escolha o caminho para sua <span className="text-brown-caramel">próxima conquista.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-heading text-white mb-2">{card.title}</h3>
                <p className="text-sm font-body text-white/70 mb-4 leading-relaxed">{card.desc}</p>
                <Button
                  onClick={scrollToForm}
                  className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full text-sm gap-2 px-5"
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
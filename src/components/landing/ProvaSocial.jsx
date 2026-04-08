import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DEPOIMENTOS = [
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/91a4349bf_generated_8c21d13b.png",
    nome: "Mariana e Pedro",
    tipo: "Imóvel",
    cidade: "São Paulo, SP",
    frase: "Conquistamos nosso apartamento sem precisar de entrada. O atendimento foi incrível."
  },
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/cb5b0e855_generated_1b0cde25.png",
    nome: "Rafael Oliveira",
    tipo: "Carro",
    cidade: "Campinas, SP",
    frase: "Troquei de carro negociando à vista com a carta. Economizei muito comparado ao financiamento."
  },
  {
    foto: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/1ab553d88_generated_eb09548a.png",
    nome: "Luciana Mendes",
    tipo: "Investimento",
    cidade: "Belo Horizonte, MG",
    frase: "Uso consórcio como estratégia de investimento. A Boaventura me mostrou como."
  }
];

export default function ProvaSocial() {
  return (
    <section className="py-16 md:py-24 bg-brown-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Conquistas reais
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand">
            Histórias de quem já conquistou.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {DEPOIMENTOS.map((dep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brown-dark/50 rounded-2xl overflow-hidden border border-brown-medium/20"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={dep.foto} alt={dep.nome} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-heading text-brown-sand text-lg">{dep.nome}</h4>
                    <div className="flex items-center gap-2 text-xs font-body text-brown-sand/50">
                      <span className="px-2 py-0.5 bg-brown-caramel/20 text-brown-caramel rounded-full">{dep.tipo}</span>
                      <MapPin className="w-3 h-3" />
                      <span>{dep.cidade}</span>
                    </div>
                  </div>
                </div>
                <p className="font-body text-brown-sand/70 leading-relaxed italic">
                  "{dep.frase}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
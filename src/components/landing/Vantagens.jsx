import React from "react";
import { motion } from "framer-motion";
import { Ban, Calendar, Gavel, ShoppingCart, Lock, Zap } from "lucide-react";

const ITEMS = [
  { icon: Ban, title: "Sem juros de financiamento", desc: "Você paga apenas taxa administrativa, muito menor que juros bancários." },
  { icon: Calendar, title: "Parcelamento planejado", desc: "Parcelas que cabem no seu orçamento, com prazos flexíveis." },
  { icon: Gavel, title: "Possibilidade de lance", desc: "Antecipe sua contemplação e conquiste mais rápido." },
  { icon: ShoppingCart, title: "Poder de negociação à vista", desc: "Com a carta em mãos, você negocia como pagamento à vista." },
  { icon: Lock, title: "Segurança", desc: "Consórcios regulados pelo Banco Central com total transparência." },
  { icon: Zap, title: "Flexibilidade de uso", desc: "Use seu crédito como quiser: carro, imóvel, reforma ou investimento." }
];

export default function Vantagens() {
  return (
    <section id="vantagens" className="py-16 md:py-24 bg-brown-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-brown-sand" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Vantagens
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand max-w-lg">
            Por que o consórcio é a escolha <span className="text-brown-caramel">mais inteligente?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-2xl border border-brown-graphite hover:border-brown-caramel/40 transition-all duration-300 group ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-brown-caramel/10 flex items-center justify-center mb-4 group-hover:bg-brown-caramel/20 transition-colors">
                <item.icon className="w-5 h-5 text-brown-caramel" />
              </div>
              <h3 className="text-lg font-heading text-brown-sand mb-2">{item.title}</h3>
              <p className="text-sm font-body text-brown-sand/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
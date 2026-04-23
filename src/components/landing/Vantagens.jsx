import React from "react";
import { motion } from "framer-motion";
import { Ban, Calendar, Gavel, ShoppingCart, Lock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS = [
  { icon: Ban, title: "Sem juros", desc: "Você paga apenas taxa administrativa, muito menor que qualquer financiamento.", big: true },
  { icon: Calendar, title: "Parcelamento planejado", desc: "Parcelas que cabem no orçamento, com prazos flexíveis." },
  { icon: Gavel, title: "Lance para contemplação", desc: "Antecipe sua conquista com um lance e realize mais rápido." },
  { icon: ShoppingCart, title: "Poder de compra à vista", desc: "Com a carta em mãos, você negocia como pagamento à vista." },
  { icon: Lock, title: "100% seguro", desc: "Regulado pelo Banco Central do Brasil com total transparência." },
  { icon: Zap, title: "Crédito flexível", desc: "Use como quiser: carro, imóvel, moto, reforma ou investimento." },
];

export default function Vantagens() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="vantagens" className="py-20 md:py-32 bg-brown-sand relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-brown-caramel" />
              Vantagens
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark leading-tight">
              Por que o consórcio é a escolha{" "}
              <span className="text-brown-caramel">mais inteligente?</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brown-medium font-body leading-relaxed mb-6">
              Enquanto o financiamento cobra juros altíssimos, o consórcio é a estratégia que protege seu bolso e ainda valoriza seu crédito.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-5 font-heading font-bold gap-2 hover:scale-105 transition-all shadow-lg shadow-brown-caramel/20"
            >
              Quero saber mais
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group bg-white rounded-3xl p-8 border border-brown-caramel/10 hover:border-brown-caramel/30 transition-all duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-14 h-14 rounded-2xl bg-brown-caramel/10 group-hover:bg-brown-caramel/20 flex items-center justify-center mb-6 transition-all"
              >
                <item.icon className="w-7 h-7 text-brown-caramel" />
              </motion.div>
              <h3 className="text-xl font-heading text-brown-dark mb-3">{item.title}</h3>
              <p className="text-sm font-body text-brown-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
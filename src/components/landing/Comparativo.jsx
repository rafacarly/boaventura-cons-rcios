import React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROWS = [
  { label: "Juros", consorcio: "Sem juros", financiamento: "Juros altos" },
  { label: "Entrada", consorcio: "Sem entrada obrigatória", financiamento: "Exige entrada" },
  { label: "Planejamento", consorcio: "Parcelas previsíveis", financiamento: "Variação de juros" },
  { label: "Poder de compra", consorcio: "Negocia à vista", financiamento: "Preço financiado" },
  { label: "Custo total", consorcio: "Muito menor", financiamento: "Pode dobrar o valor" },
  { label: "Estratégia", consorcio: "Pode usar como investimento", financiamento: "Apenas aquisição" },
];

export default function Comparativo() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32 bg-brown-dark relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H1440V80C1440 80 1080 0 720 0C360 0 0 80 0 80V0Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Comparativo
            <span className="w-6 h-px bg-brown-caramel" />
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand mb-4">
            Consórcio <span className="text-brown-caramel">×</span> Financiamento
          </h2>
          <p className="text-brown-sand/50 font-body max-w-lg mx-auto">
            Veja por que cada vez mais brasileiros estão migrando do financiamento para o consórcio.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header Row */}
          <div className="grid grid-cols-3">
            <div className="p-5 bg-brown-graphite" />
            <div className="p-5 bg-brown-caramel text-center">
              <p className="text-white font-heading text-lg font-bold">✓ Consórcio</p>
              <p className="text-white/70 text-xs font-body mt-1">Boaventura | Consórcios</p>
            </div>
            <div className="p-5 bg-brown-graphite/80 text-center">
              <p className="text-brown-sand/60 font-heading text-lg">Financiamento</p>
              <p className="text-brown-sand/30 text-xs font-body mt-1">Banco tradicional</p>
            </div>
          </div>

          {/* Data Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`grid grid-cols-3 border-b border-brown-graphite/50 ${i % 2 === 0 ? "bg-brown-graphite/30" : "bg-brown-graphite/10"}`}
            >
              <div className="p-4 sm:p-5 font-body font-bold text-brown-sand text-sm flex items-center">
                {row.label}
              </div>
              <div className="p-4 sm:p-5 text-center bg-brown-caramel/10 border-x border-brown-caramel/20">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brown-caramel flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm text-brown-sand font-medium">{row.consorcio}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brown-graphite flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-brown-sand/30" />
                  </div>
                  <span className="font-body text-sm text-brown-sand/40">{row.financiamento}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={scrollToForm}
            className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-10 py-6 text-base font-heading font-bold gap-2 shadow-lg hover:scale-105 transition-all"
          >
            Quero consórcio, sem juros
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80H1440V0C1440 0 1080 80 720 80C360 80 0 0 0 0V80Z" fill="hsl(30, 50%, 97%)" />
        </svg>
      </div>
    </section>
  );
}
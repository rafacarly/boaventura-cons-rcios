import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS = [
  { label: "Juros", consorcio: "Sem juros", financiamento: "Juros altos" },
  { label: "Entrada", consorcio: "Sem entrada obrigatória", financiamento: "Exige entrada" },
  { label: "Planejamento", consorcio: "Parcelas previsíveis", financiamento: "Variação de juros" },
  { label: "Poder de compra", consorcio: "Negocia à vista", financiamento: "Preço financiado" },
  { label: "Custo total", consorcio: "Muito menor", financiamento: "Pode dobrar o valor" },
  { label: "Estratégia", consorcio: "Pode usar como investimento", financiamento: "Apenas aquisição" }
];

export default function Comparativo() {
  return (
    <section className="py-16 md:py-24 bg-brown-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Comparativo
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-brown-dark">
            Consórcio <span className="text-brown-caramel">×</span> Financiamento
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-center">
            <div className="p-4 bg-brown-dark/5" />
            <div className="p-4 bg-brown-caramel text-white font-heading text-lg">Consórcio</div>
            <div className="p-4 bg-brown-dark/5 text-brown-medium font-heading text-lg">Financiamento</div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-brown-sand"}`}>
              <div className="p-4 sm:p-5 font-body font-semibold text-brown-dark text-sm flex items-center">
                {row.label}
              </div>
              <div className="p-4 sm:p-5 text-center bg-brown-caramel/5 border-x border-brown-caramel/10">
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-brown-caramel flex-shrink-0" />
                  <span className="font-body text-sm text-brown-dark font-medium">{row.consorcio}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-brown-medium/40 flex-shrink-0" />
                  <span className="font-body text-sm text-brown-medium">{row.financiamento}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
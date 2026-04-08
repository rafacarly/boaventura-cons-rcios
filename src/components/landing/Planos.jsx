import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const PLANS = [
  {
    title: "Carro Popular",
    credito: "R$ 50.000",
    prazo: "60 meses",
    parcela: "a partir de R$ 650/mês",
    featured: false
  },
  {
    title: "Imóvel Residencial",
    credito: "R$ 250.000",
    prazo: "200 meses",
    parcela: "a partir de R$ 1.600/mês",
    featured: true
  },
  {
    title: "Investimento Premium",
    credito: "R$ 500.000",
    prazo: "180 meses",
    parcela: "a partir de R$ 3.200/mês",
    featured: false
  }
];

export default function Planos() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="planos" className="py-16 md:py-24 bg-brown-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Planos em destaque
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-dark">
            Comece com parcelas que cabem no seu bolso.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.featured
                  ? "bg-brown-dark text-brown-sand shadow-2xl scale-[1.02] relative"
                  : "bg-white border border-brown-caramel/15 hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brown-caramel text-white text-xs font-body font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Mais procurado
                </div>
              )}
              <h3 className={`text-lg font-heading mb-6 ${plan.featured ? "text-brown-sand" : "text-brown-dark"}`}>
                {plan.title}
              </h3>
              <div className="mb-6">
                <p className={`text-sm font-body mb-1 ${plan.featured ? "text-brown-sand/60" : "text-brown-medium"}`}>Crédito de</p>
                <p className={`text-3xl font-heading ${plan.featured ? "text-brown-caramel" : "text-brown-dark"}`}>{plan.credito}</p>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm font-body">
                  <span className={plan.featured ? "text-brown-sand/60" : "text-brown-medium"}>Prazo</span>
                  <span className={`font-medium ${plan.featured ? "text-brown-sand" : "text-brown-dark"}`}>{plan.prazo}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className={plan.featured ? "text-brown-sand/60" : "text-brown-medium"}>Parcela</span>
                  <span className={`font-medium ${plan.featured ? "text-brown-sand" : "text-brown-dark"}`}>{plan.parcela}</span>
                </div>
              </div>
              <Button
                onClick={scrollToForm}
                className={`w-full rounded-full py-5 font-body font-semibold gap-2 ${
                  plan.featured
                    ? "bg-brown-caramel hover:bg-brown-medium text-white"
                    : "bg-brown-dark hover:bg-brown-graphite text-white"
                }`}
              >
                Simular agora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-sm font-body text-brown-medium">
            Quer atendimento personalizado?{" "}
            <button onClick={scrollToForm} className="text-brown-caramel font-semibold underline underline-offset-4 hover:text-brown-dark transition-colors">
              Fale com nosso time
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
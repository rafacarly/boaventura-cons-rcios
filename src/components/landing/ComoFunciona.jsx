import React from "react";
import { motion } from "framer-motion";
import { Crosshair, Search, Trophy } from "lucide-react";

const STEPS = [
  {
    icon: Crosshair,
    num: "01",
    title: "Defina seu objetivo",
    desc: "Carro, casa ou investimento? Qual o valor e prazo que funcionam pra você?"
  },
  {
    icon: Search,
    num: "02",
    title: "A Boaventura encontra o plano ideal",
    desc: "Nosso time analisa as melhores opções e apresenta o plano sob medida."
  },
  {
    icon: Trophy,
    num: "03",
    title: "Acompanhe sua conquista",
    desc: "Com transparência e suporte humano, você acompanha cada passo até a contemplação."
  }
];

export default function ComoFunciona() {
  return (
    <section className="py-16 md:py-24 bg-brown-graphite relative overflow-hidden">
      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-brown-sand" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand">
            Simples, transparente e sob medida.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-px bg-brown-caramel/30" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-brown-caramel mb-6">
                  <step.icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brown-dark text-brown-caramel text-xs font-body font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-heading text-brown-sand mb-3">{step.title}</h3>
                <p className="text-sm font-body text-brown-sand/60 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
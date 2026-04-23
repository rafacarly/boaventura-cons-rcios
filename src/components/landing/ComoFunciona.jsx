import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, FileSearch, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: MessageCircle,
    num: "01",
    title: "Fale com a Boaventura",
    desc: "Conte seu objetivo. Nossa equipe ouve com atenção e entende seu momento de vida.",
    color: "bg-blue-accent",
  },
  {
    icon: FileSearch,
    num: "02",
    title: "Receba o plano ideal",
    desc: "Analisamos as melhores opções e apresentamos o plano sob medida para você — sem pressão.",
    color: "bg-brown-caramel",
  },
  {
    icon: Trophy,
    num: "03",
    title: "Conquiste seu objetivo",
    desc: "Com transparência e suporte humano, você acompanha cada passo até a contemplação.",
    color: "bg-brown-graphite",
  },
];

export default function ComoFunciona() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-brown-dark relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H1440V80C1440 80 1080 0 720 0C360 0 0 80 0 80V0Z" fill="hsl(30, 50%, 97%)" />
        </svg>
      </div>

      {/* Animated dots */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(249,130,39,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Como funciona
            <span className="w-6 h-px bg-brown-caramel" />
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand mb-4">
            Simples, transparente e sob medida.
          </h2>
          <p className="text-brown-sand/50 font-body max-w-lg mx-auto">
            Três passos para você conquistar seu objetivo com a Boaventura ao seu lado.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-blue-accent via-brown-caramel to-brown-graphite opacity-30" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.18, duration: 0.7, ease: "easeOut" }}
                className="text-center group"
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.color} mb-8 shadow-lg`}
                >
                  <step.icon className="w-9 h-9 text-white" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brown-sand text-brown-dark text-xs font-heading font-bold flex items-center justify-center shadow-md">
                    {step.num}
                  </span>
                </motion.div>

                <h3 className="text-xl font-heading text-brown-sand mb-4">{step.title}</h3>
                <p className="text-sm font-body text-brown-sand/50 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            onClick={scrollToForm}
            className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-10 py-6 text-base font-heading font-bold gap-2 shadow-lg hover:scale-105 transition-all"
          >
            Começar agora
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
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5571992764466";

export default function CTAFinal() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32 bg-brown-sand relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-0 right-0 w-96 h-96 bg-brown-caramel/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10, delay: 2 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-blue-accent/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Comece hoje
            <span className="w-6 h-px bg-brown-caramel" />
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading text-brown-dark leading-tight mb-6">
            A próxima conquista começa{" "}
            <span className="text-brown-caramel">com uma conversa.</span>
          </h2>
          <p className="text-base md:text-xl font-body text-brown-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Fale com a equipe da Boaventura e descubra qual plano combina com seu objetivo e seu momento de vida. Sem pressão, sem compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-10 py-7 text-lg font-heading font-bold gap-3 shadow-2xl shadow-brown-caramel/30 w-full sm:w-auto">
                  <MessageCircle className="w-6 h-6" />
                  Falar no WhatsApp
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToForm}
                variant="outline"
                className="border-2 border-brown-caramel text-brown-caramel hover:bg-brown-caramel/5 rounded-full px-10 py-7 text-lg font-heading font-bold gap-3 w-full sm:w-auto"
              >
                Solicitar simulação
                <ArrowRight className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>

          {/* Trust tags */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            {["✓ Sem compromisso", "✓ 100% gratuito", "✓ Resposta rápida", "✓ Sem juros"].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-body text-brown-medium bg-white/70 px-4 py-2 rounded-full border border-brown-caramel/20 shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
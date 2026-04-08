import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "5571992764466";

export default function CTAFinal() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-brown-caramel relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brown-dark rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white leading-tight mb-4">
            A próxima conquista pode começar com uma conversa clara.
          </h2>
          <p className="text-base md:text-lg font-body text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Fale com a equipe da Boaventura e descubra qual plano combina com seu objetivo e seu momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-brown-dark hover:bg-blue-accent/10 rounded-full px-8 py-6 text-base font-body font-semibold gap-2 w-full sm:w-auto border-2 border-blue-accent">
                <Phone className="w-5 h-5" />
                Falar no WhatsApp
              </Button>
            </a>
            <Button
              onClick={scrollToForm}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-body w-full sm:w-auto gap-2"
            >
              Solicitar simulação
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "O que é consórcio?",
    a: "Consórcio é uma modalidade de compra planejada onde um grupo de pessoas contribui mensalmente para formar um fundo comum. Periodicamente, um participante é contemplado e recebe a carta de crédito para adquirir o bem desejado."
  },
  {
    q: "Como funciona a contemplação?",
    a: "A contemplação pode acontecer por sorteio ou lance. No sorteio, todos os participantes adimplentes concorrem igualmente. No lance, você pode ofertar um valor para antecipar sua contemplação."
  },
  {
    q: "Posso dar lance?",
    a: "Sim! Você pode ofertar lances para antecipar sua contemplação. Existem diferentes tipos de lance: livre, fixo e embutido. Nossa equipe explica qual é o melhor para o seu caso."
  },
  {
    q: "Preciso de entrada?",
    a: "Não! Uma das grandes vantagens do consórcio é não exigir entrada. Você começa a pagar as parcelas mensais e já está participando dos sorteios e concorrendo à contemplação."
  },
  {
    q: "Posso usar para imóvel ou investimento?",
    a: "Sim! O consórcio pode ser utilizado para compra de imóveis residenciais, comerciais, terrenos, e também como estratégia de investimento patrimonial."
  },
  {
    q: "É seguro?",
    a: "Sim! Os consórcios são regulamentados e fiscalizados pelo Banco Central do Brasil. Trabalhamos apenas com administradoras autorizadas e de reconhecida solidez no mercado."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-brown-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Perguntas frequentes
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-brown-sand">
            Tire suas dúvidas
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="bg-brown-graphite border border-brown-medium/20 rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-brown-sand font-heading text-lg py-5 hover:text-brown-caramel hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brown-sand/60 font-body leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
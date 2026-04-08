import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PlanosDestaque() {
  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["planos"],
    queryFn: () => base44.entities.PlanoPreco.list("-created_date", 100),
  });

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-brown-sand">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brown-medium font-body">Carregando planos...</p>
        </div>
      </section>
    );
  }

  if (planos.length === 0) {
    return null;
  }

  const displayedPlanos = planos.slice(0, 3);

  return (
    <section id="planos-destaque" className="py-20 md:py-28 bg-brown-sand relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-20 right-10 w-40 h-40 rounded-full bg-brown-caramel/8 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10, delay: 1 }}
        className="absolute bottom-32 left-10 w-32 h-32 rounded-full bg-blue-accent/8 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-heading font-bold text-brown-caramel tracking-widest uppercase mb-3"
          >
            ✨ Planos em Destaque
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-heading text-brown-dark mb-4 leading-tight">
            Comece com parcelas que cabem no seu bolso.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {displayedPlanos.map((plano, idx) => {
            const isFeatured = idx === 1;

            return (
              <motion.div
                key={plano.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden transition-all ${
                  isFeatured
                    ? "md:scale-105 bg-brown-dark text-brown-sand shadow-2xl shadow-brown-caramel/30"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                {isFeatured && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                  >
                    <span className="bg-brown-caramel text-white px-4 py-1 rounded-full text-xs font-heading font-bold">
                      ⭐ Mais procurado
                    </span>
                  </motion.div>
                )}

                <div className="p-8 md:p-10">
                  <p className={`text-xs font-heading font-bold tracking-widest uppercase mb-4 ${isFeatured ? "text-brown-caramel" : "text-brown-caramel"}`}>
                    {plano.tipo === "carro" ? "🚗 Carro" : plano.tipo === "imovel" ? "🏠 Imóvel" : "💰 Investimento"}
                  </p>

                  <h3 className={`text-2xl md:text-3xl font-heading mb-6 ${isFeatured ? "text-brown-sand" : "text-brown-dark"}`}>
                    {plano.titulo}
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div>
                      <p className={`text-xs font-body uppercase tracking-wide mb-2 ${isFeatured ? "text-brown-sand/70" : "text-brown-medium"}`}>
                        Crédito de
                      </p>
                      <p className={`text-3xl md:text-4xl font-heading ${isFeatured ? "text-brown-caramel" : "text-brown-dark"}`}>
                        {plano.credito}
                      </p>
                    </div>

                    <div className={`flex gap-6 ${isFeatured ? "border-t border-brown-graphite pt-6" : "border-t border-brown-caramel/10 pt-6"}`}>
                      <div>
                        <p className={`text-xs font-body uppercase tracking-wide mb-1 ${isFeatured ? "text-brown-sand/70" : "text-brown-medium"}`}>
                          Prazo
                        </p>
                        <p className={`font-heading ${isFeatured ? "text-brown-sand" : "text-brown-dark"}`}>
                          {plano.prazo}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs font-body uppercase tracking-wide mb-1 ${isFeatured ? "text-brown-sand/70" : "text-brown-medium"}`}>
                          Parcela
                        </p>
                        <p className={`font-heading ${isFeatured ? "text-brown-sand" : "text-brown-dark"}`}>
                          {plano.parcela}
                        </p>
                      </div>
                    </div>

                    {plano.valor_reducao && (
                      <div className={`text-sm font-body ${isFeatured ? "text-brown-caramel" : "text-brown-caramel"}`}>
                        <strong>Redução:</strong> {plano.valor_reducao}
                      </div>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={scrollToForm}
                      className={`w-full rounded-full py-3 font-heading font-bold gap-2 ${
                        isFeatured
                          ? "bg-brown-caramel hover:bg-orange-500 text-white"
                          : "bg-brown-dark hover:bg-brown-graphite text-brown-sand"
                      }`}
                    >
                      Simular agora
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-brown-medium font-body">
            Quer atendimento personalizado?{" "}
            <a href="#formulario" className="text-brown-caramel font-semibold hover:underline">
              Fale com nosso time
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
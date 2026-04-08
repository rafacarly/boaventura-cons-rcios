import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TabelaPrecos() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["planos"],
    queryFn: () => base44.entities.PlanoPreco.list(),
  });

  const carroPlanos = planos.filter(p => p.tipo === "carro");
  const imovelPlanos = planos.filter(p => p.tipo === "imovel");
  const investimentoPlanos = planos.filter(p => p.tipo === "investimento");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brown-sand">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-caramel"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-sand">
      {/* Header */}
      <div className="bg-brown-dark text-brown-sand py-16 text-center">
        <Link to="/" className="inline-block mb-4">
          <Button variant="ghost" className="text-brown-sand/70 hover:text-brown-sand rounded-lg">
            ← Voltar
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading mb-4">Tabela de Preços</h1>
        <p className="text-brown-sand/70 font-body">Confira todos os nossos planos disponíveis</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* CARRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading text-brown-dark mb-6">🚗 Consórcio para Carro</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carroPlanos.length > 0 ? (
              carroPlanos.map((plano, idx) => (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  {plano.foto_url && (
                    <img src={plano.foto_url} alt={plano.titulo} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-brown-dark mb-4">{plano.titulo}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Crédito:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.credito}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Prazo:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.prazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Parcela:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.parcela}</span>
                      </div>
                    </div>
                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-brown-caramel hover:bg-brown-medium text-white rounded-lg gap-2"
                    >
                      Simular <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-brown-medium font-body">Nenhum plano disponível no momento.</p>
            )}
          </div>
        </motion.div>

        {/* IMÓVEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading text-brown-dark mb-6">🏠 Consórcio para Imóvel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imovelPlanos.length > 0 ? (
              imovelPlanos.map((plano, idx) => (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  {plano.foto_url && (
                    <img src={plano.foto_url} alt={plano.titulo} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-brown-dark mb-4">{plano.titulo}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Crédito:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.credito}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Prazo:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.prazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Parcela:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.parcela}</span>
                      </div>
                    </div>
                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-brown-caramel hover:bg-brown-medium text-white rounded-lg gap-2"
                    >
                      Simular <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-brown-medium font-body">Nenhum plano disponível no momento.</p>
            )}
          </div>
        </motion.div>

        {/* INVESTIMENTO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading text-brown-dark mb-6">💰 Consórcio para Investimento</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investimentoPlanos.length > 0 ? (
              investimentoPlanos.map((plano, idx) => (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  {plano.foto_url && (
                    <img src={plano.foto_url} alt={plano.titulo} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-brown-dark mb-4">{plano.titulo}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Crédito:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.credito}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Prazo:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.prazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-brown-medium">Parcela:</span>
                        <span className="font-heading text-brown-dark font-bold">{plano.parcela}</span>
                      </div>
                    </div>
                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-brown-caramel hover:bg-brown-medium text-white rounded-lg gap-2"
                    >
                      Simular <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-brown-medium font-body">Nenhum plano disponível no momento.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
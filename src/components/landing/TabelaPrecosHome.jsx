import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TabelaPrecosHome() {
  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["planos-home"],
    queryFn: () => base44.entities.PlanoPreco.list(),
  });

  const carroPlanos = planos.filter(p => p.tipo === "carro");
  const imovelPlanos = planos.filter(p => p.tipo === "imovel");

  if (isLoading) return null;
  if (carroPlanos.length === 0 && imovelPlanos.length === 0) return null;

  const parseValue = (val) => {
    if (!val) return 0;
    const num = parseFloat(String(val).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-brown-sand to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-brown-dark mb-4">
            Nossos Planos de Preço
          </h2>
          <p className="text-brown-medium font-body text-lg">
            Confira as melhores opções para cada tipo de consórcio
          </p>
        </motion.div>

        {/* CARRO */}
        {carroPlanos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-heading text-brown-dark mb-4">🚗 Consórcio para Carro</h3>
            <div className="bg-white rounded-2xl border-2 border-blue-accent/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-accent/10 border-b border-blue-accent/20">
                      <th className="px-6 py-4 text-left font-heading text-brown-dark text-sm">Plano</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Crédito</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Parcela Original</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Redução</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Parcela Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carroPlanos.map((plano) => {
                      const parcela = parseValue(plano.parcela);
                      const reducao = plano.valor_reducao ? parseValue(plano.valor_reducao) : 0;
                      const original = parcela + reducao;

                      return (
                        <tr key={plano.id} className="border-b border-blue-accent/10 hover:bg-blue-accent/5">
                          <td className="px-6 py-4">
                            <div className="font-body font-medium text-brown-dark">{plano.titulo}</div>
                            <div className="text-xs text-brown-medium">{plano.prazo} meses</div>
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm font-bold text-brown-dark">
                            {plano.credito}
                          </td>
                          <td className="px-6 py-4 text-right font-body text-sm text-brown-medium">
                            {formatCurrency(original)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {reducao > 0 ? (
                              <span className="text-sm font-heading text-red-600 font-bold">-{formatCurrency(reducao)}</span>
                            ) : (
                              <span className="text-sm text-brown-medium">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm text-blue-accent font-bold">
                            {formatCurrency(parcela)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* IMÓVEL */}
        {imovelPlanos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-heading text-brown-dark mb-4">🏠 Consórcio para Imóvel</h3>
            <div className="bg-white rounded-2xl border-2 border-purple-400/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-400/10 border-b border-purple-400/20">
                      <th className="px-6 py-4 text-left font-heading text-brown-dark text-sm">Plano</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Crédito</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Parcela Original</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Redução</th>
                      <th className="px-6 py-4 text-right font-heading text-brown-dark text-sm">Parcela Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imovelPlanos.map((plano) => {
                      const parcela = parseValue(plano.parcela);
                      const reducao = plano.valor_reducao ? parseValue(plano.valor_reducao) : 0;
                      const original = parcela + reducao;

                      return (
                        <tr key={plano.id} className="border-b border-purple-400/10 hover:bg-purple-400/5">
                          <td className="px-6 py-4">
                            <div className="font-body font-medium text-brown-dark">{plano.titulo}</div>
                            <div className="text-xs text-brown-medium">{plano.prazo} meses</div>
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm font-bold text-brown-dark">
                            {plano.credito}
                          </td>
                          <td className="px-6 py-4 text-right font-body text-sm text-brown-medium">
                            {formatCurrency(original)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {reducao > 0 ? (
                              <span className="text-sm font-heading text-red-600 font-bold">-{formatCurrency(reducao)}</span>
                            ) : (
                              <span className="text-sm text-brown-medium">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm text-purple-600 font-bold">
                            {formatCurrency(parcela)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/tabela-precos">
            <Button className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-6 font-heading gap-2">
              Ver Tabela Completa
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
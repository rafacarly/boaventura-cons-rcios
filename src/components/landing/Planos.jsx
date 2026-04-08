import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Edit2, Trash2, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

export default function Planos() {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: planos = [], isLoading, refetch } = useQuery({
    queryKey: ["planos"],
    queryFn: () => base44.entities.PlanoPreco.list(),
  });

  React.useEffect(() => {
    base44.auth.me().then((user) => {
      setIsAdmin(user?.role === "admin");
    }).catch(() => {
      setIsAdmin(false);
    });
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEdit = (plano) => {
    setEditingId(plano.id);
    setEditData({ ...plano });
  };

  const handleSave = async () => {
    await base44.entities.PlanoPreco.update(editingId, editData);
    setEditingId(null);
    refetch();
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que quer deletar este plano?")) {
      await base44.entities.PlanoPreco.delete(id);
      refetch();
    }
  };

  const handleCreate = async () => {
    if (!newPlan.titulo || !newPlan.credito || !newPlan.prazo || !newPlan.parcela) {
      alert("Preencha os campos obrigatórios");
      return;
    }
    await base44.entities.PlanoPreco.create(newPlan);
    setNewPlan({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" });
    setShowForm(false);
    refetch();
  };

  const displayPlanos = planos.length > 0 ? planos : [];
  const maxPlanos = Math.min(3, displayPlanos.length);

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

        {isLoading ? (
          <div className="text-center text-brown-medium">Carregando planos...</div>
        ) : displayPlanos.length === 0 ? (
          <div className="text-center text-brown-medium">Nenhum plano cadastrado.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {displayPlanos.slice(0, maxPlanos).map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 transition-all duration-300 relative ${
                  i === 1
                    ? "bg-brown-dark text-brown-sand shadow-2xl scale-[1.02]"
                    : "bg-white border border-brown-caramel/15 hover:shadow-lg"
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brown-caramel text-white text-xs font-body font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Mais procurado
                  </div>
                )}

                {isAdmin && editingId === plan.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editData.titulo}
                      onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                      className="text-sm"
                      placeholder="Título"
                    />
                    <Input
                      value={editData.credito}
                      onChange={(e) => setEditData({ ...editData, credito: e.target.value })}
                      className="text-sm"
                      placeholder="Crédito"
                    />
                    <Input
                      value={editData.prazo}
                      onChange={(e) => setEditData({ ...editData, prazo: e.target.value })}
                      className="text-sm"
                      placeholder="Prazo"
                    />
                    <Input
                      value={editData.parcela}
                      onChange={(e) => setEditData({ ...editData, parcela: e.target.value })}
                      className="text-sm"
                      placeholder="Parcela"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="bg-green-600 text-white flex-1">
                        Salvar
                      </Button>
                      <Button onClick={() => setEditingId(null)} size="sm" variant="outline" className="flex-1">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className={`text-lg font-heading mb-6 ${i === 1 ? "text-brown-sand" : "text-brown-dark"}`}>
                      {plan.titulo}
                    </h3>
                    <div className="mb-6">
                      <p className={`text-sm font-body mb-1 ${i === 1 ? "text-brown-sand/60" : "text-brown-medium"}`}>
                        Crédito de
                      </p>
                      <p className={`text-3xl font-heading ${i === 1 ? "text-brown-caramel" : "text-brown-dark"}`}>
                        {plan.credito}
                      </p>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm font-body">
                        <span className={i === 1 ? "text-brown-sand/60" : "text-brown-medium"}>Prazo</span>
                        <span className={`font-medium ${i === 1 ? "text-brown-sand" : "text-brown-dark"}`}>
                          {plan.prazo}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-body">
                        <span className={i === 1 ? "text-brown-sand/60" : "text-brown-medium"}>Parcela</span>
                        <span className={`font-medium ${i === 1 ? "text-brown-sand" : "text-brown-dark"}`}>
                          {plan.parcela}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={scrollToForm}
                      className={`w-full rounded-full py-5 font-body font-semibold gap-2 ${
                        i === 1
                          ? "bg-brown-caramel hover:bg-brown-medium text-white"
                          : "bg-brown-dark hover:bg-brown-graphite text-white"
                      }`}
                    >
                      Simular agora
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    {isAdmin && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          onClick={() => handleEdit(plan)}
                          size="sm"
                          variant="ghost"
                          className={`flex-1 ${i === 1 ? "text-brown-sand" : "text-blue-accent"}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(plan.id)}
                          size="sm"
                          variant="ghost"
                          className={`flex-1 ${i === 1 ? "text-brown-sand" : "text-red-600"}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-6 gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Plano
            </Button>

            {showForm && (
              <div className="mt-6 bg-white rounded-xl border border-brown-caramel/10 p-6 max-w-md mx-auto">
                <Input
                  value={newPlan.titulo}
                  onChange={(e) => setNewPlan({ ...newPlan, titulo: e.target.value })}
                  placeholder="Título"
                  className="mb-3"
                />
                <select
                  value={newPlan.tipo}
                  onChange={(e) => setNewPlan({ ...newPlan, tipo: e.target.value })}
                  className="w-full border border-brown-caramel/20 rounded-md px-3 py-2 mb-3 font-body text-sm"
                >
                  <option value="carro">Carro</option>
                  <option value="imovel">Imóvel</option>
                  <option value="investimento">Investimento</option>
                </select>
                <Input
                  value={newPlan.credito}
                  onChange={(e) => setNewPlan({ ...newPlan, credito: e.target.value })}
                  placeholder="Crédito"
                  className="mb-3"
                />
                <Input
                  value={newPlan.prazo}
                  onChange={(e) => setNewPlan({ ...newPlan, prazo: e.target.value })}
                  placeholder="Prazo"
                  className="mb-3"
                />
                <Input
                  value={newPlan.parcela}
                  onChange={(e) => setNewPlan({ ...newPlan, parcela: e.target.value })}
                  placeholder="Parcela"
                  className="mb-3"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreate}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Criar
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-sm font-body text-brown-medium">
            Quer atendimento personalizado?{" "}
            <button
              onClick={scrollToForm}
              className="text-brown-caramel font-semibold underline underline-offset-4 hover:text-brown-dark transition-colors"
            >
              Fale com nosso time
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
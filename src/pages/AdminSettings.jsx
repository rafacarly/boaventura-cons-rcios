import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowLeft, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const [editingPlano, setEditingPlano] = useState(null);
  const [editingDepoimento, setEditingDepoimento] = useState(null);
  const [newPlano, setNewPlano] = useState({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" });
  const [newDepoimento, setNewDepoimento] = useState({ nome: "", tipo_aquisicao: "carro", localizacao: "", texto: "", foto_url: "" });

  const { data: planos = [] } = useQuery({
    queryKey: ["planos"],
    queryFn: () => base44.entities.PlanoPreco.list(),
  });

  const { data: depoimentos = [] } = useQuery({
    queryKey: ["depoimentos"],
    queryFn: () => base44.entities.Depoimento.list(),
  });

  const createPlanoMutation = useMutation({
    mutationFn: (data) => base44.entities.PlanoPreco.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planos"] });
      setNewPlano({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" });
    },
  });

  const updatePlanoMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.PlanoPreco.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planos"] });
      setEditingPlano(null);
    },
  });

  const deletePlanoMutation = useMutation({
    mutationFn: (id) => base44.entities.PlanoPreco.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planos"] }),
  });

  const createDepoimentoMutation = useMutation({
    mutationFn: (data) => base44.entities.Depoimento.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depoimentos"] });
      setNewDepoimento({ nome: "", tipo_aquisicao: "carro", localizacao: "", texto: "", foto_url: "" });
    },
  });

  const deleteDepoimentoMutation = useMutation({
    mutationFn: (id) => base44.entities.Depoimento.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["depoimentos"] }),
  });

  const handleAddPlano = () => {
    if (newPlano.titulo && newPlano.credito && newPlano.prazo && newPlano.parcela) {
      createPlanoMutation.mutate(newPlano);
    }
  };

  const handleUpdatePlano = () => {
    if (editingPlano) {
      updatePlanoMutation.mutate({ id: editingPlano.id, data: editingPlano });
    }
  };

  const handleAddDepoimento = () => {
    if (newDepoimento.nome && newDepoimento.texto) {
      createDepoimentoMutation.mutate(newDepoimento);
    }
  };

  return (
    <div className="min-h-screen bg-brown-sand">
      {/* Header */}
      <div className="bg-brown-dark py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin">
              <Button variant="ghost" className="text-brown-sand/70 hover:text-brown-sand hover:bg-brown-graphite gap-2 rounded-lg">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-heading text-brown-sand">Configurações</h1>
              <p className="text-xs font-body text-brown-sand/50">Boaventura | Consórcios</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="tabela" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white rounded-lg border border-brown-caramel/10">
            <TabsTrigger value="tabela" className="font-body">Tabela de Preços</TabsTrigger>
            <TabsTrigger value="planos" className="font-body">Gerenciar Planos</TabsTrigger>
            <TabsTrigger value="depoimentos" className="font-body">Depoimentos</TabsTrigger>
          </TabsList>

          {/* TABELA DE PREÇOS */}
          <TabsContent value="tabela" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brown-dark/5 border-b border-brown-caramel/10">
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Plano</th>
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Tipo</th>
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Crédito</th>
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Prazo</th>
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Parcela</th>
                      <th className="px-4 py-3 text-left font-heading text-brown-dark">Redução</th>
                      <th className="px-4 py-3 text-center font-heading text-brown-dark">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planos.map((plano) => (
                      <tr key={plano.id} className="border-b border-brown-caramel/10 hover:bg-brown-sand/50">
                        <td className="px-4 py-3 font-body text-brown-dark">{plano.titulo}</td>
                        <td className="px-4 py-3 font-body text-brown-medium text-xs">
                          <span className="bg-brown-caramel/20 text-brown-caramel px-2 py-1 rounded">
                            {plano.tipo === "carro" ? "🚗 Carro" : plano.tipo === "imovel" ? "🏠 Imóvel" : "💰 Investimento"}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-brown-dark">{plano.credito}</td>
                        <td className="px-4 py-3 font-body text-brown-dark">{plano.prazo}</td>
                        <td className="px-4 py-3 font-body text-brown-dark">{plano.parcela}</td>
                        <td className="px-4 py-3 font-body text-brown-dark">{plano.valor_reducao || "—"}</td>
                        <td className="px-4 py-3 text-center flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingPlano(plano)}
                            className="text-blue-accent hover:bg-blue-accent/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePlanoMutation.mutate(plano.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* PLANOS */}
          <TabsContent value="planos" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 p-6">
              <h2 className="text-lg font-heading text-brown-dark mb-4">Adicionar Novo Plano</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título"
                  value={newPlano.titulo}
                  onChange={(e) => setNewPlano({ ...newPlano, titulo: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <select
                  value={newPlano.tipo}
                  onChange={(e) => setNewPlano({ ...newPlano, tipo: e.target.value })}
                  className="border border-brown-caramel/20 rounded-md px-3 py-2 font-body text-sm"
                >
                  <option value="carro">Carro</option>
                  <option value="imovel">Imóvel</option>
                  <option value="investimento">Investimento</option>
                </select>
                <Input
                  placeholder="Crédito (ex: R$ 50.000)"
                  value={newPlano.credito}
                  onChange={(e) => setNewPlano({ ...newPlano, credito: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <Input
                  placeholder="Prazo (ex: 60 meses)"
                  value={newPlano.prazo}
                  onChange={(e) => setNewPlano({ ...newPlano, prazo: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <Input
                  placeholder="Parcela (ex: a partir de R$ 650/mês)"
                  value={newPlano.parcela}
                  onChange={(e) => setNewPlano({ ...newPlano, parcela: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <Input
                  placeholder="Redução na parcela (opcional)"
                  value={newPlano.valor_reducao}
                  onChange={(e) => setNewPlano({ ...newPlano, valor_reducao: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <Input
                  placeholder="URL da foto"
                  value={newPlano.foto_url}
                  onChange={(e) => setNewPlano({ ...newPlano, foto_url: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
              </div>
              <Button
                onClick={handleAddPlano}
                className="mt-4 bg-brown-caramel hover:bg-brown-medium text-white gap-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Adicionar Plano
              </Button>
            </div>

            {editingPlano && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h2 className="text-lg font-heading text-brown-dark mb-4">Editando: {editingPlano.titulo}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Título"
                    value={editingPlano.titulo}
                    onChange={(e) => setEditingPlano({ ...editingPlano, titulo: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Crédito"
                    value={editingPlano.credito}
                    onChange={(e) => setEditingPlano({ ...editingPlano, credito: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Prazo"
                    value={editingPlano.prazo}
                    onChange={(e) => setEditingPlano({ ...editingPlano, prazo: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Parcela"
                    value={editingPlano.parcela}
                    onChange={(e) => setEditingPlano({ ...editingPlano, parcela: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Redução na parcela"
                    value={editingPlano.valor_reducao || ""}
                    onChange={(e) => setEditingPlano({ ...editingPlano, valor_reducao: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="URL da foto"
                    value={editingPlano.foto_url}
                    onChange={(e) => setEditingPlano({ ...editingPlano, foto_url: e.target.value })}
                    className="border-blue-accent/20 font-body col-span-2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleUpdatePlano}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingPlano(null)}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {planos.map((plano) => (
                <div key={plano.id} className="bg-white rounded-lg border border-brown-caramel/10 p-4 flex justify-between items-center">
                  <div>
                    <p className="font-heading text-brown-dark">{plano.titulo}</p>
                    <p className="text-sm font-body text-brown-medium">{plano.credito} • {plano.prazo}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingPlano(plano)}
                      className="text-blue-accent hover:bg-blue-accent/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deletePlanoMutation.mutate(plano.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* DEPOIMENTOS */}
          <TabsContent value="depoimentos" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 p-6">
              <h2 className="text-lg font-heading text-brown-dark mb-4">Adicionar Novo Depoimento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nome"
                  value={newDepoimento.nome}
                  onChange={(e) => setNewDepoimento({ ...newDepoimento, nome: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <select
                  value={newDepoimento.tipo_aquisicao}
                  onChange={(e) => setNewDepoimento({ ...newDepoimento, tipo_aquisicao: e.target.value })}
                  className="border border-brown-caramel/20 rounded-md px-3 py-2 font-body text-sm"
                >
                  <option value="carro">Carro</option>
                  <option value="imovel">Imóvel</option>
                </select>
                <Input
                  placeholder="Localização"
                  value={newDepoimento.localizacao}
                  onChange={(e) => setNewDepoimento({ ...newDepoimento, localizacao: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <Input
                  placeholder="URL da foto"
                  value={newDepoimento.foto_url}
                  onChange={(e) => setNewDepoimento({ ...newDepoimento, foto_url: e.target.value })}
                  className="border-brown-caramel/20 font-body"
                />
                <textarea
                  placeholder="Texto do depoimento"
                  value={newDepoimento.texto}
                  onChange={(e) => setNewDepoimento({ ...newDepoimento, texto: e.target.value })}
                  className="border border-brown-caramel/20 rounded-md px-3 py-2 font-body text-sm col-span-2"
                  rows="3"
                />
              </div>
              <Button
                onClick={handleAddDepoimento}
                className="mt-4 bg-brown-caramel hover:bg-brown-medium text-white gap-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Adicionar Depoimento
              </Button>
            </div>

            <div className="space-y-3">
              {depoimentos.map((depoimento) => (
                <div key={depoimento.id} className="bg-white rounded-lg border border-brown-caramel/10 p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-heading text-brown-dark">{depoimento.nome}</p>
                    <p className="text-sm font-body text-brown-medium">{depoimento.localizacao} • {depoimento.tipo_aquisicao}</p>
                    <p className="text-sm font-body text-brown-dark mt-2">{depoimento.texto}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteDepoimentoMutation.mutate(depoimento.id)}
                    className="text-red-600 hover:bg-red-50 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
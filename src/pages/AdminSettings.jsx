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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-heading text-brown-dark">Tabela de Preços</h3>
              <button
                onClick={() => {
                  const tabsButton = document.querySelector('[value="planos"]');
                  tabsButton?.click();
                }}
                className="bg-brown-caramel hover:bg-brown-medium text-white px-4 py-2 rounded-lg font-body font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar Novo Plano
              </button>
            </div>
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
            {/* Lista de Planos Criados */}
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10 flex justify-between items-center">
                <h3 className="text-lg font-heading text-brown-dark">Planos Cadastrados</h3>
                <Button
                  onClick={() => {
                    setNewPlano({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" });
                    setEditingPlano(null);
                    document.getElementById("form-criar-plano")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-brown-caramel hover:bg-brown-medium text-white gap-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Novo Plano
                </Button>
              </div>

              {planos.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">
                  Nenhum plano criado ainda. Clique em "Novo Plano" para começar.
                </div>
              ) : (
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
                          <td className="px-4 py-3 font-body font-medium text-brown-dark">{plano.titulo}</td>
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
              )}
            </div>

            {/* Formulário: Editar ou Criar */}
            {editingPlano || newPlano.titulo || newPlano.credito ? (
              <div className="bg-white rounded-xl border border-brown-caramel/10 p-6" id="form-criar-plano">
                <h3 className="text-lg font-heading text-brown-dark mb-4">
                  {editingPlano ? `✏️ Editando: ${editingPlano.titulo}` : "✨ Criar Novo Plano"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Título"
                    value={editingPlano ? editingPlano.titulo : newPlano.titulo}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, titulo: e.target.value })
                        : setNewPlano({ ...newPlano, titulo: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body"
                  />
                  <select
                    value={editingPlano ? editingPlano.tipo : newPlano.tipo}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, tipo: e.target.value })
                        : setNewPlano({ ...newPlano, tipo: e.target.value })
                    }
                    className="border border-brown-caramel/20 rounded-md px-3 py-2 font-body text-sm"
                  >
                    <option value="carro">🚗 Carro</option>
                    <option value="imovel">🏠 Imóvel</option>
                    <option value="investimento">💰 Investimento</option>
                  </select>
                  <Input
                    placeholder="Crédito (ex: R$ 50.000)"
                    value={editingPlano ? editingPlano.credito : newPlano.credito}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, credito: e.target.value })
                        : setNewPlano({ ...newPlano, credito: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body"
                  />
                  <Input
                    placeholder="Prazo (ex: 60 meses)"
                    value={editingPlano ? editingPlano.prazo : newPlano.prazo}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, prazo: e.target.value })
                        : setNewPlano({ ...newPlano, prazo: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body"
                  />
                  <Input
                    placeholder="Parcela (ex: R$ 650/mês)"
                    value={editingPlano ? editingPlano.parcela : newPlano.parcela}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, parcela: e.target.value })
                        : setNewPlano({ ...newPlano, parcela: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body"
                  />
                  <Input
                    placeholder="Redução na parcela (opcional)"
                    value={editingPlano ? editingPlano.valor_reducao || "" : newPlano.valor_reducao}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, valor_reducao: e.target.value })
                        : setNewPlano({ ...newPlano, valor_reducao: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body"
                  />
                  <Input
                    placeholder="URL da foto"
                    value={editingPlano ? editingPlano.foto_url : newPlano.foto_url}
                    onChange={(e) =>
                      editingPlano
                        ? setEditingPlano({ ...editingPlano, foto_url: e.target.value })
                        : setNewPlano({ ...newPlano, foto_url: e.target.value })
                    }
                    className="border-brown-caramel/20 font-body md:col-span-2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  {editingPlano ? (
                    <>
                      <Button
                        onClick={handleUpdatePlano}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        💾 Salvar Edição
                      </Button>
                      <Button
                        onClick={() => setEditingPlano(null)}
                        variant="outline"
                        className="rounded-lg"
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleAddPlano}
                        className="bg-brown-caramel hover:bg-brown-medium text-white rounded-lg gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Criar Plano
                      </Button>
                      <Button
                        onClick={() => setNewPlano({ titulo: "", tipo: "carro", credito: "", prazo: "", parcela: "", valor_reducao: "", foto_url: "" })}
                        variant="outline"
                        className="rounded-lg"
                      >
                        Limpar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
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
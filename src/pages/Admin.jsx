import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageCircle, Filter, ArrowLeft, Users, Clock, CheckCircle, XCircle, LogOut, Edit2, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LeadDetailDialog from "../components/admin/LeadDetailDialog";
import { isAdminAuthenticated, logoutAdmin } from "@/lib/adminAuth";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "novo", label: "Novo" },
  { value: "em_atendimento", label: "Em atendimento" },
  { value: "fechado", label: "Fechado" },
  { value: "perdido", label: "Perdido" }
];

const OBJETIVO_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "carro", label: "Carro" },
  { value: "imovel", label: "Imóvel" },
  { value: "investimento", label: "Investimento" },
  { value: "moto", label: "Moto" }
];

const COMPLETUDE_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "completo", label: "Completo" },
  { value: "incompleto", label: "Incompleto" }
];

const STATUS_COLORS = {
  novo: "bg-blue-accent/20 text-blue-accent",
  em_atendimento: "bg-brown-caramel/20 text-brown-caramel",
  fechado: "bg-green-100 text-green-700",
  perdido: "bg-red-100 text-red-600"
};

const COMPLETUDE_COLORS = {
  completo: "bg-green-100 text-green-700",
  incompleto: "bg-red-100 text-red-600"
};

const OBJETIVO_LABELS = { carro: "Carro", imovel: "Imóvel", investimento: "Investimento", moto: "Moto" };
const STATUS_LABELS = { novo: "Novo", em_atendimento: "Em atendimento", fechado: "Fechado", perdido: "Perdido" };
const COMPLETUDE_LABELS = { completo: "Completo", incompleto: "Incompleto" };

function cleanPhone(phone) {
  return phone?.replace(/\D/g, "") || "";
}

export default function Admin() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [objetivoFilter, setObjetivoFilter] = useState("all");
  const [completudeFilter, setCompletudeFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingPlano, setEditingPlano] = useState(null);
  const [editingDepoimento, setEditingDepoimento] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date", 500),
  });

  const { data: planos = [] } = useQuery({
    queryKey: ["planos"],
    queryFn: () => base44.entities.PlanoPreco.list("-created_date", 100),
  });

  const { data: depoimentos = [] } = useQuery({
    queryKey: ["depoimentos"],
    queryFn: () => base44.entities.Depoimento.list("-created_date", 100),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
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

  const updateDepoimentoMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Depoimento.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depoimentos"] });
      setEditingDepoimento(null);
    },
  });

  const deleteDepoimentoMutation = useMutation({
    mutationFn: (id) => base44.entities.Depoimento.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["depoimentos"] }),
  });

  const filtered = leads.filter((lead) => {
    const matchSearch = !search || 
      lead.nome?.toLowerCase().includes(search.toLowerCase()) ||
      lead.whatsapp?.includes(search);
    const matchStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchObjetivo = objetivoFilter === "all" || lead.objetivo === objetivoFilter;
    const matchCompletuде = completudeFilter === "all" || lead.completude === completudeFilter;
    return matchSearch && matchStatus && matchObjetivo && matchCompletuде;
  });

  const stats = {
    total: leads.length,
    novos: leads.filter(l => l.status === "novo").length,
    atendimento: leads.filter(l => l.status === "em_atendimento").length,
    fechados: leads.filter(l => l.status === "fechado").length,
  };

  return (
    <div className="min-h-screen bg-brown-sand">
      {/* Header */}
      <div className="bg-brown-dark py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="text-brown-sand/70 hover:text-brown-sand hover:bg-brown-graphite gap-2 rounded-lg">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao site
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-heading text-brown-sand">Painel de Leads</h1>
              <p className="text-xs font-body text-brown-sand/50">Boaventura | Consórcios</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                logoutAdmin();
                navigate("/admin-login");
              }}
              className="text-brown-sand/70 hover:text-brown-sand hover:bg-brown-graphite gap-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-white border border-brown-caramel/10">
            <TabsTrigger value="leads">📋 Leads</TabsTrigger>
            <TabsTrigger value="planos">💰 Planos em Destaque</TabsTrigger>
            <TabsTrigger value="depoimentos">⭐ Depoimentos</TabsTrigger>
          </TabsList>

          {/* ABA LEADS */}
          <TabsContent value="leads" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Total" value={stats.total} color="bg-brown-dark" />
              <StatCard icon={Clock} label="Novos" value={stats.novos} color="bg-blue-accent" />
              <StatCard icon={MessageCircle} label="Em atendimento" value={stats.atendimento} color="bg-brown-caramel" />
              <StatCard icon={CheckCircle} label="Fechados" value={stats.fechados} color="bg-green-600" />
            </div>

                {/* Filters */}
            <div className="bg-white rounded-xl border border-brown-caramel/10 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-medium" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nome ou telefone..."
                    className="pl-10 h-10 rounded-lg border-brown-caramel/20 font-body"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-44 h-10 rounded-lg border-brown-caramel/20 font-body">
                    <Filter className="w-4 h-4 mr-2 text-brown-medium" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={objetivoFilter} onValueChange={setObjetivoFilter}>
                  <SelectTrigger className="w-full sm:w-44 h-10 rounded-lg border-brown-caramel/20 font-body">
                    <Filter className="w-4 h-4 mr-2 text-brown-medium" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OBJETIVO_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={completudeFilter} onValueChange={setCompletudeFilter}>
                  <SelectTrigger className="w-full sm:w-44 h-10 rounded-lg border-brown-caramel/20 font-body">
                    <Filter className="w-4 h-4 mr-2 text-brown-medium" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPLETUDE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center text-brown-medium font-body">Carregando leads...</div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center text-brown-medium font-body">Nenhum lead encontrado.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-brown-dark/5">
                        <TableHead className="font-body font-semibold text-brown-dark">Nome</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">WhatsApp</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">Objetivo</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">Status</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">Completude</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">Data</TableHead>
                        <TableHead className="font-body font-semibold text-brown-dark">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((lead) => (
                        <TableRow
                          key={lead.id}
                          className="cursor-pointer hover:bg-brown-sand/50 transition-colors"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <TableCell className="font-body font-medium text-brown-dark">{lead.nome}</TableCell>
                          <TableCell>
                            <a
                              href={`https://wa.me/55${cleanPhone(lead.whatsapp)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-accent hover:underline font-body text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {lead.whatsapp}
                            </a>
                          </TableCell>
                          <TableCell className="font-body text-sm text-brown-medium">
                            {OBJETIVO_LABELS[lead.objetivo] || "—"}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={lead.status || "novo"}
                              onValueChange={(value) => {
                                updateMutation.mutate({ id: lead.id, data: { status: value } });
                              }}
                            >
                              <SelectTrigger
                                className="w-36 h-8 rounded-full border-0 text-xs font-body font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Badge className={`${STATUS_COLORS[lead.status || "novo"]} text-xs`}>
                                  {STATUS_LABELS[lead.status || "novo"]}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="novo">Novo</SelectItem>
                                <SelectItem value="em_atendimento">Em atendimento</SelectItem>
                                <SelectItem value="fechado">Fechado</SelectItem>
                                <SelectItem value="perdido">Perdido</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${COMPLETUDE_COLORS[lead.completude || "incompleto"]} text-xs`}>
                              {COMPLETUDE_LABELS[lead.completude || "incompleto"]}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-body text-sm text-brown-medium">
                            {lead.created_date ? new Date(lead.created_date).toLocaleDateString("pt-BR") : "—"}
                          </TableCell>
                          <TableCell>
                            <a
                              href={`https://wa.me/55${cleanPhone(lead.whatsapp)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 gap-1 rounded-lg">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ABA PLANOS */}
          <TabsContent value="planos" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10">
                <h3 className="text-lg font-heading text-brown-dark">Planos em Destaque (Exibidos na Home)</h3>
                <p className="text-sm font-body text-brown-medium mt-1">Edite os valores que aparecem na seção "Comece com parcelas que cabem no seu bolso"</p>
              </div>

              {planos.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhum plano criado.</div>
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
                        <th className="px-4 py-3 text-center font-heading text-brown-dark">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planos.map((plano) => (
                        <tr key={plano.id} className="border-b border-brown-caramel/10 hover:bg-brown-sand/50">
                          <td className="px-4 py-3 font-body font-medium text-brown-dark">{plano.titulo}</td>
                          <td className="px-4 py-3 font-body text-brown-medium text-xs">
                            <span className="bg-brown-caramel/20 text-brown-caramel px-2 py-1 rounded">
                              {plano.tipo === "carro" ? "🚗" : plano.tipo === "imovel" ? "🏠" : "💰"}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-body text-brown-dark">{plano.credito}</td>
                          <td className="px-4 py-3 font-body text-brown-dark">{plano.prazo}</td>
                          <td className="px-4 py-3 font-body text-brown-dark">{plano.parcela}</td>
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

            {editingPlano && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">✏️ Editando: {editingPlano.titulo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="border-blue-accent/20 font-body md:col-span-2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => updatePlanoMutation.mutate({ id: editingPlano.id, data: editingPlano })}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
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
          </TabsContent>
        </Tabs>
      </div>

          {/* ABA DEPOIMENTOS */}
          <TabsContent value="depoimentos" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10">
                <h3 className="text-lg font-heading text-brown-dark">Depoimentos (Exibidos na Home)</h3>
                <p className="text-sm font-body text-brown-medium mt-1">Edite as histórias que aparecem na seção "Histórias de quem já conquistou"</p>
              </div>

              {depoimentos.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhum depoimento criado.</div>
              ) : (
                <div className="space-y-4 p-6">
                  {depoimentos.map((dep) => (
                    <div key={dep.id} className="border border-brown-caramel/15 rounded-lg p-4 hover:bg-brown-sand/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-heading text-brown-dark font-semibold">{dep.nome}</h4>
                          <p className="text-xs font-body text-brown-medium">{dep.localizacao} • {dep.tipo_aquisicao === "carro" ? "🚗" : "🏠"} {dep.tipo_aquisicao}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingDepoimento(dep)}
                            className="text-blue-accent hover:bg-blue-accent/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteDepoimentoMutation.mutate(dep.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm font-body text-brown-medium italic">"{dep.texto}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {editingDepoimento && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">✏️ Editando: {editingDepoimento.nome}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome"
                    value={editingDepoimento.nome}
                    onChange={(e) => setEditingDepoimento({ ...editingDepoimento, nome: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Localização (cidade)"
                    value={editingDepoimento.localizacao}
                    onChange={(e) => setEditingDepoimento({ ...editingDepoimento, localizacao: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Select
                    value={editingDepoimento.tipo_aquisicao}
                    onValueChange={(value) => setEditingDepoimento({ ...editingDepoimento, tipo_aquisicao: value })}
                  >
                    <SelectTrigger className="border-blue-accent/20 font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carro">🚗 Carro</SelectItem>
                      <SelectItem value="imovel">🏠 Imóvel</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="URL da foto"
                    value={editingDepoimento.foto_url || ""}
                    onChange={(e) => setEditingDepoimento({ ...editingDepoimento, foto_url: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <textarea
                    placeholder="Texto do depoimento"
                    value={editingDepoimento.texto}
                    onChange={(e) => setEditingDepoimento({ ...editingDepoimento, texto: e.target.value })}
                    className="border border-blue-accent/20 rounded-md p-3 font-body text-sm md:col-span-2"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => updateDepoimentoMutation.mutate({ id: editingDepoimento.id, data: editingDepoimento })}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingDepoimento(null)}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-brown-caramel/10">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-heading text-brown-dark">{value}</p>
          <p className="text-xs font-body text-brown-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}
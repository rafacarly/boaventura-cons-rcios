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
import { Search, MessageCircle, Filter, ArrowLeft, Users, Clock, CheckCircle, XCircle, LogOut, Edit2, Trash2, Image as ImageIcon, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LeadDetailDialog from "../components/admin/LeadDetailDialog";
import { isAdminAuthenticated, getAdminRole, logoutAdmin } from "@/lib/adminAuth";

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
  const role = getAdminRole(); // "ceo" or "user"
  const isCeo = role === "ceo";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [objetivoFilter, setObjetivoFilter] = useState("all");
  const [completudeFilter, setCompletudeFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingPlano, setEditingPlano] = useState(null);
  const [editingDepoimento, setEditingDepoimento] = useState(null);
  const [editingHeroImage, setEditingHeroImage] = useState(null);
  const [editingConfig, setEditingConfig] = useState(null);
  const [editingCarrossel, setEditingCarrossel] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [editingSobrePaula, setEditingSobrePaula] = useState(null);
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

  const { data: heroImages = [] } = useQuery({
    queryKey: ["heroImages"],
    queryFn: () => base44.entities.HeroImage.list("-ordem", 100),
  });

  const { data: configs = [] } = useQuery({
    queryKey: ["configs"],
    queryFn: () => base44.entities.ConfiguracaoSite.list("-created_date", 100),
  });

  const { data: imagensCarrossel = [] } = useQuery({
    queryKey: ["imagensCarrossel"],
    queryFn: () => base44.entities.ImagemCarrossel.list("ordem", 100),
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

  const updateHeroImageMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.HeroImage.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroImages"] });
      setEditingHeroImage(null);
    },
  });

  const deleteHeroImageMutation = useMutation({
    mutationFn: (id) => base44.entities.HeroImage.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["heroImages"] }),
  });

  const updateConfigMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ConfiguracaoSite.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      setEditingConfig(null);
    },
  });

  const deleteConfigMutation = useMutation({
    mutationFn: (id) => base44.entities.ConfiguracaoSite.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["configs"] }),
  });

  const createConfigMutation = useMutation({
    mutationFn: (data) => base44.entities.ConfiguracaoSite.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["configs"] }),
  });

  const updateCarrosselMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ImagemCarrossel.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imagensCarrossel"] });
      setEditingCarrossel(null);
    },
  });

  const deleteCarrosselMutation = useMutation({
    mutationFn: (id) => base44.entities.ImagemCarrossel.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["imagensCarrossel"] }),
  });

  const createCarrosselMutation = useMutation({
    mutationFn: (data) => base44.entities.ImagemCarrossel.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imagensCarrossel"] });
      setEditingCarrossel(null);
    },
  });

  const { data: bannerSlides = [] } = useQuery({
    queryKey: ["bannerSlides"],
    queryFn: () => base44.entities.BannerSlide.list("ordem", 100),
  });

  const { data: sobrePaulaData = [] } = useQuery({
    queryKey: ["sobrePaula"],
    queryFn: () => base44.entities.SobrePaula.list("-created_date", 1),
  });

  const updateBannerMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.BannerSlide.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerSlides"] });
      setEditingBanner(null);
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: (id) => base44.entities.BannerSlide.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bannerSlides"] }),
  });

  const createBannerMutation = useMutation({
    mutationFn: (data) => base44.entities.BannerSlide.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerSlides"] });
      setEditingBanner(null);
    },
  });

  const updateSobrePaulaMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SobrePaula.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sobrePaula"] });
      setEditingSobrePaula(null);
    },
  });

  const createSobrePaulaMutation = useMutation({
    mutationFn: (data) => base44.entities.SobrePaula.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sobrePaula"] });
      setEditingSobrePaula(null);
    },
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
              <p className="text-xs font-body text-brown-sand/50">
                Boaventura | Consórcios &nbsp;•&nbsp;
                <span className={isCeo ? "text-brown-caramel font-bold" : "text-blue-accent font-bold"}>
                  {isCeo ? "👑 CEO" : "👤 Paula"}
                </span>
              </p>
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
          <TabsList className="bg-white border border-brown-caramel/10 flex-wrap">
            <TabsTrigger value="leads">📋 Leads</TabsTrigger>
            {isCeo && <TabsTrigger value="sobre-paula">👤 Sobre Paula</TabsTrigger>}
            {isCeo && <TabsTrigger value="banner">🖼️ Banner da Capa</TabsTrigger>}
            {isCeo && <TabsTrigger value="planos">💰 Planos em Destaque</TabsTrigger>}
            {isCeo && <TabsTrigger value="depoimentos">⭐ Depoimentos</TabsTrigger>}
            {isCeo && <TabsTrigger value="hero-images">🖼️ Imagens do Hero</TabsTrigger>}
            {isCeo && <TabsTrigger value="carrossel">🎠 Carrossel Formulário</TabsTrigger>}
            {isCeo && <TabsTrigger value="configs">⚙️ Configurações</TabsTrigger>}
            {isCeo && <TabsTrigger value="senha">🔑 Alterar Senhas</TabsTrigger>}
          </TabsList>

          {/* ABA SOBRE PAULA */}
          <TabsContent value="sobre-paula" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10">
                <h3 className="text-lg font-heading text-brown-dark">Sobre Paula</h3>
                <p className="text-sm font-body text-brown-medium mt-1">Edite as informações e foto de Paula que aparecem na seção de apresentação</p>
              </div>

              {sobrePaulaData.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhuma informação criada.</div>
              ) : (
                sobrePaulaData.map((item) => (
                  <div key={item.id} className="p-6 border-b border-brown-caramel/10 last:border-b-0">
                    <div className="flex gap-4 mb-4">
                      <img src={item.foto_url} alt={item.nome} className="w-24 h-24 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-heading text-brown-dark font-semibold">{item.nome}</h4>
                        <p className="text-sm font-body text-brown-medium mt-2">{item.texto}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingSobrePaula(item)}
                      className="text-blue-accent hover:bg-blue-accent/10"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                ))
              )}

              {sobrePaulaData.length === 0 && (
                <div className="p-6 border-t border-brown-caramel/10">
                  <Button
                    onClick={() => setEditingSobrePaula({ nome: "", texto: "", foto_url: "" })}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Criar
                  </Button>
                </div>
              )}
            </div>

            {editingSobrePaula && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">
                  {editingSobrePaula.id ? "✏️ Editando" : "➕ Criar apresentação"}
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Nome"
                    value={editingSobrePaula.nome}
                    onChange={(e) => setEditingSobrePaula({ ...editingSobrePaula, nome: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <textarea
                    placeholder="Texto de apresentação"
                    value={editingSobrePaula.texto}
                    onChange={(e) => setEditingSobrePaula({ ...editingSobrePaula, texto: e.target.value })}
                    className="border border-blue-accent/20 rounded-md p-3 font-body text-sm w-full"
                    rows="3"
                  />
                  <Input
                    placeholder="URL da foto"
                    value={editingSobrePaula.foto_url}
                    onChange={(e) => setEditingSobrePaula({ ...editingSobrePaula, foto_url: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  {editingSobrePaula.foto_url && (
                    <img src={editingSobrePaula.foto_url} alt="preview" className="w-32 h-32 rounded-lg object-cover" />
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => {
                      if (editingSobrePaula.id) {
                        updateSobrePaulaMutation.mutate({ id: editingSobrePaula.id, data: editingSobrePaula });
                      } else {
                        createSobrePaulaMutation.mutate(editingSobrePaula);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button onClick={() => setEditingSobrePaula(null)} variant="outline" className="rounded-lg">
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

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

          {/* ABA BANNER DA CAPA */}
          <TabsContent value="banner" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-heading text-brown-dark">Banner da Capa</h3>
                  <p className="text-sm font-body text-brown-medium mt-1">Edite os slides do banner principal do site</p>
                </div>
                <Button
                  onClick={() => setEditingBanner({ ordem: bannerSlides.length + 1, tag: "", headline: "", highlight: "", imagem_url: "", ativo: true })}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Slide
                </Button>
              </div>

              {bannerSlides.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhum slide criado. Os slides padrão estão sendo usados.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {bannerSlides.sort((a, b) => a.ordem - b.ordem).map((slide) => (
                    <div key={slide.id} className="border border-brown-caramel/15 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-brown-sand/30 overflow-hidden relative">
                        <img src={slide.imagem_url} alt={slide.tag} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-4">
                          <p className="text-white/60 text-xs uppercase tracking-widest">{slide.tag}</p>
                          <p className="text-white text-sm font-light">{slide.headline}</p>
                          <p className="text-white text-sm font-black">{slide.highlight}</p>
                        </div>
                        {slide.ativo === false && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Inativo</div>
                        )}
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-sm font-body text-brown-medium">Slide {slide.ordem}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setEditingBanner(slide)} className="text-blue-accent hover:bg-blue-accent/10">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteBannerMutation.mutate(slide.id)} className="text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {editingBanner && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">
                  {editingBanner.id ? "✏️ Editando Slide" : "➕ Novo Slide"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Ordem (1, 2, 3...)"
                    type="number"
                    value={editingBanner.ordem}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ordem: Number(e.target.value) })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Tag (ex: Consórcio de Carro)"
                    value={editingBanner.tag}
                    onChange={(e) => setEditingBanner({ ...editingBanner, tag: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Título (linha 1, ex: família feliz)"
                    value={editingBanner.headline}
                    onChange={(e) => setEditingBanner({ ...editingBanner, headline: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="Destaque em negrito (linha 2, ex: no carro novo)"
                    value={editingBanner.highlight}
                    onChange={(e) => setEditingBanner({ ...editingBanner, highlight: e.target.value })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="URL da imagem de fundo"
                    value={editingBanner.imagem_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, imagem_url: e.target.value })}
                    className="border-blue-accent/20 font-body md:col-span-2"
                  />
                  {editingBanner.imagem_url && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-brown-sand/30 md:col-span-2">
                      <img src={editingBanner.imagem_url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="ativo"
                      checked={editingBanner.ativo !== false}
                      onChange={(e) => setEditingBanner({ ...editingBanner, ativo: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="ativo" className="font-body text-sm text-brown-dark">Slide ativo</label>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => {
                      if (editingBanner.id) {
                        updateBannerMutation.mutate({ id: editingBanner.id, data: editingBanner });
                      } else {
                        createBannerMutation.mutate(editingBanner);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button onClick={() => setEditingBanner(null)} variant="outline" className="rounded-lg">
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
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

            {/* ABA IMAGENS DO HERO */}
            <TabsContent value="hero-images" className="space-y-6">
            <div className="space-y-6">
              {["carro", "casa", "investimento"].map((categoria) => (
                <div key={categoria} className="bg-white rounded-xl border border-brown-caramel/10 p-6">
                  <h3 className="text-lg font-heading text-brown-dark mb-4">
                    {categoria === "carro" ? "🚗 Imagens - Carro" : categoria === "casa" ? "🏠 Imagens - Casa" : "💰 Imagens - Investimento"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {heroImages
                      .filter((img) => img.categoria === categoria)
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((img) => (
                        <div key={img.id} className="border border-brown-caramel/15 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-brown-sand/30 overflow-hidden">
                            <img src={img.imagem_url} alt={`${categoria}-${img.ordem}`} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3 flex justify-between items-center">
                            <span className="text-sm font-body text-brown-dark">Foto {img.ordem}</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingHeroImage(img)}
                                className="text-blue-accent hover:bg-blue-accent/10"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteHeroImageMutation.mutate(img.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {editingHeroImage && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">✏️ Editando: {editingHeroImage.categoria.charAt(0).toUpperCase() + editingHeroImage.categoria.slice(1)} - Foto {editingHeroImage.ordem}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="URL da imagem"
                    value={editingHeroImage.imagem_url}
                    onChange={(e) => setEditingHeroImage({ ...editingHeroImage, imagem_url: e.target.value })}
                    className="border-blue-accent/20 font-body md:col-span-2"
                  />
                  <div className="aspect-video rounded-lg overflow-hidden bg-brown-sand/30 md:col-span-2">
                    <img src={editingHeroImage.imagem_url} alt="preview" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => updateHeroImageMutation.mutate({ id: editingHeroImage.id, data: editingHeroImage })}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingHeroImage(null)}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            </TabsContent>

            {/* ABA CARROSSEL FORMULÁRIO */}
            <TabsContent value="carrossel" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10">
                <h3 className="text-lg font-heading text-brown-dark">Imagens do Carrossel (Ao lado do Formulário)</h3>
                <p className="text-sm font-body text-brown-medium mt-1">Adicione imagens de casa, carro e moto que aparecem no carrossel</p>
              </div>

              {imagensCarrossel.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhuma imagem no carrossel.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                  {imagensCarrossel.map((img) => (
                    <div key={img.id} className="border border-brown-caramel/15 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-brown-sand/30 overflow-hidden">
                        <img src={img.url} alt={img.tipo} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-body text-brown-dark capitalize">{img.tipo}</span>
                          <p className="text-xs font-body text-brown-medium">Ordem: {img.ordem}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingCarrossel(img)}
                            className="text-blue-accent hover:bg-blue-accent/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteCarrosselMutation.mutate(img.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-6 border-t border-brown-caramel/10">
                <Button
                  onClick={() => setEditingCarrossel({ tipo: "casa", url: "", ordem: imagensCarrossel.length + 1 })}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2"
                >
                  ➕ Nova Imagem
                </Button>
              </div>
            </div>

            {editingCarrossel && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">
                  {editingCarrossel.id ? "✏️ Editando" : "➕ Adicionar imagem ao carrossel"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    value={editingCarrossel.tipo}
                    onValueChange={(value) => setEditingCarrossel({ ...editingCarrossel, tipo: value })}
                  >
                    <SelectTrigger className="border-blue-accent/20 font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">🏠 Casa</SelectItem>
                      <SelectItem value="carro">🚗 Carro</SelectItem>
                      <SelectItem value="moto">🏍️ Moto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Ordem"
                    type="number"
                    value={editingCarrossel.ordem}
                    onChange={(e) => setEditingCarrossel({ ...editingCarrossel, ordem: Number(e.target.value) })}
                    className="border-blue-accent/20 font-body"
                  />
                  <Input
                    placeholder="URL da imagem"
                    value={editingCarrossel.url}
                    onChange={(e) => setEditingCarrossel({ ...editingCarrossel, url: e.target.value })}
                    className="border-blue-accent/20 font-body md:col-span-2"
                  />
                  <div className="aspect-video rounded-lg overflow-hidden bg-brown-sand/30 md:col-span-2">
                    <img src={editingCarrossel.url} alt="preview" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => {
                      if (editingCarrossel.id) {
                        updateCarrosselMutation.mutate({ id: editingCarrossel.id, data: editingCarrossel });
                      } else {
                        createCarrosselMutation.mutate(editingCarrossel);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingCarrossel(null)}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            </TabsContent>

            {/* ABA CONFIGURAÇÕES */}
            <TabsContent value="configs" className="space-y-6">
            <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
              <div className="p-6 border-b border-brown-caramel/10">
                <h3 className="text-lg font-heading text-brown-dark">Configurações do Site</h3>
                <p className="text-sm font-body text-brown-medium mt-1">Altere links de WhatsApp, formulários e outros elementos do site</p>
              </div>

              {configs.length === 0 ? (
                <div className="p-8 text-center text-brown-medium font-body">Nenhuma configuração criada.</div>
              ) : (
                <div className="divide-y divide-brown-caramel/10">
                  {configs.map((cfg) => (
                    <div key={cfg.id} className="p-4 hover:bg-brown-sand/30 transition-colors flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-heading text-brown-dark font-semibold text-sm">{cfg.chave}</h4>
                        <p className="text-sm font-body text-brown-medium mt-1 break-all">{cfg.valor}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingConfig(cfg)}
                          className="text-blue-accent hover:bg-blue-accent/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteConfigMutation.mutate(cfg.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-6 border-t border-brown-caramel/10">
                <Button
                  onClick={() => setEditingConfig({ chave: "", valor: "" })}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2"
                >
                  ➕ Nova Configuração
                </Button>
              </div>
            </div>

            {editingConfig && (
              <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
                <h3 className="text-lg font-heading text-brown-dark mb-4">
                  {editingConfig.id ? "✏️ Editando" : "➕ Criar nova configuração"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Chave (ex: whatsapp_link)"
                    value={editingConfig.chave}
                    onChange={(e) => setEditingConfig({ ...editingConfig, chave: e.target.value })}
                    className="border-blue-accent/20 font-body md:col-span-1"
                  />
                  <textarea
                    placeholder="Valor"
                    value={editingConfig.valor}
                    onChange={(e) => setEditingConfig({ ...editingConfig, valor: e.target.value })}
                    className="border border-blue-accent/20 rounded-md p-3 font-body text-sm md:col-span-2"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => {
                      if (editingConfig.id) {
                        updateConfigMutation.mutate({ id: editingConfig.id, data: editingConfig });
                      } else {
                        createConfigMutation.mutate(editingConfig);
                        setEditingConfig(null);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    💾 Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingConfig(null)}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            </TabsContent>

            {/* ABA ALTERAR SENHAS - apenas CEO */}
            {isCeo && (
              <TabsContent value="senha" className="space-y-6">
                <AlterarSenhas />
              </TabsContent>
            )}
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

function AlterarSenhas() {
  const [ceoNova, setCeoNova] = useState("");
  const [paulaNova, setPaulaNova] = useState("");
  const [msg, setMsg] = useState("");

  const salvar = () => {
    // Salva no localStorage para persistência simples
    if (ceoNova) localStorage.setItem("override_ceo_pass", ceoNova);
    if (paulaNova) localStorage.setItem("override_paula_pass", paulaNova);
    setMsg("Senhas atualizadas! As mudanças valem a partir do próximo login.");
    setCeoNova("");
    setPaulaNova("");
  };

  return (
    <div className="bg-white rounded-xl border border-brown-caramel/10 p-6 max-w-lg">
      <h3 className="text-lg font-heading text-brown-dark mb-1">🔑 Alterar Senhas de Acesso</h3>
      <p className="text-sm font-body text-brown-medium mb-6">Deixe em branco para manter a senha atual.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-body font-semibold text-brown-dark mb-1">Nova senha do CEO</label>
          <Input
            type="password"
            placeholder="Nova senha CEO..."
            value={ceoNova}
            onChange={(e) => setCeoNova(e.target.value)}
            className="border-brown-caramel/20 font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-semibold text-brown-dark mb-1">Nova senha da Paula</label>
          <Input
            type="password"
            placeholder="Nova senha Paula..."
            value={paulaNova}
            onChange={(e) => setPaulaNova(e.target.value)}
            className="border-brown-caramel/20 font-body"
          />
        </div>
        {msg && <p className="text-sm text-green-600 font-body">{msg}</p>}
        <Button onClick={salvar} className="bg-brown-caramel hover:bg-brown-medium text-white rounded-lg font-heading font-semibold">
          💾 Salvar Senhas
        </Button>
      </div>
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
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
import { Search, MessageCircle, Filter, ArrowLeft, Users, Clock, CheckCircle, XCircle, LogOut, Settings } from "lucide-react";
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
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
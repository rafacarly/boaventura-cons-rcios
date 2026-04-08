import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle } from "lucide-react";

const LABELS = {
  objetivo: { carro: "Carro", imovel: "Imóvel", investimento: "Investimento", moto: "Moto" },
  faixa_credito: { ate_80mil: "Até R$ 80 mil", "80_a_150mil": "R$ 80-150 mil", "150_a_300mil": "R$ 150-300 mil", acima_300mil: "Acima de R$ 300 mil" },
  prazo: { o_quanto_antes: "O quanto antes", proximos_3_meses: "Próximos 3 meses", proximos_6_meses: "Próximos 6 meses", so_pesquisando: "Só pesquisando" },
  conhecimento: { ja_conheco: "Já conheço", conheco_pouco: "Conheço pouco", quero_entender: "Quero entender melhor" },
  lance: { sim: "Sim", talvez: "Talvez", nao: "Não" },
  momento: { contratar_logo: "Quer contratar logo", analisando: "Está analisando", so_pesquisando: "Só pesquisando" },
  status: { novo: "Novo", em_atendimento: "Em atendimento", fechado: "Fechado", perdido: "Perdido" }
};

const STATUS_COLORS = {
  novo: "bg-blue-accent/20 text-blue-accent",
  em_atendimento: "bg-brown-caramel/20 text-brown-caramel",
  fechado: "bg-green-100 text-green-700",
  perdido: "bg-red-100 text-red-600"
};

function getLabel(field, value) {
  return LABELS[field]?.[value] || value || "—";
}

function cleanPhone(phone) {
  return phone?.replace(/\D/g, "") || "";
}

export default function LeadDetailDialog({ lead, open, onOpenChange }) {
  if (!lead) return null;

  const phone = cleanPhone(lead.whatsapp);
  const whatsappLink = `https://wa.me/55${phone}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-brown-dark text-xl">
            {lead.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className={STATUS_COLORS[lead.status] || "bg-muted text-muted-foreground"}>
              {getLabel("status", lead.status)}
            </Badge>
            <span className="text-sm font-body text-brown-medium">
              {lead.created_date ? new Date(lead.created_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="WhatsApp" value={lead.whatsapp} />
            <InfoItem label="Objetivo" value={getLabel("objetivo", lead.objetivo)} />
            <InfoItem label="Faixa de crédito" value={getLabel("faixa_credito", lead.faixa_credito)} />
            <InfoItem label="Prazo" value={getLabel("prazo", lead.prazo)} />
            <InfoItem label="Conhecimento" value={getLabel("conhecimento", lead.conhecimento)} />
            <InfoItem label="Lance" value={getLabel("lance", lead.lance)} />
            <InfoItem label="Momento" value={getLabel("momento", lead.momento)} />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 rounded-lg">
                <MessageCircle className="w-4 h-4" />
                Abrir WhatsApp
              </Button>
            </a>
            <a href={`tel:${phone}`} className="flex-1">
              <Button variant="outline" className="w-full gap-2 rounded-lg">
                <Phone className="w-4 h-4" />
                Ligar
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-body text-brown-medium mb-0.5">{label}</p>
      <p className="text-sm font-body font-medium text-brown-dark">{value || "—"}</p>
    </div>
  );
}
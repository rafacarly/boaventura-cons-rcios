import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const CHAVES = [
  {
    chave: "google_tag_home",
    label: "🏠 Tag do Google — Página Inicial",
    url: "boaventuraconsocio.com",
    desc: "Tag para a página principal do site (/).",
    placeholder: `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`,
  },
  {
    chave: "google_tag_converter",
    label: "🔄 Tag do Google — Página Converter",
    url: "boaventuraconsocio.com/converter",
    desc: "Tag para a página /converter.",
    placeholder: `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`,
  },
  {
    chave: "meta_pixel_id",
    label: "📘 Pixel do Meta — ID",
    url: "Ambas as páginas",
    desc: "Cole apenas o ID numérico do Pixel do Meta (ex: 1234567890123456).",
    placeholder: "1234567890123456",
  },
  {
    chave: "meta_pixel_token",
    label: "🔑 Meta — Token de Acesso (API de Conversões)",
    url: "Opcional",
    desc: "Token de acesso para a API de Conversões do Meta (para rastreamento server-side). Deixe em branco se não usar.",
    placeholder: "EAAxxxxxxxxxxxxxxxxxxxxxxx...",
  },
];

function TagCard({ cfg, onEdit }) {
  const item = CHAVES.find((c) => c.chave === cfg.chave);
  const label = item?.label || cfg.chave;
  const desc = item?.desc || "";
  const hasValue = !!cfg.valor?.trim();

  return (
    <div className="p-5 border border-brown-caramel/15 rounded-xl hover:bg-brown-sand/30 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-brown-dark font-semibold text-sm">{label}</h4>
          <p className="text-xs font-body text-brown-medium mt-0.5">{desc}</p>
          {hasValue ? (
            <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <p className="text-xs text-green-700 font-body font-medium">✅ Configurado</p>
              <pre className="text-xs text-green-600 mt-1 whitespace-pre-wrap break-all line-clamp-2 font-mono">{cfg.valor}</pre>
            </div>
          ) : (
            <div className="mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <p className="text-xs text-red-600 font-body">⚠️ Não configurado</p>
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(cfg)}
          className="text-blue-accent hover:bg-blue-accent/10 flex-shrink-0"
        >
          ✏️ Editar
        </Button>
      </div>
    </div>
  );
}

export default function RastreamentoTags() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null); // { chave, valor, id? }

  const { data: configs = [] } = useQuery({
    queryKey: ["rastreamento_configs"],
    queryFn: () => base44.entities.ConfiguracaoSite.list("-created_date", 200),
  });

  const rastreamentoConfigs = CHAVES.map((c) => {
    const found = configs.find((cfg) => cfg.chave === c.chave);
    return found || { chave: c.chave, valor: "" };
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, chave, valor }) => {
      if (id) {
        return base44.entities.ConfiguracaoSite.update(id, { chave, valor });
      } else {
        return base44.entities.ConfiguracaoSite.create({ chave, valor });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rastreamento_configs"] });
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      setEditing(null);
    },
  });

  const currentMeta = CHAVES.find((c) => c.chave === editing?.chave);

  return (
    <div className="space-y-6">
      {/* Instrução */}
      <div className="bg-blue-accent/10 border border-blue-accent/30 rounded-xl p-5">
        <h3 className="font-heading text-brown-dark font-semibold mb-2">📌 Como funciona</h3>
        <p className="text-sm font-body text-brown-dark/80 leading-relaxed">
          Cole as tags do Google e o ID do Pixel do Meta abaixo. As tags serão automaticamente inseridas no <code className="bg-white px-1 rounded text-xs">&lt;head&gt;</code> de cada página correspondente.
          <br /><br />
          <strong>Google Analytics:</strong> Use uma tag diferente para cada página (Home e Converter).<br />
          <strong>Meta Pixel:</strong> O ID será aplicado em ambas as páginas automaticamente.
        </p>
      </div>

      {/* Cards */}
      <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
        <div className="p-5 border-b border-brown-caramel/10">
          <h3 className="text-lg font-heading text-brown-dark">Tags de Rastreamento</h3>
        </div>
        <div className="divide-y divide-brown-caramel/10">
          {rastreamentoConfigs.map((cfg) => (
            <div key={cfg.chave} className="p-4">
              <TagCard cfg={cfg} onEdit={setEditing} />
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6">
          <h3 className="text-lg font-heading text-brown-dark mb-1">✏️ {currentMeta?.label}</h3>
          {currentMeta?.url && (
            <p className="text-xs font-body text-brown-medium mb-4">Página: <span className="font-semibold">{currentMeta.url}</span></p>
          )}
          <textarea
            value={editing.valor}
            onChange={(e) => setEditing({ ...editing, valor: e.target.value })}
            placeholder={currentMeta?.placeholder || "Cole o código aqui..."}
            className="w-full border border-blue-accent/20 rounded-lg p-3 font-mono text-xs min-h-[140px] bg-white focus:outline-none focus:border-blue-accent"
            rows={8}
          />
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => saveMutation.mutate(editing)}
              disabled={saveMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              {saveMutation.isPending ? "Salvando..." : "💾 Salvar"}
            </Button>
            <Button onClick={() => setEditing(null)} variant="outline" className="rounded-lg">
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
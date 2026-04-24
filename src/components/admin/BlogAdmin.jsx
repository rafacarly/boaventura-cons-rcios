import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Eye, Heart, Tag, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CTA_LABELS = { formulario: "Formulário", whatsapp: "WhatsApp", proximo_post: "Próximo Post" };

export default function BlogAdmin() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ["blogAdmin"],
    queryFn: () => base44.entities.BlogPost.list("-created_date", 100),
  });

  const saveMutation = useMutation({
    mutationFn: (data) => data.id ? base44.entities.BlogPost.update(data.id, data) : base44.entities.BlogPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts_home"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts_all"] });
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.BlogPost.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogAdmin"] }),
  });

  const handleUploadCapa = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setEditing((prev) => ({ ...prev, capa_url: file_url }));
    setUploading(false);
  };

  const novoPost = {
    titulo: "",
    resumo: "",
    conteudo: "",
    capa_url: "",
    tags: "",
    ativo: true,
    cta_tipo: "formulario",
    cta_texto: "",
    curtidas: 0,
  };

  return (
    <div className="space-y-6">
      {/* Lista */}
      <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
        <div className="p-6 border-b border-brown-caramel/10 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-heading text-brown-dark">Blog — Artigos</h3>
            <p className="text-sm font-body text-brown-medium mt-1">{posts.length} artigo{posts.length !== 1 ? "s" : ""} publicado{posts.length !== 1 ? "s" : ""}</p>
          </div>
          <Button
            onClick={() => setEditing(novoPost)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2"
          >
            <Plus className="w-4 h-4" /> Novo Artigo
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="p-10 text-center text-brown-medium font-body">Nenhum artigo criado ainda.</div>
        ) : (
          <div className="divide-y divide-brown-caramel/10">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex gap-4 hover:bg-brown-sand/30 transition-colors items-start">
                {/* Thumb */}
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-brown-sand/50 flex-shrink-0">
                  {post.capa_url ? (
                    <img src={post.capa_url} alt={post.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📝</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-heading text-brown-dark font-semibold text-sm truncate">{post.titulo}</h4>
                    {!post.ativo && <Badge className="bg-red-100 text-red-600 text-xs">Inativo</Badge>}
                  </div>
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {post.tags.split(",").slice(0, 4).map((t) => (
                        <span key={t} className="text-xs bg-blue-accent/10 text-blue-accent px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5" />{t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-brown-medium font-body">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" />{post.curtidas || 0}</span>
                    <span>CTA: {CTA_LABELS[post.cta_tipo] || "—"}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-1 flex-shrink-0">
                  <Link to={`/blog/${post.id}`} target="_blank">
                    <Button size="sm" variant="ghost" className="text-brown-medium hover:text-brown-dark">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={() => setEditing({ ...post })} className="text-blue-accent hover:bg-blue-accent/10">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => {
                    if (confirm(`Deletar "${post.titulo}"?`)) deleteMutation.mutate(post.id);
                  }} className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-blue-accent/10 rounded-xl border border-blue-accent/30 p-6 space-y-5">
          <h3 className="text-lg font-heading text-brown-dark">
            {editing.id ? "✏️ Editando Artigo" : "➕ Novo Artigo"}
          </h3>

          {/* Título */}
          <div>
            <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Título *</label>
            <Input
              value={editing.titulo}
              onChange={(e) => setEditing({ ...editing, titulo: e.target.value })}
              placeholder="Ex: Como funciona o consórcio de imóvel"
              className="border-blue-accent/20 font-body"
            />
          </div>

          {/* Resumo */}
          <div>
            <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Resumo (aparece no card)</label>
            <textarea
              value={editing.resumo || ""}
              onChange={(e) => setEditing({ ...editing, resumo: e.target.value })}
              placeholder="Breve descrição do artigo..."
              className="w-full border border-blue-accent/20 rounded-md p-3 font-body text-sm"
              rows={2}
            />
          </div>

          {/* Capa */}
          <div>
            <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Imagem de Capa</label>
            <div className="flex gap-3 items-start">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadCapa}
                className="border border-blue-accent/20 rounded-md p-2 font-body text-sm flex-1"
              />
              {uploading && <span className="text-xs text-blue-accent font-body mt-2">Enviando...</span>}
            </div>
            {editing.capa_url && (
              <div className="mt-2 aspect-video max-w-xs rounded-lg overflow-hidden border border-blue-accent/20">
                <img src={editing.capa_url} alt="capa" className="w-full h-full object-cover" />
              </div>
            )}
            <Input
              value={editing.capa_url || ""}
              onChange={(e) => setEditing({ ...editing, capa_url: e.target.value })}
              placeholder="Ou cole a URL da imagem aqui"
              className="border-blue-accent/20 font-body mt-2"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Tags (separadas por vírgula)</label>
            <Input
              value={editing.tags || ""}
              onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
              placeholder="consorcio, carro, imovel, investimento..."
              className="border-blue-accent/20 font-body"
            />
            <p className="text-xs text-brown-medium font-body mt-1">As tags ajudam nas buscas e SEO.</p>
          </div>

          {/* Conteúdo */}
          <div>
            <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Conteúdo do Artigo *</label>
            <textarea
              value={editing.conteudo}
              onChange={(e) => setEditing({ ...editing, conteudo: e.target.value })}
              placeholder="Escreva o conteúdo completo do artigo aqui..."
              className="w-full border border-blue-accent/20 rounded-md p-3 font-body text-sm min-h-[300px]"
              rows={15}
            />
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-body font-semibold text-brown-dark block mb-1">CTA no final do artigo</label>
              <Select value={editing.cta_tipo || "formulario"} onValueChange={(v) => setEditing({ ...editing, cta_tipo: v })}>
                <SelectTrigger className="border-blue-accent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formulario">📋 Ir para o Formulário</SelectItem>
                  <SelectItem value="whatsapp">💬 Abrir WhatsApp</SelectItem>
                  <SelectItem value="proximo_post">➡️ Próximo Artigo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-body font-semibold text-brown-dark block mb-1">Texto do botão (opcional)</label>
              <Input
                value={editing.cta_texto || ""}
                onChange={(e) => setEditing({ ...editing, cta_texto: e.target.value })}
                placeholder="Ex: Simular meu consórcio →"
                className="border-blue-accent/20 font-body"
              />
            </div>
          </div>

          {editing.cta_tipo === "proximo_post" && (
            <div>
              <label className="text-sm font-body font-semibold text-brown-dark block mb-1">ID do próximo artigo</label>
              <Select value={editing.proximo_post_id || ""} onValueChange={(v) => setEditing({ ...editing, proximo_post_id: v })}>
                <SelectTrigger className="border-blue-accent/20">
                  <SelectValue placeholder="Selecione o próximo artigo" />
                </SelectTrigger>
                <SelectContent>
                  {posts.filter((p) => p.id !== editing.id).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.titulo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Ativo */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="post_ativo"
              checked={editing.ativo !== false}
              onChange={(e) => setEditing({ ...editing, ativo: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="post_ativo" className="text-sm font-body text-brown-dark">Artigo publicado (visível no site)</label>
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => saveMutation.mutate(editing)}
              disabled={!editing.titulo || !editing.conteudo || saveMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              {saveMutation.isPending ? "Salvando..." : "💾 Salvar Artigo"}
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
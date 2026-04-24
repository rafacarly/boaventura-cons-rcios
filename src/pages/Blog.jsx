import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Heart, Tag, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "../components/landing/Footer";
import WhatsAppFloat from "../components/landing/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [tagFiltro, setTagFiltro] = useState("");

  useSEO({
    title: "Blog — Tudo sobre Consórcios",
    description: "Artigos, dicas e novidades sobre consórcio de imóvel, carro, moto e investimento. Aprenda a realizar seus sonhos com mais inteligência financeira.",
    url: "https://boaventuraconsorcio.com.br/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog Boaventura Consórcios",
      "description": "Artigos sobre consórcio de imóvel, carro, moto e investimento.",
      "url": "https://boaventuraconsorcio.com.br/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Boaventura Consórcios",
        "url": "https://boaventuraconsorcio.com.br"
      }
    }
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["blogPosts_all"],
    queryFn: () => base44.entities.BlogPost.filter({ ativo: true }, "-created_date", 50),
  });

  // Todas as tags únicas
  const todasTags = [...new Set(
    posts.flatMap((p) => (p.tags ? p.tags.split(",").map((t) => t.trim()) : []))
  )].filter(Boolean);

  const filtered = posts.filter((p) => {
    const matchSearch = !search || p.titulo?.toLowerCase().includes(search.toLowerCase()) || p.resumo?.toLowerCase().includes(search.toLowerCase());
    const matchTag = !tagFiltro || (p.tags && p.tags.split(",").map((t) => t.trim()).includes(tagFiltro));
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen bg-brown-sand">
      <WhatsAppFloat />

      {/* Header */}
      <div className="bg-brown-dark py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-brown-caramel font-heading font-bold text-xs tracking-widest uppercase mb-3">Blog & Conteúdo</p>
            <h1 className="text-4xl md:text-5xl font-heading text-brown-sand mb-4">
              Tudo sobre <span className="text-brown-caramel">consórcios</span>
            </h1>
            <p className="text-brown-sand/70 font-body text-lg mb-8">Dicas, novidades e conhecimento para realizar seus sonhos.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-medium" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar artigos..."
                className="pl-10 h-12 rounded-full bg-white border-0 font-body"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tags filtro */}
        {todasTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button
              onClick={() => setTagFiltro("")}
              className={`px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-all ${!tagFiltro ? "bg-brown-caramel text-white" : "bg-white text-brown-medium hover:bg-brown-caramel/10"}`}
            >
              Todos
            </button>
            {todasTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFiltro(tag === tagFiltro ? "" : tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-all flex items-center gap-1.5 ${tagFiltro === tag ? "bg-brown-caramel text-white" : "bg-white text-brown-medium hover:bg-brown-caramel/10"}`}
              >
                <Tag className="w-3 h-3" /> {tag}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-brown-medium font-body">Nenhum artigo encontrado.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/blog/${post.id}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-video bg-brown-dark/10 overflow-hidden">
                      {post.capa_url ? (
                        <img src={post.capa_url} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brown-caramel/20 to-blue-accent/20 flex items-center justify-center">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {post.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.tags.split(",").slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs font-body bg-blue-accent/10 text-blue-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="font-heading text-brown-dark font-bold text-base mb-2 line-clamp-2 group-hover:text-brown-caramel transition-colors">{post.titulo}</h3>
                      {post.resumo && <p className="text-sm font-body text-brown-medium line-clamp-3 flex-1">{post.resumo}</p>}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-brown-caramel/10">
                        <div className="flex items-center gap-1 text-xs text-brown-medium font-body">
                          <Heart className="w-3.5 h-3.5 text-red-400" />{post.curtidas || 0}
                        </div>
                        <span className="text-xs font-heading font-bold text-brown-caramel flex items-center gap-1">Ler mais <ArrowRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/" className="text-brown-caramel font-heading font-bold hover:underline">← Voltar ao site</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
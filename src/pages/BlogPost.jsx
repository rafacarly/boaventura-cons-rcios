import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Heart, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../components/landing/Footer";
import WhatsAppFloat from "../components/landing/WhatsAppFloat";

const WHATSAPP_NUMBER = "5571992764466";

export default function BlogPost() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [curtido, setCurtido] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => base44.entities.BlogPost.filter({ id }, "-created_date", 1).then((r) => r[0]),
    enabled: !!id,
  });

  const { data: proximoPost } = useQuery({
    queryKey: ["blogPost_proximo", post?.proximo_post_id],
    queryFn: () => base44.entities.BlogPost.filter({ id: post.proximo_post_id }, "-created_date", 1).then((r) => r[0]),
    enabled: !!post?.proximo_post_id,
  });

  const curtirMutation = useMutation({
    mutationFn: () => base44.entities.BlogPost.update(id, { curtidas: (post.curtidas || 0) + 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPost", id] });
      setCurtido(true);
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-brown-sand flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brown-caramel border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-brown-sand flex items-center justify-center">
      <div className="text-center">
        <p className="text-brown-dark font-heading text-xl mb-4">Post não encontrado.</p>
        <Link to="/blog"><Button className="bg-brown-caramel text-white rounded-full">Ver todos os posts</Button></Link>
      </div>
    </div>
  );

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({ title: post.titulo, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  const scrollToForm = () => {
    window.location.href = "/#formulario";
  };

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloat />

      {/* Capa */}
      {post.capa_url && (
        <div className="relative h-64 md:h-96 bg-brown-dark overflow-hidden">
          <img src={post.capa_url} alt={post.titulo} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 to-transparent" />
        </div>
      )}

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Voltar */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-brown-medium hover:text-brown-dark font-body text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao blog
        </Link>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.split(",").map((tag) => (
              <span key={tag} className="text-xs font-body bg-blue-accent/10 text-blue-accent px-3 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />{tag.trim()}
              </span>
            ))}
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-heading text-brown-dark mb-4 leading-tight"
        >
          {post.titulo}
        </motion.h1>

        {post.resumo && (
          <p className="text-lg font-body text-brown-medium mb-8 leading-relaxed border-l-4 border-brown-caramel pl-4">
            {post.resumo}
          </p>
        )}

        {/* Ações topo */}
        <div className="flex items-center gap-4 pb-8 border-b border-brown-caramel/10 mb-8">
          <button
            onClick={() => !curtido && curtirMutation.mutate()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-semibold transition-all ${curtido ? "bg-red-100 text-red-500" : "bg-brown-sand text-brown-medium hover:bg-red-50 hover:text-red-400"}`}
          >
            <Heart className={`w-4 h-4 ${curtido ? "fill-red-400 text-red-400" : ""}`} />
            {post.curtidas || 0} curtida{(post.curtidas || 0) !== 1 ? "s" : ""}
          </button>
          <button
            onClick={handleCompartilhar}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brown-sand text-brown-medium hover:bg-blue-accent/10 hover:text-blue-accent font-body text-sm font-semibold transition-all"
          >
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        </div>

        {/* Corpo do post */}
        <div
          className="prose prose-lg max-w-none font-body text-brown-dark prose-headings:font-heading prose-headings:text-brown-dark prose-a:text-blue-accent prose-strong:text-brown-dark"
          style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
        >
          {post.conteudo}
        </div>

        {/* Curtir no final */}
        <div className="mt-12 pt-8 border-t border-brown-caramel/10 flex items-center gap-4">
          <button
            onClick={() => !curtido && curtirMutation.mutate()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all ${curtido ? "bg-red-100 text-red-500" : "bg-brown-sand text-brown-medium hover:bg-red-50 hover:text-red-400"}`}
          >
            <Heart className={`w-4 h-4 ${curtido ? "fill-red-400 text-red-400" : ""}`} />
            {curtido ? "Curtido!" : "Curtir este artigo"}
          </button>
          <button onClick={handleCompartilhar} className="flex items-center gap-2 text-sm font-body text-brown-medium hover:text-blue-accent transition-colors">
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        </div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-brown-dark to-brown-graphite p-8 text-center shadow-xl"
        >
          {post.cta_tipo === "whatsapp" ? (
            <>
              <h3 className="text-2xl font-heading text-brown-sand mb-3">Pronto para dar o próximo passo?</h3>
              <p className="text-brown-sand/70 font-body mb-6">Fale agora com nossa especialista e encontre o consórcio ideal para você.</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vi o artigo "${encodeURIComponent(post.titulo)}" e quero saber mais sobre consórcio.`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-heading font-bold text-lg gap-2">
                  💬 {post.cta_texto || "Falar no WhatsApp"}
                </Button>
              </a>
            </>
          ) : post.cta_tipo === "proximo_post" && proximoPost ? (
            <>
              <h3 className="text-xl font-heading text-brown-sand mb-3">Continue lendo</h3>
              <Link to={`/blog/${proximoPost.id}`}>
                <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-colors cursor-pointer">
                  <p className="text-brown-sand font-heading font-bold text-base flex items-center justify-center gap-2">
                    {proximoPost.titulo} <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-heading text-brown-sand mb-3">Quer simular o seu consórcio?</h3>
              <p className="text-brown-sand/70 font-body mb-6">É gratuito, rápido e sem compromisso.</p>
              <Button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-brown-caramel to-orange-500 hover:shadow-lg text-white rounded-full px-8 py-3 font-heading font-bold text-lg"
              >
                {post.cta_texto || "Simular agora →"}
              </Button>
            </>
          )}
        </motion.div>

        <div className="text-center mt-8">
          <Link to="/blog" className="text-brown-medium font-body text-sm hover:text-brown-dark transition-colors">← Ver todos os artigos</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
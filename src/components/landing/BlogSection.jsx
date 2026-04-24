import React from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Heart, Tag, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const { data: posts = [] } = useQuery({
    queryKey: ["blogPosts_home"],
    queryFn: () => base44.entities.BlogPost.filter({ ativo: true }, "-created_date", 3),
    staleTime: 60000,
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brown-sand overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-heading font-bold text-brown-caramel tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-brown-caramel" />
            Blog & Conteúdo
            <span className="w-6 h-px bg-brown-caramel" />
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-brown-dark mb-3">
            Aprenda sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-caramel to-blue-accent">consórcios</span>
          </h2>
          <p className="text-brown-medium font-body">Dicas, novidades e tudo que você precisa saber antes de investir.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {/* Capa */}
                  <div className="aspect-video bg-brown-dark/10 overflow-hidden relative">
                    {post.capa_url ? (
                      <img
                        src={post.capa_url}
                        alt={post.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brown-caramel/20 to-blue-accent/20 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    {post.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.split(",").slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs font-body bg-blue-accent/10 text-blue-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5" />
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="font-heading text-brown-dark font-bold text-base mb-2 line-clamp-2 group-hover:text-brown-caramel transition-colors">
                      {post.titulo}
                    </h3>

                    {post.resumo && (
                      <p className="text-sm font-body text-brown-medium line-clamp-3 flex-1">
                        {post.resumo}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-brown-caramel/10">
                      <div className="flex items-center gap-1 text-xs text-brown-medium font-body">
                        <Heart className="w-3.5 h-3.5 text-red-400" />
                        {post.curtidas || 0}
                      </div>
                      <span className="text-xs font-heading font-bold text-brown-caramel flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler mais <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ver todos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-brown-caramel text-brown-caramel font-heading font-bold px-8 py-3 rounded-full hover:bg-brown-caramel hover:text-white transition-all"
            >
              Ver todos os artigos →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Eye } from "lucide-react";

const PAGE_LABELS = {
  home: { label: "Home", icon: "🏠", color: "bg-blue-accent/15 text-blue-accent" },
  converter: { label: "Converter", icon: "🔄", color: "bg-brown-caramel/15 text-brown-caramel" },
  obrigado: { label: "Obrigado", icon: "✅", color: "bg-green-100 text-green-700" },
  whatsapp: { label: "Página WhatsApp", icon: "📱", color: "bg-green-100 text-green-700" },
  whatsapp_float_click: { label: "Cliques no Botão WhatsApp", icon: "💬", color: "bg-orange-100 text-orange-600" },
};

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-brown-caramel/10 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-brown-dark">{value.toLocaleString("pt-BR")}</p>
        <p className="text-sm font-body text-brown-medium">{label}</p>
      </div>
    </div>
  );
}

export default function AnalyticsAdmin() {
  const { data: visitas = [], isLoading } = useQuery({
    queryKey: ["visitas"],
    queryFn: () => base44.entities.Visita.list("-created_date", 5000),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["blogPosts_analytics"],
    queryFn: () => base44.entities.BlogPost.filter({ ativo: true }, "-created_date", 50),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads_analytics"],
    queryFn: () => base44.entities.Lead.list("-created_date", 5000),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-brown-medium font-body">
        Carregando dados...
      </div>
    );
  }

  // Count by page
  const counts = visitas.reduce((acc, v) => {
    acc[v.pagina] = (acc[v.pagina] || 0) + 1;
    return acc;
  }, {});

  // Blog post views
  const blogViews = visitas
    .filter((v) => v.pagina === "blog_post" && v.referencia)
    .reduce((acc, v) => {
      acc[v.referencia] = (acc[v.referencia] || 0) + 1;
      return acc;
    }, {});

  const mainPages = ["home", "converter", "obrigado", "whatsapp", "whatsapp_float_click"];

  const totalVisits = mainPages
    .filter((p) => p !== "whatsapp_float_click")
    .reduce((sum, p) => sum + (counts[p] || 0), 0);

  const leadsIniciados = leads.length;
  const leadsConcluidos = leads.filter((l) => l.completude === "completo").length;
  const taxaConclusao = leadsIniciados > 0 ? Math.round((leadsConcluidos / leadsIniciados) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Total */}
      <div className="bg-brown-dark rounded-xl p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl">📊</div>
        <div>
          <p className="text-3xl font-heading font-bold text-brown-sand">{totalVisits.toLocaleString("pt-BR")}</p>
          <p className="text-sm font-body text-brown-sand/60">Total de visitas (excl. cliques)</p>
        </div>
      </div>

      {/* Funil do formulário */}
      <div>
        <h3 className="text-base font-heading font-bold text-brown-dark mb-4">Funil do formulário</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon="📋" label="Iniciaram o formulário" value={leadsIniciados} color="bg-blue-accent/15 text-blue-accent" />
          <StatCard icon="✅" label="Concluíram o formulário" value={leadsConcluidos} color="bg-green-100 text-green-700" />
          <div className="bg-white rounded-xl border border-brown-caramel/10 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-brown-caramel/15 text-brown-caramel">
              🎯
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-brown-dark">{taxaConclusao}%</p>
              <p className="text-sm font-body text-brown-medium">Taxa de conclusão</p>
            </div>
          </div>
        </div>
      </div>

      {/* Páginas principais */}
      <div>
        <h3 className="text-base font-heading font-bold text-brown-dark mb-4">Visitas por página</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainPages.map((page) => {
            const cfg = PAGE_LABELS[page];
            return (
              <StatCard
                key={page}
                icon={cfg.icon}
                label={cfg.label}
                value={counts[page] || 0}
                color={cfg.color}
              />
            );
          })}
        </div>
      </div>

      {/* Posts do blog */}
      <div>
        <h3 className="text-base font-heading font-bold text-brown-dark mb-4">Visualizações por post do blog</h3>
        {posts.length === 0 ? (
          <p className="text-brown-medium font-body text-sm">Nenhum post publicado.</p>
        ) : (
          <div className="bg-white rounded-xl border border-brown-caramel/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brown-dark/5 border-b border-brown-caramel/10">
                  <th className="px-4 py-3 text-left font-heading text-brown-dark">Post</th>
                  <th className="px-4 py-3 text-right font-heading text-brown-dark w-32">Visualizações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-brown-caramel/10 last:border-b-0 hover:bg-brown-sand/30">
                    <td className="px-4 py-3 font-body text-brown-dark">{post.titulo}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 font-heading font-bold text-brown-caramel">
                        <Eye className="w-3.5 h-3.5" />
                        {(blogViews[post.id] || 0).toLocaleString("pt-BR")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
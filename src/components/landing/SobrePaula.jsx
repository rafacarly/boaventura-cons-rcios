import React from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function SobrePaula() {
  const { data: paula } = useQuery({
    queryKey: ["sobrePaula"],
    queryFn: () => base44.entities.SobrePaula.list("-created_date", 1),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const dados = paula?.[0] || {
    nome: "Paula Boaventura",
    texto: "Meu nome é Paula, e já ajudei mais de 2.000 clientes a realizar os seus sonhos.",
    foto_url: "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/eb16c2ad6_fadd51044_APRESENTACAOPAULApdf.png"
  };

  return (
    <section className="py-16 md:py-28 bg-brown-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center w-full"
          >
            <div className={`w-64 h-64 md:w-80 md:h-80 ${dados.background_color || 'bg-brown-caramel'} flex items-center justify-center overflow-hidden ${dados.background_shape === 'circle' ? 'rounded-full' : dados.background_shape === 'oval' ? 'rounded-3xl' : dados.background_shape === 'rounded' ? 'rounded-2xl' : ''} shadow-2xl flex-shrink-0`}>
              <img
                src={dados.foto_url}
                alt={dados.nome}
                style={{
                  width: `${dados.foto_zoom || 100}%`,
                  height: `${dados.foto_zoom || 100}%`,
                  objectFit: 'cover',
                  objectPosition: `center ${dados.foto_posicao_y || 50}%`
                }}
              />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-sm font-body text-brown-caramel font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-brown-caramel" />
              Quem somos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-brown-sand leading-tight mb-6">
              {dados.nome}
            </h2>
            <p className="text-lg md:text-xl font-body text-brown-sand/80 leading-relaxed">
              {dados.texto}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
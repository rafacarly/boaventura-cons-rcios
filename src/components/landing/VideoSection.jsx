import React from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function VideoSection() {
  const { data: videos = [] } = useQuery({
    queryKey: ["videos"],
    queryFn: () => base44.entities.Video.list("-created_date", 1),
    staleTime: 0,
  });

  const video = videos.find(v => v.ativo !== false);

  if (!video) return null;

  const getEmbedUrl = (tipo, url) => {
    if (tipo === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (tipo === "instagram") {
      return url;
    }
    return url;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          {video.titulo && (
            <h2 className="text-3xl md:text-4xl font-heading text-brown-dark mb-2">
              {video.titulo}
            </h2>
          )}
          {video.descricao && (
            <p className="text-lg font-body text-brown-medium">
              {video.descricao}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-brown-dark"
        >
          {video.tipo === "upload" ? (
            <video
              src={video.url}
              controls
              className="w-full h-full object-cover"
            />
          ) : video.tipo === "instagram" ? (
            <iframe
              src={`${video.url}embed/`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={getEmbedUrl("youtube", video.url)}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: videos = [] } = useQuery({
    queryKey: ["videos"],
    queryFn: () => base44.entities.Video.list("-created_date", 1),
    staleTime: 0,
  });

  const video = videos.find(v => v.ativo !== false);

  if (!video) return null;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const getEmbedUrl = (tipo, url) => {
    if (tipo === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1`;
    }
    if (tipo === "instagram") {
      return url;
    }
    return url;
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
          className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-brown-dark relative"
          onMouseEnter={handleMouseEnter}
        >
          {video.tipo === "upload" ? (
            <>
              <video
                ref={videoRef}
                src={video.url}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
              >
                <div className="bg-brown-caramel/90 group-hover:bg-brown-caramel p-4 rounded-full transition-all">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" fill="white" />
                  )}
                </div>
              </button>
            </>
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
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WHATSAPP_NUMBER = "5571992764466";

export default function Obrigado() {
  const params = new URLSearchParams(window.location.search);
  const msg = params.get("msg") || "";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${msg}` : ""}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-sand via-brown-sand to-blue-accent/5 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-brown-caramel/30 to-blue-accent/20 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brown-caramel/20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Check className="w-14 h-14 text-brown-caramel" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading text-brown-dark mb-4">
            Obrigado! 🎉
          </h1>
          <p className="text-brown-medium font-body text-lg leading-relaxed mb-6">
            Seus dados foram enviados com sucesso.<br />
            Em instantes vamos abrir o WhatsApp para você conversar com nosso time.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-brown-caramel font-body text-sm mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 rounded-full bg-brown-caramel"
            />
            Abrindo WhatsApp em segundos...
          </motion.div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-brown-caramel to-orange-500 text-white font-heading font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-brown-caramel/30 hover:scale-105 transition-all"
          >
            Abrir WhatsApp agora →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
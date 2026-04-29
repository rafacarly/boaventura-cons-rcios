import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { trackEvent } from "@/hooks/useTracking";

const WHATSAPP_NUMBER = "5571992764466";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site e quero saber mais sobre consórcio.";

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 max-w-[220px] border border-green-100"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm font-heading font-bold text-gray-800 mb-1">Fale conosco! 👋</p>
            <p className="text-xs font-body text-gray-500 leading-relaxed">
              Tire suas dúvidas sobre consórcio pelo WhatsApp agora mesmo.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_float_click")}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        animate={{
          boxShadow: [
            "0 0 0px 0px rgba(249,130,39,0.5)",
            "0 0 0px 14px rgba(249,130,39,0)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-brown-caramel hover:bg-brown-medium rounded-full flex items-center justify-center shadow-2xl shadow-brown-caramel/40 transition-colors"
      >
        <MessageCircle className="w-8 h-8 text-white" fill="white" />
      </motion.a>
    </div>
  );
}
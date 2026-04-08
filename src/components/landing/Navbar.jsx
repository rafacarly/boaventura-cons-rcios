import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5511999999999";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brown-sand/90 backdrop-blur-md border-b border-brown-caramel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <img 
            src="https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/24c6bcf57_APRESENTACAOPAULApdf.png" 
            alt="Boaventura" 
            className="h-12 md:h-14 object-contain"
          />

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("vantagens")} className="text-sm font-body text-brown-graphite hover:text-brown-caramel transition-colors">Vantagens</button>
            <button onClick={() => scrollTo("modalidades")} className="text-sm font-body text-brown-graphite hover:text-brown-caramel transition-colors">Modalidades</button>
            <button onClick={() => scrollTo("planos")} className="text-sm font-body text-brown-graphite hover:text-brown-caramel transition-colors">Planos</button>
            <button onClick={() => scrollTo("faq")} className="text-sm font-body text-brown-graphite hover:text-brown-caramel transition-colors">FAQ</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-accent hover:bg-cyan-400 text-white gap-2 rounded-full px-6 shadow-lg shadow-blue-accent/30">
                <Phone className="w-4 h-4" />
                Falar no WhatsApp
              </Button>
            </a>
          </div>

          <button className="md:hidden text-brown-dark" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brown-sand border-t border-brown-caramel/20"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <button onClick={() => scrollTo("vantagens")} className="text-left py-2 text-brown-graphite font-body">Vantagens</button>
              <button onClick={() => scrollTo("modalidades")} className="text-left py-2 text-brown-graphite font-body">Modalidades</button>
              <button onClick={() => scrollTo("planos")} className="text-left py-2 text-brown-graphite font-body">Planos</button>
              <button onClick={() => scrollTo("faq")} className="text-left py-2 text-brown-graphite font-body">FAQ</button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-accent hover:bg-cyan-400 text-white gap-2 rounded-full">
                  <Phone className="w-4 h-4" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5571992764466";

const NAV_LINKS = [
  { label: "Por que Boaventura?", id: "por-que" },
  { label: "Modalidades", id: "modalidades" },
  { label: "Como Funciona", id: "como-funciona" },
  { label: "Planos", id: "planos" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button (left) */}
          <button className="lg:hidden text-brown-dark p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Nav links (left on desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-body text-brown-dark hover:text-brown-caramel transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Logo - centered */}
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            src="https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/fadd51044_APRESENTACAOPAULApdf.png"
            alt="Boaventura Consórcios"
            className="h-10 md:h-12 object-contain absolute left-1/2 -translate-x-1/2"
          />

          {/* Nav links (right on desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(3).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-body text-brown-dark hover:text-brown-caramel transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Spacer for mobile to balance menu button */}
          <div className="lg:hidden w-10" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-brown-caramel/10 shadow-xl"
          >
            <div className="px-4 py-5 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-2 px-3 rounded-lg text-brown-dark font-body font-medium hover:bg-brown-sand transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="mt-2 block">
                <button className="w-full bg-brown-caramel hover:bg-brown-medium text-white gap-2 rounded-full font-heading font-bold py-3 px-6 flex items-center justify-center transition-colors">
                  WhatsApp
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";

export default function Footer() {
  return (
    <footer className="bg-brown-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-heading text-brown-sand">Boa</span>
              <span className="text-2xl font-heading text-blue-accent">V</span>
              <span className="text-2xl font-heading text-brown-caramel">entura</span>
            </div>
            <p className="text-sm font-body text-brown-sand/50 leading-relaxed mb-4">
              Consórcios com atendimento consultivo, estratégia patrimonial e transparência. A forma mais inteligente de conquistar seus objetivos.
            </p>
            <p className="text-xs font-body text-brown-sand/30">
              Juntos, realizamos vidas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-brown-sand text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-body text-brown-sand/60 hover:text-brown-caramel transition-colors"
              >
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </a>
              <div className="flex items-center gap-3 text-sm font-body text-brown-sand/60">
                <Mail className="w-4 h-4" />
                contato@boaventuraconsorcio.com.br
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-brown-sand/60">
                <MapPin className="w-4 h-4" />
                São Paulo, SP
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-brown-sand text-lg mb-4">Links</h4>
            <div className="space-y-2">
              <button onClick={() => document.getElementById("vantagens")?.scrollIntoView({ behavior: "smooth" })} className="block text-sm font-body text-brown-sand/60 hover:text-brown-caramel transition-colors">
                Vantagens
              </button>
              <button onClick={() => document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" })} className="block text-sm font-body text-brown-sand/60 hover:text-brown-caramel transition-colors">
                Modalidades
              </button>
              <button onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })} className="block text-sm font-body text-brown-sand/60 hover:text-brown-caramel transition-colors">
                Planos
              </button>
              <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="block text-sm font-body text-brown-sand/60 hover:text-brown-caramel transition-colors">
                FAQ
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-graphite pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-brown-sand/30">
            © {new Date().getFullYear()} Boaventura | Consórcios. Todos os direitos reservados.
          </p>
          <p className="text-xs font-body text-brown-sand/30">
            Política de Privacidade
          </p>
        </div>
      </div>
    </footer>
  );
}
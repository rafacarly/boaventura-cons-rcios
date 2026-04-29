import { useEffect } from "react";
import { useTracking } from "@/hooks/useTracking";

const WHATSAPP_URL = "https://wa.me/5571992764466";

export default function Whatsapp() {
  useTracking("whatsapp");
  useEffect(() => {
    window.location.href = WHATSAPP_URL;
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6 animate-pulse">
        <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.827L.057 23.428a.5.5 0 0 0 .515.572l5.797-1.521A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.733.979.996-3.638-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
        </svg>
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">Redirecionando para o WhatsApp...</p>
      <p className="text-sm text-gray-400">
        Não foi redirecionado?{" "}
        <a href={WHATSAPP_URL} className="text-green-500 underline font-medium">
          Clique aqui
        </a>
      </p>
    </div>
  );
}
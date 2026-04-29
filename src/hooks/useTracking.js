import { useEffect } from "react";
import { base44 } from "@/api/base44Client";

export function useTracking(pagina, referencia = null) {
  useEffect(() => {
    base44.entities.Visita.create({ pagina, ...(referencia ? { referencia } : {}) });
  }, [pagina, referencia]);
}

export async function trackEvent(pagina, referencia = null) {
  await base44.entities.Visita.create({ pagina, ...(referencia ? { referencia } : {}) });
}
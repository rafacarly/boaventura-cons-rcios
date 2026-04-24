import { useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Busca uma chave na ConfiguracaoSite e injeta o HTML no <head>.
 * Para pixel do Meta (chave="meta_pixel_id"), injeta o snippet padrão do Meta Pixel.
 */
export function useInjectTag(chave) {
  useEffect(() => {
    let cancelled = false;

    async function inject() {
      try {
        const configs = await base44.entities.ConfiguracaoSite.list("-created_date", 200);
        if (cancelled) return;

        const cfg = configs.find((c) => c.chave === chave);
        if (!cfg?.valor?.trim()) return;

        // Remove tag antiga se existir (por re-renders)
        const existing = document.getElementById(`inject-${chave}`);
        if (existing) existing.remove();

        const wrapper = document.createElement("div");
        wrapper.id = `inject-${chave}`;

        if (chave === "meta_pixel_id") {
          const pixelId = cfg.valor.trim();
          const script = document.createElement("script");
          script.textContent = `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `;
          wrapper.appendChild(script);

          const noscript = document.createElement("noscript");
          noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
          wrapper.appendChild(noscript);
        } else {
          // Google tag — injeta o HTML bruto
          wrapper.innerHTML = cfg.valor;
          // Move scripts para o head
          const scripts = wrapper.querySelectorAll("script");
          scripts.forEach((s) => {
            const newScript = document.createElement("script");
            if (s.src) newScript.src = s.src;
            if (s.async) newScript.async = true;
            if (s.textContent) newScript.textContent = s.textContent;
            document.head.appendChild(newScript);
          });
          return; // não appenda wrapper, já appendou scripts
        }

        document.head.appendChild(wrapper);
      } catch (e) {
        // silencia erros de tag
      }
    }

    inject();
    return () => { cancelled = true; };
  }, [chave]);
}
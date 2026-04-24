import { useEffect } from "react";

/**
 * Hook para injetar meta tags de SEO dinamicamente por página/post.
 * Atualiza title, description, og:*, twitter:* e JSON-LD no <head>.
 */
export function useSEO({ title, description, image, url, type = "website", jsonLd = null }) {
  useEffect(() => {
    const baseTitle = "Boaventura Consórcios";
    const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | Consórcio de Imóvel, Carro e Investimento`;
    const finalDesc = description || "Consultoria especializada em consórcio de imóvel, carro, moto e investimento. Atendimento digital para todo o Brasil.";
    const finalImage = image || "https://media.base44.com/images/public/69d64dae29b83dcc9fe91dc8/eb16c2ad6_fadd51044_APRESENTACAOPAULApdf.png";
    const finalUrl = url || window.location.href;

    // Title
    document.title = fullTitle;

    // Helper para setar/criar meta
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrValue] = selector.replace("meta[", "").replace("]", "").split('="');
        el.setAttribute(attrName, attrValue.replace('"', ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", finalDesc);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", finalDesc);
    setMeta('meta[property="og:image"]', "content", finalImage);
    setMeta('meta[property="og:url"]', "content", finalUrl);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", finalDesc);
    setMeta('meta[name="twitter:image"]', "content", finalImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", finalUrl);

    // JSON-LD dinâmico
    const existingLd = document.querySelector('script[data-dynamic-ld]');
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-dynamic-ld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup: ao sair da página, restaura o title padrão
    return () => {
      document.title = `${baseTitle} | Consórcio de Imóvel, Carro e Investimento – Salvador, BA`;
    };
  }, [title, description, image, url, type, jsonLd]);
}
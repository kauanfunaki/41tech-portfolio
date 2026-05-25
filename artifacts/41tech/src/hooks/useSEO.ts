import { useEffect } from "react";

const SITE_NAME = "Kauan Funaki";
const DEFAULT_DESC =
  "Desenvolvedor Full Stack focado em transformar operação real em sistemas, automações e inteligência de dados.";
const DEFAULT_IMAGE = "/opengraph.jpg";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

function setMetaTag(
  attr: string,
  content: string,
  attrType: "name" | "property" = "name"
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attrType}="${attr}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrType, attr);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;

    // Standard meta
    setMetaTag("description", description);

    // Open Graph
    setMetaTag("og:title", fullTitle, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:site_name", SITE_NAME, "property");
    setMetaTag("og:image", image, "property");

    // Twitter / X
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);
  }, [fullTitle, description, image]);
}

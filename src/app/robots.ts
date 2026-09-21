import { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

/**
 * /_next/ non va bloccato: contiene CSS, JavaScript e immagini ottimizzate
 * (/_next/image) che Google deve scaricare per vedere la pagina come l'utente.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

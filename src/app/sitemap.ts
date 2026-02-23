import { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { locales } from "@/src/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const routes = ["", "/camere", "/servizi", "/territorio", "/prenota", "/contatti"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Genera entry per ogni locale e route
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route === "" ? "" : route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}

import { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { locales } from "@/src/lib/i18n";
import { rooms } from "@/src/data/rooms/rooms";
import { guideSlugs } from "@/src/data/guide/guides";

const STATIC_SEGMENTS = [
  "",
  "/camere",
  "/servizi",
  "/servizi/transfer-aeroporto-crotone",
  "/territorio",
  "/guida",
  "/prenota",
  "/contatti",
  "/faq",
  "/bandiera-blu-2026-capo-rizzuto",
  "/privacy",
  "/cookie",
  "/termini",
  "/partner",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const seg of STATIC_SEGMENTS) {
      const url = `${baseUrl}/${locale}${seg === "" ? "" : seg}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: seg === "" ? "daily" : "weekly",
        priority: seg === "" ? 1.0 : 0.8,
      });
    }

    for (const room of rooms) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/camere/${room.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }

    for (const slug of guideSlugs) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/guida/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}

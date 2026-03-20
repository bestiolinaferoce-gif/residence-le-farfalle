import { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { locales } from "@/src/lib/i18n";
import { rooms } from "@/src/data/rooms/rooms";

const STATIC_SEGMENTS = [
  "",
  "/camere",
  "/servizi",
  "/territorio",
  "/prenota",
  "/contatti",
  "/faq",
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
  }

  return sitemapEntries;
}

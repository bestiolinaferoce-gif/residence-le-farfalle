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

/**
 * Data dell'ultima revisione dei contenuti: aggiornarla quando cambiano i testi.
 * Prima ogni build dichiarava "modificato adesso" per tutte le URL, segnale che
 * Google impara a ignorare.
 */
const CONTENT_UPDATED = new Date("2026-09-21");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const segments = [
    ...STATIC_SEGMENTS,
    ...rooms.map((r) => `/camere/${r.slug}`),
    ...guideSlugs.map((s) => `/guida/${s}`),
  ];

  // Ogni URL dichiara le versioni nelle altre lingue (hreflang reciproci) e x-default.
  return segments.flatMap((seg) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${seg}`,
      lastModified: CONTENT_UPDATED,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${seg}`])),
          "x-default": `${baseUrl}/it${seg}`,
        },
      },
    }))
  );
}

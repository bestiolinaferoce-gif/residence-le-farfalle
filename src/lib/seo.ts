import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

const baseUrl = () => siteConfig.url.replace(/\/$/, "");

/**
 * Canonical + hreflang per pagine sotto /[locale]/...
 * @param segment es. "camere", "servizi", "camere/limone"
 */
export function pageAlternates(
  locale: string,
  segment: string
): NonNullable<Metadata["alternates"]> {
  const root = baseUrl();
  const l = locale || "it";
  const path = segment ? `/${segment}` : "";
  return {
    canonical: `${root}/${l}${path}`,
    languages: {
      it: `${root}/it${path}`,
      en: `${root}/en${path}`,
      de: `${root}/de${path}`,
    },
  };
}

/**
 * Configurazione internazionalizzazione (i18n)
 * Supporta: IT, EN, DE
 */

export const locales = ["it", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
};

/** Normalizza un segmento di path o parametro a una lingua supportata. */
export function toLocale(value: string | undefined | null): Locale {
  return (locales as readonly string[]).includes(value ?? "") ? (value as Locale) : defaultLocale;
}

/** Tag BCP 47 per Intl (date, numeri, valute). */
export const intlLocale: Record<Locale, string> = {
  it: "it-IT",
  en: "en-GB",
  de: "de-DE",
};

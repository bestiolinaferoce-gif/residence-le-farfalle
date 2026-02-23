/**
 * Utility per gestione calendario e prenotazioni
 */

import { format } from "date-fns";
import { it } from "date-fns/locale";

/**
 * Formatta una data per visualizzazione
 */
export function formatDate(date: Date, locale: string = "it"): string {
  // Per ora supporta solo italiano, estendere se necessario
  const localeMap: Record<string, typeof it> = {
    it,
    // en: require("date-fns/locale/en"),
    // de: require("date-fns/locale/de"),
  };
  const selectedLocale = localeMap[locale] || it;
  return format(date, "dd MMMM yyyy", { locale: selectedLocale });
}

/**
 * Verifica se una data è disponibile per prenotazione
 */
export function isDateAvailable(date: Date, bookedDates: Date[]): boolean {
  return !bookedDates.some(
    (booked) => format(date, "yyyy-MM-dd") === format(booked, "yyyy-MM-dd")
  );
}

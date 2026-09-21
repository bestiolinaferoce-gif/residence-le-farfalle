/**
 * Recensioni Residence Le Farfalle
 * 
 * IMPORTANTE:
 * - NON inventare recensioni "verificate"
 * - NON usare placeholder in produzione
 * - Aggiungere solo recensioni reali da Booking, Google, o clienti diretti
 * - Mantenere formato JSON compatibile per import/export
 */

import reviewsData from "./reviews.json";

export interface Review {
  id: string;
  source: "Booking.com" | "Google" | "Diretta" | "Esempio";
  authorName: string;
  authorCountry?: string; // es. "Italia", "Germania"
  rating: number; // Booking.com: 1-10, Google: 1-5
  date: string; // YYYY-MM-DD
  text: string;
  lang: "it" | "en" | "de" | "fr";
  sourceUrl?: string; // URL recensione originale (se disponibile)
  isPlaceholder?: boolean; // true solo per esempi
}

export const reviews: Review[] = reviewsData as Review[];

// Filtra solo recensioni reali (non placeholder)
export const realReviews = reviews.filter((r) => !r.isPlaceholder);

/*
 * Nessuna media calcolata qui. Le recensioni di questo file sono una selezione
 * (Booking.com 1–10 e Google 1–5): una media su di esse non corrisponde al
 * punteggio ufficiale e produceva il "9,8 su 17 recensioni" in homepage, mentre
 * Booking.com mostrava 9,4 su 44. Il punteggio pubblico è in siteConfig.bookingScore.
 */

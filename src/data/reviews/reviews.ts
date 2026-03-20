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

// Calcola statistiche solo se ci sono recensioni reali
export const getReviewStats = () => {
  const real = realReviews;
  if (real.length === 0) return null;

  const average10 =
    real.reduce((sum, r) => sum + (r.source === "Google" ? r.rating * 2 : r.rating), 0) /
    real.length;
  const count = real.length;

  return {
    average10: Math.round(average10 * 10) / 10, // 1 decimale
    count,
  };
};

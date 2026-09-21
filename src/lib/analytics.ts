import { track } from "@vercel/analytics";

/**
 * Eventi di conversione, inviati agli strumenti GIÀ presenti nel sito:
 * - Vercel Web Analytics (cookieless, sempre attivo): eventi personalizzati
 *   visibili nel pannello Analytics se il piano Vercel li include;
 * - GA4 solo se configurato e con consenso (window.gtag esiste solo allora).
 *
 * Nessun dato personale: niente nomi, email, telefoni, date o testo dei messaggi.
 * I parametri ammessi sono etichette tecniche (tipo di form, posizione del link).
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  try {
    track(eventName, params);
  } catch {
    // analytics non disponibile (es. sviluppo locale): ignora
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export const GA_EVENTS = {
  clickPhone: (placement = "unknown") => trackEvent("click_phone", { placement }),
  clickWhatsapp: (placement = "unknown") => trackEvent("click_whatsapp", { placement }),
  clickEmail: (placement = "unknown") => trackEvent("click_email", { placement }),
  /** Primo campo compilato nel modulo: misura l'apertura reale del preventivo. */
  formStart: (formType: "preventivo" | "contact") => trackEvent("form_start", { form_type: formType }),
  formSubmitPreventivo: () => trackEvent("form_submit_success", { form_type: "preventivo" }),
  formSubmitContact: () => trackEvent("form_submit_success", { form_type: "contact" }),
  formSubmitError: (formType: "preventivo" | "contact", reason: string) =>
    trackEvent("form_submit_error", { form_type: formType, reason }),
  ctaClick: (label: string) => trackEvent("cta_click", { cta_label: label }),
  roomView: (roomSlug: string) => trackEvent("room_view", { room: roomSlug }),
  externalLinkBooking: (platform: string) => trackEvent("external_link", { platform }),
};

// Utility per eventi GA4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export const GA_EVENTS = {
  clickPhone: () =>
    trackEvent("click_phone", { event_category: "contact", phone: "+393500979130" }),
  clickWhatsapp: () => trackEvent("click_whatsapp", { event_category: "contact" }),
  clickEmail: () => trackEvent("click_email", { event_category: "contact" }),
  formSubmitPreventivo: () =>
    trackEvent("form_submit", { event_category: "lead", form_type: "preventivo" }),
  formSubmitContact: () =>
    trackEvent("form_submit", { event_category: "lead", form_type: "contact" }),
  ctaClick: (label: string) =>
    trackEvent("cta_click", { event_category: "conversion", cta_label: label }),
  roomView: (roomName: string) => trackEvent("room_view", { room_name: roomName }),
  externalLinkBooking: (platform: string) =>
    trackEvent(`external_link_${platform}`, { event_category: "external" }),
};

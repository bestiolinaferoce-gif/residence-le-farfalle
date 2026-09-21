/**
 * Navigazione principale (etichette IT / EN / DE).
 * "Richiedi preventivo" non è più una voce di menu: è la CTA fissa dell'header.
 */

export type NavLocale = "it" | "en" | "de";

export const navigation = {
  main: [
    { name: { it: "Camere", en: "Rooms", de: "Zimmer" }, href: "/camere" },
    { name: { it: "Servizi", en: "Services", de: "Leistungen" }, href: "/servizi" },
    { name: { it: "Territorio", en: "The area", de: "Region" }, href: "/territorio" },
    { name: { it: "Guide", en: "Guides", de: "Reiseführer" }, href: "/guida" },
    { name: { it: "FAQ", en: "FAQ", de: "FAQ" }, href: "/faq" },
    { name: { it: "Contatti", en: "Contact", de: "Kontakt" }, href: "/contatti" },
  ],
} as const;

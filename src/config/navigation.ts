/**
 * Configurazione navigazione del sito (etichette IT / EN / DE)
 */

export type NavLocale = "it" | "en" | "de";

export const navigation = {
  main: [
    { name: { it: "Home", en: "Home", de: "Home" }, href: "/" },
    { name: { it: "Camere", en: "Rooms", de: "Zimmer" }, href: "/camere" },
    { name: { it: "Territorio", en: "Area", de: "Region" }, href: "/territorio" },
    {
      name: { it: "Servizi & Partner", en: "Services & Partners", de: "Service & Partner" },
      href: "/servizi",
    },
    {
      name: { it: "Richiedi Preventivo", en: "Request a quote", de: "Angebot anfragen" },
      href: "/prenota",
    },
    { name: { it: "Contatti", en: "Contact", de: "Kontakt" }, href: "/contatti" },
    { name: { it: "FAQ", en: "FAQ", de: "FAQ" }, href: "/faq" },
  ],
} as const;

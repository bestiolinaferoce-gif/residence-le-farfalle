/**
 * Titoli e descrizioni SEO per lingua (IT / EN / DE).
 * Usare con `pageAlternates()` per canonical/hreflang.
 */

import type { Locale } from "@/src/lib/i18n";

export function resolvePageLocaleParam(raw: string | undefined): Locale {
  if (raw === "en" || raw === "de") return raw;
  return "it";
}

type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
};

const brand = "Residence Le Farfalle";
const place = "Isola di Capo Rizzuto";

export const pageMetadata = {
  home: {
    it: {
      title: `${brand}: B&B con colazione a ${place} (KR)`,
      description:
        "4 camere matrimoniali con bagno privato nel centro di Isola di Capo Rizzuto, a circa 6 km dalle spiagge dell'Area Marina Protetta. Colazione inclusa.",
      keywords: [
        "residence Isola di Capo Rizzuto",
        "camere Crotone",
        "bed and breakfast Calabria",
        `vacanze ${place}`,
        "alloggio Calabria ionica",
        "residence Area Marina Protetta Capo Rizzuto",
      ],
    },
    en: {
      title: `${brand}: B&B with breakfast, ${place}`,
      description:
        "Four double rooms with private bathroom in the centre of Isola di Capo Rizzuto, about 6 km from the Marine Protected Area beaches. Breakfast, air conditioning, WiFi.",
      keywords: [
        "guesthouse Isola di Capo Rizzuto",
        "rooms Crotone Calabria",
        "bed and breakfast Calabria Ionian",
        `holiday ${place}`,
        "Capo Rizzuto marine protected area lodging",
      ],
    },
    de: {
      title: `${brand}: Zimmer & Frühstück, ${place}`,
      description:
        "Vier Doppelzimmer mit eigenem Bad im Zentrum von Isola di Capo Rizzuto, ca. 6 km von den Stränden des Meeresschutzgebiets. Frühstück, Klimaanlage, WLAN.",
      keywords: [
        "Unterkunft Isola di Capo Rizzuto",
        "Zimmer Crotone Kalabrien",
        "Frühstückspension Ionisches Meer Kalabrien",
        "Urlaub Capo Rizzuto Meeresschutzgebiet",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  camere: {
    it: {
      title: `Camere matrimoniali a ${place} | ${brand}`,
      description:
        "4 camere indipendenti (8 posti totali, 2 ospiti per camera) con bagno privato, aria condizionata, WiFi e colazione inclusa. Isola di Capo Rizzuto, Calabria.",
      keywords: [
        `camere ${place}`,
        "camere Crotone",
        "residence Calabria",
        "camere con bagno privato",
        "alloggio Isola di Capo Rizzuto",
      ],
    },
    en: {
      title: `Double rooms in ${place} | ${brand}`,
      description:
        "Four independent rooms (eight guests total, two per room) with private bathroom, A/C, WiFi and breakfast included. Isola di Capo Rizzuto, Calabria.",
      keywords: [
        `rooms ${place}`,
        "Crotone accommodation",
        "Calabria guesthouse private bathroom",
        "Capo Rizzuto B&B rooms",
      ],
    },
    de: {
      title: `Doppelzimmer in ${place} | ${brand}`,
      description:
        "Vier separate Zimmer (8 Gäste gesamt, 2 pro Zimmer) mit eigenem Bad, Klimaanlage, WLAN und Frühstück inklusive. Isola di Capo Rizzuto, Kalabrien.",
      keywords: [
        "Zimmer Isola di Capo Rizzuto",
        "Unterkunft Crotone Kalabrien",
        "Pension Kalabrien Ionisches Meer",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  servizi: {
    it: {
      title: `Servizi e partner - ${brand}`,
      description:
        "Colazione inclusa, WiFi, aria condizionata, parcheggio. Scopri anche servizi utili sul territorio: farmacie, transfer, escursioni. Isola di Capo Rizzuto.",
      keywords: [
        "servizi residence",
        "colazione inclusa Calabria",
        "WiFi gratuito",
        `parcheggio ${place}`,
        "transfer aeroporto Crotone",
      ],
    },
    en: {
      title: `Services & partners - ${brand}`,
      description:
        "Breakfast included, WiFi, air conditioning, parking. Useful local services: pharmacies, transfers, excursions. Isola di Capo Rizzuto.",
      keywords: [
        "guesthouse services Calabria",
        "breakfast included Capo Rizzuto",
        "airport transfer Crotone",
      ],
    },
    de: {
      title: `Service & Partner - ${brand}`,
      description:
        "Frühstück inklusive, WLAN, Klimaanlage, Parkplatz. Nützliche Services vor Ort: Apotheken, Transfers, Ausflüge. Isola di Capo Rizzuto.",
      keywords: [
        "Service Pension Kalabrien",
        "Frühstück inklusive Capo Rizzuto",
        "Transfer Flughafen Crotone",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  territorio: {
    it: {
      title: `Il territorio - ${place} e Calabria ionica`,
      description:
        "Guida a Isola di Capo Rizzuto: Area Marina Protetta, spiagge, Le Castella e borghi. Itinerari e consigli per la vacanza in Calabria ionica.",
      keywords: [
        place,
        "Calabria ionica",
        "spiagge Calabria",
        "Area Marina Protetta Capo Rizzuto",
        "Le Castella",
        "Crotone",
      ],
    },
    en: {
      title: `The area - ${place} and the Ionian coast`,
      description:
        "Discover Isola di Capo Rizzuto: Marine Protected Area, beaches, Le Castella and nearby towns. Practical tips for your stay on the Calabrian Ionian coast.",
      keywords: [
        "Isola di Capo Rizzuto guide",
        "Capo Rizzuto marine reserve beaches",
        "Le Castella Calabria",
        "Crotone day trips",
      ],
    },
    de: {
      title: `Die Region - ${place} und ionische Küste`,
      description:
        "Isola di Capo Rizzuto: Meeresschutzgebiet, Strände, Le Castella und Umgebung. Tipps für Ihren Aufenthalt an der ionischen Küste Kalabriens.",
      keywords: [
        "Isola di Capo Rizzuto Reise",
        "Capo Rizzuto Strände",
        "Le Castella Kalabrien",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  partner: {
    it: {
      title: `Partner e servizi utili - ${brand}`,
      description:
        "Farmacie, numeri utili, alimentari, transfer, noleggi ed esperienze. Contatti di riferimento per la vacanza a Isola di Capo Rizzuto.",
      keywords: [
        `farmacie ${place}`,
        "transfer aeroporto",
        "escursioni Calabria",
        `servizi utili ${place}`,
      ],
    },
    en: {
      title: `Partners & local services - ${brand}`,
      description:
        "Pharmacies, emergency numbers, groceries, transfers, rentals and experiences — curated contacts for your stay in Isola di Capo Rizzuto.",
      keywords: [
        "Isola di Capo Rizzuto pharmacy",
        "local services Capo Rizzuto",
        "Calabria excursions",
      ],
    },
    de: {
      title: `Partner & lokale Services - ${brand}`,
      description:
        "Apotheken, Notrufe, Lebensmittel, Transfers, Vermietung und Erlebnisse — ausgewählte Kontakte für Isola di Capo Rizzuto.",
      keywords: [
        "Apotheke Isola di Capo Rizzuto",
        "Transfer Kalabrien",
        "Ausflüge Capo Rizzuto",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  prenota: {
    it: {
      title: `Richiedi disponibilità e prezzo | ${brand}`,
      description:
        `Chiedi disponibilità e prezzo per 1–4 camere (fino a 8 ospiti) a ${place}, senza impegno. Rispondiamo in genere entro 24 ore: email, telefono o WhatsApp.`,
      keywords: [
        `prenotazioni ${place}`,
        "preventivo residence Calabria",
        "richiesta disponibilità Capo Rizzuto",
      ],
    },
    en: {
      title: `Check availability and price | ${brand}`,
      description:
        `Ask for availability and price for 1–4 rooms (up to 8 guests) in ${place}, no obligation. We usually reply within 24 hours by email, phone or WhatsApp.`,
      keywords: [
        "book Isola di Capo Rizzuto",
        "quote guesthouse Calabria",
        "Residence Le Farfalle booking",
      ],
    },
    de: {
      title: `Verfügbarkeit und Preis anfragen | ${brand}`,
      description:
        `Verfügbarkeit und Preis für 1–4 Zimmer (bis 8 Gäste) in ${place} anfragen, unverbindlich. Antwort meist innerhalb von 24 Stunden.`,
      keywords: [
        "Buchung Isola di Capo Rizzuto",
        "Angebot Pension Kalabrien",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  contatti: {
    it: {
      title: `Contatti - ${brand} ${place}`,
      description:
        `Telefono, email e WhatsApp per informazioni e prenotazioni. Siamo a ${place}, vicino all’Area Marina Protetta.`,
      keywords: [
        "contatti Residence Le Farfalle",
        `prenotazioni ${place}`,
        "WhatsApp residence Calabria",
      ],
    },
    en: {
      title: `Contact - ${brand}, ${place}`,
      description:
        "Phone, email and WhatsApp for information and bookings. We are in Isola di Capo Rizzuto, near the Marine Protected Area.",
      keywords: [
        "contact Residence Le Farfalle",
        "book Isola di Capo Rizzuto",
        "WhatsApp Calabria lodging",
      ],
    },
    de: {
      title: `Kontakt - ${brand}, ${place}`,
      description:
        "Telefon, E-Mail und WhatsApp für Auskunft und Buchungen. Standort Isola di Capo Rizzuto, nahe dem Meeresschutzgebiet.",
      keywords: [
        "Kontakt Residence Le Farfalle",
        "Buchung Isola di Capo Rizzuto",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  privacy: {
    it: {
      title: `Privacy Policy - ${brand}`,
      description:
        `Informativa sul trattamento dei dati personali e sui diritti degli interessati — ${brand}, ${place}.`,
    },
    en: {
      title: `Privacy policy - ${brand}`,
      description:
        `Personal data processing notice and data subject rights — ${brand}, ${place}.`,
    },
    de: {
      title: `Datenschutzerklärung - ${brand}`,
      description:
        `Hinweise zur Verarbeitung personenbezogener Daten und zu Ihren Rechten — ${brand}, ${place}.`,
    },
  } satisfies Record<Locale, PageMeta>,

  cookie: {
    it: {
      title: `Cookie Policy - ${brand}`,
      description:
        `Informativa sui cookie e sulle scelte di consenso sul sito ${brand}.`,
    },
    en: {
      title: `Cookie policy - ${brand}`,
      description:
        `Information about cookies and consent choices on the ${brand} website.`,
    },
    de: {
      title: `Cookie-Richtlinie - ${brand}`,
      description:
        `Informationen zu Cookies und Einwilligung auf der Website ${brand}.`,
    },
  } satisfies Record<Locale, PageMeta>,

  blueFlag2026: {
    it: {
      title: `Bandiera Blu 2026 a ${place} | ${brand}`,
      description:
        `${place} è Bandiera Blu 2026. ${brand}: 4 camere in paese, a circa 6 km (10–15 minuti in auto) dalle spiagge dell'Area Marina Protetta.`,
      keywords: [
        "Bandiera Blu 2026",
        `Bandiera Blu ${place}`,
        "spiagge Bandiera Blu Calabria",
        "Area Marina Protetta Capo Rizzuto",
        `${brand}`,
      ],
    },
    en: {
      title: `Blue Flag 2026 in ${place} | ${brand}`,
      description:
        `${place} is a Blue Flag 2026 municipality. ${brand}: 4 rooms in town, about 6 km (10–15 min by car) from the Marine Protected Area beaches.`,
      keywords: [
        "Blue Flag 2026",
        `Blue Flag ${place}`,
        "Calabria Blue Flag beaches",
        "Capo Rizzuto Marine Protected Area",
      ],
    },
    de: {
      title: `Blaue Flagge 2026 in ${place} | ${brand}`,
      description:
        `${place} trägt die Blaue Flagge 2026. ${brand}: 4 Zimmer im Ort, ca. 6 km (10–15 Autominuten) von den Stränden des Schutzgebiets.`,
      keywords: [
        "Blaue Flagge 2026",
        `Blaue Flagge ${place}`,
        "Kalabrien Blaue Flagge",
        "Meeresschutzgebiet Capo Rizzuto",
      ],
    },
  } satisfies Record<Locale, PageMeta>,

  faq: {
    it: {
      title: `Domande frequenti — ${brand}`,
      description:
        `Risposte alle domande più comuni su camere, colazione, check-in, parcheggio e come raggiungere ${place}.`,
    },
    en: {
      title: `FAQ — ${brand}`,
      description:
        `Answers to the most common questions about rooms, breakfast, check-in, parking and how to reach ${place}.`,
    },
    de: {
      title: `Häufige Fragen — ${brand}`,
      description:
        `Antworten auf die häufigsten Fragen zu Zimmern, Frühstück, Check-in, Parkplatz und Anreise nach ${place}.`,
    },
  } satisfies Record<Locale, PageMeta>,

  termini: {
    it: {
      title: `Termini e condizioni - ${brand}`,
      description:
        `Condizioni di prenotazione e di soggiorno presso ${brand}, ${place}.`,
    },
    en: {
      title: `Terms and conditions - ${brand}`,
      description:
        `Booking and stay terms and conditions at ${brand}, ${place}.`,
    },
    de: {
      title: `Allgemeine Geschäftsbedingungen - ${brand}`,
      description:
        `Buchungs- und Aufenthaltsbedingungen bei ${brand}, ${place}.`,
    },
  } satisfies Record<Locale, PageMeta>,
} as const;

export type PageMetadataKey = keyof typeof pageMetadata;

export function getPageMetadata<K extends PageMetadataKey>(
  key: K,
  locale: string | undefined
): (typeof pageMetadata)[K][Locale] {
  const l = resolvePageLocaleParam(locale);
  return pageMetadata[key][l];
}

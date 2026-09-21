/**
 * Partner e sponsor — Residence Le Farfalle
 *
 * Editoriale: elenco di servizi utili / partner di fiducia nel territorio.
 * Aggiungi voci in `partners`: ogni record ha sortOrder (ordinamento globale;
 * in UI si filtra per categoria mantenendo questo ordine tra le card visibili).
 *
 * Logo: opzionale; metti file in `public/images/partners/` e imposta logoSrc (path pubblico).
 * Vedi anche `docs/SPONSORS.md`.
 */

export type PartnerCategory =
  | "farmacie"
  | "guardie-mediche"
  | "supermarket"
  | "ristoranti"
  | "transfer"
  | "noleggio"
  | "escursioni";

/** Badge editoriale (etichette UX, non claim legali) */
export type PartnerBadge = "recommended" | "useful" | "experience";

/** Testo localizzato (it = versione di riferimento) */
export type LocalizedText = { it: string; en: string; de: string };

export interface Partner {
  id: string;
  name: LocalizedText;
  category: PartnerCategory;
  /** Breve testo descrittivo — evita claim su servizi non verificati */
  description: LocalizedText;
  phone?: string;
  link?: string;
  address?: LocalizedText;
  comingSoon?: boolean;
  /** Ordine crescente (0 = tra i primi nella lista globale) */
  sortOrder: number;
  /** Badge opzionale in card */
  badge?: PartnerBadge;
  /** Path pubblico logo, es. /images/partners/nome.webp */
  logoSrc?: string;
  logoAlt?: LocalizedText;
}

export const PARTNER_BADGE_LABELS: Record<
  PartnerBadge,
  { it: string; en: string; de: string }
> = {
  recommended: {
    it: "Consigliato",
    en: "Recommended",
    de: "Empfohlen",
  },
  useful: {
    it: "Servizio utile",
    en: "Useful service",
    de: "Nützlicher Service",
  },
  experience: {
    it: "Esperienza",
    en: "Experience",
    de: "Erlebnis",
  },
};

export type PartnerCategoryLabels = { it: string; en: string; de: string; icon: string };

export const partnerCategories: Record<PartnerCategory, PartnerCategoryLabels> = {
  farmacie: {
    it: "Farmacie",
    en: "Pharmacies",
    de: "Apotheken",
    icon: "pill",
  },
  "guardie-mediche": {
    it: "Guardie mediche / Numeri utili",
    en: "Medical / Emergency numbers",
    de: "Ärztlicher Notdienst / Nummern",
    icon: "phone",
  },
  supermarket: {
    it: "Supermarket / Alimentari",
    en: "Supermarket / Groceries",
    de: "Supermarkt / Lebensmittel",
    icon: "shopping-cart",
  },
  ristoranti: {
    it: "Ristoranti consigliati",
    en: "Recommended restaurants",
    de: "Empfohlene Restaurants",
    icon: "utensils",
  },
  transfer: {
    it: "Transfer / NCC / Taxi",
    en: "Transfer / NCC / Taxi",
    de: "Transfer / Taxi",
    icon: "car",
  },
  noleggio: {
    it: "Noleggio",
    en: "Rental",
    de: "Vermietung",
    icon: "bike",
  },
  escursioni: {
    it: "Escursioni / Diving / Boat",
    en: "Excursions / Diving / Boat",
    de: "Ausflüge / Tauchen / Boot",
    icon: "compass",
  },
};

const localeKey = (raw: string | undefined): "it" | "en" | "de" =>
  raw === "en" || raw === "de" ? raw : "it";

export function getPartnerCategoryLabel(
  category: PartnerCategory,
  locale?: string
): string {
  return partnerCategories[category][localeKey(locale)];
}

/** Restituisce il testo nella lingua richiesta (fallback: italiano) */
export function localizePartnerText(
  text: LocalizedText,
  locale?: string
): string {
  return text[localeKey(locale)] || text.it;
}

export function getPartnerBadgeLabel(
  badge: PartnerBadge,
  locale?: string
): string {
  return PARTNER_BADGE_LABELS[badge][localeKey(locale)];
}

/** Intro sezione homepage / pagina partner — multilingua */
export const partnerSectionCopy = {
  it: {
    kicker: "Ti aiutiamo a organizzare il soggiorno",
    title: "Servizi utili e partner nel territorio",
    subtitle:
      "Dalla farmacia al mare: indicazioni pratiche e collegamenti di riferimento vicino a Isola di Capo Rizzuto e all’Area Marina Protetta.",
    allLabel: "Tutti",
    seeAll: "Vedi tutti",
    pillars: [
      { title: "Vicino alla struttura", body: "Alimentari, sanità, numeri essenziali." },
      { title: "Partner di fiducia", body: "Solo voci curate e aggiornabili nel tempo." },
      { title: "Esperienze", body: "Transfer, noleggi e idee per esplorare la costa." },
    ],
  },
  en: {
    kicker: "We help you plan your stay",
    title: "Useful services and local partners",
    subtitle:
      "From pharmacies to the sea: practical pointers and trusted contacts near Isola di Capo Rizzuto and the Marine Protected Area.",
    allLabel: "All",
    seeAll: "See all",
    pillars: [
      { title: "Near the property", body: "Groceries, health, essential numbers." },
      { title: "Trusted partners", body: "Curated entries, updated over time." },
      { title: "Experiences", body: "Transfers, rentals and ideas to explore the coast." },
    ],
  },
  de: {
    kicker: "Wir helfen bei der Planung Ihres Aufenthalts",
    title: "Nützliche Services und Partner vor Ort",
    subtitle:
      "Von der Apotheke bis zum Meer: praktische Hinweise und Kontakte nahe Isola di Capo Rizzuto und dem Meeresschutzgebiet.",
    allLabel: "Alle",
    seeAll: "Alle anzeigen",
    pillars: [
      { title: "Nahe der Unterkunft", body: "Lebensmittel, Gesundheit, wichtige Nummern." },
      { title: "Vertrauenspartner", body: "Redaktionell gepflegte, aktualisierbare Einträge." },
      { title: "Erlebnisse", body: "Transfers, Verleih und Ideen für die Küste." },
    ],
  },
} as const;

export function getPartnerSectionCopy(locale?: string) {
  const l = localeKey(locale);
  return partnerSectionCopy[l];
}

export const partners: Partner[] = [
  {
    id: "farmacia-1",
    name: {
      it: "Farmacie di zona",
      en: "Local pharmacies",
      de: "Apotheken vor Ort",
    },
    category: "farmacie",
    description: {
      it: "Elenco farmacie e turno: verificare in loco o sui canali del Comune / ASL. Non pubblichiamo numeri di terzi non verificati.",
      en: "Pharmacy list and on-duty rota: please check locally or via the Municipality / local health authority (ASL) channels. We do not publish unverified third-party numbers.",
      de: "Apothekenliste und Notdienst: bitte vor Ort oder über die Kanäle der Gemeinde / der örtlichen Gesundheitsbehörde (ASL) prüfen. Wir veröffentlichen keine ungeprüften Nummern Dritter.",
    },
    address: {
      it: "Isola di Capo Rizzuto — centro",
      en: "Isola di Capo Rizzuto — town centre",
      de: "Isola di Capo Rizzuto — Ortszentrum",
    },
    sortOrder: 10,
    badge: "useful",
  },
  {
    id: "guardia-medica",
    name: {
      it: "Emergenza sanitaria",
      en: "Medical emergencies",
      de: "Medizinischer Notfall",
    },
    category: "guardie-mediche",
    description: {
      it: "In caso di emergenza utilizzare il 118.",
      en: "In an emergency, call 118.",
      de: "Im Notfall wählen Sie die 118.",
    },
    phone: "118",
    sortOrder: 20,
    badge: "useful",
  },
  {
    id: "carabinieri",
    name: { it: "Carabinieri", en: "Carabinieri", de: "Carabinieri" },
    category: "guardie-mediche",
    description: {
      it: "Stazione Carabinieri — Isola di Capo Rizzuto",
      en: "Carabinieri (police) station — Isola di Capo Rizzuto",
      de: "Carabinieri-Station (Polizei) — Isola di Capo Rizzuto",
    },
    phone: "+39 0962 799010",
    sortOrder: 30,
    badge: "useful",
  },
  {
    id: "supermarket-1",
    name: {
      it: "Supermercato e alimentari",
      en: "Supermarket and groceries",
      de: "Supermarkt und Lebensmittel",
    },
    category: "supermarket",
    description: {
      it: "Punto acquisto quotidiano a breve distanza dalla struttura.",
      en: "Everyday shopping a short distance from the property.",
      de: "Einkaufsmöglichkeit für den täglichen Bedarf nicht weit von der Unterkunft.",
    },
    address: {
      it: "Isola di Capo Rizzuto — centro",
      en: "Isola di Capo Rizzuto — town centre",
      de: "Isola di Capo Rizzuto — Ortszentrum",
    },
    sortOrder: 40,
    badge: "useful",
  },
  {
    id: "ristorante-1",
    name: {
      it: "Ristoranti in zona",
      en: "Local restaurants",
      de: "Restaurants in der Umgebung",
    },
    category: "ristoranti",
    description: {
      it: "Segnalazioni e indirizzi su richiesta — aggiorniamo l’elenco con partner verificati.",
      en: "Tips and addresses on request — we update the list with verified partners.",
      de: "Empfehlungen und Adressen auf Anfrage — wir ergänzen die Liste um geprüfte Partner.",
    },
    comingSoon: true,
    sortOrder: 50,
    badge: "recommended",
  },
  {
    id: "transfer-1",
    name: {
      it: "Transfer e collegamenti",
      en: "Transfers and connections",
      de: "Transfers und Verbindungen",
    },
    category: "transfer",
    description: {
      it: "NCC / taxi su prenotazione (es. Lamezia Terme, Crotone). Contattateci per referenze aggiornate.",
      en: "Private driver (NCC) / taxi on request (e.g. Lamezia Terme, Crotone). Contact us for up-to-date recommendations.",
      de: "Mietwagen mit Fahrer (NCC) / Taxi auf Vorbestellung (z. B. Lamezia Terme, Crotone). Kontaktieren Sie uns für aktuelle Empfehlungen.",
    },
    comingSoon: true,
    sortOrder: 60,
    badge: "experience",
  },
  {
    id: "noleggio-1",
    name: {
      it: "Noleggio bici e scooter",
      en: "Bike and scooter rental",
      de: "Fahrrad- und Rollerverleih",
    },
    category: "noleggio",
    description: {
      it: "Soluzioni su richiesta per muoversi lungo la costa.",
      en: "Options on request for getting around the coast.",
      de: "Lösungen auf Anfrage, um sich entlang der Küste fortzubewegen.",
    },
    comingSoon: true,
    sortOrder: 70,
    badge: "experience",
  },
  {
    id: "escursioni-1",
    name: {
      it: "Mare e Area Marina Protetta",
      en: "Sea and Marine Protected Area",
      de: "Meer und Meeresschutzgebiet",
    },
    category: "escursioni",
    description: {
      it: "Gite in barca, snorkeling e itinerari nell’area marina: idee da integrare con fornitori locali di fiducia.",
      en: "Boat trips, snorkelling and routes in the marine area: ideas to be arranged with trusted local providers.",
      de: "Bootsausflüge, Schnorcheln und Routen im Meeresschutzgebiet: Ideen, die mit vertrauenswürdigen lokalen Anbietern ergänzt werden.",
    },
    comingSoon: true,
    sortOrder: 80,
    badge: "experience",
  },
];

/** Partner ordinati per `sortOrder` (stabile per filtri categoria) */
export function getPartnersSorted(list: Partner[] = partners): Partner[] {
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

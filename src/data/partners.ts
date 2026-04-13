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

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  /** Breve testo descrittivo — evita claim su servizi non verificati */
  description: string;
  phone?: string;
  link?: string;
  address?: string;
  comingSoon?: boolean;
  /** Ordine crescente (0 = tra i primi nella lista globale) */
  sortOrder: number;
  /** Badge opzionale in card */
  badge?: PartnerBadge;
  /** Path pubblico logo, es. /images/partners/nome.webp */
  logoSrc?: string;
  logoAlt?: string;
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
      { title: "Trusted partners", body: "Curated entries you can update over time." },
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
    name: "Farmacie di zona",
    category: "farmacie",
    description:
      "Elenco farmacie e turno: verificare in loco o sui canali del Comune / ASL. Non pubblichiamo numeri di terzi non verificati.",
    address: "Isola di Capo Rizzuto — centro",
    sortOrder: 10,
    badge: "useful",
  },
  {
    id: "guardia-medica",
    name: "Emergenza sanitaria",
    category: "guardie-mediche",
    description: "In caso di emergenza utilizzare il 118.",
    phone: "118",
    sortOrder: 20,
    badge: "useful",
  },
  {
    id: "carabinieri",
    name: "Carabinieri",
    category: "guardie-mediche",
    description: "Stazione Carabinieri — Isola di Capo Rizzuto",
    phone: "+39 0962 799010",
    sortOrder: 30,
    badge: "useful",
  },
  {
    id: "supermarket-1",
    name: "Supermercato e alimentari",
    category: "supermarket",
    description: "Punto acquisto quotidiano a breve distanza dalla struttura.",
    address: "Isola di Capo Rizzuto — centro",
    sortOrder: 40,
    badge: "useful",
  },
  {
    id: "ristorante-1",
    name: "Ristoranti in zona",
    category: "ristoranti",
    description: "Segnalazioni e indirizzi su richiesta — aggiorniamo l’elenco con partner verificati.",
    comingSoon: true,
    sortOrder: 50,
    badge: "recommended",
  },
  {
    id: "transfer-1",
    name: "Transfer e collegamenti",
    category: "transfer",
    description:
      "NCC / taxi su prenotazione (es. Lamezia Terme, Crotone). Contattateci per referenze aggiornate.",
    comingSoon: true,
    sortOrder: 60,
    badge: "experience",
  },
  {
    id: "noleggio-1",
    name: "Noleggio bici e scooter",
    category: "noleggio",
    description: "Soluzioni su richiesta per muoversi lungo la costa.",
    comingSoon: true,
    sortOrder: 70,
    badge: "experience",
  },
  {
    id: "escursioni-1",
    name: "Mare e Area Marina Protetta",
    category: "escursioni",
    description:
      "Gite in barca, snorkeling e itinerari nell’area marina: idee da integrare con fornitori locali di fiducia.",
    comingSoon: true,
    sortOrder: 80,
    badge: "experience",
  },
];

/** Partner ordinati per `sortOrder` (stabile per filtri categoria) */
export function getPartnersSorted(list: Partner[] = partners): Partner[] {
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

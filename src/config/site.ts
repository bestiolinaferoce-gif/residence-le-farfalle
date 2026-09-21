/**
 * Configurazione generale del sito — Residence Le Farfalle
 */

/** Email di contatto ufficiale (form, footer, privacy, structured data) */
export const CONTACT_EMAIL = "lefarfallecaporizzuto@gmail.com" as const;

const resolvedSiteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "") ||
  "https://www.residencelefarfalle.com";

/** P.IVA o codice fiscale titolare (opzionale — variabile d'ambiente) */
const vatOrCf = (process.env.NEXT_PUBLIC_VAT_OR_CF ?? "").trim();

/** CIN struttura (D.L. 39/2023) */
export const STRUCTURE_CIN = "IT101013C2I8M3ARTU" as const;

export const siteConfig = {
  name: "Residence Le Farfalle",
  description: {
    it: "4 camere indipendenti (8 posti totali) con bagno privato a Isola di Capo Rizzuto, Calabria. Colazione inclusa, WiFi superfast, aria condizionata.",
    en: "4 independent rooms (8 guests total) with private bathroom in Isola di Capo Rizzuto, Calabria. Breakfast included, superfast WiFi, air conditioning.",
    de: "4 unabhängige Zimmer (8 Gäste gesamt) mit eigenem Bad in Isola di Capo Rizzuto, Kalabrien. Frühstück inklusive, superschnelles WLAN, Klimaanlage.",
  },
  url: resolvedSiteUrl,
  address: "Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)",
  /**
   * NAP per dati strutturati e Google Business Profile.
   * DA CONFERMARE: numero civico (assente ovunque, anche su Booking.com).
   */
  postalAddress: {
    street: "Via Capo delle Colonne",
    locality: "Isola di Capo Rizzuto",
    region: "KR",
    postalCode: "88841",
  },
  ogImageAlt: {
    it: "Camera matrimoniale del Residence Le Farfalle, Isola di Capo Rizzuto",
    en: "Double room at Residence Le Farfalle, Isola di Capo Rizzuto",
    de: "Doppelzimmer im Residence Le Farfalle, Isola di Capo Rizzuto",
  },
  /** Orari unici per FAQ, contatti e JSON-LD (check-out da confermare: in passato compariva anche 10:00). */
  stay: {
    checkIn: "14:00",
    checkOut: "11:00",
    maxGuests: 8,
    rooms: 4,
    guestsPerRoom: 2,
  },
  coordinates: {
    lat: 38.96171494411169,
    lng: 17.09162398176466,
  },
  contacts: {
    phone: "+39 3500979130",
    email: CONTACT_EMAIL,
    whatsapp: "+39 3500979130",
  },
  /** Social / OTA: valorizzare su Vercel o qui quando disponibili */
  social: {
    // TODO: inserire URL reale — es. "https://www.facebook.com/residencelefarfalle"
    facebook: "",
    // TODO: inserire URL reale — es. "https://www.instagram.com/residencelefarfalle"
    instagram: "",
    // TODO: inserire URL reale — es. "https://www.tripadvisor.it/Hotel_Review-..."
    tripadvisor: "",
    // TODO: inserire URL reale — es. "https://maps.google.com/?cid=..."
    google_business: "",
  },
  booking: {
    // TODO: inserire URL reale — es. "https://www.airbnb.it/rooms/..."
    airbnb: "",
    // Listing ufficiale verificato (vedi `bookingScore`).
    booking_com:
      "https://www.booking.com/hotel/it/residence-le-farfalle-isola-di-capo-rizzuto.it.html",
  },
  /**
   * Tariffa minima comunicata pubblicamente, in euro a notte.
   * Unica fonte: usata nell'hero, nelle card camera e nei dati strutturati.
   * Aggiornare qui e resta coerente ovunque, Google incluso.
   */
  pricing: {
    fromEur: 90,
    currency: "EUR",
    /**
     * Cosa comprende il "da €…": mostrato accanto al prezzo in ogni pagina.
     * DA CONFERMARE con la proprietà: la pagina /camere mostrava "da €70",
     * in contrasto con questo valore. Non è una tariffa garantita.
     */
    basis: {
      it: "a notte per camera doppia, colazione inclusa. Tariffa minima indicativa: varia per date e durata, il prezzo esatto è nel preventivo.",
      en: "per night for a double room, breakfast included. Indicative minimum rate: it varies with dates and length of stay; the exact price is in your quote.",
      de: "pro Nacht im Doppelzimmer inkl. Frühstück. Unverbindlicher Mindestpreis: abhängig von Reisedaten und Aufenthaltsdauer, den genauen Preis nennen wir im Angebot.",
    },
  },
  /**
   * Punteggio ufficiale Booking.com, trascritto dalla pagina pubblica della struttura.
   * Aggiornare a mano insieme a `checkedAt`: il sito non lo ricalcola dalle
   * recensioni pubblicate qui, che sono solo una selezione.
   */
  bookingScore: {
    score: 9.4,
    scale: 10,
    reviewCount: 44,
    checkedAt: "2026-09-21",
  },
  /**
   * Distanze in auto dalla struttura (OpenStreetMap + OSRM, senza traffico,
   * verificate il 2026-09-21). La struttura è nel centro abitato, non sul mare.
   */
  distances: {
    nearestBeachKm: 6,
    nearestBeachMin: "10–15",
    seaAsCrowFliesKm: 5,
    leCastellaKm: 11,
    leCastellaMin: 15,
    capoColonnaKm: 15,
    capoColonnaMin: 25,
    crotoneKm: 18,
    crotoneMin: "20–25",
    crotoneAirportKm: 4.5,
    crotoneAirportMin: "5–10",
    lameziaAirportKm: 88,
  },
  /**
   * Transfer da/per aeroporto di Crotone (Sant'Anna).
   * `priceEur`: prezzo fisso a tratta. Lasciare `null` finché non confermato:
   * la pagina mostra "su richiesta" invece di un prezzo inventato.
   */
  transfer: {
    enabled: true,
    airportName: "Aeroporto di Crotone (Sant'Anna)",
    priceEur: null as number | null,
    priceIsRoundTrip: false,
    /** Minuti indicativi tratta struttura ↔ aeroporto Crotone (4,5 km su strada, OSRM). */
    durationMin: 10,
  },
  /** Vuoto finché non imposti NEXT_PUBLIC_VAT_OR_CF su Vercel / .env.local */
  vatOrCf,
} as const;

export const roomsConfig = [
  {
    id: 1,
    slug: "limone",
    name: { it: "Camera Limone", en: "Limone Room", de: "Zimmer Limone" },
    capacity: 2,
    size: 20,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: [
      "le-farfalle-matrimoniale-01.png",
      "camera-generale.webp",
      "camera-2-letto.webp",
    ],
  },
  {
    id: 2,
    slug: "macaone",
    name: { it: "Camera Macaone", en: "Macaone Room", de: "Zimmer Macaone" },
    capacity: 2,
    size: 25,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: [
      "le-farfalle-matrimoniale-03.png",
      "le-farfalle-bagno.png",
      "camera-2-letto.webp",
      "camera-2-interno.webp",
      "camera-2-bagno.webp",
    ],
  },
  {
    id: 3,
    slug: "vanessa",
    name: { it: "Camera Vanessa", en: "Vanessa Room", de: "Zimmer Vanessa" },
    capacity: 2,
    size: 22,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: [
      "le-farfalle-matrimoniale-02.png",
      "camera-3-letto.webp",
      "camera-3-interno.webp",
    ],
  },
  {
    id: 4,
    slug: "aurora",
    name: { it: "Camera Aurora", en: "Aurora Room", de: "Zimmer Aurora" },
    capacity: 2,
    size: 30,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["le-farfalle-matrimoniale-04.png", "camera-4-interno.webp", "camera-5-interno.webp"],
  },
] as const;

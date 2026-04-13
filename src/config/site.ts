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
    facebook: "",
    instagram: "",
    tripadvisor: "",
    google_business: "",
  },
  booking: {
    airbnb: "",
    booking_com: "",
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

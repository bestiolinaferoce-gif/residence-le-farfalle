/**
 * Configurazione generale del sito
 */

export const siteConfig = {
  name: "Residence Le Farfalle",
  description: {
    it: "4 camere indipendenti (8 posti totali) con bagno privato a Isola di Capo Rizzuto, Calabria. Colazione inclusa, WiFi superfast, aria condizionata.",
    en: "4 independent rooms (8 guests total) with private bathroom in Isola di Capo Rizzuto, Calabria. Breakfast included, superfast WiFi, air conditioning.",
    de: "4 unabhängige Zimmer (8 Gäste gesamt) mit eigenem Bad in Isola di Capo Rizzuto, Kalabrien. Frühstück inklusive, superschnelles WLAN, Klimaanlage.",
  },
  url: "https://residencelefarfalle.it",
  address: "Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)",
  coordinates: {
    lat: 38.96171494411169,
    lng: 17.09162398176466,
  },
  contacts: {
    phone: "+39 XXX XXX XXXX",
    email: "info@residencelefarfalle.it",
    whatsapp: "+39 XXX XXX XXXX",
  },
  social: {
    facebook: "",
    instagram: "",
    tripadvisor: "",
  },
} as const;

export const roomsConfig = [
  { id: 1, name: { it: "Camera 1", en: "Room 1", de: "Zimmer 1" }, capacity: 2, size: 20, amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"], images: ["camera-generale.webp", "camera-2-letto.webp"] },
  { id: 2, name: { it: "Camera 2", en: "Room 2", de: "Zimmer 2" }, capacity: 2, size: 25, amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"], images: ["camera-2-letto.webp", "camera-2-interno.webp"] },
  { id: 3, name: { it: "Camera 3", en: "Room 3", de: "Zimmer 3" }, capacity: 2, size: 22, amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"], images: ["camera-3-letto.webp", "camera-3-interno.webp"] },
  { id: 4, name: { it: "Camera 4", en: "Room 4", de: "Zimmer 4" }, capacity: 2, size: 30, amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"], images: ["camera-4-interno.webp", "camera-5-interno.webp"] },
] as const;

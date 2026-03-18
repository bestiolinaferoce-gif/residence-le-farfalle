/**
 * Data source camere - Residence Le Farfalle
 * Tutte le camere hanno capienza 2 pax. Capienza totale: 8 pax.
 */

export const TOTAL_CAPACITY = 8;

export interface Room {
  id: number;
  slug: string;
  name: { it: string; en: string; de: string };
  capacity: number;
  beds: number;
  size: number;
  amenities: string[];
  images: string[];
  priceFrom: number;
  description: { it: string; en: string; de: string };
  highlights: string[];
}

export const rooms: Room[] = [
  {
    id: 1,
    slug: "limone",
    name: { it: "Camera Limone", en: "Limone Room", de: "Zimmer Limone" },
    capacity: 2,
    beds: 1,
    size: 20,
    priceFrom: 70,
    description: {
      it: "Camera accogliente con luce naturale e vista sul verde. Ideale per coppie che cercano semplicità e comfort in una posizione centrale.",
      en: "Welcoming room with natural light and a view of the green. Ideal for couples seeking simplicity and comfort in a central location.",
      de: "Gemütliches Zimmer mit natürlichem Licht und Blick ins Grüne. Ideal für Paare, die Einfachheit und Komfort in zentraler Lage suchen.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-generale.webp", "camera-2-letto.webp"],
    highlights: ["Bagno privato", "TV LED", "Aria condizionata", "Tende oscuranti"],
  },
  {
    id: 2,
    slug: "macaone",
    name: { it: "Camera Macaone", en: "Macaone Room", de: "Zimmer Macaone" },
    capacity: 2,
    beds: 1,
    size: 25,
    priceFrom: 75,
    description: {
      it: "La nostra camera più spaziosa: 25 mq, arredi curati e bagno privato con box doccia. Perfetta per soggiorni prolungati.",
      en: "Our most spacious room: 25 sqm, carefully chosen furnishings and private bathroom with shower. Perfect for longer stays.",
      de: "Unser geräumigstes Zimmer: 25 qm, sorgfältig ausgewähltes Mobiliar und eigenes Badezimmer mit Dusche. Perfekt für längere Aufenthalte.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-2-letto.webp", "camera-2-interno.webp", "camera-2-bagno.webp"],
    highlights: ["25 mq", "Bagno privato", "TV LED", "Spazio extra"],
  },
  {
    id: 3,
    slug: "vanessa",
    name: { it: "Camera Vanessa", en: "Vanessa Room", de: "Zimmer Vanessa" },
    capacity: 2,
    beds: 1,
    size: 22,
    priceFrom: 72,
    description: {
      it: "Camera luminosa e ben curata con tutto il necessario per un soggiorno perfetto. Il bagno privato e le tende oscuranti garantiscono comfort e privacy.",
      en: "Bright and well-appointed room with everything you need for a perfect stay. Private bathroom and blackout curtains ensure comfort and privacy.",
      de: "Helles und gepflegtes Zimmer mit allem Notwendigen für einen perfekten Aufenthalt. Eigenes Bad und Verdunkelungsvorhänge sorgen für Komfort.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-3-letto.webp", "camera-3-interno.webp"],
    highlights: ["22 mq", "Molto luminosa", "Tende oscuranti", "WiFi dedicato"],
  },
  {
    id: 4,
    slug: "aurora",
    name: { it: "Camera Aurora", en: "Aurora Room", de: "Zimmer Aurora" },
    capacity: 2,
    beds: 1,
    size: 30,
    priceFrom: 80,
    description: {
      it: "La nostra suite: 30 mq di spazio, la camera più grande e luminosa della struttura. Bagno privato con doccia, TV LED e tutti i comfort premium.",
      en: "Our suite: 30 sqm of space, the largest and brightest room in the property. Private bathroom with shower, LED TV and all premium amenities.",
      de: "Unsere Suite: 30 qm Raum, das größte und hellste Zimmer der Anlage. Eigenes Bad mit Dusche, LED-TV und alle Premium-Annehmlichkeiten.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-4-interno.webp", "camera-5-interno.webp"],
    highlights: ["30 mq", "Suite premium", "La più grande", "Vista giardino"],
  },
];

export const amenityLabels: Record<string, { it: string; en: string; de: string }> = {
  "private-bathroom": { it: "Bagno privato", en: "Private bathroom", de: "Eigenes Bad" },
  tv: { it: "TV LED", en: "LED TV", de: "LED-TV" },
  ac: { it: "Aria condizionata", en: "Air conditioning", de: "Klimaanlage" },
  wifi: { it: "WiFi", en: "WiFi", de: "WLAN" },
  blackout: { it: "Tende oscuranti", en: "Blackout curtains", de: "Verdunkelungsvorhänge" },
};

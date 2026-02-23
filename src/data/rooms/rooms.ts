/**
 * Data source camere - Residence Le Farfalle
 * Tutte le camere hanno capienza 2 pax. Capienza totale: 8 pax.
 */

export const TOTAL_CAPACITY = 8;

export interface Room {
  id: number;
  name: { it: string; en: string; de: string };
  capacity: number;
  beds: number;
  size: number;
  amenities: string[];
  images: string[];
  priceFrom: number;
}

export const rooms: Room[] = [
  {
    id: 1,
    name: { it: "Camera 1", en: "Room 1", de: "Zimmer 1" },
    capacity: 2,
    beds: 1,
    size: 20,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-generale.webp", "camera-2-letto.webp"],
    priceFrom: 70,
  },
  {
    id: 2,
    name: { it: "Camera 2", en: "Room 2", de: "Zimmer 2" },
    capacity: 2,
    beds: 1,
    size: 25,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-2-letto.webp", "camera-2-interno.webp", "camera-2-bagno.webp"],
    priceFrom: 75,
  },
  {
    id: 3,
    name: { it: "Camera 3", en: "Room 3", de: "Zimmer 3" },
    capacity: 2,
    beds: 1,
    size: 22,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-3-letto.webp", "camera-3-interno.webp"],
    priceFrom: 72,
  },
  {
    id: 4,
    name: { it: "Camera 4", en: "Room 4", de: "Zimmer 4" },
    capacity: 2,
    beds: 1,
    size: 30,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-4-interno.webp", "camera-5-interno.webp"],
    priceFrom: 80,
  },
];

export const amenityLabels: Record<string, { it: string; en: string; de: string }> = {
  "private-bathroom": { it: "Bagno privato", en: "Private bathroom", de: "Eigenes Bad" },
  tv: { it: "TV LED", en: "LED TV", de: "LED-TV" },
  ac: { it: "Aria condizionata", en: "Air conditioning", de: "Klimaanlage" },
  wifi: { it: "WiFi", en: "WiFi", de: "WLAN" },
  blackout: { it: "Tende oscuranti", en: "Blackout curtains", de: "Verdunkelungsvorhänge" },
};

/**
 * Data source camere - Residence Le Farfalle
 * Tutte le camere hanno capienza 2 pax. Capienza totale: 8 pax.
 */

export const TOTAL_CAPACITY = 8;

export interface Room {
  id: number;
  slug: string;
  name: { it: string; en: string; de: string };
  description: { it: string; en: string; de: string };
  capacity: number;
  beds: number;
  size: number;
  amenities: string[];
  images: string[];
  priceFrom: number;
  highlights: string[];
}

export const rooms: Room[] = [
  {
    id: 1,
    slug: "limone",
    name: { it: "Camera Limone", en: "Limone Room", de: "Zimmer Limone" },
    description: {
      it: "Camera Limone, 20 mq di comfort nel cuore di Isola di Capo Rizzuto. Ideale per coppie che cercano un soggiorno autentico in Calabria, offre luce naturale abbondante, bagno privato con doccia, TV LED, aria condizionata e WiFi superfast inclusi. La colazione viene servita ogni mattina. A pochi minuti a piedi dal centro paese e a 5–15 minuti dalle spiagge dell’Area Marina Protetta di Capo Rizzuto, tra le più belle del Mediterraneo. L’host locale Francesco è sempre disponibile per consigli e per segnalare i posti meno affollati della costa ionica.",
      en: "Limone Room, 20 sqm of comfort in the heart of Isola di Capo Rizzuto. Perfect for couples seeking an authentic Calabrian stay, it features abundant natural light, a private bathroom with shower, LED TV, air conditioning and superfast WiFi. Breakfast is served every morning. A short walk from the town centre and 5–15 minutes from the beaches of the Capo Rizzuto Marine Protected Area, among the most beautiful in the Mediterranean. Local host Francesco is always happy to share tips and quieter spots along the Ionian coast.",
      de: "Zimmer Limone, 20 m² Komfort im Herzen von Isola di Capo Rizzuto. Ideal für Paare, die einen authentischen Aufenthalt in Kalabrien suchen: viel Tageslicht, eigenes Bad mit Dusche, LED-TV, Klimaanlage und superschnelles WLAN inklusive. Das Frühstück wird jeden Morgen serviert. Nur wenige Gehminuten vom Ortskern und 5–15 Minuten von den Stränden des Meeresschutzgebiets Capo Rizzuto entfernt. Gastgeber Francesco steht mit Tipps und Empfehlungen für die ionische Küste jederzeit zur Verfügung.",
    },
    capacity: 2,
    beds: 1,
    size: 20,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-generale.webp", "camera-2-letto.webp"],
    priceFrom: 70,
    highlights: ["Luce naturale", "Bagno privato", "WiFi superfast", "Colazione inclusa"],
  },
  {
    id: 2,
    slug: "macaone",
    name: { it: "Camera Macaone", en: "Macaone Room", de: "Zimmer Macaone" },
    description: {
      it: "Camera Macaone, 25 mq: la più spaziosa della struttura, pensata per chi ama avere respiro e ordine in vacanza. Arredi curati, bagno privato con box doccia, TV LED, aria condizionata e WiFi superfast ti accompagnano in ogni momento della giornata. La colazione inclusa è il modo migliore per iniziare la mattina prima di raggiungere il mare o esplorare Le Castella e l’Area Marina Protetta. Posizione centrale a Isola di Capo Rizzuto: comoda per spostarsi a piedi e ideale per soggiorni più lunghi. Francesco conosce bene il territorio e può suggerirti itinerari, spiagge e ristoranti in zona.",
      en: "Macaone Room, 25 sqm — our most spacious option for guests who value room to unwind. Tasteful décor, private bathroom with walk-in shower, LED TV, air conditioning and superfast WiFi are all included. Breakfast is served each morning before you head to the beach or explore Le Castella and the marine protected area. Centrally located in Isola di Capo Rizzuto, it suits longer stays and easy walks around town. Host Francesco can recommend beaches, dining and day trips across the Ionian coast.",
      de: "Zimmer Macaone, 25 m² – unser geräumigstes Zimmer für Gäste, die viel Platz und eine ruhige Atmosphäre schätzen. Geschmackvolle Einrichtung, eigenes Bad mit ebenerdiger Dusche, LED-TV, Klimaanlage und superschnelles WLAN. Das inklusive Frühstück startet den Tag, bevor Sie zum Strand fahren oder Le Castella und das Meeresschutzgebiet erkunden. Zentral in Isola di Capo Rizzuto gelegen, ideal für längere Aufenthalte. Gastgeber Francesco gibt gern Tipps zu Stränden, Restaurants und Ausflügen entlang der ionischen Küste.",
    },
    capacity: 2,
    beds: 1,
    size: 25,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-2-letto.webp", "camera-2-interno.webp", "camera-2-bagno.webp"],
    priceFrom: 75,
    highlights: ["25 mq", "Box doccia", "Arredi curati", "Ideale per soggiorni lunghi"],
  },
  {
    id: 3,
    slug: "vanessa",
    name: { it: "Camera Vanessa", en: "Vanessa Room", de: "Zimmer Vanessa" },
    description: {
      it: "Camera Vanessa, 22 mq, luminosa e funzionale: perfetta per coppie che vogliono una base comoda tra mare e paese. Bagno privato, tende oscuranti per dormire nel massimo comfort, TV LED, aria condizionata e WiFi superfast inclusi. Ogni mattina ti aspetta la colazione della struttura. In pochi minuti raggiungi le spiagge dell’Area Marina Protetta e il centro di Isola di Capo Rizzuto con bar, servizi e vita serale. Francesco è disponibile per indicazioni pratiche su parcheggio, spiagge e come muoversi verso Crotone o l’aeroporto.",
      en: "Vanessa Room, 22 sqm — bright and practical, ideal for couples who want a comfortable base between town and sea. Private bathroom, blackout curtains for restful nights, LED TV, air conditioning and superfast WiFi. Breakfast is included every morning. Within minutes you can reach beaches in the marine protected area and the centre of Isola di Capo Rizzuto with cafés and services. Host Francesco can help with parking, beach choices and travel to Crotone or the airport.",
      de: "Zimmer Vanessa, 22 m², hell und praktisch – ideal für Paare, die eine komfortable Ausgangslage zwischen Ort und Meer suchen. Eigenes Bad, Verdunkelungsvorhänge für erholsamen Schlaf, LED-TV, Klimaanlage und superschnelles WLAN. Das Frühstück ist jeden Morgen inklusive. In wenigen Minuten erreichen Sie Strände im Meeresschutzgebiet und das Zentrum von Isola di Capo Rizzuto. Gastgeber Francesco hilft gern bei Parken, Strandtipps und Anreise nach Crotone oder zum Flughafen.",
    },
    capacity: 2,
    beds: 1,
    size: 22,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-3-letto.webp", "camera-3-interno.webp"],
    priceFrom: 72,
    highlights: ["Camera luminosa", "Tende oscuranti", "Bagno privato", "Aria condizionata"],
  },
  {
    id: 4,
    slug: "aurora",
    name: { it: "Camera Aurora", en: "Aurora Room", de: "Zimmer Aurora" },
    description: {
      it: "Camera Aurora è la nostra suite da 30 mq, la più grande della Residence Le Farfalle: spazio generoso per valigie e relax, arredi curati e bagno privato con tutti i servizi. TV LED, aria condizionata, WiFi superfast e colazione inclusa completano l’esperienza. Ideale per chi desidera il massimo comfort dopo giornate al mare o in giro per la Calabria ionica. La posizione a Isola di Capo Rizzuto ti permette di alternare spiagge dell’Area Marina Protetta, borghi come Le Castella e serate nel centro paese. Francesco accoglie ogni ospite con consigli su misura per scoprire la costa.",
      en: "Aurora is our 30 sqm suite — the largest room at Residence Le Farfalle, with generous space to unpack and relax, refined details and a private bathroom with full amenities. LED TV, air conditioning, superfast WiFi and breakfast included. Ideal after long beach days or trips across the Ionian coast of Calabria. From Isola di Capo Rizzuto you can reach marine protected beaches, villages such as Le Castella and evenings in the town centre. Host Francesco welcomes every guest with tailored recommendations.",
      de: "Zimmer Aurora ist unsere 30 m² Suite – das größte Zimmer der Residence Le Farfalle mit viel Platz zum Entspannen, liebevollen Details und eigenem Bad mit Komfortausstattung. LED-TV, Klimaanlage, superschnelles WLAN und inklusive Frühstück. Perfekt nach langen Strandtagen oder Ausflügen an der ionischen Küste Kalabriens. Von Isola di Capo Rizzuto aus erreichen Sie Strände im Meeresschutzgebiet, Orte wie Le Castella und abends das Stadtzentrum. Gastgeber Francesco empfängt Sie mit persönlichen Tipps für die Region.",
    },
    capacity: 2,
    beds: 1,
    size: 30,
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-4-interno.webp", "camera-5-interno.webp"],
    priceFrom: 80,
    highlights: ["Suite 30 mq", "TV LED", "Massimo comfort", "Colazione inclusa"],
  },
];

export const amenityLabels: Record<string, { it: string; en: string; de: string }> = {
  "private-bathroom": { it: "Bagno privato", en: "Private bathroom", de: "Eigenes Bad" },
  tv: { it: "TV LED", en: "LED TV", de: "LED-TV" },
  ac: { it: "Aria condizionata", en: "Air conditioning", de: "Klimaanlage" },
  wifi: { it: "WiFi", en: "WiFi", de: "WLAN" },
  blackout: { it: "Tende oscuranti", en: "Blackout curtains", de: "Verdunkelungsvorhänge" },
};

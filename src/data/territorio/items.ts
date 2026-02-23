/**
 * Contenuti territorio per sezione Home e pagina dedicata
 * Ogni item deve avere immagine con licenza riutilizzabile
 * Attribuzioni in ATTRIBUTIONS.md
 */

export interface TerritorioItem {
  slug: string;
  title: string;
  excerpt: string; // 2 righe max per card
  image: string; // Path in /public/territorio/
  sourceUrl: string; // URL sorgente immagine
  license: string; // Es: "CC BY-SA 4.0", "CC0", "CC BY 2.0"
  author: string; // Nome autore
  category: "beach" | "history" | "nature" | "culture" | "activity";
  distance?: string;
  time?: string;
}

export const territorioItems: TerritorioItem[] = [
  {
    slug: "isola-capo-rizzuto",
    title: "Isola di Capo Rizzuto",
    excerpt:
      "Perla della Calabria ionica con spiagge dorate, mare cristallino e Area Marina Protetta. Un paradiso per chi ama il mare e la natura.",
    image: "/images/rooms/camera-generale.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Isola_di_Capo_Rizzuto.jpg",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "beach",
    distance: "0 km",
    time: "Sul posto",
  },
  {
    slug: "area-marina-protetta",
    title: "Area Marina Protetta Capo Rizzuto",
    excerpt:
      "Una delle più grandi riserve marine d'Italia. Acque cristalline e fondali ricchi di vita marina, perfetti per snorkeling e immersioni.",
    image: "/images/rooms/dettagli-interni.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Capo_Rizzuto",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "nature",
    distance: "2 km",
    time: "5 min",
  },
  {
    slug: "le-castella",
    title: "Le Castella",
    excerpt:
      "Spiagge dorate e mare turchese con il caratteristico isolotto e il castello aragonese. Borgo marinaro con ristoranti di pesce fresco.",
    image: "/images/rooms/camera-2-interno.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Le_Castella_Crotone.jpg",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "beach",
    distance: "8 km",
    time: "15 min",
  },
  {
    slug: "capo-colonna",
    title: "Parco Archeologico Capo Colonna",
    excerpt:
      "Tempio di Hera Lacinia, uno dei più importanti santuari della Magna Grecia. La colonna superstite con vista mozzafiato sul mare.",
    image: "/images/rooms/camera-3-interno.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Capo_Colonna_Crotone.jpg",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "history",
    distance: "15 km",
    time: "25 min",
  },
  {
    slug: "crotone-centro",
    title: "Crotone Centro Storico",
    excerpt:
      "Città antica con storia millenaria dal periodo magno-greco. Museo Archeologico Nazionale con reperti unici. Un viaggio nel tempo.",
    image: "/images/rooms/camera-4-interno.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Crotone",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "history",
    distance: "12 km",
    time: "20 min",
  },
  {
    slug: "spiagge-vicine",
    title: "Spiagge della Costa Ionica",
    excerpt:
      "Spiagge dorate e mare cristallino lungo tutta la costa. Da Soverato a Roccella Ionica, un susseguirsi di baie e calette da scoprire.",
    image: "/images/rooms/camera-5-interno.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Calabria_coast",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "beach",
    distance: "30-60 km",
    time: "30-60 min",
  },
  {
    slug: "escursioni-boat-tour",
    title: "Escursioni e Boat Tour",
    excerpt:
      "Tour in barca per esplorare l'Area Marina Protetta, snorkeling guidato, escursioni lungo la costa. Esperienze indimenticabili sul mare.",
    image: "/images/services/colazione-breakfast.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Boats",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "activity",
    distance: "2 km",
    time: "5 min",
  },
  {
    slug: "cucina-locale",
    title: "Cucina Tradizionale Calabrese",
    excerpt:
      "Pesce fresco del giorno, pasta fatta in casa, prodotti locali. Ristoranti tipici e trattorie dove assaporare l'autentica tradizione calabrese.",
    image: "/images/services/colazione-interno.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Calabrian_cuisine",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "culture",
    distance: "5-10 km",
    time: "10-15 min",
  },
  {
    slug: "sila-parco",
    title: "Sila e Parco Nazionale",
    excerpt:
      "Foreste secolari, laghi cristallini e sentieri naturalistici. In estate offre frescura e panorami mozzafiato. Perfetto per escursioni.",
    image: "/images/rooms/dettagli-interni.webp",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Sila_National_Park",
    license: "CC BY-SA 4.0",
    author: "Wikimedia Commons",
    category: "nature",
    distance: "60 km",
    time: "1h 15min",
  },
];

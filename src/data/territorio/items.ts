/**
 * Contenuti territorio per sezione Home e pagina dedicata (IT / EN / DE).
 *
 * Distanze e tempi: in auto dalla struttura (38.9617, 17.0916), calcolati con
 * OpenStreetMap + OSRM (senza traffico) il 2026-09-21. Valori indicativi.
 * La struttura è nel centro del paese, NON sul mare: per le spiagge serve l'auto.
 *
 * Immagini: foto locali in /public/images/territorio (le stesse usate nella
 * pagina /territorio), tranne la Sila (foto stock Unsplash generica). Per immagini di terzi indicare sourceUrl/license/author
 * e aggiornare ATTRIBUTIONS.md.
 */

export type TerritorioLocale = "it" | "en" | "de";

type Localized = Record<TerritorioLocale, string>;

export interface TerritorioItem {
  slug: string;
  title: Localized;
  excerpt: Localized; // 2 righe max per card
  image: string;
  imageAlt: Localized;
  sourceUrl?: string; // URL sorgente immagine (solo immagini di terzi)
  license?: string; // Es: "CC BY-SA 4.0", "CC0", "CC BY 2.0"
  author?: string; // Nome autore
  category: "beach" | "history" | "nature" | "culture" | "activity";
  distance?: Localized;
  time?: Localized;
}

export const territorioItems: TerritorioItem[] = [
  {
    slug: "isola-capo-rizzuto",
    title: {
      it: "Isola di Capo Rizzuto",
      en: "Isola di Capo Rizzuto",
      de: "Isola di Capo Rizzuto",
    },
    excerpt: {
      it: "Il paese dove si trova la struttura: bar, ristoranti e negozi a piedi. Le spiagge dell'Area Marina Protetta sono a pochi minuti d'auto.",
      en: "The town where we are based: cafés, restaurants and shops within walking distance. The beaches of the marine protected area are a short drive away.",
      de: "Der Ort, in dem unsere Unterkunft liegt: Bars, Restaurants und Geschäfte zu Fuß erreichbar. Die Strände des Meeresschutzgebiets erreichen Sie in wenigen Autominuten.",
    },
    image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
    imageAlt: {
      it: "Ampia spiaggia dorata con scogli sulla costa di Isola di Capo Rizzuto",
      en: "Wide golden beach with rocks on the coast of Isola di Capo Rizzuto",
      de: "Breiter goldener Sandstrand mit Felsen an der Küste von Isola di Capo Rizzuto",
    },
    category: "culture",
    distance: { it: "In centro", en: "Town centre", de: "Ortszentrum" },
    time: { it: "A piedi", en: "On foot", de: "Zu Fuß" },
  },
  {
    slug: "area-marina-protetta",
    title: {
      it: "Spiagge dell'Area Marina Protetta Capo Rizzuto",
      en: "Beaches of the Capo Rizzuto Marine Protected Area",
      de: "Strände des Meeresschutzgebiets Capo Rizzuto",
    },
    excerpt: {
      it: "Una delle aree marine protette più estese d'Italia. Le spiagge più vicine (Curmo, Cavallucci, Chiancolilli) si raggiungono in auto.",
      en: "One of the largest marine protected areas in Italy. The nearest beaches (Curmo, Cavallucci, Chiancolilli) are reached by car.",
      de: "Eines der größten Meeresschutzgebiete Italiens. Die nächstgelegenen Strände (Curmo, Cavallucci, Chiancolilli) erreichen Sie mit dem Auto.",
    },
    image: "/images/territorio/area-marina-protetta.jpg",
    imageAlt: {
      it: "Mare turchese e scogli nell'Area Marina Protetta Capo Rizzuto",
      en: "Turquoise water and rocks in the Capo Rizzuto Marine Protected Area",
      de: "Türkisfarbenes Wasser und Felsen im Meeresschutzgebiet Capo Rizzuto",
    },
    category: "nature",
    distance: { it: "circa 6 km", en: "about 6 km", de: "ca. 6 km" },
    time: { it: "10–15 min in auto", en: "10–15 min by car", de: "10–15 Min. mit dem Auto" },
  },
  {
    slug: "le-castella",
    title: { it: "Le Castella", en: "Le Castella", de: "Le Castella" },
    excerpt: {
      it: "Il castello aragonese sull'isolotto, la spiaggia e il borgo marinaro con ristoranti di pesce.",
      en: "The Aragonese castle on its islet, the beach and a seaside village with seafood restaurants.",
      de: "Die aragonesische Burg auf der kleinen Insel, der Strand und das Fischerdorf mit Fischrestaurants.",
    },
    image: "/images/territorio/le-castella-castello.jpg",
    imageAlt: {
      it: "Castello aragonese di Le Castella visto dal mare",
      en: "The Aragonese castle of Le Castella seen from the sea",
      de: "Die aragonesische Burg von Le Castella vom Meer aus gesehen",
    },
    category: "beach",
    distance: { it: "circa 11 km", en: "about 11 km", de: "ca. 11 km" },
    time: { it: "circa 15 min", en: "about 15 min", de: "ca. 15 Min." },
  },
  {
    slug: "capo-colonna",
    title: {
      it: "Parco Archeologico di Capo Colonna",
      en: "Capo Colonna Archaeological Park",
      de: "Archäologischer Park Capo Colonna",
    },
    excerpt: {
      it: "Il tempio di Hera Lacinia, uno dei santuari più importanti della Magna Grecia, con l'ultima colonna rimasta affacciata sul mare.",
      en: "The temple of Hera Lacinia, one of the most important sanctuaries of Magna Graecia, with its last standing column overlooking the sea.",
      de: "Der Tempel der Hera Lacinia, eines der bedeutendsten Heiligtümer der Magna Graecia – mit der letzten erhaltenen Säule über dem Meer.",
    },
    image: "/images/territorio/tramonto-area-marina.jpg",
    imageAlt: {
      it: "Tramonto sul mare lungo la costa tra Capo Rizzuto e Capo Colonna",
      en: "Sunset over the sea on the coast between Capo Rizzuto and Capo Colonna",
      de: "Sonnenuntergang über dem Meer an der Küste zwischen Capo Rizzuto und Capo Colonna",
    },
    category: "history",
    distance: { it: "circa 15 km", en: "about 15 km", de: "ca. 15 km" },
    time: { it: "circa 25 min", en: "about 25 min", de: "ca. 25 Min." },
  },
  {
    slug: "crotone-centro",
    title: {
      it: "Crotone, centro storico",
      en: "Crotone old town",
      de: "Altstadt von Crotone",
    },
    excerpt: {
      it: "Città di origine magno-greca con il castello di Carlo V e il Museo Archeologico Nazionale.",
      en: "A city founded by the ancient Greeks, with the castle of Charles V and the National Archaeological Museum.",
      de: "Eine von den Griechen gegründete Stadt mit dem Kastell Karls V. und dem Nationalen Archäologischen Museum.",
    },
    image: "/images/territorio/spiagge-rosse.jpg",
    imageAlt: {
      it: "Sabbia rossastra, scogli e mare sulla costa ionica crotonese",
      en: "Reddish sand, rocks and sea on the Ionian coast near Crotone",
      de: "Rötlicher Sand, Felsen und Meer an der ionischen Küste bei Crotone",
    },
    category: "history",
    distance: { it: "circa 18 km", en: "about 18 km", de: "ca. 18 km" },
    time: { it: "20–25 min", en: "20–25 min", de: "20–25 Min." },
  },
  {
    slug: "spiagge-vicine",
    title: {
      it: "Spiagge della costa ionica",
      en: "Beaches of the Ionian coast",
      de: "Strände der ionischen Küste",
    },
    excerpt: {
      it: "Oltre alle spiagge dell'Area Marina, la costa offre baie e calette da scoprire con una gita in giornata, fino a Soverato.",
      en: "Beyond the marine protected area, the coast has plenty of bays and coves to explore on a day trip, as far as Soverato.",
      de: "Neben den Stränden des Schutzgebiets bietet die Küste viele Buchten, die Sie bei einem Tagesausflug bis nach Soverato entdecken können.",
    },
    image: "/images/territorio/spiaggia-capopiccolo.jpg",
    imageAlt: {
      it: "Spiaggia di sabbia e mare limpido sulla costa ionica calabrese",
      en: "Sandy beach and clear water on the Ionian coast of Calabria",
      de: "Sandstrand und klares Wasser an der ionischen Küste Kalabriens",
    },
    category: "beach",
    time: { it: "Gita in giornata", en: "Day trip", de: "Tagesausflug" },
  },
  {
    slug: "escursioni-boat-tour",
    title: {
      it: "Escursioni e gite in barca",
      en: "Boat trips and excursions",
      de: "Bootsausflüge und Touren",
    },
    excerpt: {
      it: "Gite in barca nell'Area Marina Protetta, snorkeling ed escursioni lungo la costa: chiedici e ti mettiamo in contatto con operatori locali.",
      en: "Boat trips in the marine protected area, snorkelling and coastal excursions: ask us and we'll put you in touch with local operators.",
      de: "Bootsausflüge im Meeresschutzgebiet, Schnorcheln und Touren entlang der Küste: Fragen Sie uns, wir vermitteln Ihnen lokale Anbieter.",
    },
    image: "/images/territorio/tramonto-le-castella.jpg",
    imageAlt: {
      it: "Tramonto sul castello di Le Castella visto dal mare",
      en: "Sunset over Le Castella castle seen from the sea",
      de: "Sonnenuntergang über der Burg von Le Castella, vom Meer aus gesehen",
    },
    category: "activity",
  },
  {
    slug: "cucina-locale",
    title: {
      it: "Cucina tradizionale calabrese",
      en: "Traditional Calabrian food",
      de: "Traditionelle kalabrische Küche",
    },
    excerpt: {
      it: "Pesce fresco, pasta fatta in casa e prodotti locali nelle trattorie del paese e nei ristoranti di Le Castella.",
      en: "Fresh fish, homemade pasta and local produce in the town's trattorias and the restaurants of Le Castella.",
      de: "Frischer Fisch, hausgemachte Pasta und regionale Produkte in den Trattorien des Ortes und den Restaurants von Le Castella.",
    },
    image: "/images/territorio/le-castella-castello-2.jpg",
    imageAlt: {
      it: "Il borgo e il castello di Le Castella, meta per una cena di pesce",
      en: "The village and castle of Le Castella, a favourite spot for a seafood dinner",
      de: "Dorf und Burg von Le Castella – ideal für ein Fischessen am Abend",
    },
    category: "culture",
  },
  {
    slug: "sila-parco",
    title: {
      it: "Sila e Parco Nazionale",
      en: "Sila National Park",
      de: "Sila-Nationalpark",
    },
    excerpt: {
      it: "Foreste, laghi e sentieri sull'altopiano della Sila: d'estate è fresca, ideale per una giornata di escursioni.",
      en: "Forests, lakes and trails on the Sila plateau: pleasantly cool in summer and ideal for a day of hiking.",
      de: "Wälder, Seen und Wanderwege auf der Sila-Hochebene: im Sommer angenehm kühl und ideal für einen Wandertag.",
    },
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
    imageAlt: {
      it: "Bosco e sentiero di montagna, come quelli della Sila",
      en: "Forest trail in the mountains, like those of the Sila",
      de: "Waldweg in den Bergen, wie in der Sila",
    },
    sourceUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    license: "Unsplash License",
    category: "nature",
    time: { it: "Gita in giornata", en: "Day trip", de: "Tagesausflug" },
  },
];

export function pickTerritorioLocale(locale: string | undefined): TerritorioLocale {
  return locale === "en" || locale === "de" ? locale : "it";
}

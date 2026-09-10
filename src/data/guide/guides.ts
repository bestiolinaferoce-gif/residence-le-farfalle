/**
 * Guide territoriali long-form per SEO organico (it / en / de).
 * Solo fatti verificabili su luoghi reali della Calabria ionica.
 * Slug identico su tutte le lingue (coerente con il resto del routing).
 */

import type { Locale } from "@/src/lib/i18n";

export interface GuideSection {
  heading: string;
  body: string[];
}

export interface GuideLocaleContent {
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  keywords: string[];
}

export interface Guide {
  slug: string;
  image: string;
  imageAlt: Record<Locale, string>;
  updated: string; // YYYY-MM-DD
  content: Record<Locale, GuideLocaleContent>;
}

export const guides: Guide[] = [
  {
    slug: "spiagge-bandiera-blu-capo-rizzuto",
    image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
    updated: "2026-09-10",
    imageAlt: {
      it: "Spiaggia dell'Area Marina Protetta di Capo Rizzuto",
      en: "Beach in the Capo Rizzuto Marine Protected Area",
      de: "Strand im Meeresschutzgebiet Capo Rizzuto",
    },
    content: {
      it: {
        metaTitle: "Spiagge Bandiera Blu a Isola di Capo Rizzuto: guida completa",
        description:
          "Le migliori spiagge dell'Area Marina Protetta di Capo Rizzuto: acque cristalline, sabbia dorata e calette. Come raggiungerle da Residence Le Farfalle.",
        h1: "Spiagge Bandiera Blu a Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto è tra i comuni Bandiera Blu della Calabria ionica e ospita una delle aree marine protette più grandi d'Italia. Qui trovi una guida alle spiagge più belle, tutte raggiungibili in pochi minuti dal centro paese.",
        sections: [
          {
            heading: "L'Area Marina Protetta di Capo Rizzuto",
            body: [
              "Istituita per tutelare fondali, praterie di posidonia e biodiversità, l'Area Marina Protetta si estende lungo la costa tra Le Castella e Capo Colonna.",
              "Le acque limpide la rendono ideale per snorkeling e immersioni; molte spiagge sono a fondale basso e sabbioso, perfette per le famiglie.",
            ],
          },
          {
            heading: "Le spiagge da non perdere",
            body: [
              "Spiaggia Grande e Capopiccolo: ampie distese di sabbia con servizi e tratti liberi.",
              "Le spiagge rosse: caratteristiche per il colore ferroso della sabbia e delle argille a picco sul mare.",
              "Le Castella: sabbia dorata di fronte al castello aragonese, con calette raggiungibili a piedi.",
            ],
          },
          {
            heading: "A pochi minuti da Residence Le Farfalle",
            body: [
              "Dalla struttura, nel cuore di Isola di Capo Rizzuto, le spiagge dell'Area Marina Protetta distano 5–15 minuti a piedi o pochi minuti in auto.",
              "Parcheggio gratuito disponibile nelle vicinanze: comodo per raggiungere le calette più lontane in giornata.",
            ],
          },
        ],
        keywords: [
          "spiagge Isola di Capo Rizzuto",
          "spiagge Bandiera Blu Calabria",
          "Area Marina Protetta Capo Rizzuto",
          "spiagge rosse Capo Rizzuto",
          "spiagge Le Castella",
        ],
      },
      en: {
        metaTitle: "Blue Flag beaches in Isola di Capo Rizzuto: full guide",
        description:
          "The best beaches in the Capo Rizzuto Marine Protected Area: crystal-clear water, golden sand and coves. How to reach them from Residence Le Farfalle.",
        h1: "Blue Flag beaches in Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto is one of the Blue Flag municipalities on the Calabrian Ionian coast and home to one of Italy's largest marine protected areas. Here is a guide to the finest beaches, all a few minutes from the town centre.",
        sections: [
          {
            heading: "The Capo Rizzuto Marine Protected Area",
            body: [
              "Created to protect seabeds, Posidonia meadows and biodiversity, the Marine Protected Area stretches along the coast between Le Castella and Capo Colonna.",
              "Clear waters make it ideal for snorkelling and diving; many beaches have shallow sandy bottoms, perfect for families.",
            ],
          },
          {
            heading: "Beaches not to miss",
            body: [
              "Spiaggia Grande and Capopiccolo: wide sandy stretches with facilities and free areas.",
              "The red beaches: known for the iron-red colour of the sand and cliffs above the sea.",
              "Le Castella: golden sand in front of the Aragonese castle, with coves reachable on foot.",
            ],
          },
          {
            heading: "Minutes from Residence Le Farfalle",
            body: [
              "From the property, in the heart of Isola di Capo Rizzuto, the Marine Protected Area beaches are a 5–15 minute walk or a few minutes by car.",
              "Free parking is available nearby, handy for reaching the more distant coves on a day trip.",
            ],
          },
        ],
        keywords: [
          "Isola di Capo Rizzuto beaches",
          "Blue Flag beaches Calabria",
          "Capo Rizzuto Marine Protected Area",
          "red beaches Capo Rizzuto",
          "Le Castella beaches",
        ],
      },
      de: {
        metaTitle: "Blaue-Flagge-Strände in Isola di Capo Rizzuto: Guide",
        description:
          "Die schönsten Strände im Meeresschutzgebiet Capo Rizzuto: kristallklares Wasser, goldener Sand und Buchten. Anfahrt vom Residence Le Farfalle.",
        h1: "Blaue-Flagge-Strände in Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto zählt zu den Blaue-Flagge-Gemeinden der ionischen Küste Kalabriens und beherbergt eines der größten Meeresschutzgebiete Italiens. Hier ein Guide zu den schönsten Stränden, alle wenige Minuten vom Ortszentrum entfernt.",
        sections: [
          {
            heading: "Das Meeresschutzgebiet Capo Rizzuto",
            body: [
              "Das Meeresschutzgebiet schützt Meeresböden, Posidonia-Wiesen und Artenvielfalt und erstreckt sich entlang der Küste zwischen Le Castella und Capo Colonna.",
              "Das klare Wasser ist ideal zum Schnorcheln und Tauchen; viele Strände haben flache, sandige Böden – perfekt für Familien.",
            ],
          },
          {
            heading: "Strände, die man nicht verpassen sollte",
            body: [
              "Spiaggia Grande und Capopiccolo: weite Sandflächen mit Einrichtungen und freien Abschnitten.",
              "Die roten Strände: bekannt für die eisenrote Farbe des Sandes und der Klippen über dem Meer.",
              "Le Castella: goldener Sand vor der aragonesischen Burg, mit zu Fuß erreichbaren Buchten.",
            ],
          },
          {
            heading: "Wenige Minuten vom Residence Le Farfalle",
            body: [
              "Von der Unterkunft im Herzen von Isola di Capo Rizzuto sind die Strände des Meeresschutzgebiets 5–15 Gehminuten oder wenige Autominuten entfernt.",
              "Kostenlose Parkplätze in der Nähe – praktisch, um bei einem Tagesausflug auch weiter entfernte Buchten zu erreichen.",
            ],
          },
        ],
        keywords: [
          "Strände Isola di Capo Rizzuto",
          "Blaue Flagge Strände Kalabrien",
          "Meeresschutzgebiet Capo Rizzuto",
          "rote Strände Capo Rizzuto",
          "Strände Le Castella",
        ],
      },
    },
  },
  {
    slug: "le-castella-cosa-vedere",
    image: "/images/territorio/le-castella-castello.jpg",
    updated: "2026-09-10",
    imageAlt: {
      it: "Castello Aragonese di Le Castella sul mare",
      en: "Aragonese Castle of Le Castella by the sea",
      de: "Aragonesische Burg von Le Castella am Meer",
    },
    content: {
      it: {
        metaTitle: "Le Castella: cosa vedere: castello aragonese e mare",
        description:
          "Cosa vedere a Le Castella: il castello aragonese sull'isolotto, le spiagge, i ristoranti di pesce. A 15 minuti da Residence Le Farfalle.",
        h1: "Le Castella: cosa vedere",
        intro:
          "Le Castella è una frazione marinara di Isola di Capo Rizzuto celebre per il suo castello aragonese che sembra galleggiare sul mare. È una delle mete più fotografate della Calabria ionica.",
        sections: [
          {
            heading: "Il Castello Aragonese",
            body: [
              "Il castello sorge su un isolotto collegato alla terraferma da una sottile lingua di terra ed è visitabile durante la stagione turistica.",
              "Al tramonto la fortezza si specchia nel mare: è il momento migliore per le foto.",
            ],
          },
          {
            heading: "Spiagge e mare",
            body: [
              "Attorno al borgo si aprono spiagge di sabbia dorata e acque poco profonde, all'interno dell'Area Marina Protetta.",
              "Dai moli partono escursioni in barca e tour di snorkeling verso le calette più suggestive.",
            ],
          },
          {
            heading: "Mangiare e come arrivare",
            body: [
              "Il borgo è ricco di ristoranti e trattorie di pesce fresco: ideale per una cena vista mare.",
              "Da Residence Le Farfalle, Le Castella dista circa 8 km, 15 minuti in auto.",
            ],
          },
        ],
        keywords: [
          "Le Castella cosa vedere",
          "castello aragonese Le Castella",
          "Le Castella Calabria",
          "spiagge Le Castella",
          "Isola di Capo Rizzuto",
        ],
      },
      en: {
        metaTitle: "Le Castella: what to see: Aragonese castle and sea",
        description:
          "What to see in Le Castella: the Aragonese castle on its islet, the beaches and seafood restaurants. 15 minutes from Residence Le Farfalle.",
        h1: "Le Castella: what to see",
        intro:
          "Le Castella is a seaside hamlet of Isola di Capo Rizzuto, famous for its Aragonese castle that seems to float on the sea. It is one of the most photographed spots on the Calabrian Ionian coast.",
        sections: [
          {
            heading: "The Aragonese Castle",
            body: [
              "The castle stands on an islet linked to the mainland by a thin strip of land and can be visited during the tourist season.",
              "At sunset the fortress is mirrored in the sea: the best moment for photos.",
            ],
          },
          {
            heading: "Beaches and sea",
            body: [
              "Golden sandy beaches and shallow waters surround the village, all within the Marine Protected Area.",
              "Boat trips and snorkelling tours to the most scenic coves depart from the piers.",
            ],
          },
          {
            heading: "Eating and getting there",
            body: [
              "The village is full of restaurants serving fresh fish: ideal for a dinner by the sea.",
              "From Residence Le Farfalle, Le Castella is about 8 km away, 15 minutes by car.",
            ],
          },
        ],
        keywords: [
          "Le Castella what to see",
          "Aragonese castle Le Castella",
          "Le Castella Calabria",
          "Le Castella beaches",
          "Isola di Capo Rizzuto",
        ],
      },
      de: {
        metaTitle: "Le Castella: Sehenswürdigkeiten: Burg und Meer",
        description:
          "Was man in Le Castella sehen sollte: die aragonesische Burg auf der Insel, die Strände und Fischrestaurants. 15 Minuten vom Residence Le Farfalle.",
        h1: "Le Castella: Sehenswürdigkeiten",
        intro:
          "Le Castella ist ein Fischerort von Isola di Capo Rizzuto, berühmt für seine aragonesische Burg, die auf dem Meer zu schweben scheint. Sie ist eines der meistfotografierten Ziele der ionischen Küste Kalabriens.",
        sections: [
          {
            heading: "Die aragonesische Burg",
            body: [
              "Die Burg steht auf einer kleinen Insel, die durch einen schmalen Landstreifen mit dem Festland verbunden ist, und kann in der Saison besichtigt werden.",
              "Bei Sonnenuntergang spiegelt sich die Festung im Meer – der beste Moment für Fotos.",
            ],
          },
          {
            heading: "Strände und Meer",
            body: [
              "Rund um den Ort liegen goldene Sandstrände und flaches Wasser, alle im Meeresschutzgebiet.",
              "Von den Molen starten Bootsausflüge und Schnorcheltouren zu den schönsten Buchten.",
            ],
          },
          {
            heading: "Essen und Anfahrt",
            body: [
              "Der Ort ist voller Restaurants mit frischem Fisch: ideal für ein Abendessen am Meer.",
              "Vom Residence Le Farfalle ist Le Castella etwa 8 km entfernt, 15 Minuten mit dem Auto.",
            ],
          },
        ],
        keywords: [
          "Le Castella Sehenswürdigkeiten",
          "aragonesische Burg Le Castella",
          "Le Castella Kalabrien",
          "Strände Le Castella",
          "Isola di Capo Rizzuto",
        ],
      },
    },
  },
  {
    slug: "capo-rizzuto-3-giorni",
    image: "/images/territorio/tramonto-area-marina.jpg",
    updated: "2026-09-10",
    imageAlt: {
      it: "Tramonto sull'Area Marina Protetta di Capo Rizzuto",
      en: "Sunset over the Capo Rizzuto Marine Protected Area",
      de: "Sonnenuntergang über dem Meeresschutzgebiet Capo Rizzuto",
    },
    content: {
      it: {
        metaTitle: "Cosa fare a Capo Rizzuto in 3 giorni: itinerario",
        description:
          "Itinerario di 3 giorni a Isola di Capo Rizzuto: mare, Le Castella, Capo Colonna e Crotone. Consigli pratici da Residence Le Farfalle.",
        h1: "Cosa fare a Capo Rizzuto in 3 giorni",
        intro:
          "Tre giorni bastano per vivere il meglio della Calabria ionica: spiagge dell'Area Marina Protetta, borghi storici e archeologia. Ecco un itinerario pratico con base a Isola di Capo Rizzuto.",
        sections: [
          {
            heading: "Giorno 1 — Mare e Area Marina Protetta",
            body: [
              "Mattina in spiaggia tra Spiaggia Grande e Capopiccolo, con snorkeling nelle acque protette.",
              "Pomeriggio dedicato alle spiagge rosse e al relax; cena in paese a base di pesce.",
            ],
          },
          {
            heading: "Giorno 2 — Le Castella e tramonto",
            body: [
              "Visita al castello aragonese di Le Castella e bagno nelle calette vicine.",
              "Escursione in barca lungo la costa e aperitivo al tramonto vista fortezza.",
            ],
          },
          {
            heading: "Giorno 3 — Archeologia e Crotone",
            body: [
              "Parco Archeologico di Capo Colonna con il tempio di Hera Lacinia e la colonna superstite.",
              "Nel pomeriggio Crotone: centro storico e Museo Archeologico Nazionale della Magna Grecia.",
            ],
          },
        ],
        keywords: [
          "cosa fare a Capo Rizzuto",
          "itinerario Isola di Capo Rizzuto",
          "3 giorni Calabria ionica",
          "Capo Colonna",
          "Crotone cosa vedere",
        ],
      },
      en: {
        metaTitle: "What to do in Capo Rizzuto in 3 days: itinerary",
        description:
          "A 3-day itinerary in Isola di Capo Rizzuto: the sea, Le Castella, Capo Colonna and Crotone. Practical tips from Residence Le Farfalle.",
        h1: "What to do in Capo Rizzuto in 3 days",
        intro:
          "Three days are enough to enjoy the best of the Calabrian Ionian coast: Marine Protected Area beaches, historic villages and archaeology. Here is a practical itinerary based in Isola di Capo Rizzuto.",
        sections: [
          {
            heading: "Day 1 — Sea and Marine Protected Area",
            body: [
              "Morning on the beach between Spiaggia Grande and Capopiccolo, with snorkelling in the protected waters.",
              "Afternoon at the red beaches and relaxing; dinner in town with fresh fish.",
            ],
          },
          {
            heading: "Day 2 — Le Castella and sunset",
            body: [
              "Visit the Aragonese castle of Le Castella and swim in the nearby coves.",
              "Boat trip along the coast and a sunset aperitif with the fortress in view.",
            ],
          },
          {
            heading: "Day 3 — Archaeology and Crotone",
            body: [
              "Capo Colonna Archaeological Park with the Temple of Hera Lacinia and its surviving column.",
              "In the afternoon, Crotone: the old town and the National Archaeological Museum of Magna Graecia.",
            ],
          },
        ],
        keywords: [
          "what to do in Capo Rizzuto",
          "Isola di Capo Rizzuto itinerary",
          "3 days Calabria Ionian coast",
          "Capo Colonna",
          "Crotone what to see",
        ],
      },
      de: {
        metaTitle: "Capo Rizzuto in 3 Tagen: Reiseroute und Tipps",
        description:
          "3-Tage-Reiseroute in Isola di Capo Rizzuto: Meer, Le Castella, Capo Colonna und Crotone. Praktische Tipps vom Residence Le Farfalle.",
        h1: "Was man in Capo Rizzuto in 3 Tagen unternehmen kann",
        intro:
          "Drei Tage reichen, um das Beste der ionischen Küste Kalabriens zu erleben: Strände des Meeresschutzgebiets, historische Orte und Archäologie. Hier eine praktische Route mit Basis in Isola di Capo Rizzuto.",
        sections: [
          {
            heading: "Tag 1 — Meer und Meeresschutzgebiet",
            body: [
              "Vormittag am Strand zwischen Spiaggia Grande und Capopiccolo, mit Schnorcheln im geschützten Wasser.",
              "Nachmittag an den roten Stränden und Entspannung; Abendessen im Ort mit frischem Fisch.",
            ],
          },
          {
            heading: "Tag 2 — Le Castella und Sonnenuntergang",
            body: [
              "Besuch der aragonesischen Burg von Le Castella und Baden in den nahen Buchten.",
              "Bootsausflug entlang der Küste und ein Aperitif zum Sonnenuntergang mit Blick auf die Festung.",
            ],
          },
          {
            heading: "Tag 3 — Archäologie und Crotone",
            body: [
              "Archäologiepark Capo Colonna mit dem Tempel der Hera Lacinia und der erhaltenen Säule.",
              "Am Nachmittag Crotone: die Altstadt und das Nationale Archäologische Museum der Magna Graecia.",
            ],
          },
        ],
        keywords: [
          "was tun in Capo Rizzuto",
          "Isola di Capo Rizzuto Reiseroute",
          "3 Tage Kalabrien ionische Küste",
          "Capo Colonna",
          "Crotone Sehenswürdigkeiten",
        ],
      },
    },
  },
  {
    slug: "come-arrivare-capo-rizzuto",
    image: "/images/rooms/ingresso-le-farfalle.jpg",
    updated: "2026-09-10",
    imageAlt: {
      it: "Ingresso di Residence Le Farfalle a Isola di Capo Rizzuto",
      en: "Entrance of Residence Le Farfalle in Isola di Capo Rizzuto",
      de: "Eingang des Residence Le Farfalle in Isola di Capo Rizzuto",
    },
    content: {
      it: {
        metaTitle: "Come arrivare a Isola di Capo Rizzuto: aereo, auto, treno",
        description:
          "Come raggiungere Isola di Capo Rizzuto: aeroporti di Crotone e Lamezia, auto sulla SS106, treno. Tempi e consigli da Residence Le Farfalle.",
        h1: "Come arrivare a Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto è facilmente raggiungibile in aereo, auto o treno. Ecco tempi indicativi e consigli pratici per organizzare il viaggio.",
        sections: [
          {
            heading: "In aereo",
            body: [
              "Aeroporto di Crotone (Sant'Anna): il più vicino, circa 25 minuti dalla struttura.",
              "Aeroporto di Lamezia Terme: maggior numero di voli, circa 1 ora e 30–2 ore in auto.",
              "Offriamo transfer da e per l'aeroporto di Crotone su prenotazione.",
            ],
          },
          {
            heading: "In auto",
            body: [
              "Dalla SS106 Ionica si raggiunge Isola di Capo Rizzuto in pochi minuti.",
              "Da Crotone: circa 20 minuti. Parcheggio gratuito disponibile nelle vicinanze della struttura.",
            ],
          },
          {
            heading: "In treno",
            body: [
              "Stazione di Crotone sulla linea ionica, a circa 20 minuti in auto.",
              "Da lì è possibile proseguire con transfer, taxi o auto a noleggio.",
            ],
          },
        ],
        keywords: [
          "come arrivare Isola di Capo Rizzuto",
          "aeroporto Crotone Sant'Anna",
          "transfer aeroporto Crotone",
          "SS106 Isola di Capo Rizzuto",
          "treno Crotone",
        ],
      },
      en: {
        metaTitle: "How to reach Isola di Capo Rizzuto: air, car, train",
        description:
          "How to get to Isola di Capo Rizzuto: Crotone and Lamezia airports, car on the SS106, train. Times and tips from Residence Le Farfalle.",
        h1: "How to reach Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto is easy to reach by air, car or train. Here are approximate travel times and practical tips to plan your trip.",
        sections: [
          {
            heading: "By air",
            body: [
              "Crotone airport (Sant'Anna): the closest, about 25 minutes from the property.",
              "Lamezia Terme airport: more flights, about 1 hour 30 minutes to 2 hours by car.",
              "We offer transfers to and from Crotone airport on request.",
            ],
          },
          {
            heading: "By car",
            body: [
              "From the SS106 Ionian road, Isola di Capo Rizzuto is a few minutes away.",
              "From Crotone: about 20 minutes. Free parking is available near the property.",
            ],
          },
          {
            heading: "By train",
            body: [
              "Crotone station on the Ionian line is about 20 minutes away by car.",
              "From there you can continue by transfer, taxi or rental car.",
            ],
          },
        ],
        keywords: [
          "how to reach Isola di Capo Rizzuto",
          "Crotone Sant'Anna airport",
          "Crotone airport transfer",
          "SS106 Isola di Capo Rizzuto",
          "Crotone train",
        ],
      },
      de: {
        metaTitle: "Anreise nach Isola di Capo Rizzuto: Flug, Auto, Zug",
        description:
          "Anreise nach Isola di Capo Rizzuto: Flughäfen Crotone und Lamezia, Auto auf der SS106, Zug. Zeiten und Tipps vom Residence Le Farfalle.",
        h1: "Anreise nach Isola di Capo Rizzuto",
        intro:
          "Isola di Capo Rizzuto ist bequem mit dem Flugzeug, Auto oder Zug erreichbar. Hier finden Sie ungefähre Fahrzeiten und praktische Tipps zur Reiseplanung.",
        sections: [
          {
            heading: "Mit dem Flugzeug",
            body: [
              "Flughafen Crotone (Sant'Anna): der nächste, ca. 25 Minuten von der Unterkunft.",
              "Flughafen Lamezia Terme: mehr Flüge, ca. 1,5 bis 2 Stunden mit dem Auto.",
              "Wir bieten auf Anfrage Transfers vom und zum Flughafen Crotone an.",
            ],
          },
          {
            heading: "Mit dem Auto",
            body: [
              "Über die SS106 Ionica erreichen Sie Isola di Capo Rizzuto in wenigen Minuten.",
              "Von Crotone: ca. 20 Minuten. Kostenlose Parkplätze in der Nähe der Unterkunft.",
            ],
          },
          {
            heading: "Mit dem Zug",
            body: [
              "Bahnhof Crotone an der ionischen Linie, ca. 20 Autominuten entfernt.",
              "Von dort geht es mit Transfer, Taxi oder Mietwagen weiter.",
            ],
          },
        ],
        keywords: [
          "Anreise Isola di Capo Rizzuto",
          "Flughafen Crotone Sant'Anna",
          "Transfer Flughafen Crotone",
          "SS106 Isola di Capo Rizzuto",
          "Zug Crotone",
        ],
      },
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideSlugs = guides.map((g) => g.slug);

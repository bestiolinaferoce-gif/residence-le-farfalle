import React from "react";
import Image from "next/image";
import { MapPin, Clock, Waves, Umbrella, Camera, Compass } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import TerritorioHero from "@/src/components/territorio/TerritorioHero";
import TerritorioTabs from "@/src/components/territorio/TerritorioTabs";
import Newsletter from "@/src/components/sections/Newsletter";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

const territorioBreadcrumbLabel: Record<string, { home: string; territorio: string }> = {
  it: { home: "Home", territorio: "Territorio" },
  en: { home: "Home", territorio: "Area" },
  de: { home: "Home", territorio: "Region" },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const m = getPageMetadata("territorio", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "territorio"),
  };
}

type Category = "beach" | "history" | "nature" | "culture";

/**
 * Immagini reali del territorio (public/images/territorio), tranne la Sila (stock Unsplash).
 * Distanze/tempi: in auto dalla struttura (38.9617, 17.0916), OpenStreetMap + OSRM,
 * senza traffico, calcolati il 2026-09-21. Valori indicativi ("circa").
 * La struttura è nel centro del paese, NON sul mare: per le spiagge serve l'auto.
 */
const attractionBase: { key: string; category: Category; image: string }[] = [
  { key: "amp", category: "nature", image: "/images/territorio/area-marina-protetta.jpg" },
  { key: "leCastellaBeach", category: "beach", image: "/images/territorio/spiaggia-capopiccolo.jpg" },
  { key: "crotone", category: "history", image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg" },
  { key: "capoColonna", category: "history", image: "/images/territorio/tramonto-area-marina.jpg" },
  { key: "soverato", category: "beach", image: "/images/territorio/spiagge-rosse.jpg" },
  {
    key: "sila",
    category: "nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
  },
  { key: "leCastellaVillage", category: "culture", image: "/images/territorio/le-castella-castello.jpg" },
  { key: "valliCupe", category: "nature", image: "/images/territorio/valli-cupe-4.jpg" },
];

type AttractionCopy = {
  name: string;
  description: string;
  imageAlt: string;
  /** Distanza stradale indicativa; assente per le gite in giornata non verificate */
  distance?: string;
  time: string;
};

const copy = {
  it: {
    ampTitle: "Area Marina Protetta: perché è speciale",
    ampText:
      "Una delle aree marine protette più estese d'Italia: acque limpide, fondali ricchi di vita, snorkeling e immersioni. Siamo nel centro del paese, non sul mare: le spiagge più vicine (Curmo, Cavallucci, Chiancolilli, verso Capo Rizzuto) sono a circa 6 km, 10–15 minuti in auto. Un tesoro naturale da vivere e rispettare.",
    mapTitle: "La nostra posizione",
    mapFrameTitle: "Mappa: Residence Le Farfalle nel centro di Isola di Capo Rizzuto",
    attractionsTitle: "Attrazioni e luoghi da visitare",
    distanceLabel: "Distanza",
    timeLabel: "Tempo",
    attractions: {
      amp: {
        name: "Spiagge dell'Area Marina Protetta Capo Rizzuto",
        distance: "circa 6 km",
        time: "10–15 min in auto",
        description:
          "Una delle aree marine protette più estese d'Italia. Acque limpide e fondali ricchi di vita marina ne fanno un luogo ideale per snorkeling e immersioni. Dal centro serve l'auto. Consigliamo il mattino presto, quando il mare è più calmo e trasparente.",
        imageAlt: "Acqua turchese e piccola baia nell'Area Marina Protetta di Capo Rizzuto",
      },
      leCastellaBeach: {
        name: "Spiagge di Le Castella",
        distance: "circa 11 km",
        time: "circa 15 min",
        description:
          "Sabbia dorata e mare turchese, con il castello aragonese sull'isolotto che si specchia nell'acqua. Perfette per le famiglie. Il borgo offre anche ottimi ristoranti di pesce fresco.",
        imageAlt: "Spiaggia di sabbia e mare turchese sulla costa verso Le Castella",
      },
      crotone: {
        name: "Crotone, centro storico",
        distance: "circa 18 km",
        time: "20–25 min",
        description:
          "Città di storia millenaria, dalla Magna Grecia ai giorni nostri. Il Museo Archeologico Nazionale custodisce reperti unici e passeggiare per le vie del centro è un viaggio nel tempo. Consigliamo il pomeriggio, quando il caldo si attenua.",
        imageAlt: "Ampia spiaggia dorata sulla costa ionica in provincia di Crotone",
      },
      capoColonna: {
        name: "Parco archeologico di Capo Colonna",
        distance: "circa 15 km",
        time: "circa 25 min",
        description:
          "Sito archeologico con il tempio di Hera Lacinia, uno dei santuari più importanti della Magna Grecia. L'unica colonna superstite si staglia contro il cielo, con il mare tutt'intorno. Bellissimo nella luce del tardo pomeriggio. Ideale per una mezza giornata.",
        imageAlt: "Tramonto sul mare lungo la costa ionica crotonese",
      },
      soverato: {
        name: "Spiaggia di Soverato",
        time: "Gita in giornata",
        description:
          "Chiamata la “Perla dello Ionio”, Soverato ha una lunga spiaggia di sabbia fine con lidi attrezzati. Perfetta per chi cerca relax e comodità; il lungomare è ideale per una passeggiata serale.",
        imageAlt: "Sabbia rossastra, scogli e mare sulla costa ionica calabrese",
      },
      sila: {
        name: "Sila e Parco Nazionale",
        time: "Gita in giornata",
        description:
          "Il grande altopiano della Sila, con foreste secolari, laghi e sentieri. Perfetto per escursioni e trekking; d'estate offre frescura e panorami ampi. Consigliamo una giornata intera per esplorare laghi e borghi di montagna.",
        imageAlt: "Sentiero nel bosco di montagna, come quelli della Sila",
      },
      leCastellaVillage: {
        name: "Le Castella, borgo marinaro",
        distance: "circa 11 km",
        time: "circa 15 min",
        description:
          "Pittoresco borgo di pescatori con ristoranti tipici che servono pesce appena pescato, bar e negozi di artigianato locale. Atmosfera autentica e tradizione culinaria: ideale per una cena al tramonto.",
        imageAlt: "Castello aragonese di Le Castella circondato dal mare turchese",
      },
      valliCupe: {
        name: "Riserva naturale Valli Cupe",
        time: "Gita in giornata",
        description:
          "Canyon spettacolari, cascate nascoste e sentieri nella natura. Un'esperienza unica per chi ama il trekking e la fotografia. Le cascate danno il meglio in primavera. Servono scarpe comode e almeno mezza giornata.",
        imageAlt: "Riserva naturale Valli Cupe: canyon e vegetazione nell'entroterra",
      },
    } satisfies Record<string, AttractionCopy>,
    itinerariesTitle: "Itinerari consigliati",
    itineraries: [
      {
        title: "Mezza giornata",
        steps: [
          ["Mattina", "Spiagge dell'Area Marina Protetta per lo snorkeling (circa 6 km, 10–15 min in auto)"],
          ["Pomeriggio", "Le Castella: spiaggia e borgo marinaro (circa 11 km, circa 15 min)"],
        ],
        note: "Ideale per unire mare e cultura senza fretta",
      },
      {
        title: "Una giornata",
        steps: [
          ["Mattina", "Parco archeologico di Capo Colonna (circa 15 km, circa 25 min)"],
          ["Pranzo", "Ristorante tipico a Le Castella"],
          ["Pomeriggio", "Spiaggia e borgo di Le Castella"],
          ["Sera", "Cena nel centro storico di Crotone (circa 18 km, 20–25 min)"],
        ],
        note: "Perfetto per immergersi nella storia e nel mare calabrese",
      },
      {
        title: "Due giorni",
        steps: [
          ["Giorno 1", "Area Marina Protetta, Le Castella, Crotone"],
          ["Giorno 2", "Sila e Parco Nazionale: gita in giornata"],
        ],
        extra: "In alternativa: una giornata al mare a Soverato oppure un'escursione alle Valli Cupe",
        note: "L'itinerario completo per scoprire mare, storia e montagna",
      },
    ],
    experiencesTitle: "Esperienze da non perdere",
    experiences: [
      {
        icon: "🌅",
        title: "Capo Colonna al tramonto",
        text: "Il momento più suggestivo della giornata: la colonna del tempio di Hera si staglia contro il cielo colorato, con il mare tutt'intorno. Un'esperienza indimenticabile.",
        tip: "Consigliato: tardo pomeriggio, in estate (verifica gli orari di apertura del parco)",
      },
      {
        icon: "🐠",
        title: "Snorkeling nell'Area Marina",
        text: "Le acque limpide dell'Area Marina Protetta sono perfette per osservare la vita sottomarina. Porta la maschera e scopri un mondo colorato a pochi metri dalla riva.",
        tip: "Consigliato: mattina presto, con mare calmo",
      },
      {
        icon: "🍝",
        title: "Cena di pesce a Le Castella",
        text: "I ristoranti del borgo servono pesce pescato in giornata: pasta alle vongole, frittura di paranza, polpo alla griglia. La cucina calabrese al suo meglio.",
        tip: "Consigliato: prenotare la sera, meglio con vista mare",
      },
      {
        icon: "🏛️",
        title: "Museo Archeologico di Crotone",
        text: "Una straordinaria collezione di reperti magno-greci che racconta la storia di questa terra. Il diadema aureo e le statue sono capolavori assoluti. Imperdibile per gli appassionati di storia.",
        tip: "Consigliato: pomeriggio, 2–3 ore",
      },
    ],
    tipsTitle: "Consigli pratici dai nostri host",
    whenTitle: "Quando andare",
    when: [
      ["Maggio–giugno", "Clima ideale, meno affollamento, mare già piacevole"],
      ["Luglio–agosto", "Alta stagione, mare caldo, spiagge più affollate"],
      ["Settembre", "Ottimo compromesso: clima mite e meno turisti"],
      ["Ottobre", "Perfetto per escursioni e cultura, mare ancora balneabile"],
    ],
    moveTitle: "Come muoversi",
    move: [
      ["Auto", "Indispensabile per le spiagge e le attrazioni: siamo in centro, non sul mare. Parcheggio gratuito disponibile nelle vicinanze."],
      ["Mare vicino", "Spiagge dell'Area Marina (circa 6 km), Capo Rizzuto (circa 7 km), Le Castella (circa 11 km): 10–15 minuti"],
      ["Mezza giornata", "Capo Colonna (circa 15 km), Crotone (circa 18 km): 20–25 minuti"],
      ["Giornata intera", "Sila, Soverato, Valli Cupe: gite in giornata in auto"],
      ["Aeroporti", "Crotone Sant'Anna circa 4,5 km (5–10 min); Lamezia Terme circa 88 km (circa 1 h 30 min)"],
    ],
    moveNote: "Distanze stradali e tempi indicativi, senza traffico.",
    usefulTitle: "Suggerimenti utili",
    useful: [
      "Porta sempre crema solare e cappello: il sole calabrese è intenso",
      "In alta stagione prenota i ristoranti di Le Castella",
      "Le spiagge sono più piacevoli al mattino presto o nel tardo pomeriggio",
      "Per la Sila porta abbigliamento a strati: in montagna fa più fresco",
    ],
    helpTitle: "Assistenza",
    helpText:
      "Siamo qui per aiutarti a organizzare la tua vacanza. Chiedici consigli su ristoranti, spiagge meno note e orari migliori per le visite: conosciamo bene il territorio.",
    helpNote: "Scrivici su WhatsApp o via email per consigli personalizzati durante il soggiorno.",
    aboutTitle: "Isola di Capo Rizzuto: la nostra terra",
    about: [
      "Isola di Capo Rizzuto si trova sulla costa ionica della Calabria, in provincia di Crotone. Il nome viene dal promontorio di Capo Rizzuto, che si protende nel mar Ionio e disegna un paesaggio unico che abbiamo la fortuna di chiamare casa.",
      "La zona è conosciuta per le spiagge dorate, il mare limpido e l'Area Marina Protetta Capo Rizzuto, una delle più estese d'Italia. Acque trasparenti e fondali ricchi di vita la rendono ideale per snorkeling e immersioni. Viviamo qui da anni e ogni giorno scopriamo qualcosa di nuovo da condividere con i nostri ospiti.",
      "Oltre al mare, il territorio offre siti storici e archeologici come il Parco archeologico di Capo Colonna, con il tempio di Hera Lacinia, e un entroterra fatto di borghi caratteristici e tradizioni gastronomiche che fanno parte della nostra identità.",
      "Il clima mediterraneo, con estati calde e inverni miti, rende Isola di Capo Rizzuto piacevole in molti periodi dell'anno. L'estate è la stagione del mare, ma primavera e autunno offrono giornate splendide, meno affollamento e il clima giusto per esplorare.",
    ],
  },
  en: {
    ampTitle: "Why the marine protected area is special",
    ampText:
      "One of the largest marine protected areas in Italy: clear water, seabeds full of life, great snorkelling and diving. We are in the town centre, not on the seafront: the nearest beaches (Curmo, Cavallucci, Chiancolilli, towards Capo Rizzuto) are about 6 km away, 10–15 minutes by car. A natural treasure to enjoy and to respect.",
    mapTitle: "Where we are",
    mapFrameTitle: "Map: Residence Le Farfalle in the centre of Isola di Capo Rizzuto",
    attractionsTitle: "Places to visit",
    distanceLabel: "Distance",
    timeLabel: "Time",
    attractions: {
      amp: {
        name: "Beaches of the Capo Rizzuto Marine Protected Area",
        distance: "about 6 km",
        time: "10–15 min by car",
        description:
          "One of the largest marine protected areas in Italy. Clear water and seabeds rich in marine life make it ideal for snorkelling and diving. You'll need a car from the town centre. Go early in the morning, when the sea is at its calmest and clearest.",
        imageAlt: "Turquoise water in a small bay in the Capo Rizzuto Marine Protected Area",
      },
      leCastellaBeach: {
        name: "Le Castella beaches",
        distance: "about 11 km",
        time: "about 15 min",
        description:
          "Golden sand and turquoise sea, with the Aragonese castle on its islet reflected in the water. Great for families, and the village has excellent fresh-fish restaurants.",
        imageAlt: "Sandy beach and turquoise sea on the coast towards Le Castella",
      },
      crotone: {
        name: "Crotone old town",
        distance: "about 18 km",
        time: "20–25 min",
        description:
          "A city with thousands of years of history, from Magna Graecia to the present day. The National Archaeological Museum holds unique finds, and a stroll through the old streets feels like travelling back in time. Best visited in the afternoon, once the heat eases.",
        imageAlt: "Wide golden beach on the Ionian coast in the province of Crotone",
      },
      capoColonna: {
        name: "Capo Colonna Archaeological Park",
        distance: "about 15 km",
        time: "about 25 min",
        description:
          "Home to the temple of Hera Lacinia, one of the most important sanctuaries of Magna Graecia. Its single surviving column stands out against the sky, with the sea all around. Beautiful in the late-afternoon light and perfect for a half-day visit.",
        imageAlt: "Sunset over the sea on the Ionian coast near Crotone",
      },
      soverato: {
        name: "Soverato beach",
        time: "Day trip",
        description:
          "Known as the “Pearl of the Ionian”, Soverato has a long, fine-sand beach with well-equipped beach clubs. Ideal if you want an easy, relaxing day; the seafront promenade is lovely for an evening stroll.",
        imageAlt: "Reddish sand, rocks and sea on the Ionian coast of Calabria",
      },
      sila: {
        name: "Sila National Park",
        time: "Day trip",
        description:
          "The vast Sila plateau, with ancient forests, lakes and walking trails. Perfect for hiking; in summer it's pleasantly cool, with wide views. Allow a full day to explore the lakes and mountain villages.",
        imageAlt: "Forest trail in the mountains, like those of the Sila",
      },
      leCastellaVillage: {
        name: "Le Castella fishing village",
        distance: "about 11 km",
        time: "about 15 min",
        description:
          "A picturesque fishing village with traditional restaurants serving the day's catch, cafés and local craft shops. Authentic and full of flavour: ideal for dinner at sunset.",
        imageAlt: "The Aragonese castle of Le Castella surrounded by turquoise sea",
      },
      valliCupe: {
        name: "Valli Cupe nature reserve",
        time: "Day trip",
        description:
          "Dramatic canyons, hidden waterfalls and trails through unspoilt nature. A must for hikers and photographers. The waterfalls are at their best in spring. Wear sturdy shoes and allow at least half a day.",
        imageAlt: "Valli Cupe nature reserve: a narrow canyon and greenery inland",
      },
    } satisfies Record<string, AttractionCopy>,
    itinerariesTitle: "Suggested itineraries",
    itineraries: [
      {
        title: "Half a day",
        steps: [
          ["Morning", "Marine protected area beaches for snorkelling (about 6 km, 10–15 min by car)"],
          ["Afternoon", "Le Castella: beach and fishing village (about 11 km, about 15 min)"],
        ],
        note: "A relaxed mix of sea and culture",
      },
      {
        title: "One day",
        steps: [
          ["Morning", "Capo Colonna Archaeological Park (about 15 km, about 25 min)"],
          ["Lunch", "A traditional restaurant in Le Castella"],
          ["Afternoon", "Le Castella beach and village"],
          ["Evening", "Dinner in Crotone old town (about 18 km, 20–25 min)"],
        ],
        note: "History and the Calabrian sea in a single day",
      },
      {
        title: "Two days",
        steps: [
          ["Day 1", "Marine protected area, Le Castella, Crotone"],
          ["Day 2", "Sila National Park: day trip"],
        ],
        extra: "Alternatively: a beach day in Soverato or a hike in the Valli Cupe",
        note: "The full itinerary: sea, history and mountains",
      },
    ],
    experiencesTitle: "Experiences not to miss",
    experiences: [
      {
        icon: "🌅",
        title: "Capo Colonna at sunset",
        text: "The most atmospheric moment of the day: the column of the temple of Hera stands out against a colourful sky, with the sea all around. An unforgettable experience.",
        tip: "Best time: late afternoon in summer (check the park's opening hours)",
      },
      {
        icon: "🐠",
        title: "Snorkelling in the marine protected area",
        text: "The clear water of the marine protected area is perfect for watching underwater life. Bring a mask and discover a colourful world just a few metres from the shore.",
        tip: "Best time: early morning, when the sea is calm",
      },
      {
        icon: "🍝",
        title: "Seafood dinner in Le Castella",
        text: "The village restaurants serve fish caught the same day: pasta with clams, fried small fish (frittura di paranza), grilled octopus. Calabrian cooking at its best.",
        tip: "Tip: book for the evening, ideally with a sea view",
      },
      {
        icon: "🏛️",
        title: "Crotone Archaeological Museum",
        text: "An outstanding collection of Magna Graecia finds that tells the story of this land. The gold diadem and the statues are true masterpieces. A must for history lovers.",
        tip: "Best time: afternoon, allow 2–3 hours",
      },
    ],
    tipsTitle: "Practical tips from your hosts",
    whenTitle: "When to go",
    when: [
      ["May–June", "Ideal weather, fewer crowds, the sea is already pleasant"],
      ["July–August", "High season, warm sea, busier beaches"],
      ["September", "A great compromise: mild weather and fewer visitors"],
      ["October", "Perfect for hiking and culture, and the sea is often still warm enough to swim"],
    ],
    moveTitle: "Getting around",
    move: [
      ["Car", "Essential for the beaches and sights: we're in the town centre, not on the sea. Free parking is available nearby."],
      ["Nearby coast", "Marine protected area beaches (about 6 km), Capo Rizzuto (about 7 km), Le Castella (about 11 km): 10–15 minutes"],
      ["Half-day trips", "Capo Colonna (about 15 km), Crotone (about 18 km): 20–25 minutes"],
      ["Full-day trips", "Sila, Soverato, Valli Cupe: day trips by car"],
      ["Airports", "Crotone (Sant'Anna) about 4.5 km (5–10 min); Lamezia Terme about 88 km (about 1 h 30 min)"],
    ],
    moveNote: "Approximate road distances and driving times, without traffic.",
    usefulTitle: "Good to know",
    useful: [
      "Always bring sunscreen and a hat: the Calabrian sun is strong",
      "Book restaurants in Le Castella during high season",
      "Beaches are at their best early in the morning or late in the afternoon",
      "For the Sila, bring layers: it's cooler in the mountains",
    ],
    helpTitle: "We're here to help",
    helpText:
      "We're happy to help you plan your stay. Ask us about restaurants, lesser-known beaches and the best times to visit: we know the area well.",
    helpNote: "Message us on WhatsApp or by email for personal recommendations during your stay.",
    aboutTitle: "Isola di Capo Rizzuto: our home",
    about: [
      "Isola di Capo Rizzuto lies on the Ionian coast of Calabria, in the province of Crotone. It takes its name from the Capo Rizzuto headland, which juts out into the Ionian Sea and shapes a unique landscape that we are lucky to call home.",
      "The area is known for its golden beaches, clear sea and the Capo Rizzuto Marine Protected Area, one of the largest in Italy. Transparent water and seabeds full of life make it ideal for snorkelling and diving. We have lived here for years and still discover something new to share with our guests.",
      "Beyond the sea, there are historic and archaeological sites such as the Capo Colonna Archaeological Park, with the temple of Hera Lacinia, and a hinterland of characterful villages and food traditions that are part of who we are.",
      "The Mediterranean climate, with hot summers and mild winters, makes Isola di Capo Rizzuto pleasant for much of the year. Summer is the season for the sea, while spring and autumn bring beautiful days, fewer crowds and ideal weather for exploring.",
    ],
  },
  de: {
    ampTitle: "Das Meeresschutzgebiet: warum es so besonders ist",
    ampText:
      "Eines der größten Meeresschutzgebiete Italiens: klares Wasser, artenreiche Unterwasserwelt, ideal zum Schnorcheln und Tauchen. Unsere Unterkunft liegt im Ortszentrum, nicht direkt am Meer: Die nächstgelegenen Strände (Curmo, Cavallucci, Chiancolilli, Richtung Capo Rizzuto) sind ca. 6 km entfernt, 10–15 Minuten mit dem Auto. Ein Naturschatz, den es zu genießen und zu schützen gilt.",
    mapTitle: "So finden Sie uns",
    mapFrameTitle: "Karte: Residence Le Farfalle im Zentrum von Isola di Capo Rizzuto",
    attractionsTitle: "Sehenswürdigkeiten und Ausflugsziele",
    distanceLabel: "Entfernung",
    timeLabel: "Fahrzeit",
    attractions: {
      amp: {
        name: "Strände des Meeresschutzgebiets Capo Rizzuto",
        distance: "ca. 6 km",
        time: "10–15 Min. mit dem Auto",
        description:
          "Eines der größten Meeresschutzgebiete Italiens. Klares Wasser und eine artenreiche Unterwasserwelt machen es ideal zum Schnorcheln und Tauchen. Vom Ortszentrum aus benötigen Sie ein Auto. Am schönsten ist es früh am Morgen, wenn das Meer am ruhigsten und klarsten ist.",
        imageAlt: "Türkisfarbenes Wasser in einer kleinen Bucht im Meeresschutzgebiet Capo Rizzuto",
      },
      leCastellaBeach: {
        name: "Strände von Le Castella",
        distance: "ca. 11 km",
        time: "ca. 15 Min.",
        description:
          "Goldener Sand und türkisfarbenes Meer, in dem sich die aragonesische Burg auf ihrer kleinen Insel spiegelt. Ideal für Familien – und im Ort gibt es ausgezeichnete Fischrestaurants.",
        imageAlt: "Sandstrand und türkisfarbenes Meer an der Küste Richtung Le Castella",
      },
      crotone: {
        name: "Altstadt von Crotone",
        distance: "ca. 18 km",
        time: "20–25 Min.",
        description:
          "Eine Stadt mit jahrtausendealter Geschichte, von der Magna Graecia bis heute. Das Nationale Archäologische Museum zeigt einzigartige Funde, und ein Bummel durch die Altstadt ist eine Reise in die Vergangenheit. Am besten am Nachmittag, wenn die Hitze nachlässt.",
        imageAlt: "Breiter goldener Sandstrand an der ionischen Küste in der Provinz Crotone",
      },
      capoColonna: {
        name: "Archäologischer Park Capo Colonna",
        distance: "ca. 15 km",
        time: "ca. 25 Min.",
        description:
          "Hier steht der Tempel der Hera Lacinia, eines der bedeutendsten Heiligtümer der Magna Graecia. Die einzige erhaltene Säule ragt in den Himmel, ringsum das Meer. Besonders schön im Licht des späten Nachmittags – ideal für einen halben Tag.",
        imageAlt: "Sonnenuntergang über dem Meer an der ionischen Küste bei Crotone",
      },
      soverato: {
        name: "Strand von Soverato",
        time: "Tagesausflug",
        description:
          "Soverato, auch „Perle des Ionischen Meeres“ genannt, hat einen langen, feinsandigen Strand mit gut ausgestatteten Strandbädern. Ideal für einen entspannten Badetag; die Strandpromenade lädt zum Abendspaziergang ein.",
        imageAlt: "Rötlicher Sand, Felsen und Meer an der ionischen Küste Kalabriens",
      },
      sila: {
        name: "Sila-Nationalpark",
        time: "Tagesausflug",
        description:
          "Die weite Hochebene der Sila mit alten Wäldern, Seen und Wanderwegen. Perfekt zum Wandern; im Sommer angenehm kühl und mit weiten Ausblicken. Planen Sie einen ganzen Tag ein, um Seen und Bergdörfer zu erkunden.",
        imageAlt: "Waldweg in den Bergen, wie in der Sila",
      },
      leCastellaVillage: {
        name: "Le Castella, Fischerdorf",
        distance: "ca. 11 km",
        time: "ca. 15 Min.",
        description:
          "Ein malerisches Fischerdorf mit typischen Restaurants, die fangfrischen Fisch servieren, dazu Bars und Geschäfte mit lokalem Kunsthandwerk. Authentische Atmosphäre und gute Küche: ideal für ein Abendessen bei Sonnenuntergang.",
        imageAlt: "Die aragonesische Burg von Le Castella, umgeben von türkisfarbenem Meer",
      },
      valliCupe: {
        name: "Naturschutzgebiet Valli Cupe",
        time: "Tagesausflug",
        description:
          "Beeindruckende Schluchten, versteckte Wasserfälle und Wege durch unberührte Natur. Ein Erlebnis für Wanderer und Fotografen. Die Wasserfälle sind im Frühling am schönsten. Festes Schuhwerk und mindestens ein halber Tag sind empfehlenswert.",
        imageAlt: "Naturschutzgebiet Valli Cupe: enge Schlucht und Vegetation im Hinterland",
      },
    } satisfies Record<string, AttractionCopy>,
    itinerariesTitle: "Empfohlene Routen",
    itineraries: [
      {
        title: "Halber Tag",
        steps: [
          ["Vormittag", "Strände des Meeresschutzgebiets zum Schnorcheln (ca. 6 km, 10–15 Min. mit dem Auto)"],
          ["Nachmittag", "Le Castella: Strand und Fischerdorf (ca. 11 km, ca. 15 Min.)"],
        ],
        note: "Meer und Kultur ganz entspannt verbinden",
      },
      {
        title: "Ein Tag",
        steps: [
          ["Vormittag", "Archäologischer Park Capo Colonna (ca. 15 km, ca. 25 Min.)"],
          ["Mittagessen", "Typisches Restaurant in Le Castella"],
          ["Nachmittag", "Strand und Ortskern von Le Castella"],
          ["Abend", "Abendessen in der Altstadt von Crotone (ca. 18 km, 20–25 Min.)"],
        ],
        note: "Geschichte und kalabrisches Meer an einem Tag",
      },
      {
        title: "Zwei Tage",
        steps: [
          ["Tag 1", "Meeresschutzgebiet, Le Castella, Crotone"],
          ["Tag 2", "Sila-Nationalpark: Tagesausflug"],
        ],
        extra: "Alternativ: ein Strandtag in Soverato oder eine Wanderung in den Valli Cupe",
        note: "Die komplette Route: Meer, Geschichte und Berge",
      },
    ],
    experiencesTitle: "Erlebnisse, die Sie nicht verpassen sollten",
    experiences: [
      {
        icon: "🌅",
        title: "Capo Colonna bei Sonnenuntergang",
        text: "Der stimmungsvollste Moment des Tages: Die Säule des Hera-Tempels hebt sich vom farbigen Himmel ab, ringsum das Meer. Ein unvergessliches Erlebnis.",
        tip: "Empfohlen: später Nachmittag im Sommer (bitte die Öffnungszeiten des Parks prüfen)",
      },
      {
        icon: "🐠",
        title: "Schnorcheln im Meeresschutzgebiet",
        text: "Das klare Wasser des Schutzgebiets ist ideal, um die Unterwasserwelt zu beobachten. Nehmen Sie eine Taucherbrille mit und entdecken Sie eine farbenfrohe Welt nur wenige Meter vom Ufer entfernt.",
        tip: "Empfohlen: früh am Morgen bei ruhiger See",
      },
      {
        icon: "🍝",
        title: "Fischessen in Le Castella",
        text: "Die Restaurants im Ort servieren fangfrischen Fisch: Pasta mit Venusmuscheln, frittierte kleine Fische (frittura di paranza), gegrillter Oktopus. Kalabrische Küche von ihrer besten Seite.",
        tip: "Tipp: abends reservieren, am besten mit Meerblick",
      },
      {
        icon: "🏛️",
        title: "Archäologisches Museum Crotone",
        text: "Eine herausragende Sammlung von Funden aus der Magna Graecia, die die Geschichte dieser Region erzählt. Das goldene Diadem und die Statuen sind echte Meisterwerke. Ein Muss für Geschichtsinteressierte.",
        tip: "Empfohlen: nachmittags, 2–3 Stunden einplanen",
      },
    ],
    tipsTitle: "Praktische Tipps von Ihren Gastgebern",
    whenTitle: "Beste Reisezeit",
    when: [
      ["Mai–Juni", "Ideales Klima, weniger Andrang, das Meer ist schon angenehm"],
      ["Juli–August", "Hochsaison, warmes Meer, vollere Strände"],
      ["September", "Ein guter Kompromiss: mildes Wetter und weniger Urlauber"],
      ["Oktober", "Ideal für Ausflüge und Kultur, Baden ist oft noch möglich"],
    ],
    moveTitle: "Unterwegs vor Ort",
    move: [
      ["Auto", "Unverzichtbar für Strände und Ausflugsziele: Wir liegen im Ortszentrum, nicht am Meer. Kostenlose Parkplätze in der Nähe."],
      ["Küste in der Nähe", "Strände des Meeresschutzgebiets (ca. 6 km), Capo Rizzuto (ca. 7 km), Le Castella (ca. 11 km): 10–15 Minuten"],
      ["Halbtagesausflüge", "Capo Colonna (ca. 15 km), Crotone (ca. 18 km): 20–25 Minuten"],
      ["Tagesausflüge", "Sila, Soverato, Valli Cupe: Tagesausflüge mit dem Auto"],
      ["Flughäfen", "Crotone (Sant'Anna) ca. 4,5 km (5–10 Min.); Lamezia Terme ca. 88 km (ca. 1 Std. 30 Min.)"],
    ],
    moveNote: "Ungefähre Straßenentfernungen und Fahrzeiten ohne Verkehr.",
    usefulTitle: "Gut zu wissen",
    useful: [
      "Denken Sie immer an Sonnencreme und Hut: Die kalabrische Sonne ist intensiv",
      "Reservieren Sie in der Hochsaison die Restaurants in Le Castella",
      "An den Stränden ist es früh morgens oder am späten Nachmittag am schönsten",
      "Für die Sila empfiehlt sich Kleidung im Zwiebellook: In den Bergen ist es kühler",
    ],
    helpTitle: "Wir helfen gern",
    helpText:
      "Wir unterstützen Sie gern bei der Planung Ihres Urlaubs. Fragen Sie uns nach Restaurants, weniger bekannten Stränden und den besten Besuchszeiten: Wir kennen die Gegend gut.",
    helpNote: "Schreiben Sie uns per WhatsApp oder E-Mail – auch während Ihres Aufenthalts – für persönliche Empfehlungen.",
    aboutTitle: "Isola di Capo Rizzuto: unsere Heimat",
    about: [
      "Isola di Capo Rizzuto liegt an der ionischen Küste Kalabriens in der Provinz Crotone. Der Name geht auf das Kap Capo Rizzuto zurück, das weit ins Ionische Meer hinausragt und eine einzigartige Landschaft prägt, die wir unser Zuhause nennen dürfen.",
      "Bekannt ist die Gegend für goldene Strände, klares Meer und das Meeresschutzgebiet Capo Rizzuto, eines der größten Italiens. Transparentes Wasser und eine artenreiche Unterwasserwelt machen es ideal zum Schnorcheln und Tauchen. Wir leben seit Jahren hier und entdecken immer noch Neues, das wir mit unseren Gästen teilen.",
      "Neben dem Meer gibt es historische und archäologische Stätten wie den Archäologischen Park Capo Colonna mit dem Tempel der Hera Lacinia sowie ein Hinterland mit charakteristischen Dörfern und kulinarischen Traditionen, die zu unserer Identität gehören.",
      "Dank des mediterranen Klimas mit heißen Sommern und milden Wintern ist Isola di Capo Rizzuto einen großen Teil des Jahres ein angenehmes Reiseziel. Der Sommer gehört dem Meer, doch Frühling und Herbst bieten herrliche Tage, weniger Andrang und das ideale Wetter für Entdeckungstouren.",
    ],
  },
} as const;

const categoryIcons: Record<Category, React.ReactNode> = {
  beach: <Waves className="h-5 w-5" aria-hidden />,
  history: <Camera className="h-5 w-5" aria-hidden />,
  nature: <Compass className="h-5 w-5" aria-hidden />,
  culture: <Umbrella className="h-5 w-5" aria-hidden />,
};

interface TerritorioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TerritorioPage({ params }: TerritorioPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const c = copy[currentLocale as keyof typeof copy] ?? copy.it;
  const mapLang = currentLocale in copy ? currentLocale : "it";
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const bc = territorioBreadcrumbLabel[currentLocale] ?? territorioBreadcrumbLabel.it;
  const attractions = attractionBase.map((a) => ({
    ...a,
    ...(c.attractions[a.key as keyof typeof c.attractions] as AttractionCopy),
  }));

  return (
    <div className="min-h-screen pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: bc.home, url: `${baseUrl}/${currentLocale}` },
          { name: bc.territorio, url: `${baseUrl}/${currentLocale}/territorio` },
        ]}
      />
      <TerritorioHero locale={currentLocale} />

      {/* Blocchi strutturati con tab */}
      <TerritorioTabs locale={currentLocale} />

      {/* Area Marina Protetta - perché è speciale */}
      <section className="py-20 bg-secondary-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-neutral-900">
            {c.ampTitle}
          </h2>
          <p className="max-w-3xl mx-auto text-center text-neutral-600 leading-relaxed">
            {c.ampText}
          </p>
        </Container>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-white">
        <Container>
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-center mb-4 text-neutral-900">
              {c.mapTitle}
            </h2>
            <p className="text-center text-neutral-600 max-w-2xl mx-auto">
              {siteConfig.address}
            </p>
          </div>
          <div className="h-96 rounded-xl overflow-hidden shadow-medium">
            <iframe
              src={`https://maps.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&hl=${mapLang}&z=14&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={c.mapFrameTitle}
              className="w-full h-full"
            />
          </div>
        </Container>
      </section>

      {/* Attractions Grid */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            {c.attractionsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <Card key={attraction.key} hover className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={attraction.image}
                    alt={attraction.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 motion-reduce:group-hover:scale-100 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                    <span className="text-primary-600">
                      {categoryIcons[attraction.category] || <MapPin className="h-5 w-5" aria-hidden />}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900">{attraction.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4 flex-1">{attraction.description}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 pt-4 border-t border-neutral-200">
                    {attraction.distance && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" aria-hidden />
                        <span className="sr-only">{c.distanceLabel}: </span>
                        <span>{attraction.distance}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden />
                      <span className="sr-only">{c.timeLabel}: </span>
                      <span>{attraction.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Mini-Itinerari */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            {c.itinerariesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.itineraries.map((it) => (
              <Card key={it.title} hover className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary-600" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900">{it.title}</h3>
                </div>
                {it.steps.map(([label, text]) => (
                  <p key={label} className="text-neutral-600 mb-2">
                    <strong className="text-neutral-900">{label}:</strong> {text}
                  </p>
                ))}
                {"extra" in it && it.extra && <p className="text-neutral-600 mb-2">{it.extra}</p>}
                <p className="text-sm text-neutral-500 mt-4">{it.note}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Esperienze Consigliate */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            {c.experiencesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {c.experiences.map((e) => (
              <Card key={e.title} hover className="p-6">
                <h3 className="font-semibold text-xl mb-3 text-neutral-900">
                  <span aria-hidden>{e.icon} </span>
                  {e.title}
                </h3>
                <p className="text-neutral-600 mb-2">{e.text}</p>
                <p className="text-sm text-neutral-500">{e.tip}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Consigli Pratici */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            {c.tipsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">
                <span aria-hidden>⏰ </span>
                {c.whenTitle}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                {c.when.map(([label, text]) => (
                  <li key={label} className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold" aria-hidden>•</span>
                    <span>
                      <strong>{label}:</strong> {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">
                <span aria-hidden>🚗 </span>
                {c.moveTitle}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                {c.move.map(([label, text]) => (
                  <li key={label} className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold" aria-hidden>•</span>
                    <span>
                      <strong>{label}:</strong> {text}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-neutral-500">{c.moveNote}</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">
                <span aria-hidden>💡 </span>
                {c.usefulTitle}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                {c.useful.map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold" aria-hidden>•</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">
                <span aria-hidden>📞 </span>
                {c.helpTitle}
              </h3>
              <p className="text-neutral-700 mb-4">{c.helpText}</p>
              <p className="text-sm text-neutral-500">{c.helpNote}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* About Isola di Capo Rizzuto */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-8 text-neutral-900">
              {c.aboutTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
              {c.about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Newsletter variant="light" />
    </div>
  );
}

"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Waves, Compass } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

type TabKey = "spiagge" | "servizi" | "esperienze";

const tabIcons: Record<TabKey, React.ElementType> = {
  spiagge: Waves,
  servizi: MapPin,
  esperienze: Compass,
};
const tabOrder: TabKey[] = ["spiagge", "servizi", "esperienze"];

/**
 * Distanze in auto dalla struttura (38.9617, 17.0916), OpenStreetMap + OSRM,
 * senza traffico, calcolate il 2026-09-21. Valori indicativi.
 * La struttura è in centro paese, NON sul mare.
 */
const copy = {
  it: {
    tablistLabel: "Cosa trovi nei dintorni",
    tabs: { spiagge: "Spiagge", servizi: "Servizi", esperienze: "Esperienze" },
    beachesNote:
      "La struttura è nel centro del paese, non sul mare: per raggiungere le spiagge serve l'auto (o un transfer). Tempi indicativi, senza traffico.",
    spiagge: [
      {
        name: "Spiagge dell'Area Marina Protetta (Curmo, Cavallucci, Chiancolilli)",
        dist: "circa 6 km",
        time: "10–15 min in auto",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Acqua turchese e piccola baia nell'Area Marina Protetta Capo Rizzuto",
      },
      {
        name: "Capo Rizzuto",
        dist: "circa 7 km",
        time: "10–15 min in auto",
        image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
        imageAlt: "Ampia spiaggia dorata con scogli nella zona di Capo Rizzuto",
      },
      {
        name: "Le Castella",
        dist: "circa 11 km",
        time: "circa 15 min in auto",
        image: "/images/territorio/spiaggia-capopiccolo.jpg",
        imageAlt: "Spiaggia di sabbia e mare turchese sulla costa verso Le Castella",
      },
      {
        name: "Capo Colonna",
        dist: "circa 15 km",
        time: "circa 25 min in auto",
        image: "/images/territorio/tramonto-area-marina.jpg",
        imageAlt: "Tramonto sul mare lungo la costa ionica crotonese",
      },
      {
        name: "Soverato e la costa verso Catanzaro",
        dist: "Gita in giornata",
        time: "in auto",
        image: "/images/territorio/spiagge-rosse.jpg",
        imageAlt: "Sabbia rossastra, scogli e mare sulla costa ionica calabrese",
      },
    ],
    servicesImageAlt: "Castello aragonese di Le Castella sul mare turchese",
    servicesHeading: "Isola di Capo Rizzuto: cosa trovi a piedi (siamo in centro)",
    servicesText:
      "In auto raggiungi in 10–15 minuti le spiagge dell'Area Marina Protetta e in circa 15 minuti Le Castella; in giornata, borghi come Santa Severina e le Valli Cupe.",
    servicesItems: ["Bar", "Ristoranti", "Market", "Farmacie", "Passeggiata serale"],
    esperienze: [
      {
        title: "Snorkeling",
        desc: "Le acque limpide dell'Area Marina Protetta",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Mare limpido dell'Area Marina Protetta, ideale per lo snorkeling",
      },
      {
        title: "Gite in barca",
        desc: "Escursioni in barca lungo la costa",
        image: "/images/territorio/tramonto-le-castella.jpg",
        imageAlt: "Tramonto sul castello aragonese di Le Castella visto dal mare",
      },
      {
        title: "Escursioni",
        desc: "Tour guidati e visite culturali",
        image: "/images/territorio/santa-severina.jpg",
        imageAlt: "Borgo di Santa Severina nell'entroterra crotonese",
      },
    ],
  },
  en: {
    tablistLabel: "What's nearby",
    tabs: { spiagge: "Beaches", servizi: "In town", esperienze: "Experiences" },
    beachesNote:
      "We are in the town centre, not on the seafront: you'll need a car (or a transfer) to reach the beaches. Approximate driving times without traffic.",
    spiagge: [
      {
        name: "Marine protected area beaches (Curmo, Cavallucci, Chiancolilli)",
        dist: "about 6 km",
        time: "10–15 min by car",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Turquoise water in a small bay in the Capo Rizzuto Marine Protected Area",
      },
      {
        name: "Capo Rizzuto",
        dist: "about 7 km",
        time: "10–15 min by car",
        image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
        imageAlt: "Wide golden beach with rocks near Capo Rizzuto",
      },
      {
        name: "Le Castella",
        dist: "about 11 km",
        time: "about 15 min by car",
        image: "/images/territorio/spiaggia-capopiccolo.jpg",
        imageAlt: "Sandy beach and turquoise sea on the coast towards Le Castella",
      },
      {
        name: "Capo Colonna",
        dist: "about 15 km",
        time: "about 25 min by car",
        image: "/images/territorio/tramonto-area-marina.jpg",
        imageAlt: "Sunset over the sea on the Ionian coast near Crotone",
      },
      {
        name: "Soverato and the coast towards Catanzaro",
        dist: "Day trip",
        time: "by car",
        image: "/images/territorio/spiagge-rosse.jpg",
        imageAlt: "Reddish sand, rocks and sea on the Ionian coast of Calabria",
      },
    ],
    servicesImageAlt: "The Aragonese castle of Le Castella surrounded by turquoise sea",
    servicesHeading: "Isola di Capo Rizzuto: what's within walking distance (we're in the town centre)",
    servicesText:
      "By car, the beaches of the marine protected area are 10–15 minutes away and Le Castella about 15 minutes; for a day out, try villages such as Santa Severina or the Valli Cupe nature reserve.",
    servicesItems: ["Cafés", "Restaurants", "Grocery store", "Pharmacies", "Evening stroll"],
    esperienze: [
      {
        title: "Snorkelling",
        desc: "The clear waters of the marine protected area",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Clear water in the marine protected area, ideal for snorkelling",
      },
      {
        title: "Boat trips",
        desc: "Boat excursions along the coast",
        image: "/images/territorio/tramonto-le-castella.jpg",
        imageAlt: "Sunset over the Aragonese castle of Le Castella seen from the sea",
      },
      {
        title: "Excursions",
        desc: "Guided tours and cultural visits",
        image: "/images/territorio/santa-severina.jpg",
        imageAlt: "The hilltop village of Santa Severina, inland from Crotone",
      },
    ],
  },
  de: {
    tablistLabel: "Was Sie in der Umgebung finden",
    tabs: { spiagge: "Strände", servizi: "Im Ort", esperienze: "Erlebnisse" },
    beachesNote:
      "Unsere Unterkunft liegt im Ortszentrum, nicht direkt am Meer: Für die Strände benötigen Sie ein Auto (oder einen Transfer). Ungefähre Fahrzeiten ohne Verkehr.",
    spiagge: [
      {
        name: "Strände des Meeresschutzgebiets (Curmo, Cavallucci, Chiancolilli)",
        dist: "ca. 6 km",
        time: "10–15 Min. mit dem Auto",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Türkisfarbenes Wasser in einer kleinen Bucht im Meeresschutzgebiet Capo Rizzuto",
      },
      {
        name: "Capo Rizzuto",
        dist: "ca. 7 km",
        time: "10–15 Min. mit dem Auto",
        image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
        imageAlt: "Breiter goldener Sandstrand mit Felsen bei Capo Rizzuto",
      },
      {
        name: "Le Castella",
        dist: "ca. 11 km",
        time: "ca. 15 Min. mit dem Auto",
        image: "/images/territorio/spiaggia-capopiccolo.jpg",
        imageAlt: "Sandstrand und türkisfarbenes Meer an der Küste Richtung Le Castella",
      },
      {
        name: "Capo Colonna",
        dist: "ca. 15 km",
        time: "ca. 25 Min. mit dem Auto",
        image: "/images/territorio/tramonto-area-marina.jpg",
        imageAlt: "Sonnenuntergang über dem Meer an der ionischen Küste bei Crotone",
      },
      {
        name: "Soverato und die Küste Richtung Catanzaro",
        dist: "Tagesausflug",
        time: "mit dem Auto",
        image: "/images/territorio/spiagge-rosse.jpg",
        imageAlt: "Rötlicher Sand, Felsen und Meer an der ionischen Küste Kalabriens",
      },
    ],
    servicesImageAlt: "Die aragonesische Burg von Le Castella im türkisfarbenen Meer",
    servicesHeading: "Isola di Capo Rizzuto: alles zu Fuß erreichbar (wir liegen im Ortszentrum)",
    servicesText:
      "Mit dem Auto erreichen Sie die Strände des Meeresschutzgebiets in 10–15 Minuten und Le Castella in ca. 15 Minuten; für einen Tagesausflug bieten sich Orte wie Santa Severina oder das Naturschutzgebiet Valli Cupe an.",
    servicesItems: ["Bars", "Restaurants", "Lebensmittelgeschäft", "Apotheken", "Abendspaziergang"],
    esperienze: [
      {
        title: "Schnorcheln",
        desc: "Das klare Wasser des Meeresschutzgebiets",
        image: "/images/territorio/area-marina-protetta.jpg",
        imageAlt: "Klares Wasser im Meeresschutzgebiet, ideal zum Schnorcheln",
      },
      {
        title: "Bootsausflüge",
        desc: "Bootstouren entlang der Küste",
        image: "/images/territorio/tramonto-le-castella.jpg",
        imageAlt: "Sonnenuntergang über der aragonesischen Burg von Le Castella, vom Meer aus gesehen",
      },
      {
        title: "Ausflüge",
        desc: "Geführte Touren und Kulturbesuche",
        image: "/images/territorio/santa-severina.jpg",
        imageAlt: "Das Bergdorf Santa Severina im Hinterland von Crotone",
      },
    ],
  },
} as const;

export default function TerritorioTabs({ locale = "it" }: { locale?: string }) {
  const c = copy[locale as keyof typeof copy] ?? copy.it;
  const [activeTab, setActiveTab] = useState<TabKey>("spiagge");
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    spiagge: null,
    servizi: null,
    esperienze: null,
  });

  const panelMotion = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  const tabId = (k: TabKey) => `${baseId}-tab-${k}`;
  const panelId = (k: TabKey) => `${baseId}-panel-${k}`;

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabOrder.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabOrder.length) % tabOrder.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabOrder.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const key = tabOrder[next];
    setActiveTab(key);
    tabRefs.current[key]?.focus();
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <h2
          id={`${baseId}-heading`}
          className="font-display text-3xl font-bold mb-6 text-neutral-900"
        >
          {c.tablistLabel}
        </h2>
        <div
          role="tablist"
          aria-labelledby={`${baseId}-heading`}
          className="flex flex-wrap gap-2 mb-12"
        >
          {tabOrder.map((key, idx) => {
            const Icon = tabIcons[key];
            const selected = activeTab === key;
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el;
                }}
                type="button"
                role="tab"
                id={tabId(key)}
                aria-selected={selected}
                aria-controls={panelId(key)}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(key)}
                onKeyDown={(e) => onKeyDown(e, idx)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                  selected
                    ? "bg-secondary-500 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {c.tabs[key]}
              </button>
            );
          })}
        </div>

        {activeTab === "spiagge" && (
          <motion.div
            {...panelMotion}
            role="tabpanel"
            id={panelId("spiagge")}
            aria-labelledby={tabId("spiagge")}
          >
            <p className="mb-6 text-sm text-neutral-600 max-w-3xl">{c.beachesNote}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.spiagge.map((s) => (
                <Card key={s.name} hover className="group overflow-hidden p-0 flex flex-col">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-semibold text-lg text-neutral-900 mb-2">{s.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {s.dist} • {s.time}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "servizi" && (
          <motion.div
            {...panelMotion}
            role="tabpanel"
            id={panelId("servizi")}
            aria-labelledby={tabId("servizi")}
            className="space-y-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-medium">
                <Image
                  src="/images/territorio/le-castella-castello-2.jpg"
                  alt={c.servicesImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
                  {c.servicesHeading}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{c.servicesText}</p>
                <ul className="flex flex-wrap gap-3">
                  {c.servicesItems.map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 bg-secondary-100 text-secondary-800 rounded-lg font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "esperienze" && (
          <motion.div
            {...panelMotion}
            role="tabpanel"
            id={panelId("esperienze")}
            aria-labelledby={tabId("esperienze")}
            className="grid md:grid-cols-3 gap-6"
          >
            {c.esperienze.map((e) => (
              <Card key={e.title} hover className="group overflow-hidden p-0 flex flex-col">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={e.image}
                    alt={e.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{e.title}</h3>
                  <p className="text-sm text-neutral-600">{e.desc}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

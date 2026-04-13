"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Waves, Compass } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

type TabKey = "spiagge" | "servizi" | "esperienze";

const tabConfig: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "spiagge", label: "Spiagge", icon: Waves },
  { key: "servizi", label: "Servizi", icon: MapPin },
  { key: "esperienze", label: "Esperienze", icon: Compass },
];

const spiaggeData: {
  name: string;
  dist: string;
  time: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    name: "Area Marina Protetta",
    dist: "2 km",
    time: "5 min",
    image: "/images/territorio/area-marina-protetta.jpg",
    imageAlt: "Area Marina Protetta Capo Rizzuto, mare turchese",
  },
  {
    name: "Le Castella",
    dist: "8 km",
    time: "15 min",
    image: "/images/territorio/spiaggia-capopiccolo.jpg",
    imageAlt: "Spiaggia e mare vicino a Le Castella",
  },
  {
    name: "Spiagge Isola di Capo Rizzuto",
    dist: "0 km",
    time: "In centro",
    image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
    imageAlt: "Spiaggia Grande, Isola di Capo Rizzuto",
  },
  {
    name: "Capo Colonna",
    dist: "15 km",
    time: "25 min",
    image: "/images/territorio/tramonto-area-marina.jpg",
    imageAlt: "Tramonto sul mare in zona Capo Rizzuto, vicino al sito di Capo Colonna",
  },
  {
    name: "Soverato",
    dist: "45 km",
    time: "50 min",
    image: "/images/territorio/spiagge-rosse.jpg",
    imageAlt: "Costa ionica calabrese con rocce e mare — ideale per una giornata verso Soverato",
  },
];

const serviziData = [
  { title: "A piedi in centro", items: ["Bar", "Ristoranti", "Market", "Farmacie", "Passeggiata serale"] },
];

const esperienzeData: { title: string; desc: string; image: string; imageAlt: string }[] = [
  {
    title: "Snorkeling",
    desc: "Le acque cristalline dell'Area Marina Protetta",
    image: "/images/territorio/area-marina-protetta.jpg",
    imageAlt: "Mare limpido dell'Area Marina Protetta, ideale per snorkeling",
  },
  {
    title: "Boat tour",
    desc: "Gite in barca lungo la costa",
    image: "/images/territorio/tramonto-le-castella.jpg",
    imageAlt: "Tramonto sul castello aragonese di Le Castella visto dal mare",
  },
  {
    title: "Escursioni",
    desc: "Tour guidati e visite culturali",
    image: "/images/territorio/santa-severina.jpg",
    imageAlt: "Borgo di Santa Severina nell'entroterra crotonese",
  },
];

export default function TerritorioTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("spiagge");

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="flex flex-wrap gap-2 mb-12">
          {tabConfig.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-secondary-500 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "spiagge" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {spiaggeData.map((s) => (
              <Card key={s.name} hover className="group overflow-hidden p-0 flex flex-col">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          </motion.div>
        )}

        {activeTab === "servizi" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-medium">
                <Image
                  src="/images/territorio/le-castella-castello-2.jpg"
                  alt="Castello aragonese di Le Castella — gita facile dalla residence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
                  Isola di Capo Rizzuto: cosa trovi a piedi (siamo in centro)
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  In auto pochi minuti raggiungi anche Le Castella e l&apos;Area Marina; in giornata,
                  borghi come Santa Severina e le Valli Cupe.
                </p>
                <div className="flex flex-wrap gap-3">
                  {serviziData[0].items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-secondary-100 text-secondary-800 rounded-lg font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "esperienze" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {esperienzeData.map((e) => (
              <Card key={e.title} hover className="group overflow-hidden p-0 flex flex-col">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={e.image}
                    alt={e.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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

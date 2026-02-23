"use client";

import React, { useState } from "react";
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

const spiaggeData = [
  { name: "Area Marina Protetta", dist: "2 km", time: "5 min" },
  { name: "Le Castella", dist: "8 km", time: "15 min" },
  { name: "Spiagge Isola di Capo Rizzuto", dist: "0 km", time: "In centro" },
  { name: "Capo Colonna", dist: "15 km", time: "25 min" },
  { name: "Soverato", dist: "45 km", time: "50 min" },
];

const serviziData = [
  { title: "A piedi in centro", items: ["Bar", "Ristoranti", "Market", "Farmacie", "Passeggiata serale"] },
];

const esperienzeData = [
  { title: "Snorkeling", desc: "Le acque cristalline dell'Area Marina Protetta" },
  { title: "Boat tour", desc: "Gite in barca lungo la costa" },
  { title: "Escursioni", desc: "Tour guidati e visite culturali" },
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
              <Card key={s.name} hover>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">{s.name}</h3>
                <p className="text-sm text-neutral-600">
                  {s.dist} • {s.time}
                </p>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "servizi" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
                Isola di Capo Rizzuto: cosa trovi a piedi (siamo in centro)
              </h3>
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
          </motion.div>
        )}

        {activeTab === "esperienze" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {esperienzeData.map((e) => (
              <Card key={e.title} hover>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">{e.title}</h3>
                <p className="text-sm text-neutral-600">{e.desc}</p>
              </Card>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

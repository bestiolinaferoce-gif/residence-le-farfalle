"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, Home, Heart, Sparkles } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

const cards = [
  {
    icon: Shield,
    title: "Pulizia Impeccabile",
    description:
      "Camere e spazi comuni curati nei minimi dettagli per garantirti un soggiorno confortevole e igienico",
  },
  {
    icon: MapPin,
    title: "Posizione Strategica",
    description:
      "Nel cuore di Isola di Capo Rizzuto. A pochi minuti dalle spiagge dell'Area Marina Protetta e dai servizi",
  },
  {
    icon: Home,
    title: "Comfort Totale",
    description:
      "Aria condizionata, WiFi superfast, bagno privato, set cortesia. Tutto per un soggiorno indimenticabile",
  },
  {
    icon: Heart,
    title: "Relax Garantito",
    description:
      "Ambiente tranquillo e accogliente, perfetto per staccare dalla routine e rigenerarti",
  },
  {
    icon: Sparkles,
    title: "Colazione Inclusa",
    description:
      "Colazione continentale servita ogni mattina per iniziare la giornata con energia",
  },
];

export default function PercheLeFarfalle() {
  return (
    <section className="py-24 bg-gradient-to-b from-sand-50 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Perché Le Farfalle
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            La scelta giusta per la tua vacanza in Calabria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                hover
                className="h-full text-center group"
                padding="lg"
              >
                <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary-200 transition-colors">
                  <card.icon className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-neutral-900">
                  {card.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

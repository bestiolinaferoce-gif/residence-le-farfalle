"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Waves, MapPin, Sun } from "lucide-react";
import Container from "@/src/components/ui/Container";

const highlights = [
  {
    icon: Car,
    title: "Spiagge in auto",
    description: "Le spiagge dell'Area Marina Protetta sono raggiungibili in 5–15 minuti d'auto da noi.",
  },
  {
    icon: Waves,
    title: "Area Marina Protetta",
    description: "Una delle più estese riserve marine d'Italia, con acque cristalline e fondali ricchi di vita.",
  },
  {
    icon: MapPin,
    title: "Mete vicine",
    description: "Le Castella, Capo Colonna e Crotone sono facilmente raggiungibili per escursioni.",
  },
  {
    icon: Sun,
    title: "Navette e transfer",
    description: "Informazioni su navette e transfer disponibili direttamente in struttura.",
  },
];

export default function MareVicino() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-amber-600 text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Isola di Capo Rizzuto
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Il mare è a portata di mano
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Le Farfalle si trovano nel centro di Isola di Capo Rizzuto. Le spiagge più
            belle dell&apos;Area Marina Protetta sono raggiungibili comodamente in pochi minuti.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-6 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white rounded-xl border border-stone-100 flex items-center justify-center mb-4 shadow-sm">
                <item.icon className="h-5 w-5 text-amber-600" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Inline info strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 rounded-2xl bg-stone-900 text-white px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="font-semibold text-lg">Area Marina Protetta Capo Rizzuto</p>
            <p className="text-stone-400 text-sm mt-1">
              Una delle più grandi riserve marine d&apos;Italia. Acque limpide, snorkeling e immersioni.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium whitespace-nowrap">
            <Waves className="h-4 w-4" />
            5–15 min in auto
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

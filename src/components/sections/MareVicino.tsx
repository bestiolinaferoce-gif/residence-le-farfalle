"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Waves, Car } from "lucide-react";
import Container from "@/src/components/ui/Container";

const bullets = [
  { icon: Car, text: "Spiagge in auto: 5–15 min" },
  { icon: Waves, text: "Area Marina Protetta a pochi km" },
  { icon: MapPin, text: "Le Castella, Capo Colonna, Crotone facilmente raggiungibili" },
];

export default function MareVicino() {
  return (
    <section className="py-24 bg-gradient-to-br from-sea-50 via-secondary-50 to-sand-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Il Mare è Vicino
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Le spiagge più belle dell&apos;Area Marina Protetta a pochi minuti da noi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.ul
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {bullets.map((b) => (
              <li key={b.text} className="flex items-center gap-4 text-neutral-700">
                <b.icon className="h-6 w-6 text-secondary-500 flex-shrink-0" />
                <span className="text-lg">{b.text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-secondary-200 shadow-medium"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Waves className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  Area Marina Protetta Capo Rizzuto
                </h3>
                <p className="text-neutral-600">
                  Una delle più grandi riserve marine d&apos;Italia. Acque cristalline e fondali
                  ricchi di vita marina. Snorkeling e immersioni a pochi minuti dalla struttura.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Home, Leaf, Coffee } from "lucide-react";
import Container from "@/src/components/ui/Container";

const features = [
  {
    icon: ShieldCheck,
    title: "Pulizia impeccabile",
    description:
      "Camere e spazi comuni curati nei minimi dettagli, con ricambio biancheria e sanificazione quotidiana.",
  },
  {
    icon: MapPin,
    title: "Posizione centrale",
    description:
      "Nel cuore di Isola di Capo Rizzuto, a pochi minuti a piedi dai servizi, ristoranti e dalle navette per le spiagge.",
  },
  {
    icon: Home,
    title: "Comfort autentico",
    description:
      "Aria condizionata, WiFi superfast, bagno privato e set cortesia inclusi in ogni camera.",
  },
  {
    icon: Leaf,
    title: "Relax e tranquillità",
    description:
      "Un ambiente tranquillo e accogliente per staccare dalla routine e vivere la Calabria più autentica.",
  },
  {
    icon: Coffee,
    title: "Colazione ogni mattina",
    description:
      "Colazione continentale servita ogni mattina: l'energia giusta per esplorare la Calabria ionica.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function PercheLeFarfalle() {
  return (
    <section className="py-24 bg-stone-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-600 text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            I nostri punti di forza
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Perché scegliere Le Farfalle
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Un soggiorno curato, senza sorprese, nel posto giusto per scoprire la Calabria.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-7 border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                <feature.icon className="h-5 w-5 text-amber-600" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-base text-stone-900 mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

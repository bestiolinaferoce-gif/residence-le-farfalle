"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Wifi,
  Wind,
  Droplet,
  Tv,
  Moon,
  ParkingCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Container from "@/src/components/ui/Container";
import Link from "next/link";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const includedServices: Service[] = [
  {
    icon: <Coffee className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Colazione inclusa",
    description: "Ogni mattina dalle 7:30 alle 10:00 nella sala comune",
  },
  {
    icon: <Wifi className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "WiFi superfast",
    description: "Connessione fibra, password in camera",
  },
  {
    icon: <Wind className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Aria condizionata",
    description: "In tutti gli ambienti, silenziosa e potente",
  },
  {
    icon: <Droplet className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Bagno privato",
    description: "Ogni camera ha il proprio bagno con doccia",
  },
  {
    icon: <Tv className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "TV LED",
    description: "Smart TV con principali canali italiani e internazionali",
  },
  {
    icon: <Moon className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Tende oscuranti",
    description: "Per dormire anche nelle mattine più luminose",
  },
  {
    icon: <ParkingCircle className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Parcheggio",
    description: "Convenzionato a 50 metri dalla struttura",
  },
  {
    icon: <Sparkles className="h-7 w-7 text-amber-600" aria-hidden />,
    title: "Pulizia",
    description: "Cambio biancheria ogni 3 giorni, giornaliero su richiesta",
  },
];

const onRequest = [
  { title: "Transfer aeroporto", description: "Su richiesta (Lamezia Terme / Crotone)" },
  { title: "Tour guidati", description: "Escursioni e visite nel territorio" },
  { title: "Prenotazioni ristoranti", description: "Consigli e prenotazioni in zona" },
];

interface ServiziGridProps {
  locale?: string;
}

const PARKING_INDEX = 6;

const parkingCopy: Record<"it" | "en" | "de", { title: string; description: string }> = {
  it: {
    title: "Parcheggio",
    description:
      "Parcheggio gratuito disponibile nelle immediate vicinanze della struttura (entro 50 metri). Sempre disponibile, anche in alta stagione.",
  },
  en: {
    title: "Parking",
    description:
      "Free parking available within 50 metres of the property. Always available, including in high season.",
  },
  de: {
    title: "Parkplatz",
    description:
      "Kostenloser Parkplatz in unmittelbarer Nähe der Unterkunft (innerhalb von 50 Metern). Immer verfügbar, auch in der Hochsaison.",
  },
};

export default function ServiziGrid({ locale = "it" }: ServiziGridProps) {
  const loc = locale === "en" || locale === "de" ? locale : "it";

  const servicesList = useMemo(
    () =>
      includedServices.map((s, i) =>
        i === PARKING_INDEX
          ? {
              ...s,
              title: parkingCopy[loc].title,
              description: parkingCopy[loc].description,
            }
          : s
      ),
    [loc]
  );

  return (
    <>
      <section className="py-16 sm:py-20 bg-white" aria-label="Servizi inclusi">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-3 text-neutral-900"
          >
            Servizi
          </motion.h2>
          <p className="text-center text-neutral-600 mb-10">
            Tutto quello che serve per un soggiorno comodo, semplice e senza pensieri.
          </p>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {servicesList.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white p-6 shadow-soft border border-stone-200 hover:shadow-medium hover:border-amber-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-50">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-stone-50" aria-label="Servizi a richiesta">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-neutral-900"
          >
            Servizi a richiesta
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {onRequest.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white p-6 shadow-soft border border-stone-200"
              >
                <div className="text-base font-semibold text-stone-900">{s.title}</div>
                <div className="mt-2 text-sm text-stone-600">{s.description}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/contatti`}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-stone-900 hover:bg-amber-400 transition-colors"
            >
              Contattaci
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}


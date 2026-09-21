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

type Loc = "it" | "en" | "de";

type ServiceText = { title: string; description: string };

const serviceIcons: React.ReactNode[] = [
  <Coffee key="coffee" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Wifi key="wifi" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Wind key="wind" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Droplet key="droplet" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Tv key="tv" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Moon key="moon" className="h-7 w-7 text-amber-600" aria-hidden />,
  <ParkingCircle key="parking" className="h-7 w-7 text-amber-600" aria-hidden />,
  <Sparkles key="sparkles" className="h-7 w-7 text-amber-600" aria-hidden />,
];

/** Testi per lingua — l'ordine corrisponde a `serviceIcons` */
const copy: Record<
  Loc,
  {
    includedAria: string;
    includedTitle: string;
    includedIntro: string;
    onRequestTitle: string;
    contactCta: string;
    included: ServiceText[];
    onRequest: ServiceText[];
  }
> = {
  it: {
    includedAria: "Servizi inclusi",
    includedTitle: "Servizi",
    includedIntro: "Tutto quello che serve per un soggiorno comodo, semplice e senza pensieri.",
    onRequestTitle: "Servizi a richiesta",
    contactCta: "Contattaci",
    included: [
      { title: "Colazione inclusa", description: "Ogni mattina dalle 7:30 alle 10:00 nella sala comune" },
      { title: "WiFi superfast", description: "Connessione fibra, password in camera" },
      { title: "Aria condizionata", description: "In tutti gli ambienti, silenziosa e potente" },
      { title: "Bagno privato", description: "Ogni camera ha il proprio bagno con doccia" },
      { title: "TV LED", description: "Smart TV con principali canali italiani e internazionali" },
      { title: "Tende oscuranti", description: "Per dormire anche nelle mattine più luminose" },
      {
        title: "Parcheggio",
        description:
          "Parcheggio gratuito disponibile nelle immediate vicinanze della struttura (entro 50 metri). Sempre disponibile, anche in alta stagione.",
      },
      { title: "Pulizia", description: "Cambio biancheria ogni 3 giorni, giornaliero su richiesta" },
    ],
    onRequest: [
      { title: "Transfer aeroporto", description: "Su richiesta (Lamezia Terme / Crotone)" },
      { title: "Tour guidati", description: "Escursioni e visite nel territorio" },
      { title: "Prenotazioni ristoranti", description: "Consigli e prenotazioni in zona" },
    ],
  },
  en: {
    includedAria: "Included services",
    includedTitle: "Services",
    includedIntro: "Everything you need for a comfortable, simple and carefree stay.",
    onRequestTitle: "Services on request",
    contactCta: "Contact us",
    included: [
      { title: "Breakfast included", description: "Every morning from 7:30 to 10:00 in the shared breakfast room" },
      { title: "Superfast Wi-Fi", description: "Fibre connection, password in your room" },
      { title: "Air conditioning", description: "In every room, quiet and powerful" },
      { title: "Private bathroom", description: "Every room has its own bathroom with shower" },
      { title: "LED TV", description: "Smart TV with the main Italian and international channels" },
      { title: "Blackout curtains", description: "So you can sleep in, even on the brightest mornings" },
      {
        title: "Parking",
        description:
          "Free parking available within 50 metres of the property. Always available, including in high season.",
      },
      { title: "Cleaning", description: "Linen changed every 3 days, daily on request" },
    ],
    onRequest: [
      { title: "Airport transfer", description: "On request (Lamezia Terme / Crotone)" },
      { title: "Guided tours", description: "Excursions and visits in the area" },
      { title: "Restaurant bookings", description: "Local tips and reservations" },
    ],
  },
  de: {
    includedAria: "Inklusivleistungen",
    includedTitle: "Leistungen",
    includedIntro: "Alles, was Sie für einen bequemen, unkomplizierten und sorglosen Aufenthalt brauchen.",
    onRequestTitle: "Leistungen auf Anfrage",
    contactCta: "Kontakt aufnehmen",
    included: [
      { title: "Frühstück inklusive", description: "Jeden Morgen von 7:30 bis 10:00 Uhr im Gemeinschaftsraum" },
      { title: "Superschnelles WLAN", description: "Glasfaseranschluss, Passwort im Zimmer" },
      { title: "Klimaanlage", description: "In allen Räumen, leise und leistungsstark" },
      { title: "Eigenes Bad", description: "Jedes Zimmer hat ein eigenes Bad mit Dusche" },
      { title: "LED-TV", description: "Smart-TV mit den wichtigsten italienischen und internationalen Sendern" },
      { title: "Verdunkelungsvorhänge", description: "Für erholsamen Schlaf auch an hellen Morgen" },
      {
        title: "Parkplatz",
        description:
          "Kostenloser Parkplatz in unmittelbarer Nähe der Unterkunft (innerhalb von 50 Metern). Immer verfügbar, auch in der Hochsaison.",
      },
      { title: "Reinigung", description: "Wäschewechsel alle 3 Tage, täglich auf Anfrage" },
    ],
    onRequest: [
      { title: "Flughafentransfer", description: "Auf Anfrage (Lamezia Terme / Crotone)" },
      { title: "Geführte Touren", description: "Ausflüge und Besichtigungen in der Umgebung" },
      { title: "Restaurantreservierungen", description: "Empfehlungen und Reservierungen in der Nähe" },
    ],
  },
};

interface ServiziGridProps {
  locale?: string;
}

export default function ServiziGrid({ locale = "it" }: ServiziGridProps) {
  const loc: Loc = locale === "en" || locale === "de" ? locale : "it";
  const c = copy[loc];

  const servicesList = useMemo(
    () => c.included.map((s, i) => ({ ...s, icon: serviceIcons[i] })),
    [c]
  );

  return (
    <>
      <section className="py-16 sm:py-20 bg-white" aria-label={c.includedAria}>
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-3 text-neutral-900"
          >
            {c.includedTitle}
          </motion.h2>
          <p className="text-center text-neutral-600 mb-10">{c.includedIntro}</p>

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

      <section className="py-16 sm:py-20 bg-stone-50" aria-label={c.onRequestTitle}>
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-neutral-900"
          >
            {c.onRequestTitle}
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {c.onRequest.map((s, i) => (
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
              {c.contactCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}


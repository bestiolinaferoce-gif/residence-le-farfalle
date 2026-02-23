"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Coffee,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Plane,
  MapPin,
  UtensilsCrossed,
  Car,
  Shield,
  Clock,
  Heart,
} from "lucide-react";
import Container from "@/src/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    icon: <Coffee className="h-8 w-8 text-primary-600" />,
    title: "Colazione inclusa",
    description: "Colazione continentale servita ogni mattina con prodotti freschi locali",
    featured: true,
  },
  {
    icon: <Wifi className="h-8 w-8 text-primary-600" />,
    title: "WiFi superfast",
    description: "Connessione internet ad alta velocità gratuita in tutte le camere e aree comuni",
    featured: true,
  },
  {
    icon: <Wind className="h-8 w-8 text-primary-600" />,
    title: "Aria condizionata",
    description: "Climatizzazione indipendente in tutte le camere per il massimo comfort",
    featured: true,
  },
  {
    icon: <Tv className="h-8 w-8 text-primary-600" />,
    title: "TV LED Smart",
    description: "Smart TV in ogni camera con accesso a streaming e canali digitali",
  },
  {
    icon: <Droplet className="h-8 w-8 text-primary-600" />,
    title: "Bagno privato",
    description: "Ogni camera ha il proprio bagno completo con doccia e asciugacapelli",
    featured: true,
  },
  {
    icon: <Plane className="h-8 w-8 text-primary-600" />,
    title: "Transfer aeroporto",
    description: "Servizio transfer da/per aeroporto su richiesta (Lamezia Terme o Crotone)",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary-600" />,
    title: "Tour organizzati",
    description: "Escursioni e visite guidate alle attrazioni della Calabria ionica",
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-primary-600" />,
    title: "Convenzioni ristoranti",
    description: "Sconti e convenzioni nei migliori ristoranti e trattorie locali",
  },
  {
    icon: <Car className="h-8 w-8 text-primary-600" />,
    title: "Parcheggio gratuito",
    description: "Parcheggio privato gratuito disponibile per tutti gli ospiti",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary-600" />,
    title: "Sicurezza",
    description: "Sistema di sicurezza e cassaforte in ogni camera",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary-600" />,
    title: "Check-in flessibile",
    description: "Check-in dalle 14:00, check-out entro le 11:00 (su richiesta flessibile)",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary-600" />,
    title: "Assistenza 24/7",
    description: "Supporto e assistenza disponibile 24 ore su 24 per i nostri ospiti",
  },
];

interface ServiziGridProps {
  locale?: string;
}

export default function ServiziGrid({ locale = "it" }: ServiziGridProps) {
  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <>
      {/* Servizi Principali - sezione colorata */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary-50/80 to-white">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-neutral-900"
          >
            Servizi Principali
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featured.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-200/80 hover:shadow-medium hover:border-primary-200/50 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-900">{s.title}</h3>
                <p className="text-sm text-neutral-600">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Altri Servizi - griglia */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-primary-50/20">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-neutral-900"
          >
            Altri Servizi
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-200/80 hover:shadow-medium hover:border-secondary-200/50 transition-all duration-300 flex items-start gap-4"
              >
                <div className="shrink-0 p-2 bg-primary-50 rounded-xl">{s.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-neutral-900">{s.title}</h3>
                  <p className="text-sm text-neutral-600">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Colazione - sezione evidenziata */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-500/10 via-amber-50/50 to-secondary-100/50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-hard"
            >
              <Image
                src="/images/services/colazione-breakfast.webp"
                alt="Colazione servita al residence"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-neutral-900">
                Colazione Inclusa
              </h2>
              <p className="text-lg text-neutral-700 mb-6">
                Ogni mattina iniziamo la giornata con una ricca colazione continentale servita nella
                nostra area comune. Prodotti freschi locali, caffè italiano, succhi di frutta, dolci
                fatti in casa e molto altro.
              </p>
              <ul className="space-y-3 text-neutral-700 mb-8">
                <li className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-primary-600 shrink-0" />
                  <span>Caffè espresso e cappuccino</span>
                </li>
                <li className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-primary-600 shrink-0" />
                  <span>Dolci e pasticcini locali</span>
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary-600 shrink-0" />
                  <span>Prodotti freschi e biologici</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/prenota`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                Prenota ora
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}

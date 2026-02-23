"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Waves, MapPin, Compass, Utensils, Calendar, Anchor } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

const cards = [
  {
    slug: "spiagge",
    title: "Spiagge",
    excerpt: "Mare cristallino a pochi minuti. Le Castella, Area Marina Protetta.",
    icon: Waves,
    image: "/images/rooms/camera-2-interno.webp",
  },
  {
    slug: "area-marina",
    title: "Area Marina Protetta",
    excerpt: "Una delle più grandi riserve marine d'Italia. Snorkeling e immersioni.",
    icon: Anchor,
    image: "/images/rooms/dettagli-interni.webp",
  },
  {
    slug: "borghi",
    title: "Borghi",
    excerpt: "Le Castella, Crotone, Capo Colonna. Storia e cultura millenaria.",
    icon: MapPin,
    image: "/images/rooms/camera-3-interno.webp",
  },
  {
    slug: "eventi",
    title: "Eventi",
    excerpt: "Sagre, feste patronali, manifestazioni estive nel territorio.",
    icon: Calendar,
    image: "/images/rooms/camera-4-interno.webp",
  },
  {
    slug: "escursioni",
    title: "Escursioni",
    excerpt: "Boat tour, diving, trekking in Sila. Esperienze indimenticabili.",
    icon: Compass,
    image: "/images/services/colazione-breakfast.webp",
  },
  {
    slug: "food",
    title: "Cucina locale",
    excerpt: "Pesce fresco, pasta fatta in casa. La tradizione calabrese a tavola.",
    icon: Utensils,
    image: "/images/services/colazione-interno.webp",
  },
];

interface Territorio60SecondiProps {
  locale?: string;
}

export default function Territorio60Secondi({ locale = "it" }: Territorio60SecondiProps) {
  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Territorio in 60 secondi
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tutto quello che devi sapere per la tua vacanza a Isola di Capo Rizzuto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Card hover className="h-full overflow-hidden p-0 group">
                <Link href={`/${locale}/territorio`} className="block">
                  <div className="relative h-44">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <card.icon className="h-8 w-8 text-white drop-shadow-md" />
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-display text-xl font-bold">
                      {card.title}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-neutral-600">{card.excerpt}</p>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${locale}/territorio`}>
            <Button variant="primary" size="lg">
              Scopri il territorio
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

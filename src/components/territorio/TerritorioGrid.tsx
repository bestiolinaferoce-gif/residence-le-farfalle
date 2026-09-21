"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import { territorioItems, pickTerritorioLocale } from "@/src/data/territorio/items";

interface TerritorioGridProps {
  locale?: string;
  maxItems?: number; // Per homepage: mostra solo 6-9, per pagina completa: tutti
}

const copy = {
  it: {
    heading: "Scopri il territorio",
    intro:
      "Isola di Capo Rizzuto e la costa ionica: mare limpido, borghi e siti della Magna Grecia a breve distanza in auto.",
    more: "Approfondisci",
    moreAria: "Approfondisci: {title}",
    all: "Vedi tutte le attrazioni",
    distance: "Distanza",
    time: "Tempo",
  },
  en: {
    heading: "Explore the area",
    intro:
      "Isola di Capo Rizzuto and the Ionian coast: clear sea, historic villages and Magna Graecia sites, all a short drive away.",
    more: "Learn more",
    moreAria: "Learn more: {title}",
    all: "See all places to visit",
    distance: "Distance",
    time: "Time",
  },
  de: {
    heading: "Die Umgebung entdecken",
    intro:
      "Isola di Capo Rizzuto und die ionische Küste: klares Meer, historische Orte und Stätten der Magna Graecia – alles nur eine kurze Autofahrt entfernt.",
    more: "Mehr erfahren",
    moreAria: "Mehr erfahren: {title}",
    all: "Alle Ausflugsziele ansehen",
    distance: "Entfernung",
    time: "Fahrzeit",
  },
} as const;

const TerritorioGrid: React.FC<TerritorioGridProps> = ({ locale = "it", maxItems = 9 }) => {
  const lang = pickTerritorioLocale(locale);
  const c = copy[lang];
  const reduceMotion = useReducedMotion();
  const itemsToShow = territorioItems.slice(0, maxItems);

  const fadeUp = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <motion.div
          {...fadeUp}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900">
            {c.heading}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{c.intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {itemsToShow.map((item, index) => {
            const title = item.title[lang];
            return (
              <motion.div
                key={item.slug}
                {...fadeUp}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt[lang]}
                      fill
                      className="object-cover group-hover:scale-110 motion-reduce:group-hover:scale-100 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 text-neutral-900">{title}</h3>
                    <p className="text-sm text-neutral-600 mb-4 flex-1">{item.excerpt[lang]}</p>
                    {(item.distance || item.time) && (
                      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                        {item.distance && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" aria-hidden />
                            <span className="sr-only">{c.distance}: </span>
                            <span>{item.distance[lang]}</span>
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" aria-hidden />
                            <span className="sr-only">{c.time}: </span>
                            <span>{item.time[lang]}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <Link
                      href={`/${lang}/territorio`}
                      aria-label={c.moreAria.replace("{title}", title)}
                    >
                      <Button asSpan variant="ghost" size="sm" className="w-full justify-center" tabIndex={-1}>
                        {c.more}
                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {maxItems < territorioItems.length && (
          <motion.div
            {...(reduceMotion
              ? { initial: false as const }
              : { initial: { opacity: 0 }, whileInView: { opacity: 1 } })}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link href={`/${lang}/territorio`}>
              <Button asSpan variant="primary" size="lg">
                {c.all}
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden />
              </Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default TerritorioGrid;

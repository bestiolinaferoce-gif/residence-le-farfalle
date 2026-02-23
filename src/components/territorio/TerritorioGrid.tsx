"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import { territorioItems } from "@/src/data/territorio/items";

interface TerritorioGridProps {
  locale?: string;
  maxItems?: number; // Per homepage: mostra solo 6-9, per pagina completa: tutti
}

const TerritorioGrid: React.FC<TerritorioGridProps> = ({ locale = "it", maxItems = 9 }) => {
  const itemsToShow = territorioItems.slice(0, maxItems);

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900">
            Scopri il Territorio
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Isola di Capo Rizzuto e la Calabria ionica: un angolo di paradiso dove il mare cristallino incontra la storia millenaria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {itemsToShow.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col overflow-hidden group">
                {/* Immagine */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={index < 3 ? "eager" : "lazy"} // Prime 3 eager per LCP
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900">{item.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 flex-1">{item.excerpt}</p>
                  {(item.distance || item.time) && (
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                      {item.distance && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.distance}</span>
                        </div>
                      )}
                      {item.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.time}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <Link href={`/${locale}/territorio`}>
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      Approfondisci
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {maxItems < territorioItems.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link href={`/${locale}/territorio`}>
              <Button variant="primary" size="lg">
                Vedi tutte le attrazioni
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default TerritorioGrid;

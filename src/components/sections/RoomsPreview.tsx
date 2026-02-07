"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Maximize2, ArrowRight } from "lucide-react";
import { rooms } from "@/src/data/rooms/rooms";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";

interface RoomsPreviewProps {
  locale?: string;
}

const RoomsPreview: React.FC<RoomsPreviewProps> = ({ locale = "it" }) => {
  const currentLocale = locale as "it" | "en" | "de";

  return (
    <section className="py-20 bg-neutral-50" aria-labelledby="rooms-preview-heading">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="rooms-preview-heading"
            className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900"
          >
            Le Nostre Camere
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Camere confortevoli e moderne, perfette per il tuo soggiorno in Calabria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {rooms.slice(0, 4).map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full overflow-hidden p-0">
                <Link href={`/${locale}/camere`} className="block">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={`/images/rooms/${room.images[0]}`}
                      alt={room.name[currentLocale] ?? room.name.it}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary-500" aria-hidden />
                      <span className="text-sm font-semibold text-neutral-900">
                        {room.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-2 text-neutral-900">
                      {room.name[currentLocale] ?? room.name.it}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {room.size} m² • Bagno privato
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary-600">
                        Da €{room.priceFrom}/notte
                      </div>
                      <span className="inline-flex items-center gap-2 text-primary-600 font-medium">
                        Dettagli
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href={`/${locale}/camere`}>
            <Button variant="primary" size="lg">
              Vedi tutte le camere
              <Maximize2 className="h-5 w-5 ml-2" aria-hidden />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default RoomsPreview;

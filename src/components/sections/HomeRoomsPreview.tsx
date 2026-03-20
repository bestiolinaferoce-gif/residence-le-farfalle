"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Maximize2 } from "lucide-react";
import { rooms } from "@/src/data/rooms/rooms";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";

const roomFeatures = ["Aria condizionata", "Bagno privato", "Set cortesia"];

interface HomeRoomsPreviewProps {
  locale?: string;
}

export default function HomeRoomsPreview({ locale = "it" }: HomeRoomsPreviewProps) {
  const currentLocale = locale as "it" | "en" | "de";

  return (
    <section className="py-24 bg-white" aria-labelledby="rooms-heading">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="rooms-heading" className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Le Nostre Camere
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Camere confortevoli con tutti i comfort per la tua vacanza in Calabria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full overflow-hidden p-0 group">
                <Link href={`/${locale}/camere`} className="block">
                  <div className="relative h-72 md:h-80">
                    <Image
                      src={`/images/rooms/${room.images[0]}`}
                      alt={room.name[currentLocale] ?? room.name.it}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-secondary-600" aria-hidden />
                      <span className="text-sm font-semibold text-neutral-900">
                        {room.capacity} posti
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-3 text-neutral-900">
                      {room.name[currentLocale] ?? room.name.it}
                    </h3>
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {roomFeatures.map((f) => (
                        <li
                          key={f}
                          className="text-sm text-neutral-600 bg-neutral-100 rounded-lg px-3 py-1"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-secondary-600 font-medium text-sm group-hover:underline">
                      Dettagli camera
                      <Maximize2 className="h-4 w-4" aria-hidden />
                    </span>
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
}

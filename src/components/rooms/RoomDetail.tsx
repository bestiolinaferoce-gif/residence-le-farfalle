"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplet,
  Tv,
  Wind,
  Wifi,
  Moon,
  MapPin,
  Car,
  ChevronLeft,
  ArrowRight,
  Users,
} from "lucide-react";
import { rooms, Room, amenityLabels } from "@/src/data/rooms/rooms";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import PreventivoForm from "@/src/components/rooms/PreventivoForm";

const amenityIcons: Record<string, React.ReactNode> = {
  "private-bathroom": <Droplet className="h-5 w-5" />,
  tv: <Tv className="h-5 w-5" />,
  ac: <Wind className="h-5 w-5" />,
  wifi: <Wifi className="h-5 w-5" />,
  blackout: <Moon className="h-5 w-5" />,
};

interface RoomDetailProps {
  room: Room;
  locale: string;
}

export default function RoomDetail({ room, locale }: RoomDetailProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const currentLocale = (locale || "it") as "it" | "en" | "de";
  const roomName = room.name[currentLocale] ?? room.name.it;
  const otherRooms = rooms.filter((r) => r.id !== room.id);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
        <Container>
          <Link
            href={`/${locale}/camere`}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Tutte le camere
          </Link>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Fotogallery */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                  src={`/images/rooms/${room.images[imgIndex]}`}
                  alt={`${roomName} - immagine ${imgIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                {room.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {room.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          i === imgIndex ? "bg-white w-6" : "bg-white/50"
                        }`}
                        aria-label={`Vai a immagine ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              {room.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {room.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                        i === imgIndex ? "border-primary-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={`/images/rooms/${img}`}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Servizi presenti */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                Servizi presenti
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {room.amenities.map((key) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 py-2 text-neutral-700"
                  >
                    <span className="text-primary-500">
                      {amenityIcons[key] ?? <ArrowRight className="h-5 w-5" />}
                    </span>
                    {amenityLabels[key]?.[currentLocale] ?? key}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Posizione */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                Posizione
              </h3>
              <Card padding="lg">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-secondary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-neutral-900">{siteConfig.address}</p>
                    <p className="text-secondary-600 mt-2 font-medium">Nel centro del paese</p>
                    <p className="text-neutral-600 text-sm mt-2">
                      Bar, ristoranti, market e servizi raggiungibili a piedi. Spiagge dell&apos;Area
                      Marina Protetta a pochi minuti in auto.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.section>

            {/* Come arrivare / Come muoversi */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                Come arrivare / Come muoversi
              </h3>
              <Card padding="lg">
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span>Parcheggio gratuito nelle vicinanze. In auto: da Crotone e SS106.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span>
                      A piedi: centro paese con tutti i servizi. Spiagge in 5–15 minuti in auto.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span>Transfer aeroporto (Lamezia, Crotone) disponibile su richiesta.</span>
                  </li>
                </ul>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar: form preventivo + altre camere */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <Card padding="lg">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {roomName}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {room.size} m² · {room.capacity} posti · Da €{room.priceFrom}/notte
                </p>
                <PreventivoForm
                  locale={locale}
                  roomId={room.id}
                  roomName={roomName}
                />
              </Card>
            </motion.div>

            {/* Altre camere consigliate */}
            {otherRooms.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
                  Altre camere
                </h3>
                <div className="space-y-4">
                  {otherRooms.slice(0, 3).map((r) => (
                    <Link
                      key={r.id}
                      href={`/${locale}/camere/${r.id}`}
                      className="block group"
                    >
                      <Card hover padding="sm" className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={`/images/rooms/${r.images[0]}`}
                            alt={r.name[currentLocale] ?? r.name.it}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                            {r.name[currentLocale] ?? r.name.it}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {r.size} m² · €{r.priceFrom}/notte
                          </p>
                          <span className="inline-flex items-center gap-1 text-sm text-primary-600 font-medium mt-1">
                            Vedi dettagli
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

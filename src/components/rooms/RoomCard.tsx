"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Maximize2,
  Tv,
  Wind,
  Wifi,
  Droplet,
  Moon,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Room, amenityLabels } from "@/src/data/rooms/rooms";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { GA_EVENTS } from "@/src/lib/analytics";

const amenityIcons: Record<string, React.ReactNode> = {
  "private-bathroom": <Droplet className="h-4 w-4 shrink-0" />,
  tv: <Tv className="h-4 w-4 shrink-0" />,
  ac: <Wind className="h-4 w-4 shrink-0" />,
  wifi: <Wifi className="h-4 w-4 shrink-0" />,
  blackout: <Moon className="h-4 w-4 shrink-0" />,
};

interface RoomCardProps {
  room: Room;
  locale: string;
  index: number;
}

export default function RoomCard({ room, locale, index }: RoomCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const currentLocale = (locale || "it") as "it" | "en" | "de";
  const roomName = room.name[currentLocale] ?? room.name.it;
  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const hasWhatsApp = whatsappDigits.length >= 10;
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(`Ciao! Vorrei informazioni sulla ${roomName} - Residence Le Farfalle`)}`
    : "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <div
        className={cn(
          "h-full overflow-hidden rounded-2xl flex flex-col",
          "bg-white shadow-soft border border-neutral-200/80",
          "hover:shadow-hard hover:border-primary-200/50 hover:-translate-y-1",
          "transition-all duration-300 group"
        )}
      >
        {/* Hero image con hover swap */}
        <div
          className="relative h-56 sm:h-64 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-amber-100"
          onMouseEnter={() =>
            room.images.length > 1 && setImgIndex((i) => (i + 1) % room.images.length)
          }
          onMouseLeave={() => setImgIndex(0)}
        >
          <Image
            src={`/images/rooms/${room.images[imgIndex]}`}
            alt={roomName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={80}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {room.priceFrom ? (
            <div className="absolute top-3 right-3 bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              da €{room.priceFrom}/notte
            </div>
          ) : null}
          {/* Badge capienza */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
            <span className="bg-secondary-500 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md">
              Nel centro paese
            </span>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
              <Users className="h-4 w-4 text-primary-600" aria-hidden />
              <span className="text-sm font-semibold text-neutral-900">
                {room.capacity} {room.capacity === 1 ? "posto" : "posti"}
              </span>
            </div>
          </div>
          {room.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {room.images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    i === imgIndex ? "bg-white" : "bg-white/50"
                  )}
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>

        {/* Contenuto */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
            {roomName}
          </h3>
          <p className="text-neutral-600 text-sm mb-2">
            {room.size} m² · Bagno privato
          </p>
          <span className="inline-block mb-4 text-xs font-semibold text-secondary-600 bg-secondary-100 rounded-lg px-2.5 py-1">
            Tutto incluso
          </span>

          {/* 3 icone servizi */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 3).map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 text-primary-800 rounded-lg text-xs font-medium border border-primary-100"
              >
                <span className="text-primary-600">
                  {amenityIcons[key] ?? <Maximize2 className="h-4 w-4 shrink-0" />}
                </span>
                {amenityLabels[key]?.[currentLocale] ?? key}
              </span>
            ))}
          </div>

          {/* Prezzo + CTAs */}
          <div className="mt-auto pt-4 border-t border-neutral-200 space-y-4">
            <div>
              <span className="text-xs text-neutral-500">A partire da</span>
              <p className="text-2xl font-bold text-primary-600">
                €{room.priceFrom}
                <span className="text-sm font-normal text-neutral-500">/notte</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href={`/${locale}/camere/${room.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm"
              >
                Vedi dettagli
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {hasWhatsApp && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => GA_EVENTS.clickWhatsapp()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary-500 text-primary-600 text-sm font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Richiedi preventivo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

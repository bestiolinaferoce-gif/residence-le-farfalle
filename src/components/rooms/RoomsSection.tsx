"use client";

import React from "react";
import { motion } from "framer-motion";
import { rooms, TOTAL_CAPACITY } from "@/src/data/rooms/rooms";
import RoomCard from "./RoomCard";
import Container from "@/src/components/ui/Container";

interface RoomsSectionProps {
  locale?: string;
}

export default function RoomsSection({ locale = "it" }: RoomsSectionProps) {
  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-b from-neutral-50 to-primary-50/30"
      aria-label="Elenco camere"
    >
      <Container>
        {/* Info capienza totale - tutte le camere 2 pax */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-primary-600 font-semibold">
            4 camere · {TOTAL_CAPACITY} posti totali
          </p>
          <p className="text-sm text-neutral-600 mt-1">
            Ogni camera ha capienza 2 ospiti
          </p>
        </motion.div>

        {/* Grid camere - no filtri, tutte uguali capienza */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {rooms.map((room, idx) => (
            <RoomCard
              key={room.id}
              room={room}
              locale={locale}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "@/src/data/rooms/rooms";
import RoomCard from "./RoomCard";
import Container from "@/src/components/ui/Container";
import { cn } from "@/src/lib/utils";

type CapacityFilter = "all" | "2" | "3-4";
type BedsFilter = "all" | "1";

interface RoomsSectionProps {
  locale?: string;
}

export default function RoomsSection({ locale = "it" }: RoomsSectionProps) {
  const [capacityFilter, setCapacityFilter] = useState<CapacityFilter>("all");
  const [bedsFilter, setBedsFilter] = useState<BedsFilter>("all");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (capacityFilter === "2" && room.capacity !== 2) return false;
      if (capacityFilter === "3-4" && room.capacity < 3) return false;
      if (bedsFilter === "1" && room.beds !== 1) return false;
      return true;
    });
  }, [capacityFilter, bedsFilter]);

  const capacityFilters: { value: CapacityFilter; label: string }[] = [
    { value: "all", label: "Tutte" },
    { value: "2", label: "2 posti" },
    { value: "3-4", label: "3-4 posti" },
  ];

  const bedsFilters: { value: BedsFilter; label: string }[] = [
    { value: "all", label: "Tutte" },
    { value: "1", label: "1 camera" },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-white"
      aria-labelledby="rooms-heading"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2
            id="rooms-heading"
            className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900"
          >
            Le Nostre Camere
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            4 camere indipendenti, ognuna con bagno privato, aria condizionata e tutti i
            comfort per un soggiorno indimenticabile
          </p>

          {/* Filtri */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <div
              className="flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filtra per capienza"
            >
              {capacityFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setCapacityFilter(f.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    capacityFilter === f.value
                      ? "bg-primary-500 text-white shadow-soft"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                  type="button"
                  aria-pressed={capacityFilter === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div
              className="flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filtra per numero camere"
            >
              {bedsFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setBedsFilter(f.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    bedsFilter === f.value
                      ? "bg-primary-500 text-white shadow-soft"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                  type="button"
                  aria-pressed={bedsFilter === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid camere */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room, idx) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  locale={locale}
                  index={idx}
                />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center text-neutral-500 py-12"
              >
                Nessuna camera trovata con i filtri selezionati.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

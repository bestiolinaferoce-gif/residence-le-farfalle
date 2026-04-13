"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Waves, MapPin, Compass } from "lucide-react";
import Container from "@/src/components/ui/Container";

/**
 * Hero animato per la pagina Territorio
 * Gradiente vivace mediterraneo + forme flottanti + animazioni
 */
export default function TerritorioHero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24"
      aria-labelledby="territorio-hero-heading"
    >
      {/* Foto reale del territorio (sotto il gradiente) */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/territorio/area-marina-protetta.jpg"
          alt=""
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Tinta mediterranea leggera (la foto resta ben visibile) */}
      <div
        className="absolute inset-0 bg-[length:300%_300%] animate-territorio-gradient opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 25%, #0d9488 50%, #14b8a6 75%, #0ea5e9 100%)",
          backgroundPosition: "0% 50%",
        }}
      />

      {/* Contrasto per titolo e paragrafi */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />

      {/* Forme decorative flottanti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-16 w-64 h-64 rounded-full bg-amber-400/15 blur-2xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-teal-300/20 blur-2xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Onde stilizzate */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
          <motion.div
            className="flex-1 h-16 bg-white/10 rounded-t-full origin-bottom"
            animate={{ scaleX: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="flex-1 h-20 bg-white/15 rounded-t-full origin-bottom -mx-4"
            animate={{ scaleX: [1.05, 1, 1.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="flex-1 h-14 bg-white/10 rounded-t-full origin-bottom"
            animate={{ scaleX: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Farfalla decorativa */}
      <div className="absolute top-12 right-8 md:right-16 opacity-50" aria-hidden>
        <svg viewBox="0 0 24 26" className="h-10 w-10 text-white">
          <path fill="currentColor" d="M12 2C8 6 6 10 6 14c0 4 2 8 6 10 4-2 6-6 6-10 0-4-2-8-6-12z" />
        </svg>
      </div>
      {/* Icone decorative */}
      <div className="absolute top-12 left-8 md:left-16 flex gap-4 opacity-60">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Waves className="h-10 w-10 text-white" aria-hidden />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Compass className="h-10 w-10 text-amber-200" aria-hidden />
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="h-10 w-10 text-cyan-200" aria-hidden />
        </motion.div>
      </div>

      {/* Contenuto */}
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            id="territorio-hero-heading"
            className="font-display text-display-sm md:text-display-md lg:text-display-lg mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Il Territorio che Ti Aspetta
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-4 text-white/95 font-medium leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Isola di Capo Rizzuto e la Calabria ionica: un angolo di paradiso dove il mare
            cristallino incontra la storia millenaria
          </motion.p>

          <motion.p
            className="text-lg text-cyan-100 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Dalla Residence Le Farfalle ti suggeriamo spiagge, borghi e itinerari dell&apos;Area
            Marina Protetta e della costa ionica — senza fretta, con lo sguardo di chi vive il territorio
          </motion.p>

          {/* CTA decorative */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              <Waves className="h-4 w-4" />
              Mare cristallino
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              <MapPin className="h-4 w-4" />
              Storia millenaria
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              <Compass className="h-4 w-4" />
              Esperienze uniche
            </span>
          </motion.div>
        </div>
      </Container>

    </section>
  );
}

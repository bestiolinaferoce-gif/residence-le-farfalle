"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BedDouble, Users, Sparkles } from "lucide-react";
import Container from "@/src/components/ui/Container";

/**
 * Hero animato per la pagina Camere - stile premium hospitality
 * Gradiente caldo mediterraneo (ambra, corallo, arancio)
 */
export default function RoomsHero() {
  return (
    <section
      className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24"
      aria-labelledby="rooms-hero-heading"
    >
      {/* Gradiente caldo animato */}
      <div
        className="absolute inset-0 bg-[length:300%_300%] animate-territorio-gradient"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #984308 0%, #bc5702 20%, #e37d00 40%, #ffa500 60%, #ffc41b 80%, #f59e0b 100%)",
          backgroundPosition: "0% 50%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Forme decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-12 w-56 h-56 rounded-full bg-orange-400/15 blur-2xl"
          animate={{ x: [0, 25, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end">
          <motion.div
            className="flex-1 h-12 bg-white/15 rounded-t-full origin-bottom"
            animate={{ scaleX: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="flex-1 h-16 bg-white/20 rounded-t-full origin-bottom -mx-2"
            animate={{ scaleX: [1.05, 1, 1.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="flex-1 h-10 bg-white/12 rounded-t-full origin-bottom"
            animate={{ scaleX: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Icone decorative */}
      <div className="absolute top-12 left-8 md:left-16 flex gap-4 opacity-70">
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BedDouble className="h-10 w-10 text-white" aria-hidden />
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Users className="h-10 w-10 text-amber-100" aria-hidden />
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-10 w-10 text-orange-100" aria-hidden />
        </motion.div>
      </div>

      {/* Contenuto */}
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            id="rooms-hero-heading"
            className="font-display text-display-sm md:text-display-md lg:text-display-lg mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Le Nostre Camere
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed drop-shadow-md max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            4 camere indipendenti · 8 posti totali · Ogni camera 2 ospiti. Bagno privato,
            aria condizionata e tutti i comfort per un soggiorno indimenticabile
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/25">
              <BedDouble className="h-4 w-4" />
              Bagno privato
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/25">
              <Sparkles className="h-4 w-4" />
              Colazione inclusa
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

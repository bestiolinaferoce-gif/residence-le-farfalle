"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Waves, MapPin, Compass } from "lucide-react";
import Container from "@/src/components/ui/Container";

const copy = {
  it: {
    title: "Isola di Capo Rizzuto e la costa ionica: cosa vedere vicino a noi",
    lead: "Spiagge dell'Area Marina Protetta, castelli, borghi e siti della Magna Grecia a breve distanza in auto",
    sub: "Dal centro del paese, dove si trova il Residence Le Farfalle, ti suggeriamo spiagge, borghi e itinerari della costa ionica — con i consigli di chi vive qui",
    chips: ["Mare limpido", "Magna Grecia", "Borghi e sapori"],
  },
  en: {
    title: "Isola di Capo Rizzuto and the Ionian coast: what to see near us",
    lead: "Beaches of the marine protected area, castles, villages and Magna Graecia sites, all a short drive away",
    sub: "From the town centre, where Residence Le Farfalle is located, we suggest beaches, villages and routes along the Ionian coast — with tips from people who live here",
    chips: ["Clear sea", "Magna Graecia", "Villages and local food"],
  },
  de: {
    title: "Isola di Capo Rizzuto und die ionische Küste: Sehenswertes in unserer Nähe",
    lead: "Strände im Meeresschutzgebiet, Burgen, historische Orte und Stätten der Magna Graecia – alles nur eine kurze Autofahrt entfernt",
    sub: "Vom Ortszentrum aus, wo das Residence Le Farfalle liegt, empfehlen wir Ihnen Strände, Dörfer und Ausflüge an der ionischen Küste – mit Tipps von Menschen, die hier leben",
    chips: ["Klares Meer", "Magna Graecia", "Dörfer und regionale Küche"],
  },
} as const;

/**
 * Hero animato per la pagina Territorio
 * Gradiente vivace mediterraneo + forme flottanti + animazioni
 * (animazioni disattivate con prefers-reduced-motion)
 */
export default function TerritorioHero({ locale = "it" }: { locale?: string }) {
  const c = copy[locale as keyof typeof copy] ?? copy.it;
  const reduceMotion = useReducedMotion();
  // Con reduced motion: niente loop infiniti né entrate animate
  const loop = (animate: Record<string, number[]>, duration: number) =>
    reduceMotion
      ? {}
      : { animate, transition: { duration, repeat: Infinity, ease: "easeInOut" as const } };
  const enter = (delay: number, y = 20) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: "easeOut" as const },
        };

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
        className="absolute inset-0 bg-[length:300%_300%] animate-territorio-gradient motion-reduce:animate-none opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 25%, #0d9488 50%, #14b8a6 75%, #0ea5e9 100%)",
          backgroundPosition: "0% 50%",
        }}
      />

      {/* Contrasto per titolo e paragrafi */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" aria-hidden />

      {/* Forme decorative flottanti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"
          {...loop({ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }, 8)}
        />
        <motion.div
          className="absolute top-1/4 -right-16 w-64 h-64 rounded-full bg-amber-400/15 blur-2xl"
          {...loop({ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.15, 1] }, 6)}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-teal-300/20 blur-2xl"
          {...loop({ x: [0, 20, 0], y: [0, -15, 0] }, 7)}
        />
        {/* Onde stilizzate */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
          <motion.div
            className="flex-1 h-16 bg-white/10 rounded-t-full origin-bottom"
            {...loop({ scaleX: [1, 1.05, 1] }, 3)}
          />
          <motion.div
            className="flex-1 h-20 bg-white/15 rounded-t-full origin-bottom -mx-4"
            {...loop({ scaleX: [1.05, 1, 1.05] }, 4)}
          />
          <motion.div
            className="flex-1 h-14 bg-white/10 rounded-t-full origin-bottom"
            {...loop({ scaleX: [1, 1.08, 1] }, 3.5)}
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
      <div className="absolute top-12 left-8 md:left-16 flex gap-4 opacity-60" aria-hidden>
        <motion.div {...loop({ y: [0, -8, 0], rotate: [0, 5, 0] }, 4)}>
          <Waves className="h-10 w-10 text-white" aria-hidden />
        </motion.div>
        <motion.div {...loop({ y: [0, 8, 0], rotate: [0, -3, 0] }, 5)}>
          <Compass className="h-10 w-10 text-amber-200" aria-hidden />
        </motion.div>
        <motion.div {...loop({ y: [0, -6, 0] }, 4.5)}>
          <MapPin className="h-10 w-10 text-cyan-200" aria-hidden />
        </motion.div>
      </div>

      {/* Contenuto */}
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            id="territorio-hero-heading"
            className="font-display text-display-sm md:text-display-md lg:text-display-lg mb-6 text-white drop-shadow-lg"
            {...enter(0, 30)}
          >
            {c.title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-4 text-white/95 font-medium leading-relaxed drop-shadow-md"
            {...enter(0.2)}
          >
            {c.lead}
          </motion.p>

          <motion.p
            className="text-lg text-cyan-100 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
            {...enter(0.4)}
          >
            {c.sub}
          </motion.p>

          {/* Etichette decorative */}
          <motion.ul
            className="flex flex-wrap justify-center gap-4 mt-10"
            {...(reduceMotion
              ? { initial: false as const }
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.6, delay: 0.6 },
                })}
          >
            {[Waves, MapPin, Compass].map((Icon, i) => (
              <li
                key={c.chips[i]}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {c.chips[i]}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>

    </section>
  );
}

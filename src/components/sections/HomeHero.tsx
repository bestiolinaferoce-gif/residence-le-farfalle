"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Wifi, Coffee, Car, Waves } from "lucide-react";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import FloatingButterflies from "@/src/components/home/FloatingButterflies";
import { heroPhotos } from "@/src/data/lefarfalle/photos";
import { siteConfig } from "@/src/config/site";

interface HomeHeroProps {
  locale?: string;
}

const AUTO_PLAY_INTERVAL = 5000;
const usps = [
  { icon: MapPin, label: "Centro paese" },
  { icon: Car, label: "Parcheggio vicino" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Coffee, label: "Colazione" },
  { icon: Waves, label: "Spiagge 5–15 min" },
];

export default function HomeHero({ locale = "it" }: HomeHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % heroPhotos.length),
      AUTO_PLAY_INTERVAL
    );
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => setCurrentIndex(index), []);
  const goToPrev = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length),
    []
  );
  const goToNext = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % heroPhotos.length),
    []
  );

  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const hasWhatsApp = whatsappDigits.length >= 10;
  const whatsappUrl = hasWhatsApp ? `https://wa.me/${whatsappDigits}` : "#";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero principale"
    >
      {/* Farfalle decorative - dietro al contenuto */}
      <FloatingButterflies />

      {/* Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={heroPhotos[currentIndex].src}
              alt={heroPhotos[currentIndex].alt}
              fill
              priority={currentIndex === 0}
              className="object-cover"
              quality={75}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      </div>

      {/* Frecce */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
        aria-label="Slide precedente"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
        aria-label="Slide successiva"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Contenuto */}
      <Container className="relative z-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Residence Le Farfalle
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed">
            Nel cuore di Isola di Capo Rizzuto, a pochi minuti dalle spiagge più belle
            dell&apos;Area Marina Protetta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href={`/${locale}/camere`}>
              <Button variant="secondary" size="lg">
                Vedi Camere
              </Button>
            </Link>
            <Link href={`/${locale}/prenota`}>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/40 text-white hover:bg-white/20"
              >
                Richiedi Preventivo
              </Button>
            </Link>
          </div>
          {/* USP Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {usps.map((usp, i) => (
              <motion.span
                key={usp.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
              >
                <usp.icon className="h-4 w-4" />
                {usp.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={`Vai a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm">Scorri</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

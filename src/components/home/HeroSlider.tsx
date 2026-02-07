"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import { heroPhotos } from "@/src/data/lefarfalle/photos";
import { siteConfig } from "@/src/config/site";

interface HeroSliderProps {
  locale?: string;
}

const AUTO_PLAY_INTERVAL = 4000; // 4 secondi

const HeroSlider: React.FC<HeroSliderProps> = ({ locale = "it" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play con pausa su hover/focus
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPaused(false);
    setIsAutoPlaying(true);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Riprendi dopo 10s
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  // Gestione keyboard per accessibilità
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const hasValidWhatsApp = whatsappDigits.length >= 10;
  const whatsappUrl = hasValidWhatsApp ? `https://wa.me/${whatsappDigits}` : "#";

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Hero slider con foto della struttura"
    >
      {/* Slideshow Images */}
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
              priority={heroPhotos[currentIndex].priority}
              className="object-cover"
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        onFocus={() => setIsPaused(true)}
        className="absolute left-4 md:left-8 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Immagine precedente"
        type="button"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={goToNext}
        onFocus={() => setIsPaused(true)}
        className="absolute right-4 md:right-8 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Immagine successiva"
        type="button"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-display-lg md:text-display-md lg:text-display-lg mb-6 font-bold"
            >
              Residence Le Farfalle
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-neutral-100 max-w-2xl mx-auto leading-relaxed"
            >
              Camere confortevoli a due passi dal mare cristallino di Isola di Capo Rizzuto.
              Colazione inclusa, WiFi superfast, aria condizionata. La tua vacanza perfetta in Calabria inizia qui.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href={`/${locale}/prenota`}>
                <Button variant="secondary" size="lg">
                  Verifica disponibilità
                </Button>
              </Link>
              {hasValidWhatsApp && (
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Scrivici su WhatsApp
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Badge Colazione Inclusa */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-24 right-4 md:right-8 z-20"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-medium flex items-center gap-2">
          <Coffee className="h-5 w-5 text-primary-500" />
          <span className="text-sm font-semibold text-neutral-900">Colazione inclusa</span>
        </div>
      </motion.div>

      {/* Dots Indicator */}
      <div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2"
        role="tablist"
        aria-label="Indicatori slide"
      >
        {heroPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onFocus={() => setIsPaused(true)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Vai all'immagine ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
            type="button"
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm">Scorri</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Fallback per JS disabilitato */}
      <noscript>
        <div className="absolute inset-0 z-0">
          <Image
            src={heroPhotos[0].src}
            alt={heroPhotos[0].alt}
            fill
            priority
            className="object-cover"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      </noscript>
    </section>
  );
};

export default HeroSlider;

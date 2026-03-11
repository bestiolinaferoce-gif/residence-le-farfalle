"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, Star, Wifi, Coffee, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/src/config/site";

interface HeroProps {
  locale?: string;
}

const trustBadges = [
  { icon: Star, label: "Verificato" },
  { icon: Coffee, label: "Colazione inclusa" },
  { icon: Wind, label: "Aria condizionata" },
  { icon: Wifi, label: "WiFi superfast" },
];

export default function Hero({ locale = "it" }: HeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const hasWhatsApp = whatsappDigits.length >= 10;
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${whatsappDigits}?text=Ciao! Vorrei informazioni su Residence Le Farfalle`
    : "#";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-900"
      aria-label="Hero principale"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rooms/camera-generale.webp"
          alt="Residence Le Farfalle — Isola di Capo Rizzuto"
          fill
          priority
          quality={85}
          className="object-cover opacity-55"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/75" />
      </div>

      {/* Location pill */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <span className="inline-flex items-center gap-2 border border-white/25 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium text-white/90 tracking-wide">
          <MapPin className="h-3.5 w-3.5 text-amber-300 flex-shrink-0" />
          Isola di Capo Rizzuto · Calabria
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-amber-300 text-sm font-semibold tracking-[0.18em] uppercase mb-5"
        >
          Residence &amp; Bed and Breakfast
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Le Farfalle
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Quattro camere indipendenti con bagno privato nel cuore di Isola di Capo Rizzuto.
          Colazione inclusa, ambiente curato, relax autentico.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <Link href={`/${locale}/prenota`}>
            <span className="inline-flex items-center justify-center px-9 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-base tracking-wide transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none">
              Prenota ora
            </span>
          </Link>
          {hasWhatsApp ? (
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center justify-center px-9 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-base tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none">
                Scrivici su WhatsApp
              </span>
            </Link>
          ) : (
            <Link href={`/${locale}/contatti`}>
              <span className="inline-flex items-center justify-center px-9 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-base tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none">
                Contattaci
              </span>
            </Link>
          )}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {trustBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm text-white/85 font-medium"
            >
              <b.icon className="h-3.5 w-3.5 text-amber-300 flex-shrink-0" />
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/50"
        aria-hidden
      >
        <span className="text-xs tracking-widest uppercase">Scopri</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

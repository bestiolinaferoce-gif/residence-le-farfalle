"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, Star, Wifi, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import AvailabilityWidget from "@/src/components/booking/AvailabilityWidget";
import { siteConfig } from "@/src/config/site";
import { intlLocale, toLocale } from "@/src/lib/i18n";

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale: rawLocale = "it" }: HeroProps) {
  const locale = toLocale(rawLocale);
  const { t } = useLocaleStrings("hero");
  const [scrolled, setScrolled] = useState(false);

  /**
   * Punteggio ufficiale Booking.com (fonte e conteggio pubblici), non una media
   * calcolata sulle poche recensioni riportate nel sito.
   */
  const { score, reviewCount } = siteConfig.bookingScore;
  const scoreLabel = score.toLocaleString(intlLocale[locale], { minimumFractionDigits: 1 });

  const trustBadges = [
    { icon: Star, label: t("ratingBadge", { score: scoreLabel, count: reviewCount }), key: "rating" },
    { icon: Wind, label: t("badgeAc"), key: "ac" },
    { icon: Wifi, label: t("badgeWifi"), key: "wifi" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-stone-900 py-16 md:py-24"
      aria-label={t("heroRegion")}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rooms/camera-2-letto.webp"
          alt={t("imageAlt")}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        {/*
          Una sola velatura, più scura a sinistra dove sta il testo e leggera a destra:
          la foto della camera resta riconoscibile invece di diventare uno sfondo grigio.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="text-center lg:text-left">
          {/* In flusso, non in overlay assoluto: su mobile non copre più il titolo. */}
          <span
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md sm:text-sm"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden />
            {t("locationPill")}
          </span>

          <h1
                        className="mt-6 font-display text-white"
          >
            <span className="block text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {t("headline")}
            </span>
            <span className="mt-3 block font-sans text-xl font-semibold leading-snug text-amber-100 sm:text-2xl">
              {t("headlineSub")}
            </span>
          </h1>

          <p
                        className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {t("headlineAccent")}
          </p>

          <div
                        className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start"
          >
            {trustBadges.map((b) => (
              <span
                key={b.key}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              >
                <b.icon className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Il primo gesto possibile è verificare le date, non leggere un paragrafo. */}
        <div
                  >
          <AvailabilityWidget locale={locale} />
          <p className="mt-3 text-center text-sm text-white/85 lg:text-left">
            {t("preferTalk")}{" "}
            <Link
              href={`/${locale}/contatti`}
              className="font-semibold text-amber-300 underline-offset-4 hover:underline"
            >
              {t("contactUs")}
            </Link>
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 lg:flex"
        aria-hidden
      >
        <span className="text-xs uppercase tracking-widest">{t("scrollHint")}</span>
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

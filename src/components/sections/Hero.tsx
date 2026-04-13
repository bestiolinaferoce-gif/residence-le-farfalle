"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, Star, Wifi, Coffee, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import { siteConfig } from "@/src/config/site";
import { GA_EVENTS } from "@/src/lib/analytics";

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale = "it" }: HeroProps) {
  const { t } = useLocaleStrings("hero");
  const [scrolled, setScrolled] = useState(false);
  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const hasWhatsApp = whatsappDigits.length >= 10;
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(t("whatsappPrefill"))}`
    : "#";

  const trustBadges = [
    { icon: Star, label: t("badgeVerified"), key: "verified" },
    { icon: Coffee, label: t("badgeBreakfast"), key: "breakfast" },
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stone-900"
      aria-label="Hero principale"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rooms/le-farfalle-matrimoniale-03.png"
          alt={t("imageAlt")}
          fill
          priority
          quality={90}
          className="object-cover opacity-[0.62]"
          sizes="100vw"
        />
        {/* Velature colore brand + lettura titoli */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/75 via-fuchsia-950/35 to-sky-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-900/50" />
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-500/25 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-secondary-400/20 blur-[90px]"
          aria-hidden
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute top-8 left-1/2 z-20 -translate-x-1/2"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-black/20 backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-amber-200" />
          {t("locationPill")}
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          <span className="block">{t("headline")}</span>
          <span className="mt-3 block bg-gradient-to-r from-amber-100 via-white to-fuchsia-100 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl md:text-4xl">
            {t("headlineAccent")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mb-5 text-sm font-medium text-white/90 md:text-base"
        >
          {t("trustLine")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38 }}
          className="mx-auto mb-10 max-w-2xl text-lg font-normal leading-relaxed text-white/85 md:text-xl"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-14 flex flex-col justify-center gap-4 sm:flex-row"
        >
          {hasWhatsApp ? (
            <>
              <Link
                href={`/${locale}/camere`}
                onClick={() => GA_EVENTS.ctaClick("scopri_camere")}
              >
                <span className="inline-flex cursor-pointer select-none items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-9 py-4 text-base font-semibold tracking-wide text-stone-900 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl active:translate-y-0">
                  {t("ctaRooms")}
                </span>
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => GA_EVENTS.clickWhatsapp()}
              >
                <span className="inline-flex cursor-pointer select-none items-center justify-center rounded-xl bg-emerald-500 px-9 py-4 text-base font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg active:translate-y-0">
                  {t("ctaWhatsapp")}
                </span>
              </Link>
            </>
          ) : (
            <Link
              href={`/${locale}/camere`}
              onClick={() => GA_EVENTS.ctaClick("scopri_camere")}
            >
              <span className="inline-flex cursor-pointer select-none items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-9 py-4 text-base font-semibold tracking-wide text-stone-900 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl active:translate-y-0">
                {t("ctaRooms")}
              </span>
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {trustBadges.map((b) => (
            <span
              key={b.key}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm"
            >
              <b.icon className="h-3.5 w-3.5 flex-shrink-0 text-amber-300" />
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/50"
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

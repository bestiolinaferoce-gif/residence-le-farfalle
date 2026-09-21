import React from "react";
import type { Metadata } from "next";
import Hero from "@/src/components/sections/Hero";
import PercheLeFarfalle from "@/src/components/sections/PercheLeFarfalle";
import HomeRoomsPreview from "@/src/components/sections/HomeRoomsPreview";
import Services from "@/src/components/sections/Services";
import MareVicino from "@/src/components/sections/MareVicino";
import Territorio60Secondi from "@/src/components/sections/Territorio60Secondi";
import ReviewsSection from "@/src/components/reviews/ReviewsSection";
import Location from "@/src/components/sections/Location";
import HomeFinalCta from "@/src/components/sections/HomeFinalCta";
import { locales, toLocale } from "@/src/lib/i18n";
import { siteConfig } from "@/src/config/site";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { pageAlternates } from "@/src/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const m = getPageMetadata("home", locale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(locale, ""),
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${siteConfig.url}/${locale}`,
      images: [
        {
          url: `${siteConfig.url}/images/rooms/camera-2-letto.webp`,
          width: 1536,
          height: 1024,
          alt: siteConfig.ogImageAlt[locale],
        },
      ],
    },
  };
}

/**
 * Ordine pensato per decidere in fretta: dove siamo e prezzo (hero), perché noi,
 * camere, servizi, mare e distanze, recensioni, mappa, contatto.
 * Rimosse dalla home le sezioni ridondanti (stagione, partner, newsletter,
 * secondo footer con contatti e FAQ duplicati): restano nelle pagine dedicate.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);

  return (
    <>
      <Hero locale={locale} />
      <PercheLeFarfalle locale={locale} />
      <HomeRoomsPreview locale={locale} />
      <Services />
      <MareVicino />
      <ReviewsSection locale={locale} maxItems={6} />
      <Location locale={locale} />
      <Territorio60Secondi locale={locale} />
      <HomeFinalCta locale={locale} />
    </>
  );
}

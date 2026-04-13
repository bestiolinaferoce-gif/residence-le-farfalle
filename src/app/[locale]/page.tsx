import React from "react";
import type { Metadata } from "next";
import Hero from "@/src/components/sections/Hero";
import PercheLeFarfalle from "@/src/components/sections/PercheLeFarfalle";
import HomeRoomsPreview from "@/src/components/sections/HomeRoomsPreview";
import Services from "@/src/components/sections/Services";
import MareVicino from "@/src/components/sections/MareVicino";
import Territorio60Secondi from "@/src/components/sections/Territorio60Secondi";
import PartnersPreview from "@/src/components/partner/PartnersPreview";
import Newsletter from "@/src/components/sections/Newsletter";
import ReviewsSection from "@/src/components/reviews/ReviewsSection";
import Location from "@/src/components/sections/Location";
import HomeFooter from "@/src/components/sections/HomeFooter";
import HomeFinalCta from "@/src/components/sections/HomeFinalCta";
import { locales } from "@/src/lib/i18n";
import { siteConfig } from "@/src/config/site";
import { getPageMetadata } from "@/src/lib/page-metadata";

// Genera parametri statici per tutte le lingue
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Metadata SEO per homepage
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const m = getPageMetadata("home", currentLocale);

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.description,
      images: [
        {
          url: `${siteConfig.url}/images/rooms/le-farfalle-matrimoniale-03.png`,
          width: 1536,
          height: 1024,
          alt: "Camera matrimoniale luminosa — Residence Le Farfalle, Isola di Capo Rizzuto",
        },
      ],
    },
  };
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  return (
    <>
      <Hero locale={currentLocale} />
      <PercheLeFarfalle />
      <HomeRoomsPreview locale={currentLocale} />
      <Services />
      <MareVicino />
      <Territorio60Secondi locale={currentLocale} />
      <PartnersPreview locale={currentLocale} />
      <ReviewsSection locale={currentLocale} maxItems={6} />
      <Location locale={currentLocale} />

      <HomeFinalCta locale={currentLocale} />

      <Newsletter variant="light" />
      <HomeFooter locale={currentLocale} />
    </>
  );
}

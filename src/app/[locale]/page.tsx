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
import Container from "@/src/components/ui/Container";
import Link from "next/link";
import { locales } from "@/src/lib/i18n";
import { siteConfig } from "@/src/config/site";

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

  return {
    title: "Residence Le Farfalle - Isola di Capo Rizzuto, Calabria",
    description:
      "4 camere con bagno privato nel cuore di Isola di Capo Rizzuto, a pochi minuti dalle spiagge dell'Area Marina Protetta. Colazione inclusa, WiFi superfast, aria condizionata.",
    keywords: [
      "residence Isola di Capo Rizzuto",
      "camere Crotone",
      "bed and breakfast Calabria",
      "vacanze Isola di Capo Rizzuto",
      "alloggio Calabria ionica",
      "residence Area Marina Protetta Capo Rizzuto",
    ],
    openGraph: {
      title: "Residence Le Farfalle - Isola di Capo Rizzuto",
      description:
        "Camere confortevoli nel cuore di Isola di Capo Rizzuto. Spiagge raggiungibili in pochi minuti. Colazione inclusa, WiFi superfast, aria condizionata.",
      images: [
        {
          url: `${siteConfig.url}/images/rooms/camera-generale.webp`,
          width: 1536,
          height: 1024,
          alt: "Residence Le Farfalle",
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

      {/* CTA Finale */}
      <section className="py-24 bg-stone-900">
        <Container>
          <div className="text-center text-white">
            <p className="text-amber-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Prenota il tuo soggiorno
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-white">
              Pronto per scoprire la Calabria?
            </h2>
            <p className="text-lg mb-10 text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Camere accoglienti nel cuore di Isola di Capo Rizzuto.
              Le spiagge dell&apos;Area Marina Protetta ti aspettano a pochi minuti da noi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}/prenota`}>
                <span className="inline-flex items-center justify-center px-9 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-base tracking-wide transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer select-none">
                  Richiedi Preventivo
                </span>
              </Link>
              <Link href={`/${currentLocale}/contatti`}>
                <span className="inline-flex items-center justify-center px-9 py-4 rounded-xl border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-base tracking-wide transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none">
                  Contattaci
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Newsletter variant="light" />
      <HomeFooter locale={currentLocale} />
    </>
  );
}

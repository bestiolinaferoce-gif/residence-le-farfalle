import React from "react";
import type { Metadata } from "next";
import HomeHero from "@/src/components/sections/HomeHero";
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
import Button from "@/src/components/ui/Button";
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
      "4 camere confortevoli a due passi dal mare cristallino di Isola di Capo Rizzuto. Colazione inclusa, WiFi superfast, aria condizionata. La tua vacanza perfetta in Calabria inizia qui.",
    keywords: [
      "residence Isola di Capo Rizzuto",
      "camere Crotone",
      "bed and breakfast Calabria",
      "vacanze Isola di Capo Rizzuto",
      "alloggio Calabria ionica",
      "residence mare Calabria",
    ],
    openGraph: {
      title: "Residence Le Farfalle - Isola di Capo Rizzuto",
      description:
        "Camere confortevoli a due passi dal mare cristallino. Colazione inclusa, WiFi superfast, aria condizionata.",
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
      <HomeHero locale={currentLocale} />
      <PercheLeFarfalle />
      <HomeRoomsPreview locale={currentLocale} />
      <Services />
      <MareVicino />
      <Territorio60Secondi locale={currentLocale} />
      <PartnersPreview locale={currentLocale} />
      <ReviewsSection locale={currentLocale} maxItems={6} />
      <Location locale={currentLocale} />

      {/* CTA Finale */}
      <section className="py-24 bg-gradient-to-br from-secondary-500 to-secondary-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pronto per la tua vacanza in Calabria?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Prenota ora la tua camera e goditi il mare cristallino, le spiagge dorate
              e la magia della Calabria ionica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}/prenota`}>
                <Button variant="secondary" size="lg">
                  Richiedi Preventivo
                </Button>
              </Link>
              <Link href={`/${currentLocale}/contatti`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/40 text-white hover:bg-white/20"
                >
                  Contattaci
                </Button>
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

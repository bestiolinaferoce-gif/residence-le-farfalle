import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import RoomsHero from "@/src/components/rooms/RoomsHero";
import RoomsSection from "@/src/components/rooms/RoomsSection";
import Newsletter from "@/src/components/sections/Newsletter";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: "Le Nostre Camere - Residence Le Farfalle Isola di Capo Rizzuto",
    description:
      "4 camere indipendenti (8 posti totali, 2 pax per camera) con bagno privato, aria condizionata, WiFi superfast e colazione inclusa. Isola di Capo Rizzuto, Calabria.",
    keywords: [
      "camere Isola di Capo Rizzuto",
      "camere Crotone",
      "residence Calabria",
      "camere con bagno privato",
      "alloggio Isola di Capo Rizzuto",
      "bed and breakfast Calabria",
    ],
  };
}

interface RoomsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RoomsPage({ params }: RoomsPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  return (
    <div className="min-h-screen pt-20">
      <RoomsHero />

      <RoomsSection locale={currentLocale} />

      {/* CTA Premium */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-amber-700"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm mb-4 text-white">
              Pronto a prenotare?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Scegli la camera perfetta per il tuo soggiorno in Calabria
            </p>
            <Link href={`/${currentLocale}/prenota`}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/95 shadow-hard"
              >
                Richiedi Preventivo
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Newsletter variant="light" />
    </div>
  );
}

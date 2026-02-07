import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import RoomsSection from "@/src/components/rooms/RoomsSection";
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
      "4 camere indipendenti con bagno privato, aria condizionata, WiFi superfast e colazione inclusa. Camere moderne e confortevoli a due passi dal mare cristallino di Isola di Capo Rizzuto, Calabria.",
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
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-display-sm md:text-display-md mb-6 text-neutral-900">
              Le Nostre Camere
            </h1>
            <p className="text-xl text-neutral-600">
              4 camere indipendenti, ognuna con bagno privato, aria condizionata e tutti i
              comfort per un soggiorno indimenticabile
            </p>
          </div>
        </Container>
      </section>

      {/* Rooms Section con filtri e cards */}
      <RoomsSection locale={currentLocale} />

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm mb-4 text-neutral-900">
              Pronto a prenotare?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Scegli la camera perfetta per il tuo soggiorno in Calabria
            </p>
            <Link href={`/${currentLocale}/prenota`}>
              <Button variant="primary" size="lg">
                Vai alla prenotazione
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplet, Tv, Wind, Wifi, Moon } from "lucide-react";
import { rooms, amenityLabels } from "@/src/data/rooms/rooms";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import Newsletter from "@/src/components/sections/Newsletter";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const m = getPageMetadata("camere", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "camere"),
  };
}

interface RoomsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RoomsPage({ params }: RoomsPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  const amenityIcons: Record<string, React.ReactNode> = {
    "private-bathroom": <Droplet className="h-4 w-4" aria-hidden />,
    tv: <Tv className="h-4 w-4" aria-hidden />,
    ac: <Wind className="h-4 w-4" aria-hidden />,
    wifi: <Wifi className="h-4 w-4" aria-hidden />,
    blackout: <Moon className="h-4 w-4" aria-hidden />,
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="h-48 bg-stone-900 flex items-center">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Le nostre camere</h1>
            <p className="mt-2 text-stone-200">
              4 camere indipendenti con bagno privato · Colazione inclusa · da €70/notte
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {rooms.map((room) => {
              const name = room.name[currentLocale as keyof typeof room.name] ?? room.name.it;
              const cardAlt = `${name} — Residence Le Farfalle, Isola di Capo Rizzuto`;
              return (
                <article
                  key={room.id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-soft"
                >
                  <div className="relative aspect-video bg-stone-100">
                    <Image
                      src={`/images/rooms/${room.images[0]}`}
                      alt={cardAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      quality={80}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-stone-900">{name}</h2>
                        <div className="mt-1 text-sm text-stone-600">
                          da <span className="font-semibold text-stone-900">€{room.priceFrom}</span>/notte
                        </div>
                      </div>
                      <div className="text-sm text-stone-600">{room.size} m²</div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((key) => (
                        <span
                          key={key}
                          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700"
                        >
                          <span className="text-amber-600">{amenityIcons[key]}</span>
                          {amenityLabels[key]?.[currentLocale as "it" | "en" | "de"] ?? key}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Link href={`/${currentLocale}/camere/${room.slug}`}>
                        <Button variant="primary" size="md" className="w-full">
                          Scopri di più
                          <ArrowRight className="h-4 w-4 ml-2" aria-hidden />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

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

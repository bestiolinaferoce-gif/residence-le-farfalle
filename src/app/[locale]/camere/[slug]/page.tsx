import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Droplet, Tv, Wind, Wifi, Moon, ArrowRight, Users } from "lucide-react";
import { locales } from "@/src/lib/i18n";
import { rooms, amenityLabels } from "@/src/data/rooms/rooms";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import ImageGallery from "@/src/components/ui/ImageGallery";
import { siteConfig } from "@/src/config/site";
import { pageAlternates } from "@/src/lib/seo";
import RoomViewTracker from "@/src/components/rooms/RoomViewTracker";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const room of rooms) {
      params.push({ locale, slug: room.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = locale || "it";
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: "Camera non trovata" };
  const roomLocalizedName =
    room.name[currentLocale as keyof typeof room.name] ?? room.name.it;
  const title = `${roomLocalizedName} — Residence Le Farfalle`;
  const desc =
    room.description[currentLocale as keyof typeof room.description] ?? room.description.it;
  return {
    title,
    description: desc.slice(0, 160),
    alternates: pageAlternates(currentLocale, `camere/${slug}`),
    openGraph: {
      title,
      description: desc.slice(0, 160),
      url: `${siteConfig.url}/${currentLocale}/camere/${slug}`,
      siteName: siteConfig.name,
    },
  };
}

const amenityIcons: Record<string, React.ReactNode> = {
  "private-bathroom": <Droplet className="h-5 w-5" aria-hidden />,
  tv: <Tv className="h-5 w-5" aria-hidden />,
  ac: <Wind className="h-5 w-5" aria-hidden />,
  wifi: <Wifi className="h-5 w-5" aria-hidden />,
  blackout: <Moon className="h-5 w-5" aria-hidden />,
};

export default async function RoomSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const currentLocale = (locale || "it") as "it" | "en" | "de";
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const roomName = room.name[currentLocale] ?? room.name.it;
  const otherRooms = rooms.filter((r) => r.slug !== slug).slice(0, 3);

  const roomDesc =
    room.description[currentLocale as keyof typeof room.description] ?? room.description.it;

  const hotelRoomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: roomName,
    description: roomDesc,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.capacity,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: room.size,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: room.priceFrom,
        priceCurrency: "EUR",
        unitText: "notte",
      },
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen pt-20">
      <RoomViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomSchema) }}
      />
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-stone-900">
        <Image
          src={`/images/rooms/${room.images[0]}`}
          alt={`${roomName} — Residence Le Farfalle, Isola di Capo Rizzuto`}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        <Container className="relative h-full">
          <div className="absolute bottom-10 left-0 right-0">
            <Link href={`/${currentLocale}/camere`} className="text-stone-200 hover:text-white text-sm">
              ← Tutte le camere
            </Link>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold text-white">{roomName}</h1>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <Card className="p-6 md:p-8">
              <p className="text-stone-700 text-lg">
                {room.description[currentLocale] ?? room.description.it}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.highlights.slice(0, 4).map((h) => (
                  <div key={h} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-800">
                    {h}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-stone-900">Galleria</h2>
              <div className="mt-6">
                <ImageGallery images={room.images.map((img) => `/images/rooms/${img}`)} alt={roomName} />
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-stone-900">Servizi</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((key) => (
                  <li key={key} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <span className="text-amber-600">{amenityIcons[key]}</span>
                    <span className="font-semibold text-stone-900">
                      {amenityLabels[key]?.[currentLocale] ?? key}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {otherRooms.length ? (
              <section>
                <h2 className="font-display text-2xl font-bold text-stone-900">Altre camere</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {otherRooms.map((r) => {
                    const n = r.name[currentLocale] ?? r.name.it;
                    const thumbAlt = `${n} — Residence Le Farfalle, Isola di Capo Rizzuto — anteprima`;
                    return (
                      <Link key={r.slug} href={`/${currentLocale}/camere/${r.slug}`} className="group">
                        <Card hover className="overflow-hidden p-0">
                          <div className="relative aspect-video bg-stone-100">
                            <Image
                              src={`/images/rooms/${r.images[0]}`}
                              alt={thumbAlt}
                              fill
                              sizes="(min-width: 768px) 33vw, 100vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              quality={80}
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <div className="font-display text-lg font-bold text-stone-900">{n}</div>
                            <div className="mt-1 text-sm text-stone-600">da €{r.priceFrom}/notte</div>
                            <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                              Scopri di più <ArrowRight className="h-4 w-4" aria-hidden />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="p-6 md:p-8">
                <div className="text-sm text-stone-600">da</div>
                <div className="mt-1 text-3xl font-bold text-stone-900">
                  €{room.priceFrom} <span className="text-base font-semibold text-stone-600">/ notte</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-stone-700">
                  <Users className="h-4 w-4" aria-hidden />
                  2 persone · Colazione inclusa
                </div>
                <div className="mt-6">
                  <Link href={`/${currentLocale}/prenota?camera=${room.slug}`}>
                    <Button variant="primary" size="lg" className="w-full">
                      Richiedi Preventivo
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


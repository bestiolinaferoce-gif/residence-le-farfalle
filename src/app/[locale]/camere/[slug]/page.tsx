import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Droplet, Tv, Wind, Wifi, Moon, ArrowRight, Users, Coffee, MapPin } from "lucide-react";
import { locales, toLocale } from "@/src/lib/i18n";
import { rooms, amenityLabels } from "@/src/data/rooms/rooms";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import ImageGallery from "@/src/components/ui/ImageGallery";
import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { siteConfig } from "@/src/config/site";
import { roomsCopy } from "@/src/config/rooms-copy";
import { pageAlternates } from "@/src/lib/seo";
import RoomViewTracker from "@/src/components/rooms/RoomViewTracker";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => rooms.map((room) => ({ locale, slug: room.slug })));
}

/** Taglia la descrizione a fine parola per il meta description (≤ 155 caratteri). */
function metaDescription(text: string) {
  if (text.length <= 155) return text;
  return `${text.slice(0, 152).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: roomsCopy[locale].notFound };
  const c = roomsCopy[locale];
  const title = c.metaTitle(room.name[locale], room.size);
  const description = metaDescription(room.description[locale]);
  return {
    title,
    description,
    alternates: pageAlternates(locale, `camere/${slug}`),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/camere/${slug}`,
      images: [{ url: `${siteConfig.url}/images/rooms/${room.images[0]}`, alt: room.name[locale] }],
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

export default async function RoomSlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();
  const c = roomsCopy[locale];
  const roomName = room.name[locale];
  const otherRooms = rooms.filter((r) => r.slug !== slug);
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  // Solo dati visibili in pagina. Niente Offer con prezzo: la tariffa "da" non è un prezzo prenotabile.
  const hotelRoomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: roomName,
    description: room.description[locale],
    url: `${baseUrl}/${locale}/camere/${slug}`,
    image: room.images.map((img) => `${baseUrl}/images/rooms/${img}`),
    occupancy: { "@type": "QuantitativeValue", maxValue: room.capacity },
    floorSize: { "@type": "QuantitativeValue", value: room.size, unitCode: "MTK" },
    containedInPlace: { "@id": `${baseUrl}/#lodging` },
  };

  return (
    <div className="min-h-screen">
      <RoomViewTracker slug={slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomSchema) }} />

      <section className="relative h-[52vh] min-h-[360px] overflow-hidden bg-stone-900 md:h-[60vh]">
        <Image
          src={`/images/rooms/${room.images[0]}`}
          alt={`${roomName}, Residence Le Farfalle`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-8">
          <Container>
            <Breadcrumbs
              tone="dark"
              label={c.breadcrumbLabel}
              items={[
                { name: c.home, url: `${baseUrl}/${locale}` },
                { name: c.rooms, url: `${baseUrl}/${locale}/camere` },
                { name: roomName, url: `${baseUrl}/${locale}/camere/${slug}` },
              ]}
            />
            <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
              {roomName}
              <span className="mt-2 block font-sans text-lg font-semibold text-white/90 md:text-xl">
                {c.doubleRoom(room.size)}
              </span>
            </h1>
          </Container>
        </div>
      </section>

      <Container className="py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="p-6 md:p-8">
              <p className="text-lg leading-relaxed text-stone-800">{room.description[locale]}</p>
              <p className="mt-4 flex items-start gap-2 text-sm text-stone-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                {c.locationNote}
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-stone-900">{c.amenities}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((key) => (
                  <li key={key} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <span className="text-amber-700">{amenityIcons[key]}</span>
                    <span className="font-semibold text-stone-900">{amenityLabels[key]?.[locale] ?? key}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3">
                  <Coffee className="h-5 w-5 text-amber-700" aria-hidden />
                  <span className="font-semibold text-stone-900">{c.breakfastIncluded}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-stone-900">{c.gallery}</h2>
              <div className="mt-6">
                <ImageGallery
                  images={room.images.map((img) => `/images/rooms/${img}`)}
                  alt={roomName}
                  labels={c.galleryLabels}
                />
              </div>
            </Card>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <Card className="p-6 md:p-8">
                <p className="text-sm text-stone-700">{c.from}</p>
                <p className="mt-1 text-3xl font-bold text-stone-900">
                  €{room.priceFrom} <span className="text-base font-semibold text-stone-700">{c.perNight}</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-stone-700">{siteConfig.pricing.basis[locale]}</p>
                <p className="mt-4 flex items-center gap-2 text-sm text-stone-800">
                  <Users className="h-4 w-4" aria-hidden />
                  {c.guests(room.capacity)} · {c.breakfastIncluded}
                </p>
                <Link
                  href={`/${locale}/prenota?camera=${room.slug}`}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-center font-semibold text-stone-950 hover:bg-amber-300"
                >
                  {c.requestThisRoom}
                </Link>
                <p className="mt-3 text-xs text-stone-700">{c.requestNote}</p>
              </Card>
            </div>
          </aside>
        </div>

        <section className="mt-12" aria-labelledby="other-rooms">
          <h2 id="other-rooms" className="font-display text-2xl font-bold text-stone-900">
            {c.otherRooms}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {otherRooms.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${locale}/camere/${r.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white"
                >
                  <div className="relative aspect-[3/2] bg-stone-100">
                    <Image
                      src={`/images/rooms/${r.images[0]}`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-lg font-bold text-stone-900">{r.name[locale]}</p>
                    <p className="mt-1 text-sm text-stone-700">
                      {r.size} m² · {c.from} €{r.priceFrom} {c.perNight}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
                      {c.details} <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}

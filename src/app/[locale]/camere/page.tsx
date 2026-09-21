import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplet, Tv, Wind, Wifi, Moon, Users } from "lucide-react";
import type { Metadata } from "next";
import { rooms, amenityLabels } from "@/src/data/rooms/rooms";
import Container from "@/src/components/ui/Container";
import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { siteConfig } from "@/src/config/site";
import { roomsCopy } from "@/src/config/rooms-copy";
import { locales, toLocale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const m = getPageMetadata("camere", locale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(locale, "camere"),
    openGraph: { title: m.title, description: m.description, url: `${siteConfig.url}/${locale}/camere` },
  };
}

const amenityIcons: Record<string, React.ReactNode> = {
  "private-bathroom": <Droplet className="h-4 w-4" aria-hidden />,
  tv: <Tv className="h-4 w-4" aria-hidden />,
  ac: <Wind className="h-4 w-4" aria-hidden />,
  wifi: <Wifi className="h-4 w-4" aria-hidden />,
  blackout: <Moon className="h-4 w-4" aria-hidden />,
};

export default async function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const c = roomsCopy[locale];
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return (
    <div className="min-h-screen">
      <section className="bg-stone-900 py-12 text-white md:py-16">
        <Container>
          <Breadcrumbs
            tone="dark"
            label={c.breadcrumbLabel}
            items={[
              { name: c.home, url: `${baseUrl}/${locale}` },
              { name: c.rooms, url: `${baseUrl}/${locale}/camere` },
            ]}
          />
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">{c.listH1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-200">{c.listIntro}</p>
          <p className="mt-4 max-w-2xl text-sm text-stone-300">
            {c.from} <strong className="text-white">€{siteConfig.pricing.fromEur}</strong>{" "}
            {siteConfig.pricing.basis[locale]}
          </p>
        </Container>
      </section>

      <section className="bg-white py-12 md:py-16">
        <Container>
          <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {rooms.map((room, i) => {
              const name = room.name[locale];
              return (
                <li key={room.id}>
                  <article className="h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-soft">
                    <Link href={`/${locale}/camere/${room.slug}`} className="group block" tabIndex={-1} aria-hidden>
                      <div className="relative aspect-[3/2] bg-stone-100">
                        <Image
                          src={`/images/rooms/${room.images[0]}`}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 600px, 100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          priority={i === 0}
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <h2 className="font-display text-2xl font-bold text-stone-900">
                        <Link href={`/${locale}/camere/${room.slug}`} className="hover:underline">
                          {name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-stone-700">{c.doubleRoom(room.size)}</p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-stone-700">
                        <Users className="h-4 w-4" aria-hidden />
                        {c.guests(room.capacity)} · {c.breakfastIncluded}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {room.amenities.slice(0, 4).map((key) => (
                          <li
                            key={key}
                            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-800"
                          >
                            <span className="text-amber-700">{amenityIcons[key]}</span>
                            {amenityLabels[key]?.[locale] ?? key}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-stone-700">
                          {c.from} <strong className="text-lg text-stone-900">€{room.priceFrom}</strong> {c.perNight}
                        </p>
                        <Link
                          href={`/${locale}/camere/${room.slug}`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 font-semibold text-white hover:bg-stone-800"
                        >
                          {c.details}
                          <span className="sr-only">: {name}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-amber-50 py-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">{c.ctaTitle}</h2>
            <p className="mt-3 text-stone-800">{c.ctaText}</p>
            <Link
              href={`/${locale}/prenota`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-stone-950 hover:bg-amber-300"
            >
              {c.cta}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

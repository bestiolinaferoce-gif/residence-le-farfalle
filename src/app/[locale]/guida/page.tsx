import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { locales, type Locale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { siteConfig } from "@/src/config/site";
import { guides } from "@/src/data/guide/guides";
import Container from "@/src/components/ui/Container";

function resolveLocale(raw: string | undefined): Locale {
  return raw === "en" || raw === "de" ? raw : "it";
}

const indexCopy: Record<Locale, { title: string; description: string; h1: string; intro: string; read: string }> = {
  it: {
    title: "Guide su Isola di Capo Rizzuto e Calabria ionica",
    description:
      "Guide pratiche su spiagge, Le Castella, itinerari e come arrivare a Isola di Capo Rizzuto. Consigli di Residence Le Farfalle.",
    h1: "Guide al territorio",
    intro:
      "Spiagge, borghi, itinerari e consigli pratici per vivere al meglio Isola di Capo Rizzuto e la Calabria ionica.",
    read: "Leggi la guida",
  },
  en: {
    title: "Guides to Isola di Capo Rizzuto and the Ionian coast",
    description:
      "Practical guides on beaches, Le Castella, itineraries and how to reach Isola di Capo Rizzuto. Tips from Residence Le Farfalle.",
    h1: "Area guides",
    intro:
      "Beaches, villages, itineraries and practical tips to make the most of Isola di Capo Rizzuto and the Calabrian Ionian coast.",
    read: "Read the guide",
  },
  de: {
    title: "Guides zu Isola di Capo Rizzuto und der ionischen Küste",
    description:
      "Praktische Guides zu Stränden, Le Castella, Reiserouten und Anreise nach Isola di Capo Rizzuto. Tipps vom Residence Le Farfalle.",
    h1: "Regionale Guides",
    intro:
      "Strände, Orte, Reiserouten und praktische Tipps, um Isola di Capo Rizzuto und die ionische Küste Kalabriens optimal zu erleben.",
    read: "Guide lesen",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = resolveLocale(locale);
  const c = indexCopy[l];
  return {
    title: c.title,
    description: c.description,
    alternates: pageAlternates(l, "guida"),
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${siteConfig.url}/${l}/guida`,
      siteName: siteConfig.name,
    },
  };
}

interface GuideIndexProps {
  params: Promise<{ locale: string }>;
}

export default async function GuideIndexPage({ params }: GuideIndexProps) {
  const { locale } = await params;
  const l = resolveLocale(locale);
  const c = indexCopy[l];

  return (
    <div className="min-h-screen pb-16 pt-24">
      <Container>
        <h1 className="font-display text-3xl font-bold text-stone-900 md:text-4xl">{c.h1}</h1>
        <p className="mt-3 max-w-2xl text-stone-600">{c.intro}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const gc = guide.content[l];
            return (
              <Link
                key={guide.slug}
                href={`/${l}/guida/${guide.slug}`}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video bg-stone-100">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt[l]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={80}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-bold text-stone-900">{gc.h1}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-600">{gc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                    {c.read} <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

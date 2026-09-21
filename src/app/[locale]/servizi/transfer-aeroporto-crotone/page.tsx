import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Plane, Clock, Car, MessageCircle, ArrowRight } from "lucide-react";
import { locales, type Locale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function resolveLocale(raw: string | undefined): Locale {
  return raw === "en" || raw === "de" ? raw : "it";
}

const SLUG = "servizi/transfer-aeroporto-crotone";

type Copy = {
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  priceLabel: string;
  onRequest: string;
  perTrip: string;
  roundTrip: string;
  points: { icon: "plane" | "clock" | "car"; text: string }[];
  ctaBook: string;
  ctaWhatsapp: string;
  breadcrumbHome: string;
  breadcrumbServices: string;
  breadcrumbTransfer: string;
  imageAlt: string;
  keywords: string[];
};

const copy: Record<Locale, Copy> = {
  it: {
    metaTitle: "Transfer aeroporto Crotone (Sant'Anna): Residence Le Farfalle",
    description:
      "Transfer privato da e per l'aeroporto di Crotone (Sant'Anna) per gli ospiti di Residence Le Farfalle, Isola di Capo Rizzuto. Prenotalo con il soggiorno.",
    h1: "Transfer aeroporto di Crotone (Sant'Anna)",
    intro:
      "Arriva a Isola di Capo Rizzuto senza pensieri: organizziamo il transfer privato da e per l'aeroporto di Crotone (Sant'Anna), a circa 4,5 km dalla struttura. Un servizio comodo soprattutto per chi viaggia senza auto.",
    priceLabel: "Prezzo",
    onRequest: "Su richiesta",
    perTrip: "a tratta",
    roundTrip: "andata e ritorno",
    points: [
      { icon: "plane", text: "Prelievo e riconsegna all'aeroporto di Crotone (Sant'Anna)." },
      { icon: "clock", text: "Circa 5–10 minuti di tragitto (4,5 km) fino alla struttura." },
      { icon: "car", text: "Servizio su prenotazione: comunica orario e numero di volo." },
    ],
    ctaBook: "Richiedi il transfer",
    ctaWhatsapp: "Scrivici su WhatsApp",
    breadcrumbHome: "Home",
    breadcrumbServices: "Servizi",
    breadcrumbTransfer: "Transfer aeroporto Crotone",
    imageAlt: "Arrivo a Isola di Capo Rizzuto — transfer aeroporto Crotone",
    keywords: [
      "transfer aeroporto Crotone",
      "transfer aeroporto Sant'Anna",
      "navetta aeroporto Isola di Capo Rizzuto",
      "transfer Crotone Isola di Capo Rizzuto",
      "come arrivare da aeroporto Crotone",
    ],
  },
  en: {
    metaTitle: "Crotone (Sant'Anna) airport transfer: Residence Le Farfalle",
    description:
      "Private transfer to and from Crotone (Sant'Anna) airport for guests of Residence Le Farfalle, Isola di Capo Rizzuto. Book it with your stay.",
    h1: "Crotone (Sant'Anna) airport transfer",
    intro:
      "Arrive in Isola di Capo Rizzuto stress-free: we arrange a private transfer to and from Crotone (Sant'Anna) airport, about 4.5 km from the property. A convenient service, especially if you travel without a car.",
    priceLabel: "Price",
    onRequest: "On request",
    perTrip: "per trip",
    roundTrip: "round trip",
    points: [
      { icon: "plane", text: "Pick-up and drop-off at Crotone (Sant'Anna) airport." },
      { icon: "clock", text: "About a 5–10 minute drive (4.5 km) to the property." },
      { icon: "car", text: "By reservation: let us know your time and flight number." },
    ],
    ctaBook: "Request the transfer",
    ctaWhatsapp: "Message us on WhatsApp",
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbTransfer: "Crotone airport transfer",
    imageAlt: "Arrival in Isola di Capo Rizzuto — Crotone airport transfer",
    keywords: [
      "Crotone airport transfer",
      "Sant'Anna airport transfer",
      "shuttle Isola di Capo Rizzuto",
      "transfer Crotone Isola di Capo Rizzuto",
      "how to get from Crotone airport",
    ],
  },
  de: {
    metaTitle: "Transfer Flughafen Crotone (Sant'Anna): Le Farfalle",
    description:
      "Privater Transfer vom und zum Flughafen Crotone (Sant'Anna) für Gäste des Residence Le Farfalle, Isola di Capo Rizzuto. Buchen Sie ihn mit Ihrem Aufenthalt.",
    h1: "Transfer Flughafen Crotone (Sant'Anna)",
    intro:
      "Kommen Sie entspannt in Isola di Capo Rizzuto an: Wir organisieren einen privaten Transfer vom und zum Flughafen Crotone (Sant'Anna), ca. 4,5 km von der Unterkunft. Besonders praktisch, wenn Sie ohne Auto reisen.",
    priceLabel: "Preis",
    onRequest: "Auf Anfrage",
    perTrip: "pro Fahrt",
    roundTrip: "Hin- und Rückfahrt",
    points: [
      { icon: "plane", text: "Abholung und Rückfahrt zum Flughafen Crotone (Sant'Anna)." },
      { icon: "clock", text: "Etwa 5–10 Minuten Fahrt (4,5 km) bis zur Unterkunft." },
      { icon: "car", text: "Nach Vereinbarung: Teilen Sie uns Uhrzeit und Flugnummer mit." },
    ],
    ctaBook: "Transfer anfragen",
    ctaWhatsapp: "Schreiben Sie uns auf WhatsApp",
    breadcrumbHome: "Home",
    breadcrumbServices: "Service",
    breadcrumbTransfer: "Transfer Flughafen Crotone",
    imageAlt: "Ankunft in Isola di Capo Rizzuto — Transfer Flughafen Crotone",
    keywords: [
      "Transfer Flughafen Crotone",
      "Transfer Flughafen Sant'Anna",
      "Shuttle Isola di Capo Rizzuto",
      "Transfer Crotone Isola di Capo Rizzuto",
      "Anreise vom Flughafen Crotone",
    ],
  },
};

const pointIcons = {
  plane: Plane,
  clock: Clock,
  car: Car,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = resolveLocale(locale);
  const c = copy[l];
  return {
    title: c.metaTitle,
    description: c.description,
    keywords: c.keywords,
    alternates: pageAlternates(l, SLUG),
    openGraph: {
      title: c.metaTitle,
      description: c.description,
      url: `${siteConfig.url}/${l}/${SLUG}`,
      siteName: siteConfig.name,
    },
  };
}

interface TransferPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TransferPage({ params }: TransferPageProps) {
  const { locale } = await params;
  const l = resolveLocale(locale);
  const c = copy[l];
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const { transfer } = siteConfig;

  const priceText =
    transfer.priceEur != null
      ? `€${transfer.priceEur} ${transfer.priceIsRoundTrip ? c.roundTrip : c.perTrip}`
      : c.onRequest;

  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: c.h1,
    provider: {
      "@type": "LodgingBusiness",
      name: siteConfig.name,
      url: `${baseUrl}/${l}`,
    },
    areaServed: "Isola di Capo Rizzuto, Crotone, Calabria",
    ...(transfer.priceEur != null
      ? {
          offers: {
            "@type": "Offer",
            price: String(transfer.priceEur),
            priceCurrency: siteConfig.pricing.currency,
            availability: "https://schema.org/InStock",
            url: `${baseUrl}/${l}/prenota`,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${l}` },
          { name: c.breadcrumbServices, url: `${baseUrl}/${l}/servizi` },
          { name: c.breadcrumbTransfer, url: `${baseUrl}/${l}/${SLUG}` },
        ]}
      />

      <section className="relative h-[46vh] min-h-[340px] overflow-hidden bg-stone-900">
        <Image
          src="/images/territorio/area-marina-protetta.jpg"
          alt={c.imageAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <Container className="relative flex h-full items-end pb-10">
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">{c.h1}</h1>
        </Container>
      </section>

      <Container className="max-w-3xl pt-10">
        <p className="text-lg leading-relaxed text-stone-700">{c.intro}</p>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <div className="text-sm text-stone-600">{c.priceLabel}</div>
          <div className="mt-1 text-3xl font-bold text-stone-900">{priceText}</div>
        </div>

        <ul className="mt-8 space-y-4">
          {c.points.map((point) => {
            const Icon = pointIcons[point.icon];
            return (
              <li key={point.text} className="flex items-start gap-3">
                <span className="mt-0.5 text-amber-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-stone-700">{point.text}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-stone-200 pt-8">
          <Link
            href={`/${l}/prenota`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            {c.ctaBook} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition-colors hover:bg-stone-100"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> {c.ctaWhatsapp}
          </a>
        </div>
      </Container>
    </div>
  );
}

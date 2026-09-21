import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import ServiziHero from "@/src/components/servizi/ServiziHero";
import ServiziGrid from "@/src/components/servizi/ServiziGrid";
import PartnersSection from "@/src/components/partner/PartnersSection";
import Newsletter from "@/src/components/sections/Newsletter";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";
import { siteConfig } from "@/src/config/site";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

const ctaCopy = {
  it: {
    title: "Pronto per il tuo soggiorno?",
    body: "Prenota la tua camera e goditi tutti i nostri servizi inclusi",
    button: "Vai alla prenotazione",
  },
  en: {
    title: "Ready for your stay?",
    body: "Book your room and enjoy all our included services",
    button: "Go to booking",
  },
  de: {
    title: "Bereit für Ihren Aufenthalt?",
    body: "Buchen Sie Ihr Zimmer und genießen Sie alle inklusiven Leistungen",
    button: "Zur Buchung",
  },
} as const;

const serviziBreadcrumbLabel: Record<string, { home: string; servizi: string }> = {
  it: { home: "Home", servizi: "Servizi" },
  en: { home: "Home", servizi: "Services" },
  de: { home: "Home", servizi: "Service" },
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
  const currentLocale = locale || "it";
  const m = getPageMetadata("servizi", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "servizi"),
  };
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const bc = serviziBreadcrumbLabel[currentLocale] ?? serviziBreadcrumbLabel.it;
  const cta = ctaCopy[currentLocale as keyof typeof ctaCopy] ?? ctaCopy.it;

  return (
    <div className="min-h-screen pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: bc.home, url: `${baseUrl}/${currentLocale}` },
          { name: bc.servizi, url: `${baseUrl}/${currentLocale}/servizi` },
        ]}
      />
      <ServiziHero locale={currentLocale} />

      <section className="border-b border-stone-200 bg-amber-50/40 py-8">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-sm text-stone-700 md:text-base">
            {currentLocale === "en"
              ? "Free parking is available within 50 metres of the property. Always available, including in high season. Please verify details with the host if needed."
              : currentLocale === "de"
                ? "Kostenloser Parkplatz in unmittelbarer Nähe der Unterkunft (innerhalb von 50 Metern). Immer verfügbar, auch in der Hochsaison. Bei Bedarf beim Gastgeber bestätigen."
                : "Parcheggio gratuito disponibile nelle immediate vicinanze della struttura (entro 50 metri). Sempre disponibile, anche in alta stagione. Verificare con il titolare se necessario."}
          </p>
        </Container>
      </section>

      <ServiziGrid locale={currentLocale} />

      <section className="py-10">
        <Container>
          <Link
            href={`/${currentLocale}/servizi/transfer-aeroporto-crotone`}
            className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-lg sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-display text-xl font-bold text-stone-900">
                {currentLocale === "en"
                  ? "Crotone (Sant'Anna) airport transfer"
                  : currentLocale === "de"
                    ? "Transfer Flughafen Crotone (Sant'Anna)"
                    : "Transfer aeroporto di Crotone (Sant'Anna)"}
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                {currentLocale === "en"
                  ? "Private transfer to and from the airport, about 4.5 km (5–10 minutes) away. On request."
                  : currentLocale === "de"
                    ? "Privater Transfer vom und zum Flughafen, ca. 4,5 km (5–10 Minuten) entfernt. Auf Anfrage."
                    : "Transfer privato da e per l'aeroporto, a circa 4,5 km (5–10 minuti). Su richiesta."}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-amber-700">
              {currentLocale === "en" ? "Learn more" : currentLocale === "de" ? "Mehr erfahren" : "Scopri di più"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </Container>
      </section>

      <PartnersSection locale={currentLocale} id="partner" />

      {/* CTA Premium */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm mb-4 text-white">
              {cta.title}
            </h2>
            <p className="text-lg text-white/90 mb-8">{cta.body}</p>
            <Link href={`/${currentLocale}/prenota`}>
              <Button asSpan
                variant="secondary"
                size="lg"
                className="bg-white text-secondary-700 hover:bg-white/95 shadow-hard"
              >
                {cta.button}
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Newsletter variant="dark" />
    </div>
  );
}

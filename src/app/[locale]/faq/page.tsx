import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Loc = "it" | "en" | "de";

const pageCopy: Record<Loc, { h1: string; breadcrumbHome: string; breadcrumbFaq: string }> = {
  it: {
    h1: "Domande frequenti",
    breadcrumbHome: "Home",
    breadcrumbFaq: "Domande frequenti",
  },
  en: {
    h1: "Frequently asked questions",
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
  },
  de: {
    h1: "Häufig gestellte Fragen",
    breadcrumbHome: "Home",
    breadcrumbFaq: "Häufige Fragen",
  },
};

const faqs: Record<Loc, { q: string; a: string }[]> = {
  it: [
    {
      q: "Qual è la distanza dal mare?",
      a: "La struttura è nel centro di Isola di Capo Rizzuto, non sul mare. Le spiagge più vicine dell'Area Marina Protetta (Spiagge Rosse e calette verso Capo Rizzuto) sono a circa 6 km: 10–15 minuti in auto.",
    },
    {
      q: "La colazione è inclusa nel prezzo?",
      a: "Sì, la colazione è inclusa per tutti gli ospiti.",
    },
    {
      q: "C'è il parcheggio?",
      a: "Sì: parcheggio gratuito disponibile nelle immediate vicinanze della struttura (entro 50 metri). Sempre disponibile, anche in alta stagione.",
    },
    {
      q: "Quali sono gli orari di check-in e check-out?",
      a: "Check-in dalle 14:00, check-out entro le 11:00. Orari flessibili su richiesta.",
    },
    {
      q: "Si accettano animali domestici?",
      a: "Al momento non accettiamo animali domestici.",
    },
    {
      q: "Come si prenota?",
      a: "Puoi prenotare direttamente via WhatsApp, telefono o compilando il form sul sito.",
    },
    {
      q: "C'è un minimo di notti?",
      a: "Il soggiorno minimo è di 2 notti. In alta stagione (luglio–agosto) di 3 notti.",
    },
    {
      q: "Come si arriva da Crotone?",
      a: "Da Crotone centro in auto: circa 20–25 minuti (circa 18 km). Dall'aeroporto di Crotone (circa 4,5 km): 5–10 minuti.",
    },
    {
      q: "Il WiFi è gratuito?",
      a: "Sì, il WiFi superfast è incluso e gratuito in tutta la struttura.",
    },
    {
      q: "Sono ammessi bambini?",
      a: "Sì, accogliamo famiglie con bambini con piacere.",
    },
  ],
  en: [
    {
      q: "How far is the sea?",
      a: "The property is in the centre of Isola di Capo Rizzuto, not on the sea. The nearest Marine Protected Area beaches (Spiagge Rosse and the coves towards Capo Rizzuto) are about 6 km away: 10–15 minutes by car.",
    },
    {
      q: "Is breakfast included?",
      a: "Yes, breakfast is included for all guests.",
    },
    {
      q: "Is there parking?",
      a: "Yes — free parking is available very close to the property (within 50 metres), including in high season.",
    },
    {
      q: "What are check-in and check-out times?",
      a: "Check-in from 14:00, check-out by 11:00. Flexible times on request.",
    },
    {
      q: "Are pets allowed?",
      a: "We do not currently accept pets.",
    },
    {
      q: "How can I book?",
      a: "You can book via WhatsApp, phone or the form on this website.",
    },
    {
      q: "Is there a minimum stay?",
      a: "Minimum stay is 2 nights; in high season (July–August) 3 nights.",
    },
    {
      q: "How do I get there from Crotone?",
      a: "By car from Crotone centre: about 20–25 minutes (about 18 km). From Crotone airport (about 4.5 km): 5–10 minutes.",
    },
    {
      q: "Is WiFi free?",
      a: "Yes — superfast WiFi is included and free throughout the property.",
    },
    {
      q: "Are children welcome?",
      a: "Yes, families with children are welcome.",
    },
  ],
  de: [
    {
      q: "Wie weit ist das Meer?",
      a: "Die Unterkunft liegt im Zentrum von Isola di Capo Rizzuto, nicht direkt am Meer. Die nächsten Strände des Meeresschutzgebiets (Spiagge Rosse und Buchten Richtung Capo Rizzuto) sind ca. 6 km entfernt: 10–15 Minuten mit dem Auto.",
    },
    {
      q: "Ist das Frühstück im Preis inbegriffen?",
      a: "Ja, das Frühstück ist für alle Gäste inklusive.",
    },
    {
      q: "Gibt es Parkplätze?",
      a: "Ja — kostenlose Parkplätze befinden sich in unmittelbarer Nähe (innerhalb von 50 Metern), auch in der Hochsaison.",
    },
    {
      q: "Wann sind Check-in und Check-out?",
      a: "Check-in ab 14:00, Check-out bis 11:00. Auf Anfrage sind flexible Zeiten möglich.",
    },
    {
      q: "Sind Haustiere erlaubt?",
      a: "Derzeit nehmen wir keine Haustiere an.",
    },
    {
      q: "Wie kann ich buchen?",
      a: "Per WhatsApp, Telefon oder über das Formular auf dieser Website.",
    },
    {
      q: "Gibt es eine Mindestaufenthaltsdauer?",
      a: "Mindestaufenthalt 2 Nächte; in der Hochsaison (Juli–August) 3 Nächte.",
    },
    {
      q: "Wie komme ich von Crotone aus?",
      a: "Mit dem Auto vom Zentrum Crotone: ca. 20–25 Minuten (ca. 18 km). Vom Flughafen Crotone (ca. 4,5 km): 5–10 Minuten.",
    },
    {
      q: "Ist WLAN kostenlos?",
      a: "Ja — superschnelles WLAN ist in der gesamten Unterkunft inklusive und kostenlos.",
    },
    {
      q: "Sind Kinder willkommen?",
      a: "Ja, Familien mit Kindern sind herzlich willkommen.",
    },
  ],
};

function resolveLocale(raw: string | undefined): Loc {
  return raw === "en" || raw === "de" ? raw : "it";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const m = getPageMetadata("faq", currentLocale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(currentLocale, "faq"),
  };
}

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const l = resolveLocale(locale);
  const c = pageCopy[l];
  const items = faqs[l];
  const m = getPageMetadata("faq", currentLocale);
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${currentLocale}` },
          { name: c.breadcrumbFaq, url: `${baseUrl}/${currentLocale}/faq` },
        ]}
      />
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{c.h1}</h1>
        <p className="text-neutral-600 mb-10 text-sm md:text-base">{m.description}</p>
        <ul className="space-y-8 list-none p-0 m-0">
          {items.map((faq) => (
            <li key={faq.q} className="border-b border-stone-200 pb-8 last:border-0">
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-2">{faq.q}</h2>
              <p className="text-neutral-700 leading-relaxed">{faq.a}</p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

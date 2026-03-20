import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import Container from "@/src/components/ui/Container";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Loc = "it" | "en" | "de";

const pageCopy: Record<Loc, { title: string; description: string; h1: string }> = {
  it: {
    title: "FAQ - Residence Le Farfalle Isola di Capo Rizzuto",
    description:
      "Risposte alle domande più frequenti su mare, colazione, parcheggio, check-in, prenotazioni e servizi a Residence Le Farfalle.",
    h1: "Domande frequenti",
  },
  en: {
    title: "FAQ - Residence Le Farfalle Isola di Capo Rizzuto",
    description:
      "Answers to common questions about the sea, breakfast, parking, check-in, bookings and services at Residence Le Farfalle.",
    h1: "Frequently asked questions",
  },
  de: {
    title: "FAQ - Residence Le Farfalle Isola di Capo Rizzuto",
    description:
      "Antworten auf häufige Fragen zu Meer, Frühstück, Parkplatz, Check-in, Buchung und Service in der Residence Le Farfalle.",
    h1: "Häufig gestellte Fragen",
  },
};

const faqs: Record<Loc, { q: string; a: string }[]> = {
  it: [
    {
      q: "Qual è la distanza dal mare?",
      a: "Le spiagge dell'Area Marina Protetta di Capo Rizzuto distano 5–15 minuti a piedi dalla struttura.",
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
      a: "Da Crotone in auto: circa 20 minuti (SS106). Da Crotone aeroporto: circa 25 minuti.",
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
      a: "Beaches in the Capo Rizzuto Marine Protected Area are about a 5–15 minute walk from the property.",
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
      a: "By car from Crotone: about 20 minutes (SS106). From Crotone airport: about 25 minutes.",
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
      a: "Die Strände im Meeresschutzgebiet Capo Rizzuto sind in etwa 5–15 Gehminuten von der Unterkunft entfernt.",
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
      a: "Mit dem Auto von Crotone: ca. 20 Minuten (SS106). Vom Flughafen Crotone: ca. 25 Minuten.",
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
  const l = resolveLocale(locale);
  const c = pageCopy[l];
  return {
    title: c.title,
    description: c.description,
    alternates: pageAlternates(currentLocale, "faq"),
  };
}

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const l = resolveLocale(locale);
  const c = pageCopy[l];
  const items = faqs[l];

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
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{c.h1}</h1>
        <p className="text-neutral-600 mb-10 text-sm md:text-base">{c.description}</p>
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

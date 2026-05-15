import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";
import { BandieraBluBadge } from "@/src/components/ui/BandieraBluBadge";

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
  const m = getPageMetadata("blueFlag2026", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "bandiera-blu-2026-capo-rizzuto"),
  };
}

type Loc = "it" | "en" | "de";

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  whyHere: { title: string; text: string };
  beachesTitle: string;
  beaches: { name: string; distance: string; note: string }[];
  list: { title: string; items: string[]; highlight: string };
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  source: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
};

const COPY: Record<Loc, Copy> = {
  it: {
    eyebrow: "Riconoscimento FEE 2026",
    title: "Bandiera Blu 2026 a Isola di Capo Rizzuto: dormi a pochi minuti dalle spiagge premiate",
    intro:
      "Il 14 maggio 2026 la Foundation for Environmental Education ha confermato Isola di Capo Rizzuto tra i Comuni Bandiera Blu 2026. La Calabria sale al 2° posto in Italia con 27 spiagge premiate, a pari merito con la Puglia, dietro la sola Liguria. Il Residence Le Farfalle si trova nel cuore di Isola di Capo Rizzuto, a 5–15 minuti a piedi dalle spiagge dell'Area Marina Protetta, all'interno del Comune premiato.",
    whyHere: {
      title: "Perché soggiornare qui in zona Bandiera Blu",
      text: "Soggiornare al Residence Le Farfalle significa svegliarsi a pochi minuti a piedi da spiagge che hanno appena ottenuto il riconoscimento Bandiera Blu 2026. 4 camere indipendenti con bagno privato, colazione inclusa, WiFi superfast e aria condizionata. Parcheggio gratuito a 50 metri. Il riconoscimento Bandiera Blu è un dato pubblico verificabile e attestato annualmente: certifica qualità delle acque di balneazione, gestione ambientale, raccolta differenziata, servizi turistici e sicurezza in spiaggia.",
    },
    beachesTitle: "Spiagge raggiungibili",
    beaches: [
      { name: "Area Marina Protetta Capo Rizzuto", distance: "5 min · 2 km", note: "Riserva marina con acque cristalline, snorkeling e immersioni nel Comune premiato." },
      { name: "Spiagge di Le Castella", distance: "15 min in auto · 8 km", note: "Sabbia dorata e mare turchese con la Fortezza Aragonese. Stesso Comune premiato." },
      { name: "Capo Colonna", distance: "25 min in auto · 15 km", note: "Sito archeologico magno-greco a picco sul mare." },
      { name: "Spiagge Rosse", distance: "20 min in auto · 12 km", note: "Sabbia rosso cannella e fondali trasparenti nell'Area Marina Protetta." },
      { name: "Crotone — costa ionica", distance: "20 min in auto · 12 km", note: "Spiagge urbane e lungomare con museo archeologico." },
    ],
    list: {
      title: "Tutti i 27 Comuni calabresi Bandiera Blu 2026",
      highlight: "Isola di Capo Rizzuto",
      items: [
        "Tortora", "Praia a Mare", "San Nicola Arcella", "Santa Maria del Cedro",
        "Diamante", "Rocca Imperiale", "Roseto Capo Spulico", "Trebisacce",
        "Villapiana", "Corigliano Rossano", "Cariati", "Cirò Marina",
        "Melissa", "Isola di Capo Rizzuto", "Cropani", "Sellia Marina",
        "Catanzaro", "Soverato", "Falerna", "Locri", "Amendolara",
        "Montegiordano", "Parghelia", "Tropea", "Caulonia",
        "Roccella Jonica", "Siderno",
      ],
    },
    faqTitle: "Domande frequenti",
    faq: [
      {
        q: "Cosa significa che la mia spiaggia è Bandiera Blu?",
        a: "Il riconoscimento Bandiera Blu è assegnato ogni anno dalla Foundation for Environmental Education (FEE) ai Comuni che rispettano criteri di qualità delle acque di balneazione, gestione ambientale, raccolta differenziata, servizi turistici e sicurezza in spiaggia. Isola di Capo Rizzuto ha ottenuto il riconoscimento per l'edizione 2026.",
      },
      {
        q: "Residence Le Farfalle è ufficialmente Bandiera Blu?",
        a: "No: la Bandiera Blu viene assegnata ai Comuni e alle spiagge, non alle singole strutture ricettive. Residence Le Farfalle si trova all'interno del Comune di Isola di Capo Rizzuto, premiato Bandiera Blu 2026, a 5–15 minuti a piedi dalle spiagge dell'Area Marina Protetta.",
      },
      {
        q: "Quanto distano le altre spiagge Bandiera Blu vicine?",
        a: "Restando in Calabria, altre 26 località sono state premiate. Le più vicine sono Cirò Marina (~50 km), Melissa (~40 km), Cropani e Sellia Marina (~50–60 km). La più iconica raggiungibile in giornata è Le Castella, all'interno dello stesso Comune di Isola di Capo Rizzuto.",
      },
      {
        q: "Conviene prenotare subito?",
        a: "Sì. Dopo l'annuncio FEE le ricerche per soggiorni in zone Bandiera Blu aumentano significativamente. I periodi giugno–settembre 2026 sono già in alta richiesta. Inviaci data e numero di ospiti per ricevere disponibilità reale e prezzo finale.",
      },
    ],
    ctaTitle: "Soggiorna in una zona Bandiera Blu 2026",
    ctaText: "4 camere a pochi minuti dalle spiagge premiate dell'Area Marina Protetta, colazione inclusa, contatto diretto con la host.",
    ctaPrimary: "Richiedi disponibilità",
    ctaSecondary: "Scopri le camere",
    source: "Fonte: FEE Italia · Bandiere Blu 2026, conferenza stampa del 14 maggio 2026.",
    breadcrumbHome: "Home",
    breadcrumbThis: "Bandiera Blu 2026",
  },
  en: {
    eyebrow: "FEE recognition 2026",
    title: "Blue Flag 2026 in Isola di Capo Rizzuto: stay minutes from the awarded beaches",
    intro:
      "On 14 May 2026 the Foundation for Environmental Education confirmed Isola di Capo Rizzuto among the Blue Flag 2026 Municipalities. Calabria climbs to 2nd place in Italy with 27 awarded beaches, tied with Apulia and behind only Liguria. Residence Le Farfalle is located in the heart of Isola di Capo Rizzuto, a 5–15 minute walk from the beaches of the Marine Protected Area, inside the awarded municipality.",
    whyHere: {
      title: "Why stay here in a Blue Flag area",
      text: "Staying at Residence Le Farfalle means waking up minutes on foot from beaches that have just been awarded Blue Flag 2026. 4 independent rooms with private bathroom, breakfast included, superfast WiFi and air conditioning. Free parking 50 metres away. The Blue Flag is a publicly verifiable annual award: it certifies bathing water quality, environmental management, separate waste collection, tourist services and beach safety.",
    },
    beachesTitle: "Reachable beaches",
    beaches: [
      { name: "Capo Rizzuto Marine Protected Area", distance: "5 min · 2 km", note: "Marine reserve with crystal-clear waters, snorkeling and diving inside the awarded municipality." },
      { name: "Le Castella beaches", distance: "15 min by car · 8 km", note: "Golden sand and turquoise sea with the Aragonese Fortress. Same awarded municipality." },
      { name: "Capo Colonna", distance: "25 min by car · 15 km", note: "Magno-Greek archaeological site overlooking the sea." },
      { name: "Spiagge Rosse", distance: "20 min by car · 12 km", note: "Cinnamon-red sand and transparent waters in the Marine Protected Area." },
      { name: "Crotone — Ionian coast", distance: "20 min by car · 12 km", note: "Urban beaches and seaside promenade with archaeological museum." },
    ],
    list: {
      title: "All 27 Blue Flag 2026 municipalities in Calabria",
      highlight: "Isola di Capo Rizzuto",
      items: [
        "Tortora", "Praia a Mare", "San Nicola Arcella", "Santa Maria del Cedro",
        "Diamante", "Rocca Imperiale", "Roseto Capo Spulico", "Trebisacce",
        "Villapiana", "Corigliano Rossano", "Cariati", "Cirò Marina",
        "Melissa", "Isola di Capo Rizzuto", "Cropani", "Sellia Marina",
        "Catanzaro", "Soverato", "Falerna", "Locri", "Amendolara",
        "Montegiordano", "Parghelia", "Tropea", "Caulonia",
        "Roccella Jonica", "Siderno",
      ],
    },
    faqTitle: "FAQ",
    faq: [
      {
        q: "What does it mean that my beach is a Blue Flag?",
        a: "The Blue Flag is awarded each year by the Foundation for Environmental Education (FEE) to municipalities meeting strict criteria on bathing water quality, environmental management, separate waste collection, tourist services and beach safety. Isola di Capo Rizzuto received the award for the 2026 edition.",
      },
      {
        q: "Is Residence Le Farfalle officially Blue Flag?",
        a: "No: the Blue Flag is awarded to municipalities and beaches, not to individual accommodation providers. Residence Le Farfalle is located within the municipality of Isola di Capo Rizzuto, Blue Flag 2026, 5–15 minutes on foot from the Marine Protected Area beaches.",
      },
      {
        q: "How close are the other nearby Blue Flag beaches?",
        a: "26 other Calabrian locations have been awarded. The closest are Cirò Marina (~50 km), Melissa (~40 km), Cropani and Sellia Marina (~50–60 km). The most iconic reachable in a day trip is Le Castella, within the same municipality of Isola di Capo Rizzuto.",
      },
      {
        q: "Should I book now?",
        a: "Yes. After the FEE announcement, searches for stays in Blue Flag areas rise significantly. The June–September 2026 period is already in high demand. Send us your dates and guest count to receive live availability and final price.",
      },
    ],
    ctaTitle: "Stay in a Blue Flag 2026 area",
    ctaText: "4 rooms minutes from the awarded beaches of the Marine Protected Area, breakfast included, direct contact with the host.",
    ctaPrimary: "Check availability",
    ctaSecondary: "Discover the rooms",
    source: "Source: FEE Italy · Blue Flags 2026, press conference 14 May 2026.",
    breadcrumbHome: "Home",
    breadcrumbThis: "Blue Flag 2026",
  },
  de: {
    eyebrow: "FEE-Auszeichnung 2026",
    title: "Blaue Flagge 2026 in Isola di Capo Rizzuto: Minuten von den prämierten Stränden",
    intro:
      "Am 14. Mai 2026 hat die Foundation for Environmental Education Isola di Capo Rizzuto erneut mit der Blauen Flagge 2026 ausgezeichnet. Kalabrien steigt mit 27 ausgezeichneten Stränden auf Platz 2 in Italien auf, gleichauf mit Apulien und hinter Ligurien. Das Residence Le Farfalle befindet sich im Herzen von Isola di Capo Rizzuto, 5–15 Gehminuten von den Stränden des Meeresschutzgebiets entfernt, innerhalb der ausgezeichneten Gemeinde.",
    whyHere: {
      title: "Warum hier in einer Blaue Flagge Zone übernachten",
      text: "Im Residence Le Farfalle wachen Sie wenige Gehminuten von Stränden auf, die gerade mit der Blauen Flagge 2026 ausgezeichnet wurden. 4 separate Zimmer mit Privatbad, Frühstück inklusive, superschnelles WLAN und Klimaanlage. Kostenloser Parkplatz 50 Meter entfernt. Die Blaue Flagge ist eine öffentlich überprüfbare jährliche Auszeichnung: sie zertifiziert Badegewässerqualität, Umweltmanagement, Mülltrennung, touristische Dienstleistungen und Strandsicherheit.",
    },
    beachesTitle: "Erreichbare Strände",
    beaches: [
      { name: "Meeresschutzgebiet Capo Rizzuto", distance: "5 Min. · 2 km", note: "Meeresreservat mit kristallklarem Wasser, Schnorcheln und Tauchen in der prämierten Gemeinde." },
      { name: "Strände von Le Castella", distance: "15 Min. mit dem Auto · 8 km", note: "Goldener Sand und türkisfarbenes Meer mit aragonesischer Festung. Gleiche prämierte Gemeinde." },
      { name: "Capo Colonna", distance: "25 Min. mit dem Auto · 15 km", note: "Magno-griechische archäologische Stätte über dem Meer." },
      { name: "Spiagge Rosse", distance: "20 Min. mit dem Auto · 12 km", note: "Zimtroter Sand und klares Wasser im Meeresschutzgebiet." },
      { name: "Crotone — ionische Küste", distance: "20 Min. mit dem Auto · 12 km", note: "Stadtstrände und Strandpromenade mit archäologischem Museum." },
    ],
    list: {
      title: "Alle 27 kalabrischen Blaue Flagge Gemeinden 2026",
      highlight: "Isola di Capo Rizzuto",
      items: [
        "Tortora", "Praia a Mare", "San Nicola Arcella", "Santa Maria del Cedro",
        "Diamante", "Rocca Imperiale", "Roseto Capo Spulico", "Trebisacce",
        "Villapiana", "Corigliano Rossano", "Cariati", "Cirò Marina",
        "Melissa", "Isola di Capo Rizzuto", "Cropani", "Sellia Marina",
        "Catanzaro", "Soverato", "Falerna", "Locri", "Amendolara",
        "Montegiordano", "Parghelia", "Tropea", "Caulonia",
        "Roccella Jonica", "Siderno",
      ],
    },
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Was bedeutet es, dass mein Strand Blaue Flagge ist?",
        a: "Die Blaue Flagge wird jedes Jahr von der Foundation for Environmental Education (FEE) an Gemeinden vergeben, die strenge Kriterien bezüglich Badegewässerqualität, Umweltmanagement, Mülltrennung, touristische Dienstleistungen und Strandsicherheit erfüllen. Isola di Capo Rizzuto erhielt die Auszeichnung für die Ausgabe 2026.",
      },
      {
        q: "Ist das Residence Le Farfalle offiziell Blaue Flagge?",
        a: "Nein: Die Blaue Flagge wird Gemeinden und Stränden verliehen, nicht einzelnen Beherbergungsbetrieben. Das Residence Le Farfalle befindet sich in der Gemeinde Isola di Capo Rizzuto, Blaue Flagge 2026, 5–15 Gehminuten von den Stränden des Meeresschutzgebiets entfernt.",
      },
      {
        q: "Wie weit sind die anderen Blauen Flaggen entfernt?",
        a: "26 weitere kalabrische Orte wurden ausgezeichnet. Die nächstgelegenen sind Cirò Marina (~50 km), Melissa (~40 km), Cropani und Sellia Marina (~50–60 km). Das ikonischste Tagesausflugsziel ist Le Castella, in derselben Gemeinde Isola di Capo Rizzuto.",
      },
      {
        q: "Sollte ich jetzt buchen?",
        a: "Ja. Nach der FEE-Ankündigung steigen die Suchen nach Aufenthalten in Blaue Flagge Zonen erheblich. Der Zeitraum Juni–September 2026 ist bereits stark nachgefragt. Senden Sie uns Daten und Gästezahl, um Echtzeitverfügbarkeit und Endpreis zu erhalten.",
      },
    ],
    ctaTitle: "Übernachten Sie in einer Blaue Flagge 2026 Zone",
    ctaText: "4 Zimmer wenige Minuten von den prämierten Stränden des Meeresschutzgebiets, Frühstück inklusive, direkter Kontakt mit der Gastgeberin.",
    ctaPrimary: "Verfügbarkeit anfragen",
    ctaSecondary: "Zimmer entdecken",
    source: "Quelle: FEE Italien · Blaue Flagge 2026, Pressekonferenz am 14. Mai 2026.",
    breadcrumbHome: "Home",
    breadcrumbThis: "Blaue Flagge 2026",
  },
};

function resolveLocale(raw: string | undefined): Loc {
  return raw === "en" || raw === "de" ? raw : "it";
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlueFlag2026Page({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const l = resolveLocale(locale);
  const c = COPY[l];
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${currentLocale}` },
          { name: c.breadcrumbThis, url: `${baseUrl}/${currentLocale}/bandiera-blu-2026-capo-rizzuto` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary-50 to-white py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">
              <span aria-hidden>★</span> {c.eyebrow}
            </p>
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
              {c.title}
            </h1>
          </div>
        </Container>
      </section>

      <Container className="mt-12 max-w-5xl">
        {/* Intro con badge */}
        <section className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
          <div className="flex justify-center lg:justify-start">
            <BandieraBluBadge variant="full" size={200} />
          </div>
          <p className="text-base leading-relaxed text-stone-700 sm:text-lg">{c.intro}</p>
        </section>

        {/* Perché qui */}
        <section className="mt-12 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-display text-2xl font-bold text-stone-900">{c.whyHere.title}</h2>
          <p className="mt-4 leading-relaxed text-stone-700">{c.whyHere.text}</p>
        </section>

        {/* Spiagge */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-stone-900">{c.beachesTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.beaches.map((b) => (
              <li key={b.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="font-display text-lg font-semibold text-stone-900">{b.name}</p>
                <p className="mt-1 text-sm font-medium text-amber-700">{b.distance}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Lista 27 Comuni */}
        <section className="mt-12 rounded-3xl bg-stone-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-stone-900">{c.list.title}</h2>
          <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-stone-700 sm:grid-cols-2 lg:grid-cols-3">
            {c.list.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-amber-600" aria-hidden>★</span>
                <span className={item === c.list.highlight ? "font-semibold text-stone-900" : ""}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-stone-900">{c.faqTitle}</h2>
          <div className="mt-6 space-y-4">
            {c.faq.map((qa) => (
              <details key={qa.q} className="group rounded-2xl border border-stone-200 bg-white p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-stone-900">
                  <span className="mr-2 text-amber-600">+</span>
                  {qa.q}
                </summary>
                <p className="mt-3 leading-relaxed text-stone-700">{qa.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-secondary-700 to-secondary-900 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{c.ctaText}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href={`/${currentLocale}/prenota`}>
              <Button variant="primary" size="lg">{c.ctaPrimary}</Button>
            </Link>
            <Link href={`/${currentLocale}/camere`}>
              <Button variant="secondary" size="lg" className="border border-white/30 bg-transparent text-white hover:bg-white/10">
                {c.ctaSecondary}
              </Button>
            </Link>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-stone-500">{c.source}</p>
      </Container>
    </div>
  );
}

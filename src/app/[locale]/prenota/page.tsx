import React from "react";
import Image from "next/image";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import ContactForm from "@/src/components/forms/ContactForm";
import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { locales, toLocale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { TrackedTel, TrackedWhatsapp } from "@/src/components/analytics/TrackedLinks";

const copy = {
  it: {
    breadcrumbLabel: "Percorso",
    home: "Home",
    crumb: "Richiedi disponibilità",
    h1: "Richiedi disponibilità a Isola di Capo Rizzuto",
    intro:
      "Quattro camere matrimoniali, fino a 8 ospiti. Non c'è prenotazione immediata online: scrivici date e ospiti e ti rispondiamo con disponibilità e prezzo esatto.",
    chips: ["Colazione inclusa", "Spiagge a circa 6 km (10–15 min in auto)", "WiFi · Aria condizionata"],
    from: "Da",
    talkTitle: "Preferisci parlare direttamente?",
    talkText: "Chiamaci o scrivici su WhatsApp per una risposta rapida su date e camere.",
    reply: "Rispondiamo alle richieste online in genere entro 24 ore.",
    imageAlt: "Camera matrimoniale luminosa del Residence Le Farfalle",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    crumb: "Check availability",
    h1: "Check availability in Isola di Capo Rizzuto",
    intro:
      "Four double rooms, up to 8 guests. There's no instant online booking: send us your dates and guests and we'll reply with availability and the exact price.",
    chips: ["Breakfast included", "Beaches about 6 km away (10–15 min by car)", "WiFi · Air conditioning"],
    from: "From",
    talkTitle: "Prefer to talk to us?",
    talkText: "Call us or message us on WhatsApp for a quick answer about dates and rooms.",
    reply: "We usually reply to online requests within 24 hours.",
    imageAlt: "Bright double room at Residence Le Farfalle",
  },
  de: {
    breadcrumbLabel: "Brotkrumennavigation",
    home: "Startseite",
    crumb: "Verfügbarkeit anfragen",
    h1: "Verfügbarkeit in Isola di Capo Rizzuto anfragen",
    intro:
      "Vier Doppelzimmer, bis zu 8 Gäste. Eine Sofortbuchung online gibt es nicht: Nennen Sie uns Reisedaten und Gästezahl, wir antworten mit Verfügbarkeit und genauem Preis.",
    chips: ["Frühstück inklusive", "Strände ca. 6 km entfernt (10–15 Autominuten)", "WLAN · Klimaanlage"],
    from: "Ab",
    talkTitle: "Lieber direkt sprechen?",
    talkText: "Rufen Sie uns an oder schreiben Sie auf WhatsApp – schnelle Antwort zu Daten und Zimmern.",
    reply: "Online-Anfragen beantworten wir in der Regel innerhalb von 24 Stunden.",
    imageAlt: "Helles Doppelzimmer im Residence Le Farfalle",
  },
} as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const m = getPageMetadata("prenota", locale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(locale, "prenota"),
    openGraph: { title: m.title, description: m.description, url: `${siteConfig.url}/${locale}/prenota` },
  };
}

export default async function PrenotaPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const c = copy[locale];
  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return (
    <div className="min-h-screen">
      <section className="border-b border-stone-200 bg-amber-50/60 py-10 md:py-14">
        <Container>
          <Breadcrumbs
            label={c.breadcrumbLabel}
            items={[
              { name: c.home, url: `${baseUrl}/${locale}` },
              { name: c.crumb, url: `${baseUrl}/${locale}/prenota` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-3xl font-bold text-stone-900 md:text-5xl">{c.h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-800">{c.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm text-stone-800">
              {c.chips.map((chip) => (
                <li key={chip} className="rounded-full border border-stone-200 bg-white px-4 py-2 font-medium">
                  {chip}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-700">
              {c.from} <strong className="text-stone-900">€{siteConfig.pricing.fromEur}</strong>{" "}
              {siteConfig.pricing.basis[locale]}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-stone-50 py-10 md:py-16">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm type="preventivo" locale={locale} />
            </div>
            <aside className="lg:col-span-5">
              <Card className="overflow-hidden border border-stone-200 p-0">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/rooms/le-farfalle-matrimoniale-03.png"
                    alt={c.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-5 p-6 md:p-8">
                  <p className="flex items-start gap-2 text-sm text-stone-800">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                    <span>
                      <strong className="text-stone-900">{siteConfig.name}</strong>
                      <br />
                      {siteConfig.address}
                    </span>
                  </p>
                  <div>
                    <h2 className="font-display text-xl font-bold text-stone-900">{c.talkTitle}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">{c.talkText}</p>
                  </div>
                  <div className="grid gap-3">
                    <TrackedTel
                      placement="prenota"
                      href={`tel:${siteConfig.contacts.phone.replace(/\s/g, "")}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-900 hover:border-amber-400"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {siteConfig.contacts.phone}
                    </TrackedTel>
                    <TrackedWhatsapp
                      placement="prenota"
                      href={`https://wa.me/${waDigits}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      WhatsApp
                    </TrackedWhatsapp>
                  </div>
                  <p className="text-xs leading-relaxed text-stone-700">{c.reply}</p>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import ContactForm from "@/src/components/forms/ContactForm";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { TrackedTel, TrackedWhatsapp } from "@/src/components/analytics/TrackedLinks";

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
  const m = getPageMetadata("prenota", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "prenota"),
  };
}

interface PrenotaPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrenotaPage({ params }: PrenotaPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");

  return (
    <div className="min-h-screen pt-20">
      <section className="relative overflow-hidden border-b border-stone-200/70 py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Preventivo
            </p>
            <h1 className="mt-6 font-display text-display-sm font-bold text-neutral-900 md:text-display-md">
              Il tuo soggiorno a Isola di Capo Rizzuto
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Date flessibili, massimo 8 ospiti in 4 camere indipendenti. Compila il modulo: ti
              rispondiamo con una proposta chiara, senza impegno.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-600">
              <span className="rounded-full bg-white/80 px-4 py-2 font-medium shadow-sm backdrop-blur">
                Colazione inclusa
              </span>
              <span className="rounded-full bg-white/80 px-4 py-2 font-medium shadow-sm backdrop-blur">
                Area Marina a pochi minuti in auto
              </span>
              <span className="rounded-full bg-white/80 px-4 py-2 font-medium shadow-sm backdrop-blur">
                WiFi · Aria condizionata
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-stone-50/80 py-16 md:py-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ContactForm type="preventivo" locale={currentLocale} />
            </div>

            <aside className="lg:col-span-5 lg:pt-2">
              <Card className="overflow-hidden border border-stone-200/80 p-0 shadow-lg shadow-stone-900/5">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/rooms/le-farfalle-matrimoniale-03.png"
                    alt="Interno luminoso di una camera del Residence Le Farfalle, Isola di Capo Rizzuto"
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-display text-lg font-bold drop-shadow-md">
                      Residence Le Farfalle
                    </div>
                    <div className="mt-1 flex items-start gap-2 text-sm text-white/95 drop-shadow">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{siteConfig.address}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-5 p-6 md:p-8">
                  <div>
                    <h2 className="font-display text-xl font-bold text-stone-900">
                      Preferisci parlare direttamente?
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                      Chiamaci o scrivici su WhatsApp per disponibilità rapida o domande sul territorio.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <TrackedTel
                      href={`tel:${siteConfig.contacts.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {siteConfig.contacts.phone}
                    </TrackedTel>
                    <TrackedWhatsapp
                      href={`https://wa.me/${waDigits}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:brightness-105"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      WhatsApp
                    </TrackedWhatsapp>
                  </div>
                  <p className="text-xs leading-relaxed text-stone-500">
                    Riscontriamo le richieste online in genere entro 24 ore. Indica nel modulo se
                    preferisci email o WhatsApp.
                  </p>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}

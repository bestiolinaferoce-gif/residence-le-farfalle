import React from "react";
import Image from "next/image";
import { Star, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import ContactForm from "@/src/components/forms/ContactForm";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
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
  return {
    title: "Richiedi preventivo - Residence Le Farfalle",
    description:
      "Richiedi un preventivo personalizzato per il tuo soggiorno a Isola di Capo Rizzuto. Rispondiamo entro 24 ore.",
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
      <section className="py-16 bg-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-display-sm md:text-display-md text-neutral-900">
              Richiedi il tuo preventivo
            </h1>
            <p className="mt-3 text-lg text-neutral-600">
              Compila il form: rispondiamo entro 24 ore.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Card className="p-6 md:p-8">
              <ContactForm type="preventivo" locale={currentLocale} />
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="text-sm font-semibold text-stone-900">Oppure chiamaci / scrivici</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <TrackedTel
                    href={`tel:${siteConfig.contacts.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 hover:border-amber-200"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contacts.phone}
                  </TrackedTel>
                  <TrackedWhatsapp
                    href={`https://wa.me/${waDigits}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 hover:border-amber-200"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </TrackedWhatsapp>
                </div>
              </div>
            </Card>

            <div className="lg:pt-2">
              <Card className="p-6 md:p-8">
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src="/images/rooms/camera-generale.webp"
                    alt="Residence Le Farfalle"
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="mt-6">
                  <div className="text-lg font-semibold text-stone-900">Residence Le Farfalle</div>
                  <div className="mt-2 flex items-center gap-2 text-stone-700">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-stone-600">Risposta garantita entro 24 ore</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import ContactForm from "@/src/components/forms/ContactForm";
import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { TrackedMailto, TrackedTel, TrackedWhatsapp } from "@/src/components/analytics/TrackedLinks";

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
  const m = getPageMetadata("contatti", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "contatti"),
  };
}

interface ContattiPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContattiPage({ params }: ContattiPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary-50 to-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-display-sm md:text-display-md mb-6 text-neutral-900">
              Contattaci
            </h1>
            <p className="text-xl text-neutral-600">
              Siamo qui per rispondere a tutte le tue domande e aiutarti a organizzare il tuo soggiorno perfetto in Calabria
            </p>
            <p className="text-base text-neutral-500 mt-2">
              Rispondiamo rapidamente via WhatsApp, email o telefono. La tua soddisfazione è la nostra priorità.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="min-w-0">
              <ContactForm type="contact" locale={currentLocale} />
            </div>

            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
                <Card hover className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100">
                      <Phone className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">Telefono</div>
                      <TrackedTel
                        href={`tel:${siteConfig.contacts.phone}`}
                        className="font-semibold text-stone-900 hover:text-amber-600"
                      >
                        {siteConfig.contacts.phone}
                      </TrackedTel>
                    </div>
                  </div>
                </Card>

                <Card hover className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100">
                      <Mail className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">Email</div>
                      <TrackedMailto
                        href={`mailto:${siteConfig.contacts.email}`}
                        className="break-all font-semibold text-stone-900 hover:text-amber-600"
                      >
                        {siteConfig.contacts.email}
                      </TrackedMailto>
                    </div>
                  </div>
                </Card>

                <Card hover className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100">
                      <MessageCircle className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">WhatsApp</div>
                      <TrackedWhatsapp
                        href={`https://wa.me/${waDigits}`}
                        className="font-semibold text-stone-900 hover:text-amber-600"
                      >
                        {siteConfig.contacts.whatsapp}
                      </TrackedWhatsapp>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-amber-700" />
                  <div>
                    <div className="font-semibold text-stone-900">Orari</div>
                    <div className="mt-1 text-sm text-stone-600">
                      Check-in: dalle 14:00 alle 20:00 · Check-out: entro le 11:00
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-2">
                <iframe
                  title="Google Maps - Residence Le Farfalle"
                  src="https://maps.google.com/maps?q=38.96171494411169,17.09162398176466&z=15&output=embed"
                  className="h-[420px] w-full rounded-2xl"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-amber-700" />
                  <div>
                    <div className="font-semibold text-stone-900">Indirizzo</div>
                    <div className="mt-1 text-sm text-stone-600">{siteConfig.address}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm mb-4 text-neutral-900">
              Pronto a prenotare la tua vacanza?
            </h2>
            <p className="text-lg text-neutral-600 mb-4">
              Compila il form di prenotazione e ti confermeremo la disponibilità entro 24 ore
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              Oppure contattaci direttamente via WhatsApp per una risposta immediata
            </p>
            <Link href={`/${currentLocale}/prenota`}>
              <Button variant="primary" size="lg">
                Vai alla Prenotazione
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

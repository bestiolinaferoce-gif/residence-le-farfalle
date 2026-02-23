import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import LocationMap from "@/src/components/common/LocationMap";
import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Contatti - Residence Le Farfalle Isola di Capo Rizzuto",
    description:
      "Contattaci per informazioni, prenotazioni o assistenza. Telefono, email, WhatsApp. Siamo disponibili per aiutarti a organizzare la tua vacanza perfetta in Calabria.",
    keywords: [
      "contatti Residence Le Farfalle",
      "prenotazioni Isola di Capo Rizzuto",
      "WhatsApp prenotazioni",
      "info Residence Le Farfalle",
    ],
  };
}

interface ContattiPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContattiPage({ params }: ContattiPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

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

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card hover className="text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 rounded-full">
                  <Phone className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-900">Telefono</h3>
              <a
                href={`tel:${siteConfig.contacts.phone}`}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {siteConfig.contacts.phone}
              </a>
              <p className="text-sm text-neutral-500 mt-2">Lun-Dom: 9:00 - 20:00</p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 rounded-full">
                  <Mail className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-900">Email</h3>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="text-primary-600 hover:text-primary-700 transition-colors break-all"
              >
                {siteConfig.contacts.email}
              </a>
              <p className="text-sm text-neutral-500 mt-2">Rispondiamo entro 24h</p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 rounded-full">
                  <MessageCircle className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-900">WhatsApp</h3>
              <a
                href={`https://wa.me/${siteConfig.contacts.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {siteConfig.contacts.whatsapp}
              </a>
              <p className="text-sm text-neutral-500 mt-2">Messaggio diretto</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Address & Map */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6 text-neutral-900">
                Come Raggiungerci
              </h2>
              <Card className="p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-neutral-900">Indirizzo</h3>
                    <p className="text-neutral-700">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="space-y-4 text-neutral-700">
                  <div>
                    <h4 className="font-semibold mb-2">In Auto</h4>
                    <p className="text-sm">
                      Dalla A3, uscita Crotone. Seguire le indicazioni per Isola di Capo Rizzuto.
                      Parcheggio gratuito disponibile.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">In Aereo</h4>
                    <p className="text-sm">
                      Aeroporto di Lamezia Terme (80 km) o Aeroporto di Crotone (15 km). Transfer
                      disponibile su richiesta.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">In Treno</h4>
                    <p className="text-sm">
                      Stazione di Crotone. Da lì è possibile raggiungere il residence in auto o
                      taxi (circa 20 minuti).
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-neutral-900">Orari</h3>
                    <div className="space-y-2 text-neutral-700">
                      <div className="flex justify-between">
                        <span>Check-in</span>
                        <span className="font-medium">Dalle 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out</span>
                        <span className="font-medium">Entro le 11:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reception</span>
                        <span className="font-medium">9:00 - 20:00</span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-4">
                        Orari flessibili disponibili su richiesta
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <LocationMap showTitle={false} />
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

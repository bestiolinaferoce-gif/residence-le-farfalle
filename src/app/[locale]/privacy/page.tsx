import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import Container from "@/src/components/ui/Container";
import Link from "next/link";
import { pageAlternates } from "@/src/lib/seo";

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
    title: "Privacy Policy - Residence Le Farfalle",
    description:
      "Informativa sulla privacy e trattamento dei dati personali di Residence Le Farfalle, Isola di Capo Rizzuto.",
    alternates: pageAlternates(currentLocale, "privacy"),
  };
}

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p className="text-sm text-neutral-500">
            Ultimo aggiornamento: marzo 2026
          </p>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              1. Titolare del trattamento
            </h2>
            <p>Il titolare del trattamento dei dati personali è:</p>
            <ul className="list-none pl-0 mt-3 space-y-1 text-sm">
              <li>
                <strong>Francesco Nigro</strong>
              </li>
              <li>Residence Le Farfalle</li>
              <li>Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)</li>
              <li>
                Tel:{" "}
                <a href="tel:+393500979130" className="text-butterfly-600 underline">
                  +39 3500979130
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:info@residencelefarfalle.it" className="text-butterfly-600 underline">
                  info@residencelefarfalle.it
                </a>
              </li>
              <li>CIN struttura: IT101013C2I8M3ARTU</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              2. Tipologie di dati raccolti
            </h2>
            <p>
              Raccogliamo: nome, cognome, email, numero di telefono, indirizzo IP, dati di navigazione
              e cookie. I dati sono forniti volontariamente tramite form di contatto e prenotazione.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              3. Finalità e base giuridica
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Esecuzione del contratto:</strong> gestione prenotazioni e soggiorni
              </li>
              <li>
                <strong>Consenso:</strong> invio newsletter, cookie analytics e marketing (se accettati)
              </li>
              <li>
                <strong>Legittimo interesse:</strong> miglioramento del servizio, sicurezza del sito
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              4. Destinatari dei dati
            </h2>
            <p>
              I dati possono essere comunicati a: provider di hosting (Vercel), Google Analytics (solo
              con consenso esplicito), eventuali gestori di pagamento. Non vendiamo né cediamo dati a
              terzi per scopi commerciali.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              5. Periodo di conservazione
            </h2>
            <p>
              I dati delle prenotazioni sono conservati per 10 anni (obblighi fiscali). I dati di
              contatto per newsletter fino a revoca del consenso. I log di navigazione per 12 mesi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              6. Diritti dell&apos;interessato
            </h2>
            <p>In base al GDPR hai diritto a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accesso ai tuoi dati</li>
              <li>Rettifica e cancellazione</li>
              <li>Limitazione del trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Opposizione al trattamento</li>
              <li>Revoca del consenso</li>
            </ul>
            <p className="mt-4">
              Per esercitare i diritti scrivi a info@residencelefarfalle.it
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              7. Reclamo
            </h2>
            <p>
              Hai diritto di proporre reclamo al Garante per la Protezione dei Dati Personali:
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-butterfly-600 underline ml-1"
              >
                www.garanteprivacy.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              8. Cookie
            </h2>
            <p>
              Per informazioni dettagliate sui cookie utilizzati consulta la{" "}
              <Link href={`/${currentLocale}/cookie`} className="text-butterfly-600 underline">
                Cookie Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

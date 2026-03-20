import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import Container from "@/src/components/ui/Container";
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
    title: "Termini e Condizioni - Residence Le Farfalle",
    description: "Termini e condizioni di prenotazione e soggiorno presso Residence Le Farfalle.",
    alternates: pageAlternates(currentLocale, "termini"),
  };
}

interface TerminiPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TerminiPage({ params }: TerminiPageProps) {
  await params;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Termini e Condizioni
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              1. Descrizione del servizio
            </h2>
            <p>
              Residence Le Farfalle offre camere indipendenti con bagno privato a Isola di Capo
              Rizzuto (KR). Il servizio include colazione, WiFi e aria condizionata.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              2. Prenotazione e cancellazione
            </h2>
            <p>
              La prenotazione si perfeziona dopo conferma del titolare (telefono, WhatsApp o form
              sul sito). Di norma rispondiamo entro 24 ore lavorative con disponibilità, tariffa
              applicabile e modalità di acconto o saldo, salvo diversa indicazione.
            </p>
            <p className="mt-4">
              <strong>Cancellazione e modifiche:</strong> le condizioni definitive (eventuali acconti,
              termini di recesso, penali di cancellazione) sono quelle indicate nel messaggio o
              documento di conferma che riceverai dal titolare. In assenza di patto scritto
              specifico, si invita a comunicare tempestivamente qualsiasi disdetta o variazione di
              date; per controversie si applica la legge italiana (vedi sezione 4).
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Il presente testo ha valore informativo generale: per clausole contrattuali dettagliate
              fare sempre riferimento alla conferma di prenotazione inviata da Residence Le Farfalle.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              3. Limitazione di responsabilità
            </h2>
            <p>
              Residence Le Farfalle non è responsabile per danni indiretti, perdite o inconvenienti
              derivanti da cause di forza maggiore, eventi atmosferici o situazioni al di fuori del
              nostro controllo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
              4. Legge applicabile e foro competente
            </h2>
            <p>
              Per tutte le controversie si applica la legge italiana. Foro competente: Crotone.
            </p>
          </section>

          <p className="text-sm text-neutral-500 mt-12">
            Ultimo aggiornamento: marzo 2026
          </p>
        </div>
      </Container>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import Container from "@/src/components/ui/Container";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

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
  const m = getPageMetadata("termini", currentLocale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(currentLocale, "termini"),
  };
}

const termsCopy = {
  it: {
    title: "Termini e condizioni",
    prevailing: null as string | null,
    s1Title: "1. Descrizione del servizio",
    s1Body:
      "Residence Le Farfalle offre camere indipendenti con bagno privato a Isola di Capo Rizzuto (KR). Il servizio include colazione, WiFi e aria condizionata.",
    s2Title: "2. Prenotazione e cancellazione",
    s2Body:
      "La prenotazione si perfeziona dopo conferma del titolare (telefono, WhatsApp o form sul sito). Di norma rispondiamo entro 24 ore lavorative con disponibilità, tariffa applicabile e modalità di acconto o saldo, salvo diversa indicazione.",
    s2CancelLabel: "Cancellazione e modifiche:",
    s2CancelBody:
      "le condizioni definitive (eventuali acconti, termini di recesso, penali di cancellazione) sono quelle indicate nel messaggio o documento di conferma che riceverai dal titolare. In assenza di patto scritto specifico, si invita a comunicare tempestivamente qualsiasi disdetta o variazione di date; per controversie si applica la legge italiana (vedi sezione 4).",
    s2Note:
      "Il presente testo ha valore informativo generale: per clausole contrattuali dettagliate fare sempre riferimento alla conferma di prenotazione inviata da Residence Le Farfalle.",
    s3Title: "3. Limitazione di responsabilità",
    s3Body:
      "Residence Le Farfalle non è responsabile per danni indiretti, perdite o inconvenienti derivanti da cause di forza maggiore, eventi atmosferici o situazioni al di fuori del nostro controllo.",
    s4Title: "4. Legge applicabile e foro competente",
    s4Body: "Per tutte le controversie si applica la legge italiana. Foro competente: Crotone.",
    updated: "Ultimo aggiornamento: marzo 2026",
  },
  en: {
    title: "Terms and conditions",
    prevailing: "This translation is provided for convenience; the Italian version prevails.",
    s1Title: "1. Description of the service",
    s1Body:
      "Residence Le Farfalle offers independent rooms with private bathroom in Isola di Capo Rizzuto (KR). The service includes breakfast, Wi-Fi and air conditioning.",
    s2Title: "2. Booking and cancellation",
    s2Body:
      "A booking is finalised once confirmed by the owner (by phone, WhatsApp or the form on the website). We normally reply within 24 working hours with availability, the applicable rate and the deposit or payment terms, unless otherwise stated.",
    s2CancelLabel: "Cancellations and changes:",
    s2CancelBody:
      "the final conditions (any deposits, withdrawal periods, cancellation fees) are those stated in the confirmation message or document you will receive from the owner. In the absence of a specific written agreement, please notify us promptly of any cancellation or change of dates; Italian law applies to any disputes (see section 4).",
    s2Note:
      "This text is for general information only: for detailed contractual terms, always refer to the booking confirmation sent by Residence Le Farfalle.",
    s3Title: "3. Limitation of liability",
    s3Body:
      "Residence Le Farfalle is not liable for indirect damage, losses or inconvenience resulting from force majeure, weather events or circumstances beyond our control.",
    s4Title: "4. Governing law and jurisdiction",
    s4Body: "Italian law applies to all disputes. Place of jurisdiction: Crotone.",
    updated: "Last updated: March 2026",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    prevailing:
      "Diese Übersetzung dient nur der Information; maßgeblich ist die italienische Fassung.",
    s1Title: "1. Beschreibung der Leistung",
    s1Body:
      "Residence Le Farfalle bietet unabhängige Zimmer mit eigenem Bad in Isola di Capo Rizzuto (KR). Die Leistung umfasst Frühstück, WLAN und Klimaanlage.",
    s2Title: "2. Buchung und Stornierung",
    s2Body:
      "Die Buchung kommt mit der Bestätigung durch den Gastgeber zustande (per Telefon, WhatsApp oder über das Formular auf der Website). In der Regel antworten wir innerhalb von 24 Stunden an Werktagen mit Verfügbarkeit, geltendem Preis sowie den Bedingungen für Anzahlung bzw. Restzahlung, sofern nicht anders angegeben.",
    s2CancelLabel: "Stornierung und Änderungen:",
    s2CancelBody:
      "Maßgeblich sind die Bedingungen (etwaige Anzahlungen, Rücktrittsfristen, Stornogebühren), die in der Bestätigungsnachricht bzw. dem Bestätigungsdokument des Gastgebers angegeben sind. Liegt keine besondere schriftliche Vereinbarung vor, bitten wir Sie, jede Stornierung oder Datumsänderung umgehend mitzuteilen; für Streitigkeiten gilt italienisches Recht (siehe Abschnitt 4).",
    s2Note:
      "Dieser Text dient der allgemeinen Information: Für detaillierte Vertragsbedingungen ist stets die von Residence Le Farfalle versandte Buchungsbestätigung maßgeblich.",
    s3Title: "3. Haftungsbeschränkung",
    s3Body:
      "Residence Le Farfalle haftet nicht für mittelbare Schäden, Verluste oder Unannehmlichkeiten infolge höherer Gewalt, Wetterereignissen oder Umständen außerhalb unseres Einflussbereichs.",
    s4Title: "4. Anwendbares Recht und Gerichtsstand",
    s4Body: "Für alle Streitigkeiten gilt italienisches Recht. Gerichtsstand: Crotone.",
    updated: "Zuletzt aktualisiert: März 2026",
  },
};

interface TerminiPageProps {
  params: Promise<{ locale: string }>;
}

const h2Class = "font-display text-xl font-bold text-neutral-900 mt-8 mb-4";

export default async function TerminiPage({ params }: TerminiPageProps) {
  const { locale } = await params;
  const c = termsCopy[(locale || "it") as keyof typeof termsCopy] ?? termsCopy.it;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          {c.title}
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          {c.prevailing && <p className="text-sm italic text-neutral-500">{c.prevailing}</p>}

          <section>
            <h2 className={h2Class}>{c.s1Title}</h2>
            <p>{c.s1Body}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s2Title}</h2>
            <p>{c.s2Body}</p>
            <p className="mt-4">
              <strong>{c.s2CancelLabel}</strong> {c.s2CancelBody}
            </p>
            <p className="mt-4 text-sm text-neutral-600">{c.s2Note}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s3Title}</h2>
            <p>{c.s3Body}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s4Title}</h2>
            <p>{c.s4Body}</p>
          </section>

          <p className="text-sm text-neutral-500 mt-12">{c.updated}</p>
        </div>
      </Container>
    </div>
  );
}

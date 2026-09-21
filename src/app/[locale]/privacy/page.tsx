import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import Container from "@/src/components/ui/Container";
import Link from "next/link";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";
import { siteConfig, STRUCTURE_CIN } from "@/src/config/site";

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
  const m = getPageMetadata("privacy", currentLocale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(currentLocale, "privacy"),
  };
}

const privacyCopy = {
  it: {
    title: "Privacy Policy",
    updated: "Ultimo aggiornamento: marzo 2026",
    prevailing: null as string | null,
    s1Title: "1. Titolare del trattamento",
    s1BodyBefore: "Il titolare del trattamento dei dati personali è la struttura ricettiva",
    s1BodyAfter:
      ", con sede operativa nei recapiti sottoindicati. Per richieste relative alla privacy utilizzare l’email dedicata.",
    tel: "Tel",
    email: "Email",
    cin: "CIN struttura",
    s2Title: "2. Tipologie di dati raccolti",
    s2Body:
      "Raccogliamo: nome, cognome, email, numero di telefono, indirizzo IP, dati di navigazione e cookie. I dati sono forniti volontariamente tramite form di contatto e prenotazione.",
    s3Title: "3. Finalità e base giuridica",
    s3Items: [
      { label: "Esecuzione del contratto:", text: "gestione prenotazioni e soggiorni" },
      { label: "Consenso:", text: "invio newsletter, cookie analytics e marketing (se accettati)" },
      { label: "Legittimo interesse:", text: "miglioramento del servizio, sicurezza del sito" },
    ],
    s4Title: "4. Destinatari dei dati",
    s4Body:
      "I dati possono essere comunicati a: provider di hosting (Vercel), Google Analytics (solo con consenso esplicito), eventuali gestori di pagamento. Non vendiamo né cediamo dati a terzi per scopi commerciali.",
    s5Title: "5. Periodo di conservazione",
    s5Body:
      "I dati delle prenotazioni sono conservati per 10 anni (obblighi fiscali). I dati di contatto per newsletter fino a revoca del consenso. I log di navigazione per 12 mesi.",
    s6Title: "6. Diritti dell’interessato",
    s6Intro: "In base al GDPR hai diritto a:",
    s6Items: [
      "Accesso ai tuoi dati",
      "Rettifica e cancellazione",
      "Limitazione del trattamento",
      "Portabilità dei dati",
      "Opposizione al trattamento",
      "Revoca del consenso",
    ],
    s6Contact: "Per esercitare i diritti scrivi a",
    s7Title: "7. Reclamo",
    s7Body: "Hai diritto di proporre reclamo al Garante per la Protezione dei Dati Personali:",
    s8Title: "8. Cookie",
    s8Before: "Per informazioni dettagliate sui cookie utilizzati consulta la",
    s8Link: "Cookie Policy",
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: March 2026",
    prevailing: "This translation is provided for convenience; the Italian version prevails.",
    s1Title: "1. Data controller",
    s1BodyBefore: "The controller of personal data is the accommodation",
    s1BodyAfter:
      ", operating at the contact details below. For privacy-related requests, please use the dedicated email address.",
    tel: "Phone",
    email: "Email",
    cin: "Property CIN (national identification code)",
    s2Title: "2. Types of data collected",
    s2Body:
      "We collect: first name, last name, email address, phone number, IP address, browsing data and cookies. Data is provided voluntarily through the contact and booking forms.",
    s3Title: "3. Purposes and legal basis",
    s3Items: [
      { label: "Performance of a contract:", text: "managing bookings and stays" },
      { label: "Consent:", text: "sending the newsletter, analytics and marketing cookies (if accepted)" },
      { label: "Legitimate interest:", text: "improving the service, website security" },
    ],
    s4Title: "4. Recipients of the data",
    s4Body:
      "Data may be disclosed to: hosting provider (Vercel), Google Analytics (only with explicit consent), payment processors where applicable. We do not sell or transfer data to third parties for commercial purposes.",
    s5Title: "5. Retention period",
    s5Body:
      "Booking data is kept for 10 years (tax obligations). Newsletter contact data is kept until consent is withdrawn. Browsing logs are kept for 12 months.",
    s6Title: "6. Your rights",
    s6Intro: "Under the GDPR you have the right to:",
    s6Items: [
      "Access your data",
      "Rectification and erasure",
      "Restriction of processing",
      "Data portability",
      "Object to processing",
      "Withdraw your consent",
    ],
    s6Contact: "To exercise your rights, write to",
    s7Title: "7. Complaints",
    s7Body:
      "You have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali):",
    s8Title: "8. Cookies",
    s8Before: "For detailed information on the cookies we use, please see the",
    s8Link: "Cookie Policy",
  },
  de: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: März 2026",
    prevailing:
      "Diese Übersetzung dient nur der Information; maßgeblich ist die italienische Fassung.",
    s1Title: "1. Verantwortlicher",
    s1BodyBefore: "Verantwortlicher für die Verarbeitung personenbezogener Daten ist der Beherbergungsbetrieb",
    s1BodyAfter:
      ", erreichbar unter den unten angegebenen Kontaktdaten. Für Anfragen zum Datenschutz nutzen Sie bitte die angegebene E-Mail-Adresse.",
    tel: "Tel.",
    email: "E-Mail",
    cin: "CIN der Unterkunft (nationaler Identifikationscode)",
    s2Title: "2. Art der erhobenen Daten",
    s2Body:
      "Wir erheben: Vorname, Nachname, E-Mail-Adresse, Telefonnummer, IP-Adresse, Nutzungsdaten und Cookies. Die Daten werden freiwillig über das Kontakt- und das Buchungsformular bereitgestellt.",
    s3Title: "3. Zwecke und Rechtsgrundlage",
    s3Items: [
      { label: "Vertragserfüllung:", text: "Verwaltung von Buchungen und Aufenthalten" },
      { label: "Einwilligung:", text: "Versand des Newsletters, Analyse- und Marketing-Cookies (sofern akzeptiert)" },
      { label: "Berechtigtes Interesse:", text: "Verbesserung des Angebots, Sicherheit der Website" },
    ],
    s4Title: "4. Empfänger der Daten",
    s4Body:
      "Die Daten können weitergegeben werden an: Hosting-Anbieter (Vercel), Google Analytics (nur mit ausdrücklicher Einwilligung), gegebenenfalls Zahlungsdienstleister. Wir verkaufen oder übermitteln keine Daten zu kommerziellen Zwecken an Dritte.",
    s5Title: "5. Speicherdauer",
    s5Body:
      "Buchungsdaten werden 10 Jahre lang aufbewahrt (steuerliche Pflichten). Kontaktdaten für den Newsletter bis zum Widerruf der Einwilligung. Nutzungsprotokolle 12 Monate lang.",
    s6Title: "6. Ihre Rechte",
    s6Intro: "Nach der DSGVO haben Sie das Recht auf:",
    s6Items: [
      "Auskunft über Ihre Daten",
      "Berichtigung und Löschung",
      "Einschränkung der Verarbeitung",
      "Datenübertragbarkeit",
      "Widerspruch gegen die Verarbeitung",
      "Widerruf der Einwilligung",
    ],
    s6Contact: "Zur Ausübung Ihrer Rechte schreiben Sie an",
    s7Title: "7. Beschwerde",
    s7Body:
      "Sie haben das Recht, Beschwerde bei der italienischen Datenschutzbehörde (Garante per la Protezione dei Dati Personali) einzulegen:",
    s8Title: "8. Cookies",
    s8Before: "Ausführliche Informationen zu den verwendeten Cookies finden Sie in der",
    s8Link: "Cookie-Richtlinie",
  },
};

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

const h2Class = "font-display text-xl font-bold text-neutral-900 mt-8 mb-4";

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const c = privacyCopy[currentLocale as keyof typeof privacyCopy] ?? privacyCopy.it;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          {c.title}
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p className="text-sm text-neutral-500">{c.updated}</p>
          {c.prevailing && (
            <p className="text-sm italic text-neutral-500">{c.prevailing}</p>
          )}

          <section>
            <h2 className={h2Class}>{c.s1Title}</h2>
            <p>
              {c.s1BodyBefore} <strong>Residence Le Farfalle</strong>
              {c.s1BodyAfter}
            </p>
            <ul className="list-none pl-0 mt-3 space-y-1 text-sm">
              <li>
                <strong>Residence Le Farfalle</strong>
              </li>
              <li>Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)</li>
              <li>
                {c.tel}:{" "}
                <a href={`tel:${siteConfig.contacts.phone.replace(/[^\d+]/g, "")}`} className="text-butterfly-600 underline">
                  {siteConfig.contacts.phone}
                </a>
              </li>
              <li>
                {c.email}:{" "}
                <a href={`mailto:${siteConfig.contacts.email}`} className="text-butterfly-600 underline">
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                {c.cin}: {STRUCTURE_CIN}
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>{c.s2Title}</h2>
            <p>{c.s2Body}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s3Title}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {c.s3Items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> {item.text}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>{c.s4Title}</h2>
            <p>{c.s4Body}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s5Title}</h2>
            <p>{c.s5Body}</p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s6Title}</h2>
            <p>{c.s6Intro}</p>
            <ul className="list-disc pl-6 space-y-2">
              {c.s6Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">
              {c.s6Contact}{" "}
              <a href={`mailto:${siteConfig.contacts.email}`} className="text-butterfly-600 underline">
                {siteConfig.contacts.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className={h2Class}>{c.s7Title}</h2>
            <p>
              {c.s7Body}
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
            <h2 className={h2Class}>{c.s8Title}</h2>
            <p>
              {c.s8Before}{" "}
              <Link href={`/${currentLocale}/cookie`} className="text-butterfly-600 underline">
                {c.s8Link}
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

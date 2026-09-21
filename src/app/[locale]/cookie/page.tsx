import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import Container from "@/src/components/ui/Container";
import Link from "next/link";
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
  const m = getPageMetadata("cookie", currentLocale);
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(currentLocale, "cookie"),
  };
}

const cookieCopy = {
  it: {
    title: "Cookie Policy",
    prevailing: null as string | null,
    intro:
      "Questa Cookie Policy descrive i cookie utilizzati sul sito web ufficiale di Residence Le Farfalle (Isola di Capo Rizzuto).",
    tableTitle: "Tabella cookie",
    colName: "Nome",
    colCategory: "Categoria",
    colDuration: "Durata",
    colPurpose: "Scopo",
    cookies: [
      {
        name: "le-farfalle-cookie-consent",
        category: "Necessario",
        duration: "1 anno",
        purpose: "Salva le preferenze di consenso ai cookie dell’utente",
      },
      {
        name: "_ga, _gid",
        category: "Analytics",
        duration: "2 anni / 24 ore",
        purpose: "Google Analytics - statistiche di navigazione (solo con consenso)",
      },
      {
        name: "locale",
        category: "Necessario",
        duration: "Sessione",
        purpose: "Memorizza la lingua preferita (it, en, de)",
      },
    ],
    manageTitle: "Come gestire i cookie",
    manageBody:
      "Puoi modificare le preferenze in qualsiasi momento cliccando su “Preferenze” nel banner cookie. I cookie strettamente necessari non possono essere disattivati. Per maggiori informazioni sulla privacy consulta la",
    privacyLink: "Privacy Policy",
  },
  en: {
    title: "Cookie Policy",
    prevailing: "This translation is provided for convenience; the Italian version prevails.",
    intro:
      "This Cookie Policy describes the cookies used on the official website of Residence Le Farfalle (Isola di Capo Rizzuto).",
    tableTitle: "Cookie table",
    colName: "Name",
    colCategory: "Category",
    colDuration: "Duration",
    colPurpose: "Purpose",
    cookies: [
      {
        name: "le-farfalle-cookie-consent",
        category: "Necessary",
        duration: "1 year",
        purpose: "Stores the user’s cookie consent preferences",
      },
      {
        name: "_ga, _gid",
        category: "Analytics",
        duration: "2 years / 24 hours",
        purpose: "Google Analytics - browsing statistics (only with consent)",
      },
      {
        name: "locale",
        category: "Necessary",
        duration: "Session",
        purpose: "Remembers the preferred language (it, en, de)",
      },
    ],
    manageTitle: "How to manage cookies",
    manageBody:
      "You can change your preferences at any time by clicking “Preferences” in the cookie banner. Strictly necessary cookies cannot be disabled. For more information on privacy, please see the",
    privacyLink: "Privacy Policy",
  },
  de: {
    title: "Cookie-Richtlinie",
    prevailing:
      "Diese Übersetzung dient nur der Information; maßgeblich ist die italienische Fassung.",
    intro:
      "Diese Cookie-Richtlinie beschreibt die Cookies, die auf der offiziellen Website von Residence Le Farfalle (Isola di Capo Rizzuto) verwendet werden.",
    tableTitle: "Cookie-Übersicht",
    colName: "Name",
    colCategory: "Kategorie",
    colDuration: "Speicherdauer",
    colPurpose: "Zweck",
    cookies: [
      {
        name: "le-farfalle-cookie-consent",
        category: "Notwendig",
        duration: "1 Jahr",
        purpose: "Speichert die Cookie-Einwilligungen des Nutzers",
      },
      {
        name: "_ga, _gid",
        category: "Analyse",
        duration: "2 Jahre / 24 Stunden",
        purpose: "Google Analytics - Nutzungsstatistiken (nur mit Einwilligung)",
      },
      {
        name: "locale",
        category: "Notwendig",
        duration: "Sitzung",
        purpose: "Speichert die bevorzugte Sprache (it, en, de)",
      },
    ],
    manageTitle: "Cookies verwalten",
    manageBody:
      "Sie können Ihre Einstellungen jederzeit ändern, indem Sie im Cookie-Banner auf „Einstellungen“ klicken. Unbedingt notwendige Cookies können nicht deaktiviert werden. Weitere Informationen zum Datenschutz finden Sie in der",
    privacyLink: "Datenschutzerklärung",
  },
};

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

const h2Class = "font-display text-xl font-bold text-neutral-900 mt-8 mb-4";
const thClass = "p-3 text-left font-semibold text-neutral-900";

export default async function CookiePage({ params }: CookiePageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const t = cookieCopy[currentLocale as keyof typeof cookieCopy] ?? cookieCopy.it;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          {t.title}
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          {t.prevailing && <p className="text-sm italic text-neutral-500">{t.prevailing}</p>}
          <p>{t.intro}</p>

          <h2 className={h2Class}>{t.tableTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-neutral-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-butterfly-50">
                  <th className={thClass}>{t.colName}</th>
                  <th className={thClass}>{t.colCategory}</th>
                  <th className={thClass}>{t.colDuration}</th>
                  <th className={thClass}>{t.colPurpose}</th>
                </tr>
              </thead>
              <tbody>
                {t.cookies.map((c) => (
                  <tr key={c.name} className="border-t border-neutral-200">
                    <td className="p-3 text-sm font-mono">{c.name}</td>
                    <td className="p-3 text-sm">{c.category}</td>
                    <td className="p-3 text-sm">{c.duration}</td>
                    <td className="p-3 text-sm">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2Class}>{t.manageTitle}</h2>
          <p>
            {t.manageBody}{" "}
            <Link href={`/${currentLocale}/privacy`} className="text-butterfly-600 underline">
              {t.privacyLink}
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}

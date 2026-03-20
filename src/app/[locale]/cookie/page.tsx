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
    title: "Cookie Policy - Residence Le Farfalle",
    description: "Informativa sui cookie utilizzati dal sito Residence Le Farfalle.",
    alternates: pageAlternates(currentLocale, "cookie"),
  };
}

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiePage({ params }: CookiePageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  const cookies = [
    {
      name: "le-farfalle-cookie-consent",
      category: "Necessario",
      duration: "1 anno",
      purpose: "Salva le preferenze di consenso ai cookie dell'utente",
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
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Cookie Policy
        </h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p>
            Questa Cookie Policy descrive i cookie utilizzati sul sito residencelefarfalle.it gestito
            da Residence Le Farfalle.
          </p>

          <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
            Tabella cookie
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-neutral-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-butterfly-50">
                  <th className="p-3 text-left font-semibold text-neutral-900">Nome</th>
                  <th className="p-3 text-left font-semibold text-neutral-900">Categoria</th>
                  <th className="p-3 text-left font-semibold text-neutral-900">Durata</th>
                  <th className="p-3 text-left font-semibold text-neutral-900">Scopo</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
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

          <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
            Come gestire i cookie
          </h2>
          <p>
            Puoi modificare le preferenze in qualsiasi momento cliccando su &quot;Preferenze&quot; nel banner
            cookie. I cookie strettamente necessari non possono essere disattivati. Per maggiori
            informazioni sulla privacy consulta la{" "}
            <Link href={`/${currentLocale}/privacy`} className="text-butterfly-600 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}

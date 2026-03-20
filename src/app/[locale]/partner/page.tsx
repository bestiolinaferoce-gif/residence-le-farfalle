import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import PartnersPage from "@/src/components/partner/PartnersPage";
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
    title: "Partner & Servizi utili - Residence Le Farfalle",
    description:
      "Farmacie, guardie mediche, supermarket, ristoranti, transfer, noleggio, escursioni. Tutti i contatti utili per la tua vacanza a Isola di Capo Rizzuto.",
    keywords: [
      "farmacie Isola di Capo Rizzuto",
      "transfer aeroporto",
      "escursioni Calabria",
      "servizi utili Isola di Capo Rizzuto",
    ],
    alternates: pageAlternates(currentLocale, "partner"),
  };
}

interface PartnerPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen pt-20">
      <PartnersPage locale={locale || "it"} />
    </div>
  );
}

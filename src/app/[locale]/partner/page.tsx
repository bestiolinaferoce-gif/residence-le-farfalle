import React from "react";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import PartnersPage from "@/src/components/partner/PartnersPage";
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
  const m = getPageMetadata("partner", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
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

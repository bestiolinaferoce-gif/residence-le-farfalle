import React from "react";
import type { Metadata } from "next";
import itMessages from "../../../messages/it.json";
import enMessages from "../../../messages/en.json";
import deMessages from "../../../messages/de.json";
import { LocaleProvider } from "@/src/components/i18n/LocaleProvider";
import type { MessagesTree } from "@/src/components/i18n/LocaleProvider";
import { siteConfig } from "@/src/config/site";
import { getReviewStats } from "@/src/data/reviews/reviews";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";

  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[currentLocale as keyof typeof siteConfig.description] || siteConfig.description.it,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      type: "website",
      locale: currentLocale === "it" ? "it_IT" : currentLocale === "en" ? "en_US" : "de_DE",
      url: `${siteConfig.url}/${currentLocale}`,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description[currentLocale as keyof typeof siteConfig.description] || siteConfig.description.it,
      images: [
        {
          url: `${siteConfig.url}/images/rooms/le-farfalle-matrimoniale-03.png`,
          width: 1536,
          height: 1024,
          alt: "Camera matrimoniale moderna — Residence Le Farfalle, Isola di Capo Rizzuto",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description:
        siteConfig.description[currentLocale as keyof typeof siteConfig.description] ||
        siteConfig.description.it,
      images: [`${siteConfig.url}/images/rooms/le-farfalle-matrimoniale-03.png`],
    },
    alternates: {
      canonical: `${siteConfig.url}/${currentLocale}`,
      languages: {
        it: `${siteConfig.url}/it`,
        en: `${siteConfig.url}/en`,
        de: `${siteConfig.url}/de`,
      },
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const messages: MessagesTree =
    currentLocale === "en"
      ? (enMessages as unknown as MessagesTree)
      : currentLocale === "de"
        ? (deMessages as unknown as MessagesTree)
        : (itMessages as unknown as MessagesTree);

  const langMap: Record<string, string> = { it: "it", en: "en", de: "de" };
  const htmlLang = langMap[currentLocale] || "it";
  const descLang =
    currentLocale === "en" || currentLocale === "de" ? currentLocale : "it";
  const lodgingAmenityNames: Record<string, string[]> = {
    it: ["Colazione inclusa", "WiFi gratuito", "Aria condizionata", "Bagno privato"],
    en: ["Breakfast included", "Free WiFi", "Air conditioning", "Private bathroom"],
    de: ["Frühstück inklusive", "Kostenloses WLAN", "Klimaanlage", "Eigenes Bad"],
  };
  const amenityLabels = lodgingAmenityNames[descLang];

  const reviewStats = getReviewStats();
  const aggregateRating =
    reviewStats != null
      ? {
          "@type": "AggregateRating" as const,
          ratingValue: String(reviewStats.average10),
          reviewCount: reviewStats.count,
          bestRating: "10",
          worstRating: "1",
        }
      : {
          "@type": "AggregateRating" as const,
          ratingValue: "9.7",
          reviewCount: 6,
          bestRating: "10",
          worstRating: "1",
        };

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    name: "Residence Le Farfalle",
    description: siteConfig.description[descLang],
    image: [`${siteConfig.url.replace(/\/$/, "")}/images/rooms/le-farfalle-matrimoniale-03.png`],
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Capo delle Colonne",
      addressLocality: "Isola di Capo Rizzuto",
      addressRegion: "KR",
      postalCode: "88841",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.96171494411169,
      longitude: 17.09162398176466,
    },
    checkinTime: "14:00",
    checkoutTime: "11:00",
    numberOfRooms: 4,
    amenityFeature: amenityLabels.map((name) => ({
      "@type": "LocationFeatureSpecification" as const,
      name,
      value: true,
    })),
    priceRange: "€€",
    aggregateRating,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${htmlLang}";`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LocaleProvider locale={currentLocale} messages={messages}>
        {children}
      </LocaleProvider>
    </>
  );
}

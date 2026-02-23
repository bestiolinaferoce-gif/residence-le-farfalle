import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

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
    keywords: [
      "residence",
      "calabria",
      "isola di capo rizzuto",
      "bed and breakfast",
      "vacanze calabria",
      "camere calabria",
      "alloggio crotone",
    ],
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
          url: `${siteConfig.url}/images/rooms/camera-generale.webp`,
          width: 1536,
          height: 1024,
          alt: "Residence Le Farfalle - Vista generale",
        },
      ],
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

  // Structured Data (JSON-LD) per Hotel/LodgingBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: siteConfig.description[currentLocale as keyof typeof siteConfig.description] || siteConfig.description.it,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.split(",")[0],
      addressLocality: "Isola di Capo Rizzuto",
      addressRegion: "Calabria",
      postalCode: "88841",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    url: `${siteConfig.url}/${currentLocale}`,
    priceRange: "€€",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "WiFi gratuito",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Aria condizionata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Colazione inclusa",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Parcheggio gratuito",
        value: true,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

import React from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import itMessages from "../../../messages/it.json";
import enMessages from "../../../messages/en.json";
import deMessages from "../../../messages/de.json";
import AppWrapper from "@/src/components/layout/AppWrapper";
import { BANNER_DISMISS_SCRIPT } from "@/src/config/banner";
import { LocaleProvider } from "@/src/components/i18n/LocaleProvider";
import type { MessagesTree } from "@/src/components/i18n/LocaleProvider";
import { siteConfig } from "@/src/config/site";
import { locales, toLocale, type Locale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import "../globals.css";

/**
 * Root layout per lingua. <html lang> è qui (e non in app/layout.tsx) perché
 * ogni lingua deve arrivare con il `lang` corretto già nell'HTML del server:
 * prima era sempre "it" e veniva corretto da uno script dopo il caricamento,
 * quindi crawler e screen reader leggevano l'inglese e il tedesco come italiano.
 */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-clash-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

// Solo it/en/de: qualsiasi altro primo segmento restituisce 404 invece di una pagina vuota.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

/** GA4 solo con un ID reale: un segnaposto non deve caricare gtag.js né chiedere consenso. */
function resolveGaId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return raw && /^G-[A-Z0-9]{6,}$/.test(raw) && !/^G-X+$/i.test(raw) ? raw : null;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const ogLocale: Record<Locale, string> = { it: "it_IT", en: "en_GB", de: "de_DE" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const description = siteConfig.description[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    // Le pagine passano già un titolo completo di marchio: niente suffisso doppio.
    title: { default: siteConfig.name, template: "%s" },
    description,
    robots: { index: true, follow: true },
    verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description,
      images: [
        {
          url: `${siteConfig.url}/images/rooms/le-farfalle-matrimoniale-03.png`,
          width: 1536,
          height: 1024,
          alt: siteConfig.ogImageAlt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description,
      images: [`${siteConfig.url}/images/rooms/le-farfalle-matrimoniale-03.png`],
    },
    alternates: pageAlternates(locale, ""),
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const messagesByLocale: Record<Locale, MessagesTree> = {
  it: itMessages as unknown as MessagesTree,
  en: enMessages as unknown as MessagesTree,
  de: deMessages as unknown as MessagesTree,
};

const amenityNames: Record<Locale, string[]> = {
  it: ["Colazione inclusa", "WiFi gratuito", "Aria condizionata", "Bagno privato"],
  en: ["Breakfast included", "Free WiFi", "Air conditioning", "Private bathroom"],
  de: ["Frühstück inklusive", "Kostenloses WLAN", "Klimaanlage", "Eigenes Bad"],
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!(locales as readonly string[]).includes(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const gaId = resolveGaId();
  const root = siteConfig.url.replace(/\/$/, "");

  /**
   * `sameAs`: profili pubblici ufficiali della struttura (solo URL valorizzati).
   * Niente AggregateRating: per LocalBusiness le recensioni pubblicate dalla
   * struttura stessa sul proprio sito sono "self-serving" e non ammesse ai rich
   * result; il punteggio resta visibile in pagina con fonte e data.
   */
  const sameAs: string[] = [
    siteConfig.booking.booking_com,
    siteConfig.booking.airbnb,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.tripadvisor,
    siteConfig.social.google_business,
  ].filter((u) => u.length > 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    "@id": `${root}/#lodging`,
    name: siteConfig.name,
    url: `${root}/${locale}`,
    description: siteConfig.description[locale],
    image: [
      `${root}/images/rooms/camera-2-letto.webp`,
      `${root}/images/rooms/camera-2-interno.webp`,
      `${root}/images/rooms/le-farfalle-matrimoniale-03.png`,
    ],
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.postalAddress.street,
      addressLocality: siteConfig.postalAddress.locality,
      addressRegion: siteConfig.postalAddress.region,
      postalCode: siteConfig.postalAddress.postalCode,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    checkinTime: siteConfig.stay.checkIn,
    checkoutTime: siteConfig.stay.checkOut,
    numberOfRooms: 4,
    petsAllowed: false,
    amenityFeature: amenityNames[locale].map((name) => ({
      "@type": "LocationFeatureSpecification" as const,
      name,
      value: true,
    })),
    priceRange: `€${siteConfig.pricing.fromEur}+`,
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    // suppressHydrationWarning: lo script qui sotto può aggiungere la classe "bb-dismissed" prima dell'idratazione.
    <html lang={locale} className={`${jakarta.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: BANNER_DISMISS_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LocaleProvider locale={locale} messages={messagesByLocale[locale]}>
          <AppWrapper locale={locale} consentRequired={gaId !== null}>
            {children}
          </AppWrapper>
        </LocaleProvider>
        {/* Vercel Web Analytics: senza cookie né identificatori persistenti, fuori dal banner. */}
        <Analytics />
        {gaId ? (
          <>
            {/* Consent Mode v2: default negato prima di gtag.js, poi la scelta salvata. */}
            <Script id="ga-consent-default" strategy="beforeInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
        try {
          var stored = localStorage.getItem('le-farfalle-cookie-consent');
          if (stored) {
            var c = JSON.parse(stored);
            gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied' });
          }
        } catch (e) {}
      `}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

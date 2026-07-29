import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AppWrapper from "@/src/components/layout/AppWrapper";
import "./globals.css";
import { siteConfig } from "@/src/config/site";

// Sostituire con il token reale dalla Google Search Console.
// In alternativa valorizzare NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION su Vercel.
const GOOGLE_SITE_VERIFICATION_TOKEN = "GOOGLE_SITE_VERIFICATION_TOKEN";
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  (GOOGLE_SITE_VERIFICATION_TOKEN !== "GOOGLE_SITE_VERIFICATION_TOKEN"
    ? GOOGLE_SITE_VERIFICATION_TOKEN
    : undefined);

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-clash-display",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.it,
  robots: { index: true, follow: true },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * In produzione girava il segnaposto letterale "G-XXXXXXXXXX": gtag.js veniva
   * caricato verso Google a ogni visita senza raccogliere nulla di utile.
   * Un ID non valido ora semplicemente non carica lo script.
   */
  const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const gaId = rawGaId && /^G-[A-Z0-9]{6,}$/.test(rawGaId) && !/^G-X+$/i.test(rawGaId) ? rawGaId : null;

  return (
    <html lang="it" className={`${jakarta.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <AppWrapper>{children}</AppWrapper>
        {/*
          Vercel Web Analytics: senza cookie e senza identificatori persistenti,
          quindi non richiede consenso preventivo e resta fuori dal banner.
          Copre il buco lasciato da Google Analytics, che in produzione girava
          con un ID segnaposto e non ha mai raccolto un dato.
        */}
        <Analytics />
        {gaId ? (
          <>
            {/*
              Consent Mode v2. Deve girare PRIMA di gtag.js: senza questo blocco
              Analytics partiva ad ogni visita a prescindere dalla scelta nel banner,
              inviando la pageview anche a chi aveva selezionato "Solo necessari".
              Con consenso negato gtag non scrive cookie e non invia dati finché
              il banner non concede esplicitamente.
            */}
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
            gtag('consent', 'update', {
              analytics_storage: c.analytics ? 'granted' : 'denied',
              ad_storage: c.marketing ? 'granted' : 'denied',
              ad_user_data: c.marketing ? 'granted' : 'denied',
              ad_personalization: c.marketing ? 'granted' : 'denied'
            });
          }
        } catch (e) {}
      `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          page_path: window.location.pathname,
        });
      `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

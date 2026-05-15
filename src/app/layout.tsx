import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  return (
    <html lang="it" className={`${jakarta.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <AppWrapper>{children}</AppWrapper>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
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

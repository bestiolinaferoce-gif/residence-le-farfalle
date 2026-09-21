"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "@/src/components/ui/ErrorBoundary";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CookieBanner from "@/src/components/gdpr/CookieBanner";
import WhatsAppButton from "@/src/components/ui/WhatsAppButton";
import BandieraBluTopBanner from "@/src/components/ui/BandieraBluTopBanner";
import { uiCopy } from "@/src/config/ui-copy";
import type { Locale } from "@/src/lib/i18n";

interface AppWrapperProps {
  children: React.ReactNode;
  locale: Locale;
  /** true solo se è attivo un tracker che richiede consenso (oggi: GA4 con ID reale). */
  consentRequired: boolean;
}

export default function AppWrapper({ children, locale, consentRequired }: AppWrapperProps) {
  const t = uiCopy[locale];
  return (
    <ErrorBoundary>
      {/* Framer Motion rispetta "riduci movimento" del sistema operativo. */}
      <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-stone-900 focus:shadow-lg"
      >
        {t.skipToContent}
      </a>
      {/* Banner e header in un unico stack sticky. */}
      <div className="sticky top-0 z-50">
        <BandieraBluTopBanner />
        <Header locale={locale} />
      </div>
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
      {consentRequired ? <CookieBanner locale={locale} /> : null}
      </MotionConfig>
    </ErrorBoundary>
  );
}

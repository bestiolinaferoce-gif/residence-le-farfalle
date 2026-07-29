"use client";

import React from "react";
import ErrorBoundary from "@/src/components/ui/ErrorBoundary";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CookieBanner from "@/src/components/gdpr/CookieBanner";
import WhatsAppButton from "@/src/components/ui/WhatsAppButton";
import BandieraBluTopBanner from "@/src/components/ui/BandieraBluTopBanner";
import { usePathname } from "next/navigation";

interface AppWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper client component per ErrorBoundary, Header e Footer
 * Necessario perché ErrorBoundary è client component
 * e non può essere usato direttamente in server components
 */
export default function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it"; // Estrai il locale dal pathname

  return (
    <ErrorBoundary>
      {/*
        Banner e header in un unico stack sticky. Erano separati con l'header
        `fixed`, che copriva completamente il banner Bandiera Blu lasciando al
        suo posto una fascia vuota. In flusso non serve più compensare con
        padding su <main>, che restava comunque disallineato.
      */}
      <div className="sticky top-0 z-50">
        <BandieraBluTopBanner />
        <Header />
      </div>
      <main>{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton />
      <CookieBanner />
    </ErrorBoundary>
  );
}

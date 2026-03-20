"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/src/components/ui/Button";

const STORAGE_KEY = "le-farfalle-cookie-consent";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: "1.0";
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return true;
      const parsed = JSON.parse(stored) as CookieConsent;
      return parsed.version !== "1.0";
    } catch {
      return true;
    }
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "it";

  const save = (consent: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferences(false);
    if (consent.analytics && typeof window !== "undefined" && (window as unknown as { gtag?: unknown }).gtag) {
      // GA caricato da parent - next/script
    }
  };

  const acceptAll = () => {
    save({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: "1.0",
    });
  };

  const acceptNecessaryOnly = () => {
    save({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: "1.0",
    });
  };

  const savePreferences = () => {
    save({
      necessary: true,
      analytics,
      marketing,
      timestamp: Date.now(),
      version: "1.0",
    });
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 glass-card border-t border-butterfly-200/50"
      role="dialog"
      aria-labelledby="cookie-banner-title"
    >
      <div className="max-w-4xl mx-auto">
        {!showPreferences ? (
          <>
            <h2 id="cookie-banner-title" className="font-display text-lg font-bold text-neutral-900 mb-2">
              Cookie e privacy
            </h2>
            <p className="text-sm text-neutral-600 mb-4">
              Utilizziamo cookie necessari per il funzionamento del sito. Puoi accettare tutti i cookie,
              solo quelli necessari o personalizzare le preferenze.{" "}
              <Link href={`/${locale}/privacy`} className="text-butterfly-600 underline hover:text-butterfly-700">
                Privacy Policy
              </Link>
              {" · "}
              <Link href={`/${locale}/cookie`} className="text-butterfly-600 underline hover:text-butterfly-700">
                Cookie Policy
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Accetta tutti
              </Button>
              <Button variant="secondary" size="sm" onClick={acceptNecessaryOnly}>
                Solo necessari
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)}>
                Preferenze
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 id="cookie-banner-title" className="font-display text-lg font-bold text-neutral-900 mb-4">
              Preferenze cookie
            </h2>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked disabled className="rounded" />
                <span className="text-sm text-neutral-700">Necessari (sempre attivi)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-neutral-700">Analytics (Google Analytics)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-neutral-700">Marketing</span>
              </label>
            </div>
            <Button variant="primary" size="sm" onClick={savePreferences}>
              Salva preferenze
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

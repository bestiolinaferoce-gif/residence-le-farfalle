"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import { uiCopy } from "@/src/config/ui-copy";
import type { Locale } from "@/src/lib/i18n";

const STORAGE_KEY = "le-farfalle-cookie-consent";
const CONSENT_VERSION = "1.1";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  timestamp: number;
  version: string;
}

/**
 * Lo stato arriva da localStorage tramite useSyncExternalStore: sul server il
 * banner non viene reso e il client decide dopo l'idratazione. La versione
 * precedente leggeva localStorage nell'inizializzatore di useState e produceva
 * l'errore React #418 (HTML diverso fra server e client) su ogni pagina.
 */
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function needsChoice(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    return (JSON.parse(stored) as CookieConsent).version !== CONSENT_VERSION;
  } catch {
    return true;
  }
}

export default function CookieBanner({ locale }: { locale: Locale }) {
  const visible = useSyncExternalStore(subscribe, needsChoice, () => false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const t = uiCopy[locale];

  const save = (analyticsGranted: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: analyticsGranted,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // storage non disponibile: la scelta vale solo per questa pagina
    }
    setShowPreferences(false);
    listeners.forEach((l) => l());
    window.gtag?.("consent", "update", {
      analytics_storage: analyticsGranted ? "granted" : "denied",
    });
  };

  if (!visible) return null;

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:p-5"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="cookie-banner-title" className="font-display text-base font-bold text-stone-900">
          {showPreferences ? t.cookiePrefsTitle : t.cookieTitle}
        </h2>
        {!showPreferences ? (
          <>
            <p className="mt-1 text-sm text-stone-700">
              {t.cookieText}{" "}
              <Link href={`/${locale}/cookie`} className="font-semibold text-stone-900 underline">
                {t.cookie}
              </Link>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => save(false)}>
                {t.cookieNecessary}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => save(true)}>
                {t.cookieAcceptAll}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)}>
                {t.cookiePrefs}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked disabled className="h-4 w-4 rounded" />
                <span className="text-sm text-stone-800">{t.cookieNecessaryAlways}</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <span className="text-sm text-stone-800">{t.cookieAnalytics}</span>
              </label>
            </div>
            <Button className="mt-3" variant="primary" size="sm" onClick={() => save(analytics)}>
              {t.cookieSave}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

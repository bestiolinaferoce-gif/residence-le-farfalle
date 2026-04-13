"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { locales, type Locale, localeNames } from "@/src/lib/i18n";

interface LanguageSwitcherProps {
  /** true quando l'header è su sfondo chiaro (dopo scroll) */
  opaqueHeader?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ opaqueHeader = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Estrai locale corrente dal pathname
  const currentLocale = pathname.split("/")[1] as Locale || "it";

  const handleLocaleChange = (locale: Locale) => {
    // Sostituisci il locale nel pathname
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
          opaqueHeader
            ? "hover:bg-neutral-100"
            : "text-white hover:bg-white/10"
        )}
        aria-label="Cambia lingua"
        aria-expanded={isOpen}
      >
        <Globe className={cn("h-4 w-4", opaqueHeader ? "text-neutral-600" : "text-white/90")} />
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-hard border border-neutral-200 z-20 overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between",
                  currentLocale === locale && "bg-primary-50 text-primary-700"
                )}
              >
                <span>{localeNames[locale]}</span>
                {currentLocale === locale && (
                  <Check className="h-4 w-4 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

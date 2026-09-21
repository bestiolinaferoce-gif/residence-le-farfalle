"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { locales, localeNames, type Locale } from "@/src/lib/i18n";
import { uiCopy } from "@/src/config/ui-copy";

interface LanguageSwitcherProps {
  locale: Locale;
  /** true quando l'header è su sfondo chiaro (dopo scroll) */
  opaqueHeader?: boolean;
  /** Elenco sempre visibile (menu mobile) invece del menu a tendina. */
  inline?: boolean;
}

/** Link veri (non router.push): ogni lingua resta raggiungibile anche senza JS e dai crawler. */
export default function LanguageSwitcher({ locale, opaqueHeader = true, inline = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const t = uiCopy[locale];

  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen]);

  const list = (
    <ul className={inline ? "flex gap-2" : "py-1"}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => setIsOpen(false)}
            className={cn(
              inline
                ? "inline-flex min-h-11 items-center rounded-lg border px-3 text-sm font-semibold"
                : "flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-neutral-50",
              l === locale
                ? inline
                  ? "border-amber-400 bg-amber-50 text-stone-900"
                  : "bg-amber-50 text-stone-900"
                : inline
                  ? "border-stone-200 text-stone-700"
                  : "text-stone-800"
            )}
          >
            <span>{localeNames[l]}</span>
            {!inline && l === locale ? <Check className="h-4 w-4 text-amber-700" aria-hidden /> : null}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (inline) {
    return (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-600">{t.changeLanguage}</p>
        {list}
      </div>
    );
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex min-h-11 items-center gap-2 rounded-lg px-3 transition-colors",
          opaqueHeader ? "text-stone-800 hover:bg-neutral-100" : "text-white hover:bg-white/10"
        )}
        aria-label={`${t.changeLanguage}: ${localeNames[locale]}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-hard">
          {list}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ButterflyIcon } from "@/src/components/ui/ButterflyIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import { navigation } from "@/src/config/navigation";
import { uiCopy } from "@/src/config/ui-copy";
import type { Locale } from "@/src/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const t = uiCopy[locale];
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Menu mobile: Esc chiude, il focus entra nel pannello e torna al pulsante.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll<HTMLElement>("a,button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = navigation.main.map((item) => ({
    label: item.name[locale],
    href: `/${locale}${item.href}`,
  }));
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "relative w-full border-b transition-colors duration-300",
        isScrolled
          ? "border-stone-200/80 bg-white/95 shadow-soft backdrop-blur-md"
          : "border-white/10 bg-stone-950/55 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 md:h-20">
          <Link
            href={`/${locale}`}
            aria-label={t.homeLink}
            className={cn(
              "flex items-center gap-2.5 font-display text-xl font-bold transition-colors",
              isScrolled ? "text-neutral-900" : "text-white"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                isScrolled
                  ? "bg-primary-50 text-primary-600 ring-1 ring-primary-100"
                  : "bg-white/15 text-amber-200 ring-1 ring-white/25"
              )}
              aria-hidden
            >
              <ButterflyIcon className="h-6 w-6" />
            </span>
            <span className="tracking-tight">Le Farfalle</span>
          </Link>

          <nav aria-label={t.mainNav} className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md text-sm font-medium transition-colors",
                  isScrolled
                    ? isActive(item.href)
                      ? "text-amber-800"
                      : "text-neutral-700 hover:text-amber-800"
                    : isActive(item.href)
                      ? "text-amber-200"
                      : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/${locale}/prenota`}
              className="inline-flex shrink-0 items-center rounded-xl bg-amber-400 px-3.5 py-2 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-amber-300 sm:px-4"
            >
              <span className="sm:hidden">{t.ctaAvailabilityShort}</span>
              <span className="hidden sm:inline">{t.ctaAvailability}</span>
            </Link>
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} opaqueHeader={isScrolled} />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-xl transition-colors lg:hidden",
                isScrolled ? "text-stone-900 hover:bg-neutral-100" : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <>
          <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={closeMenu} aria-hidden />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            className="fixed right-0 top-0 z-[61] flex h-dvh w-[86vw] max-w-sm flex-col bg-white shadow-hard motion-safe:animate-[slideIn_.2s_ease-out] lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <p className="font-display text-lg font-bold text-stone-900">{t.menu}</p>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  menuButtonRef.current?.focus();
                }}
                className="grid h-11 w-11 place-items-center rounded-xl text-stone-900 hover:bg-stone-100"
                aria-label={t.closeMenu}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav aria-label={t.mainNav} className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-2 py-3 text-base font-semibold",
                        isActive(item.href) ? "text-amber-800" : "text-stone-800 hover:bg-stone-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/prenota`}
                onClick={closeMenu}
                className="mt-4 block rounded-xl bg-amber-400 px-4 py-3 text-center font-semibold text-stone-950"
              >
                {t.ctaAvailability}
              </Link>
              <div className="mt-6 border-t border-stone-200 pt-4">
                <LanguageSwitcher locale={locale} opaqueHeader inline />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}

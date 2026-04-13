"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Button from "@/src/components/ui/Button";
import { ButterflyIcon } from "@/src/components/ui/ButterflyIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import { navigation, type NavLocale } from "@/src/config/navigation";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Estrai locale corrente
  const localeRaw = pathname.split("/")[1] || "it";
  const locale: NavLocale =
    localeRaw === "en" || localeRaw === "de" ? localeRaw : "it";

  const navItems = navigation.main.map((item) => ({
    ...item,
    label: item.name[locale],
    href: `/${localeRaw}${item.href === "/" ? "" : item.href}`,
  }));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "border-stone-200/80 bg-white/95 shadow-soft backdrop-blur-md"
          : "border-white/10 bg-stone-950/30 backdrop-blur-xl"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${localeRaw}`}
            className={cn(
              "flex items-center gap-2.5 text-xl font-display font-bold transition-colors",
              isScrolled ? "text-neutral-900 hover:text-primary-600" : "text-white hover:text-white/95"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                isScrolled
                  ? "bg-primary-50 text-primary-600 ring-1 ring-primary-100"
                  : "bg-white/15 text-amber-200 ring-1 ring-white/25"
              )}
            >
              <ButterflyIcon className="h-6 w-6" />
            </span>
            <span className="tracking-tight">Le Farfalle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled
                      ? isActive
                        ? "text-primary-600"
                        : "text-neutral-700 hover:text-primary-600"
                      : isActive
                        ? "text-amber-200"
                        : "text-white/85 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold md:flex",
                isScrolled
                  ? "bg-amber-50 text-stone-800 ring-1 ring-amber-200/80"
                  : "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
              )}
            >
              <Coffee className={cn("h-4 w-4", isScrolled ? "text-amber-600" : "text-amber-200")} aria-hidden />
              Colazione inclusa
            </div>
            <Link href={`/${localeRaw}/prenota`} className="shrink-0">
              <Button variant="primary" size="sm" className="px-4 py-2">
                Prenota
              </Button>
            </Link>
            <div className="hidden md:block">
              <LanguageSwitcher opaqueHeader={isScrolled} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                isScrolled ? "hover:bg-neutral-100" : "hover:bg-white/10"
              )}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className={cn("h-6 w-6", isScrolled ? "text-stone-900" : "text-white")} />
              ) : (
                <Menu className={cn("h-6 w-6", isScrolled ? "text-stone-900" : "text-white")} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Chiudi menu"
            />
            <motion.aside
              className="fixed right-0 top-0 z-[61] h-dvh w-[86vw] max-w-sm bg-white md:hidden shadow-hard"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-stone-200">
                <div className="font-display text-lg font-bold text-stone-900">Menu</div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl hover:bg-stone-100"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="px-5 py-6 space-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block text-base font-semibold transition-colors",
                        isActive ? "text-amber-600" : "text-stone-800 hover:text-amber-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-6 border-t border-stone-200">
                  <LanguageSwitcher opaqueHeader />
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

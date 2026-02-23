"use client";

import React from "react";
import ErrorBoundary from "@/src/components/ui/ErrorBoundary";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
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
      <Header />
      <main className="pt-20">{children}</main>
      <Footer locale={locale} />
    </ErrorBoundary>
  );
}

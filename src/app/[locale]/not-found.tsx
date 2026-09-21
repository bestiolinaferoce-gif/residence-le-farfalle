"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/src/components/ui/Container";
import { toLocale } from "@/src/lib/i18n";

const copy = {
  it: {
    title: "Pagina non trovata",
    text: "L'indirizzo potrebbe essere cambiato. Da qui puoi tornare alle camere o chiederci la disponibilità.",
    home: "Torna alla home",
    rooms: "Vedi le camere",
  },
  en: {
    title: "Page not found",
    text: "The address may have changed. You can go back to the rooms or ask us about availability.",
    home: "Back to home",
    rooms: "See the rooms",
  },
  de: {
    title: "Seite nicht gefunden",
    text: "Die Adresse hat sich möglicherweise geändert. Sehen Sie sich die Zimmer an oder fragen Sie die Verfügbarkeit an.",
    home: "Zur Startseite",
    rooms: "Zu den Zimmern",
  },
} as const;

export default function NotFound() {
  const locale = toLocale(usePathname()?.split("/")[1]);
  const c = copy[locale];
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-stone-900 md:text-4xl">{c.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-stone-700">{c.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/${locale}`} className="rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white hover:bg-stone-800">
          {c.home}
        </Link>
        <Link href={`/${locale}/camere`} className="rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-900 hover:bg-stone-50">
          {c.rooms}
        </Link>
      </div>
    </Container>
  );
}

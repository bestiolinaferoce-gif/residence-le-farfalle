"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarCheck, Loader2, Search } from "lucide-react";
import { GA_EVENTS } from "@/src/lib/analytics";
import { siteConfig } from "@/src/config/site";
import { rooms } from "@/src/data/rooms/rooms";
import { toLocale } from "@/src/lib/i18n";
import { addDaysIso, useTodayIso } from "@/src/lib/use-today";

const copy = {
  it: {
    arrival: "Arrivo",
    departure: "Partenza",
    check: "Verifica le date",
    from: "Da",
    invalidRange: "La partenza deve essere dopo l'arrivo.",
    missingDates: "Scegli le date di arrivo e partenza.",
    failed: "Verifica non riuscita. Riprova oppure scrivici.",
    degraded: "Non riusciamo a leggere il calendario in questo momento.",
    askDirect: "Chiedici la disponibilità",
    degradedTail: "e ti rispondiamo noi.",
    free: (n: number, nights: number) =>
      `Dal calendario risultano ${n === 1 ? "1 camera libera" : `${n} camere libere`} per ${nights} ${nights === 1 ? "notte" : "notti"}`,
    notConfirmed: "Non è ancora una prenotazione: la conferma arriva con la nostra risposta.",
    request: "Richiedi disponibilità per queste date",
    none: "Nessuna camera risulta libera per queste date.",
    noneTail: "Prova a spostarti di qualche giorno oppure",
    write: "scrivici",
    whatsappText: (a: string, b: string) => `Ciao! Vorrei sapere se avete disponibilità dal ${a} al ${b}.`,
  },
  en: {
    arrival: "Check-in",
    departure: "Check-out",
    check: "Check dates",
    from: "From",
    invalidRange: "Check-out must be after check-in.",
    missingDates: "Choose your check-in and check-out dates.",
    failed: "We couldn't check the calendar. Please try again or message us.",
    degraded: "We can't read the calendar right now.",
    askDirect: "Ask us about availability",
    degradedTail: "and we'll get back to you.",
    free: (n: number, nights: number) =>
      `The calendar shows ${n === 1 ? "1 room free" : `${n} rooms free`} for ${nights} ${nights === 1 ? "night" : "nights"}`,
    notConfirmed: "This is not a booking yet: it is confirmed only by our reply.",
    request: "Request availability for these dates",
    none: "No room shows as free for these dates.",
    noneTail: "Try moving a few days, or",
    write: "message us",
    whatsappText: (a: string, b: string) => `Hello! Do you have availability from ${a} to ${b}?`,
  },
  de: {
    arrival: "Anreise",
    departure: "Abreise",
    check: "Daten prüfen",
    from: "Ab",
    invalidRange: "Die Abreise muss nach der Anreise liegen.",
    missingDates: "Bitte wählen Sie An- und Abreisedatum.",
    failed: "Der Kalender konnte nicht geprüft werden. Bitte erneut versuchen oder uns schreiben.",
    degraded: "Der Kalender ist gerade nicht erreichbar.",
    askDirect: "Fragen Sie die Verfügbarkeit an",
    degradedTail: "– wir antworten Ihnen.",
    free: (n: number, nights: number) =>
      `Laut Kalender ${n === 1 ? "ist 1 Zimmer frei" : `sind ${n} Zimmer frei`} für ${nights} ${nights === 1 ? "Nacht" : "Nächte"}`,
    notConfirmed: "Das ist noch keine Buchung: verbindlich ist erst unsere Antwort.",
    request: "Verfügbarkeit für diese Daten anfragen",
    none: "Für diese Daten ist kein Zimmer frei.",
    noneTail: "Verschieben Sie die Reise um einige Tage oder",
    write: "schreiben Sie uns",
    whatsappText: (a: string, b: string) => `Hallo! Haben Sie vom ${a} bis ${b} ein Zimmer frei?`,
  },
} as const;

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "done"; available: string[]; nights: number; degraded: boolean };

type AvailabilityWidgetProps = {
  locale: string;
  className?: string;
};

/**
 * Verifica indicativa sul calendario iCal del gestionale (/api/availability).
 * Non crea prenotazioni né promette conferme: porta al modulo di richiesta
 * con le date già compilate.
 */
export default function AvailabilityWidget({ locale: rawLocale, className }: AvailabilityWidgetProps) {
  const locale = toLocale(rawLocale);
  const c = copy[locale];
  const today = useTodayIso();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) {
      setResult({ kind: "error", message: c.missingDates });
      return;
    }
    if (to <= from) {
      setResult({ kind: "error", message: c.invalidRange });
      return;
    }
    setResult({ kind: "loading" });
    GA_EVENTS.ctaClick("verifica_disponibilita");
    try {
      const res = await fetch(`/api/availability?from=${from}&to=${to}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setResult({ kind: "error", message: c.failed });
        return;
      }
      setResult({
        kind: "done",
        available: data.available as string[],
        nights: data.nights as number,
        degraded: Boolean(data.degraded),
      });
    } catch {
      setResult({ kind: "error", message: c.failed });
    }
  }

  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const requestHref = `/${locale}/prenota${params.size ? `?${params}` : ""}`;
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(c.whatsappText(from, to))}`;
  const roomName = (slug: string) => rooms.find((r) => r.slug === slug)?.name[locale] ?? slug;
  const inputClass =
    "w-full rounded-xl border border-stone-400 bg-white px-3 py-2.5 text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-200";

  return (
    <div className={`rounded-2xl bg-white p-4 shadow-2xl shadow-black/25 sm:p-5 ${className ?? ""}`}>
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
        <label className="flex-1 text-left">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-700">{c.arrival}</span>
          <input
            type="date"
            name="from"
            value={from}
            min={today || undefined}
            onChange={(e) => {
              setFrom(e.target.value);
              if (e.target.value && (!to || to <= e.target.value)) setTo(addDaysIso(e.target.value, 2));
            }}
            className={inputClass}
            required
          />
        </label>
        <label className="flex-1 text-left">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-700">{c.departure}</span>
          <input
            type="date"
            name="to"
            value={to}
            min={from || today || undefined}
            onChange={(e) => setTo(e.target.value)}
            className={inputClass}
            required
          />
        </label>
        <button
          type="submit"
          disabled={result.kind === "loading"}
          className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
        >
          {result.kind === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Search className="h-4 w-4" aria-hidden />
          )}
          {c.check}
        </button>
      </form>

      <p className="mt-3 text-left text-sm text-stone-700">
        {c.from} <strong className="text-stone-900">€{siteConfig.pricing.fromEur}</strong>{" "}
        {siteConfig.pricing.basis[locale]}
      </p>

      <div aria-live="polite" className="text-left">
        {result.kind === "error" && (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-800">{result.message}</p>
        )}

        {result.kind === "done" && result.degraded && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-950">
            {c.degraded}{" "}
            <Link href={requestHref} className="font-semibold underline">
              {c.askDirect}
            </Link>{" "}
            {c.degradedTail}
          </p>
        )}

        {result.kind === "done" && !result.degraded && result.available.length > 0 && (
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-950">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {c.free(result.available.length, result.nights)}
            </p>
            <p className="mt-1 text-sm text-emerald-900">{result.available.map(roomName).join(" · ")}</p>
            <p className="mt-1 text-xs text-emerald-900">{c.notConfirmed}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Link
                href={requestHref}
                onClick={() => GA_EVENTS.ctaClick("richiedi_date")}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-stone-950 transition hover:bg-amber-300"
              >
                {c.request}
              </Link>
              {whatsappDigits.length >= 10 && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => GA_EVENTS.clickWhatsapp("availability")}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-700 px-5 py-2.5 font-semibold text-emerald-800 transition hover:bg-emerald-100"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        )}

        {result.kind === "done" && !result.degraded && result.available.length === 0 && (
          <div className="mt-3 rounded-xl bg-stone-100 px-3 py-3 text-sm text-stone-800">
            <p className="font-semibold text-stone-900">{c.none}</p>
            <p className="mt-1">
              {c.noneTail}{" "}
              <Link href={requestHref} className="font-semibold underline">
                {c.write}
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

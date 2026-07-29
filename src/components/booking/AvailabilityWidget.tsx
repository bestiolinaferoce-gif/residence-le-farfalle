"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Loader2, Search } from "lucide-react";
import { GA_EVENTS } from "@/src/lib/analytics";
import { siteConfig } from "@/src/config/site";

type RoomSlug = "limone" | "macaone" | "vanessa" | "aurora";

const ROOM_LABELS: Record<RoomSlug, string> = {
  limone: "Limone",
  macaone: "Macaone",
  vanessa: "Vanessa",
  aurora: "Aurora",
};

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "done"; available: RoomSlug[]; nights: number; degraded: boolean };

const iso = (d: Date) => d.toISOString().slice(0, 10);

type AvailabilityWidgetProps = {
  locale: string;
  /** Prezzo minimo a notte, in euro. */
  fromPrice: number;
  className?: string;
};

export default function AvailabilityWidget({ locale, fromPrice, className }: AvailabilityWidgetProps) {
  const today = useMemo(() => new Date(), []);
  const [from, setFrom] = useState(() => iso(today));
  const [to, setTo] = useState(() => iso(new Date(today.getTime() + 2 * 86_400_000)));
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const whatsappDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (to <= from) {
      setResult({ kind: "error", message: "La partenza deve essere dopo l'arrivo." });
      return;
    }

    setResult({ kind: "loading" });
    GA_EVENTS.ctaClick("verifica_disponibilita");

    try {
      const res = await fetch(`/api/availability?from=${from}&to=${to}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setResult({ kind: "error", message: data.error ?? "Verifica non riuscita." });
        return;
      }
      setResult({
        kind: "done",
        available: data.available as RoomSlug[],
        nights: data.nights as number,
        degraded: Boolean(data.degraded),
      });
    } catch {
      setResult({ kind: "error", message: "Verifica non riuscita. Riprova o scrivici." });
    }
  }

  const requestHref = `/${locale}/prenota?from=${from}&to=${to}`;
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    `Ciao! Vorrei prenotare al Residence Le Farfalle dal ${from} al ${to}.`
  )}`;

  return (
    <div
      className={`rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-5 ${className ?? ""}`}
    >
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-left">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
            Arrivo
          </span>
          <input
            type="date"
            value={from}
            min={iso(today)}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </label>

        <label className="flex-1 text-left">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
            Partenza
          </span>
          <input
            type="date"
            value={to}
            min={from}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </label>

        <button
          type="submit"
          disabled={result.kind === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
        >
          {result.kind === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Search className="h-4 w-4" aria-hidden />
          )}
          Verifica
        </button>
      </form>

      <p className="mt-3 text-left text-sm text-stone-600">
        Camere da{" "}
        <strong className="text-stone-900">€ {fromPrice},00</strong> a notte, colazione inclusa.{" "}
        <span className="font-medium text-emerald-700">
          Prenotando qui niente commissioni di intermediazione.
        </span>
      </p>

      <div aria-live="polite" className="text-left">
        {result.kind === "error" && (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {result.message}
          </p>
        )}

        {result.kind === "done" && result.degraded && (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            Non riusciamo a leggere il calendario in questo momento.{" "}
            <Link href={requestHref} className="font-semibold underline">
              Richiedi conferma diretta
            </Link>{" "}
            e ti rispondiamo noi.
          </div>
        )}

        {result.kind === "done" && !result.degraded && result.available.length > 0 && (
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {result.available.length === 1
                ? "1 camera libera"
                : `${result.available.length} camere libere`}{" "}
              per {result.nights} {result.nights === 1 ? "notte" : "notti"}
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              {result.available.map((slug) => ROOM_LABELS[slug]).join(" · ")}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Link
                href={requestHref}
                onClick={() => GA_EVENTS.ctaClick("richiedi_prenotazione")}
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-stone-900 transition hover:bg-amber-300"
              >
                Richiedi queste date
              </Link>
              {whatsappDigits.length >= 10 && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => GA_EVENTS.clickWhatsapp()}
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-600 px-5 py-2.5 font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        )}

        {result.kind === "done" && !result.degraded && result.available.length === 0 && (
          <div className="mt-3 rounded-xl bg-stone-100 px-3 py-3 text-sm text-stone-700">
            <p className="font-semibold text-stone-900">Nessuna camera libera per queste date.</p>
            <p className="mt-1">
              Capita spesso in alta stagione: prova a spostarti di qualche giorno, oppure{" "}
              <Link href={requestHref} className="font-semibold underline">
                scrivici
              </Link>{" "}
              — a volte si liberano posti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

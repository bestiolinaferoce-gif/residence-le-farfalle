"use client";

import { useSyncExternalStore } from "react";

/**
 * Data odierna (YYYY-MM-DD, fuso del visitatore) senza mismatch di idratazione:
 * sul server e al primo render è "", poi il client la valorizza.
 * Le pagine sono statiche: calcolarla durante il render la congelerebbe al giorno della build.
 */
const noop = () => () => {};
const todayIso = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

export function useTodayIso(): string {
  return useSyncExternalStore(noop, todayIso, () => "");
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

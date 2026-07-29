/**
 * Disponibilità reale letta dal feed iCal del booking board.
 *
 * PRIVACY — il feed contiene i nomi degli ospiti nei campi SUMMARY e LOCATION.
 * Questo modulo gira solo lato server e restituisce esclusivamente periodi
 * occupati per camera: nessun nome, nessun importo, nessun dato personale
 * deve mai raggiungere il browser. Chi consuma queste funzioni non deve
 * inoltrare al client nulla oltre a `AvailabilityResult`.
 */
import "server-only";

export const ROOM_SLUGS = ["limone", "macaone", "vanessa", "aurora"] as const;
export type RoomSlug = (typeof ROOM_SLUGS)[number];

export const ROOM_LABELS: Record<RoomSlug, string> = {
  limone: "Limone",
  macaone: "Macaone",
  vanessa: "Vanessa",
  aurora: "Aurora",
};

type BusyPeriod = { room: RoomSlug; start: string; end: string };

export type AvailabilityResult = {
  from: string;
  to: string;
  nights: number;
  available: RoomSlug[];
  /** Feed non raggiungibile: mostriamo un fallback onesto, mai "tutto libero". */
  degraded: boolean;
};

function unfold(ics: string): string[] {
  const lines: string[] = [];
  for (const raw of ics.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")) {
    if ((raw.startsWith(" ") || raw.startsWith("\t")) && lines.length > 0) {
      lines[lines.length - 1] += raw.slice(1);
      continue;
    }
    lines.push(raw);
  }
  return lines;
}

function toIsoDate(raw: string): string | null {
  const digits = raw.replace(/[^0-9]/g, "").slice(0, 8);
  if (digits.length !== 8) return null;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

/** La camera compare in coda a SUMMARY e LOCATION, dopo un trattino lungo. */
function detectRoom(fields: Record<string, string>): RoomSlug | null {
  const haystack = `${fields.LOCATION ?? ""} ${fields.SUMMARY ?? ""}`.toLowerCase();
  return ROOM_SLUGS.find((slug) => haystack.includes(slug)) ?? null;
}

export function parseBusyPeriods(ics: string): BusyPeriod[] {
  const periods: BusyPeriod[] = [];
  let current: Record<string, string> | null = null;

  for (const line of unfold(ics)) {
    const upper = line.trim().toUpperCase();
    if (upper === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (upper === "END:VEVENT") {
      if (current) {
        const start = toIsoDate(current.DTSTART ?? "");
        const end = toIsoDate(current.DTEND ?? "");
        const room = detectRoom(current);
        const cancelled = (current.STATUS ?? "").toUpperCase().startsWith("CANCELLED");
        if (start && end && room && !cancelled) periods.push({ room, start, end });
      }
      current = null;
      continue;
    }
    if (!current) continue;
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).split(";")[0]?.trim().toUpperCase();
    if (key) current[key] = line.slice(idx + 1).trim();
  }

  return periods;
}

export function nightsBetween(from: string, to: string): number {
  const ms = Date.parse(to) - Date.parse(from);
  return Number.isFinite(ms) ? Math.round(ms / 86_400_000) : 0;
}

/** Il check-out libera la camera: le date si sovrappongono solo se start < otherEnd. */
function overlaps(a: { start: string; end: string }, from: string, to: string): boolean {
  return a.start < to && from < a.end;
}

async function fetchFeed(): Promise<string | null> {
  const url = process.env.BOOKING_BOARD_ICAL_URL?.trim();
  if (!url) return null;
  try {
    const res = await fetch(url, {
      // Una prenotazione entrata da poco deve comparire in fretta, ma senza
      // martellare il gestionale a ogni visita.
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function getAvailability(from: string, to: string): Promise<AvailabilityResult> {
  const nights = nightsBetween(from, to);
  const ics = await fetchFeed();

  if (!ics) {
    // Senza feed non sappiamo nulla: dichiararlo è meglio che promettere camere.
    return { from, to, nights, available: [], degraded: true };
  }

  const busy = parseBusyPeriods(ics);
  const occupied = new Set(
    busy.filter((period) => overlaps(period, from, to)).map((period) => period.room)
  );

  return {
    from,
    to,
    nights,
    available: ROOM_SLUGS.filter((slug) => !occupied.has(slug)),
    degraded: false,
  };
}

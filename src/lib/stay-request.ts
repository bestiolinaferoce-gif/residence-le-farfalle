/**
 * Validazione condivisa fra modulo (client) e /api/contact (server).
 * Restituisce codici di errore, non testi: ogni lato li traduce nella lingua giusta.
 */
import { siteConfig } from "@/src/config/site";

export const ROOM_SLUGS = ["limone", "macaone", "vanessa", "aurora"] as const;
export type RoomSlug = (typeof ROOM_SLUGS)[number];

export const MAX_GUESTS = siteConfig.stay.maxGuests; // 8
export const MAX_ROOMS = siteConfig.stay.rooms; // 4
export const GUESTS_PER_ROOM = siteConfig.stay.guestsPerRoom; // 2
export const MAX_NIGHTS = 60;

export type FormType = "contact" | "preventivo";
export type PreferredContact = "email" | "whatsapp" | "either";

export interface StayRequest {
  type: FormType;
  locale: "it" | "en" | "de";
  name: string;
  email: string;
  phone: string;
  message: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  room: RoomSlug | "";
  preferredContact: PreferredContact;
  privacyConsent: boolean;
}

export type FieldError =
  | "required"
  | "too_long"
  | "invalid_email"
  | "invalid_phone"
  | "invalid_date"
  | "past_date"
  | "checkout_before_checkin"
  | "too_many_nights"
  | "guests_range"
  | "rooms_range"
  | "rooms_too_few"
  | "rooms_more_than_guests"
  | "room_capacity"
  | "consent_required";

export type FieldErrors = Partial<Record<keyof StayRequest, FieldError>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const minRoomsFor = (guests: number) => Math.max(1, Math.ceil(guests / GUESTS_PER_ROOM));

export function nightsBetween(from: string, to: string): number {
  const ms = Date.parse(`${to}T12:00:00Z`) - Date.parse(`${from}T12:00:00Z`);
  return Number.isFinite(ms) ? Math.round(ms / 86_400_000) : 0;
}

function isRealDate(iso: string) {
  if (!ISO_DATE.test(iso)) return false;
  const d = new Date(`${iso}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

/** `today` in formato YYYY-MM-DD; sul server si usa la data UTC meno un giorno (tolleranza fusi orari). */
export function validateStayRequest(r: StayRequest, today: string): FieldErrors {
  const e: FieldErrors = {};
  const name = r.name.trim();
  if (!name) e.name = "required";
  else if (name.length > 120) e.name = "too_long";

  const email = r.email.trim();
  if (!email) e.email = "required";
  else if (email.length > 200 || !EMAIL_RE.test(email)) e.email = "invalid_email";

  const phone = r.phone.trim();
  if (phone && (phone.length > 30 || !/^[+()\d\s.-]{6,}$/.test(phone))) e.phone = "invalid_phone";

  if (r.message.length > 3000) e.message = "too_long";
  if (r.type === "contact" && !r.message.trim()) e.message = "required";

  if (r.type === "preventivo") {
    if (!r.checkIn) e.checkIn = "required";
    else if (!isRealDate(r.checkIn)) e.checkIn = "invalid_date";
    else if (r.checkIn < today) e.checkIn = "past_date";

    if (!r.checkOut) e.checkOut = "required";
    else if (!isRealDate(r.checkOut)) e.checkOut = "invalid_date";
    else if (!e.checkIn && r.checkOut <= r.checkIn) e.checkOut = "checkout_before_checkin";
    else if (!e.checkIn && nightsBetween(r.checkIn, r.checkOut) > MAX_NIGHTS) e.checkOut = "too_many_nights";

    if (!Number.isInteger(r.guests) || r.guests < 1 || r.guests > MAX_GUESTS) e.guests = "guests_range";
    if (!Number.isInteger(r.rooms) || r.rooms < 1 || r.rooms > MAX_ROOMS) e.rooms = "rooms_range";
    else if (!e.guests && r.rooms < minRoomsFor(r.guests)) e.rooms = "rooms_too_few";
    else if (!e.guests && r.rooms > r.guests) e.rooms = "rooms_more_than_guests";

    if (r.room && !(ROOM_SLUGS as readonly string[]).includes(r.room)) e.room = "required";
    else if (r.room && !e.rooms && r.rooms === 1 && r.guests > GUESTS_PER_ROOM) e.room = "room_capacity";
  }

  if (!r.privacyConsent) e.privacyConsent = "consent_required";
  return e;
}

/** Normalizza un payload sconosciuto (JSON dal client) in una StayRequest tipizzata. */
export function coerceStayRequest(body: unknown): StayRequest {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const int = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" && v ? Number(v) : NaN);
  const locale = str(b.locale);
  const pref = str(b.preferredContact);
  const room = str(b.room);
  return {
    type: b.type === "contact" ? "contact" : "preventivo",
    locale: locale === "en" || locale === "de" ? locale : "it",
    name: str(b.name),
    email: str(b.email),
    phone: str(b.phone),
    message: str(b.message),
    checkIn: str(b.checkIn),
    checkOut: str(b.checkOut),
    guests: int(b.guests),
    rooms: int(b.rooms),
    room: (ROOM_SLUGS as readonly string[]).includes(room) ? (room as RoomSlug) : "",
    preferredContact: pref === "email" || pref === "whatsapp" ? pref : "either",
    privacyConsent: b.privacyConsent === true,
  };
}

"use client";

import Link from "next/link";
import React, { useRef, useState, useSyncExternalStore } from "react";
import { CalendarRange, MessageSquare, Send, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { rooms } from "@/src/data/rooms/rooms";
import { siteConfig } from "@/src/config/site";
import { GA_EVENTS } from "@/src/lib/analytics";
import { toLocale, type Locale } from "@/src/lib/i18n";
import { addDaysIso, useTodayIso } from "@/src/lib/use-today";
import {
  GUESTS_PER_ROOM,
  MAX_GUESTS,
  MAX_ROOMS,
  ROOM_SLUGS,
  minRoomsFor,
  nightsBetween,
  validateStayRequest,
  type FieldError,
  type FieldErrors,
  type FormType,
  type PreferredContact,
  type RoomSlug,
  type StayRequest,
} from "@/src/lib/stay-request";
import Button from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

interface ContactFormProps {
  type?: FormType;
  locale?: string;
}

const labels = {
  it: {
    eyebrow: "Richiesta diretta alla struttura",
    titlePreventivo: "Richiedi disponibilità",
    titleContact: "Scrivici",
    subtitlePreventivo:
      "Indica date e ospiti: ti rispondiamo con disponibilità e prezzo esatto. Non è una prenotazione e non ti impegna.",
    subtitleContact: "Domande su camere, servizi o territorio: ti rispondiamo noi.",
    trust: "Rispondiamo in genere entro 24 ore via email o WhatsApp.",
    sectionYou: "I tuoi recapiti",
    sectionStay: "Il soggiorno",
    sectionPreference: "Come preferisci essere ricontattato?",
    prefEmail: "Email",
    prefWhatsapp: "WhatsApp",
    prefEither: "Indifferente",
    name: "Nome e cognome",
    email: "Email",
    phone: "Telefono",
    optionalHint: "facoltativo, utile per WhatsApp",
    checkIn: "Arrivo",
    checkOut: "Partenza",
    guests: "Ospiti",
    rooms: "Camere",
    room: "Camera preferita",
    roomAny: "Nessuna preferenza",
    capacityHint: (g: number, r: number) =>
      `Ogni camera ospita al massimo ${GUESTS_PER_ROOM} persone: per ${g} ${g === 1 ? "ospite" : "ospiti"} ${r === 1 ? "basta 1 camera" : `servono almeno ${r} camere`}. Capienza totale ${MAX_GUESTS} ospiti in ${MAX_ROOMS} camere.`,
    nights: (n: number) => `${n} ${n === 1 ? "notte" : "notti"}`,
    message: "Messaggio",
    messageOptional: "facoltativo",
    messagePlaceholderPreventivo: "Orario di arrivo, esigenze alimentari, culla, domande…",
    messagePlaceholderContact: "Come possiamo aiutarti?",
    consentBefore: "Ho letto l’",
    consentLink: "informativa privacy",
    consentAfter: " e acconsento al trattamento dei miei dati per ricevere una risposta a questa richiesta.",
    required: "obbligatorio",
    send: "Invia la richiesta",
    sending: "Invio in corso…",
    successTitle: "Richiesta ricevuta",
    successText:
      "Grazie! Il messaggio è arrivato alla struttura. Non è ancora una prenotazione: ti rispondiamo con disponibilità e prezzo usando il canale che hai indicato.",
    errorSummary: "Controlla i campi evidenziati:",
    errorGeneric: "Non siamo riusciti a inviare il modulo. Riprova tra poco oppure scrivici su WhatsApp.",
    errorRate: "Hai inviato diverse richieste in poco tempo. Riprova fra qualche minuto oppure scrivici su WhatsApp.",
    whatsapp: "Scrivici su WhatsApp",
    placeholderName: "Nome Cognome",
    placeholderEmail: "nome@esempio.it",
    honeypot: "Non compilare questo campo",
    errors: {
      required: "Campo obbligatorio.",
      too_long: "Testo troppo lungo.",
      invalid_email: "Inserisci un indirizzo email valido, es. nome@esempio.it.",
      invalid_phone: "Numero non valido: usa solo cifre, spazi e il prefisso +.",
      invalid_date: "Data non valida.",
      past_date: "La data di arrivo non può essere nel passato.",
      checkout_before_checkin: "La partenza deve essere successiva all’arrivo.",
      too_many_nights: "Per soggiorni oltre 60 notti scrivici direttamente.",
      guests_range: `Da 1 a ${MAX_GUESTS} ospiti.`,
      rooms_range: `Da 1 a ${MAX_ROOMS} camere.`,
      rooms_too_few: "Troppi ospiti per il numero di camere scelto (massimo 2 per camera).",
      rooms_more_than_guests: "Le camere non possono essere più degli ospiti.",
      room_capacity: "Una sola camera ospita al massimo 2 persone: aumenta le camere o togli la preferenza.",
      consent_required: "Serve il consenso per poterti rispondere.",
    } satisfies Record<FieldError, string>,
  },
  en: {
    eyebrow: "Direct request to the property",
    titlePreventivo: "Check availability",
    titleContact: "Message us",
    subtitlePreventivo:
      "Tell us your dates and guests: we'll reply with availability and the exact price. This is not a booking and there's no obligation.",
    subtitleContact: "Questions about rooms, services or the area? We'll get back to you.",
    trust: "We usually reply within 24 hours by email or WhatsApp.",
    sectionYou: "Your details",
    sectionStay: "Your stay",
    sectionPreference: "How would you like us to reply?",
    prefEmail: "Email",
    prefWhatsapp: "WhatsApp",
    prefEither: "Either",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    optionalHint: "optional, useful for WhatsApp",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    rooms: "Rooms",
    room: "Preferred room",
    roomAny: "No preference",
    capacityHint: (g: number, r: number) =>
      `Each room sleeps up to ${GUESTS_PER_ROOM}: ${g} ${g === 1 ? "guest needs" : "guests need"} at least ${r} ${r === 1 ? "room" : "rooms"}. Total capacity ${MAX_GUESTS} guests in ${MAX_ROOMS} rooms.`,
    nights: (n: number) => `${n} ${n === 1 ? "night" : "nights"}`,
    message: "Message",
    messageOptional: "optional",
    messagePlaceholderPreventivo: "Arrival time, dietary needs, cot, questions…",
    messagePlaceholderContact: "How can we help?",
    consentBefore: "I have read the ",
    consentLink: "privacy policy",
    consentAfter: " and agree to my data being processed to reply to this request.",
    required: "required",
    send: "Send request",
    sending: "Sending…",
    successTitle: "Request received",
    successText:
      "Thank you! Your message has reached the property. This is not a booking yet: we'll reply with availability and price through the channel you chose.",
    errorSummary: "Please check the highlighted fields:",
    errorGeneric: "We couldn't send the form. Please try again shortly or message us on WhatsApp.",
    errorRate: "You've sent several requests in a short time. Please try again in a few minutes or message us on WhatsApp.",
    whatsapp: "Message us on WhatsApp",
    placeholderName: "First and last name",
    placeholderEmail: "name@example.com",
    honeypot: "Do not fill in this field",
    errors: {
      required: "This field is required.",
      too_long: "Text is too long.",
      invalid_email: "Enter a valid email address, e.g. name@example.com.",
      invalid_phone: "Invalid number: use digits, spaces and the + prefix only.",
      invalid_date: "Invalid date.",
      past_date: "Check-in can't be in the past.",
      checkout_before_checkin: "Check-out must be after check-in.",
      too_many_nights: "For stays over 60 nights, please contact us directly.",
      guests_range: `From 1 to ${MAX_GUESTS} guests.`,
      rooms_range: `From 1 to ${MAX_ROOMS} rooms.`,
      rooms_too_few: "Too many guests for the rooms selected (max 2 per room).",
      rooms_more_than_guests: "You can't have more rooms than guests.",
      room_capacity: "A single room sleeps up to 2: add rooms or remove the room preference.",
      consent_required: "We need your consent to reply to you.",
    } satisfies Record<FieldError, string>,
  },
  de: {
    eyebrow: "Direkte Anfrage an die Unterkunft",
    titlePreventivo: "Verfügbarkeit anfragen",
    titleContact: "Schreiben Sie uns",
    subtitlePreventivo:
      "Nennen Sie Reisedaten und Gästezahl: Wir antworten mit Verfügbarkeit und genauem Preis. Das ist keine Buchung und unverbindlich.",
    subtitleContact: "Fragen zu Zimmern, Leistungen oder der Region? Wir melden uns.",
    trust: "Wir antworten in der Regel innerhalb von 24 Stunden per E-Mail oder WhatsApp.",
    sectionYou: "Ihre Kontaktdaten",
    sectionStay: "Ihr Aufenthalt",
    sectionPreference: "Wie sollen wir antworten?",
    prefEmail: "E-Mail",
    prefWhatsapp: "WhatsApp",
    prefEither: "Egal",
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon",
    optionalHint: "optional, hilfreich für WhatsApp",
    checkIn: "Anreise",
    checkOut: "Abreise",
    guests: "Gäste",
    rooms: "Zimmer",
    room: "Wunschzimmer",
    roomAny: "Keine Präferenz",
    capacityHint: (g: number, r: number) =>
      `Jedes Zimmer bietet Platz für höchstens ${GUESTS_PER_ROOM} Personen: Für ${g} ${g === 1 ? "Gast" : "Gäste"} ${r === 1 ? "genügt 1 Zimmer" : `sind mindestens ${r} Zimmer nötig`}. Insgesamt ${MAX_GUESTS} Gäste in ${MAX_ROOMS} Zimmern.`,
    nights: (n: number) => `${n} ${n === 1 ? "Nacht" : "Nächte"}`,
    message: "Nachricht",
    messageOptional: "optional",
    messagePlaceholderPreventivo: "Ankunftszeit, Ernährung, Babybett, Fragen…",
    messagePlaceholderContact: "Wie können wir helfen?",
    consentBefore: "Ich habe die ",
    consentLink: "Datenschutzerklärung",
    consentAfter: " gelesen und willige ein, dass meine Daten zur Beantwortung dieser Anfrage verarbeitet werden.",
    required: "Pflichtfeld",
    send: "Anfrage senden",
    sending: "Wird gesendet…",
    successTitle: "Anfrage erhalten",
    successText:
      "Vielen Dank! Ihre Nachricht ist bei uns eingegangen. Das ist noch keine Buchung: Wir antworten mit Verfügbarkeit und Preis über den gewählten Kanal.",
    errorSummary: "Bitte prüfen Sie die markierten Felder:",
    errorGeneric:
      "Das Formular konnte nicht gesendet werden. Bitte versuchen Sie es gleich noch einmal oder schreiben Sie uns auf WhatsApp.",
    errorRate:
      "Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten erneut oder schreiben Sie uns auf WhatsApp.",
    whatsapp: "Auf WhatsApp schreiben",
    placeholderName: "Vorname Nachname",
    placeholderEmail: "name@beispiel.de",
    honeypot: "Dieses Feld nicht ausfüllen",
    errors: {
      required: "Pflichtfeld.",
      too_long: "Der Text ist zu lang.",
      invalid_email: "Bitte eine gültige E-Mail-Adresse eingeben, z. B. name@beispiel.de.",
      invalid_phone: "Ungültige Nummer: nur Ziffern, Leerzeichen und die Vorwahl mit +.",
      invalid_date: "Ungültiges Datum.",
      past_date: "Die Anreise darf nicht in der Vergangenheit liegen.",
      checkout_before_checkin: "Die Abreise muss nach der Anreise liegen.",
      too_many_nights: "Für Aufenthalte über 60 Nächte schreiben Sie uns bitte direkt.",
      guests_range: `1 bis ${MAX_GUESTS} Gäste.`,
      rooms_range: `1 bis ${MAX_ROOMS} Zimmer.`,
      rooms_too_few: "Zu viele Gäste für die gewählte Zimmerzahl (max. 2 pro Zimmer).",
      rooms_more_than_guests: "Es können nicht mehr Zimmer als Gäste sein.",
      room_capacity: "Ein Zimmer bietet Platz für höchstens 2 Personen: mehr Zimmer wählen oder Wunschzimmer entfernen.",
      consent_required: "Wir benötigen Ihre Einwilligung, um Ihnen zu antworten.",
    } satisfies Record<FieldError, string>,
  },
} as const;

type Status = "idle" | "loading" | "success" | "error" | "rate";

/** Parametri dell'URL letti dopo l'idratazione: le pagine sono statiche. */
const noopSubscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

interface Prefill {
  checkIn: string;
  checkOut: string;
  guests: number;
  room: RoomSlug | "";
}

function parsePrefill(search: string): Prefill {
  const p = new URLSearchParams(search);
  const iso = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");
  const room = p.get("camera") ?? "";
  const guests = Number(p.get("ospiti") ?? p.get("guests") ?? "");
  return {
    checkIn: iso(p.get("from") ?? p.get("checkin")),
    checkOut: iso(p.get("to") ?? p.get("checkout")),
    guests: Number.isInteger(guests) && guests >= 1 && guests <= MAX_GUESTS ? guests : 2,
    room: (ROOM_SLUGS as readonly string[]).includes(room) ? (room as RoomSlug) : "",
  };
}

type FormState = {
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
  website: string;
};

export default function ContactForm(props: ContactFormProps) {
  const search = useSyncExternalStore(noopSubscribe, getSearch, getServerSearch);
  // La chiave rimonta il modulo quando i parametri dell'URL diventano disponibili nel browser.
  return <ContactFormInner key={search} {...props} prefill={parsePrefill(search)} />;
}

function ContactFormInner({ type = "contact", locale: rawLocale, prefill }: ContactFormProps & { prefill: Prefill }) {
  const locale: Locale = toLocale(rawLocale);
  const t = labels[locale];
  const isPreventivo = type === "preventivo";
  const today = useTodayIso();
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    checkIn: prefill.checkIn,
    checkOut: prefill.checkOut,
    guests: prefill.guests,
    rooms: minRoomsFor(prefill.guests),
    room: prefill.room,
    preferredContact: "either",
    privacyConsent: false,
    website: "",
  });

  const toRequest = (f: FormState): StayRequest => ({
    type,
    locale,
    name: f.name,
    email: f.email,
    phone: f.phone,
    message: f.message,
    checkIn: f.checkIn,
    checkOut: f.checkOut,
    guests: f.guests,
    rooms: f.rooms,
    room: f.room,
    preferredContact: f.preferredContact,
    privacyConsent: f.privacyConsent,
  });
  const validate = (f: FormState) => validateStayRequest(toRequest(f), today || "0000-00-00");

  const markStarted = () => {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      GA_EVENTS.formStart(type);
    }
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    markStarted();
    const next: FormState = { ...form, [key]: value };
    // Coerenza ospiti/camere: con più ospiti le camere salgono al minimo necessario.
    if (key === "guests") {
      next.rooms = Math.min(Math.max(form.rooms, minRoomsFor(next.guests)), next.guests, MAX_ROOMS);
    }
    if (key === "checkIn" && next.checkIn && (!form.checkOut || form.checkOut <= next.checkIn)) {
      next.checkOut = addDaysIso(next.checkIn, 2);
    }
    setForm(next);
    if (submitted) setErrors(validate(next));
  };

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusSummary();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toRequest(form), website: form.website, startedAt: startedAt.current || Date.now() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (res.ok && data.ok) {
        if (isPreventivo) GA_EVENTS.formSubmitPreventivo();
        else GA_EVENTS.formSubmitContact();
        setStatus("success");
        return;
      }
      GA_EVENTS.formSubmitError(type, data.error ?? String(res.status));
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
        focusSummary();
        return;
      }
      setStatus(res.status === 429 ? "rate" : "error");
    } catch {
      GA_EVENTS.formSubmitError(type, "network");
      setStatus("error");
    }
  };

  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const waText =
    isPreventivo && form.checkIn && form.checkOut
      ? `${form.checkIn} → ${form.checkOut}, ${form.guests} ${t.guests.toLowerCase()}`
      : "";
  const whatsappHref = `https://wa.me/${waDigits}${waText ? `?text=${encodeURIComponent(waText)}` : ""}`;

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-lg shadow-emerald-900/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <Sparkles className="h-7 w-7" aria-hidden />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-emerald-950">{t.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-emerald-950">{t.successText}</p>
      </div>
    );
  }

  const fieldIds: Partial<Record<keyof StayRequest, string>> = {
    name: "cf-name",
    email: "cf-email",
    phone: "cf-phone",
    checkIn: "cf-checkin",
    checkOut: "cf-checkout",
    guests: "cf-guests",
    rooms: "cf-rooms",
    room: "cf-room",
    message: "cf-message",
    privacyConsent: "cf-privacy",
  };
  const fieldLabels: Partial<Record<keyof StayRequest, string>> = {
    name: t.name,
    email: t.email,
    phone: t.phone,
    checkIn: t.checkIn,
    checkOut: t.checkOut,
    guests: t.guests,
    rooms: t.rooms,
    room: t.room,
    message: t.message,
    privacyConsent: t.consentLink,
  };
  // Riepilogo nello stesso ordine in cui i campi compaiono a schermo.
  const fieldOrder = Object.keys(fieldIds) as (keyof StayRequest)[];
  const visualOrder = isPreventivo
    ? [...fieldOrder.filter((k) => ["checkIn", "checkOut", "guests", "rooms", "room"].includes(k)), ...fieldOrder.filter((k) => !["checkIn", "checkOut", "guests", "rooms", "room"].includes(k))]
    : fieldOrder;
  const errorEntries = visualOrder.filter((k) => errors[k]).map((k) => [k, errors[k]!] as [keyof StayRequest, FieldError]);
  const err = (k: keyof StayRequest) => errors[k];
  const describedBy = (k: keyof StayRequest, extra?: string) =>
    [err(k) ? `${fieldIds[k]}-error` : "", extra ?? ""].filter(Boolean).join(" ") || undefined;
  const errorText = (k: keyof StayRequest) => {
    const code = err(k);
    return code ? (
      <p id={`${fieldIds[k]}-error`} className="mt-1.5 text-sm font-medium text-red-700">
        {t.errors[code]}
      </p>
    ) : null;
  };
  const shell = (k: keyof StayRequest) =>
    cn(
      "rounded-2xl border bg-white px-4 py-3 text-stone-900 shadow-sm transition focus-within:ring-2",
      err(k)
        ? "border-red-600 focus-within:ring-red-200"
        : "border-stone-300 focus-within:border-amber-600 focus-within:ring-amber-200"
    );
  const inputClass = "mt-1 w-full bg-transparent text-base text-stone-900 outline-none placeholder:text-stone-500";
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-stone-700";
  const nights =
    form.checkIn && form.checkOut && form.checkOut > form.checkIn ? nightsBetween(form.checkIn, form.checkOut) : 0;
  const req = (
    <>
      <span aria-hidden className="text-red-700">
        {" "}
        *
      </span>
      <span className="sr-only"> ({t.required})</span>
    </>
  );

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={markStarted}
      noValidate
      className="relative space-y-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 md:p-9"
    >
      <header className="space-y-2 border-b border-stone-200 pb-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-700">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          {t.eyebrow}
        </p>
        <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
          {isPreventivo ? t.titlePreventivo : t.titleContact}
        </h2>
        <p className="text-base leading-relaxed text-stone-700">
          {isPreventivo ? t.subtitlePreventivo : t.subtitleContact}
        </p>
        <p className="text-sm text-stone-700">{t.trust}</p>
      </header>

      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 outline-none"
        >
          <p className="font-semibold">{t.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorEntries.map(([k, code]) => (
              <li key={k}>
                <a href={`#${fieldIds[k]}`} className="underline">
                  {fieldLabels[k]}
                </a>
                : {t.errors[code]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Campo esca per i bot: fuori schermo e nascosto alle tecnologie assistive. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">{t.honeypot}</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
        />
      </div>

      {isPreventivo ? (
        <fieldset className="space-y-4">
          <legend className={cn(labelClass, "mb-3 flex items-center gap-2")}>
            <CalendarRange className="h-4 w-4" aria-hidden />
            {t.sectionStay}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className={shell("checkIn")}>
                <label htmlFor="cf-checkin" className={labelClass}>
                  {t.checkIn}
                  {req}
                </label>
                <input
                  id="cf-checkin"
                  name="checkIn"
                  type="date"
                  required
                  min={today || undefined}
                  value={form.checkIn}
                  onChange={(e) => update("checkIn", e.target.value)}
                  aria-invalid={!!err("checkIn")}
                  aria-describedby={describedBy("checkIn")}
                  className={cn(inputClass, "min-h-10")}
                />
              </div>
              {errorText("checkIn")}
            </div>
            <div>
              <div className={shell("checkOut")}>
                <label htmlFor="cf-checkout" className={labelClass}>
                  {t.checkOut}
                  {req}
                </label>
                <input
                  id="cf-checkout"
                  name="checkOut"
                  type="date"
                  required
                  min={form.checkIn || today || undefined}
                  value={form.checkOut}
                  onChange={(e) => update("checkOut", e.target.value)}
                  aria-invalid={!!err("checkOut")}
                  aria-describedby={describedBy("checkOut", nights ? "cf-nights" : undefined)}
                  className={cn(inputClass, "min-h-10")}
                />
              </div>
              {errorText("checkOut")}
              {nights ? (
                <p id="cf-nights" className="mt-1.5 text-sm text-stone-700">
                  {t.nights(nights)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className={shell("guests")}>
                <label htmlFor="cf-guests" className={labelClass}>
                  {t.guests}
                  {req}
                </label>
                <select
                  id="cf-guests"
                  name="guests"
                  value={form.guests}
                  onChange={(e) => update("guests", Number(e.target.value))}
                  aria-invalid={!!err("guests")}
                  aria-describedby={describedBy("guests", "cf-capacity")}
                  className={cn(inputClass, "min-h-10")}
                >
                  {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              {errorText("guests")}
            </div>
            <div>
              <div className={shell("rooms")}>
                <label htmlFor="cf-rooms" className={labelClass}>
                  {t.rooms}
                  {req}
                </label>
                <select
                  id="cf-rooms"
                  name="rooms"
                  value={form.rooms}
                  onChange={(e) => update("rooms", Number(e.target.value))}
                  aria-invalid={!!err("rooms")}
                  aria-describedby={describedBy("rooms", "cf-capacity")}
                  className={cn(inputClass, "min-h-10")}
                >
                  {Array.from({ length: MAX_ROOMS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} disabled={n < minRoomsFor(form.guests) || n > form.guests}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              {errorText("rooms")}
            </div>
            <div>
              <div className={shell("room")}>
                <label htmlFor="cf-room" className={labelClass}>
                  {t.room}
                </label>
                <select
                  id="cf-room"
                  name="room"
                  value={form.room}
                  onChange={(e) => update("room", e.target.value as RoomSlug | "")}
                  aria-invalid={!!err("room")}
                  aria-describedby={describedBy("room")}
                  className={cn(inputClass, "min-h-10")}
                >
                  <option value="">{t.roomAny}</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.slug}>
                      {r.name[locale]} ({r.size} m²)
                    </option>
                  ))}
                </select>
              </div>
              {errorText("room")}
            </div>
          </div>
          <p id="cf-capacity" className="text-sm text-stone-700">
            {t.capacityHint(form.guests, minRoomsFor(form.guests))}
          </p>
        </fieldset>
      ) : null}

      <fieldset className="space-y-4">
        <legend className={cn(labelClass, "mb-3 flex items-center gap-2")}>
          <MessageSquare className="h-4 w-4" aria-hidden />
          {t.sectionYou}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className={shell("name")}>
              <label htmlFor="cf-name" className={labelClass}>
                {t.name}
                {req}
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!err("name")}
                aria-describedby={describedBy("name")}
                className={inputClass}
                placeholder={t.placeholderName}
              />
            </div>
            {errorText("name")}
          </div>
          <div>
            <div className={shell("email")}>
              <label htmlFor="cf-email" className={labelClass}>
                {t.email}
                {req}
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!err("email")}
                aria-describedby={describedBy("email")}
                className={inputClass}
                placeholder={t.placeholderEmail}
              />
            </div>
            {errorText("email")}
          </div>
        </div>
        <div>
          <div className={shell("phone")}>
            <label htmlFor="cf-phone" className={labelClass}>
              {t.phone} <span className="font-normal normal-case text-stone-700">({t.optionalHint})</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              maxLength={30}
              autoComplete="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!err("phone")}
              aria-describedby={describedBy("phone")}
              className={inputClass}
              placeholder="+39 …"
            />
          </div>
          {errorText("phone")}
        </div>
      </fieldset>

      <fieldset>
        <legend className={cn(labelClass, "mb-3")}>{t.sectionPreference}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(
            [
              ["email", t.prefEmail],
              ["whatsapp", t.prefWhatsapp],
              ["either", t.prefEither],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                form.preferredContact === value
                  ? "border-amber-500 bg-amber-50 text-stone-900"
                  : "border-stone-300 bg-white text-stone-800 hover:border-stone-400"
              )}
            >
              <input
                type="radio"
                name="preferredContact"
                value={value}
                checked={form.preferredContact === value}
                onChange={() => update("preferredContact", value)}
                className="h-4 w-4 accent-amber-600"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <div className={shell("message")}>
          <label htmlFor="cf-message" className={labelClass}>
            {t.message}
            {isPreventivo ? (
              <span className="font-normal normal-case text-stone-700"> ({t.messageOptional})</span>
            ) : (
              req
            )}
          </label>
          <textarea
            id="cf-message"
            name="message"
            required={!isPreventivo}
            maxLength={3000}
            rows={isPreventivo ? 4 : 6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!err("message")}
            aria-describedby={describedBy("message")}
            className={cn(inputClass, "mt-2 min-h-[110px] resize-y")}
            placeholder={isPreventivo ? t.messagePlaceholderPreventivo : t.messagePlaceholderContact}
          />
        </div>
        {errorText("message")}
      </div>

      <div>
        <div className="flex items-start gap-3 text-left text-sm text-stone-800">
          <input
            id="cf-privacy"
            type="checkbox"
            checked={form.privacyConsent}
            onChange={(e) => update("privacyConsent", e.target.checked)}
            aria-invalid={!!err("privacyConsent")}
            aria-describedby={describedBy("privacyConsent")}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-stone-500 accent-amber-600"
          />
          <label htmlFor="cf-privacy">
            {t.consentBefore}
            <Link href={`/${locale}/privacy`} className="font-semibold underline underline-offset-2">
              {t.consentLink}
            </Link>
            {t.consentAfter}
            {req}
          </label>
        </div>
        {errorText("privacyConsent")}
      </div>

      {status === "error" || status === "rate" ? (
        <div role="alert" className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
          <p className="font-medium">{status === "rate" ? t.errorRate : t.errorGeneric}</p>
          {waDigits.length >= 10 ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => GA_EVENTS.clickWhatsapp("form_error")}
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t.whatsapp}
            </a>
          ) : null}
        </div>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="xl"
        fullWidth
        loading={status === "loading"}
        icon={<Send className="h-5 w-5" aria-hidden />}
        className="!py-4 text-base"
      >
        {status === "loading" ? t.sending : t.send}
      </Button>
    </form>
  );
}

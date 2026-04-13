"use client";

import React, { useState } from "react";
import { CalendarRange, Clock, MessageSquare, Send, ShieldCheck, Sparkles } from "lucide-react";
import { rooms } from "@/src/data/rooms/rooms";
import { GA_EVENTS } from "@/src/lib/analytics";
import Button from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

type FormType = "contact" | "preventivo";
type PreferredContact = "email" | "whatsapp" | "either";

interface ContactFormProps {
  type?: FormType;
  locale?: string;
}

const labels = {
  it: {
    eyebrow: "Assistenza diretta",
    titlePreventivo: "La tua richiesta di soggiorno",
    titleContact: "Scrivici",
    subtitlePreventivo:
      "Date, ospiti e una nota libera: prepariamo un preventivo chiaro, senza impegno.",
    subtitleContact: "Domande, disponibilità o dettagli sul territorio: siamo qui per aiutarti.",
    trust:
      "Risposta in genere entro 24 ore. I dati sono trattati secondo la nostra informativa privacy.",
    sectionYou: "I tuoi recapiti",
    sectionStay: "Soggiorno",
    sectionMessage: "Messaggio",
    sectionPreference: "Come preferisci essere ricontattato?",
    prefEmail: "Email",
    prefWhatsapp: "WhatsApp",
    prefEither: "Indifferente",
    name: "Nome e cognome",
    email: "Email",
    phone: "Telefono",
    optionalHint: "facoltativo ma utile per conferme rapide",
    checkIn: "Arrivo",
    checkOut: "Partenza",
    guests: "Ospiti",
    room: "Camera preferita",
    roomAny: "Nessuna preferenza",
    message: "Note e richieste",
    messagePlaceholderPreventivo:
      "Es. orario di arrivo, esigenze particolari, bicicletta, esigenze alimentari…",
    messagePlaceholderContact: "Come possiamo aiutarti?",
    send: "Invia la richiesta",
    sending: "Invio in corso…",
    successTitle: "Richiesta inviata",
    successText:
      "Grazie! Abbiamo ricevuto il messaggio e ti risponderemo al più presto usando il canale che hai indicato.",
    errorText:
      "Non siamo riusciti a inviare il modulo. Riprova tra un attimo o scrivici su WhatsApp.",
    retry: "Riprova",
    invalidDates: "La data di partenza deve essere successiva all’arrivo.",
  },
  en: {
    eyebrow: "We’re here to help",
    titlePreventivo: "Your stay request",
    titleContact: "Message us",
    subtitlePreventivo:
      "Share your dates, guests, and a short note—we’ll send a clear, no-obligation quote.",
    subtitleContact: "Questions about availability or the area—we’re happy to help.",
    trust:
      "We usually reply within 24 hours. Your details are processed per our privacy policy.",
    sectionYou: "Your details",
    sectionStay: "Stay",
    sectionMessage: "Message",
    sectionPreference: "Preferred reply channel",
    prefEmail: "Email",
    prefWhatsapp: "WhatsApp",
    prefEither: "No preference",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    optionalHint: "optional, useful for quick confirmations",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    room: "Room preference",
    roomAny: "No preference",
    message: "Notes & requests",
    messagePlaceholderPreventivo:
      "E.g. arrival time, dietary needs, luggage storage, bike rental…",
    messagePlaceholderContact: "How can we help?",
    send: "Send request",
    sending: "Sending…",
    successTitle: "Request sent",
    successText:
      "Thank you! We’ve received your message and will get back to you shortly via your preferred channel.",
    errorText: "We couldn’t send the form. Please try again or contact us on WhatsApp.",
    retry: "Try again",
    invalidDates: "Check-out must be after check-in.",
  },
  de: {
    eyebrow: "Persönliche Betreuung",
    titlePreventivo: "Ihre Aufenthaltsanfrage",
    titleContact: "Schreiben Sie uns",
    subtitlePreventivo:
      "Teilen Sie Daten, Gästeanzahl und eine kurze Notiz—wir senden ein klares, unverbindliches Angebot.",
    subtitleContact: "Fragen zu Verfügbarkeit oder der Region—gerne helfen wir.",
    trust:
      "In der Regel antworten wir innerhalb von 24 Stunden. Daten werden gemäß Datenschutzhinweis verarbeitet.",
    sectionYou: "Ihre Kontaktdaten",
    sectionStay: "Aufenthalt",
    sectionMessage: "Nachricht",
    sectionPreference: "Bevorzugter Kontakt",
    prefEmail: "E-Mail",
    prefWhatsapp: "WhatsApp",
    prefEither: "Keine Präferenz",
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon",
    optionalHint: "optional, hilfreich für schnelle Rückmeldungen",
    checkIn: "Anreise",
    checkOut: "Abreise",
    guests: "Gäste",
    room: "Zimmerwunsch",
    roomAny: "Keine Präferenz",
    message: "Notizen & Wünsche",
    messagePlaceholderPreventivo:
      "z. B. Ankunftszeit, Ernährung, Gepäck, Fahrrad…",
    messagePlaceholderContact: "Womit können wir helfen?",
    send: "Anfrage senden",
    sending: "Wird gesendet…",
    successTitle: "Anfrage gesendet",
    successText:
      "Vielen Dank! Wir haben Ihre Nachricht erhalten und melden uns bald über Ihren bevorzugten Kanal.",
    errorText:
      "Senden fehlgeschlagen. Bitte erneut versuchen oder uns per WhatsApp schreiben.",
    retry: "Erneut versuchen",
    invalidDates: "Abreise muss nach der Anreise liegen.",
  },
};

const fieldShell =
  "rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-stone-900 shadow-sm transition focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30";

const inputClass = cn(
      "w-full bg-transparent outline-none placeholder:text-stone-400 text-base",
);

const labelClass = "text-xs font-semibold uppercase tracking-wide text-stone-500";

export default function ContactForm({
  type = "contact",
  locale = "it",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [dateError, setDateError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "",
    preferredContact: "either" as PreferredContact,
  });

  const t = labels[locale as keyof typeof labels] ?? labels.it;
  const isPreventivo = type === "preventivo";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "checkIn" || e.target.name === "checkOut") setDateError(false);
  };

  const setPref = (value: PreferredContact) => {
    setForm((prev) => ({ ...prev, preferredContact: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreventivo && form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
      setDateError(true);
      return;
    }
    setDateError(false);
    setStatus("loading");
    try {
      const preferredLabel =
        form.preferredContact === "email"
          ? t.prefEmail
          : form.preferredContact === "whatsapp"
            ? t.prefWhatsapp
            : t.prefEither;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: isPreventivo ? "preventivo" : "contact",
          preferredContact: preferredLabel,
        }),
      });
      if (!res.ok) throw new Error("server_error");
      if (isPreventivo) GA_EVENTS.formSubmitPreventivo();
      else GA_EVENTS.formSubmitContact();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 p-8 text-center shadow-lg shadow-emerald-900/5">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Sparkles className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="relative mt-5 font-display text-2xl font-bold text-emerald-950">
          {t.successTitle}
        </h3>
        <p className="relative mx-auto mt-3 max-w-md text-emerald-900/85">{t.successText}</p>
      </div>
    );
  }

  const prefOptions: { value: PreferredContact; label: string }[] = [
    { value: "email", label: t.prefEmail },
    { value: "whatsapp", label: t.prefWhatsapp },
    { value: "either", label: t.prefEither },
  ];

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-100/40 via-white to-fuchsia-100/30 blur-2xl"
        aria-hidden
      />
      <form
        onSubmit={handleSubmit}
        className={cn(
          "glass-card space-y-8 rounded-3xl p-6 shadow-xl shadow-stone-900/5 md:p-9"
        )}
      >
        <header className="space-y-2 border-b border-stone-200/80 pb-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary-600">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
            {isPreventivo ? t.titlePreventivo : t.titleContact}
          </h2>
          <p className="text-base leading-relaxed text-stone-600">
            {isPreventivo ? t.subtitlePreventivo : t.subtitleContact}
          </p>
          <p className="flex flex-wrap items-start gap-2 rounded-2xl border border-amber-200/60 bg-amber-50/80 px-4 py-3 text-sm text-amber-950/90">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            {t.trust}
          </p>
        </header>

        <fieldset className="space-y-4">
          <legend className={cn(labelClass, "mb-3 flex items-center gap-2")}>
            <MessageSquare className="h-4 w-4 text-stone-400" aria-hidden />
            {t.sectionYou}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={fieldShell}>
              <label htmlFor="cf-name" className={labelClass}>
                {t.name} <span className="text-amber-700">*</span>
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={cn(inputClass, "mt-1")}
                placeholder="Mario Rossi"
              />
            </div>
            <div className={fieldShell}>
              <label htmlFor="cf-email" className={labelClass}>
                {t.email} <span className="text-amber-700">*</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={cn(inputClass, "mt-1")}
                placeholder="nome@email.it"
              />
            </div>
          </div>
          <div className={fieldShell}>
            <label htmlFor="cf-phone" className={labelClass}>
              {t.phone}{" "}
              <span className="font-normal normal-case text-stone-400">({t.optionalHint})</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              className={cn(inputClass, "mt-1")}
              placeholder="+39 …"
            />
          </div>
        </fieldset>

        {isPreventivo && (
          <fieldset className="space-y-4">
            <legend className={cn(labelClass, "mb-3 flex items-center gap-2")}>
              <CalendarRange className="h-4 w-4 text-stone-400" aria-hidden />
              {t.sectionStay}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={fieldShell}>
                <label htmlFor="cf-checkin" className={labelClass}>
                  {t.checkIn} <span className="text-amber-700">*</span>
                </label>
                <input
                  id="cf-checkin"
                  name="checkIn"
                  type="date"
                  required
                  value={form.checkIn}
                  onChange={handleChange}
                  className={cn(inputClass, "mt-1 min-h-[2.5rem]")}
                />
              </div>
              <div className={fieldShell}>
                <label htmlFor="cf-checkout" className={labelClass}>
                  {t.checkOut} <span className="text-amber-700">*</span>
                </label>
                <input
                  id="cf-checkout"
                  name="checkOut"
                  type="date"
                  required
                  value={form.checkOut}
                  onChange={handleChange}
                  className={cn(inputClass, "mt-1 min-h-[2.5rem]")}
                />
              </div>
            </div>
            {dateError && (
              <p className="text-sm font-medium text-red-600" role="alert">
                {t.invalidDates}
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={fieldShell}>
                <label htmlFor="cf-guests" className={labelClass}>
                  {t.guests}
                </label>
                <select
                  id="cf-guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={cn(inputClass, "mt-1 min-h-[2.5rem]")}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className={fieldShell}>
                <label htmlFor="cf-rooms" className={labelClass}>
                  {t.room}
                </label>
                <select
                  id="cf-rooms"
                  name="rooms"
                  value={form.rooms}
                  onChange={handleChange}
                  className={cn(inputClass, "mt-1 min-h-[2.5rem]")}
                >
                  <option value="">{t.roomAny}</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.slug}>
                      {r.name[locale as keyof typeof r.name] ?? r.name.it}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className={cn(labelClass, "mb-3")}>{t.sectionPreference}</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {prefOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPref(opt.value)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all",
                  form.preferredContact === opt.value
                    ? "border-amber-400 bg-amber-50 text-stone-900 shadow-sm shadow-amber-500/10"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className={fieldShell}>
          <label htmlFor="cf-message" className={labelClass}>
            {t.message} <span className="text-amber-700">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={isPreventivo ? 5 : 6}
            value={form.message}
            onChange={handleChange}
            className={cn(inputClass, "mt-2 min-h-[120px] resize-y")}
            placeholder={
              isPreventivo ? t.messagePlaceholderPreventivo : t.messagePlaceholderContact
            }
          />
        </div>

        {status === "error" && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
            role="alert"
          >
            {t.errorText}
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="ml-2 underline underline-offset-2 hover:text-red-900"
            >
              {t.retry}
            </button>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="xl"
          fullWidth
          loading={status === "loading"}
          icon={<Send className="h-5 w-5" />}
          className="btn-magnetic !py-4 text-base shadow-lg shadow-amber-600/20"
        >
          {status === "loading" ? t.sending : t.send}
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { rooms } from "@/src/data/rooms/rooms";

type FormType = "contact" | "preventivo";

interface ContactFormProps {
  type?: FormType;
  locale?: string;
}

const labels = {
  it: {
    name: "Nome e Cognome*",
    email: "Email*",
    phone: "Telefono",
    checkIn: "Data Check-in*",
    checkOut: "Data Check-out*",
    guests: "Numero ospiti",
    room: "Camera preferita",
    roomAny: "Qualsiasi camera",
    message: "Messaggio*",
    messagePlaceholder: "Scrivi qui il tuo messaggio...",
    send: "Invia messaggio",
    sending: "Invio in corso...",
    successTitle: "Messaggio inviato!",
    successText: "Risponderemo entro 24 ore. A presto!",
    errorText: "Errore nell'invio. Riprova o contattaci via WhatsApp.",
    retry: "Riprova",
  },
  en: {
    name: "Full Name*",
    email: "Email*",
    phone: "Phone",
    checkIn: "Check-in date*",
    checkOut: "Check-out date*",
    guests: "Number of guests",
    room: "Preferred room",
    roomAny: "Any room",
    message: "Message*",
    messagePlaceholder: "Write your message here...",
    send: "Send message",
    sending: "Sending...",
    successTitle: "Message sent!",
    successText: "We'll reply within 24 hours. See you soon!",
    errorText: "Error sending. Please retry or contact us on WhatsApp.",
    retry: "Retry",
  },
  de: {
    name: "Vor- und Nachname*",
    email: "E-Mail*",
    phone: "Telefon",
    checkIn: "Check-in Datum*",
    checkOut: "Check-out Datum*",
    guests: "Anzahl der Gäste",
    room: "Bevorzugtes Zimmer",
    roomAny: "Beliebiges Zimmer",
    message: "Nachricht*",
    messagePlaceholder: "Schreiben Sie hier Ihre Nachricht...",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    successTitle: "Nachricht gesendet!",
    successText: "Wir antworten innerhalb von 24 Stunden. Bis bald!",
    errorText: "Fehler beim Senden. Bitte erneut versuchen oder WhatsApp nutzen.",
    retry: "Erneut versuchen",
  },
};

const inputClass =
  "w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition bg-white text-stone-900 placeholder:text-stone-400";

const labelClass = "block text-sm font-medium text-stone-700 mb-1";

export default function ContactForm({
  type = "contact",
  locale = "it",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "",
  });

  const t = labels[locale as keyof typeof labels] ?? labels.it;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) throw new Error("server_error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🦋</div>
        <h3 className="font-display text-xl font-bold text-teal-800 mb-2">
          {t.successTitle}
        </h3>
        <p className="text-teal-700">{t.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div>
        <label htmlFor="cf-name" className={labelClass}>{t.name}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Mario Rossi"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={labelClass}>{t.email}</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="mario@esempio.it"
        />
      </div>

      {/* Telefono */}
      <div>
        <label htmlFor="cf-phone" className={labelClass}>{t.phone}</label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="+39 333 1234567"
        />
      </div>

      {/* Campi extra per preventivo */}
      {type === "preventivo" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-checkin" className={labelClass}>{t.checkIn}</label>
              <input
                id="cf-checkin"
                name="checkIn"
                type="date"
                required
                value={form.checkIn}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="cf-checkout" className={labelClass}>{t.checkOut}</label>
              <input
                id="cf-checkout"
                name="checkOut"
                type="date"
                required
                value={form.checkOut}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-guests" className={labelClass}>{t.guests}</label>
              <select
                id="cf-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div>
              <label htmlFor="cf-rooms" className={labelClass}>{t.room}</label>
              <select
                id="cf-rooms"
                name="rooms"
                value={form.rooms}
                onChange={handleChange}
                className={inputClass}
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
        </>
      )}

      {/* Messaggio */}
      <div>
        <label htmlFor="cf-message" className={labelClass}>{t.message}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputClass}
          placeholder={t.messagePlaceholder}
        />
      </div>

      {/* Errore */}
      {status === "error" && (
        <p className="text-red-600 text-sm">{t.errorText}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            {t.sending}
          </>
        ) : (
          t.send
        )}
      </button>
    </form>
  );
}

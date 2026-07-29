"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";

interface NewsletterProps {
  variant?: "light" | "dark";
}

export default function Newsletter({ variant = "light" }: NewsletterProps) {
  const { t } = useLocaleStrings("newsletter");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "it";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    // Il consenso marketing dev'essere esplicito: senza spunta non si invia nulla.
    if (!consent) {
      setError("Per iscriverti devi acconsentire al trattamento dei dati.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Errore iscrizione");
        return;
      }
      setIsSubmitted(true);
      setEmail("");
      setConsent(false);
    } catch {
      setError("Errore di rete");
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <section
      className={`py-16 ${
        isDark
          ? "bg-secondary-800 text-white"
          : "bg-gradient-to-br from-secondary-50 to-sand-50"
      }`}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12 text-secondary-500" />
              <h3
                className={`font-display text-xl font-bold ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {t("thanksTitle")}
              </h3>
              <p
                className={`text-sm ${isDark ? "text-secondary-200" : "text-neutral-600"}`}
              >
                {t("thanksSub")}
              </p>
            </div>
          ) : (
            <>
              <h3
                className={`font-display mb-2 text-xl font-bold md:text-2xl ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {t("title")}
              </h3>
              <p
                className={`mb-6 text-sm ${isDark ? "text-secondary-200" : "text-neutral-600"}`}
              >
                {t("sub")}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                      isDark ? "text-secondary-400" : "text-neutral-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder")}
                    required
                    className={`w-full rounded-xl border py-3 pl-12 pr-4 focus:border-transparent focus:ring-2 focus:ring-secondary-500 ${
                      isDark
                        ? "border-secondary-600 bg-secondary-900/50 text-white placeholder:text-secondary-400"
                        : "border-neutral-300 bg-white text-neutral-900"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-secondary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-600 disabled:opacity-70"
                >
                  {isLoading ? t("loading") : t("submit")}
                </button>
              </form>

              {/*
                Consenso esplicito e non pre-spuntato: l'iscrizione è un trattamento
                per finalità di marketing e prima veniva raccolta la sola email,
                senza alcuna base giuridica raccolta né informativa collegata.
              */}
              <label
                className={`mt-3 flex items-start gap-2.5 text-left text-sm ${
                  isDark ? "text-secondary-200" : "text-neutral-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-400 text-secondary-500 focus:ring-secondary-500"
                />
                <span>
                  Acconsento al trattamento dei miei dati per ricevere offerte e novità.
                  Posso disiscrivermi in qualsiasi momento.{" "}
                  <Link
                    href={`/${locale}/privacy`}
                    className="font-semibold underline underline-offset-2"
                  >
                    Informativa privacy
                  </Link>
                </span>
              </label>
              {error ? (
                <p
                  role="alert"
                  className={`mt-3 text-sm ${isDark ? "text-red-300" : "text-red-600"}`}
                >
                  {error}
                </p>
              ) : null}
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

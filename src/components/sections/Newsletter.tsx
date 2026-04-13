"use client";

import React, { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
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
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

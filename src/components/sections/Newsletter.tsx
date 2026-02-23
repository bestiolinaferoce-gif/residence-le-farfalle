"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import Container from "@/src/components/ui/Container";

interface NewsletterProps {
  variant?: "light" | "dark";
}

export default function Newsletter({ variant = "light" }: NewsletterProps) {
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
          className="max-w-xl mx-auto text-center"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12 text-secondary-500" />
              <h3
                className={`font-display text-xl font-bold ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                Grazie per esserti iscritto!
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-secondary-200" : "text-neutral-600"
                }`}
              >
                Riceverai novità e offerte speciali per la tua prossima vacanza.
              </p>
            </div>
          ) : (
            <>
              <h3
                className={`font-display text-xl md:text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                Resta aggiornato
              </h3>
              <p
                className={`text-sm mb-6 ${
                  isDark ? "text-secondary-200" : "text-neutral-600"
                }`}
              >
                Offerte, consigli sul territorio e novità Residence Le Farfalle
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${
                      isDark ? "text-secondary-400" : "text-neutral-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                      isDark
                        ? "bg-secondary-900/50 border-secondary-600 text-white placeholder:text-secondary-400"
                        : "bg-white border-neutral-300 text-neutral-900"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-secondary-500 text-white font-semibold rounded-xl hover:bg-secondary-600 transition-colors disabled:opacity-70"
                >
                  {isLoading ? "Invio..." : "Iscriviti"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

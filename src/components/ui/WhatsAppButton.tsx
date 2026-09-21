"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { GA_EVENTS } from "@/src/lib/analytics";
import { uiCopy } from "@/src/config/ui-copy";
import type { Locale } from "@/src/lib/i18n";

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  /**
   * Compare solo dopo l'hero.
   * In cima alla pagina si sovrapponeva all'icona calendario del campo "Partenza"
   * del widget disponibilità, cioè proprio al primo gesto di prenotazione. Nell'hero
   * il contatto WhatsApp c'è già dentro il widget, quindi qui sarebbe un doppione.
   */
  useEffect(() => {
    const threshold = () => window.innerHeight * 0.85;
    const update = () => setVisible(window.scrollY > threshold());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { href, valid } = useMemo(() => {
    const digits = digitsOnly(siteConfig.contacts.whatsapp || "");
    const isValid = digits.length >= 10;
    const text = encodeURIComponent(t.whatsappPrefill);
    return {
      valid: isValid,
      href: isValid ? `https://wa.me/${digits}?text=${text}` : "",
    };
  }, [t.whatsappPrefill]);

  if (!valid) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={() => GA_EVENTS.clickWhatsapp("floating")}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-emerald-700 px-3 py-3 text-white shadow-soft ring-1 ring-emerald-600/40 transition hover:bg-emerald-800"
          aria-label={t.whatsappLabel}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" aria-hidden />
          </span>
          <div className="hidden overflow-hidden whitespace-nowrap font-semibold md:block">
            <motion.span
              initial={false}
              animate={hovered ? { maxWidth: 120, opacity: 1 } : { maxWidth: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="block"
            >
              {t.whatsappShort}
            </motion.span>
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

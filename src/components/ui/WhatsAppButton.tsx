"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { GA_EVENTS } from "@/src/lib/analytics";

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  const { href, valid } = useMemo(() => {
    const digits = digitsOnly(siteConfig.contacts.whatsapp || "");
    const isValid = digits.length >= 10;
    const text = encodeURIComponent("Ciao! Vorrei informazioni su Residence Le Farfalle");
    return {
      valid: isValid,
      href: isValid ? `https://wa.me/${digits}?text=${text}` : "",
    };
  }, []);

  if (!valid) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={() => GA_EVENTS.clickWhatsapp()}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-3 text-white shadow-soft ring-1 ring-emerald-400/40 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          aria-label="Scrivici su WhatsApp"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="hidden overflow-hidden whitespace-nowrap font-semibold md:block">
            <motion.span
              initial={false}
              animate={hovered ? { maxWidth: 120, opacity: 1 } : { maxWidth: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="block"
            >
              Scrivici
            </motion.span>
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

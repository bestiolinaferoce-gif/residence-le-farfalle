"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";

/**
 * Pulsante WhatsApp floating — fisso in basso a destra
 * Appare dopo 2 secondi con fade-in. Su hover espande label.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const digits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const url =
    digits.length >= 10
      ? `https://wa.me/${digits}?text=Ciao!%20Vorrei%20informazioni%20su%20Residence%20Le%20Farfalle`
      : "#";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible || digits.length < 10) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      aria-label="Contattaci su WhatsApp"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease, transform 0.3s ease",
      }}
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Scrivici
      </span>
    </a>
  );
}

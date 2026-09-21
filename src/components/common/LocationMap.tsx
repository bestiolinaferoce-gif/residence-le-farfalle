"use client";

import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Card from "@/src/components/ui/Card";

interface LocationMapProps {
  showTitle?: boolean;
  className?: string;
  locale?: string;
}

const copy = {
  it: {
    title: "Dove siamo",
    sub: "Centro di Isola di Capo Rizzuto. Spiagge dell'Area Marina Protetta a circa 6 km (10–15 minuti in auto).",
    iframe: "Mappa di Google con la posizione del Residence Le Farfalle",
    open: "Apri in Google Maps",
    hint: "Si apre Google Maps con le indicazioni stradali.",
  },
  en: {
    title: "Where we are",
    sub: "Centre of Isola di Capo Rizzuto. Marine Protected Area beaches about 6 km away (10–15 minutes by car).",
    iframe: "Google map showing the location of Residence Le Farfalle",
    open: "Open in Google Maps",
    hint: "Opens Google Maps with driving directions.",
  },
  de: {
    title: "So finden Sie uns",
    sub: "Zentrum von Isola di Capo Rizzuto. Strände des Meeresschutzgebiets ca. 6 km entfernt (10–15 Autominuten).",
    iframe: "Google-Karte mit der Lage des Residence Le Farfalle",
    open: "In Google Maps öffnen",
    hint: "Öffnet Google Maps mit Routenplanung.",
  },
} as const;

/**
 * Componente mappa posizione Residence Le Farfalle
 * 
 * SOLUZIONE DEFINITIVA:
 * - Usa Google Maps embed URL ufficiale (se disponibile)
 * - Altrimenti usa coordinate da site.ts con Google Maps embed semplice
 * - Link Google Maps fornito sempre presente come CTA
 */
const LocationMap: React.FC<LocationMapProps> = ({ showTitle = true, className = "", locale = "it" }) => {
  const c = copy[locale as keyof typeof copy] ?? copy.it;
  // Link Google Maps fornito (short link)
  const googleMapsLink = "https://maps.app.goo.gl/cF5jbGk4A8smeEWv7";

  // Google Maps embed URL ufficiale (da "Condividi > Incorpora mappa")
  // Coordinate estratte: lat 38.96171494411169, lng 17.09162398176466
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!3m2!1sit!2sit!4v1770224583380!5m2!1sit!2sit!6m8!1m7!1sTIDvdWguAk9zbRaFn8EYrA!2m2!1d38.96171494411169!2d17.09162398176466!3f208.1455899933649!4f-7.176406875364108!5f0.4000000000000002";

  return (
    <div className={className}>
      {showTitle && (
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold mb-4 text-neutral-900">{c.title}</h2>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-neutral-700 font-medium">{siteConfig.address}</p>
              <p className="text-sm text-neutral-700 mt-1">
                {c.sub}
              </p>
            </div>
          </div>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        {/* Google Maps Embed (preferito) */}
        <div className="relative h-96 w-full">
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={c.iframe}
            className="w-full h-full"
          />
        </div>

        {/* CTA Google Maps */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 font-semibold text-white hover:bg-stone-800"
          >
            {c.open}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <p className="text-xs text-neutral-700 mt-2">
            {c.hint}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LocationMap;

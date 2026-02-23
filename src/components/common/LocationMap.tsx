"use client";

import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

interface LocationMapProps {
  showTitle?: boolean;
  className?: string;
}

/**
 * Componente mappa posizione Residence Le Farfalle
 * 
 * SOLUZIONE DEFINITIVA:
 * - Usa Google Maps embed URL ufficiale (se disponibile)
 * - Altrimenti usa coordinate da site.ts con Google Maps embed semplice
 * - Link Google Maps fornito sempre presente come CTA
 */
const LocationMap: React.FC<LocationMapProps> = ({ showTitle = true, className = "" }) => {
  // Link Google Maps fornito (short link)
  const googleMapsLink = "https://maps.app.goo.gl/cF5jbGk4A8smeEWv7";

  // Google Maps embed URL ufficiale (da "Condividi > Incorpora mappa")
  // Coordinate estratte: lat 38.96171494411169, lng 17.09162398176466
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!3m2!1sit!2sit!4v1770224583380!5m2!1sit!2sit!6m8!1m7!1sTIDvdWguAk9zbRaFn8EYrA!2m2!1d38.96171494411169!2d17.09162398176466!3f208.1455899933649!4f-7.176406875364108!5f0.4000000000000002";

  return (
    <div className={className}>
      {showTitle && (
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold mb-4 text-neutral-900">Dove Siamo</h2>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-neutral-700 font-medium">{siteConfig.address}</p>
              <p className="text-sm text-neutral-500 mt-1">
                Isola di Capo Rizzuto, Calabria - A pochi minuti dal mare
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
            title="Mappa posizione Residence Le Farfalle - Google Maps"
            className="w-full h-full"
            aria-label="Mappa interattiva della posizione del residence"
          />
        </div>

        {/* CTA Google Maps */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Button variant="primary" size="md">
              Apri su Google Maps
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
          <p className="text-xs text-neutral-500 mt-2">
            Clicca per aprire la posizione su Google Maps con indicazioni stradali
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LocationMap;

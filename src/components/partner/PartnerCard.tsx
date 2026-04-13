"use client";

import React from "react";
import Image from "next/image";
import { Phone, ExternalLink, MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Card from "@/src/components/ui/Card";
import {
  getPartnerBadgeLabel,
  type Partner,
  type PartnerBadge,
} from "@/src/data/partners";

const cardUi = {
  it: { comingSoon: "In arrivo", website: "Sito web" },
  en: { comingSoon: "Coming soon", website: "Website" },
  de: { comingSoon: "Demnächst", website: "Website" },
} as const;

const badgeStyles: Record<PartnerBadge, string> = {
  recommended:
    "bg-amber-100 text-amber-900 border border-amber-200/80",
  useful: "bg-sky-100 text-sky-900 border border-sky-200/80",
  experience:
    "bg-fuchsia-50 text-fuchsia-900 border border-fuchsia-200/70",
};

interface PartnerCardProps {
  partner: Partner;
  categoryLabel: string;
  locale?: string;
}

export default function PartnerCard({ partner, categoryLabel, locale = "it" }: PartnerCardProps) {
  const initial = partner.name.trim().charAt(0).toUpperCase();
  const loc = locale === "en" || locale === "de" ? locale : "it";
  const ui = cardUi[loc];

  return (
    <Card
      hover
      padding="none"
      shadow="none"
      className="group relative flex h-full flex-col overflow-hidden border border-neutral-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4 p-5 pb-0">
        <div
          className={cn(
            "relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-stone-100 text-lg font-bold text-neutral-500"
          )}
        >
          {partner.logoSrc ? (
            <Image
              src={partner.logoSrc}
              alt={partner.logoAlt ?? partner.name}
              width={56}
              height={56}
              className="object-contain p-1.5"
            />
          ) : (
            <span aria-hidden>{initial}</span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-600">
              {categoryLabel}
            </span>
            {partner.badge && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  badgeStyles[partner.badge]
                )}
              >
                {getPartnerBadgeLabel(partner.badge, locale)}
              </span>
            )}
          </div>
          <h3 className="mt-1 font-display text-lg font-bold text-neutral-900">
            {partner.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-3">
        <p className="text-sm leading-relaxed text-neutral-600">{partner.description}</p>

        {partner.address && (
          <p className="mt-3 flex items-start gap-2 text-xs text-neutral-500">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
            {partner.address}
          </p>
        )}

        <div className="mt-4 flex flex-1 flex-col justify-end gap-2 border-t border-neutral-100 pt-4">
          {partner.comingSoon ? (
            <span className="text-sm font-medium text-neutral-400">{ui.comingSoon}</span>
          ) : (
            <>
              {partner.phone && (
                <a
                  href={`tel:${partner.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 transition-colors hover:text-secondary-700 hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {partner.phone}
                </a>
              )}
              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 transition-colors hover:text-secondary-700 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  {ui.website}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

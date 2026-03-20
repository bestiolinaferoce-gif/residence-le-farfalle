import React from "react";
import { cn } from "@/src/lib/utils";

interface ButterflyIconProps {
  className?: string;
  ariaHidden?: boolean;
}

/** Icona farfalla SVG riutilizzabile - brand Residence Le Farfalle */
export function ButterflyIcon({ className, ariaHidden = true }: ButterflyIconProps) {
  return (
    <svg
      viewBox="0 0 100 70"
      className={cn("w-full h-auto", className)}
      aria-hidden={ariaHidden}
    >
      {/* Ala sinistra */}
      <ellipse
        cx="30"
        cy="30"
        rx="28"
        ry="22"
        fill="currentColor"
        opacity="0.6"
        transform="rotate(-20 30 30)"
      />
      <ellipse
        cx="25"
        cy="50"
        rx="18"
        ry="14"
        fill="currentColor"
        opacity="0.4"
        transform="rotate(10 25 50)"
      />
      {/* Ala destra */}
      <ellipse
        cx="70"
        cy="30"
        rx="28"
        ry="22"
        fill="currentColor"
        opacity="0.6"
        transform="rotate(20 70 30)"
      />
      <ellipse
        cx="75"
        cy="50"
        rx="18"
        ry="14"
        fill="currentColor"
        opacity="0.4"
        transform="rotate(-10 75 50)"
      />
      {/* Corpo */}
      <ellipse cx="50" cy="38" rx="4" ry="16" fill="currentColor" opacity="0.8" />
      {/* Antenne */}
      <line
        x1="50"
        y1="22"
        x2="38"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="38" cy="10" r="2" fill="currentColor" opacity="0.6" />
      <line
        x1="50"
        y1="22"
        x2="62"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="62" cy="10" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

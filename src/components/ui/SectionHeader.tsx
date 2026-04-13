"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

const ButterflyIcon = () => (
  <svg
    viewBox="0 0 24 26"
    className="h-5 w-5 text-primary-500"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2C8 6 6 10 6 14c0 4 2 8 6 10 4-2 6-6 6-10 0-4-2-8-6-12z" />
  </svg>
);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showButterfly?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  showButterfly = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12 md:mb-16", className)}>
      {showButterfly && (
        <div className="flex justify-center mb-3">
          <ButterflyIcon />
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

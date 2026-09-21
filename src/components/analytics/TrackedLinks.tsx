"use client";

import React from "react";
import { GA_EVENTS } from "@/src/lib/analytics";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Dove si trova il link (header, footer, prenota…): unico parametro dell'evento. */
  placement?: string;
};

export function TrackedTel({ href, children, placement, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickPhone(placement);
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

export function TrackedMailto({ href, children, placement, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickEmail(placement);
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

export function TrackedWhatsapp({ href, children, placement, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickWhatsapp(placement);
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

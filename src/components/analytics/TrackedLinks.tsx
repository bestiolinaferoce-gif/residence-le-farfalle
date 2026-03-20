"use client";

import React from "react";
import { GA_EVENTS } from "@/src/lib/analytics";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function TrackedTel({ href, children, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickPhone();
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

export function TrackedMailto({ href, children, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickEmail();
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

export function TrackedWhatsapp({ href, children, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      {...rest}
      onClick={(e) => {
        GA_EVENTS.clickWhatsapp();
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

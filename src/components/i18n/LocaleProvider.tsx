"use client";

import React, { createContext, useContext, useMemo } from "react";

export type MessagesTree = Record<string, unknown>;

const LocaleContext = createContext<{
  locale: string;
  messages: MessagesTree;
} | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: MessagesTree;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function walk(obj: unknown, path: string): unknown {
  if (!path) return obj;
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

/** Interpolazione semplice {name} — non gestisce ICU complesso */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] !== undefined ? String(params[k]) : `{${k}}`
  );
}

export function useLocaleStrings(namespace: string) {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("LocaleProvider mancante: avvolgi la tree sotto [locale]/layout.");
  }
  const root = walk(ctx.messages, namespace) as MessagesTree | undefined;
  if (!root || typeof root !== "object") {
    throw new Error(`Namespace messaggi mancante: ${namespace}`);
  }

  return {
    t: (key: string, params?: Record<string, string | number>) => {
      const v = walk(root, key);
      if (typeof v !== "string") return `${namespace}.${key}`;
      return interpolate(v, params);
    },
    raw: <T,>(key: string): T => walk(root, key) as T,
  };
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("LocaleProvider mancante");
  return ctx;
}

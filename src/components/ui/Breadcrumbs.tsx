import React from "react";
import Link from "next/link";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";

interface Crumb {
  name: string;
  url: string;
}

/**
 * Breadcrumb visibile + BreadcrumbList JSON-LD dagli stessi dati,
 * così il markup descrive esattamente ciò che l'utente vede.
 */
export default function Breadcrumbs({
  items,
  label,
  tone = "light",
}: {
  items: Crumb[];
  label: string;
  tone?: "light" | "dark";
}) {
  const toPath = (url: string) => url.replace(/^https?:\/\/[^/]+/, "") || "/";
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label={label} className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-stone-900"}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={toPath(item.url)}
                      className={
                        tone === "dark"
                          ? "text-white/85 underline-offset-4 hover:text-white hover:underline"
                          : "text-stone-700 underline-offset-4 hover:text-stone-900 hover:underline"
                      }
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden className={tone === "dark" ? "text-white/60" : "text-stone-500"}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";

interface HomeFinalCtaProps {
  locale?: string;
}

export default function HomeFinalCta({ locale = "it" }: HomeFinalCtaProps) {
  const { t } = useLocaleStrings("homeCta");

  return (
    <section className="cta-mesh-dark relative overflow-hidden py-28">
      <Container className="relative z-10">
        <div className="text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300/90">
            {t("kicker")}
          </p>
          <h2 className="mb-5 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/75">{t("body")}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/prenota`}>
              <span className="inline-flex cursor-pointer select-none items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-10 py-4 text-base font-semibold tracking-wide text-stone-900 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl">
                {t("primary")}
              </span>
            </Link>
            <Link href={`/${locale}/contatti`}>
              <span className="inline-flex cursor-pointer select-none items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-10 py-4 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15">
                {t("secondary")}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

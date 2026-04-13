"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Waves, MapPin, Sun } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";

const icons = [Car, Waves, MapPin, Sun] as const;

export default function MareVicino() {
  const { t, raw } = useLocaleStrings("mareVicino");
  const highlights = raw<{ title: string; desc: string }[]>("highlights");

  return (
    <section className="mesh-section-white py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            {t("kicker")}
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg leading-relaxed text-stone-600">{t("intro")}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = icons[i] ?? Waves;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-secondary-200/80 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-50 to-primary-50 ring-1 ring-stone-100">
                  <Icon className="h-5 w-5 text-secondary-600" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-semibold text-stone-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-12 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-primary-900 via-stone-900 to-secondary-900 px-8 py-7 text-white shadow-xl shadow-primary-900/20 ring-1 ring-white/10 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-lg font-semibold">{t("stripTitle")}</p>
            <p className="mt-1 text-sm text-white/70">{t("stripSub")}</p>
          </div>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-amber-200 ring-1 ring-white/15">
            <Waves className="h-4 w-4" />
            {t("stripTime")}
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  getPartnerCategoryLabel,
  getPartnerSectionCopy,
  getPartnersSorted,
  type PartnerCategory,
} from "@/src/data/partners";
import Container from "@/src/components/ui/Container";
import PartnerCard from "@/src/components/partner/PartnerCard";

interface PartnersSectionProps {
  locale?: string;
  id?: string;
}

export default function PartnersSection({ locale = "it", id }: PartnersSectionProps) {
  const copy = getPartnerSectionCopy(locale);
  const sorted = useMemo(() => getPartnersSorted(), []);
  const [activeCategory, setActiveCategory] = useState<PartnerCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? sorted
      : sorted.filter((p) => p.category === activeCategory);

  const cats = (
    [
      "farmacie",
      "guardie-mediche",
      "supermarket",
      "ristoranti",
      "transfer",
      "noleggio",
      "escursioni",
    ] satisfies PartnerCategory[]
  ).slice();

  return (
    <section id={id} className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0 mesh-gradient opacity-90"
        aria-hidden
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-600">
            {copy.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg text-neutral-600">{copy.subtitle}</p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3"
        >
          {copy.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-2xl border border-white/60 bg-white/70 px-4 py-4 text-left shadow-sm backdrop-blur-md"
            >
              <div className="font-semibold text-neutral-900">{pillar.title}</div>
              <p className="mt-1 text-sm text-neutral-600">{pillar.body}</p>
            </li>
          ))}
        </motion.ul>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-secondary-600 text-white shadow-md shadow-secondary-600/25"
                : "border border-neutral-200 bg-white/80 text-neutral-700 hover:border-secondary-200"
            }`}
          >
            {copy.allLabel}
          </button>
          {cats.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-secondary-600 text-white shadow-md shadow-secondary-600/25"
                  : "border border-neutral-200 bg-white/80 text-neutral-700 hover:border-secondary-200"
              }`}
            >
              {getPartnerCategoryLabel(cat, locale)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <PartnerCard
                partner={partner}
                categoryLabel={getPartnerCategoryLabel(partner.category, locale)}
                locale={locale}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

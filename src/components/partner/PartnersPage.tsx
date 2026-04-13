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

const TAB_ORDER = [
  "farmacie",
  "guardie-mediche",
  "supermarket",
  "ristoranti",
  "transfer",
  "noleggio",
  "escursioni",
] satisfies PartnerCategory[];

interface PartnersPageProps {
  locale?: string;
}

export default function PartnersPage({ locale = "it" }: PartnersPageProps) {
  const copy = getPartnerSectionCopy(locale);
  const sorted = useMemo(() => getPartnersSorted(), []);
  const [activeTab, setActiveTab] = useState<PartnerCategory | "tutti">("tutti");

  const filteredPartners =
    activeTab === "tutti" ? sorted : sorted.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="mesh-gradient border-b border-stone-200/60 py-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary-600">
              {copy.kicker}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-neutral-900 md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{copy.subtitle}</p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-14">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("tutti")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === "tutti"
                ? "bg-secondary-600 text-white shadow-md"
                : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {copy.allLabel}
          </button>
          {TAB_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === key
                  ? "bg-secondary-600 text-white shadow-md"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {getPartnerCategoryLabel(key, locale)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
    </div>
  );
}

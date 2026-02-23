"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ExternalLink } from "lucide-react";
import { partners, partnerCategories, type PartnerCategory } from "@/src/data/partners";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

const categoryLabels: Record<PartnerCategory, string> = {
  farmacie: "Farmacie",
  "guardie-mediche": "Numeri utili",
  supermarket: "Supermarket / Alimentari",
  ristoranti: "Ristoranti",
  transfer: "Transfer / NCC",
  noleggio: "Noleggio",
  escursioni: "Escursioni / Diving",
};

interface PartnersSectionProps {
  locale?: string;
  id?: string;
}

export default function PartnersSection({ locale = "it", id }: PartnersSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PartnerCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  return (
    <section id={id} className="py-20 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Partner & Servizi utili
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Farmacie, transfer, escursioni e tutto ciò che ti serve per la tua vacanza
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-secondary-500 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Tutti
          </button>
          {(Object.keys(categoryLabels) as PartnerCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-secondary-500 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Card hover>
                <span className="text-xs font-medium text-secondary-600 uppercase">
                  {categoryLabels[partner.category]}
                </span>
                <h3 className="font-semibold text-lg mt-1 mb-2 text-neutral-900">
                  {partner.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">{partner.description}</p>
                {partner.comingSoon ? (
                  <span className="text-sm text-neutral-500 italic">In arrivo</span>
                ) : (
                  <>
                    {partner.phone && (
                      <a
                        href={`tel:${partner.phone}`}
                        className="flex items-center gap-2 text-secondary-600 text-sm font-medium hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {partner.phone}
                      </a>
                    )}
                    {partner.link && (
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary-600 text-sm font-medium hover:underline mt-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Sito web
                      </a>
                    )}
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

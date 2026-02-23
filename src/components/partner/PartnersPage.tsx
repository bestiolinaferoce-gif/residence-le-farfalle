"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ExternalLink } from "lucide-react";
import { partners, partnerCategories, type PartnerCategory } from "@/src/data/partners";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

const tabs: { key: PartnerCategory; label: string }[] = [
  { key: "farmacie", label: "Farmacie" },
  { key: "guardie-mediche", label: "Numeri utili" },
  { key: "supermarket", label: "Servizi" },
  { key: "ristoranti", label: "Ristoranti" },
  { key: "transfer", label: "Transfer" },
  { key: "noleggio", label: "Noleggio" },
  { key: "escursioni", label: "Esperienze" },
];

interface PartnersPageProps {
  locale?: string;
}

export default function PartnersPage({ locale = "it" }: PartnersPageProps) {
  const [activeTab, setActiveTab] = useState<PartnerCategory | "tutti">("tutti");

  const filteredPartners =
    activeTab === "tutti"
      ? partners
      : partners.filter((p) => p.category === activeTab);

  return (
    <div className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Partner & Servizi utili
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Farmacie, transfer, escursioni e tutto ciò che ti serve per la tua vacanza
            a Isola di Capo Rizzuto
          </p>
        </motion.div>

        {/* Tab filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("tutti")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "tutti"
                ? "bg-secondary-500 text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            Tutti
          </button>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-secondary-500 text-white"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <span className="text-xs font-medium text-secondary-600 uppercase tracking-wide">
                  {partnerCategories[partner.category].it}
                </span>
                <h3 className="font-semibold text-lg mt-1 mb-2 text-neutral-900">
                  {partner.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">{partner.description}</p>
                {partner.comingSoon ? (
                  <span className="text-sm text-neutral-500 italic">In arrivo</span>
                ) : (
                  <div className="space-y-2">
                    {partner.phone && (
                      <a
                        href={`tel:${partner.phone}`}
                        className="flex items-center gap-2 text-secondary-600 font-medium text-sm hover:underline"
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
                        className="flex items-center gap-2 text-secondary-600 font-medium text-sm hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Sito web
                      </a>
                    )}
                    {partner.address && (
                      <p className="text-sm text-neutral-500">{partner.address}</p>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

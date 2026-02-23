"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { partners } from "@/src/data/partners";
import { partnerCategories } from "@/src/data/partners";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

interface PartnersPreviewProps {
  locale?: string;
}

export default function PartnersPreview({ locale = "it" }: PartnersPreviewProps) {
  const previewPartners = partners.filter((p) => !p.comingSoon).slice(0, 6);
  const hasEnough = previewPartners.length >= 3;
  const displayPartners = hasEnough ? previewPartners : partners.slice(0, 6);

  return (
    <section className="py-24 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Partner & Servizi utili
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Farmacie, transfer, escursioni e tutto ciò che ti serve per la tua vacanza
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                {partner.phone && !partner.comingSoon && (
                  <a
                    href={`tel:${partner.phone}`}
                    className="text-secondary-600 font-medium text-sm hover:underline"
                  >
                    {partner.phone}
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${locale}/servizi#partner`}>
            <Button variant="primary" size="lg">
              Vedi tutti
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

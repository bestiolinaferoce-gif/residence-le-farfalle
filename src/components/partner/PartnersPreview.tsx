"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { partners, getPartnerCategoryLabel, getPartnerSectionCopy } from "@/src/data/partners";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

interface PartnersPreviewProps {
  locale?: string;
}

export default function PartnersPreview({ locale = "it" }: PartnersPreviewProps) {
  const copy = getPartnerSectionCopy(locale);
  const withoutSoon = partners.filter((p) => !p.comingSoon).slice(0, 6);
  const hasEnough = withoutSoon.length >= 3;
  const displayPartners = hasEnough ? withoutSoon : partners.slice(0, 6);

  return (
    <section className="py-24 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl md:text-4xl font-bold text-neutral-900">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">{copy.subtitle}</p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <span className="text-xs font-medium uppercase tracking-wide text-secondary-600">
                  {getPartnerCategoryLabel(partner.category, locale)}
                </span>
                <h3 className="mt-1 mb-2 text-lg font-semibold text-neutral-900">
                  {partner.name}
                </h3>
                <p className="mb-4 text-sm text-neutral-600">{partner.description}</p>
                {partner.phone && !partner.comingSoon && (
                  <a
                    href={`tel:${partner.phone}`}
                    className="text-sm font-medium text-secondary-600 hover:underline"
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
              {copy.seeAll}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Waves, MapPin, Compass, Utensils, Calendar, Anchor } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

const cards = [
  { slug: "spiagge" as const, icon: Waves, image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg" },
  { slug: "area-marina" as const, icon: Anchor, image: "/images/territorio/area-marina-protetta.jpg" },
  { slug: "borghi" as const, icon: MapPin, image: "/images/territorio/le-castella-castello.jpg" },
  { slug: "eventi" as const, icon: Calendar, image: "/images/territorio/tramonto-le-castella.jpg" },
  { slug: "escursioni" as const, icon: Compass, image: "/images/territorio/valli-cupe-4.jpg" },
  { slug: "food" as const, icon: Utensils, image: "/images/services/colazione-breakfast.webp" },
];

interface Territorio60SecondiProps {
  locale?: string;
}

export default function Territorio60Secondi({ locale = "it" }: Territorio60SecondiProps) {
  const { t, raw } = useLocaleStrings("territorio60");
  const cardTexts = raw<Record<string, { title: string; excerpt: string }>>("cards");

  return (
    <section className="mesh-section-light border-y border-stone-200/60 py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            {t("kicker")}
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">{t("sub")}</p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const text = cardTexts[card.slug];
            const Icon = card.icon;
            return (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Card hover className="group h-full overflow-hidden p-0">
                  <Link href={`/${locale}/territorio`} className="block">
                    <div className="relative h-52 sm:h-56">
                      <Image
                        src={card.image}
                        alt={text?.title ?? card.slug}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={80}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <Icon className="h-8 w-8 text-white drop-shadow-md" />
                      </div>
                      <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-white">
                        {text?.title}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-neutral-600">{text?.excerpt}</p>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${locale}/territorio`}>
            <Button variant="primary" size="lg">
              {t("cta")}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

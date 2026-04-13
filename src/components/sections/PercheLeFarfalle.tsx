"use client";

import React from "react";
import { motion } from "framer-motion";
import { Waves, Coffee, Heart, MapPin, ParkingCircle, Star } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";

const icons = [Waves, Coffee, Heart, MapPin, ParkingCircle, Star] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function PercheLeFarfalle() {
  const { t, raw } = useLocaleStrings("perche");
  const items = raw<{ title: string; description: string }[]>("items");

  return (
    <section className="mesh-section-light py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            {t("kicker")}
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-stone-900 md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">{t("sub")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((feature, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group rounded-3xl border border-stone-200/80 bg-white/90 p-7 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-primary-200/80 hover:shadow-lg hover:shadow-primary-500/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-semibold leading-snug text-stone-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

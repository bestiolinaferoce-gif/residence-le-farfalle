"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Plane,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

const SERVICE_KEYS = [
  "breakfast",
  "wifi",
  "ac",
  "tv",
  "bath",
  "transfer",
  "tours",
  "restaurants",
] as const;

const SERVICE_ICONS = [
  Coffee,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Plane,
  MapPin,
  UtensilsCrossed,
] as const;

const Services: React.FC = () => {
  const { t } = useLocaleStrings("servicesSection");

  const services = SERVICE_KEYS.map((key, i) => {
    const Icon = SERVICE_ICONS[i];
    return {
      key,
      icon: <Icon className="h-8 w-8 text-primary-500" />,
      title: t(`${key}.title`),
      description: t(`${key}.desc`),
    };
  });

  return (
    <section className="mesh-section-white py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            {t("kicker")}
          </p>
          <h2 className="mb-4 font-display text-display-sm text-neutral-900 md:text-display-md">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">{t("sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                hover
                className="h-full rounded-3xl border border-stone-100/90 bg-white/95 text-center shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-primary-200/70 hover:shadow-lg hover:shadow-primary-500/5"
              >
                <div className="mb-5 flex justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 ring-1 ring-stone-100">
                    {service.icon}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;

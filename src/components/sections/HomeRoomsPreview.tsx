"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Maximize2 } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import { rooms } from "@/src/data/rooms/rooms";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";

interface HomeRoomsPreviewProps {
  locale?: string;
}

export default function HomeRoomsPreview({ locale = "it" }: HomeRoomsPreviewProps) {
  const currentLocale = locale as "it" | "en" | "de";
  const { t, raw } = useLocaleStrings("homeRooms");
  const features = raw<string[]>("features");

  return (
    <section className="mesh-section-light py-24" aria-labelledby="rooms-heading">
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
          <h2
            id="rooms-heading"
            className="mb-4 font-display text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">{t("sub")}</p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {rooms.map((room, index) => {
            const previewName = room.name[currentLocale] ?? room.name.it;
            const previewAlt = `${previewName} — Residence Le Farfalle, Isola di Capo Rizzuto`;
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  hover
                  className="group h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white/95 p-0 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-primary-200/70 hover:shadow-lg"
                >
                  <Link href={`/${locale}/camere`} className="block">
                    <div className="relative h-72 md:h-80">
                      <Image
                        src={`/images/rooms/${room.images[0]}`}
                        alt={previewAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur-sm">
                        <Users className="h-4 w-4 text-secondary-600" aria-hidden />
                        <span className="text-sm font-semibold text-neutral-900">
                          {room.capacity}{" "}
                          {room.capacity === 1 ? t("spotOne") : t("spotMany")}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3 font-display text-2xl font-bold text-neutral-900">
                        {room.name[currentLocale] ?? room.name.it}
                      </h3>
                      <ul className="mb-4 flex flex-wrap gap-2">
                        {features.map((f) => (
                          <li
                            key={f}
                            className="rounded-lg bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-secondary-600 group-hover:underline">
                        {t("detailLink")}
                        <Maximize2 className="h-4 w-4" aria-hidden />
                      </span>
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
          <Link href={`/${locale}/camere`}>
            <Button variant="primary" size="lg">
              {t("cta")}
              <Maximize2 className="ml-2 h-5 w-5" aria-hidden />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

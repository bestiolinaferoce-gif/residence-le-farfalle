"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Waves } from "lucide-react";
import { useLocaleStrings } from "@/src/components/i18n/LocaleProvider";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";

interface HomeFooterProps {
  locale?: string;
}

export default function HomeFooter({ locale = "it" }: HomeFooterProps) {
  const { t, raw } = useLocaleStrings("homeFooter");
  const faqItems = raw<{ q: string; a: string }[]>("faq");

  return (
    <section className="bg-gradient-to-b from-secondary-900 to-secondary-950 py-24 text-white">
      <Container>
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
              <Waves className="h-5 w-5 text-secondary-400" />
              Residence Le Farfalle
            </h3>
            <p className="mb-4 text-secondary-200">{t("tagline")}</p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.contacts.phone}`}
                className="flex items-center gap-2 text-secondary-200 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contacts.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="flex items-center gap-2 text-secondary-200 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contacts.email}
              </a>
              <div className="flex items-start gap-2 text-secondary-200">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 font-display text-xl font-bold">{t("faqTitle")}</h3>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-secondary-800 pb-4 last:border-0">
                  <h4 className="mb-1 font-semibold text-white">{item.q}</h4>
                  <p className="text-sm text-secondary-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={`/${locale}/prenota`}>
            <button className="rounded-xl bg-white px-8 py-3 font-semibold text-secondary-800 transition-colors hover:bg-secondary-100">
              {t("bookNow")}
            </button>
          </Link>
          <Link href={`/${locale}/contatti`}>
            <button className="rounded-xl border border-white/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              {t("contact")}
            </button>
          </Link>
        </div>

        <p className="mt-12 text-center text-sm text-secondary-400">
          © {new Date().getFullYear()} Residence Le Farfalle. {t("copyright")}
        </p>
      </Container>
    </section>
  );
}

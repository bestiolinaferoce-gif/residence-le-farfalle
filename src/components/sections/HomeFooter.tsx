"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Waves } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";

const faqItems = [
  {
    q: "Check-in / Check-out",
    a: "Check-in dalle 14:00, check-out entro le 10:00. Su richiesta possiamo essere flessibili.",
  },
  {
    q: "Parcheggio",
    a: "Parcheggio gratuito disponibile nelle vicinanze.",
  },
  {
    q: "Animali",
    a: "Contattaci per la policy animali.",
  },
  {
    q: "Colazione",
    a: "Colazione continentale inclusa, servita ogni mattina.",
  },
];

interface HomeFooterProps {
  locale?: string;
}

export default function HomeFooter({ locale = "it" }: HomeFooterProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary-900 to-secondary-950 text-white">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Contatti rapidi */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Waves className="h-5 w-5 text-secondary-400" />
              Residence Le Farfalle
            </h3>
            <p className="text-secondary-200 mb-4">
              Nel cuore di Isola di Capo Rizzuto, a pochi minuti dal mare cristallino
              dell&apos;Area Marina Protetta.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.contacts.phone}`}
                className="flex items-center gap-2 text-secondary-200 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contacts.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="flex items-center gap-2 text-secondary-200 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contacts.email}
              </a>
              <div className="flex items-start gap-2 text-secondary-200">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Mini FAQ */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold mb-4">Domande frequenti</h3>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-secondary-800 pb-4 last:border-0">
                  <h4 className="font-semibold text-white mb-1">{item.q}</h4>
                  <p className="text-sm text-secondary-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/prenota`}>
            <button className="px-8 py-3 bg-white text-secondary-800 font-semibold rounded-xl hover:bg-secondary-100 transition-colors">
              Prenota ora
            </button>
          </Link>
          <Link href={`/${locale}/contatti`}>
            <button className="px-8 py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Contattaci
            </button>
          </Link>
        </div>

        <p className="text-center text-secondary-400 text-sm mt-12">
          © {new Date().getFullYear()} Residence Le Farfalle. Isola di Capo Rizzuto, Calabria.
        </p>
      </Container>
    </section>
  );
}

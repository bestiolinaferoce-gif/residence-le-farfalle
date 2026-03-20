import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, ExternalLink, MessageCircle } from "lucide-react";
import { siteConfig, STRUCTURE_CIN } from "@/src/config/site";
import { TrackedMailto, TrackedTel, TrackedWhatsapp } from "@/src/components/analytics/TrackedLinks";
import Container from "@/src/components/ui/Container";
import { rooms } from "@/src/data/rooms/rooms";

interface FooterProps {
  locale?: string;
}

const Footer: React.FC<FooterProps> = ({ locale = "it" }) => {
  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const quickLinks = [
    { label: "Home", href: `/${locale}` },
    { label: "Camere", href: `/${locale}/camere` },
    { label: "Servizi", href: `/${locale}/servizi` },
    { label: "Territorio", href: `/${locale}/territorio` },
    { label: "FAQ", href: `/${locale}/faq` },
    { label: "Prenota", href: `/${locale}/prenota` },
    { label: "Contatti", href: `/${locale}/contatti` },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300">
      <Container size="lg" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-white font-display text-2xl font-bold">🦋 Le Farfalle</div>
            <p className="mt-3 text-sm text-stone-400 leading-relaxed">
              {siteConfig.description[locale as keyof typeof siteConfig.description] ?? siteConfig.description.it}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-stone-400" aria-hidden />
              <TrackedTel
                href={`tel:${siteConfig.contacts.phone}`}
                className="hover:text-amber-400 transition-colors"
              >
                {siteConfig.contacts.phone}
              </TrackedTel>
            </div>
          </div>

          <div>
            <div className="text-white font-semibold">Link Rapidi</div>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold">Le Camere</div>
            <ul className="mt-4 space-y-2 text-sm">
              {rooms.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${locale}/camere/${r.slug}`} className="hover:text-amber-400 transition-colors">
                    {r.name.it}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold">Contatti</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-stone-400" aria-hidden />
                <TrackedTel
                  href={`tel:${siteConfig.contacts.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {siteConfig.contacts.phone}
                </TrackedTel>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-stone-400" aria-hidden />
                <TrackedMailto
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {siteConfig.contacts.email}
                </TrackedMailto>
              </li>
              {waDigits.length >= 10 ? (
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-stone-400" aria-hidden />
                  <TrackedWhatsapp
                    href={`https://wa.me/${waDigits}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    WhatsApp
                  </TrackedWhatsapp>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-stone-400 mt-0.5" aria-hidden />
                <span className="text-stone-400">{siteConfig.address}</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {siteConfig.social.facebook ? (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-stone-200 hover:bg-white/10 hover:text-amber-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              ) : null}
              {siteConfig.social.instagram ? (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-stone-200 hover:bg-white/10 hover:text-amber-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ) : null}
              {siteConfig.social.tripadvisor ? (
                <a
                  href={siteConfig.social.tripadvisor}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-stone-200 hover:bg-white/10 hover:text-amber-400 transition-colors"
                  aria-label="TripAdvisor"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-stone-400">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Residence Le Farfalle · Francesco Nigro</span>
            <span className="text-xs text-stone-500">
              CIN: {STRUCTURE_CIN}
              {siteConfig.vatOrCf ? (
                <> · P.IVA/CF: {siteConfig.vatOrCf}</>
              ) : (
                <>
                  {" "}
                  · P.IVA/C.F.: disponibile su richiesta ({siteConfig.contacts.email})
                </>
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href={`/${locale}/privacy`} className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/${locale}/cookie`} className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </Link>
            <Link href={`/${locale}/termini`} className="hover:text-amber-400 transition-colors">
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

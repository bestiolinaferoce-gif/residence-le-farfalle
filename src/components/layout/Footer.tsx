import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, ExternalLink, MessageCircle } from "lucide-react";
import { siteConfig, STRUCTURE_CIN } from "@/src/config/site";
import { TrackedMailto, TrackedTel, TrackedWhatsapp } from "@/src/components/analytics/TrackedLinks";
import Container from "@/src/components/ui/Container";
import { rooms } from "@/src/data/rooms/rooms";
import { uiCopy } from "@/src/config/ui-copy";
import { navigation } from "@/src/config/navigation";
import type { Locale } from "@/src/lib/i18n";

interface FooterProps {
  locale: Locale;
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = uiCopy[locale];
  const waDigits = siteConfig.contacts.whatsapp.replace(/\D/g, "");
  const quickLinks = [
    ...navigation.main.map((item) => ({ label: item.name[locale], href: `/${locale}${item.href}` })),
    { label: t.ctaAvailability, href: `/${locale}/prenota` },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300">
      <Container size="lg" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-white font-display text-2xl font-bold">Residence Le Farfalle</p>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">{t.footerTagline}</p>
            <div className="mt-5 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-stone-300" aria-hidden />
              <TrackedTel
                href={`tel:${siteConfig.contacts.phone}`}
                className="hover:text-amber-400 transition-colors"
              >
                {siteConfig.contacts.phone}
              </TrackedTel>
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold">{t.footerLinks}</h2>
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
            <h2 className="text-white font-semibold">{t.footerRooms}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {rooms.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${locale}/camere/${r.slug}`} className="hover:text-amber-400 transition-colors">
                    {r.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold">{t.footerContacts}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-stone-300" aria-hidden />
                <TrackedTel
                  href={`tel:${siteConfig.contacts.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {siteConfig.contacts.phone}
                </TrackedTel>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-stone-300" aria-hidden />
                <TrackedMailto
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {siteConfig.contacts.email}
                </TrackedMailto>
              </li>
              {waDigits.length >= 10 ? (
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-stone-300" aria-hidden />
                  <TrackedWhatsapp
                    href={`https://wa.me/${waDigits}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    WhatsApp
                  </TrackedWhatsapp>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-stone-300 mt-0.5" aria-hidden />
                <address className="not-italic text-stone-300">{siteConfig.address}</address>
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

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-stone-300">
          <div className="flex flex-col gap-1">
            <span suppressHydrationWarning>© {new Date().getFullYear()} Residence Le Farfalle</span>
            <span className="text-xs text-stone-400">
              CIN: {STRUCTURE_CIN}
              {siteConfig.vatOrCf ? (
                <> · P.IVA/CF: {siteConfig.vatOrCf}</>
              ) : (
                <>
                  {" "}
                  · {t.vatOnRequest}
                </>
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href={`/${locale}/privacy`} className="hover:text-amber-400 transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${locale}/cookie`} className="hover:text-amber-400 transition-colors">
              {t.cookie}
            </Link>
            <Link href={`/${locale}/termini`} className="hover:text-amber-400 transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

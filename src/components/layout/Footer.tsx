import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, ExternalLink } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { navigation } from "@/src/config/navigation";
import Container from "@/src/components/ui/Container";

interface FooterProps {
  locale?: string;
}

const Footer: React.FC<FooterProps> = ({ locale = "it" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container size="lg" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Info Residence */}
          <div>
            <h3 className="text-white font-display text-xl font-bold mb-4">
              Residence Le Farfalle
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              {siteConfig.description[locale as keyof typeof siteConfig.description] ||
                siteConfig.description.it}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contacts.phone}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {siteConfig.contacts.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {siteConfig.contacts.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              {navigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href === "/" ? "" : item.href}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informazioni</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="hover:text-primary-400 transition-colors"
                >
                  Termini e Condizioni
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cookie`}
                  className="hover:text-primary-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Seguici</h4>
            <div className="flex gap-4 mb-6">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-primary-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-primary-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.tripadvisor && (
                <a
                  href={siteConfig.social.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-primary-500 transition-colors"
                  aria-label="TripAdvisor"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
            {/* Newsletter placeholder */}
            <div className="text-sm">
              <p className="mb-2">Resta aggiornato</p>
              <p className="text-neutral-500 text-xs">
                Newsletter in arrivo
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
          <p>
            © {currentYear} Residence Le Farfalle. Tutti i diritti riservati.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

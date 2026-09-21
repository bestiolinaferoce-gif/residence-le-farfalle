import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/lib/i18n";

/**
 * "/" e i percorsi senza lingua reindirizzano (307) alla lingua del browser,
 * con italiano come ripiego: ogni lingua resta su un URL stabile /it, /en, /de.
 * Gli hreflang sono emessi solo nell'HTML (src/lib/seo.ts): l'header `Link`
 * di next-intl dichiarava un x-default diverso e creava segnali contrastanti.
 */
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
  alternateLinks: false,
});

export const config = {
  matcher: [
    // Tutto tranne /api, /_next, /_vercel e i file con estensione.
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
  ],
};

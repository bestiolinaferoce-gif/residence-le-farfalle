import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  // Assicura che / reindirizzi a /it
  localeDetection: true,
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Match root path
    "/",
  ],
};

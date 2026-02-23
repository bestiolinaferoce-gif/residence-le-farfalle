import { getRequestConfig } from "next-intl/server";
import { locales } from "./lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  // Validazione locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    locale = "it";
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

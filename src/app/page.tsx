import { redirect } from "next/navigation";
import { defaultLocale } from "@/src/lib/i18n";

/**
 * Root page che reindirizza alla homepage localizzata
 * Il middleware gestisce il routing multilingua, ma questa pagina
 * assicura che / reindirizzi sempre a /it (o lingua default)
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}

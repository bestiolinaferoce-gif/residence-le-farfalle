import { notFound } from "next/navigation";

/** Qualsiasi percorso sconosciuto sotto una lingua mostra la 404 localizzata (stato 404, noindex). */
export default function CatchAllPage() {
  notFound();
}

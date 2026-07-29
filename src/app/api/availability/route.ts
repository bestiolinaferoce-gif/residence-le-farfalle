import { NextRequest, NextResponse } from "next/server";
import { getAvailability, nightsBetween } from "@/src/lib/availability";

export const dynamic = "force-dynamic";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NIGHTS = 60;

/**
 * Disponibilità per un intervallo di date.
 *
 * Restituisce solo gli slug delle camere libere: il feed del gestionale contiene
 * nomi degli ospiti e importi, che non escono mai da questa rotta.
 */
export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from")?.trim() ?? "";
  const to = req.nextUrl.searchParams.get("to")?.trim() ?? "";

  if (!ISO_DATE.test(from) || !ISO_DATE.test(to)) {
    return NextResponse.json(
      { ok: false, error: "Date non valide: atteso formato YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const nights = nightsBetween(from, to);
  if (nights < 1) {
    return NextResponse.json(
      { ok: false, error: "La data di partenza deve essere successiva a quella di arrivo." },
      { status: 400 }
    );
  }
  if (nights > MAX_NIGHTS) {
    return NextResponse.json(
      { ok: false, error: `Intervallo troppo ampio: massimo ${MAX_NIGHTS} notti.` },
      { status: 400 }
    );
  }

  const result = await getAvailability(from, to);

  return NextResponse.json(
    { ok: true, ...result },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/src/config/site";
import { rooms as roomData } from "@/src/data/rooms/rooms";
import { coerceStayRequest, nightsBetween, validateStayRequest, type StayRequest } from "@/src/lib/stay-request";

export const dynamic = "force-dynamic";

/**
 * Richieste di soggiorno e messaggi.
 *
 * Regole:
 * - "ok" solo se almeno un canale di consegna (email Resend o webhook n8n) ha
 *   confermato. Prima, senza chiave Resend, la rotta rispondeva ok e scriveva
 *   la richiesta nei log: l'ospite vedeva "Richiesta inviata" e nessuno la riceveva.
 * - CONTACT_DRY_RUN=1: valida tutto ma non invia nulla (ambienti di test/anteprima).
 * - Nei log mai dati personali: solo codici di errore.
 */

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 2_500;
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;

// Limite best-effort per istanza serverless: ferma raffiche, non attacchi distribuiti.
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_MAX;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // alcuni client non lo inviano: il resto dei controlli resta valido
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function emailHtml(r: StayRequest) {
  const roomName = r.room ? roomData.find((x) => x.slug === r.room)?.name.it ?? r.room : "Nessuna preferenza";
  const nights = r.checkIn && r.checkOut ? nightsBetween(r.checkIn, r.checkOut) : 0;
  const rows: [string, string][] = [
    ["Tipo", r.type === "preventivo" ? "Richiesta disponibilità" : "Messaggio"],
    ["Lingua del sito", r.locale.toUpperCase()],
    ["Nome", r.name],
    ["Email", r.email],
    ["Telefono", r.phone || "—"],
    ["Contatto preferito", r.preferredContact],
  ];
  if (r.type === "preventivo") {
    rows.push(
      ["Arrivo", r.checkIn],
      ["Partenza", `${r.checkOut} (${nights} ${nights === 1 ? "notte" : "notti"})`],
      ["Ospiti", String(r.guests)],
      ["Camere", String(r.rooms)],
      ["Camera preferita", roomName]
    );
  }
  const table = rows
    .map(([k, v]) => `<tr><td style="padding:6px 8px;font-weight:bold">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("");
  const msg = r.message.trim() ? escapeHtml(r.message).replaceAll("\n", "<br/>") : "<em>(nessun messaggio)</em>";
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
    <h2 style="color:#92400e">Residence Le Farfalle — nuova richiesta dal sito</h2>
    <table style="width:100%;border-collapse:collapse">${table}</table>
    <p><strong>Messaggio</strong></p>
    <p style="background:#f5f5f4;padding:12px;border-radius:8px">${msg}</p>
    <p style="font-size:12px;color:#57534e">Rispondi direttamente a questa email per scrivere all'ospite.</p>
  </div>`;
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ ok: false, error: "forbidden" }, 403);
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // Antispam 1: campo esca invisibile agli utenti. Antispam 2: invio troppo rapido.
  // Ai bot rispondiamo "ok" senza inviare nulla, così non imparano il filtro.
  const honeypot = typeof body.website === "string" && body.website.trim() !== "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  const tooFast = !startedAt || Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    console.warn("[contact] scartata come spam", { honeypot, tooFast });
    return json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  const request = coerceStayRequest(body);
  // Un giorno di tolleranza: il visitatore può essere in un fuso orario "indietro" rispetto a UTC.
  const today = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const fields = validateStayRequest(request, today);
  if (Object.keys(fields).length > 0) return json({ ok: false, error: "validation", fields }, 422);

  if (process.env.CONTACT_DRY_RUN === "1") {
    return json({ ok: true, dryRun: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!apiKey && !webhookUrl) {
    console.error("[contact] nessun canale di consegna configurato (RESEND_API_KEY / N8N_WEBHOOK_URL)");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  let delivered = false;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const subject =
        request.type === "preventivo"
          ? `Richiesta disponibilità ${request.checkIn} → ${request.checkOut} · ${request.guests} ospiti`
          : "Nuovo messaggio dal sito";
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM || "Residence Le Farfalle <onboarding@resend.dev>",
        to: process.env.HOST_EMAIL || siteConfig.contacts.email,
        replyTo: request.email.trim(),
        subject,
        html: emailHtml(request),
      });
      if (error) console.error("[contact][resend]", error.name);
      else delivered = true;
    } catch (err) {
      console.error("[contact][resend] eccezione", err instanceof Error ? err.name : "unknown");
    }
  }

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET ?? "",
        },
        body: JSON.stringify({
          name: request.name,
          email: request.email,
          phone: request.phone,
          property: "residence-le-farfalle",
          checkin: request.checkIn,
          checkout: request.checkOut,
          guests: request.guests,
          rooms: request.rooms,
          lodge: request.room,
          message: request.message,
          locale: request.locale,
          source: "website-form",
        }),
        signal: AbortSignal.timeout(8_000),
      });
      if (res.ok) delivered = true;
      else console.error("[contact][n8n] status", res.status);
    } catch (err) {
      console.error("[contact][n8n] eccezione", err instanceof Error ? err.name : "unknown");
    }
  }

  return delivered ? json({ ok: true }) : json({ ok: false, error: "delivery_failed" }, 502);
}

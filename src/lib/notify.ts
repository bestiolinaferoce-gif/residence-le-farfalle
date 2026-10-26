/**
 * Notifiche istantanee al gestore per ogni richiesta dal sito.
 *
 * Canali (ognuno si attiva solo se le sue variabili d'ambiente sono presenti):
 * - WhatsApp automatico via CallMeBot: CALLMEBOT_WHATSAPP = "393245852358:APIKEY"
 *   (più destinatari separati da virgola). La chiave la ottiene il destinatario
 *   scrivendo al bot CallMeBot dal proprio WhatsApp.
 * - Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_IDS (chat id separati da virgola).
 *
 * Nei log mai dati personali: solo esito per canale.
 */
import { rooms as roomData } from "@/src/data/rooms/rooms";
import { nightsBetween, type StayRequest } from "@/src/lib/stay-request";

const TIMEOUT_MS = 8_000;

const list = (v: string | undefined) =>
  (v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** Testo breve per WhatsApp/Telegram, sempre in italiano (lo legge il gestore). */
export function notificationText(r: StayRequest): string {
  const roomName = r.room ? roomData.find((x) => x.slug === r.room)?.name.it ?? r.room : "Nessuna preferenza";
  const lines: string[] = [
    r.type === "preventivo" ? "🦋 NUOVA RICHIESTA DI SOGGIORNO – Residence Le Farfalle" : "🦋 NUOVO MESSAGGIO DAL SITO – Residence Le Farfalle",
    "",
    `Nome: ${r.name.trim()}`,
  ];
  if (r.type === "preventivo") {
    const nights = r.checkIn && r.checkOut ? nightsBetween(r.checkIn, r.checkOut) : 0;
    lines.push(
      `Date: ${r.checkIn} → ${r.checkOut} (${nights} ${nights === 1 ? "notte" : "notti"})`,
      `Ospiti: ${r.guests} · Camere: ${r.rooms}`,
      `Camera preferita: ${roomName}`
    );
  }
  lines.push(`Telefono: ${r.phone.trim() || "—"}`, `Email: ${r.email.trim()}`, `Contatto preferito: ${r.preferredContact}`, `Lingua: ${r.locale.toUpperCase()}`);
  if (r.message.trim()) lines.push("", `Messaggio: ${r.message.trim()}`);
  return lines.join("\n");
}

async function sendCallMeBot(text: string): Promise<boolean[]> {
  const targets = list(process.env.CALLMEBOT_WHATSAPP);
  return Promise.all(
    targets.map(async (t) => {
      const [phone, apikey] = t.split(":").map((s) => s.trim());
      if (!phone || !apikey) return false;
      try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
        const body = await res.text();
        const ok = res.ok && !/error|invalid|not\s+activated/i.test(body);
        if (!ok) console.error("[notify][whatsapp] esito negativo", res.status);
        return ok;
      } catch (err) {
        console.error("[notify][whatsapp] eccezione", err instanceof Error ? err.name : "unknown");
        return false;
      }
    })
  );
}

async function sendTelegram(text: string): Promise<boolean[]> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chats = list(process.env.TELEGRAM_CHAT_IDS);
  if (!token) return [];
  return Promise.all(
    chats.map(async (chatId) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!res.ok) console.error("[notify][telegram] status", res.status);
        return res.ok;
      } catch (err) {
        console.error("[notify][telegram] eccezione", err instanceof Error ? err.name : "unknown");
        return false;
      }
    })
  );
}

/** Invia WhatsApp e Telegram in parallelo; restituisce quanti invii sono riusciti. */
export async function notifyManager(r: StayRequest): Promise<{ whatsapp: number; telegram: number }> {
  const text = notificationText(r);
  const [wa, tg] = await Promise.all([sendCallMeBot(text), sendTelegram(text)]);
  const result = { whatsapp: wa.filter(Boolean).length, telegram: tg.filter(Boolean).length };
  console.info("[notify] esito", result);
  return result;
}

/**
 * Destinatari email: HOST_EMAIL (o, se assente, la casella ufficiale del sito)
 * più eventuali NOTIFY_EMAILS, tutti separabili da virgola.
 */
export function emailRecipients(fallback: string): string[] {
  const base = list(process.env.HOST_EMAIL);
  const all = [...(base.length ? base : [fallback]), ...list(process.env.NOTIFY_EMAILS)];
  return [...new Set(all.map((e) => e.toLowerCase()))];
}

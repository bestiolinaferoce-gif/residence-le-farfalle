import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/src/config/site";

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, checkIn, checkOut, guests, rooms, message, type, preferredContact } =
      body;

    // Validazione base
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safePhone = phone ? escapeHtml(String(phone)) : "";
    const safeMessage = escapeHtml(String(message)).replaceAll("\n", "<br/>");

    const apiKey = process.env.RESEND_API_KEY;
    const hostEmail = process.env.HOST_EMAIL || siteConfig.contacts.email;
    const fromAddress =
      process.env.RESEND_FROM || "Residence Le Farfalle <onboarding@resend.dev>";

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      const subject =
        type === "preventivo"
          ? `🦋 Richiesta preventivo - ${name} (${checkIn} → ${checkOut})`
          : `📩 Nuovo messaggio da ${name}`;

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">🦋 Residence Le Farfalle</h2>
          <h3>${escapeHtml(subject)}</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Nome:</td><td>${safeName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${safeEmail}</td></tr>
            ${safePhone ? `<tr><td style="padding: 8px; font-weight: bold;">Telefono:</td><td>${safePhone}</td></tr>` : ""}
            ${checkIn ? `<tr><td style="padding: 8px; font-weight: bold;">Check-in:</td><td>${escapeHtml(String(checkIn))}</td></tr>` : ""}
            ${checkOut ? `<tr><td style="padding: 8px; font-weight: bold;">Check-out:</td><td>${escapeHtml(String(checkOut))}</td></tr>` : ""}
            ${guests ? `<tr><td style="padding: 8px; font-weight: bold;">Ospiti:</td><td>${escapeHtml(String(guests))}</td></tr>` : ""}
            ${rooms ? `<tr><td style="padding: 8px; font-weight: bold;">Camera:</td><td>${escapeHtml(String(rooms))}</td></tr>` : ""}
            ${preferredContact ? `<tr><td style="padding: 8px; font-weight: bold;">Contatto preferito:</td><td>${escapeHtml(String(preferredContact))}</td></tr>` : ""}
          </table>
          <p><strong>Messaggio:</strong></p>
          <p style="background:#f5f5f4; padding: 12px; border-radius: 8px;">${safeMessage}</p>
        </div>
      `;

      await resend.emails.send({
        from: fromAddress,
        to: hostEmail,
        replyTo: String(email),
        subject,
        html: htmlContent,
      });
    } else {
      console.log("[contact] Nuovo messaggio:", { name, email, type, message });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET ?? "";

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-secret": webhookSecret,
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone ?? "",
          property: "residence-le-farfalle",
          checkin: checkIn ?? "",
          checkout: checkOut ?? "",
          guests: guests ?? 2,
          lodge: rooms ?? "",
          message,
          source: "website-form",
        }),
      }).catch((error) => {
        console.error("[contact][n8n]", error);
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

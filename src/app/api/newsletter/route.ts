import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/src/config/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const hostEmail = process.env.HOST_EMAIL || siteConfig.contacts.email;
    const fromAddress =
      process.env.RESEND_FROM || "Residence Le Farfalle <onboarding@resend.dev>";

    if (!apiKey) {
      console.log("[newsletter] Nuova iscrizione (no RESEND_API_KEY):", email);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    if (audienceId) {
      const { error } = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
      if (error) {
        console.error("[newsletter][resend-audience]", error);
        return NextResponse.json({ error: "Errore iscrizione" }, { status: 500 });
      }
    } else {
      const safeEmail = escapeHtml(email);
      await resend.emails.send({
        from: fromAddress,
        to: hostEmail,
        subject: `📬 Nuova iscrizione newsletter — ${email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color:#0d9488;">🦋 Residence Le Farfalle</h2>
            <p>Nuova iscrizione alla newsletter:</p>
            <p><strong>${safeEmail}</strong></p>
            <p style="font-size:12px;color:#666;">
              RESEND_AUDIENCE_ID non configurato: salva manualmente il contatto
              o imposta la variabile su Vercel per registrazione automatica.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

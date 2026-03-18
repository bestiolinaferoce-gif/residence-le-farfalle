import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, checkIn, checkOut, guests, rooms, message, type } = body;

    // Validazione base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 }
      );
    }

    // Se RESEND_API_KEY è configurata, invia email
    const apiKey = process.env.RESEND_API_KEY;
    const hostEmail =
      process.env.HOST_EMAIL || "info@residencelefarfalle.it";

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
          <h3>${subject}</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Nome:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">Telefono:</td><td>${phone}</td></tr>` : ""}
            ${checkIn ? `<tr><td style="padding: 8px; font-weight: bold;">Check-in:</td><td>${checkIn}</td></tr>` : ""}
            ${checkOut ? `<tr><td style="padding: 8px; font-weight: bold;">Check-out:</td><td>${checkOut}</td></tr>` : ""}
            ${guests ? `<tr><td style="padding: 8px; font-weight: bold;">Ospiti:</td><td>${guests}</td></tr>` : ""}
            ${rooms ? `<tr><td style="padding: 8px; font-weight: bold;">Camera:</td><td>${rooms}</td></tr>` : ""}
          </table>
          <p><strong>Messaggio:</strong></p>
          <p style="background:#f5f5f4; padding: 12px; border-radius: 8px;">${message}</p>
        </div>
      `;

      await resend.emails.send({
        from: "Le Farfalle <noreply@residencelefarfalle.it>",
        to: hostEmail,
        replyTo: email,
        subject,
        html: htmlContent,
      });
    } else {
      // Fallback: log in console (utile in sviluppo senza RESEND configurato)
      console.log("[contact] Nuovo messaggio:", { name, email, type, message });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

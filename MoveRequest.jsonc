Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, phone, move_type, move_date, details, origin, destination } = body;

    const typeLabels = {
      residential: "Residential / Résidentiel",
      commercial: "Commercial",
      long_distance: "Long Distance / Longue distance",
      storage: "Storage / Entreposage",
    };

    const rows = [
      phone ? `📞 Phone: ${phone}` : null,
      email ? `📧 Email: ${email}` : null,
      move_type ? `📦 Type: ${typeLabels[move_type] || move_type}` : null,
      move_date ? `📅 Date: ${move_date}` : null,
      origin ? `📍 From: ${origin}` : null,
      destination ? `📍 To: ${destination}` : null,
      details ? `📝 Details: ${details}` : null,
    ].filter(Boolean);

    const htmlRows = rows.map(r => `<li style="margin:6px 0;">${r}</li>`).join("");

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#f0f0f0;padding:32px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:28px;">🚚</span>
          <h2 style="color:#FF4F00;margin:8px 0;font-size:22px;text-transform:uppercase;letter-spacing:2px;">New Move Request</h2>
          <p style="color:#888;font-size:12px;margin:0;">Kostas Déménagement — MovePlanner</p>
        </div>
        <div style="background:#111827;border-radius:8px;padding:20px;margin-bottom:16px;">
          <p style="color:#FF4F00;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Client: <span style="color:#fff;font-size:16px;">${name}</span></p>
          <ul style="list-style:none;padding:0;margin:0;color:#ccc;font-size:14px;">
            ${htmlRows}
          </ul>
        </div>
        <div style="text-align:center;margin-top:20px;">
          <a href="https://kostasmoving.ca/admin" style="background:#FF4F00;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:bold;letter-spacing:1px;">View in Admin Panel →</a>
        </div>
        <p style="text-align:center;color:#444;font-size:11px;margin-top:24px;">Kostas Déménagement • Montréal, QC</p>
      </div>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Kostas MovePlanner", email: "beugyl@gmail.com" },
        to: [{ email: "beugyl@gmail.com" }],
        subject: `🚚 New Move Request — ${name}`,
        htmlContent: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Brevo error: ${res.status} - ${errorBody}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
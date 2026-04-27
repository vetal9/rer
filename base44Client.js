import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, phone, move_type, move_date, details, origin, destination } = body;

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

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

    // Send confirmation email to customer
    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#060b18;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#FF4F00,#cc3f00);border-radius:16px;padding:14px 20px;margin-bottom:20px;">
        <span style="font-size:32px;">🚚</span>
      </div>
      <h1 style="color:#ffffff;font-size:24px;font-weight:900;margin:0 0 6px;letter-spacing:2px;text-transform:uppercase;">Kostas Déménagement</h1>
      <p style="color:#4a6080;font-size:12px;margin:0;letter-spacing:3px;text-transform:uppercase;">Move Confirmed / Déménagement Confirmé</p>
    </div>

    <div style="background:#0d1630;border:1px solid #FF4F0022;border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="background:linear-gradient(135deg,#FF4F0018,#0d1630);padding:14px 20px;border-bottom:1px solid #1e2a45;margin:-24px -24px 20px;">
        <p style="color:#FF4F00;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;font-weight:700;">✅ Request Received</p>
      </div>
      <p style="color:#ffffff;font-size:17px;font-weight:700;margin:0 0 10px;">Hello ${name}! 👋</p>
      <p style="color:#7a90b0;font-size:14px;line-height:1.7;margin:0;">Thank you for choosing <strong style="color:#FF4F00;">Kostas Déménagement</strong>. We've received your move request and our team will review it shortly.</p>
    </div>

    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;overflow:hidden;margin-bottom:24px;">
      <div style="background:linear-gradient(135deg,#FF4F0018,#0d1630);padding:14px 20px;border-bottom:1px solid #1e2a45;">
        <p style="color:#FF4F00;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;font-weight:700;">📋 Your Details</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${move_type ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#8899bb;font-size:12px;white-space:nowrap;">📦 Type</td><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#e0e8ff;font-size:13px;">${typeLabels[move_type] || move_type}</td></tr>` : ''}
        ${move_date ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#8899bb;font-size:12px;white-space:nowrap;">📅 Date</td><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#e0e8ff;font-size:13px;">${move_date}</td></tr>` : ''}
        ${origin ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#8899bb;font-size:12px;white-space:nowrap;">📍 From</td><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#e0e8ff;font-size:13px;">${origin}</td></tr>` : ''}
        ${destination ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#8899bb;font-size:12px;white-space:nowrap;">🏁 To</td><td style="padding:10px 16px;color:#e0e8ff;font-size:13px;">${destination}</td></tr>` : ''}
      </table>
    </div>

    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
        <div style="background:#FF4F0018;border:1px solid #FF4F0033;border-radius:50%;min-width:28px;height:28px;font-size:12px;font-weight:700;color:#FF4F00;text-align:center;line-height:28px;">1</div>
        <div>
          <p style="color:#e0e8ff;font-size:13px;font-weight:600;margin:0 0 2px;">Team Review</p>
          <p style="color:#4a6080;font-size:12px;margin:0;">Within 2 hours</p>
        </div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <div style="background:#FF4F0018;border:1px solid #FF4F0033;border-radius:50%;min-width:28px;height:28px;font-size:12px;font-weight:700;color:#FF4F00;text-align:center;line-height:28px;">2</div>
        <div>
          <p style="color:#e0e8ff;font-size:13px;font-weight:600;margin:0 0 2px;">Free Quote</p>
          <p style="color:#4a6080;font-size:12px;margin:0;">Detailed proposal with transparent pricing</p>
        </div>
      </div>
    </div>

    <div style="background:linear-gradient(135deg,#FF4F0012,#0d1225);border:1px solid #FF4F0022;border-radius:16px;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <p style="color:#4a6080;font-size:11px;margin:0 0 8px;">Questions?</p>
      <a href="tel:5148850785" style="color:#FF4F00;font-size:20px;font-weight:900;text-decoration:none;">514-885-0785</a>
      <p style="color:#4a6080;font-size:11px;margin:8px 0 0;">Mon–Sun 9:00 AM – 9:00 PM</p>
    </div>

    <div style="text-align:center;padding-top:16px;border-top:1px solid #1e2a45;">
      <p style="color:#2a3a55;font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase;">Kostas Déménagement</p>
      <p style="color:#1e2a45;font-size:10px;margin:0;">Montréal, QC • kostasmoving.ca</p>
    </div>
  </div>
</body>
</html>
    `;

    const clientRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Kostas Déménagement", email: "beugyl@gmail.com" },
        to: [{ email: email }],
        subject: `✅ Move Request Received — Kostas Déménagement`,
        htmlContent: clientHtml,
      }),
    });

    if (!clientRes.ok) {
      const errorBody = await clientRes.text();
      throw new Error(`Brevo client email error: ${clientRes.status} - ${errorBody}`);
    }

    return Response.json({ ok: true, message: 'Request submitted and confirmation sent' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
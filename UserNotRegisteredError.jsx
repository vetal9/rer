Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, phone, move_type, move_date, details, origin, destination, estimated_price, status } = body;

    if (!email) {
      return Response.json({ error: "No client email provided" }, { status: 400 });
    }

    const typeLabels = {
      residential: "Residential / Résidentiel",
      commercial: "Commercial",
      long_distance: "Long Distance / Longue distance",
      storage: "Storage / Entreposage",
    };

    const statusLabels = {
      new: "Received / Reçu",
      confirmed: "Confirmed / Confirmé",
      in_progress: "In Progress / En cours",
      completed: "Completed / Terminé",
    };

    const infoRows = [
      move_type ? { icon: "📦", label: "Move Type", value: typeLabels[move_type] || move_type } : null,
      move_date ? { icon: "📅", label: "Preferred Date", value: move_date } : null,
      phone ? { icon: "📞", label: "Phone", value: phone } : null,
      origin ? { icon: "📍", label: "From", value: origin } : null,
      destination ? { icon: "🏁", label: "To", value: destination } : null,
      estimated_price ? { icon: "💰", label: "Estimated Price", value: `$${Number(estimated_price).toLocaleString()} CAD` } : null,
      details ? { icon: "📝", label: "Details", value: details } : null,
    ].filter(Boolean);

    const rowsHtml = infoRows.map(r => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#8899bb;font-size:12px;white-space:nowrap;">
          ${r.icon} ${r.label}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #1e2a45;color:#e0e8ff;font-size:13px;">
          ${r.value}
        </td>
      </tr>
    `).join("");

    const currentStatusEN = { new: "Received", confirmed: "Confirmed", in_progress: "In Progress", completed: "Completed" }[status] || "Received";
    const currentStatusFR = { new: "Reçu", confirmed: "Confirmé", in_progress: "En cours", completed: "Terminé" }[status] || "Reçu";
    const statusColor = status === "confirmed" ? "#34d399" : status === "completed" ? "#c084fc" : "#FF4F00";

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Language" content="en"></head>
<body style="margin:0;padding:0;background:#060b18;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#FF4F00,#cc3f00);border-radius:16px;padding:14px 20px;margin-bottom:20px;">
        <span style="font-size:32px;">🚚</span>
      </div>
      <h1 style="color:#ffffff;font-size:24px;font-weight:900;margin:0 0 6px;letter-spacing:2px;text-transform:uppercase;">
        Kostas Déménagement
      </h1>
      <p style="color:#4a6080;font-size:12px;margin:0;letter-spacing:3px;text-transform:uppercase;">Moving Confirmation • Confirmation de déménagement</p>
    </div>

    <!-- Status Banner -->
    <div style="background:linear-gradient(135deg,#0d1630,#111e3a);border:1px solid ${statusColor}33;border-radius:16px;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <p style="color:#4a6080;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Status / Statut</p>
      <div style="display:inline-block;background:${statusColor}18;border:1px solid ${statusColor}44;border-radius:24px;padding:8px 24px;">
        <span style="color:${statusColor};font-size:14px;font-weight:700;letter-spacing:1px;">${currentStatusEN} / ${currentStatusFR}</span>
      </div>
    </div>

    <!-- Greeting EN -->
    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;padding:24px;margin-bottom:16px;">
      <p style="color:#FF4F00;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;font-weight:700;">🇨🇦 English</p>
      <h2 style="color:#ffffff;font-size:17px;font-weight:700;margin:0 0 10px;">Hello, ${name}! 👋</h2>
      <p style="color:#7a90b0;font-size:14px;line-height:1.7;margin:0;">
        Thank you for choosing <strong style="color:#FF4F00;">Kostas Déménagement</strong>. We have received your move request and our team will contact you shortly to confirm all the details and provide a free quote.
      </p>
    </div>

    <!-- Greeting FR -->
    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="color:#FF4F00;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;font-weight:700;">🇫🇷 Français</p>
      <h2 style="color:#ffffff;font-size:17px;font-weight:700;margin:0 0 10px;">Bonjour, ${name}! 👋</h2>
      <p style="color:#7a90b0;font-size:14px;line-height:1.7;margin:0;">
        Merci de choisir <strong style="color:#FF4F00;">Kostas Déménagement</strong>. Nous avons bien reçu votre demande de déménagement et notre équipe vous contactera sous peu pour confirmer tous les détails et vous fournir une soumission gratuite.
      </p>
    </div>

    <!-- Request Details -->
    ${infoRows.length > 0 ? `
    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;overflow:hidden;margin-bottom:24px;">
      <div style="background:linear-gradient(135deg,#FF4F0018,#0d1630);padding:14px 20px;border-bottom:1px solid #1e2a45;">
        <p style="color:#FF4F00;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;font-weight:700;">📋 Your Request / Votre demande</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${rowsHtml}
      </table>
    </div>
    ` : ""}

    <!-- What's next - bilingual -->
    <div style="background:#0d1630;border:1px solid #1e2a45;border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="color:#FF4F00;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;font-weight:700;">⚡ Next Steps / Prochaines étapes</p>

      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
        <div style="background:#FF4F0018;border:1px solid #FF4F0033;border-radius:50%;min-width:28px;height:28px;font-size:12px;font-weight:700;color:#FF4F00;text-align:center;line-height:28px;">1</div>
        <div>
          <p style="color:#e0e8ff;font-size:13px;font-weight:600;margin:0 0 2px;">Team review / Révision par notre équipe</p>
          <p style="color:#4a6080;font-size:12px;margin:0;">Within 2 hours · Dans les 2 heures</p>
        </div>
      </div>

      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
        <div style="background:#FF4F0018;border:1px solid #FF4F0033;border-radius:50%;min-width:28px;height:28px;font-size:12px;font-weight:700;color:#FF4F00;text-align:center;line-height:28px;">2</div>
        <div>
          <p style="color:#e0e8ff;font-size:13px;font-weight:600;margin:0 0 2px;">Free detailed quote / Soumission gratuite détaillée</p>
          <p style="color:#4a6080;font-size:12px;margin:0;">Transparent pricing · Tarification transparente</p>
        </div>
      </div>

      <div style="display:flex;align-items:flex-start;gap:12px;">
        <div style="background:#FF4F0018;border:1px solid #FF4F0033;border-radius:50%;min-width:28px;height:28px;font-size:12px;font-weight:700;color:#FF4F00;text-align:center;line-height:28px;">3</div>
        <div>
          <p style="color:#e0e8ff;font-size:13px;font-weight:600;margin:0 0 2px;">Move day — stress-free! / Jour J — sans stress!</p>
          <p style="color:#4a6080;font-size:12px;margin:0;">Our crew handles everything · Notre équipe s'occupe de tout</p>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div style="background:linear-gradient(135deg,#FF4F0012,#0d1225);border:1px solid #FF4F0022;border-radius:16px;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <p style="color:#7a90b0;font-size:12px;margin:0 0 4px;">Questions? / Des questions?</p>
      <p style="color:#4a6080;font-size:11px;margin:0 0 10px;">Reach us anytime · Contactez-nous en tout temps</p>
      <a href="tel:5148850785" style="color:#FF4F00;font-size:22px;font-weight:900;text-decoration:none;letter-spacing:1px;">514-885-0785</a>
      <p style="color:#4a6080;font-size:11px;margin:8px 0 0;">Lun–Dim / Mon–Sun · 9:00 AM – 9:00 PM</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:16px;border-top:1px solid #1e2a45;">
      <p style="color:#2a3a55;font-size:11px;margin:0 0 4px;letter-spacing:2px;text-transform:uppercase;">Kostas Déménagement</p>
      <p style="color:#1e2a45;font-size:10px;margin:0;">Montréal, QC • kostasmoving.ca</p>
    </div>

  </div>
</body>
</html>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Kostas Déménagement", email: "beugyl@gmail.com" },
        to: [{ email: email }],
        subject: `✅ Move Request Confirmed / Demande confirmée — Kostas Déménagement`,
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
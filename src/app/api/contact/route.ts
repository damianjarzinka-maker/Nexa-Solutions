import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(value: unknown): string {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, service, message } = body ?? {};

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !/.+@.+\..+/.test(email) ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "invalid" },
        { status: 400 },
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 16px;">Neue Anfrage über epos-solutions.de</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: bold; background: #fafafa; width: 140px;">Name</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${esc(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: bold; background: #fafafa;">Unternehmen</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${esc(company) || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: bold; background: #fafafa;">E-Mail</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${esc(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: bold; background: #fafafa;">Leistung</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${esc(service) || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: bold; background: #fafafa; vertical-align: top;">Nachricht</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; white-space: pre-wrap;">${esc(message)}</td>
          </tr>
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "damian.jarzinka@gmail.com",
      replyTo: email,
      subject: `Neue Anfrage von ${name} – Epos Solutions`,
      html,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

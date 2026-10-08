import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Keep in sync with SERVICES in components/Contact.tsx.
const SERVICES = new Set([
  "Website",
  "Automatisierung",
  "Individuelle Software",
  "KI-Lösungen",
]);

// Keep in sync with the maxLength attributes in components/Contact.tsx.
const LIMITS = { name: 100, company: 150, email: 254, message: 5000 };

// Best-effort rate limit: max 5 requests per IP per 10 minutes. In-memory, so
// on Vercel it only holds per warm instance — a Vercel Firewall rule on
// /api/contact is the real guard; this just stops naive loops cheaply.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory under abuse
  return recent.length > MAX_PER_WINDOW;
}

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

const optionalString = (v: unknown, max: number) =>
  v === undefined || v === null || (typeof v === "string" && v.length <= max);

const invalid = () =>
  NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { name, company, email, service, message, website } = body ?? {};

    // Honeypot: the hidden "website" field is only ever filled by bots.
    // Pretend success so they don't adapt, but send nothing.
    if (typeof website === "string" && website.trim() !== "") {
      console.warn("[contact] honeypot triggered");
      return NextResponse.json({ ok: true });
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.length > LIMITS.name ||
      typeof email !== "string" ||
      email.length > LIMITS.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== "string" ||
      !message.trim() ||
      message.length > LIMITS.message ||
      !optionalString(company, LIMITS.company) ||
      (service !== undefined && !SERVICES.has(service))
    ) {
      return invalid();
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 16px;">Neue Anfrage über epossolutions.de</h2>
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

    // Header-safe name for the subject line: no line breaks, bounded length.
    const subjectName = name.replace(/[\r\n]+/g, " ").trim().slice(0, 80);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "damian.jarzinka@gmail.com",
      replyTo: email,
      subject: `Neue Anfrage von ${subjectName} – Epos Solutions`,
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

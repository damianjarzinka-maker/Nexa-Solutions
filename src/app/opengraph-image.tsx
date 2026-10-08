/**
 * Social preview image (WhatsApp, LinkedIn, Google …) — 1200×630, generated
 * at build time via the Next file convention. Twitter reuses it via
 * twitter-image.tsx.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Epos Solutions — Websites, Automatisierung, individuelle Software und KI-Lösungen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PILLARS = [
  "Websites",
  "Automatisierung",
  "Individuelle Software",
  "KI-Lösungen",
];

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/epos-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(61,77,232,0.45), rgba(8,8,8,0) 55%), #080808",
          color: "#ffffff",
        }}
      >
        {/* 2400×842 source → 2.85:1 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={342} height={120} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Digitale Lösungen, die Ihrem Betrieb Arbeit abnehmen.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 40,
            }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  fontSize: 26,
                  background: i === 0 ? "#3d4de8" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

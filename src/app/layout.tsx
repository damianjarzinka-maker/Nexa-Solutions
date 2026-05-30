import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Cormorant_Garamond } from "next/font/google";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexa Solutions — Webdesign, KI-Automatisierung, IT-Consulting",
  description:
    "Studio für Webdesign, KI-Automatisierung und IT-Consulting. Präzise digitale Systeme für Unternehmen in ganz Deutschland.",
  openGraph: {
    title: "Nexa Solutions",
    description:
      "Webdesign, KI-Automatisierung und IT-Consulting — präzise umgesetzt für Unternehmen in ganz Deutschland.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable} ${cormorant.variable}`}>
      <body className="bg-bg font-sans text-white antialiased">
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}

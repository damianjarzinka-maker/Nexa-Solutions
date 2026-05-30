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
  title: "Epos Solutions — Webdesign & KI-Automatisierung",
  description:
    "Epos Solutions entwickelt professionelle Websites, KI-Automatisierungen und digitale Infrastruktur für Unternehmen jeder Größe — deutschlandweit.",
  openGraph: {
    title: "Epos Solutions",
    description:
      "Epos Solutions entwickelt professionelle Websites, KI-Automatisierungen und digitale Infrastruktur für Unternehmen jeder Größe — deutschlandweit.",
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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

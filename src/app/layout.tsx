import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  DM_Serif_Display,
  Cormorant_Garamond,
  Geist,
  Instrument_Serif,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import { AnchorScroll } from "@/components/AnchorScroll";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Canonical production origin — single source of truth for metadata,
// robots.ts and sitemap.ts.
export const SITE_URL = "https://epossolutions.de";

const SITE_DESCRIPTION =
  "Epos Solutions entwickelt Websites, Automatisierungen, individuelle Software und KI-Lösungen für kleine und mittlere Unternehmen — aus Essen, deutschlandweit.";

// Structured data for Google (business identity). NAP mirrors the Impressum —
// keep both in sync. No phone number on purpose: there is no business line.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Epos Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/epos-logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  email: "damian.jarzinka@gmail.com",
  founder: { "@type": "Person", name: "Damian Jarzinka" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pookweg 70a",
    postalCode: "45147",
    addressLocality: "Essen",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsAbout: [
    "Websites",
    "Automatisierung",
    "Individuelle Software",
    "KI-Lösungen",
  ],
};

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

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-geist",
  display: "swap",
});

// Display serif for fancy italic accents (e.g. the "Ergebnisse" headline).
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Baskerville-style transitional serif — its italic has the decorative,
// swash-like letterforms of Bookmania/Baskerville Italic, licence-free.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Dirtyline 36daysoftype 2022 (Hendra Maulia / Dirtyline Studio) — free for
// personal & commercial use, self-hosted. Experimental display face: wild
// elaborate uppercase, cleaner lowercase.
const dirtyline = localFont({
  src: "../fonts/dirtyline-36daysoftype-2022.otf",
  variable: "--font-dirtyline",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Epos Solutions — Websites, Automatisierung & KI-Lösungen",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Epos Solutions — Websites, Automatisierung & KI-Lösungen",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Epos Solutions",
    locale: "de_DE",
    type: "website",
    // og:image / twitter:image come from app/opengraph-image.tsx and
    // app/twitter-image.tsx (Next file conventions).
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/es-favicon.png",
    shortcut: "/es-favicon.png",
    apple: "/es-favicon.png",
  },
};

export const viewport: Viewport = {
  // Matches the near-black page background so mobile browser chrome blends in.
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable} ${cormorant.variable} ${geist.variable} ${instrument.variable} ${playfair.variable} ${dirtyline.variable}`}>
      <body className="bg-bg font-sans text-white antialiased">
        <script
          type="application/ld+json"
          // Static object defined above — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScroll />
        <AnchorScroll />
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}

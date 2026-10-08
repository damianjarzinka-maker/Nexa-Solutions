import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";

// Custom 404 so Impressum/Datenschutz stay one click away (footer) even here.
export const metadata: Metadata = {
  title: "Seite nicht gefunden — Epos Solutions",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <LegalLayout title="Seite nicht gefunden">
      <p>Die aufgerufene Seite existiert nicht oder wurde verschoben.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white underline underline-offset-4 transition-colors hover:text-accent"
      >
        Zur Startseite
      </Link>
    </LegalLayout>
  );
}

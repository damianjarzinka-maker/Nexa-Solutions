import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum — Epos Solutions",
  description:
    "Impressum von Epos Solutions (Damian Jarzinka), Pookweg 70a, 45147 Essen — Angaben gemäß § 5 DDG.",
  // Own canonical — otherwise the root layout's "/" is inherited and Google
  // treats this page as a duplicate of the homepage.
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">
          Angaben gemäß § 5 DDG
        </h2>
        <p className="mt-4">
          Damian Jarzinka
          <br />
          handelnd unter „EPOS Solutions“
          <br />
          Pookweg 70a
          <br />
          45147 Essen
          <br />
          Deutschland
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">Kontakt</h2>
        <p className="mt-4">E-Mail: damian.jarzinka@gmail.com</p>
      </section>

      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">
          Umsatzsteuer-ID
        </h2>
        <p className="mt-4">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE461543310
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">Hinweis</h2>
        <p className="mt-4">Einzelunternehmen</p>
      </section>
    </LegalLayout>
  );
}

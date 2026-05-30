import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum — Nexa Solutions",
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">
          Angaben gemäß § 5 DDG
        </h2>
        <p className="mt-4">
          NEXA Solutions
          <br />
          Damian Jarzinka
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ] Essen
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">Kontakt</h2>
        <p className="mt-4">
          Telefon: [Telefonnummer]
          <br />
          E-Mail: info@nexa-solutions.de
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl tracking-tight text-white">
          Umsatzsteuer-ID
        </h2>
        <p className="mt-4">
          Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer
          berechnet.
          <br />
          USt-IdNr. (nur für EU-Geschäfte / Reverse Charge): DE461543310
        </p>
      </section>
    </LegalLayout>
  );
}

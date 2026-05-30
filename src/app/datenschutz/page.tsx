import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Nexa Solutions",
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          1. Datenschutz auf einen Blick
        </h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              Allgemeine Hinweise
            </h3>
            <p className="mt-3">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              Datenerfassung auf dieser Website
            </h3>
            <p className="mt-3">
              Die Datenverarbeitung erfolgt durch den Websitebetreiber.
              Kontaktdaten siehe Impressum.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p className="mt-3">
              Ihre Daten werden erhoben, wenn Sie uns diese mitteilen — z. B.
              über das Kontaktformular. Andere Daten werden automatisch beim
              Besuch der Website erfasst (z. B. Browser, Betriebssystem,
              Uhrzeit).
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              Wofür nutzen wir Ihre Daten?
            </h3>
            <p className="mt-3">
              Zur fehlerfreien Bereitstellung der Website sowie zur Beantwortung
              von Anfragen.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              Welche Rechte haben Sie?
            </h3>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer
              gespeicherten Daten sowie auf Widerruf einer erteilten
              Einwilligung. Wenden Sie sich dazu jederzeit an uns.
            </p>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}

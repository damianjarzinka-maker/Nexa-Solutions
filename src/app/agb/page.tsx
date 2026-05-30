import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "AGB — Epos Solutions",
};

export default function AGBPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          1. Geltungsbereich
        </h2>
        <p className="mt-4">
          Diese AGB gelten für alle Verträge zwischen Damian Jarzinka, EPOS
          Solutions, Pookweg 70a, 45147 Essen, Deutschland (nachfolgend
          „Auftragnehmer“) und seinen Kunden (nachfolgend „Auftraggeber“) über
          Dienstleistungen im Bereich Webdesign, Webentwicklung und digitale
          Dienstleistungen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          2. Vertragsgegenstand
        </h2>
        <p className="mt-4">
          Der Auftragnehmer erbringt Dienstleistungen im Bereich der
          Erstellung, Gestaltung und Entwicklung von Websites, Landingpages und
          digitalen Anwendungen. Der konkrete Leistungsumfang ergibt sich aus
          dem jeweiligen individuellen Angebot oder der schriftlichen
          Vereinbarung.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          3. Leistungsumfang und Änderungen
        </h2>
        <div className="mt-4 space-y-3">
          <p>(1) Der Leistungsumfang wird individuell vereinbart.</p>
          <p>
            (2) Nachträgliche Änderungswünsche sind möglich, können jedoch zu
            zusätzlichem Aufwand und gesonderter Vergütung führen.
          </p>
          <p>
            (3) Der Auftragnehmer ist berechtigt, notwendige Anpassungen
            vorzunehmen, sofern diese zur Erfüllung des Vertragszwecks
            erforderlich sind.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          4. Vergütung und Zahlungsbedingungen
        </h2>
        <div className="mt-4 space-y-3">
          <p>(1) Die Vergütung ergibt sich aus dem jeweiligen Angebot.</p>
          <p>
            (2) Sofern nicht anders vereinbart: 50 % Anzahlung bei
            Auftragserteilung, 50 % nach Fertigstellung und Abnahme.
          </p>
          <p>(3) Rechnungen sind innerhalb von 7 Tagen ohne Abzug zu zahlen.</p>
          <p>
            (4) Bei Zahlungsverzug ist der Auftragnehmer berechtigt, die
            Leistung zu pausieren.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          5. Abnahme
        </h2>
        <div className="mt-4 space-y-3">
          <p>
            (1) Nach Fertigstellung wird dem Auftraggeber das Ergebnis zur
            Abnahme vorgelegt.
          </p>
          <p>
            (2) Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht
            innerhalb von 7 Tagen wesentliche Mängel mitteilt.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          6. Nutzungsrechte
        </h2>
        <div className="mt-4 space-y-3">
          <p>
            (1) Nach vollständiger Bezahlung erhält der Auftraggeber ein
            einfaches, nicht ausschließliches Nutzungsrecht an der erstellten
            Website.
          </p>
          <p>
            (2) Der Auftragnehmer behält sich das Recht vor, erstellte Projekte
            als Referenz zu verwenden, sofern nicht ausdrücklich widersprochen
            wird.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          7. Haftung
        </h2>
        <div className="mt-4 space-y-3">
          <p>(1) Der Auftragnehmer haftet nur für Vorsatz und grobe Fahrlässigkeit.</p>
          <p>
            (2) Für Inhalte, die vom Auftraggeber bereitgestellt werden,
            übernimmt der Auftragnehmer keine Haftung.
          </p>
          <p>
            (3) Für Ausfälle durch Hostinganbieter oder Drittanbieter wird
            keine Haftung übernommen.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          8. Mitwirkungspflichten des Auftraggebers
        </h2>
        <p className="mt-4">
          Der Auftraggeber verpflichtet sich, alle notwendigen Inhalte
          rechtzeitig bereitzustellen. Verzögerungen aufgrund fehlender
          Mitwirkung verlängern die Projektlaufzeit entsprechend.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          9. Kündigung / Projektabbruch
        </h2>
        <div className="mt-4 space-y-3">
          <p>
            (1) Beide Parteien können den Vertrag aus wichtigem Grund
            kündigen.
          </p>
          <p>(2) Bereits erbrachte Leistungen sind anteilig zu vergüten.</p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          10. Schlussbestimmungen
        </h2>
        <div className="mt-4 space-y-3">
          <p>(1) Es gilt deutsches Recht.</p>
          <p>
            (2) Sollten einzelne Bestimmungen unwirksam sein, bleibt die
            Wirksamkeit der übrigen unberührt.
          </p>
          <p>
            (3) Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des
            Auftragnehmers.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}

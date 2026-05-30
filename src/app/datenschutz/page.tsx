import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Epos Solutions",
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          1. Verantwortlicher
        </h2>
        <p className="mt-4">
          Damian Jarzinka
          <br />
          EPOS Solutions
          <br />
          Pookweg 70a
          <br />
          45147 Essen
          <br />
          Deutschland
        </p>
        <p className="mt-4">E-Mail: damian.jarzinka@gmail.com</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          2. Allgemeine Hinweise
        </h2>
        <p className="mt-4">
          Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir
          behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
          den gesetzlichen Datenschutzvorschriften (insbesondere der
          Datenschutz-Grundverordnung – DSGVO) sowie dieser
          Datenschutzerklärung.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          3. Hosting
        </h2>
        <p className="mt-4">
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, USA gehostet. Beim Aufruf der Website werden automatisch
          durch den Hostinganbieter Server-Logfiles erfasst. Diese können
          insbesondere folgende Daten enthalten: IP-Adresse, Datum und Uhrzeit
          des Zugriffs, Browsertyp und -version, Betriebssystem, Referrer-URL.
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          4. Server-Logfiles
        </h2>
        <p className="mt-4">
          Die Server-Logfiles werden automatisch vom Hostinganbieter
          verarbeitet und temporär gespeichert. Eine Zusammenführung mit
          anderen Datenquellen findet nicht statt.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          5. Kontaktformular
        </h2>
        <p className="mt-4">
          Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen,
          werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nicht
          ohne Ihre Einwilligung weitergegeben und gelöscht, sobald der Zweck
          der Speicherung entfällt.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          6. Kontakt per E-Mail
        </h2>
        <p className="mt-4">
          Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur
          Bearbeitung der Anfrage gespeichert. Rechtsgrundlage: Art. 6 Abs. 1
          lit. b DSGVO.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          7. Keine Cookies oder Tracking
        </h2>
        <p className="mt-4">
          Diese Website verwendet keine Cookies zu Analyse-, Tracking- oder
          Marketingzwecken. Es werden keine Dienste wie Google Analytics, Meta
          Pixel oder vergleichbare Technologien eingesetzt.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          8. Rechtsgrundlagen
        </h2>
        <p className="mt-4">
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
          DSGVO und Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          9. Speicherdauer
        </h2>
        <p className="mt-4">
          Personenbezogene Daten werden nur so lange gespeichert, wie zur
          Erfüllung des jeweiligen Zwecks erforderlich oder gesetzlich
          vorgeschrieben.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          10. Ihre Rechte
        </h2>
        <p className="mt-4">
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
          Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und
          Datenübertragbarkeit (Art. 20 DSGVO).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          11. Widerruf
        </h2>
        <p className="mt-4">
          Sie können eine erteilte Einwilligung jederzeit widerrufen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          12. Beschwerderecht
        </h2>
        <p className="mt-4">
          Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein
          Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde zu.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          13. SSL-/TLS-Verschlüsselung
        </h2>
        <p className="mt-4">
          Diese Website nutzt SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie am „https://“ in der
          Adresszeile.
        </p>
      </section>
    </LegalLayout>
  );
}

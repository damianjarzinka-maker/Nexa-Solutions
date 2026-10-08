import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Epos Solutions",
  description:
    "Datenschutzerklärung von Epos Solutions: welche Daten beim Besuch der Website und bei Anfragen verarbeitet werden und welche Rechte Sie haben.",
  // Own canonical — otherwise the root layout's "/" is inherited and Google
  // treats this page as a duplicate of the homepage.
  alternates: { canonical: "/datenschutz" },
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
        <p className="mt-4">
          Für die Zustellung der Formularangaben an uns nutzen wir den
          E-Mail-Versanddienst Resend als technischen Dienstleister. Dabei
          können Daten auch auf Servern außerhalb der EU (insbesondere in den
          USA) verarbeitet werden.
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
        <p className="mt-4">
          Unser E-Mail-Postfach wird beim Anbieter Google (Gmail) geführt.
          E-Mails und Anfragen aus dem Kontaktformular werden daher auch auf
          Servern von Google verarbeitet, die sich außerhalb der EU befinden
          können.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          7. Externe Inhalte für 3D-Animationen
        </h2>
        <p className="mt-4">
          Auf größeren Bildschirmen binden wir zwei interaktive Animationen
          ein, deren Dateien von den Servern der jeweiligen Anbieter geladen
          werden:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            Spline (3D-Szene) — geladen über prod.spline.design, unpkg.com und
            www.gstatic.com
          </li>
          <li>
            Unicorn Studio (animierter Hintergrund) — geladen über
            cdn.jsdelivr.net, storage.googleapis.com und assets.unicorn.studio
          </li>
        </ul>
        <p className="mt-4">
          Beim Abruf dieser Inhalte wird technisch bedingt Ihre IP-Adresse an
          die genannten Server übertragen. Diese können sich auch außerhalb der
          EU (insbesondere in den USA) befinden. Cookies werden dabei nicht
          gesetzt. Rechtsgrundlage ist unser berechtigtes Interesse an einer
          ansprechenden Darstellung unseres Angebots (Art. 6 Abs. 1 lit. f
          DSGVO). Auf Smartphones werden diese Animationen nicht geladen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          8. Übermittlung in Drittländer
        </h2>
        <p className="mt-4">
          Einige der genannten Dienstleister (Vercel, Resend, Google, Spline,
          Unicorn Studio) können personenbezogene Daten auch in Ländern
          außerhalb der EU, insbesondere in den USA, verarbeiten. Eine solche
          Übermittlung erfolgt auf Grundlage des Angemessenheitsbeschlusses der
          EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO),
          soweit der jeweilige Anbieter danach zertifiziert ist, andernfalls auf
          Grundlage von Standardvertragsklauseln der EU-Kommission (Art. 46
          Abs. 2 lit. c DSGVO).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          9. Keine Cookies oder Tracking
        </h2>
        <p className="mt-4">
          Diese Website verwendet keine Cookies zu Analyse-, Tracking- oder
          Marketingzwecken. Es werden keine Dienste wie Google Analytics, Meta
          Pixel oder vergleichbare Technologien eingesetzt.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          10. Rechtsgrundlagen
        </h2>
        <p className="mt-4">
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
          DSGVO und Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          11. Speicherdauer
        </h2>
        <p className="mt-4">
          Personenbezogene Daten werden nur so lange gespeichert, wie zur
          Erfüllung des jeweiligen Zwecks erforderlich oder gesetzlich
          vorgeschrieben.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          12. Ihre Rechte
        </h2>
        <p className="mt-4">
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
          Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und
          Datenübertragbarkeit (Art. 20 DSGVO).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          13. Widerspruchsrecht (Art. 21 DSGVO)
        </h2>
        <p className="mt-4">
          Soweit wir Ihre Daten auf Grundlage berechtigter Interessen
          verarbeiten (Art. 6 Abs. 1 lit. f DSGVO) – etwa bei den
          Server-Logfiles oder den externen Inhalten für 3D-Animationen –,
          haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen
          Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung
          einzulegen. Wir verarbeiten die Daten dann nicht mehr, es sei denn,
          wir können zwingende schutzwürdige Gründe nachweisen, die Ihre
          Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen. Ein formloser
          Hinweis an die oben genannte E-Mail-Adresse genügt.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          14. Widerruf
        </h2>
        <p className="mt-4">
          Sie können eine erteilte Einwilligung jederzeit widerrufen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          15. Beschwerderecht
        </h2>
        <p className="mt-4">
          Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein
          Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde zu.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-white">
          16. SSL-/TLS-Verschlüsselung
        </h2>
        <p className="mt-4">
          Diese Website nutzt SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie am „https://“ in der
          Adresszeile.
        </p>
      </section>

      <p className="text-sm">Stand: Oktober 2026</p>
    </LegalLayout>
  );
}

"use client";

/**
 * AiSolutionsSection — "KI-Lösungen". Dark sheet that slides over the light
 * custom-software section (StackHandoff in page.tsx) and hands off to the
 * dark contact form.
 *
 * Copy rule: say what the AI does for the business, never how it works —
 * no model names, no jargon, no performance figures.
 */
import { FadeIn } from "./FadeIn";
import {
  ShowcaseTicker,
  Testimonial,
  type ShowcaseItem,
} from "./ui/design-testimonial";

const USE_CASES: ShowcaseItem[] = [
  {
    tag: "KI-Chatbots",
    headline:
      "Beantwortet Kundenfragen rund um die Uhr — auch sonntags um drei.",
    detail:
      "Ein Chat auf Ihrer Website, der Öffnungszeiten, Preise und Verfügbarkeiten kennt und Anfragen sauber an Ihr Team übergibt.",
  },
  {
    tag: "Interne KI-Assistenten",
    headline: "Ihr Team fragt. Die KI kennt die Antwort.",
    detail:
      "Ein Assistent, der Ihre Handbücher, Preislisten und Abläufe kennt — für neue Mitarbeiter genauso wie für alte Hasen.",
  },
  {
    tag: "Dokumentenanalyse",
    headline: "Liest hundert Seiten, bevor Ihr Kaffee kalt ist.",
    detail:
      "Verträge, Rechnungen oder Lieferscheine: Die KI findet Fristen, Beträge und Auffälligkeiten und fasst alles verständlich zusammen.",
  },
  {
    tag: "Wissensdatenbanken",
    headline: "Das Wissen Ihres Betriebs — endlich an einem Ort.",
    detail:
      "Aus verstreuten Ordnern, E-Mails und Köpfen wird eine durchsuchbare Wissensbasis, die in normaler Sprache antwortet.",
  },
  {
    tag: "Texte & Dokumente",
    headline:
      "Angebote, Berichte und E-Mails als fertiger Entwurf in Sekunden.",
    detail:
      "Die KI schreibt im Ton Ihres Unternehmens. Sie prüfen kurz und schicken ab.",
  },
  {
    tag: "KI für Kundenanfragen",
    headline: "Jede Anfrage verstanden, sortiert und vorbeantwortet.",
    detail:
      "E-Mails und Formulare werden gelesen, dem richtigen Thema zugeordnet und mit einem passenden Antwortentwurf versehen.",
  },
  {
    tag: "KI für interne Prozesse",
    headline: "Weniger Klicken, Kopieren und Nachfragen im Alltag.",
    detail:
      "Protokolle zusammenfassen, Daten übertragen, Aufgaben verteilen — die KI übernimmt die Fleißarbeit zwischen Ihren Programmen.",
  },
  {
    tag: "Datenauswertung",
    headline: "Aus großen Datenmengen werden klare Antworten.",
    detail:
      "Umsätze, Anfragen oder Maschinendaten: Die KI erkennt Muster und beantwortet Fragen wie „Was lief letzten Monat besser?“",
  },
];

export function AiSolutionsSection() {
  return (
    <section
      id="ki-loesungen"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[2rem] bg-[#0a0a0a] px-6 pb-40 pt-28 text-white shadow-[0_-24px_60px_-20px_rgba(10,10,10,0.35)] md:rounded-t-[3rem] md:pb-48 md:pt-36"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#8b95ff] md:text-base">
            KI-Lösungen
          </span>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            KI, die im Alltag mitarbeitet.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            Kein Fachchinesisch, keine Spielerei — sondern künstliche
            Intelligenz genau dort, wo sie Ihnen Arbeit abnimmt.
          </p>
        </FadeIn>

        <FadeIn delay={120} className="mt-16 md:mt-20">
          <Testimonial items={USE_CASES} label="KI-Lösungen" />
        </FadeIn>
      </div>

      {/* Full-bleed topic ticker along the bottom edge. */}
      <ShowcaseTicker
        items={USE_CASES}
        className="absolute inset-x-0 bottom-10 text-white/[0.035] md:bottom-14"
      />
    </section>
  );
}

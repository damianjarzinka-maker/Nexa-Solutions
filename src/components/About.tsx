import { FadeIn } from "./FadeIn";

const VALUES = [
  {
    title: "Klarheit",
    body: "Klare Sprache, klare Entscheidungen, klare Ergebnisse — ohne Buzzwords.",
  },
  {
    title: "Qualität",
    body: "Wir liefern Arbeit, die in fünf Jahren noch trägt — nicht nur am Launchtag.",
  },
  {
    title: "Ergebnis",
    body: "Jedes Projekt hat einen messbaren Zweck. Daran lassen wir uns messen.",
  },
];

export function About() {
  return (
    <section id="ueber-uns" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-accent">
                Über uns
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
                Klar im Anspruch.
                <br />
                Direkt in der Umsetzung.
              </h2>
              <div className="mt-8 space-y-5 text-muted">
                <p>
                  Nexa Solutions ist eine digitale Agentur für Webdesign,
                  KI-Automatisierung und IT-Consulting. Wir arbeiten mit kleinen
                  und mittleren Unternehmen, Restaurants und Personenmarken in
                  ganz Deutschland.
                </p>
                <p>
                  Wir glauben nicht an Schablonen. Jedes Projekt beginnt mit
                  einer Frage: Was muss am Ende anders sein? Aus dieser Antwort
                  bauen wir — fokussiert, technisch sauber, ohne Umwege.
                </p>
                <p>
                  Was übrig bleibt, ist Arbeit, die funktioniert. Heute. Und in
                  fünf Jahren.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-0 border border-line">
            {VALUES.map((value, i) => (
              <FadeIn
                key={value.title}
                delay={i * 120}
                className="border-line p-8 md:p-10 [&:not(:last-child)]:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-sm text-muted">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
                    {value.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

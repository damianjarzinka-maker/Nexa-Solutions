import { Layout, Sparkles, Network, type LucideIcon } from "lucide-react";
import { FadeIn } from "./FadeIn";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    icon: Layout,
    title: "Webdesign",
    description:
      "Marken-Websites und Landing Pages, die Vertrauen aufbauen und konvertieren. Performance, Design und Inhalt aus einer Hand.",
    tags: ["Brand-Sites", "Landing Pages", "CMS"],
  },
  {
    icon: Sparkles,
    title: "KI-Automatisierung",
    description:
      "Workflows, Lead-Routing und Kundenkommunikation automatisiert mit GPT- und Workflow-Tools. Weniger manuelle Arbeit, mehr Geschwindigkeit.",
    tags: ["GPT-Workflows", "Lead-Routing", "Datenflüsse"],
  },
  {
    icon: Network,
    title: "IT-Consulting",
    description:
      "Beratung zu Tools, Infrastruktur und Prozessen. Wir entscheiden mit Ihnen, was Sie brauchen — und was nicht.",
    tags: ["Strategie", "Tool-Stack", "Prozesse"],
  },
];

export function Services() {
  return (
    <section id="leistungen" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-accent">
                Leistungen
              </span>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
                Drei Disziplinen. Ein Ergebnis.
              </h2>
            </div>
            <p className="max-w-sm text-muted">
              Wir bauen sichtbare Marken, automatisierte Abläufe und stabile
              IT-Strukturen — abgestimmt auf Ihr Geschäft.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 border border-line md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.title}
              delay={i * 120}
              className="group flex flex-col gap-6 border-line p-8 transition-colors hover:bg-white/[0.02] md:p-10 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
            >
              <service.icon
                size={28}
                strokeWidth={1.25}
                className="text-white"
              />
              <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-line px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

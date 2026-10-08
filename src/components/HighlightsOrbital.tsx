"use client";

/**
 * HighlightsOrbital — the "Warum Epos Solutions" points as an interactive
 * orbital constellation. Same content as the Highlights bento, rendered as a
 * dark, explorable node graph. Heading overlays the top of the full-screen
 * orbital canvas.
 */
import { Code2, Paintbrush, Rocket, TrendingUp, Zap } from "lucide-react";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const DATA: TimelineItem[] = [
  {
    id: 1,
    title: "Design",
    date: "01",
    category: "Design",
    icon: Paintbrush,
    status: "completed",
    energy: 100,
    relatedIds: [2, 5],
    content:
      "Weltklasse Design — dein neuer Look rechtfertigt deine Wunschpreise, bevor du überhaupt das erste Wort gesagt hast.",
  },
  {
    id: 2,
    title: "Conversion",
    date: "02",
    category: "Conversion",
    icon: TrendingUp,
    status: "completed",
    energy: 100,
    relatedIds: [1, 3],
    content:
      "Conversion-optimiert — Kunden entscheiden schnell, weil deine Seite durch verkaufspsychologischen Aufbau und starke Werbetexte verkauft.",
  },
  {
    id: 3,
    title: "Marketing",
    date: "03",
    category: "Marketing",
    icon: Rocket,
    status: "in-progress",
    energy: 100,
    relatedIds: [2, 4],
    content:
      "Marketing-Maschinen — deine neue Seite performt auf jedem Gebiet.",
  },
  {
    id: 4,
    title: "Tempo",
    date: "04",
    category: "Tempo",
    icon: Zap,
    status: "completed",
    energy: 100,
    relatedIds: [3, 5],
    content: "Fertig in Wochen — Zeit ist Geld. Wir schätzen beides.",
  },
  {
    id: 5,
    title: "Development",
    date: "05",
    category: "Tech",
    icon: Code2,
    status: "in-progress",
    energy: 100,
    relatedIds: [4, 1],
    content: "Next.js Development — gebaut für grenzenlose Skalierung.",
  },
];

export function HighlightsOrbital() {
  return (
    <section className="relative bg-[#f2efeb]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-24 text-center">
        <h2 className="font-serif text-3xl tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
          Der Unterschied liegt in der Wirkung
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6b675e]">
          Design ist die Pflicht, Wirkung die Kür. Unsere Websites sehen nicht
          nur professionell aus – sie führen Besucher gezielt bis zur Anfrage.
        </p>
      </div>
      <RadialOrbitalTimeline timelineData={DATA} />
    </section>
  );
}

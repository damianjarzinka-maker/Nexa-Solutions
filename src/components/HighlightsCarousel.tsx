"use client";

/**
 * HighlightsCarousel — the "Warum Epos Solutions" points as a circular
 * carousel. Replaces the orbital constellation; same five points, same warm
 * white surface as the sections around it.
 */
import { Code2, Paintbrush, Rocket, TrendingUp, Zap } from "lucide-react";
import { CircularCarousel, type CarouselItem } from "@/components/ui/circular-carousel";

// Descriptions are shown in full — keep them short so they fit the card.
const ITEMS: CarouselItem[] = [
  {
    id: "design",
    tag: "Design",
    title: "Weltklasse Design",
    description:
      "Ihr neuer Look rechtfertigt Ihre Wunschpreise, bevor Sie das erste Wort gesagt haben.",
    icon: Paintbrush,
  },
  {
    id: "conversion",
    tag: "Conversion",
    title: "Conversion-optimiert",
    description:
      "Verkaufspsychologischer Aufbau und starke Texte — Kunden entscheiden schneller.",
    icon: TrendingUp,
  },
  {
    id: "marketing",
    tag: "Marketing",
    title: "Marketing-Maschine",
    description:
      "Sichtbar bei Google, überzeugend auf jedem Gerät, messbar in jeder Anfrage.",
    icon: Rocket,
  },
  {
    id: "tempo",
    tag: "Tempo",
    title: "Fertig in Wochen",
    description:
      "Kein Projekt, das sich über Monate zieht. Zeit ist Geld — wir schätzen beides.",
    icon: Zap,
  },
  {
    id: "development",
    tag: "Tech",
    title: "Next.js Development",
    description:
      "Sauber gebaut und schnell ausgeliefert, ausgelegt auf grenzenlose Skalierung.",
    icon: Code2,
  },
];

export function HighlightsCarousel() {
  return (
    <section className="relative overflow-hidden bg-[#f2efeb] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
          Der Unterschied liegt in der Wirkung
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6b675e]">
          Design ist die Pflicht, Wirkung die Kür. Unsere Websites sehen nicht
          nur professionell aus – sie führen Besucher gezielt bis zur Anfrage.
        </p>
      </div>

      <CircularCarousel items={ITEMS} className="mt-16 md:mt-20" />
    </section>
  );
}

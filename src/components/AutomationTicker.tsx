"use client";

/**
 * AutomationTicker — the "we do more than websites" section: a running feed of
 * example automations, filterable by industry.
 *
 * The section stays entirely on the warm white of the orbital above — one flat
 * light surface, no gradient turn — and hands off to the (dark) contact
 * section at a hard seam.
 *
 * Framing note: this is an ILLUSTRATIVE day, not a live production feed. The
 * times are fixed data (never Date.now()), there are no client names and no
 * performance figures — the panel is labelled "Beispiele" so it can't be read
 * as fabricated proof.
 */
import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Briefcase,
  Building2,
  Layers,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AutomationServices } from "./AutomationServices";
import { FadeIn } from "./FadeIn";
import { EventTicker, type TickerEvent } from "./ui/event-ticker";
import { useIsMobile } from "@/hooks/use-is-mobile";

const INK = "#0a0a0a";
const BRAND = "#3d4de8";

interface Industry {
  id: string;
  label: string;
  icon: LucideIcon;
  /** [time, what ran] — times climb through a single day. */
  events: [string, string][];
}

const INDUSTRIES: Industry[] = [
  {
    id: "gastro",
    label: "Gastronomie",
    icon: UtensilsCrossed,
    events: [
      ["06:40", "Tagesplan an das Team gesendet"],
      ["11:12", "Reservierung bestätigt"],
      ["11:13", "Tisch im Plan geblockt"],
      ["17:30", "Erinnerung an Gast gesendet"],
      ["21:05", "Lieferbestellung ins Kassensystem übernommen"],
      ["15:40", "KI-Assistent beantwortet Frage zu Allergenen"],
      ["23:20", "Bewertungsanfrage verschickt"],
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingBag,
    events: [
      ["07:02", "Bestellung erfasst"],
      ["07:03", "Rechnung erstellt und versendet"],
      ["09:45", "Versandlabel generiert"],
      ["10:30", "Bestellungen an die Buchhaltung übertragen"],
      ["13:18", "Tracking-Mail verschickt"],
      ["19:26", "Warenkorb-Abbrecher angeschrieben"],
      ["02:15", "Lagerbestand mit allen Kanälen abgeglichen"],
    ],
  },
  {
    id: "handwerk",
    label: "Handwerk",
    icon: Wrench,
    events: [
      ["06:12", "Anfrage über Nacht aufgenommen"],
      ["08:30", "Angebot erstellt"],
      ["10:04", "Termin im Kalender eingetragen"],
      ["12:15", "Chef per SMS über Großauftrag informiert"],
      ["14:47", "Materialliste zusammengestellt"],
      ["18:22", "Rechnung nach Abnahme versendet"],
      ["09:00", "Zahlungserinnerung ausgelöst"],
    ],
  },
  {
    id: "dienstleistung",
    label: "Dienstleistung",
    icon: Briefcase,
    events: [
      ["07:50", "Neuer Lead aus Kontaktformular erfasst"],
      ["08:15", "Anfrage qualifiziert und zugeordnet"],
      ["10:30", "Erstgespräch gebucht"],
      ["12:40", "Angebot nachgefasst"],
      ["15:55", "Onboarding-Unterlagen versendet"],
      ["18:00", "Urlaubsantrag freigegeben und eingetragen"],
      ["20:10", "Monatsreport zusammengestellt"],
    ],
  },
  {
    id: "praxis",
    label: "Praxis",
    icon: Stethoscope,
    events: [
      ["07:20", "Termin vergeben"],
      ["09:35", "Anamnesebogen zugeschickt"],
      ["16:00", "Erinnerung an Patient gesendet"],
      ["16:45", "Team über Terminabsage benachrichtigt"],
      ["16:48", "Wartelisten-Platz nachbesetzt"],
      ["22:30", "Recall-Termin angestoßen"],
    ],
  },
  {
    id: "immobilien",
    label: "Immobilien",
    icon: Building2,
    events: [
      ["08:05", "Exposé versendet"],
      ["11:50", "Interessent qualifiziert"],
      ["13:25", "Besichtigung koordiniert"],
      ["17:15", "Objekt auf allen Portalen aktualisiert"],
      ["19:30", "KI-Antwort auf Objektanfrage vorbereitet"],
      ["21:40", "Nachfass-Mail verschickt"],
    ],
  },
];

/**
 * Interleaves the industries so the "Alle Branchen" feed alternates instead of
 * running six gastro rows in a row. Deterministic — same order every render.
 */
function buildPool(selected: string | null): TickerEvent[] {
  const active =
    selected === null
      ? INDUSTRIES
      : INDUSTRIES.filter((industry) => industry.id === selected);

  if (active.length === 1) {
    return active[0].events.map(([time, label], i) => ({
      id: `${active[0].id}-${i}`,
      time,
      label,
      tag: active[0].label,
    }));
  }

  const pool: TickerEvent[] = [];
  const longest = Math.max(...active.map((industry) => industry.events.length));
  for (let round = 0; round < longest; round++) {
    for (const industry of active) {
      const event = industry.events[round];
      if (!event) continue;
      pool.push({
        id: `${industry.id}-${round}`,
        time: event[0],
        label: event[1],
        tag: industry.label,
      });
    }
  }
  return pool;
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

const HEADLINE = ["Websites", "sind", "nur", "der"];
const HEADLINE_KEYWORD = "Anfang.";
/** Word windows overlap heavily so 5 words read as one wave, not five pops. */
const WORD_STEP = 0.11;
const WORD_SPAN = 0.42;

function ScrubWord({
  children,
  index,
  progress,
  blur,
}: {
  children: string;
  index: number;
  progress: MotionValue<number>;
  blur: boolean;
}) {
  const t = useTransform(progress, (p) =>
    clamp01((p - index * WORD_STEP) / WORD_SPAN),
  );
  const opacity = useTransform(t, [0, 1], [0, 1]);
  const y = useTransform(t, [0, 1], [14, 0]);
  // Always a defined value: flipping a style key to `undefined` mid-life would
  // leave the last written inline value stuck on the element.
  const filter = useTransform(t, (v) =>
    blur ? `blur(${(1 - v) * 8}px)` : "blur(0px)",
  );

  return (
    <motion.span className="inline-block" style={{ opacity, y, filter }}>
      {children}&nbsp;
    </motion.span>
  );
}

export function AutomationTicker() {
  const [selected, setSelected] = useState<string | null>(null);
  const pool = useMemo(() => buildPool(selected), [selected]);

  // Tri-state: `null` (SSR + first paint) falls back to the desktop row count,
  // which matches the server render and avoids a layout flash.
  const isMobile = useIsMobile("(max-width: 640px)");
  const visibleCount = isMobile === true ? 5 : 7;

  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);

  // Both edges anchored to `start` → a fixed 56vh scrub span regardless of how
  // tall the headline renders. Stiffer than the pinned journey's spring, which
  // is tuned for 540vh and would visibly lag over ~600px.
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 88%", "start 32%"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });
  // Reduced motion pins progress at "finished" instead of disabling the style.
  // Two reasons this matters: /#automatisierung is a nav link, so someone can
  // land here with scroll progress at 0 and would otherwise face an invisible
  // headline — and dropping `style` to undefined does NOT clear inline values
  // motion already wrote, so the words would stay stuck at opacity 0.
  const finished = useMotionValue(1);
  const progress = reducedMotion ? finished : springProgress;

  const keywordIndex = HEADLINE.length;
  const keywordT = useTransform(progress, (p) =>
    clamp01((p - keywordIndex * WORD_STEP) / WORD_SPAN),
  );
  const keywordOpacity = useTransform(keywordT, [0, 1], [0, 1]);
  const keywordY = useTransform(keywordT, [0, 1], [14, 0]);
  // Array form — the function form switches colours instead of blending them.
  const keywordColor = useTransform(progress, [0.5, 1], [INK, BRAND]);
  const keywordScale = useTransform(progress, [0.5, 1], [1, 1.06]);

  const chipMotion = reducedMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.95 },
        transition: { type: "spring" as const, stiffness: 400, damping: 30 },
      };

  const chipBase =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4de8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2efeb]";
  const chipActive =
    "bg-[#3d4de8] text-white shadow-[0_8px_24px_-8px_rgba(61,77,232,0.55)]";
  const chipIdle =
    "border border-black/15 text-[#55524c] hover:border-black/30 hover:text-[#0a0a0a]";

  return (
    <section
      id="automatisierung"
      className="relative overflow-hidden scroll-mt-24 bg-[#f2efeb]"
    >
      {/* Header. Warm white matches the orbital section above, so the seam is
          invisible. Dark ink type only. */}
      <div className="px-6 pt-28 pb-10 md:pt-36 md:pb-12">
        <div ref={headerRef} className="mx-auto max-w-6xl">
          <span
            className="text-sm font-medium uppercase tracking-[0.24em] md:text-base"
            style={{ color: BRAND }}
          >
            Automatisierung
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#0a0a0a] md:text-6xl">
            {HEADLINE.map((word, i) => (
              <ScrubWord
                key={word}
                index={i}
                progress={progress}
                blur={isMobile === false}
              >
                {word}
              </ScrubWord>
            ))}
            {/* Own line so the scale-up has room and can't collide with the
                following text. */}
            <motion.span
              className="block origin-left"
              style={{
                opacity: keywordOpacity,
                y: keywordY,
                color: keywordColor,
                scale: keywordScale,
              }}
            >
              {HEADLINE_KEYWORD}
            </motion.span>
          </h2>
          <p className="mt-6 max-w-2xl text-[#55524c]">
            Die Website holt die Anfrage rein — alles danach kostet Sie täglich
            Stunden. Wir automatisieren die Abläufe dahinter: von der ersten
            E-Mail über Termine und Rechnungen bis zum fertigen Report. Einmal
            eingerichtet, laufen sie weiter, auch wenn längst niemand mehr im
            Büro ist.
          </p>
        </div>
      </div>

      <AutomationServices />

      {/* Feed. Same warm white as the header, with no tint layer of its own —
          any radial glow here would be clipped at this div's top edge and read
          as a visible seam against the header above. */}
      <div className="relative px-6 pt-16 pb-28 md:pt-24 md:pb-36">
        <div className="relative mx-auto max-w-6xl">
          <FadeIn>
            <h3 className="max-w-2xl font-serif text-2xl leading-snug tracking-tight text-[#0a0a0a] md:text-3xl">
              Und so sieht das im Alltag aus.
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-[#55524c]">
              Wählen Sie Ihre Branche — der Ablauf zeigt, was im Hintergrund
              erledigt wird, während Sie sich um Ihre Kunden kümmern.
            </p>
          </FadeIn>

          {/* Filters sit above the panel they control. */}
          <FadeIn>
            <div className="mt-8 flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={() => setSelected(null)}
                aria-pressed={selected === null}
                {...chipMotion}
                className={`${chipBase} ${selected === null ? chipActive : chipIdle}`}
              >
                <Layers size={14} />
                Alle Branchen
              </motion.button>
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                const active = selected === industry.id;
                return (
                  <motion.button
                    key={industry.id}
                    type="button"
                    onClick={() => setSelected(industry.id)}
                    aria-pressed={active}
                    {...chipMotion}
                    className={`${chipBase} ${active ? chipActive : chipIdle}`}
                  >
                    <Icon size={14} />
                    {industry.label}
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            {/* Glass composed from utilities — NOT .liquid-glass, which sits
                after @tailwind utilities in globals.css and would silently win
                over these classes (and scales on any mousedown inside it). */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_-32px_rgba(10,10,10,0.28)]">
              <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3d4de8] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3d4de8]" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#55524c]">
                    Ein Tag, vollautomatisch
                  </span>
                </div>
                <span className="text-xs text-[#8a867e]">Beispiele</span>
              </div>

              {/* key: remounts the feed when the filter or row count changes,
                  so it re-seeds cleanly from the new pool. */}
              <EventTicker
                key={`${selected ?? "alle"}-${visibleCount}`}
                events={pool}
                visibleCount={visibleCount}
                className="p-2"
              />
            </div>
          </FadeIn>

          <FadeIn delay={240}>
            <p className="mt-10 text-sm text-[#55524c]">
              Ihre Branche ist nicht dabei? Fast jeder wiederkehrende Ablauf
              lässt sich automatisieren —{" "}
              <a
                href="#kontakt"
                className="text-[#0a0a0a] underline underline-offset-4 transition-colors hover:text-[#3d4de8]"
              >
                schreiben Sie uns, was bei Ihnen Zeit frisst
              </a>
              .
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

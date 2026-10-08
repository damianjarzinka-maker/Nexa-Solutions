"use client";

/**
 * WebAppsSection — "Individuelle Software" (custom web apps & tools). Same warm
 * white as the automation section; it slides over it as a rounded sheet (see
 * StackHandoff in page.tsx). The mock app window stays dark on purpose — it
 * reads as a real app screenshot on the light surface.
 *
 * Left: pitch + CTA. Right: a tabbed mock app window with four sample UIs, so
 * visitors can picture "a tool built for us". All data in the mocks is
 * obviously illustrative (labelled "Beispiel-Oberfläche"), no client names.
 * Below: idea cards plus an open-ended closing line ("Sie haben einen
 * Prozess …? Wir entwickeln sie.") — broad, but no "we build everything" claim.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Calculator,
  CheckSquare,
  ClipboardList,
  Contact2,
  FileText,
  FolderKanban,
  KanbanSquare,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "./FadeIn";
import { cn } from "@/lib/cn";

const BRAND = "#3d4de8";

// Idea cards — phrased as the problem they solve, so a visitor recognises
// their own situation ("genau so ein Tool könnte unser Problem lösen").
const TOOL_IDEAS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Schichtplanung",
    text: "Mitarbeiter, Verfügbarkeiten und Schichten zentral verwalten.",
    icon: CalendarDays,
  },
  {
    title: "Kundenportale",
    text: "Kunden sehen Aufträge, Dokumente oder Termine selbst ein.",
    icon: Contact2,
  },
  {
    title: "Kalkulatoren",
    text: "Individuelle Preis-, Kosten- oder Angebotsrechner für Ihr Unternehmen.",
    icon: Calculator,
  },
  {
    title: "Dashboards",
    text: "Wichtige Unternehmensdaten übersichtlich an einem Ort.",
    icon: LayoutDashboard,
  },
  {
    title: "Digitale Formulare",
    text: "Papierprozesse durch digitale Formulare und Workflows ersetzen.",
    icon: CheckSquare,
  },
  {
    title: "Interne Tools",
    text: "Software für Abläufe, die Standardprogramme nicht abdecken.",
    icon: KanbanSquare,
  },
  {
    title: "Terminplanung",
    text: "Termine, Ressourcen und Mitarbeiter zentral koordinieren.",
    icon: Users,
  },
  {
    title: "Dokumentenverwaltung",
    text: "Dokumente automatisch erfassen, sortieren und weiterverarbeiten.",
    icon: ClipboardList,
  },
];

/* ---------- Mock screens ---------- */

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
// 0 = frei, 1 = Früh, 2 = Spät
const SHIFTS: [string, number[]][] = [
  ["Anna", [1, 1, 0, 2, 2]],
  ["Murat", [2, 2, 1, 0, 1]],
  ["Lena", [0, 1, 2, 1, 0]],
  ["Tom", [1, 0, 1, 2, 2]],
];

function ShiftMock() {
  return (
    <div>
      <div className="grid grid-cols-[52px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))] gap-1.5 text-[11px]">
        <span />
        {DAYS.map((d) => (
          <span key={d} className="text-center text-white/40">
            {d}
          </span>
        ))}
        {SHIFTS.map(([name, week]) => (
          <div key={name} className="contents">
            <span className="flex items-center text-white/70">{name}</span>
            {week.map((s, i) => (
              <span
                key={i}
                className={cn(
                  "flex h-8 items-center justify-center rounded-md",
                  s === 0 &&
                    "border border-dashed border-white/10 text-white/25",
                  s === 1 && "bg-[#3d4de8] text-white",
                  s === 2 && "bg-white/15 text-white",
                )}
              >
                {s === 0 ? "frei" : s === 1 ? "Früh" : "Spät"}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[11px] text-white/60">
        <span>Tauschanfrage: Lena ↔ Tom (Do)</span>
        <span className="rounded-md bg-[#3d4de8] px-2 py-0.5 text-white">
          Freigeben
        </span>
      </div>
    </div>
  );
}

const BARS = [38, 52, 45, 70, 62, 84, 76];

function DashboardMock() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Offene Aufträge", "24"],
          ["Diese Woche", "9 neu"],
          ["Auslastung", "82 %"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {k}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-28 items-end gap-2 rounded-lg bg-white/5 p-3">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t",
              i === BARS.length - 2 ? "bg-[#3d4de8]" : "bg-white/20",
            )}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const DOCS: [string, string, "ok" | "open" | "new"][] = [
  ["Angebot #1042", "Freigegeben", "ok"],
  ["Wartungsprotokoll März", "Neu", "new"],
  ["Rechnung #2207", "Offen", "open"],
  ["Auftragsbestätigung #1038", "Freigegeben", "ok"],
];

function PortalMock() {
  return (
    <div>
      <p className="text-sm text-white">Willkommen zurück, Muster GmbH</p>
      <p className="text-[11px] text-white/40">Ihre Dokumente & Aufträge</p>
      <ul className="mt-4 divide-y divide-white/5 rounded-lg bg-white/5">
        {DOCS.map(([name, status, kind]) => (
          <li
            key={name}
            className="flex items-center justify-between px-3 py-2.5 text-[12px]"
          >
            <span className="flex items-center gap-2 text-white/80">
              <FileText size={13} className="text-white/40" aria-hidden />
              {name}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px]",
                kind === "ok" && "bg-emerald-400/10 text-emerald-300",
                kind === "open" && "bg-amber-400/10 text-amber-300",
                kind === "new" && "bg-[#3d4de8]/30 text-white",
              )}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalculatorMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 text-[12px]">
        {[
          ["Fläche", "120 m²"],
          ["Material", "Premium"],
          ["Etagen", "2"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {k}
            </p>
            <p className="text-white">{v}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between rounded-lg bg-[#3d4de8] p-4 text-white">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/70">
            Richtpreis
          </p>
          <p className="mt-1 text-2xl font-semibold">ab 4.860 €</p>
          <p className="mt-1 text-[11px] text-white/70">
            inkl. Anfahrt & Montage
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium">
          Verbindlich anfragen <ArrowRight size={12} aria-hidden />
        </span>
      </div>
    </div>
  );
}

const MOCKS: {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  Screen: () => React.JSX.Element;
}[] = [
  {
    id: "schicht",
    label: "Schichtplan",
    title: "Schichtplanung · KW 14",
    icon: CalendarDays,
    Screen: ShiftMock,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Betriebsübersicht",
    icon: BarChart3,
    Screen: DashboardMock,
  },
  {
    id: "portal",
    label: "Kundenportal",
    title: "Kundenportal",
    icon: FolderKanban,
    Screen: PortalMock,
  },
  {
    id: "rechner",
    label: "Kalkulator",
    title: "Preisrechner · Online-Anfrage",
    icon: Calculator,
    Screen: CalculatorMock,
  },
];

export function WebAppsSection() {
  const [active, setActive] = useState(MOCKS[0].id);
  const reducedMotion = useReducedMotion();
  const current = MOCKS.find((m) => m.id === active) ?? MOCKS[0];
  const Screen = current.Screen;

  return (
    <section
      id="software"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[2rem] bg-[#f2efeb] px-6 py-28 text-[#0a0a0a] shadow-[0_-24px_60px_-20px_rgba(10,10,10,0.22)] md:rounded-t-[3rem] md:py-36"
    >
      {/* Soft brand glow behind the mock window. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: BRAND }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn className="min-w-0">
          <span
            className="text-sm font-medium uppercase tracking-[0.24em] md:text-base"
            style={{ color: BRAND }}
          >
            Individuelle Software
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Software, die es so noch nicht gibt.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#55524c]">
            Brauchen Sie ein digitales Tool, das es so noch nicht gibt? Wir
            entwickeln individuelle Lösungen für Ihre Abläufe — im Browser, auf
            jedem Gerät, ohne dass Sie Ihren Betrieb an eine Software von der
            Stange anpassen müssen.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-[#55524c]">
            {[
              "Genau auf Ihre Abläufe zugeschnitten — nicht umgekehrt",
              "Funktioniert am PC, Tablet und Handy",
              "Wächst mit: neue Funktionen, wenn Sie sie brauchen",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d4de8]" />
                {point}
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3d4de8]"
          >
            Ihre Tool-Idee besprechen <ArrowRight size={16} aria-hidden />
          </a>
        </FadeIn>

        <FadeIn delay={120} className="min-w-0">
          {/* Mock app window */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214] text-white shadow-[0_40px_100px_-30px_rgba(10,10,10,0.45)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate text-xs text-white/50">
                {current.title}
              </span>
              <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wider text-white/30">
                Beispiel-Oberfläche
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Beispiel-Tools"
              className="flex gap-1 overflow-x-auto border-b border-white/10 px-2 py-2"
            >
              {MOCKS.map((m) => {
                const Icon = m.icon;
                const on = m.id === active;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(m.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4de8]",
                      on
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white",
                    )}
                  >
                    <Icon size={13} aria-hidden />
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="min-h-[248px] p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Idea cards — open-ended on purpose, without claiming "everything". */}
      <div className="relative mx-auto mt-24 max-w-6xl">
        <FadeIn>
          <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
            Was wir zum Beispiel bauen
          </h3>
        </FadeIn>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {TOOL_IDEAS.map(({ title, text, icon: Icon }, i) => (
            <li key={title}>
              <FadeIn delay={Math.min(i, 4) * 60} className="h-full">
                <article className="group h-full rounded-2xl border border-black/10 bg-white p-5 transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_18px_40px_-24px_rgba(10,10,10,0.30)] motion-reduce:hover:translate-y-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3d4de8]/10 text-[#3d4de8] transition-colors duration-300 group-hover:bg-[#3d4de8] group-hover:text-white">
                    <Icon size={16} aria-hidden />
                  </span>
                  <h4 className="mt-4 font-semibold text-[#0a0a0a]">{title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#55524c]">
                    {text}
                  </p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn delay={120}>
          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-dashed border-black/20 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="max-w-2xl font-serif text-xl leading-snug text-[#0a0a0a] md:text-2xl">
              Sie haben einen Prozess, für den es noch keine passende Lösung
              gibt? Wir entwickeln sie.
            </p>
            <a
              href="#kontakt"
              className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-medium text-[#3d4de8] transition-colors hover:text-[#0a0a0a] md:self-auto"
            >
              Prozess beschreiben <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

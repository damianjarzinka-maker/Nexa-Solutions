"use client";

/**
 * AutomationServices — the concrete list of what we automate, shown between
 * the "Websites sind nur der Anfang." header and the example-day ticker.
 *
 * Grid math: lg is 4 columns with two featured cards spanning 2 → 2+8 = 12
 * slots, three full rows. md is 2 columns, featured cards span the full row,
 * the eight regular cards pair up. Keep the order below when adding items.
 *
 * Like the ticker, every example is illustrative — no client names, no
 * performance figures.
 */
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CalendarCheck,
  FileText,
  Inbox,
  Mail,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "./FadeIn";
import { cn } from "@/lib/cn";

interface Service {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: LucideIcon;
  featured?: "flow" | "chat";
}

const SERVICES: Service[] = [
  {
    id: "anfragen",
    title: "Automatische Anfragenbearbeitung",
    description:
      "Jede Anfrage wird erfasst, nach Thema und Dringlichkeit sortiert und an die richtige Person weitergeleitet. Ihr Kunde bekommt sofort eine passende Eingangsbestätigung.",
    example: "Anfrage um 22 Uhr — morgens liegt sie sortiert beim Zuständigen.",
    icon: Inbox,
    featured: "flow",
  },
  {
    id: "email",
    title: "E-Mail-Automatisierungen",
    description:
      "Bestätigungen, Nachfassmails und Erinnerungen gehen automatisch raus — im richtigen Moment, mit Ihrem Absender.",
    example: "Angebot nach drei Tagen freundlich nachfassen.",
    icon: Mail,
  },
  {
    id: "leads",
    title: "Lead-Erfassung",
    description:
      "Kontakte aus Website, Portalen und Social Media landen vollständig an einem Ort. Kein Interessent geht verloren.",
    example: "Kontaktformular → direkt in Ihre Kundenliste.",
    icon: UserPlus,
  },
  {
    id: "termine",
    title: "Automatische Terminvereinbarung",
    description:
      "Kunden buchen freie Zeiten selbst, Ihr Kalender bleibt aktuell, Erinnerungen senken Ausfälle.",
    example: "Online-Buchung mit Erinnerung am Vortag.",
    icon: CalendarCheck,
  },
  {
    id: "dokumente",
    title: "Rechnungs- & Dokumenten-Workflows",
    description:
      "Angebote, Rechnungen und Verträge entstehen aus Vorlagen, werden versendet und sauber abgelegt.",
    example: "Auftrag abgeschlossen → Rechnung raus → Zahlung überwacht.",
    icon: FileText,
  },
  {
    id: "daten",
    title: "Datenübertragung zwischen Systemen",
    description:
      "Shop, Buchhaltung, Kalender und CRM sprechen miteinander. Schluss mit doppeltem Abtippen.",
    example: "Bestellungen landen automatisch in der Buchhaltung.",
    icon: ArrowLeftRight,
  },
  {
    id: "benachrichtigungen",
    title: "Benachrichtigungen",
    description:
      "Sie erfahren sofort, wenn etwas Wichtiges passiert — per E-Mail, SMS oder Messenger.",
    example: "Hinweis aufs Handy bei Großauftrag oder Lagerengpass.",
    icon: BellRing,
  },
  {
    id: "reports",
    title: "Automatische Reports",
    description:
      "Anfragen, Umsatz und Auslastung kommen als fertiger Bericht — täglich, wöchentlich oder monatlich.",
    example: "Montagmorgen: der Wochenüberblick im Postfach.",
    icon: BarChart3,
  },
  {
    id: "intern",
    title: "Interne Workflows",
    description:
      "Freigaben, Urlaubsanträge, Onboarding und Checklisten laufen strukturiert statt per Zuruf.",
    example: "Urlaubsantrag → Freigabe → Eintrag im Teamkalender.",
    icon: Workflow,
  },
  {
    id: "ki",
    title: "KI-gestützte Kundenkommunikation",
    description:
      "Ein KI-Assistent beantwortet häufige Fragen rund um die Uhr, schreibt Antwortentwürfe und übergibt an Ihr Team, sobald es persönlich wird.",
    example:
      "Fragen zu Öffnungszeiten, Preisen oder Terminen — sofort beantwortet.",
    icon: Bot,
    featured: "chat",
  },
];

const FLOW_STEPS = [
  "Anfrage eingegangen",
  "Thema erkannt",
  "Zuständigen informiert",
  "Kunde bestätigt",
];

function FlowVisual() {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
      {FLOW_STEPS.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              i === FLOW_STEPS.length - 1
                ? "border-[#3d4de8]/30 bg-[#3d4de8]/10 text-[#3d4de8]"
                : "border-black/10 bg-[#f7f5f2] text-[#55524c]",
            )}
          >
            {step}
          </span>
          {i < FLOW_STEPS.length - 1 && (
            <ArrowRight
              size={12}
              className="shrink-0 text-[#b3aea4]"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function ChatVisual() {
  return (
    <div className="mt-6 space-y-2 text-xs" aria-hidden>
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#f7f5f2] px-3 py-2 text-[#55524c]">
        Haben Sie am Samstag noch einen Termin frei?
      </div>
      <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#3d4de8] px-3 py-2 text-white">
        Ja — um 10:30 oder 12:00 Uhr. Soll ich einen davon für Sie reservieren?
      </div>
    </div>
  );
}

export function AutomationServices() {
  return (
    <div className="px-6 pb-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h3 className="max-w-2xl font-serif text-2xl leading-snug tracking-tight text-[#0a0a0a] md:text-3xl">
            Zehn Bereiche, in denen Ihr Betrieb Zeit zurückbekommt.
          </h3>
        </FadeIn>

        <ul className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                className={cn(service.featured && "md:col-span-2")}
              >
                <FadeIn delay={Math.min(i, 5) * 60} className="h-full">
                  <article
                    className={cn(
                      "group flex h-full flex-col rounded-2xl border bg-white p-5 md:p-6 transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                      service.featured
                        ? "border-[#3d4de8]/20 shadow-[0_24px_60px_-28px_rgba(61,77,232,0.35)]"
                        : "border-black/10 hover:border-black/20 hover:shadow-[0_18px_40px_-24px_rgba(10,10,10,0.30)]",
                    )}
                  >
                    {/* Phones: icon beside the title to keep ten stacked
                        cards short. md+: icon above, card grid layout. */}
                    <div className="flex items-center gap-3 md:block">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                          service.featured
                            ? "bg-[#3d4de8] text-white"
                            : "bg-[#3d4de8]/10 text-[#3d4de8] group-hover:bg-[#3d4de8] group-hover:text-white",
                        )}
                      >
                        <Icon size={18} aria-hidden />
                      </span>
                      <h4
                        className={cn(
                          "font-semibold leading-snug text-[#0a0a0a] md:mt-5",
                          service.featured ? "text-lg md:text-xl" : "text-base",
                        )}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#55524c] md:mt-2">
                      {service.description}
                    </p>

                    {service.featured === "flow" && <FlowVisual />}
                    {service.featured === "chat" && <ChatVisual />}

                    <p className="mt-auto pt-3 text-xs md:pt-5 leading-relaxed text-[#8a867e]">
                      <span className="font-medium text-[#3d4de8]">z. B.</span>{" "}
                      {service.example}
                    </p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

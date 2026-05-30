"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const IconWebsite = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
  >
    <rect x="3" y="4" width="18" height="16" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <circle cx="6" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="8" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="10" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconShop = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M4 7h16l-1.5 12H5.5z" />
    <path d="M8.5 7V5a3.5 3.5 0 0 1 7 0v2" />
  </svg>
);

const IconSocial = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <line x1="7.2" y1="8" x2="11" y2="16" />
    <line x1="16.8" y1="8" x2="13" y2="16" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
  >
    <circle cx="10" cy="10" r="6" />
    <line x1="14.5" y1="14.5" x2="20" y2="20" />
    <path d="M8 10l2 2 3-3" />
  </svg>
);

const IconMaintenance = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
  >
    <path d="M15 4a4 4 0 0 0-3.4 6L4 17.6V20h2.4l7.6-7.6A4 4 0 1 0 15 4z" />
    <line x1="12.5" y1="6.5" x2="14.5" y2="8.5" />
  </svg>
);

const IconHosting = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
  >
    <rect x="3" y="4" width="18" height="6" />
    <rect x="3" y="14" width="18" height="6" />
    <circle cx="6.5" cy="7" r="0.5" fill="currentColor" />
    <circle cx="6.5" cy="17" r="0.5" fill="currentColor" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const SERVICES: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  body: string;
}[] = [
  {
    icon: <IconWebsite />,
    title: "Website-Erstellung",
    subtitle: "Responsive Websites für Ihr Unternehmen",
    body: "Wir entwerfen und entwickeln moderne, responsive Websites für Unternehmen jeder Größe. Dabei setzen wir auf aktuelle Technologien und bewährte externe Tools — inklusive verschiedener Content-Management-Systeme, damit Sie Ihre Inhalte selbst pflegen können.",
  },
  {
    icon: <IconShop />,
    title: "Onlineshops",
    subtitle: "Umsatzstarke Shops mit optimaler UX",
    body: "E-Commerce wächst — und Ihr Shop soll davon profitieren. Wir planen, designen und realisieren Ihren individuellen Online-Shop: leistungsfähig, benutzerfreundlich und verkaufsoptimiert. Auf Wunsch inkl. Produkttexten und professionellen Artikelfotos.",
  },
  {
    icon: <IconSocial />,
    title: "Soziale Netzwerke",
    subtitle: "Mehr Reichweite für Ihr Unternehmen",
    body: "Facebook, Instagram & Co. bieten enorme Chancen, um Ihr Unternehmen in Ihrer Region und ganz Deutschland sichtbar zu machen. Wir entwickeln Ihre Social-Media-Strategie, richten Ihre Firmenseiten ein und unterstützen Sie durch regelmäßige, zielgruppengerechte Beiträge.",
  },
  {
    icon: <IconSearch />,
    title: "Suchmaschinen-Marketing",
    subtitle: "Gefunden werden — lokal & deutschlandweit",
    body: "Eine Website bringt nichts, wenn niemand sie findet. Wir analysieren Ihre Präsenz nach SEO-Kriterien, optimieren On-Page-Faktoren und steigern Ihre Auffindbarkeit — kombiniert mit unserem bewährten Eintragsservice für lokale Sichtbarkeit.",
  },
  {
    icon: <IconMaintenance />,
    title: "Wartung & Pflege",
    subtitle: "Sicher, aktuell und immer erreichbar",
    body: "Nach dem Launch ist vor dem Launch. Wir halten Ihre Website und Ihren Shop technisch aktuell, sicher und für Ihre Besucher stets interessant. Verlässlicher Wartungs- und Aktualisierungsservice inklusive.",
  },
  {
    icon: <IconHosting />,
    title: "Internetadressen & Hosting",
    subtitle: "Ihre Domain auf sicheren Servern",
    body: "Der erste Schritt zur eigenen Webpräsenz: die richtige Domain. Wir unterstützen Sie bei der Auswahl und Registrierung Ihrer Wunschadresse und bieten zuverlässiges Webhosting auf modernen, sicheren Servern in deutschen Rechenzentren.",
  },
];

function ServiceCard({
  index,
  icon,
  title,
  subtitle,
  body,
}: {
  index: number;
  icon: ReactNode;
  title: string;
  subtitle: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="group relative flex flex-col gap-5 overflow-hidden border border-line p-8 text-left transition-colors duration-300 hover:bg-white/[0.02] md:p-10"
    >
      <span className="absolute right-7 top-7 font-cormorant text-sm tracking-wide text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="inline-flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
        {icon}
      </span>

      <h3 className="font-cormorant text-2xl leading-tight tracking-tight md:text-3xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/70">{subtitle}</p>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <p className="pt-1 text-sm leading-relaxed text-white/60">{body}</p>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </button>
  );
}

export function NexaLeistungen() {
  return (
    <section id="websites" className="border-b border-line bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Ihre nächste Website
          </span>
          <h2 className="mt-4 font-cormorant text-4xl leading-tight tracking-tight md:text-6xl">
            Was wir für Sie leisten.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Von der ersten Domain bis zum laufenden Betrieb — wir begleiten
            Sie. Alles aus einer Hand.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} index={i} {...s} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            Nicht sicher, was Sie brauchen? Kein Problem — wir analysieren Ihre
            aktuelle Situation kostenlos und zeigen Ihnen, was für Ihr
            Unternehmen wirklich Sinn macht.
          </p>
          <a
            href="/kontakt"
            className="inline-flex shrink-0 items-center gap-2 border border-accent bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-300 hover:bg-transparent hover:text-accent"
          >
            Kostenloses Erstgespräch
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

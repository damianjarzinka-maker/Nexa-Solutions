"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ShinyButton } from "@/components/ui/shiny-button";
import { sectionScrollTarget } from "@/lib/section-scroll";

// One entry per homepage section, labelled with the section's own eyebrow.
// `short` is used between lg and xl where the full labels don't fit.
// Clicks are routed through AnchorScroll (sticky-aware jumps).
const NAV_LINKS = [
  { id: "websites", label: "Websites" },
  { id: "automatisierung", label: "Automatisierung" },
  { id: "software", label: "Individuelle Software", short: "Software" },
  { id: "ki-loesungen", label: "KI-Lösungen" },
  { id: "kontakt", label: "Kontakt" },
] as const;

/**
 * Which section is under the navbar. Section tops are measured once per
 * layout change (sticky-aware, see lib/section-scroll) and compared against
 * the scroll position on every scroll — no per-scroll layout reads.
 */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let tops: { id: string; top: number }[] = [];
    const measure = () => {
      tops = NAV_LINKS.flatMap(({ id }) => {
        const top = sectionScrollTarget(id);
        return top === null ? [] : [{ id, top }];
      }).sort((a, b) => a.top - b.top);
    };
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const t of tops) if (t.top <= probe) current = t.id;
      setActive(current);
    };
    const remeasure = () => {
      measure();
      onScroll();
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Visible over the black hero at the very top, hidden while the reveal overlay
  // covers it, then slides back down once the zoom (~1.5 viewports) is done.
  const [show, setShow] = useState(true);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > 40);
      setShow(y < vh * 0.15 || y > vh * 1.9 || open);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out",
        show ? "translate-y-0" : "-translate-y-full",
        scrolled || open
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="relative flex w-full items-center justify-between px-5 py-5">
        <Link
          href="/"
          aria-label="Epos Solutions"
          onClick={(e) => {
            setOpen(false);
            // Already on the homepage — smooth-scroll back up to the hero
            // instead of a hard navigation/reload.
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="inline-flex items-center"
        >
          <Image
            src="/epos-logo-white.png"
            alt="Epos Solutions"
            width={2400}
            height={842}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative whitespace-nowrap py-1 text-xs uppercase tracking-[0.18em] transition-colors hover:text-white",
                  isActive ? "text-white" : "text-muted",
                )}
              >
                {"short" in link ? (
                  <>
                    <span className="xl:hidden">{link.short}</span>
                    <span className="hidden xl:inline">{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <ShinyButton
          onClick={() =>
            document
              .getElementById("kontakt")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hidden tracking-[0.2em] lg:block 2xl:mr-24"
        >
          Anfrage starten
        </ShinyButton>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-line lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-line py-4 font-serif text-2xl tracking-tight",
                active === link.id ? "text-white" : "text-white/70",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center border border-white bg-white px-5 py-3 text-sm font-medium text-bg"
          >
            Anfrage starten
          </Link>
        </div>
      </div>
    </header>
  );
}

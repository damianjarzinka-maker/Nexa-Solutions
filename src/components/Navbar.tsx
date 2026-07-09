"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ShinyButton } from "@/components/ui/shiny-button";

const NAV_LINKS = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#websites", label: "Websites" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Visible over the black hero at the very top, hidden while the reveal overlay
  // covers it, then slides back down once the zoom (~1.5 viewports) is done.
  const [show, setShow] = useState(true);

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
          onClick={() => setOpen(false)}
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

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ShinyButton
          onClick={() =>
            document
              .getElementById("kontakt")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hidden tracking-[0.2em] md:mr-16 md:block lg:mr-24"
        >
          Anfrage starten
        </ShinyButton>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-line md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-serif text-2xl tracking-tight"
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

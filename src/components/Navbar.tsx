"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#websites", label: "Websites" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          aria-label="Nexa Solutions"
          onClick={() => setOpen(false)}
          className="inline-flex items-center"
        >
          <Image
            src="/nexa-logo-beige-transparent.png"
            alt="Nexa Solutions"
            width={130}
            height={50}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            className="inline-flex items-center border border-white bg-white px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-transparent hover:text-white"
          >
            Anfrage starten
          </Link>
        </nav>

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

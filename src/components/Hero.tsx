"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";

const NAV_LINKS = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Websites", href: "#websites" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-xs font-medium uppercase tracking-[0.22em] text-accent transition-colors hover:text-white"
  >
    {children}
  </a>
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-bg p-8 font-sans md:p-12"
    >
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#080808_85%)]"
        aria-hidden
      />
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <header className="relative z-30 flex w-full max-w-7xl items-center justify-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden items-center space-x-10 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </motion.div>
        <motion.a
          href="#kontakt"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden border border-white bg-white px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-bg transition-colors hover:bg-transparent hover:text-white md:inline-flex"
        >
          Anfrage starten
        </motion.a>
        <motion.a
          href="#kontakt"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-white md:hidden"
        >
          Anfrage
        </motion.a>
      </header>

      <div className="relative grid w-full max-w-screen-2xl flex-grow grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-16 lg:py-0 xl:grid-cols-[1fr_1.7fr_1fr] xl:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 text-center lg:order-1 lg:justify-self-start lg:text-left"
        >
          <p className="mx-auto max-w-sm text-base font-medium leading-relaxed text-white/85 lg:mx-0 lg:text-lg">
            Digitale Agentur für Webdesign, KI-Automatisierung und
            IT-Consulting. Wir entwickeln intelligente Systeme, die Ihre
            Prozesse beschleunigen und Ihr Unternehmen messbar voranbringen.
          </p>
          <a
            href="#leistungen"
            className="mt-8 inline-flex items-center gap-2 border-b border-line pb-1 text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors hover:border-white"
          >
            Projekte ansehen
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        <div className="relative order-2 flex h-full items-center justify-center lg:order-2">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full border border-line md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px] xl:h-[440px] xl:w-[440px]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="absolute z-0 h-[180px] w-[180px] rounded-full border border-line md:h-[220px] md:w-[220px] lg:h-[240px] lg:w-[240px] xl:h-[300px] xl:w-[300px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="relative z-10 flex items-center justify-center"
          >
            <Image
              src="/epos-solutions-final-transparent.png"
              alt="Epos Solutions"
              width={520}
              height={200}
              priority
              className="h-auto w-[180px] md:w-[220px] lg:w-[240px] xl:w-[300px]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-1 flex items-center justify-center text-center lg:order-3 lg:justify-self-end lg:justify-end lg:text-right"
        >
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            Websites.
            <br />
            <span className="text-accent">KI.</span>
            <br />
            Wachstum.
          </h1>
        </motion.div>
      </div>

      <footer className="relative z-30 flex w-full max-w-7xl items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-xs uppercase tracking-[0.22em] text-muted"
        >
          Deutschland
        </motion.div>
      </footer>
    </section>
  );
}

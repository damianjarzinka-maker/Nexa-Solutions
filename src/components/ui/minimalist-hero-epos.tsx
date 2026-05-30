"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface MinimalistHeroEposProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLabel: string;
  readMoreLink: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-xs font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-white"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted transition-colors hover:text-white"
    aria-label="Social link"
  >
    <Icon className="h-5 w-5" strokeWidth={1.5} />
  </a>
);

export const MinimalistHeroEpos = ({
  logoText,
  navLinks,
  mainText,
  readMoreLabel,
  readMoreLink,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroEposProps) => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-bg p-8 font-sans md:p-12",
        className,
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#080808_85%)]"
        aria-hidden
      />

      <header className="relative z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-xl tracking-tight"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Menü öffnen"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-5 bg-white" />
        </motion.button>
      </header>

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted md:mx-0">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="mt-6 inline-flex items-center gap-2 border-b border-line pb-1 text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors hover:border-white"
          >
            {readMoreLabel}
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full border border-line md:h-[420px] md:w-[420px] lg:h-[520px] lg:w-[520px]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="absolute z-0 h-[200px] w-[200px] rounded-full border border-line md:h-[280px] md:w-[280px] lg:h-[340px] lg:w-[340px]"
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
              className="h-auto w-[220px] md:w-[300px] lg:w-[360px]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-end md:text-right"
        >
          <h1 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="relative z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center space-x-5"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-xs uppercase tracking-[0.22em] text-muted"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};

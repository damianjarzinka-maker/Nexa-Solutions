"use client";

import { Linkedin, Instagram, Mail } from "lucide-react";
import { MinimalistHeroEpos } from "@/components/ui/minimalist-hero-epos";

export default function MinimalistHeroEposPreviewPage() {
  const navLinks = [
    { label: "Leistungen", href: "#" },
    { label: "Über uns", href: "#" },
    { label: "Kontakt", href: "#" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/damian-jarzinka-7a7a7b348/",
    },
    { icon: Instagram, href: "#" },
    { icon: Mail, href: "mailto:hallo@epos-solutions.de" },
  ];

  return (
    <MinimalistHeroEpos
      logoText="EPOS"
      navLinks={navLinks}
      mainText="Studio für Webdesign, KI-Automatisierung und IT-Consulting. Digitale Systeme, die Ihr Geschäft tragen — vom Restaurant bis zur Personenmarke."
      readMoreLabel="Mehr erfahren"
      readMoreLink="/#leistungen"
      overlayText={{
        part1: "klar.",
        part2: "direkt.",
      }}
      socialLinks={socialLinks}
      locationText="Deutschland"
    />
  );
}

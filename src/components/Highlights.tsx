"use client";

/**
 * Highlights — bento-style feature grid ("why us"): two large cards up top,
 * three smaller ones below. Graphics here are cheap CSS/icon placeholders,
 * not final artwork — swap them for real product shots/illustrations later.
 */
import { Code2, Paintbrush, TrendingUp, Zap } from "lucide-react";
import { FadeIn } from "./FadeIn";

const CARD =
  "rounded-2xl border border-[#e5e0d3] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.03)]";

function CardHeading({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold tracking-tight text-[#0a0a0a]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#6b675e]">
        {children}
      </p>
    </div>
  );
}

// --- Card 1 graphic: wireframe → finished site, connected by a brand node ---
function DesignGraphic() {
  return (
    <div className="relative mb-8 h-48 overflow-hidden rounded-xl bg-[#f7f5f0]">
      {/* Connector node */}
      <div className="absolute left-1/2 top-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_0_20px_rgba(61,77,232,0.35)]">
        <div className="h-2 w-2 rounded-full bg-[#3d4de8]" />
      </div>
      <svg
        className="absolute left-1/2 top-8 h-10 w-40 -translate-x-1/2 text-[#c9c4b6]"
        viewBox="0 0 160 40"
        fill="none"
      >
        <path
          d="M20 0 V15 Q20 25 30 25 H130 Q140 25 140 15 V0"
          stroke="currentColor"
          strokeDasharray="3 3"
        />
      </svg>

      {/* Before: bare wireframe */}
      <div className="absolute bottom-3 left-3 h-28 w-28 rounded-lg border border-[#e5e0d3] bg-white p-3 shadow-sm sm:h-32 sm:w-32">
        <div className="h-2 w-10 rounded-full bg-[#e5e0d3]" />
        <div className="mt-3 h-10 w-full rounded bg-[#efece5]" />
        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-[#e5e0d3]" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#e5e0d3]" />
      </div>

      {/* After: finished design */}
      <div className="absolute bottom-3 right-3 h-36 w-44 rounded-lg border border-[#0a0a0a]/10 bg-[#0a0a0a] p-3 shadow-lg sm:h-40 sm:w-52">
        <div className="flex items-center justify-between">
          <span className="font-serif text-[10px] text-white">EPOS</span>
          <div className="flex gap-1">
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-1 w-3 rounded-full bg-white/30" />
          </div>
        </div>
        <div className="mt-3 h-2 w-3/4 rounded-full bg-white/80" />
        <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/40" />
        <div className="mt-3 h-5 w-16 rounded-full bg-[#3d4de8]" />
      </div>
    </div>
  );
}

// --- Card 2 graphic: conversion-rate bar chart ---
function ConversionGraphic() {
  const bars = [40, 30, 55, 85, 65, 70, 25];
  const peak = 3;
  return (
    <div className="mb-8 h-48 rounded-xl border border-[#e5e0d3] bg-[#f7f5f0] p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#0a0a0a]">
          Conversion Rate
        </span>
        <span className="rounded-full bg-[#2fae5a]/10 px-2 py-0.5 text-xs font-semibold text-[#2fae5a]">
          +75%
        </span>
      </div>
      <div className="relative mt-6 flex h-24 items-end gap-2.5 border-t border-dashed border-[#d8d3c5] pt-4">
        {/* Height is a % of this flex row's own height, so each bar must be
            the direct flex item — nesting it one level deeper would leave it
            sizing against an auto-height wrapper and collapse to 0. */}
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${
              i === peak
                ? "bg-[#3d4de8] shadow-[0_0_16px_rgba(61,77,232,0.5)]"
                : "bg-[#e5e0d3]"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// --- Card 3 graphic: orbiting service icons around a brand node ---
function OrbitGraphic() {
  return (
    <div className="relative mx-auto mb-6 h-40 w-40">
      <div className="absolute inset-0 rounded-full border border-[#e5e0d3]" />
      <div className="absolute inset-6 rounded-full border border-[#e5e0d3]" />
      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0a0a] shadow-[0_0_28px_rgba(61,77,232,0.35)]">
        <span className="font-serif text-xl text-white">E</span>
      </div>
      <div className="absolute -top-1 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md">
        <TrendingUp className="h-4 w-4 text-[#3d4de8]" />
      </div>
      <div className="absolute bottom-1 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
        <Paintbrush className="h-4 w-4 text-[#3d4de8]" />
      </div>
      <div className="absolute bottom-1 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
        <Code2 className="h-4 w-4 text-[#3d4de8]" />
      </div>
    </div>
  );
}

// --- Card 4 graphic: single bolt, "fast turnaround" ---
function SpeedGraphic() {
  return (
    <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[#f7f5f0]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#d8d3c5 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#3d4de8] shadow-[0_0_30px_rgba(61,77,232,0.45)]">
        <Zap className="h-8 w-8 fill-white text-white" />
      </div>
    </div>
  );
}

// --- Card 5 graphic: tech ring (Next.js) ---
function TechGraphic() {
  return (
    <div className="relative mx-auto mb-6 h-40 w-40">
      <div className="absolute inset-0 rounded-full border border-dashed border-[#d8d3c5]" />
      <div
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(#d8d3c5 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0a0a] shadow-[0_0_28px_rgba(10,10,10,0.3)]">
        <Code2 className="h-7 w-7 text-white" />
      </div>
    </div>
  );
}

export function Highlights() {
  return (
    <section className="bg-[#f2efeb] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center font-serif text-3xl tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
            Warum Epos Solutions
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2">
          <FadeIn>
            <div className={CARD}>
              <DesignGraphic />
              <CardHeading title="Weltklasse Design">
                Dein neuer Look rechtfertigt deine Wunschpreise, bevor du
                überhaupt das erste Wort gesagt hast.
              </CardHeading>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className={CARD}>
              <ConversionGraphic />
              <CardHeading title="Conversion Optimiert">
                Kunden treffen schnelle Entscheidungen, weil deine Seite
                durch einen verkaufspsychologischen Aufbau und starke
                Werbetexte verkauft.
              </CardHeading>
            </div>
          </FadeIn>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FadeIn delay={150}>
            <div className={CARD}>
              <OrbitGraphic />
              <CardHeading title="Marketing-Maschinen">
                Deine neue Seite performt auf jedem Gebiet
              </CardHeading>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className={CARD}>
              <SpeedGraphic />
              <CardHeading title="Fertig in Wochen">
                Zeit ist Geld. Wir schätzen beides.
              </CardHeading>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <div className={CARD}>
              <TechGraphic />
              <CardHeading title="Next.js Development">
                Gebaut für grenzenlose Skalierung
              </CardHeading>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

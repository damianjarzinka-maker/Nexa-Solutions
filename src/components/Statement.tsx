"use client";

import { FlipWords } from "./ui/flip-words";

const WORDS = ["better", "cute", "beautiful", "modern"];

export function Statement() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto flex max-w-4xl items-center justify-center px-6 py-32 md:py-40">
        <div className="mx-auto text-4xl font-normal text-muted">
          Build
          <FlipWords words={WORDS} /> <br />
          websites with Nexa Solutions
        </div>
      </div>
    </section>
  );
}

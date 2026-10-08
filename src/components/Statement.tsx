"use client";

import { FlipWords } from "./ui/flip-words";

const WORDS = ["better", "cute", "beautiful", "modern"];

export function Statement() {
  return (
    // Light variant: same warm white as the results section above, so the two
    // read as one continuous block; the flipping word is the black accent.
    <section className="bg-[#f2efeb]">
      <div className="mx-auto flex max-w-4xl items-center justify-center px-6 py-32 md:py-40">
        <div className="mx-auto text-4xl font-normal text-[#55524c]">
          Build
          <FlipWords
            words={WORDS}
            duration={2000}
            className="text-[#0a0a0a]"
          /> <br />
          websites with Epos Solutions
        </div>
      </div>
    </section>
  );
}

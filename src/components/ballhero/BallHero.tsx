"use client";

/**
 * BallHero — full-screen cinematic hero: background video (plays once, then
 * freezes on its last frame), Garamond display headline with per-character
 * staggered fade, Geist body copy and a liquid-glass CTA. EPOS content in
 * place of the template copy.
 *
 * Sits inside BallHeroReveal (pinned; grey overlay + zoom slide over it), so
 * this section only renders the hero itself — nav comes from the global Navbar.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";

/**
 * Splits text into characters, each fading in with a 0.07s stagger.
 * Characters are grouped per word (whitespace-nowrap) so the long German
 * lines never break mid-word on small screens; the stagger index is global.
 */
function StaggeredFade({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  let charIndex = 0;
  return (
    <span ref={ref} className="inline-block">
      {text.split(" ").map((word, w, words) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, y: 0, transition: { delay: i * 0.07 } },
                }}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function BallHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#010101]">
      {/* Full-screen background video — plays once, then freezes on the last frame */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-12 text-center sm:px-8 sm:pt-16 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-light uppercase tracking-[0.3em] text-white/80 sm:text-sm"
        >
          EPOS Solutions – Est 2026
        </motion.p>

        <h1 className="font-garamond mb-6 text-4xl font-normal uppercase leading-[1.08] tracking-tight text-white sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">
            <StaggeredFade text="Wir bauen, was Ihr" />
          </span>
          <span className="block">
            <StaggeredFade text="Business voranbringt" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mb-8 max-w-xs text-sm font-light leading-relaxed text-white/70 sm:mb-10 sm:max-w-md sm:text-base md:text-lg"
        >
          Digitale Agentur für Webdesign, KI-Automatisierung
          <br className="hidden sm:block" /> und IT-Consulting — aus einer Hand.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          onClick={() =>
            document
              .getElementById("kontakt")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="liquid-glass rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white/90 transition-transform sm:px-10 sm:py-4 sm:tracking-[0.2em]"
        >
          Anfrage starten
        </motion.button>
      </div>
    </section>
  );
}

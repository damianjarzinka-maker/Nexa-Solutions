"use client";

/**
 * Showcase slider adapted from the "design-testimonial" component: oversized
 * index number with magnetic parallax, vertical progress line, word-by-word
 * reveal of the headline, prev/next buttons and a slow background ticker
 * (ShowcaseTicker, rendered separately so it can run full-bleed).
 *
 * Changes vs. the original:
 * - Content is a list of use cases (tag / headline / detail), not quotes.
 * - Dark EPOS palette instead of shadcn theme tokens (the project has none).
 * - Phones: no vertical column, smaller number, stacked footer row.
 * - Clickable topic index so visitors needn't wait for autoplay.
 * - Autoplay pauses on hover, off-screen and with reduced motion, and its
 *   timer restarts after manual navigation.
 * - Button hover fill actually animates (the original's never moved).
 */
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

export interface ShowcaseItem {
  tag: string;
  headline: string;
  detail: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6500;

export function Testimonial({
  items,
  label,
}: {
  items: ShowcaseItem[];
  /** Vertical label in the left column. */
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.4 });
  const reducedMotion = useReducedMotion();

  // Mouse position for the magnetic number.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const total = items.length;
  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % total),
    [total],
  );
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Keyed on activeIndex → manual navigation restarts the countdown.
  useEffect(() => {
    if (reducedMotion || hovered || !inView) return;
    const timer = setTimeout(goNext, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, goNext, hovered, inView, reducedMotion]);

  const current = items[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Oversized index number, bleeding off the left edge. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none text-[11rem] font-bold leading-none tracking-tighter text-white/[0.04] md:-left-8 md:text-[26rem]"
        style={{ x: numberX, y: numberY }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative flex">
        {/* Left column — vertical label + progress (md+). */}
        <div className="hidden flex-col items-center justify-center border-r border-white/10 pr-12 md:flex lg:pr-16">
          <span
            className="font-mono text-xs uppercase tracking-widest text-white/45"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {label}
          </span>
          <div className="relative mt-8 h-32 w-px bg-white/10">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-[#8b95ff]"
              animate={{ height: `${((activeIndex + 1) / total) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1 py-6 md:py-12 md:pl-12 lg:pl-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3d4de8]" />
                {current.tag}
                <span className="text-white/30">
                  {String(activeIndex + 1).padStart(2, "0")}/
                  {String(total).padStart(2, "0")}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline with word reveal. min-h keeps the footer from jumping
              between short and long headlines. */}
          <div
            className="relative mb-10 min-h-[140px] md:mb-12 md:min-h-[120px]"
            style={{ perspective: 800 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                className="font-serif text-3xl leading-[1.15] tracking-tight text-white md:text-5xl"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.25em] inline-block"
                    variants={{
                      hidden: reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 20, rotateX: 90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          duration: 0.5,
                          delay: i * 0.05,
                          ease: EASE,
                        },
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        transition: { duration: 0.2, delay: i * 0.02 },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Detail + navigation */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="min-h-[96px] max-w-lg md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    className="mt-3 h-px w-8 shrink-0 bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <p className="text-base leading-relaxed text-white/65">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <NavButton direction="prev" onClick={goPrev} />
              <NavButton direction="next" onClick={goNext} />
            </div>
          </div>

          {/* Topic index — jump straight to a use case. */}
          <div
            role="tablist"
            aria-label={label}
            className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8"
          >
            {items.map((item, i) => (
              <button
                key={item.tag}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4de8]",
                  i === activeIndex
                    ? "bg-white text-[#0a0a0a]"
                    : "border border-white/10 text-white/55 hover:border-white/30 hover:text-white",
                )}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Slow background ticker of the topic names. Render it full-bleed (outside
 * any max-width wrapper) so it never shows hard cut-off edges. Two copies,
 * shifted by exactly one copy's width → seamless loop.
 */
export function ShowcaseTicker({
  items,
  className,
}: {
  items: ShowcaseItem[];
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const text = items.map((t) => t.tag).join("  •  ") + "  •  ";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none overflow-hidden", className)}
    >
      <motion.div
        className="flex w-max whitespace-nowrap text-5xl font-bold tracking-tight md:text-7xl"
        animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <span className="pr-4">{text.repeat(2)}</span>
        <span className="pr-4">{text.repeat(2)}</span>
      </motion.div>
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const prev = direction === "prev";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Vorheriges Beispiel" : "Nächstes Beispiel"}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4de8]"
    >
      <span
        className={cn(
          "absolute inset-0 bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
          prev ? "-translate-x-full" : "translate-x-full",
        )}
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        className="relative z-10 text-white transition-colors group-hover:text-[#0a0a0a]"
      >
        <path
          d={prev ? "M10 12L6 8L10 4" : "M6 4L10 8L6 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

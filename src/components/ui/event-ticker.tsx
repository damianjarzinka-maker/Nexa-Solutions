"use client";

/**
 * EventTicker — a feed that emits one row at a time: new rows slide in at the
 * bottom, the list shifts up, and the topmost row dissolves under a gradient
 * mask. Purely DOM/CSS driven (no canvas), so it's safe on phones.
 *
 * Conventions followed:
 * - Ticks only while on screen (IntersectionObserver writes to a ref, the
 *   interval reads it) — same idea as parallax-floating.tsx.
 * - prefers-reduced-motion: no ticking, no enter/exit animation; the initial
 *   rows are simply shown as a static list.
 * - Deterministic order (a modulo counter, never Math.random) so the server
 *   render and the client's first paint are identical — no hydration warning
 *   and no `react-hooks/purity` lint error.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface TickerEvent {
  /** Stable identity for the event itself (industry+index). */
  id: string;
  /** Illustrative time of day, e.g. "06:12". */
  time: string;
  /** What ran, e.g. "Reservierung bestätigt". */
  label: string;
  /** Industry label shown as a chip. */
  tag: string;
}

interface EventTickerProps {
  events: TickerEvent[];
  visibleCount?: number;
  intervalMs?: number;
  className?: string;
}

/** Takes the first `count` events, wrapping around if the pool is shorter. */
function seed(events: TickerEvent[], count: number): TickerEvent[] {
  if (events.length === 0) return [];
  return Array.from({ length: count }, (_, i) => events[i % events.length]);
}

export function EventTicker({
  events,
  visibleCount = 7,
  intervalMs = 2200,
  className,
}: EventTickerProps) {
  const reducedMotion = useReducedMotion();

  // Rows carry a monotonically increasing key: the same event can be on screen
  // twice (short pools), so the event id alone isn't a unique React key.
  const [rows, setRows] = useState(() =>
    seed(events, visibleCount).map((event, i) => ({ key: i, event })),
  );

  const cursorRef = useRef(visibleCount);
  const keyRef = useRef(visibleCount);
  const inViewRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // NOTE: to restart the feed with a different pool (industry filter), give
  // this component a new `key` in the parent — that remounts it and re-seeds
  // from the initializer. Resetting via an effect would mean setState in an
  // effect body, which this codebase's lint (rightly) rejects.

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || events.length === 0) return;

    const id = setInterval(() => {
      if (!inViewRef.current) return;
      const next = events[cursorRef.current % events.length];
      cursorRef.current += 1;
      const key = keyRef.current++;
      setRows((prev) => [...prev.slice(1), { key, event: next }]);
    }, intervalMs);

    return () => clearInterval(id);
  }, [events, intervalMs, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        // Rows dissolve into the panel instead of being cut off hard.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 100%)",
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {rows.map(({ key, event }) => (
          <motion.div
            key={key}
            layout={!reducedMotion}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            // `popLayout` drops rows off the front, so `:last-child` is always
            // the freshest event — it gets the blue tint and edge marker.
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm last:bg-[#3d4de8]/[0.07] last:shadow-[inset_2px_0_0_#3d4de8] sm:gap-4 sm:px-6"
          >
            <span className="w-11 shrink-0 font-geist text-xs tabular-nums text-[#8a867e] sm:w-12 sm:text-sm">
              {event.time}
            </span>
            {/* Phone: industry stacked above the label (no room side by side,
                and hiding it would lose the "many industries" message).
                sm+: the two sit in one row with a fixed industry column. */}
            <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
              <span className="block truncate text-[10px] uppercase tracking-[0.14em] text-[#3d4de8]/80 sm:w-32 sm:shrink-0 sm:text-xs">
                {event.tag}
              </span>
              <span className="block truncate text-[#0a0a0a] sm:min-w-0 sm:flex-1">
                {event.label}
              </span>
            </span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
              className="h-4 w-4 shrink-0 text-[#3d4de8]"
            >
              <path
                d="M4 10.5 8 14.5 16 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

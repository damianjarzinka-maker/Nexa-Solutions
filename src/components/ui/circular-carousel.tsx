"use client";

/**
 * CircularCarousel — cards travel along an elliptical arc; the front card is
 * the active one. Autoplay pauses on hover/focus, ←/→ step through it.
 *
 * Adapted to this site's light surface (#f2efeb) and brand blue (#3d4de8);
 * the geometry and motion are unchanged from the original.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useIsMobile } from "@/hooks/use-is-mobile";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  icon?: LucideIcon;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;

/**
 * The original hard-codes a 220px horizontal radius. That is a fixed pixel arc
 * inside a fluid container: on a phone the outer cards land far outside the
 * viewport. These scale with the breakpoint instead — and the desktop value is
 * wider than the original so the neighbouring cards' titles aren't swallowed
 * by the front card.
 */
const RADIUS_X = { sm: 130, md: 210, lg: 280 };
const RADIUS_Y = 100;

/**
 * The arc alone runs from y=-100 (front card) to y=-31 (back cards), i.e. it
 * sits entirely above the track's midline. This pushes it back down so the
 * cards are actually centred in the track instead of hugging its top edge.
 */
const ARC_Y_OFFSET = 80;

const BRAND = "#3d4de8";

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * radiusX;
  const y = -Math.cos(angle) * RADIUS_Y + ARC_Y_OFFSET;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  // Cards stay fully opaque. The original fades them to 0.3, which works on
  // its near-black surface (a faded dark card simply disappears) but not on
  // ours: a translucent white card over warm white keeps its dark text
  // readable, so every card behind the front one bleeds through the stack.
  // Depth comes from scale, shadow and text colour instead.
  const opacity = 1;
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  // `null` on the server and the first client paint — falls back to the widest
  // arc, matching the desktop render so hydration stays clean.
  const isPhone = useIsMobile("(max-width: 639px)");
  const isTablet = useIsMobile("(max-width: 1023px)");
  const radiusX =
    isPhone === true
      ? RADIUS_X.sm
      : isTablet === true
        ? RADIUS_X.md
        : RADIUS_X.lg;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Leistungen"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 outline-none",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[280px] w-full max-w-xl sm:h-[260px]">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total, radiusX);
            if (!pos) return null;

            const isActive = i === activeIndex;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                // Centred with negative margins, NOT -translate-x/y-1/2:
                // framer-motion writes its own inline `transform` for x/y/scale,
                // which overwrites Tailwind's translate utilities entirely. The
                // original relies on those classes, so its whole arc renders
                // offset by half a card (right and down) from the track centre.
                // Margins are a separate box-model property and survive.
                className={cn(
                  "absolute left-1/2 top-1/2 -ml-[88px] -mt-[92px] flex h-[184px] w-44 cursor-pointer flex-col items-start justify-between rounded-2xl border bg-white p-4 text-left transition-shadow duration-300",
                  "sm:-ml-[120px] sm:-mt-[80px] sm:h-40 sm:w-60",
                  isActive
                    ? "border-[#3d4de8]/25 shadow-[0_24px_60px_-16px_rgba(61,77,232,0.35)]"
                    : "border-black/10 shadow-[0_8px_24px_-8px_rgba(10,10,10,0.20)] hover:shadow-[0_14px_32px_-10px_rgba(10,10,10,0.28)]",
                )}
                style={{ transformOrigin: "center center" }}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  {item.tag && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors duration-300",
                        isActive
                          ? "bg-[#3d4de8]/10 text-[#3d4de8]"
                          : "bg-black/[0.05] text-[#8a867e]",
                      )}
                    >
                      {item.tag}
                    </span>
                  )}
                  {Icon && (
                    <Icon
                      size={16}
                      className={cn(
                        "shrink-0 transition-colors duration-300",
                        isActive ? "text-[#3d4de8]" : "text-[#b3aea4]",
                      )}
                    />
                  )}
                </div>
                <div className="w-full">
                  <h3
                    className={cn(
                      "font-semibold leading-tight transition-colors duration-300",
                      isActive
                        ? "text-base text-[#0a0a0a]"
                        : "text-sm text-[#55524c]",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed transition-colors duration-300",
                      isActive ? "text-[#6b675e]" : "text-[#8a867e]",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Index. The original centres this behind the cards, which only works
          because its cards are translucent. With opaque cards it would be
          invisible, so it sits below the arc instead. */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none flex flex-col items-center"
      >
        <span
          className="font-serif text-5xl font-bold tracking-tight"
          style={{ color: BRAND }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 text-xs text-[#8a867e]">
          von {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Vorheriger Punkt"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#55524c] transition-colors hover:border-black/20 hover:text-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-[#3d4de8]/40"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-[#3d4de8]"
                  : "w-1.5 bg-black/15 hover:bg-black/30",
              )}
              aria-label={`Zu Punkt ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Nächster Punkt"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#55524c] transition-colors hover:border-black/20 hover:text-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-[#3d4de8]/40"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;

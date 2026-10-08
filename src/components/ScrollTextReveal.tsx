"use client";

/**
 * ScrollTextReveal — scrubbed word-by-word brightening headline.
 *
 * The whole paragraph sits in the layout from the start, dimmed (white @ 0.15 /
 * red @ dark). As the block scrolls through the viewport, each word is lifted to
 * full opacity in sequence (stagger), driven directly by scroll progress — not a
 * timed tween. The section is NOT pinned: it scrolls normally, only the per-word
 * opacity changes. Progress is element-relative (offset), so the fill tracks how
 * far the block itself has moved through the viewport.
 */
import { useEffect, useRef, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import HeroAscii from "@/components/ui/hero-ascii-one";
import { useIsMobile } from "@/hooks/use-is-mobile";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

// Background image collage (phase 2): scrolls up behind the still-pinned text.
// Self-hosted Unsplash photos (Unsplash licence), pre-sized to 640w — the
// largest render slot is md:w-40 (160px), so 640w covers 2x DPR with headroom.
const IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/media/collage/${String(i + 1).padStart(2, "0")}.jpg`,
);

// Clean, non-overlapping scatter; the collage scrolls up as one group.
const IMG_ITEMS = [
  { depth: 1, pos: "left-[8%] top-[8%]", size: "w-24 h-24 md:w-28 md:h-28", src: 0 },
  { depth: 2, pos: "left-[68%] top-[4%]", size: "w-28 h-36 md:w-36 md:h-44", src: 2 },
  { depth: 0.5, pos: "left-[40%] top-[15%]", size: "w-20 h-20 md:w-24 md:h-24", src: 1 },
  { depth: 3, pos: "left-[86%] top-[36%]", size: "w-24 h-24 md:w-32 md:h-32", src: 3 },
  { depth: 1, pos: "left-[4%] top-[46%]", size: "w-28 h-36 md:w-36 md:h-44", src: 4 },
  { depth: 2, pos: "left-[52%] top-[50%]", size: "w-24 h-24 md:w-32 md:h-32", src: 7 },
  { depth: 1.5, pos: "left-[22%] top-[72%]", size: "w-32 h-40 md:w-40 md:h-52", src: 5 },
  { depth: 1, pos: "left-[70%] top-[76%]", size: "w-24 h-24 md:w-32 md:h-32", src: 6 },
];

const TEXT =
  "Epos Solutions ist ein spezialisiertes Digitalstudio, in dem Technologie auf Kreativität trifft. Strategie ist unser Kompass. Sie gibt die Richtung vor und sorgt dafür, dass jede Entscheidung mit klarem Ziel getroffen wird. Wir verleihen jeder Marke Bedeutung und entwickeln zeitlose Identitäten, die über alle digitalen Berührungspunkte hinweg Bestand haben. Design ist unser Herzschlag. Wir erwecken Ideen zum Leben und schaffen digitale Erlebnisse, die begeistern, inspirieren und mit Ihrem Unternehmen wachsen. Durch Full-Stack-Entwicklung verwandeln wir Visionen in nahtlose, leistungsstarke digitale Lösungen, die Funktionalität und Ästhetik vereinen. Wir setzen auf langfristige Partnerschaften und unterstützen Unternehmen dabei, zu analysieren, zu optimieren und nachhaltig zu skalieren.";

// Accent keywords — permanently coloured (soft baby blue) while the rest of
// the paragraph fades to white and out.
const KEYWORDS = new Set([
  "STRATEGIE",
  "MARKE",
  "DESIGN",
  "ENTWICKLUNG",
  "PARTNERSCHAFTEN",
]);

const ACCENT = "#8fc3f0";
const WHITE = "#ffffff";

// A token is red if any of its letter-segments is a keyword. Matching on
// segments lets "FULL-STACK-ENTWICKLUNG" match on "ENTWICKLUNG", while
// "MARKEN" (segment "MARKEN") correctly does NOT match "MARKE". Only the
// keyword part turns red — any prefix ("FULL-STACK-") stays white and fades
// out with the rest of the text.
function splitRedToken(token: string): { pre: string; red: string } | null {
  const re = /[A-Za-zÄÖÜäöü]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(token))) {
    if (KEYWORDS.has(m[0].toUpperCase())) {
      return { pre: token.slice(0, m.index), red: token.slice(m.index) };
    }
  }
  return null;
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

function Word({
  children,
  red,
  redIndex,
  redCount,
  prefix,
  fadeOut,
  gather,
  grow,
  growFactor,
  range,
  containerRef,
}: {
  children: string;
  red: boolean;
  redIndex: number;
  redCount: number;
  prefix?: string;
  fadeOut: MotionValue<number>;
  gather: MotionValue<number>;
  grow: MotionValue<number>;
  growFactor: number;
  range: [number, number];
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  // The whole paragraph is fully lit from the start — no word-by-word reveal.
  // White words later fade back out one by one over their slice of `fadeOut`
  // (reading order), leaving only the red keywords. Red keywords skip the
  // fade-out and stay put (no reflow: hidden words keep their layout space).
  // A red token's white prefix (e.g. "FULL-STACK-" before "ENTWICKLUNG")
  // fades out like any other white word.
  const opacity = useTransform(fadeOut, (f) => {
    const out = clamp01((f - range[0]) / (range[1] - range[0]));
    return 1 - out;
  });

  // Gather phase (red words only): measured pixel delta from the word's natural
  // spot in the paragraph to its slot in a centered vertical stack. Measured
  // relative to the sticky container, so the value is scroll-invariant. The
  // slot offset is kept separate from the center delta so the stack's spacing
  // can widen while the words scale up in the grow phase.
  const wordRef = useRef<HTMLSpanElement>(null);
  const delta = useRef({ x: 0, y: 0, slot: 0 });

  // Grow phase: once stacked, the words scale up top to bottom in one fluid
  // wave — heavily overlapping windows (small stagger, long growth) so it
  // reads as a single motion rather than word-by-word steps.
  const growT = useTransform(grow, (gr) =>
    clamp01((gr - redIndex * 0.08) / 0.68)
  );

  const x = useTransform(gather, (g) => g * delta.current.x);
  const y = useTransform([gather, growT], (values) => {
    const [g, t] = values as [number, number];
    // Spacing widens with the word's own growth so the bigger lines don't
    // collide — the widen amount scales with growFactor (0.6 × 0.75 = 0.45
    // on desktop, matching the original tuning), so the final gap stays
    // ≈ the grown line height and the stack reads as one tight block.
    return g * (delta.current.y + delta.current.slot * (1 + 0.6 * growFactor * t));
  });
  const scale = useTransform(growT, (t) => 1 + growFactor * t);

  useEffect(() => {
    if (!red) return;
    const measure = () => {
      const el = wordRef.current;
      const c = containerRef.current;
      if (!el || !c) return;
      const er = el.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      // Strip the currently applied transform/scale so re-measures (resize,
      // font load) always work from the word's natural layout position.
      const naturalX = er.left + er.width / 2 - x.get();
      const naturalY = er.top + er.height / 2 - y.get();
      const height = er.height / scale.get();
      const spacing = height * 1.4;
      delta.current = {
        x: cr.left + cr.width / 2 - naturalX,
        y: cr.top + cr.height / 2 - naturalY,
        slot: (redIndex - (redCount - 1) / 2) * spacing,
      };
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [red, redIndex, redCount, containerRef, x, y, scale]);

  if (red) {
    return (
      <>
        {prefix ? (
          <motion.span style={{ opacity, color: WHITE }}>{prefix}</motion.span>
        ) : null}
        <motion.span
          ref={wordRef}
          className="inline-block"
          style={{ x, y, scale, color: ACCENT }}
        >
          {children}
        </motion.span>{" "}
      </>
    );
  }
  return (
    <motion.span style={{ opacity, color: WHITE }}>{children} </motion.span>
  );
}

export function ScrollTextReveal() {
  const ref = useRef<HTMLElement>(null);

  // Mobile GPUs choke on the two WebGL layers (Spline robot + UnicornStudio
  // ASCII) plus the parallax rAF loop — swap them for cheap alternatives.
  const isMobile = useIsMobile();

  // On narrow phones the widest keyword (PARTNERSCHAFTEN) at full 1.75× grow
  // would overflow the viewport and get clipped by the sticky container's
  // overflow-hidden — cap the growth there; tablets keep the desktop feel.
  const isNarrow = useIsMobile("(max-width: 480px)");
  const growFactor = isNarrow === true ? 0.3 : 0.75;

  // Element-relative: 0 when the block's top is near the bottom of the viewport,
  // 1 when its bottom has risen past the middle — no pinning involved.
  // offset "start start" → progress 0 is exactly the moment the section pins, so
  // the whole 0..1 range plays out while the text is fixed (not during scroll-in).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress: wheel ticks land softly instead of jumping the
  // backdrops — same feel as the hero zoom. With prefers-reduced-motion the
  // spring is bypassed: everything tracks the scrollbar 1:1, no inertia.
  const reducedMotion = useReducedMotion();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0001,
  });
  const progress = reducedMotion ? scrollYProgress : springProgress;

  // Phase breakpoints below were tuned against a 700vh track (600vh pinned).
  // The track is now 640vh (540vh pinned); `t` compresses real progress back
  // into the old scale so every phase keeps its physical scroll distance.
  // 0.94 (not 0.9) so the grow phase (ends at t=0.9) completes at spring
  // target ≈0.957 — leaving headroom for the spring to settle before the pin
  // releases, same pattern as the hero zoom in BallHeroReveal.
  const t = useTransform(progress, (v) => v * 0.94);

  // Sequenced choreography (text stays pinned the whole way). Note: y-% is
  // relative to each element's own height — the robot layer is 160vh tall, so
  // -130% (~208vh) already puts it fully off-screen; more would just add dead
  // scroll between robot and images.
  //   0.04–0.34  robot scrolls up & out (fading at the tail end)
  //   0.26–0.78  images rise from below, directly behind the robot's exit
  //   0.58–0.82  ASCII animation rises through, chasing the images' exit so
  //              the screen never sits empty
  //   0.20–0.60  white words fade out one by one — only the red keywords remain
  //   0.62–0.76  the remaining red keywords glide from their scattered spots in
  //              the paragraph into a centered vertical stack
  //   0.78–0.90  once stacked, the words scale up in one overlapping wave
  //              (top to bottom), the stack spacing widening with them
  const robotY = useTransform(t, [0.04, 0.34], ["0%", "-130%"]);
  const robotOpacity = useTransform(t, [0, 0.27, 0.34], [0.5, 0.5, 0]);

  const imagesY = useTransform(t, [0.26, 0.78], ["100%", "-160%"]);

  // Mobile: no y-movement at all — the collage sits still and simply fades
  // in/out over the same window. A single-layer opacity tween is far cheaper
  // than translating eight large images every frame.
  const imagesOpacity = useTransform(
    t,
    [0.26, 0.36, 0.68, 0.78],
    [0, 1, 1, 0]
  );

  // ASCII wrapper is 100vh tall, so ±110% clears the viewport on both ends.
  // Starts while the last images are still on their way out, so it enters the
  // moment the screen would otherwise go empty.
  const asciiY = useTransform(t, [0.58, 0.82], ["110%", "-110%"]);

  const fadeOutProgress = useTransform(t, [0.2, 0.6], [0, 1]);

  const gatherProgress = useTransform(t, [0.62, 0.76], [0, 1]);

  const growProgress = useTransform(t, [0.78, 0.9], [0, 1]);

  const stickyRef = useRef<HTMLDivElement>(null);

  const words = TEXT.split(" ");
  const total = words.length;
  const splits = words.map(splitRedToken);
  const redCount = splits.filter(Boolean).length;
  let redSeen = 0;

  return (
    // Tall track + sticky viewport: the text stays pinned ("gestuckt") the whole
    // way. h-[640vh] = 540vh of pinned scroll: robot → images → red keywords
    // gather & grow — the pin releases the moment the grow finishes, so the
    // next (white) section follows immediately.
    <section ref={ref} className="relative h-[640vh] bg-black">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-16"
      >
        {/* Faint interactive 3D robot behind the text, pinned left, drifting up.
            h-[160%] keeps the canvas bottom — where Spline bakes its watermark —
            below the clip edge across the entire parallax range. Desktop only:
            phones drop the robot entirely (no WebGL, no static frame) so the
            text stands alone on a clean background. isMobile === null (SSR +
            first client render) also skips it — avoids a flash before the
            media query resolves. */}
        {isMobile === false && (
        <motion.div
          style={{
            y: robotY,
            x: "-30%",
            opacity: robotOpacity,
            // Fade the robot's own bottom to transparent. The mask travels with
            // the element, so Spline's baked-in watermark (bottom of the canvas)
            // stays in the transparent zone even while the robot scrolls up & out.
            maskImage:
              "linear-gradient(to top, transparent 0%, transparent 12%, black 30%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, transparent 12%, black 30%, black 100%)",
          }}
          // Shifts the robot's native violet to a soft baby blue matching the
          // keyword accent.
          className="pointer-events-none absolute -top-[10%] left-0 z-0 h-[160%] w-full [filter:hue-rotate(-60deg)_saturate(1.15)_brightness(1.08)]"
        >
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="h-full w-full"
          />
        </motion.div>
        )}

        {/* Phase 2 — image collage scrolls up from below, behind the text (z-0). */}
        <motion.div
          style={isMobile === true ? { opacity: imagesOpacity } : { y: imagesY }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          {isMobile === true && (
            // Fully static scatter: no parallax loop, no scroll translation
            // (the wrapper only fades), and much smaller image files.
            <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
              {IMG_ITEMS.map((item, i) => (
                <div key={i} className={`absolute ${item.pos}`}>
                  {/* Plain <img>: fixed-size decorative tiles, already
                      pre-sized — next/image adds no value here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[item.src]}
                    alt=""
                    loading="lazy"
                    className={`${item.size} object-cover`}
                  />
                </div>
              ))}
            </div>
          )}
          {isMobile === false && (
            <Floating sensitivity={-1} className="overflow-hidden">
              {IMG_ITEMS.map((item, i) => (
                <FloatingElement key={i} depth={item.depth} className={item.pos}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[item.src]}
                    alt=""
                    className={`${item.size} object-cover`}
                  />
                </FloatingElement>
              ))}
            </Floating>
          )}
        </motion.div>

        {/* Phase 3 — ASCII animation scrolls up directly behind the images'
            exit, behind the text (z-0). The scene is a single baked canvas
            (figure + star field), so the stars can't be removed individually —
            instead a mask keeps the figure on the left and fades the rest of
            the canvas (where the stars live) to transparent. Skipped entirely
            on mobile: a second WebGL context is what tanks the framerate. */}
        {isMobile === false && (
        <motion.div
          style={{
            y: asciiY,
            // Shift the whole layer right so the figure (left part of the
            // canvas) sits on the right side of the screen; the masked-out
            // star field moves off-screen.
            x: "55%",
            maskImage:
              "linear-gradient(to right, black 0%, black 38%, transparent 62%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 38%, transparent 62%)",
          }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <HeroAscii className="h-full w-full" />
        </motion.div>
        )}

        <p className="relative z-10 max-w-[64rem] font-geist text-lg font-medium uppercase leading-[1.3] tracking-tight sm:text-xl md:text-2xl md:leading-[1.28] lg:text-[1.9rem]">
        {words.map((word, i) => {
          // Each word fades out over its own slice of the scroll → staggered.
          const start = i / total;
          const end = (i + 1) / total;
          const split = splits[i];
          const red = split !== null;
          const redIndex = red ? redSeen++ : -1;
          return (
            <Word
              key={i}
              red={red}
              redIndex={redIndex}
              redCount={redCount}
              prefix={split?.pre || undefined}
              fadeOut={fadeOutProgress}
              gather={gatherProgress}
              grow={growProgress}
              growFactor={growFactor}
              range={[start, end]}
              containerRef={stickyRef}
            >
              {split ? split.red : word}
            </Word>
          );
        })}
        </p>
      </div>
    </section>
  );
}

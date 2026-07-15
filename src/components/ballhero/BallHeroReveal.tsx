"use client";

/**
 * BallHeroReveal — scroll-driven reveal + zoom-into-letter around the first hero.
 *
 * Two phases on ONE pinned, scrubbed track (offset "end end" so progress=1 lands
 * exactly at pin-release — no early unpin):
 *
 *   Phase 1 — Reveal  (progress 0   → 0.4)
 *     · grey blur layer slides up (translateY 100% → 0%)
 *     · "EPOS" rises within its mask, staggered behind the layer
 *
 *   Phase 2 — Zoom into the "O"  (progress 0.42 → ~0.9)
 *     · the EPOS element scales up (1 → 45) with transform-origin pinned to the
 *       MEASURED centre of the "O" (not guessed — read from real layout, recomputed
 *       on resize / font load)
 *     · a black panel cross-fades in at the very end (progress 0.88 → 1), so the
 *       screen is uniform black exactly when the pin releases → seamless into the
 *       (black) next section. Variant B (cross-fade) — cleaner than masking the
 *       next section through the glyph counter in this text-based markup.
 *
 * Scroll-bound throughout; Framer Motion tears down the scroll listener on unmount.
 */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BallHero } from "./BallHero";

export function BallHeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const oRef = useRef<HTMLSpanElement>(null);

  // transform-origin for the zoom, measured at the centre of the "O".
  const [origin, setOrigin] = useState("50% 50%");

  useEffect(() => {
    const compute = () => {
      const h2 = textRef.current;
      const o = oRef.current;
      if (!h2 || !o) return;
      const hb = h2.getBoundingClientRect();
      const ob = o.getBoundingClientRect();
      // Zoom target = a point ON the black left stroke of the "O" (NOT its hollow
      // centre, which is grey). 0.16 of the O's width sits inside the thick bowl
      // stroke of a bold serif "O"; 0.5 of its height is its vertical middle.
      // Expressed as a % of the text box → invariant under the phase-1 translateY.
      const OX = 0.16;
      const OY = 0.5;
      const x = ((ob.left + ob.width * OX - hb.left) / hb.width) * 100;
      const y = ((ob.top + ob.height * OY - hb.top) / hb.height) * 100;
      setOrigin(`${x}% ${y}%`);
    };
    compute();
    // Re-measure once the web font has actually loaded (metrics shift on swap).
    document.fonts?.ready.then(compute).catch(() => {});
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress: wheel ticks land softly instead of jumping the
  // animation, making the whole reveal→zoom feel fluid. With
  // prefers-reduced-motion the spring is bypassed: the reveal/zoom track the
  // scrollbar 1:1, no inertia.
  const reducedMotion = useReducedMotion();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0001,
  });
  const progress = reducedMotion ? scrollYProgress : springProgress;

  // Phase 1 — reveal
  const overlayY = useTransform(progress, [0, 0.3], ["100%", "0%"]);
  const textY = useTransform(progress, [0.12, 0.36], ["115%", "0%"]);

  // Phase 2 — zoom into the black stroke of the "O".
  // Scale is perceived logarithmically, so a LINEAR 1→45 ramp looks explosive at
  // the start. Instead: ease-in-out the phase progress, then grow exponentially
  // (constant perceived zoom speed). Ends at 0.96 so the spring settles fully
  // black before the pin releases.
  const ZOOM_START = 0.42;
  const ZOOM_END = 0.96;
  const MAX_SCALE = 45;
  const zoom = useTransform(progress, (v) => {
    const p = Math.min(Math.max((v - ZOOM_START) / (ZOOM_END - ZOOM_START), 0), 1);
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    return Math.exp(eased * Math.log(MAX_SCALE));
  });
  // Same-layer background keyframe: grey → pure opaque black, finished just before
  // release. No separate opacity layer, no delay → no grey in-between frame.
  const overlayBg = useTransform(
    progress,
    [0.7, 0.92],
    ["rgba(120,120,120,0.72)", "rgba(0,0,0,1)"],
  );
  // Once the overlay is fully black (zoom done), drop its z-index below the navbar
  // (z-40) so the nav reappears immediately — black-on-black hides any seam.
  const overlayZ = useTransform(progress, (v) => (v >= 0.94 ? 30 : 50));

  return (
    // h-[300vh] = 200vh of pin distance — enough room that a single wheel tick
    // only advances the zoom a little; the next section still follows the moment
    // the zoom-to-black finishes (no dead scroll at the end).
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Layer A — pinned black hero, below the navbar (z-0). */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <BallHero />
      </div>

      {/* Layer B — grey blur overlay above the navbar (z-50). backgroundColor is
          animated (grey → black) instead of a fixed class, so the climax is black. */}
      <motion.div
        style={{ y: overlayY, backgroundColor: overlayBg, zIndex: overlayZ }}
        className="sticky top-0 -mt-[100vh] flex h-screen w-full items-center justify-center overflow-hidden backdrop-blur-sm md:backdrop-blur-md"
      >
        {/* Zoom wrapper — scaled with origin locked on the "O". Tightly wraps the
            mask so the measured % origin matches this element's box. */}
        <motion.div style={{ scale: zoom, transformOrigin: origin }}>
          {/* Mask: clips the phase-1 rise */}
          <div className="overflow-hidden">
            <motion.h2
              ref={textRef}
              style={{ y: textY }}
              className="select-none whitespace-nowrap font-serif text-[20vw] font-bold leading-[0.85] tracking-tight text-black"
            >
              EP<span ref={oRef}>O</span>S
            </motion.h2>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

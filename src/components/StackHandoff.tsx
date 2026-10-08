"use client";

/**
 * StackHandoff — scroll hand-off between two sections: once the bottom of
 * `under` reaches the bottom of the viewport it stays put (sticky), and
 * `over` slides up across it like a sheet. While it's being covered, `under`
 * eases back slightly (scale + darkening) so the hand-off reads as depth.
 *
 * Sticky offset: `top = viewport height − under height` pins the section by
 * its bottom edge, whatever its length. Measured, because CSS has no
 * "stick by the bottom edge" for elements taller than the viewport.
 * Requires no `overflow: hidden/auto` ancestor (that would break sticky).
 * data-stack-* attributes let lib/section-scroll measure natural positions.
 *
 * Phones/tablets: no scale (re-rastering a several-thousand-px layer every
 * frame is what makes mobile GPUs stutter) — the veil alone carries the depth.
 * The sticky offset ignores height-only viewport changes, which mobile
 * browsers fire constantly while the address bar slides in/out mid-scroll.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function StackHandoff({
  under,
  over,
}: {
  under: ReactNode;
  over: ReactNode;
}) {
  const underRef = useRef<HTMLDivElement>(null);
  const overRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);
  const reducedMotion = useReducedMotion();
  // null until known (SSR) → no scale until we know it's a desktop.
  const isTouchOrSmall = useIsMobile("(max-width: 1023px), (pointer: coarse)");
  const allowScale = !reducedMotion && isTouchOrSmall === false;

  useEffect(() => {
    const node = underRef.current;
    if (!node) return;
    const update = () =>
      setStickyTop(Math.min(0, window.innerHeight - node.offsetHeight));
    update();
    // `under` itself resizing (content, fonts, breakpoints) → re-measure.
    const ro = new ResizeObserver(update);
    ro.observe(node);
    // Viewport: only react to width changes; height-only resizes are the
    // mobile address bar and would make the pinned section jump.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      update();
    };
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // 0 → `over` just entering at the bottom, 1 → its top reached the top.
  const { scrollYProgress } = useScroll({
    target: overRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <div className="relative">
      <div
        ref={underRef}
        data-stack-sticky
        className="sticky z-0"
        style={{ top: stickyTop }}
      >
        <motion.div
          data-stack-scale
          className="origin-bottom"
          style={{ scale: allowScale ? scale : 1 }}
        >
          {under}
        </motion.div>
        {/* Darkening veil — separate layer so `under` keeps its own colours. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#0a0a0a]"
          style={{ opacity: reducedMotion ? 0 : shade }}
        />
      </div>
      <div ref={overRef} className="relative z-10">
        {over}
      </div>
    </div>
  );
}

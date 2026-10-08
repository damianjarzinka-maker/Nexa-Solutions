"use client";

/**
 * SmoothScroll — Lenis-driven weighted scrolling for a smoother, more
 * controlled feel on phones. Enabled ONLY on phone-sized touch screens:
 * desktops keep native wheel, and iPads/tablets keep native touch momentum —
 * Lenis syncTouch fights iPadOS scroll physics and desyncs the pinned
 * sections (hero zoom, orbital), so those get the clean native behaviour.
 * Disabled entirely under prefers-reduced-motion.
 *
 * Lenis scrolls the real document (not a transform wrapper), so sticky
 * sections and framer-motion's useScroll keep working. Interactive drag
 * surfaces (e.g. the before/after slider) opt out via data-lenis-prevent.
 */
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Phone only: coarse pointer + narrow width. Excludes iPad (coarse but
    // wide) and desktop (fine pointer), which both stay on native scroll.
    const isPhone = window.matchMedia(
      "(max-width: 640px) and (pointer: coarse)",
    ).matches;
    if (!isPhone) return;

    const lenis = new Lenis({
      lerp: 0.1,
      // Desktop wheel untouched — only touch gets the weighted smoothing.
      smoothWheel: false,
      syncTouch: true,
      syncTouchLerp: 0.08,
      // Lower multiplier = each swipe advances less = more controlled.
      touchMultiplier: 1.1,
    });

    // Exposed for lib/section-scroll so anchor jumps go through Lenis.
    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (window.__lenis === lenis) delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}

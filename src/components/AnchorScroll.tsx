"use client";

/**
 * AnchorScroll — routes every same-page "#section" link (navbar, footer,
 * in-section CTAs) through scrollToSection, so jumps land correctly even
 * into the sticky StackHandoff sections. Also fixes the landing position
 * when arriving from another page via /#section.
 *
 * Capture-phase listener: runs before Next's <Link> handler, which then sees
 * `defaultPrevented` and skips its own navigation.
 */
import { useEffect } from "react";
import { scrollToSection } from "@/lib/section-scroll";

export function AnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!scrollToSection(id)) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    // Arrived with a hash (e.g. /impressum → /#ki-loesungen): re-land once
    // layout has settled.
    let timer: number | undefined;
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      timer = window.setTimeout(() => scrollToSection(id, "auto"), 150);
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}

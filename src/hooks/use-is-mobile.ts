"use client";

import { useEffect, useState } from "react";

/**
 * True below the lg breakpoint (matches Tailwind's 1024px). Tri-state:
 * `null` until the media query has been evaluated on the client — SSR and
 * the first client render both see `null`, so consumers can skip mounting
 * expensive branches (WebGL layers, script embeds) until the real value is
 * known, without risking a hydration mismatch.
 */
export function useIsMobile(query = "(max-width: 1023px)") {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

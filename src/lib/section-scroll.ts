/**
 * In-page section jumps that work with the StackHandoff sticky sections.
 *
 * Native anchor scrolling measures an element where it is *rendered*, which
 * for a stuck (sticky) and scaled section is not where it sits in the flow —
 * jumping back up to #automatisierung would land in the wrong place. So we
 * measure the "natural" position: sticky wrappers flipped to static and the
 * scale transforms removed for one synchronous layout read, then restored
 * before the browser paints (no visible flash).
 */

export function naturalTop(el: HTMLElement): number {
  const stickies = Array.from(
    document.querySelectorAll<HTMLElement>("[data-stack-sticky]"),
  );
  const scaled = Array.from(
    document.querySelectorAll<HTMLElement>("[data-stack-scale]"),
  );
  const savedPos = stickies.map((s) => s.style.position);
  const savedTransform = scaled.map((s) => s.style.transform);
  stickies.forEach((s) => (s.style.position = "static"));
  scaled.forEach((s) => (s.style.transform = "none"));

  const top = el.getBoundingClientRect().top + window.scrollY;

  stickies.forEach((s, i) => (s.style.position = savedPos[i]));
  scaled.forEach((s, i) => (s.style.transform = savedTransform[i]));
  return top;
}

/** Scroll target for a section id, honouring its CSS scroll-margin-top. */
export function sectionScrollTarget(id: string): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.max(0, naturalTop(el) - margin);
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const top = sectionScrollTarget(id);
  if (top === null) return false;
  // Two frames: lets a just-closed mobile menu release `overflow: hidden`
  // on <body> before we scroll.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior });
    }),
  );
  return true;
}

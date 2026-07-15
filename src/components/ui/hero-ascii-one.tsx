'use client';

import { useEffect } from 'react';

/**
 * UnicornStudio ASCII background animation (project OMzqyUv6M3kSnv0JeAtC).
 * Lean extraction of the "hero-ascii-one" demo: just the animated canvas —
 * the surrounding demo chrome (header, CTA, footer) is intentionally left
 * out so this can run as a background layer behind other content.
 */
const SCRIPT_ID = 'unicornstudio-cdn';
const SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js';

interface UnicornStudioApi {
  init: () => void;
  destroy?: () => void;
  isInitialized?: boolean;
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioApi;
  }
}

export default function HeroAscii({ className }: { className?: string }) {
  useEffect(() => {
    // Robust init: UnicornStudio only scans for [data-us-project] containers
    // when init() runs. Our container (re)mounts with React (hot reload,
    // StrictMode double-mount), so re-init on every mount — destroy() first so
    // existing scenes don't get duplicated.
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;

    const boot = () => {
      if (cancelled) return;
      const us = window.UnicornStudio;
      if (us?.init) {
        us.destroy?.();
        us.init();
        us.isInitialized = true;
      }
    };

    if (window.UnicornStudio?.init) {
      boot();
    } else {
      if (!document.getElementById(SCRIPT_ID)) {
        const cdn = document.createElement('script');
        cdn.id = SCRIPT_ID;
        cdn.src = SCRIPT_SRC;
        document.head.appendChild(cdn);
      }
      // The script may already be loading (e.g. a previous mount added it) —
      // poll until its API shows up instead of relying on onload.
      poll = setInterval(() => {
        if (window.UnicornStudio?.init) {
          if (poll) clearInterval(poll);
          poll = null;
          boot();
        }
      }, 100);
    }

    // Add CSS to hide branding elements and crop canvas
    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }

      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }

      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    // Function to aggressively hide branding
    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]',
      ];

      selectors.forEach((selector) => {
        const containers = document.querySelectorAll(selector);
        containers.forEach((container) => {
          const allElements = container.querySelectorAll<HTMLElement>('*');
          allElements.forEach((el) => {
            const text = (el.textContent || '').toLowerCase();
            const title = (el.getAttribute('title') || '').toLowerCase();
            const href = (el.getAttribute('href') || '').toLowerCase();

            if (
              text.includes('made with') ||
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.opacity = '0';
              el.style.pointerEvents = 'none';
              el.style.position = 'absolute';
              el.style.left = '-9999px';
              el.style.top = '-9999px';
              try {
                el.remove();
              } catch {}
            }
          });
        });
      });
    };

    // The injected CSS above hides branding declaratively; these one-shot
    // sweeps only catch late-injected DOM. No recurring interval — a 20Hz
    // querySelectorAll('*') walk would compete with the scroll animation for
    // the main thread the entire time the page is open.
    hideBranding();
    const timeouts = [500, 1000, 2000, 5000, 10000].map((ms) =>
      setTimeout(hideBranding, ms)
    );

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      timeouts.forEach(clearTimeout);
      window.UnicornStudio?.destroy?.();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      data-us-project="OMzqyUv6M3kSnv0JeAtC"
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

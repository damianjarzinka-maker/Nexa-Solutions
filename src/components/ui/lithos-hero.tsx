"use client";

/**
 * LithosHero — full-screen dark hero with a cursor-following spotlight that
 * reveals a second image through a soft circular canvas mask.
 *
 * Integration notes (adapted from the standalone Vite spec):
 * - The nav is `absolute` (scoped to this section) instead of `fixed`, so it
 *   doesn't overlay the rest of the EPOS site.
 * - Cursor coords are section-relative (getBoundingClientRect), because the
 *   section sits at the bottom of a longer page, not at the viewport origin.
 * - Load animations fire when the section scrolls into view (IntersectionObserver),
 *   since a bottom-of-page section is never visible at document load.
 */
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

const SPOTLIGHT_R = 260;

function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
    grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
    grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const url = canvas.toDataURL();
    reveal.style.maskImage = `url(${url})`;
    reveal.style.webkitMaskImage = `url(${url})`;
    reveal.style.maskSize = "100% 100%";
    reveal.style.webkitMaskSize = "100% 100%";
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: "none" }}
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

export function LithosHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    // Only smooth/re-render while the section is on screen AND the cursor is
    // still converging — an idle cursor would otherwise re-render (and re-encode
    // the canvas mask) at 60fps for no visual change.
    let visible = false;
    const loop = () => {
      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      if (visible && (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1)) {
        smooth.current.x += dx * 0.1;
        smooth.current.y += dy * 0.1;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 },
    );
    io.observe(section);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, []);

  const anim = (cls: string, delay: string) =>
    inView ? { className: cls, style: { animationDelay: delay } } : {};

  return (
    <div
      className="tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-black"
        style={{ height: "100dvh" }}
      >
        {/* Base image (slow Ken Burns zoom once in view) */}
        <div
          className={`absolute inset-0 z-10 bg-cover bg-center bg-no-repeat ${inView ? "hero-zoom" : ""}`}
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Cursor spotlight reveal */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Section-scoped nav */}
        <nav className="absolute left-0 right-0 top-0 z-[60] flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="font-playfair text-2xl italic text-white">Lithos</span>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
            <button className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
              Course
            </button>
            {["Field Guides", "Geology", "Plans", "Live Tour"].map((label) => (
              <button
                key={label}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <button className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 md:block">
            Sign Up
          </button>
          <button aria-label="Menü" className="text-white md:hidden">
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>

        {/* Heading */}
        <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
          <h1 className="leading-[0.95] text-white">
            <span
              {...(inView
                ? { style: { animationDelay: "0.25s", letterSpacing: "-0.05em" } }
                : { style: { letterSpacing: "-0.05em" } })}
              className={`font-playfair block text-5xl font-normal italic sm:text-7xl md:text-8xl ${inView ? "hero-anim hero-reveal" : "opacity-0"}`}
            >
              Layers hold
            </span>
            <span
              {...(inView
                ? { style: { animationDelay: "0.42s", letterSpacing: "-0.08em" } }
                : { style: { letterSpacing: "-0.08em" } })}
              className={`-mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl ${inView ? "hero-anim hero-reveal" : "opacity-0"}`}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* Bottom-left paragraph */}
        <div
          className={`absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block md:left-14 ${inView ? "hero-anim hero-fade" : "opacity-0"}`}
          style={inView ? { animationDelay: "0.7s" } : undefined}
        >
          <p className="text-sm leading-relaxed text-white/80">
            Every layer of sediment records a chapter of our planet, from
            ancient seabeds to drifting ash, layered across millions of years
            beneath us.
          </p>
        </div>

        {/* Bottom-right block */}
        <div
          className={`absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14 ${inView ? "hero-anim hero-fade" : "opacity-0"}`}
          style={inView ? { animationDelay: "0.85s" } : undefined}
        >
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
            Our interactive maps let you peel back the crust to trace how
            stones, fossils, and deep time combine to shape the ground beneath
            your feet.
          </p>
          <button className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95">
            Start Digging
          </button>
        </div>
      </section>
    </div>
  );
}

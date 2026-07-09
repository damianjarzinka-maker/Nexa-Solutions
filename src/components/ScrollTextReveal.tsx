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
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const TEXT =
  "Epos Solutions ist ein spezialisiertes Digitalstudio, in dem Technologie auf Kreativität trifft. Strategie ist unser Kompass. Sie gibt die Richtung vor und sorgt dafür, dass jede Entscheidung mit klarem Ziel getroffen wird. Wir verleihen jeder Marke Bedeutung und entwickeln zeitlose Identitäten, die über alle digitalen Berührungspunkte hinweg Bestand haben. Design ist unser Herzschlag. Wir erwecken Ideen zum Leben und schaffen digitale Erlebnisse, die begeistern, inspirieren und mit Ihrem Unternehmen wachsen. Durch Full-Stack-Entwicklung verwandeln wir Visionen in nahtlose, leistungsstarke digitale Lösungen, die Funktionalität und Ästhetik vereinen. Wir setzen auf langfristige Partnerschaften und unterstützen Unternehmen dabei, zu analysieren, zu optimieren und nachhaltig zu skalieren.";

// Accent keywords — permanently red (dimmed = dark red, revealed = full red).
const KEYWORDS = new Set([
  "STRATEGIE",
  "MARKE",
  "DESIGN",
  "ENTWICKLUNG",
  "PARTNERSCHAFTEN",
]);

const RED = "#e02020";
const WHITE = "#ffffff";

// A token is red if any of its letter-segments is a keyword. Splitting on
// non-letters lets "FULL-STACK-ENTWICKLUNG" match on "ENTWICKLUNG", while
// "MARKEN" (segment "MARKEN") correctly does NOT match "MARKE".
function isRedWord(token: string) {
  return token
    .toUpperCase()
    .split(/[^A-ZÄÖÜ]+/)
    .some((seg) => KEYWORDS.has(seg));
}

function Word({
  children,
  red,
  progress,
  range,
}: {
  children: string;
  red: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, color: red ? RED : WHITE }}>
      {children}{" "}
    </motion.span>
  );
}

export function ScrollTextReveal() {
  const ref = useRef<HTMLElement>(null);

  // Element-relative: 0 when the block's top is near the bottom of the viewport,
  // 1 when its bottom has risen past the middle — no pinning involved.
  const { scrollYProgress } = useScroll({
    target: ref,
    // Progress starts while the block scrolls in and completes at un-stick, so
    // the word reveal runs through the whole parallax phase.
    offset: ["start 0.7", "end end"],
  });

  // Words finish lighting up in the first part; the text then stays parked
  // (fully lit) for the rest of the track until the squares section arrives.
  const wordProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  // Parallax: the robot backdrop drifts upward while the sticky text holds.
  const robotY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const words = TEXT.split(" ");
  const total = words.length;

  return (
    // Tall track + sticky viewport: the text stays pinned ("gestuckt") for the
    // whole ~180vh of extra scroll and only releases right as the next (grey
    // squares) section rises up to replace it.
    <section ref={ref} className="relative h-[280vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-16">
        {/* Faint interactive 3D robot behind the text, pinned left, drifting up.
            h-[160%] keeps the canvas bottom — where Spline bakes its watermark —
            below the clip edge across the entire parallax range. */}
        <motion.div
          style={{ y: robotY, x: "-30%" }}
          className="pointer-events-none absolute -top-[10%] left-0 z-0 h-[160%] w-full opacity-50 [filter:hue-rotate(100deg)_saturate(1.4)]"
        >
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="h-full w-full"
          />
        </motion.div>

        <p className="relative z-10 max-w-[64rem] font-geist text-lg font-medium uppercase leading-[1.3] tracking-tight sm:text-xl md:text-2xl md:leading-[1.28] lg:text-[1.9rem]">
        {words.map((word, i) => {
          // Each word brightens over its own slice of the scroll → staggered fill.
          const start = i / total;
          const end = (i + 1) / total;
          return (
            <Word
              key={i}
              red={isRedWord(word)}
              progress={wordProgress}
              range={[start, end]}
            >
              {word}
            </Word>
          );
        })}
        </p>
      </div>
    </section>
  );
}

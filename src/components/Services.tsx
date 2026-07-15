"use client";

import { motion } from "framer-motion";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const exampleImages = [
  "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop",
];

// Each floating image: position, depth (parallax strength), size classes, and
// the source index. Fade-in is driven by whileInView so it always fires on
// scroll (and survives re-renders), never a one-shot mount animation.
const ITEMS = [
  { depth: 0.5, pos: "left-[11%] top-[8%]", size: "w-16 h-16 md:w-24 md:h-24", src: 0 },
  { depth: 1, pos: "left-[32%] top-[10%]", size: "w-20 h-20 md:w-28 md:h-28", src: 1 },
  { depth: 2, pos: "left-[53%] top-[2%]", size: "w-28 h-40 md:w-40 md:h-52", src: 2 },
  { depth: 1, pos: "left-[83%] top-[0%]", size: "w-24 h-24 md:w-32 md:h-32", src: 3 },
  { depth: 1, pos: "left-[2%] top-[40%]", size: "w-28 h-28 md:w-36 md:h-36", src: 4 },
  { depth: 2, pos: "left-[77%] top-[70%]", size: "w-28 h-28 md:w-36 md:h-48", src: 7 },
  { depth: 4, pos: "left-[15%] top-[73%]", size: "w-40 md:w-52 h-full", src: 5 },
  { depth: 1, pos: "left-[50%] top-[80%]", size: "w-24 h-24 md:w-32 md:h-32", src: 6 },
];

export function Services() {
  return (
    <section
      id="leistungen"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <Floating sensitivity={-1} className="overflow-hidden">
        {ITEMS.map((item, i) => (
          <FloatingElement key={i} depth={item.depth} className={item.pos}>
            <motion.img
              src={exampleImages[item.src]}
              alt=""
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`${item.size} cursor-pointer object-cover transition-transform duration-200 hover:scale-105`}
            />
          </FloatingElement>
        ))}
      </Floating>
    </section>
  );
}

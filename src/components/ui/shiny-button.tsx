"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/cn";

const animationProps: MotionProps = {
  // Plays a one-shot shine sweep on mount (page load), then rests off-screen
  // on the right (--x: 100%) so the hover sweep can run again from the start.
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": ["100%", "-100%", "100%"], scale: 1 },
  whileHover: { "--x": "-100%" },
  whileTap: { scale: 0.95 },
  transition: {
    "--x": {
      type: "tween",
      duration: 1.2,
      ease: "easeInOut",
    },
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm font-light uppercase tracking-wide text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,rgba(255,255,255,1) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgba(255,255,255,1) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ImageComparisonProps {
  /** Shown on the left (clipped top layer). */
  beforeImage: string;
  /** Portrait (9:16) variant used below the md breakpoint. */
  beforeImageMobile?: string;
  altBefore?: string;
  /** Right side — any content (image, video, layered capture). It sits in a
      box (9:16 on mobile, 3:2 from md up) that defines the slider's height. */
  after: React.ReactNode;
}

/** Matches Tailwind's md breakpoint. page.tsx (server component) repeats this
    string for the "after" overlay — keep both in sync. */
const MOBILE_MEDIA = "(max-width: 767px)";

// Before/after slider: "before" is revealed from the left, "after" fills the rest.
export const ImageComparison = ({
  beforeImage,
  beforeImageMobile,
  altBefore = "Before",
  after,
}: ImageComparisonProps) => {
  // State to track the slider's position (from 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  // State to track if the user is currently dragging the slider
  const [isDragging, setIsDragging] = useState(false);

  // Ref to the main container element to get its dimensions
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle the slider movement (for both mouse and touch)
  const handleMove = useCallback(
    (clientX: number) => {
      // If not dragging or no container ref, do nothing
      if (!isDragging || !containerRef.current) return;

      // Get the bounding box of the container
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate the new slider position as a percentage
      let newPosition = ((clientX - rect.left) / rect.width) * 100;

      // Clamp the position to be between 0 and 100 to prevent it from going out of bounds
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    },
    [isDragging],
  );

  // Mouse event handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  // Touch event handlers
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX);
  };

  // Effect to add and clean up global event listeners for mouse up
  // This ensures dragging stops even if the cursor leaves the component area
  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onMouseUp);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // Opt out of Lenis so the horizontal drag isn't swallowed by smooth scroll.
      data-lenis-prevent
      className="relative mx-auto w-full max-w-4xl select-none overflow-hidden rounded-xl shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the container
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After (bottom layer) — defines the container's 3:2 height. */}
      <div className="relative block aspect-[9/16] w-full bg-white md:aspect-[3/2]">
        {after}
      </div>

      {/* Before (top layer) — visibility controlled by the clip-path. */}
      <div
        className="absolute left-0 top-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <picture>
          {beforeImageMobile && (
            <source media={MOBILE_MEDIA} srcSet={beforeImageMobile} />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImage}
            alt={altBefore}
            className="h-full w-full object-cover object-left-top"
            draggable="false"
          />
        </picture>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute bottom-0 top-0 flex w-1.5 cursor-ew-resize items-center justify-center bg-white/80"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }} // Center the handle on the line
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 ease-in-out ${isDragging ? "scale-110 shadow-xl" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <line x1="15" y1="18" x2="9" y2="12"></line>
            <line x1="9" y1="6" x2="15" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

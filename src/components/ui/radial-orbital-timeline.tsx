"use client";

/**
 * RadialOrbitalTimeline — interactive constellation of nodes orbiting a glowing
 * core. Click a node to expand its card and highlight connected nodes.
 *
 * Adapted from the shadcn reference to this codebase: self-contained (the
 * Badge/Button/Card primitives are inlined as plain elements — the project
 * doesn't use shadcn), uses @/lib/cn, and the accent gradient is the brand
 * blue instead of purple/teal. Standard Tailwind animation utilities
 * (animate-pulse/ping) are used as-is — no extra globals.css needed.
 */
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const STATUS_LABEL: Record<TimelineItem["status"], string> = {
  completed: "KERNSTÄRKE",
  "in-progress": "AKTIV",
  pending: "GEPLANT",
};

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const viewMode = "orbital" as const;

  // Positions come from cos/sin floats and a rotation timer, which can differ
  // between the server HTML and the client's first paint. Render the orbital
  // only on the client so SSR and hydration always agree (both see an empty
  // canvas first). useSyncExternalStore is the SSR-safe "is client" pattern:
  // server snapshot false, client snapshot true.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Responsive layout: on narrow screens shrink the orbit so nodes + labels
  // stay inside the viewport (the reference radius of 200 overflows phones),
  // and nudge the whole ring down so it clears the heading/subtitle.
  const viewportWidth = useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth,
    () => 1024,
  );
  // Keep the constellation at its full desktop proportions and just scale the
  // whole thing down + shift it lower on phones — core, nodes, labels and
  // spacing all stay perfectly composed, nothing gets fiddled individually.
  const isNarrow = viewportWidth < 640;
  const radius = 200;
  const mobileScale = isNarrow ? 0.66 : 1;
  const mobileShiftY = isNarrow ? 150 : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate, viewMode]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#0a0a0a] border-[#0a0a0a]";
      case "in-progress":
        return "text-white bg-[#3d4de8] border-[#3d4de8]";
      default:
        return "text-[#6b675e] bg-black/5 border-black/10";
    }
  };

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f2efeb]"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {mounted && (
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            // Scale + shift the whole constellation as one unit on phones.
            transform: `translateY(${mobileShiftY}px) scale(${mobileScale})`,
          }}
        >
          {/* Glowing core */}
          <div className="absolute z-10 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-[#3d4de8] via-[#4f7ef0] to-[#8fc3f0] shadow-[0_0_30px_rgba(61,77,232,0.35)]">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-[#3d4de8]/30 opacity-70"></div>
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-[#3d4de8]/20 opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md"></div>
          </div>

          {/* Orbit ring — diameter tracks the responsive radius. */}
          <div
            className="absolute rounded-full border border-black/10"
            style={{ width: radius * 2, height: radius * 2 }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy halo */}
                <div
                  className={`absolute -inset-1 rounded-full ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(61,77,232,0.18) 0%, rgba(61,77,232,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isExpanded
                      ? "scale-150 border-[#3d4de8] bg-[#3d4de8] text-white shadow-lg shadow-[#3d4de8]/30"
                      : isRelated
                        ? "animate-pulse border-[#3d4de8] bg-[#3d4de8]/15 text-[#3d4de8]"
                        : "border-transparent bg-[#0a0a0a] text-white"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "scale-125 text-[#0a0a0a]" : "text-[#6b675e]"
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute left-1/2 top-20 w-64 -translate-x-1/2 overflow-visible rounded-lg border border-[#e5e0d3] bg-white shadow-xl shadow-black/10">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-[#d8d3c5]"></div>
                    <div className="flex flex-col space-y-1.5 p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusStyles(
                            item.status,
                          )}`}
                        >
                          {STATUS_LABEL[item.status]}
                        </span>
                        <span className="font-mono text-xs text-[#9c9789]">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold leading-none tracking-tight text-[#0a0a0a]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="p-4 pt-0 text-xs text-[#55524c]">
                      <p>{item.content}</p>

                      <div className="mt-4 border-t border-[#e5e0d3] pt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Relevanz
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-[#e5e0d3]">
                          <div
                            className="h-full bg-gradient-to-r from-[#3d4de8] to-[#8fc3f0]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-[#e5e0d3] pt-3">
                          <div className="mb-2 flex items-center">
                            <LinkIcon size={10} className="mr-1 text-[#9c9789]" />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-[#6b675e]">
                              Passt zu
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId,
                              );
                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="flex h-6 items-center rounded border border-[#d8d3c5] bg-transparent px-2 py-0 text-xs text-[#55524c] transition-all hover:bg-black/5 hover:text-[#0a0a0a]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-[#9c9789]"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}

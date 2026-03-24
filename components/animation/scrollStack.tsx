"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ScrollStackProps {
  children: React.ReactNode[];
}

export function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll budget breakdown:
  //   - Each section gets 100vh of "reading" scroll (the active phase)
  //   - Each *transition* between sections gets only 40vh (enter/exit animation)
  //   - Formula: n sections × 100vh  +  (n-1) transitions × 40vh
  const n = children.length;
  const totalHeightVh = n * 100 + (n - 1) * 40;
  const totalHeight = `${totalHeightVh}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply incredibly sleek, floaty physics to make the scroll feel luxurious and cinematic.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 35,
    mass: 1.2,
    restDelta: 0.001
  });

  return (
    <div
      ref={containerRef}
      style={{ height: totalHeight }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children.map((child, index) => {
          return (
            <ScrollStackItem
              key={index}
              index={index}
              total={children.length}
              progress={smoothProgress}
            >
              {child}
            </ScrollStackItem>
          );
        })}
      </div>
    </div>
  );
}

interface ScrollStackItemProps {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ScrollStackItem({ children, index, total, progress }: ScrollStackItemProps) {
  const numPhases = 2 * total - 1;
  const phaseLength = 1 / numPhases;

  const activeStart = (2 * index) * phaseLength;
  const activeEnd = (2 * index + 1) * phaseLength;
  const enterStart = index === 0 ? activeStart : (2 * index - 1) * phaseLength;
  const enterEnd = activeStart;
  const fadeStart = activeEnd;
  const fadeEnd = index === total - 1 ? activeEnd : (2 * index + 2) * phaseLength;

  const getMapping = <T,>(enterVal: T, activeVal: T, fadeVal: T) => {
    if (total === 1) return { in: [0, 1], out: [activeVal, activeVal] };
    if (index === 0) return { in: [activeStart, fadeStart, fadeEnd], out: [activeVal, activeVal, fadeVal] };
    if (index === total - 1) return { in: [enterStart, enterEnd, activeEnd], out: [enterVal, activeVal, activeVal] };
    return { in: [enterStart, enterEnd, fadeStart, fadeEnd], out: [enterVal, activeVal, activeVal, fadeVal] };
  };

  // When a card is active, we let it scroll its inner content.
  // To do this, we map the "active" segment of the overall scroll to the card's inner Y translation.
  // E.g. card 1 is active from `start` to `end`.
  // As `progress` goes from `start` to `end`, the card's content translates from 0 to -100% (or whatever).
  // Wait, framer-motion doesn't know the exact pixel height of the child.
  // A better approach for "read the whole section" without inner scrollbars:
  // We just let the child BE its natural height. If it's taller than 100vh, the user needs to scroll it.

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    // Initial sizes
    setContentHeight(contentRef.current.scrollHeight);
    setWindowHeight(window.innerHeight);

    // Watch for internal content height changes dynamically (images loading, accordions, etc.)
    const resizeObserver = new ResizeObserver(() => {
      setContentHeight(contentRef.current?.scrollHeight || 0);
      setWindowHeight(window.innerHeight);
    });

    resizeObserver.observe(contentRef.current);

    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [children]);

  // Max distance the content needs to scroll up to be fully read
  // Removes excessive padding to prevent a gap from appearing below the final section
  const maxScroll = Math.max(0, contentHeight - windowHeight);

  // 1. Scale down when the NEXT card is coming (and blossom up slightly when this one enters)
  const scaleMap = getMapping(0.95, 1, 0.90);
  const scale = useTransform(progress, scaleMap.in, scaleMap.out);

  // 2. Fade out when the NEXT card is coming
  const opacityMap = getMapping(1, 1, 0.1);
  const opacity = useTransform(progress, opacityMap.in, opacityMap.out);

  // 3. Cinematic Depth: Blur PLUS darken the covered card dramatically so the top card "pops" out visually.
  const filterMap = getMapping("blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(16px) brightness(0.4)");
  const filter = useTransform(progress, filterMap.in, filterMap.out);

  // 4. Parallax entrance
  const yMap = getMapping("130vh", "0vh", "-10vh");
  const yOffset = useTransform(progress, yMap.in, yMap.out);

  // 5. INNER Y SCROLLING
  // While THIS card is the active one, we scroll its inner content upwards
  // to ensure all the text/images are read natively before the next card arrives.
  const innerProgressRange = [activeStart, activeEnd];
  const innerY = useTransform(progress, innerProgressRange, [0, -maxScroll]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-screen origin-top bg-background"
      style={{
        scale,
        opacity,
        y: yOffset,
        filter,
        zIndex: index,
        // Optional: add a tiny drop shadow to separate stacked cards
        boxShadow: index > 0 ? "0 -20px 40px rgba(0,0,0,0.1)" : "none"
      }}
    >
      {/* 
        This is the actual "canvas" of the card.
        We translate it UP (innerY) as the user scrolls, mathematically allowing them to read the whole section before the next card stacks over it. 
        Added an extreme top-side shadow to physically separate the layering planes dynamically.
      */}
      <motion.div
        ref={contentRef}
        className="w-full h-auto will-change-transform rounded-t-[40px] shadow-[0_-30px_80px_rgba(0,0,0,0.15)] bg-background border-t border-white/20"
        style={{ y: innerY }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollReveal(delay = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return {
    ref,
    controls,
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
    },
  };
}

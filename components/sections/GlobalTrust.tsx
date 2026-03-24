"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Container } from "../layout/Container";
import { useRef } from "react";

function AnimatedCounter({ from, to, duration, suffix = "" }: { from: number; to: number; duration: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function GlobalTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="bg-[#1B5E20] text-white py-24 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } } as any}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <div className="text-5xl font-extrabold text-[#4CAF50] mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={50000} duration={2000} suffix="+" />
            </div>
            <div className="text-lg font-medium text-white/80 uppercase tracking-widest">Farmers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } } as any}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <div className="text-5xl font-extrabold text-[#C9A227] mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={20} duration={1500} suffix="+" />
            </div>
            <div className="text-lg font-medium text-white/80 uppercase tracking-widest">Countries</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } } } as any}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <div className="text-5xl font-extrabold text-[#4CAF50] mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={500} duration={2000} suffix="+" />
            </div>
            <div className="text-lg font-medium text-white/80 uppercase tracking-widest">Products</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.7 } } } as any}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <div className="text-5xl font-extrabold text-[#C9A227] mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={15} duration={1000} suffix="+" />
            </div>
            <div className="text-lg font-medium text-white/80 uppercase tracking-widest">Years Exp</div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

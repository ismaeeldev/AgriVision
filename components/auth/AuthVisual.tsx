"use client";

import { motion } from "framer-motion";
import { Leaf, Sprout, ShieldCheck, TrendingUp } from "lucide-react";

const floaters = [
  { icon: Leaf, top: "15%", left: "10%", size: 32, delay: 0, duration: 5 },
  { icon: Sprout, top: "65%", left: "8%", size: 24, delay: 1.5, duration: 6 },
  { icon: Leaf, top: "30%", left: "80%", size: 20, delay: 0.8, duration: 4.5 },
  { icon: ShieldCheck, top: "75%", left: "75%", size: 28, delay: 2, duration: 5.5 },
  { icon: TrendingUp, top: "50%", left: "50%", size: 18, delay: 1, duration: 7 },
];

interface AuthVisualProps {
  heading: string;
  subheading: string;
}

export function AuthVisual({ heading, subheading }: AuthVisualProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] flex flex-col items-center justify-center p-12">

      {/* Background image */}
      {/* <Image
        src="/hero_bg.png"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.18] blur-[0.5px] scale-105"
      /> */}

      {/* Video background with CSS fallback */}
      <div className="absolute inset-0 overflow-hidden bg-[#1a4a1e]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.30] scale-105"
        >
          <source src="/images/auth_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20]/80 via-[#1B5E20]/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(76,175,80,0.2),transparent_60%)]" />

      {/* Floating leaf/icon particles */}
      {floaters.map(({ icon: Icon, top, left, size, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/15 pointer-events-none"
          style={{ top, left }}
          animate={{ y: [0, -16, 0], rotate: [0, 10, -5, 0] }}
          transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Ambient glow blob */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#4CAF50]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Leaf className="w-9 h-9 text-[#4CAF50]" />
          <span
            className="text-3xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: '"Segoe UI", sans-serif' }}
          >
            Agri<span className="text-[#4CAF50]">Vision</span>
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl text-white mb-4 leading-tight"
          style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
        >
          {heading}
        </h2>
        <p className="text-white/70 text-base leading-relaxed">{subheading}</p>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          {[
            { val: "50K+", label: "Farmers Served" },
            { val: "+32%", label: "Avg Yield Boost" },
            { val: "15+", label: "Countries" },
            { val: "98%", label: "Satisfaction" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3"
            >
              <p className="text-[#4CAF50] font-extrabold text-xl">{val}</p>
              <p className="text-white/60 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

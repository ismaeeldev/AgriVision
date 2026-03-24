"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Sprout, Users } from "lucide-react";

export function Newsletter() {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section className="section-padding bg-[#1B5E20] relative overflow-hidden">
      {/* Texture background */}
      <div className="absolute inset-0 bg-agriculture-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          {/* Left: Copy */}
          <div className="w-full md:w-1/2 text-white">
            <Badge className="mb-4 bg-[#4CAF50]/20 text-white border border-[#4CAF50]/30 hover:bg-[#4CAF50]/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Sprout className="w-3 h-3 mr-1" /> Smart Alerts
            </Badge>
            <h2
              className="text-3xl md:text-4xl text-white mb-4 tracking-tight"
              style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
            >
              Get Smart <span className="text-[#4CAF50]">Crop Alerts</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Receive seasonal crop protection tips, exclusive offers, and expert agronomy guides — trusted by 5,000+ farmers every week.
            </p>
            {/* Trust indicator */}
            <div className="mt-5 flex items-center gap-2 text-white/60 text-sm">
              <Users className="w-4 h-4 text-[#4CAF50]" />
              <span>Join <strong className="text-white font-semibold">5,000+</strong> farmers getting weekly insights</span>
            </div>
          </div>

          {/* Right: Expanding Input CTA */}
          <div className="w-full md:w-1/2">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="group relative w-full">

                {/* Leaf glow pulse — visible on focus */}
                <div className="absolute inset-0 rounded-full bg-green-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500 pointer-events-none" />

                {/* Mail icon */}
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 z-10 transition-colors duration-300 group-focus-within:text-[#4CAF50]" />

                {/* Expanding pill input */}
                <Input
                  type="email"
                  placeholder="Enter email for smart farming tips..."
                  required
                  className="
                    w-full h-14 pl-12 pr-4
                    rounded-full
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    text-white placeholder:text-white/50
                    transition-all duration-300 ease-in-out
                    focus:pr-36
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    focus:border-[#4CAF50]
                    focus:shadow-[0_0_0_3px_rgba(76,175,80,0.2)]
                    text-base
                  "
                />

                {/* Subscribe button — slides in on focus */}
                <Button
                  type="submit"
                  className="
                    absolute right-2 top-1/2 -translate-y-1/2
                    h-10 px-5 rounded-full
                    bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]
                    text-white font-semibold text-sm
                    opacity-0 translate-x-4
                    group-focus-within:opacity-100
                    group-focus-within:translate-x-0
                    transition-all duration-300 ease-out
                    shadow-[0_4px_16px_rgba(76,175,80,0.4)]
                  "
                >
                  Subscribe
                </Button>
              </div>
            </form>

            <p className="mt-4 text-xs text-white/50 pl-2">
              🔒 No spam. Just pure farming value. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

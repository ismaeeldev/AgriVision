"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Bug, Droplet, Sprout, Search } from "lucide-react";

export function CropSolutions() {
  const { ref, controls, variants } = useScrollReveal();

  const handleScrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border/50">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          >
            <h2 
              className="text-3xl md:text-4xl text-black"
              style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
            >
              Find the Right Solution <br className="hidden md:block" />
              for Your Crop <span className="text-[#4CAF50]">Disease</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Select your specific agricultural challenge, and we'll guide you to the tested solutions farmers trust worldwide.
            </p>
          </motion.div>

          {/* Right Action cards */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            } as any}
            className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { label: "Insect Control", icon: <Bug size={24} className="text-red-500" /> },
              { label: "Weed Control", icon: <Sprout size={24} className="text-amber-500" /> },
              { label: "Fungal Diseases", icon: <Droplet size={24} className="text-blue-500" /> },
              { label: "Browse All", icon: <Search size={24} className="text-primary" /> },
            ].map((problem) => (
              <motion.div key={problem.label} variants={variants} className="h-full">
                <Button
                  onClick={handleScrollToProducts}
                  variant="outline"
                  className="relative overflow-hidden group/btn w-full h-full min-h-[5rem] flex items-center justify-center gap-4 text-base font-semibold bg-white border-border/50 hover:border-primary/50 text-foreground transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer"
                >
                  {/* Animated Top Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#4CAF50] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-out" />
                  
                  <div className="bg-foreground/5 p-2 rounded-full relative z-10 transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:bg-primary/10 group-hover/btn:rotate-3">
                    {problem.icon}
                  </div>
                  <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-primary">{problem.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

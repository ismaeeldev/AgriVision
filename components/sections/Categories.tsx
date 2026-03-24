"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "../layout/Container";
import { CATEGORIES } from "@/data/categories";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as LucideIcons from "lucide-react";

export function Categories() {
  const { ref, controls, variants } = useScrollReveal();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section
      id="categories"
      className="section-padding  bg-gradient-to-l from-primary/5 to-transparent min-h-screen flex items-center"
    >
      <Container>
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            className="text-3xl md:text-4xl text-black mb-4"
            style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
          >
            Explore Crop <span className="text-[#4CAF50]">Solutions</span>
          </h2>
          <p className="text-lg text-black-800/70">
            Discover smart protection solutions tailored for modern agriculture
            and healthier crop yields.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((category) => {
            const Icon =
              (LucideIcons as any)[category.icon] || LucideIcons.Leaf;

            return (
              <motion.div key={category.id} variants={variants}>
                <div className="group relative h-[280px] rounded-2xl overflow-hidden cursor-pointer">

                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center brightness-75 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Glass Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:bg-white/20">

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-300 mb-3">
                        <Icon size={24} />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-green-400/40 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
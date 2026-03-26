"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { PRODUCTS } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { filter } from "framer-motion/client";

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50">
      <Skeleton className="h-64 rounded-none" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function Products() {
  const { ref, controls, variants } = useScrollReveal();
  const [loading, setLoading] = useState(true);
  const filterProduct = PRODUCTS.slice(0, 4);
  // Simulate network loading for skeletons demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="products" className="section-padding bg-white relative min-h-screen flex items-center">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none rounded-bl-full" />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white px-4 py-1.5 min-text-sm font-semibold tracking-wide uppercase shadow-md shadow-[#4CAF50]/30 border-none transition-transform hover:-translate-y-0.5">Featured Formulas</Badge>
          <h2
            className="text-3xl md:text-4xl text-black mb-4"
            style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
          >
            Premium Crop <span className="text-[#4CAF50]">Medicines</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Highly effective, tested, and certified pesticides that ensure a healthier, more profitable harvest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filterProduct.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ rotate: 1.5, scale: 1.02 }}
                className="h-full"
              >
                <Link href={`/products/${product.id}`} className="block h-full outline-none">
                  <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-full border border-border/50 bg-white flex flex-col">

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl" />

                  {/* Product Image */}
                  <div className="relative h-64 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow z-20 font-medium">
                      {product.category}
                    </div>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Floating Glass Panel */}
                  <div className="relative -mt-16 mx-4 mb-4 z-10 flex-grow flex flex-col">
                    <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-5 transition-all duration-300 group-hover:shadow-2xl flex-grow flex flex-col">

                      {/* Top Row */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-black-900">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="text-xs font-semibold text-black-800">
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-black-800/70 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-extrabold text-black-700">
                          ${product.price}
                        </span>

                        {/* Premium CTA */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm shadow-md hover:bg-green-700 transition-all duration-300 group-hover:scale-105">
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-green-400/40 transition-all duration-300" />
                </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </Container>
    </section>
  );
}

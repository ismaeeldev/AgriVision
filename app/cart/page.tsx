"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useCart } from "@/context/CartContext";
import { CartItemCard } from "@/components/sections/cart/CartItem";
import { RecommendationStrip } from "@/components/sections/cart/RecommendationStrip";
import { CartSummary } from "@/components/sections/cart/CartSummary";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart } = useCart();

  // Dynamic Plan Title logic
  const planTitle = useMemo(() => {
    if (cart.length === 0) return "Your Protection Plan";

    const roles = new Set(cart.map(i => i.role));
    if (roles.has("pest") && roles.has("fungal") && roles.has("growth")) {
      return "Complete Crop Mastery 🌱";
    }
    if (roles.has("pest") && roles.has("fungal")) {
      return "Advanced Defense Strategy 🛡️";
    }
    if (roles.has("pest")) {
      return "Pest Elimination Plan 🐜";
    }
    if (roles.has("fungal")) {
      return "Fungal Immunity Plan 💧";
    }
    if (roles.has("growth")) {
      return "Explosive Growth Plan ⚡";
    }
    return "Balanced Crop Protection 🌿";
  }, [cart]);

  return (
    <div className="min-h-screen pt-32 pb-32 bg-zinc-50 relative overflow-hidden">
      {/* Subtle Background Motion for Light Theme */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-green-200/50 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, 50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] bg-emerald-100/60 blur-[130px] rounded-full pointer-events-none"
      />

      <Container className="relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:text-left flex flex-col items-center sm:items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 mb-4 shadow-sm">
            <Leaf className="w-4 h-4 text-[#4CAF50]" />
            <span className="text-sm font-bold text-zinc-700 tracking-wide uppercase">AI Optimized</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-3">
            {planTitle.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="text-[#4CAF50]">{planTitle.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl">
            Smart solutions tailored specifically for your crops&apos; unique immediate needs.
          </p>
        </motion.div>

        {/* Empty State vs Content */}
        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/70 border border-zinc-200 backdrop-blur-xl shadow-sm"
            >
              <div className="w-24 h-24 mb-6 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                <Leaf className="w-12 h-12 text-[#4CAF50]/60" />
              </div>
              <h2 className="text-2xl font-black text-foreground mb-2">No protection added yet 🌱</h2>
              <p className="text-muted-foreground font-medium text-lg max-w-md mb-8">Start building your crop plan by exploring our smart agricultural solutions.</p>
              <Link href="/products">
                <Button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white rounded-full px-8 py-6 text-lg font-bold shadow-[0_5px_20px_rgba(76,175,80,0.3)] border-none">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Product List */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h2 className="text-lg font-black text-foreground">Active Solutions ({cart.length})</h2>
                </div>

                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map(item => (
                      <CartItemCard key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Recommendations */}
                <RecommendationStrip />
              </div>

              {/* Right Column: Timeline & Summary (Insights removed per request) */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                <div className="sticky top-24 flex flex-col gap-6">
                  {/* CartSummary is now the primary card */}
                  <CartSummary />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </div>
  );
}

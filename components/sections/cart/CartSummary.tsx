"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Save, Shield, Rocket, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartSummary() {
  const { cart, totalPrice } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  const ctaText = useMemo(() => {
    if (cart.length === 0) return "Start Building Plan";
    const hasPest = cart.some(i => i.role === 'pest');
    const hasFungal = cart.some(i => i.role === 'fungal');

    if (hasPest && hasFungal) return "Activate Full Protection";
    if (hasPest) return "Start Pest Protection";
    if (hasFungal) return "Start Fungal Defense";
    return "Activate Protection Plan";
  }, [cart]);

  const handleApplyDiscount = () => {
    // Simple mock logic for discount code
    if (discountCode.toUpperCase() === "FARMER10") {
      setAppliedDiscount(0.1); // 10% off
    } else {
      setAppliedDiscount(0);
      alert("Invalid Discount Code. Try 'FARMER10'");
    }
  };

  const finalPrice = totalPrice * (1 - appliedDiscount);

  return (
    <div className="mt-12 flex flex-col gap-4">
      {/* Desktop Summary Box (Hidden on mobile sticky) */}
      <div className="hidden sm:flex flex-col gap-6 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200/80 shadow-xl relative overflow-hidden">

        {/* Discount Code Section */}
        <div className="flex flex-col gap-2 z-10 relative">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Discount Code</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="PROMO CODE"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all text-sm font-semibold text-foreground placeholder-zinc-400"
              />
            </div>
            <button
              onClick={handleApplyDiscount}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-sm rounded-lg transition-colors border border-zinc-200"
            >
              Apply
            </button>
          </div>
          {appliedDiscount > 0 && (
            <p className="text-xs font-bold text-[#4CAF50] mt-1 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Code applied successfully!
            </p>
          )}
        </div>

        <div className="h-px w-full bg-zinc-200/50" />

        <div className="flex justify-between items-end relative z-10">
          <span className="text-zinc-500 font-bold uppercase tracking-wider text-sm">Estimated Total</span>
          <div className="flex flex-col items-end">
            {appliedDiscount > 0 && (
              <span className="text-sm text-zinc-400 line-through">${totalPrice.toFixed(2)}</span>
            )}
            <span className="text-3xl font-black text-foreground">${finalPrice.toFixed(2)}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full py-4 rounded-xl text-white font-bold text-lg overflow-hidden group shadow-[0_5px_15px_rgba(76,175,80,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            {ctaText}
            <Rocket className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
          </div>
        </motion.button>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-zinc-200 z-50 animate-in slide-in-from-bottom-full duration-500 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-bold uppercase">Plan Total</span>
            <span className="text-xl font-black text-foreground"> ${finalPrice.toFixed(2)}</span>
          </div>
          <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold text-sm shadow-[0_5px_15px_rgba(76,175,80,0.3)] flex items-center justify-center gap-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
            <Shield className="w-4 h-4" />
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

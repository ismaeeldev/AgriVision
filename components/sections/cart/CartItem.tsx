"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShieldCheck, Zap, Droplets, Bug } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

const roleIcons = {
  pest: <Bug className="w-4 h-4 text-red-500" />,
  fungal: <Droplets className="w-4 h-4 text-purple-500" />,
  growth: <Zap className="w-4 h-4 text-yellow-600" />,
  weed: <ShieldCheck className="w-4 h-4 text-green-600" />,
  unknown: <ShieldCheck className="w-4 h-4 text-gray-500" />,
};

const roleColors = {
  pest: "bg-red-50 text-red-700 border-red-200",
  fungal: "bg-purple-50 text-purple-700 border-purple-200",
  growth: "bg-yellow-50 text-yellow-700 border-yellow-200",
  weed: "bg-green-50 text-green-700 border-green-200",
  unknown: "bg-gray-50 text-gray-700 border-gray-200",
};

export function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
    }, 400);
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-zinc-200/60 hover:border-[#4CAF50]/30 transition-colors shadow-sm hover:shadow-[0_8px_30px_rgba(76,175,80,0.1)] overflow-hidden"
        >
          {/* Subtle trail glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4CAF50]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Product Image */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-50 shrink-0 flex items-center justify-center p-2 border border-black/5">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-transparent z-0" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image src={item.image} alt={item.name} width={80} height={80} className="object-contain drop-shadow-sm mix-blend-multiply" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-1 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-[#2E7D32] transition-colors">{item.name}</h3>
                <div className={`mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[item.role]}`}>
                  {roleIcons[item.role]}
                  <span className="uppercase tracking-wider text-[10px] font-bold">{item.role} Protection</span>
                </div>
              </div>
              <p className="font-bold text-zinc-900">${item.price.toFixed(2)}</p>
            </div>

            <p className="text-sm text-muted-foreground">{item.category}</p>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 w-full">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-zinc-100 rounded-full p-1 border border-zinc-200">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm disabled:shadow-none hover:bg-zinc-50 disabled:opacity-50 text-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="w-6 text-center overflow-hidden h-6 relative flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.quantity}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute font-bold text-foreground"
                    >
                      {item.quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-zinc-50 text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={handleRemove}
                className="text-zinc-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

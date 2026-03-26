"use client";

import React from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function RecommendationStrip() {
  const { cart, addToCart } = useCart();
  
  const cartIds = cart.map(c => c.id);
  const recommendations = PRODUCTS.filter(p => !cartIds.includes(p.id)).slice(0, 2);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <h3 className="text-lg font-bold text-foreground">Farmers also add</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map(product => (
          <div key={product.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-zinc-200 hover:bg-white hover:shadow-md hover:border-[#4CAF50]/30 transition-all group">
            <div className="relative w-16 h-16 rounded-xl bg-zinc-50 overflow-hidden flex items-center justify-center p-1 shrink-0 border border-black/5">
               <Image src={product.image} alt={product.name} width={50} height={50} className="object-contain mix-blend-multiply" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">{product.name}</h4>
              <p className="text-xs text-[#2E7D32] font-black mt-0.5">Rs {product.price}</p>
            </div>
            <button 
              onClick={() => addToCart(product.id)}
              className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-[#4CAF50] group-hover:border-[#4CAF50] group-hover:text-white transition-colors shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

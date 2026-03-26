"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { PRODUCTS } from "@/data/products";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  // Smart tags
  role: "pest" | "fungal" | "growth" | "weed" | "unknown";
  strength: "high" | "medium" | "low";
  coverage: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to derive smart tags from our mock product category
const deriveTagsFromCategory = (category: string) => {
  switch (category) {
    case "Insecticides":
      return { role: "pest" as const, strength: "high" as const, coverage: ["aphids", "whiteflies", "mites"] };
    case "Fungicides":
      return { role: "fungal" as const, strength: "high" as const, coverage: ["mildew", "rust", "root rot"] };
    case "Fertilizers":
    case "Organic Crop Care":
      return { role: "growth" as const, strength: "medium" as const, coverage: ["root health", "canopy"] };
    case "Herbicides":
      return { role: "weed" as const, strength: "high" as const, coverage: ["broadleaf weeds"] };
    default:
      return { role: "unknown" as const, strength: "medium" as const, coverage: [] };
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Initialize with dummy data as requested (so we can visually see the cart page)
  useEffect(() => {
    // We add AgriShield Pro (prod-1) and RootBoost X (prod-6)
    const product1 = PRODUCTS.find(p => p.id === "prod-1");
    const product2 = PRODUCTS.find(p => p.id === "prod-6");

    if (product1 && product2) {
      setCart([
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
          image: product1.image,
          category: product1.category,
          quantity: 1,
          ...deriveTagsFromCategory(product1.category)
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
          image: product2.image,
          category: product2.category,
          quantity: 2,
          ...deriveTagsFromCategory(product2.category)
        }
      ]);
    }
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return prevCart;

      const tags = deriveTagsFromCategory(product.category);

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
          ...tags
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

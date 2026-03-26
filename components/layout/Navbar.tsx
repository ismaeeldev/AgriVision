"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-[#113B13]/95 backdrop-blur-lg border-b border-white/10 shadow-sm py-3"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="h-8 w-8 text-[#4CAF50] transition-transform group-hover:scale-110" />
          <span className="text-2xl font-bold tracking-tight text-white">
            Agri<span className="text-[#4CAF50]">Vision</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#4CAF50] after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative group transition-colors hover:text-[#4CAF50] text-white/80">
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  key={totalItems} // Forces re-animation on change
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4CAF50] text-[10px] font-bold text-white shadow-lg shadow-[#4CAF50]/30"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <div className="h-6 w-px mx-4 bg-white/20" />
          <Link href="/login">
            <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 font-semibold transition-all duration-200">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button
              className="relative overflow-hidden text-white font-bold
                bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]
                shadow-[0_3px_16px_rgba(76,175,80,0.4)]
                hover:shadow-[0_5px_22px_rgba(76,175,80,0.6)]
                hover:scale-[1.04] transition-all duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden transition-colors hover:text-[#4CAF50] text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden shadow-lg"
          >
            <Container className="py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-foreground py-2 border-b border-border/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center justify-between text-base font-medium text-foreground py-2 border-b border-border/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Protection Plan (Cart)</span>
                {totalItems > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4CAF50] text-xs font-bold text-white shadow-lg shadow-[#4CAF50]/30">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-4 py-2">
                <Button variant="ghost" className="w-full">Log in</Button>
                <Button className="w-full bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white">Sign Up</Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

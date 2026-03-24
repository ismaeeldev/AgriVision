"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <button className="transition-colors hover:text-[#4CAF50] text-white/80">
            <Search className="h-5 w-5" />
          </button>
          <button className="transition-colors hover:text-[#4CAF50] text-white/80">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <div className="h-6 w-px mx-2 bg-white/20" />
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

"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { Search, Star, ShoppingCart, Leaf, ChevronLeft, ChevronRight, FilterX, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Simulate professional loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    const cats = Array.from(new Set(PRODUCTS.map((p) => p.category)));
    return ["All", ...cats, "High Rated"];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category filter
      let matchesCategory = true;
      if (activeCategory === "High Rated") {
        matchesCategory = product.rating >= 4.8;
      } else if (activeCategory !== "All") {
        matchesCategory = product.category === activeCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20">
      {/* ... backgrounds ... */}
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

      <Container>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
              Our Crop Protection <span className="text-[#4CAF50]">Products 🌱</span>
            </h1>
            <p className="text-zinc-500 text-lg">
              Explore our full catalog of premium, certified solutions designed to maximize yield and protect your farm.
            </p>
          </motion.div>
        </div>
      </Container>

      <div className="relative z-40 py-2 mb-10 w-full">
        <Container>
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-5 h-10 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                      ${activeCategory === cat
                        ? "bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white shadow-[0_4px_12px_rgba(76,175,80,0.4)]"
                        : "bg-white text-zinc-600 border border-zinc-200 hover:border-[#4CAF50]/50 hover:bg-green-50/50 hover:text-[#2E7D32] shadow-sm"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end self-end md:self-auto">
              <motion.div
                initial={false}
                animate={{ width: isSearchOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 300) : 40 }}
                className="relative h-10 flex items-center justify-end"
              >
                <div
                  className={`flex items-center absolute right-0 h-10 bg-white rounded-full border transition-colors duration-300 overflow-hidden shadow-sm ${isSearchOpen ? 'w-full border-[#4CAF50] ring-2 ring-[#4CAF50]/20' : 'w-10 border-zinc-200 hover:border-[#4CAF50]/50 cursor-pointer'
                    }`}
                  onClick={() => {
                    if (!isSearchOpen) setIsSearchOpen(true);
                  }}
                >
                  <Search
                    className={`absolute left-3 w-4 h-4 transition-colors ${isSearchOpen ? 'text-[#4CAF50]' : 'text-zinc-500'}`}
                    onClick={(e) => {
                      if (isSearchOpen) {
                        e.stopPropagation();
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setIsSearchOpen(false);
                    }}
                    className={`h-full w-full pl-9 pr-4 bg-transparent outline-none text-sm text-zinc-800 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                      }`}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-2xl bg-white border border-zinc-100 p-5 space-y-4 animate-pulse">
                  <div className="w-full h-40 bg-zinc-50 rounded-xl" />
                  <div className="h-6 w-3/4 bg-zinc-50 rounded" />
                  <div className="h-4 w-full bg-zinc-50 rounded" />
                  <div className="h-4 w-1/2 bg-zinc-50 rounded" />
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-8 w-20 bg-zinc-50 rounded" />
                    <div className="h-10 w-24 bg-zinc-50 rounded-full" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            /* EMPTY STATE */
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <FilterX className="w-10 h-10 text-[#4CAF50]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B5E20] mb-2">No products found 🌱</h3>
              <p className="text-zinc-500 mb-6">We couldn't find anything matching your current filters.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="px-6 h-11 rounded-full bg-white border border-zinc-200 text-[#1B5E20] font-semibold hover:border-[#4CAF50] hover:bg-green-50 transition-colors shadow-sm"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            /* GRID */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Link href={`/products/${product.id}`} className="block h-full outline-none">
                    <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-full border border-zinc-200/60 bg-white flex flex-col shadow-sm hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300">

                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                      {/* Image Box */}
                      <div className="relative h-48 flex-shrink-0 flex items-center justify-center overflow-hidden bg-zinc-50">
                        {/* Floating Badge */}
                        <div className="absolute top-4 left-4 bg-[#1B5E20] text-white text-[11px] px-3 py-1 rounded-full shadow-md z-20 font-bold tracking-wider uppercase">
                          {product.category}
                        </div>

                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                        />
                      </div>

                      {/* Content Box */}
                      <div className="relative z-10 flex-grow flex flex-col p-5 bg-white border-t border-zinc-100">

                        {/* Top Row */}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-zinc-900 line-clamp-1" title={product.name}>
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-600 flex-shrink-0">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-bold text-yellow-700">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-zinc-500 mb-6 line-clamp-2 leading-relaxed flex-grow">
                          {product.description}
                        </p>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xl font-extrabold text-black">
                            ${product.price.toFixed(2)}
                          </span>

                          {/* CTA */}
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product.id);
                              setAddingId(product.id);
                              setTimeout(() => setAddingId(null), 2000);
                            }}
                            className={`flex items-center gap-2 px-4 h-9 rounded-full transition-all duration-300 text-sm font-semibold shadow-md ${
                              addingId === product.id 
                              ? "bg-green-100 text-green-700 shadow-none border border-green-200" 
                              : "bg-[#1B5E20] text-white hover:bg-[#4CAF50] hover:shadow-[0_4px_12px_rgba(76,175,80,0.3)]"
                            }`}
                          >
                            {addingId === product.id ? <Check size={15} /> : <ShoppingCart size={15} />}
                            <span className="hidden sm:inline-block">{addingId === product.id ? "Added" : "Add"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Hover Glow Border */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#4CAF50]/30 transition-all duration-300 pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="mt-14 mb-8 flex items-center justify-center gap-2">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-[#1B5E20] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`
                    w-10 h-10 rounded-full text-sm font-bold transition-all duration-300
                    ${currentPage === i + 1
                      ? "bg-[#1B5E20] text-white shadow-md shadow-green-900/20"
                      : "bg-white border border-zinc-200 text-zinc-600 hover:border-[#4CAF50] hover:text-[#1B5E20]"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-[#1B5E20] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        )}

      </Container>
    </div>
  );
}

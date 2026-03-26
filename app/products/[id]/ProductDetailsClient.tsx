"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ChevronLeft, Star, ShieldCheck, TrendingUp, CheckCircle, Leaf } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductDetailsClient({ initialProduct }: { initialProduct: Product }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ali Khan", rating: 5, text: "After using this, my crops recovered within days. Highly effective!" },
    { id: 2, name: "Ahmed Raza", rating: 4, text: "Good product, works well but needs proper dosage." }
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, text: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || !newReview.rating) return;

    setReviews([{ id: Date.now(), ...newReview }, ...reviews]);
    setNewReview({ name: "", rating: 0, text: "" });
    setHoverRating(0);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-zinc-50 relative pb-24"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#4CAF50] origin-left z-50"
        aria-hidden="true"
      />

      {/* Toast Notification */}
      <div aria-live="polite" className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-6 right-6 pointer-events-auto bg-[#1B5E20] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
              role="alert"
            >
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span className="font-medium">Review added successfully</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-white">
        {/* Radial background effect */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(76,175,80,0.15), transparent 60%)' }} />

        <Container className="relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#1B5E20] font-medium transition-colors mb-8 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-[#1B5E20] text-sm font-bold tracking-wider uppercase mb-6 border border-green-200 shadow-sm">
                {initialProduct.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#1B5E20] mb-4 tracking-tight leading-tight">
                {initialProduct.name}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 mb-8 font-light">
                {initialProduct.description}
              </p>

              <div className="flex items-center gap-6 mb-10">
                <span className="text-4xl font-extrabold text-black">
                  ${initialProduct.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                  <Star fill="#C9A227" stroke="#C9A227" className="w-5 h-5" />
                  <span className="text-lg font-bold text-yellow-800">{initialProduct.rating} Rating</span>
                </div>
              </div>

              {/* Desktop CTA */}
              <button className="hidden md:flex items-center justify-center gap-3 w-[80%] md:w-auto px-8 h-14 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] text-white text-lg font-bold shadow-[0_8px_20px_rgba(76,175,80,0.4)] hover:shadow-[0_8px_25px_rgba(76,175,80,0.6)] hover:-translate-y-1 transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
                Protect My Crops
              </button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative aspect-square max-w-lg mx-auto w-full"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-green-50/50 to-emerald-50/50 backdrop-blur-3xl border border-white/60 shadow-[0_30px_60px_rgba(76,175,80,0.15)] overflow-hidden flex items-center justify-center p-8 group"
              >
                <div className="absolute inset-0 bg-[#4CAF50]/5 rounded-full blur-[80px]" />
                <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-full transition-transform duration-500">
                  <Image
                    src={initialProduct.image}
                    alt={`${initialProduct.name} main product display`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain drop-shadow-[0_20px_30px_rgba(27,94,32,0.3)] rounded-[22px]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. PROBLEM -> SOLUTION STORYTELLING */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-400 mb-6">
                Are pests damaging your crops?
              </h2>
              <div className="w-1 h-16 bg-gradient-to-b from-zinc-300 to-[#4CAF50] mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="px-8 py-12 rounded-3xl bg-white border border-green-100 shadow-[0_20px_40px_rgba(76,175,80,0.1)] relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-full flex items-center justify-center shadow-lg shadow-green-900/20">
                <CheckCircle className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-[#1B5E20] mb-4">
                {initialProduct.name} protects instantly.
              </h3>
              <p className="text-lg text-zinc-600">
                A scientifically proven formula designed to restore the health of your farm and ensure maximum yield. Say goodbye to crop damage.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. KEY BENEFITS (GLASS CARDS) */}
      <section className="py-20 bg-white relative">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Fast Elimination", desc: "Stops active threats within 24 hours of application." },
              { icon: TrendingUp, title: "Improves Yield", desc: "Healthier crops directly translate to higher profitability." },
              { icon: Leaf, title: "Reliable Protection", desc: "Long-lasting residual shield preventing future outbreaks." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] hover:border-green-100 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4CAF50] transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-[#1B5E20] group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{benefit.title}</h4>
                <p className="text-zinc-500">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. USAGE TIMELINE */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.1),transparent)] pointer-events-none" />
        <Container>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl font-bold mb-4">The path to recovery</h2>
            <p className="text-zinc-400">Watch your crops transform in just one week.</p>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Background line */}
            <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-zinc-800 rounded-full" />

            {/* Animated fill line */}
            <motion.div
              style={{ scaleY: scaleX }}
              className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-[#4CAF50] rounded-full origin-top shadow-[0_0_20px_#4CAF50]"
            />

            <div className="space-y-16">
              {[
                { day: "Day 1", title: "Apply Solution", desc: "Spray evenly across affected areas.", pos: "right" },
                { day: "Day 3", title: "Visible Reduction", desc: "Noticeable stop in pest activity.", pos: "left" },
                { day: "Day 7", title: "Full Protection", desc: "Crops resume healthy growth.", pos: "right" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: step.pos === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center gap-8 ${step.pos === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} pl-16 md:pl-0`}
                >
                  {/* Node */}
                  <motion.div
                    whileInView={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px #4CAF50", "0 0 20px #4CAF50", "0 0 0px #4CAF50"] }}
                    transition={{ delay: 0.2 }}
                    className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-zinc-900 border-4 border-[#4CAF50] z-10"
                  />

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${step.pos === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700 backdrop-blur-sm hover:border-[#4CAF50]/50 transition-colors shadow-xl">
                      <span className="text-[#4CAF50] font-bold text-sm uppercase tracking-wider mb-2 block">{step.day}</span>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-zinc-400">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5 & 6. PRODUCT DETAILS MINIMAL UI + REVIEWS */}
      <section className="py-24 bg-zinc-50 relative" id="reviews-section">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-zinc-100 relative z-10">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-100 pb-8 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Customer Reviews</h2>
                <p className="text-zinc-500">Real feedback from actual farmers.</p>
              </div>
              <div className="mt-6 md:mt-0 text-left md:text-right">
                <div className="flex items-center gap-2 md:justify-end mb-1">
                  <Star fill="#C9A227" stroke="#C9A227" className="w-8 h-8" />
                  <span className="text-4xl font-black text-zinc-900">{initialProduct.rating}</span>
                </div>
                <p className="text-sm text-zinc-500 font-medium">Based on {reviews.length} reviews</p>
              </div>
            </div>

            {/* Write a Review */}
            <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 mb-12 border border-zinc-100 transition-all hover:border-green-200">
              <h3 className="font-bold text-lg mb-4 text-[#1B5E20]">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    aria-label="Your Name"
                    placeholder="Your Name"
                    className="flex-1 w-full bg-white px-5 py-3 rounded-xl border border-zinc-200 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-zinc-800"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                  <div
                    className="flex items-center gap-1 bg-white px-4 py-3 sm:py-0 rounded-xl border border-zinc-200 justify-center"
                    role="group"
                    aria-label="Select Rating"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5 stars`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded-md transition-transform active:scale-95"
                      >
                        <Star
                          fill={star <= (hoverRating || newReview.rating) ? "#C9A227" : "transparent"}
                          stroke={star <= (hoverRating || newReview.rating) ? "#C9A227" : "#CBD5E1"}
                          className="w-6 h-6 transition-colors"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  aria-label="Your Review"
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full bg-white px-5 py-4 rounded-xl border border-zinc-200 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all resize-none font-medium text-zinc-800"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={!newReview.name || !newReview.text || !newReview.rating}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1B5E20] text-white font-bold hover:bg-[#4CAF50] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-zinc-900">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} fill={i < review.rating ? "#C9A227" : "transparent"} stroke={i < review.rating ? "#C9A227" : "#CBD5E1"} className="w-4 h-4" />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">"{review.text}"</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>



      {/* STICKY CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-[100] pb-safe">
        <button className="flex items-center justify-center gap-2 w-full h-14 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] text-white font-bold shadow-[0_10px_30px_rgba(27,94,32,0.4)] active:scale-[0.98] transition-all">
          <ShieldCheck className="w-5 h-5" />
          Protect My Crops
        </button>
      </div>

    </motion.div>
  );
}

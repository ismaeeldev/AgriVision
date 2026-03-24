"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Leaf, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  } as const;

  const inputClass = (field: string) =>
    `h-12 rounded-xl border-zinc-200 bg-white/80 focus-visible:ring-0 focus-visible:border-[#4CAF50] transition-all duration-300 text-zinc-800 placeholder:text-zinc-400 ${field === "password" || field === "confirmPassword" ? "pr-10" : ""}`;

  const wrapperClass = (field: string) =>
    `relative rounded-xl transition-all duration-300 ${focused === field ? "ring-2 ring-[#4CAF50]/40" : ""}`;

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT: Visual Panel ── */}
      <div className="hidden lg:block lg:w-[45%] xl:w-1/2 h-screen sticky top-0">
        <AuthVisual
          heading="Protect Your Crops with Intelligence 🌿"
          subheading="Join 50,000+ farmers who trust AgriVision for smarter crop protection, precision agriculture, and higher yields."
        />
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="flex-1 min-h-screen overflow-y-auto flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-6 py-12">

        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-md z-10"
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8 lg:hidden">
            <Leaf className="w-7 h-7 text-[#4CAF50]" />
            <span className="text-2xl font-extrabold text-[#1B5E20]" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
              Agri<span className="text-[#4CAF50]">Vision</span>
            </span>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-green-900/10 p-8 md:p-10"
          >
            {done ? (
              /* ✅ Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                  <CheckCircle className="w-9 h-9 text-[#4CAF50]" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#1B5E20]">You're In!</h2>
                <p className="text-zinc-500 text-sm">Your AgriVision account is ready. Start protecting your crops today.</p>
                <Link href="/login">
                  <Button className="mt-2 h-11 px-8 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold hover:scale-[1.02] transition-transform">
                    Go to Login
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-7">
                  <h1
                    className="text-2xl md:text-3xl text-[#1B5E20] mb-2"
                    style={{ fontFamily: '"Segoe UI", sans-serif', fontWeight: 800 }}
                  >
                    Create Account
                  </h1>
                  <p className="text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#4CAF50] font-semibold hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Full Name */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-semibold text-zinc-600">Full Name</Label>
                    <div className={wrapperClass("name")}>
                      <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "name" ? "text-[#4CAF50]" : "text-zinc-400"}`} />
                      <Input id="name" type="text" placeholder="Ahmed Khan" required
                        className={`pl-10 ${inputClass("name")}`}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-semibold text-zinc-600">Email Address</Label>
                    <div className={wrapperClass("email")}>
                      <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "email" ? "text-[#4CAF50]" : "text-zinc-400"}`} />
                      <Input id="email" type="email" placeholder="you@example.com" required
                        className={`pl-10 ${inputClass("email")}`}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-semibold text-zinc-600">Phone Number</Label>
                    <div className={wrapperClass("phone")}>
                      <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "phone" ? "text-[#4CAF50]" : "text-zinc-400"}`} />
                      <Input id="phone" type="tel" placeholder="+92 300 0000000"
                        className={`pl-10 ${inputClass("phone")}`}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-semibold text-zinc-600">Password</Label>
                    <div className={wrapperClass("password")}>
                      <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "password" ? "text-[#4CAF50]" : "text-zinc-400"}`} />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" required minLength={8}
                        className={`pl-10 ${inputClass("password")}`}
                        onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#4CAF50] transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </motion.div>

                  {/* Terms */}
                  <motion.div variants={itemVariants} className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="terms" required className="mt-0.5 accent-[#4CAF50] w-4 h-4 cursor-pointer" />
                    <label htmlFor="terms" className="text-xs text-zinc-500 leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-[#4CAF50] hover:underline font-medium">Terms of Service</Link>{" "}
                      and{" "}
                      <Link href="#" className="text-[#4CAF50] hover:underline font-medium">Privacy Policy</Link>
                    </label>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={itemVariants} className="pt-1">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl font-bold text-white text-base relative overflow-hidden group
                        bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]
                        shadow-[0_4px_20px_rgba(76,175,80,0.4)]
                        hover:shadow-[0_6px_28px_rgba(76,175,80,0.6)]
                        hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {loading ? (
                        <span className="flex items-center gap-2 justify-center">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 justify-center">
                          Create Account
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>

              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

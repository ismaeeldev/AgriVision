"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MessageCircle, User, MapPin, Clock, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { Expert } from "@/data/experts";
import { formatDistanceAndTime } from "@/lib/locationUtils";
import Image from "next/image";

interface BottomSheetProps {
  expert: Expert | null;
  distanceKm: number | null;
  onClose: () => void;
}

export function BottomSheet({ expert, distanceKm, onClose }: BottomSheetProps) {
  // Prevent body scroll when bottom sheet is open on mobile
  useEffect(() => {
    if (expert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expert]);

  if (!expert) return null;

  const availabilityColors = {
    "Available Now": "bg-green-500",
    "Busy": "bg-yellow-500",
    "Offline": "bg-red-500",
  };

  const handleWhatsApp = () => {
    // Dynamic message
    const text = encodeURIComponent(`Hello ${expert.name}, I need help with my crops.`);
    window.open(`https://wa.me/${expert.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {expert && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[2px] sm:hidden"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 z-[101] sm:absolute sm:bottom-6 sm:left-6 sm:right-auto sm:w-[400px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-zinc-200/60 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-none"
          >
            {/* Drag Indicator Top */}
            <div className="w-full h-8 flex items-center justify-center sm:hidden active:cursor-grabbing cursor-grab" onClick={onClose}>
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full" />
            </div>

            {/* Container for content */}
            <div className="p-6 pt-2 sm:pt-6 flex flex-col gap-5 overflow-y-auto">

              {/* Close Button Desktop */}
              <button onClick={onClose} className="hidden sm:flex absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors">
                <X className="w-4 h-4" />
              </button>

              {/* Top Section */}
              <div className="flex gap-4 items-start">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-100 shrink-0 border-2 border-white shadow-sm">

                  {/* Avatar */}
                  <div className="w-full h-full bg-[#1B5E20]/10 flex items-center justify-center text-xl font-black text-[#1B5E20]">
                    {/* {expert.name.charAt(0)} */}
                    <Image src={expert.image} alt={expert.name} width={100} height={100} className="object-cover" />
                  </div>

                  {/* Availability Indicator */}
                  <div className="absolute bottom-1 right-2 flex items-center justify-center">
                    <div
                      className={`relative w-4 h-4 rounded-full border-2 border-white ${availabilityColors[expert.availability]}`}
                    >
                      {/* Glow effect */}
                      <span
                        className={`absolute inset-0 rounded-full blur-md opacity-70 ${availabilityColors[expert.availability]}`}
                      />
                    </div>
                  </div>

                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-xl font-black text-foreground">{expert.name}</h2>
                    {expert.isVerified && <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />}
                  </div>
                  <p className="text-sm font-bold text-muted-foreground">{expert.role} • {expert.experience}</p>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-bold">{expert.rating}</span>
                    <span className="text-xs text-zinc-400">({expert.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Metrics Section */}
              {distanceKm !== null && (
                <div className="flex bg-zinc-50 rounded-2xl p-3 border border-zinc-100 gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                    <MapPin className="w-4 h-4 text-[#4CAF50]" />
                    {formatDistanceAndTime(distanceKm).split('•')[0]}
                  </div>
                  <div className="w-px bg-zinc-200" />
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {formatDistanceAndTime(distanceKm).split('•')[1]}
                  </div>
                </div>
              )}

              {/* Specializations */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {expert.specializations.map(spec => (
                    <span key={spec} className="px-3 py-1 rounded-full bg-[#4CAF50]/10 text-[#2E7D32] text-xs font-bold border border-[#4CAF50]/20">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Bottom */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BE5A] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 drop-shadow-sm" />
                  WhatsApp
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 sm:w-14 items-center justify-center flex py-3.5 rounded-xl bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 transition-colors shadow-sm border border-zinc-200">
                    <PhoneCall className="w-5 h-5" />
                  </button>
                  <Link href={`/field-officers/${expert.id}`} className="flex-1 sm:w-14 items-center justify-center flex py-3.5 rounded-xl bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 transition-colors shadow-sm border border-zinc-200">
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

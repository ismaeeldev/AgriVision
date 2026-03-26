"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { FIELD_OFFICERS, Expert } from "@/data/experts";
import { calculateDistance } from "@/lib/locationUtils";
import DynamicMap from "@/components/sections/map/DynamicMap";
import { BottomSheet } from "@/components/sections/map/BottomSheet";

type LocationState = "idle" | "requesting" | "granted" | "denied";

export default function NearbyHelpPage() {
  const [locState, setLocState] = useState<LocationState>("idle");
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);
  const [activeExpert, setActiveExpert] = useState<Expert | null>(null);

  // Base location fallback (Lahore, Punjab)
  const FALLBACK_LOC: [number, number] = [31.5204, 74.3587];

  // Request browser geolocation
  const handleEnableLocation = () => {
    setLocState("requesting");

    if (!navigator.geolocation) {
      handleLocationError();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setUserLoc([latitude, longitude]);
        setLocState("granted");
      },
      (error) => {
        console.warn("Location error:", error.message);
        handleLocationError();
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleLocationError = () => {
    // Fallback to Lahore
    setUserLoc(FALLBACK_LOC);
    setLocState("denied");
  };

  // Calculate distance for all predefined experts relative to live user location
  const dynamicExperts = useMemo(() => {
    if (!userLoc) return [];

    return FIELD_OFFICERS.map((expert) => {
      const distance = calculateDistance(userLoc[0], userLoc[1], expert.lat, expert.lng);

      return {
        ...expert,
        distance
      };
    });
  }, [userLoc]);

  // Smart Nearest Expert Auto-Focus
  const activeDistance = useMemo(() => {
    if (!userLoc || !activeExpert) return null;
    return calculateDistance(userLoc[0], userLoc[1], activeExpert.lat, activeExpert.lng);
  }, [userLoc, activeExpert]);

  useEffect(() => {
    if (!userLoc || dynamicExperts.length === 0) return;
    if (activeExpert) return; // Prevent loop or overriding user choice

    // Find nearest expert, prioritizing available ones
    const nearest = [...dynamicExperts].sort((a, b) => {
      if (a.availability === "Available Now" && b.availability !== "Available Now") return -1;
      if (b.availability === "Available Now" && a.availability !== "Available Now") return 1;
      return (a.distance || 0) - (b.distance || 0);
    })[0];

    if (nearest) {
      setTimeout(() => setActiveExpert(nearest), 600);
    }
  }, [userLoc, dynamicExperts, activeExpert]);


  // 1️⃣ PERMISSION EXPERIENCE UI (FIRST LOAD)
  if (locState === "idle" || locState === "requesting") {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Map Blur Background Effect */}
        <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/5766/3342.png')] bg-cover bg-center opacity-10 blur-xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center text-center max-w-md w-full bg-white/70 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-green-100">
            {locState === "requesting" ? (
              <Loader2 className="w-10 h-10 text-[#4CAF50] animate-spin" />
            ) : (
              <MapPin className="w-10 h-10 text-[#4CAF50] animate-bounce" />
            )}
          </div>

          <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Find Experts Near Your Farm</h1>
          <p className="text-zinc-500 font-medium mb-10 text-lg leading-relaxed">
            Allow location access to instantly connect with trusted crop specialists and verified field officers in your immediate area.
          </p>

          <button
            onClick={handleEnableLocation}
            disabled={locState === "requesting"}
            className="w-full py-4 rounded-2xl bg-[#1B5E20] text-white font-black text-lg shadow-[0_8px_30px_rgba(27,94,32,0.3)] hover:bg-[#4CAF50] transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {locState === "requesting" ? "Locating..." : (
              <>
                Enable Location
                <Navigation className="w-5 h-5" />
              </>
            )}
          </button>

          <button
            onClick={handleLocationError}
            className="mt-6 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors uppercase tracking-widest"
          >
            Enter Location Manually
          </button>
        </motion.div>
      </div>
    );
  }

  // 2️⃣ CORE MAP EXPERIENCE
  return (
    <div className="fixed inset-0 pt-20 flex flex-col bg-zinc-50">

      {/* Map Container */}
      <div className="relative flex-1 w-full h-full pb-4 px-4 sm:px-6 z-0">
        <AnimatePresence>
          {userLoc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <DynamicMap
                userLocation={userLoc}
                experts={dynamicExperts}
                activeExpert={activeExpert}
                onSelectExpert={setActiveExpert}
                isFallback={locState === "denied"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3️⃣ FIELD OFFICER INTERACTION BOTTOM SHEET */}
      <BottomSheet
        expert={activeExpert}
        distanceKm={activeDistance}
        onClose={() => setActiveExpert(null)}
      />

    </div>
  );
}

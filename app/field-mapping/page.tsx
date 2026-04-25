"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map as MapIcon, 
  Layers, 
  MousePointer2, 
  Trash2, 
  Save, 
  Navigation, 
  Activity, 
  Droplets, 
  CheckCircle2,
  Search,
  Plus,
  ShieldAlert
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useFieldState } from "./useFieldState";
import { Badge } from "@/components/ui/badge";

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("./MapView"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
      />
    </div>
  )
});

export default function FieldMappingPage() {
  const { 
    points, 
    addPoint, 
    clearPoints, 
    isDrawing, 
    setIsDrawing, 
    fieldData, 
    saveField 
  } = useFieldState();

  const [mapCenter, setMapCenter] = useState<[number, number]>([31.5204, 74.3587]); // Default: Lahore
  const [isLocating, setIsLocating] = useState(false);

  // Handle GPS Auto-Location
  const handleGPS = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          setIsLocating(false);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    handleGPS();
  }, []);

  return (
    <div className="fixed inset-0 pt-20 bg-black overflow-hidden flex flex-col">
      {/* 🛰️ IMMERSIVE MAP LAYER */}
      <div className="flex-1 relative">
        <MapView 
          center={mapCenter}
          points={points}
          onAddPoint={addPoint}
          isDrawing={isDrawing}
        />

        {/* ── TOP HUD (STATUS) ── */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-6 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-4 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">System Active</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              {points.length} Coordinates Linked
            </span>
          </motion.div>
        </div>

        {/* ── LEFT CONTROLS (TOOLS) ── */}
        <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-2 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl flex flex-col gap-2 shadow-2xl"
          >
            <TooltipButton 
              icon={isLocating ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Navigation size={20} /></motion.div> : <Navigation size={20} />} 
              label={isLocating ? "Locating..." : "My Location"} 
              onClick={handleGPS}
              disabled={isLocating}
            />
            <TooltipButton 
              icon={isDrawing ? <CheckCircle2 size={20} className="text-white" /> : <Plus size={20} />} 
              label={isDrawing ? "Finish Drawing" : "Draw Boundary"} 
              active={isDrawing}
              onClick={() => setIsDrawing(!isDrawing)}
            />
            <TooltipButton 
              icon={<Trash2 size={20} />} 
              label="Clear Map" 
              onClick={clearPoints}
            />
            <div className="h-px w-full bg-white/10 mx-auto" />
            <TooltipButton 
              icon={<Save size={20} />} 
              label="Save Field" 
              onClick={saveField}
              disabled={points.length < 3}
            />
          </motion.div>
        </div>

        {/* ── RIGHT PANEL (AI ANALYSIS) ── */}
        <AnimatePresence>
          {fieldData && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute top-6 right-6 bottom-6 w-80 z-[1000] pointer-events-auto"
            >
              <div className="h-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-8 border-b border-white/10">
                  <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">AI Analysis Active</Badge>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{fieldData.name}</h2>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] mt-1 italic">SIMULATED SATELLITE DATA</p>
                </div>

                {/* Metrics */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                  <MetricCard 
                    label="Crop Health" 
                    value={`${fieldData.lastAnalysis?.healthIndex}%`} 
                    icon={<Activity className="text-green-400" />}
                    progress={fieldData.lastAnalysis?.healthIndex}
                  />
                  <MetricCard 
                    label="NDVI Score" 
                    value={fieldData.lastAnalysis?.ndvi.toFixed(2) || "0.00"} 
                    icon={<MapIcon className="text-blue-400" />}
                    progress={(fieldData.lastAnalysis?.ndvi || 0) * 100}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Moisture</div>
                      <div className="text-lg font-bold text-white flex items-center gap-2">
                        <Droplets size={16} className="text-cyan-400" />
                        {fieldData.lastAnalysis?.moisture}
                      </div>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-black text-zinc-500 uppercase mb-2">Risk</div>
                      <div className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldAlert size={16} className="text-yellow-400" />
                        {fieldData.lastAnalysis?.riskLevel}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Field Summary</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs text-zinc-400">Total Area</span>
                        <span className="text-xs font-bold text-white">{fieldData.area.toFixed(2)} Acres</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-zinc-400">Perimeter</span>
                        <span className="text-xs font-bold text-white">{(fieldData.perimeter / 1000).toFixed(2)} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-zinc-400">Status</span>
                        <span className="text-xs font-bold text-green-400">Ready for Sync</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-white/5 border-t border-white/10">
                  <Button className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest text-xs">
                    Export Field Report
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM DRAWER (MOBILE ONLY) ── */}
        <div className="md:hidden absolute bottom-6 left-6 right-6 z-[1000]">
           {/* Mobile UI can be simplified version of analysis panel or tool selector */}
        </div>
      </div>
    </div>
  );
}

function TooltipButton({ icon, label, onClick, active, disabled }: any) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          active 
          ? "bg-green-600 text-white shadow-[0_0_20px_rgba(76,175,80,0.4)]" 
          : "text-zinc-400 hover:bg-white/10 hover:text-white"
        } disabled:opacity-20`}
      >
        {icon}
      </button>
      <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[2000]">
        {label}
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, progress }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-lg font-black text-white">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-600 to-green-400"
        />
      </div>
    </div>
  );
}

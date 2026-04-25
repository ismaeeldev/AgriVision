"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { CROPS, CALCULATOR_LOGIC } from "@/data/calculator-data";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Beaker, 
  Sprout, 
  Target, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Calculator,
  Droplet,
  Scaling,
  Zap,
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function PrecisionDosePage() {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0].id);
  const [selectedMedicine, setSelectedMedicine] = useState(PRODUCTS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [area, setArea] = useState<number>(1);
  const [severity, setSeverity] = useState("Low");
  const [isCalculating, setIsCalculating] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredMedicines = useMemo(() => {
    return PRODUCTS.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAddToCart = () => {
    if (selectedMedicine) {
      addToCart(selectedMedicine);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const medicine = PRODUCTS.find(m => m.id === selectedMedicine);
  const crop = CROPS.find(c => c.id === selectedCrop);

  const result = useMemo(() => {
    if (!medicine || !crop) return 0;
    
    const categoryDoses: Record<string, number> = {
      "Insecticides": 2.5,
      "Fungicides": 1.8,
      "Organic Crop Care": 4.0,
      "Fertilizers": 2.0,
      "Herbicides": 1.5,
    };
    const baseDose = categoryDoses[medicine.category] || 2.0;
    
    const cropMult = CALCULATOR_LOGIC.cropAdjustments[selectedCrop as keyof typeof CALCULATOR_LOGIC.cropAdjustments] || 1;
    const severityMult = CALCULATOR_LOGIC.infestationLevels.find(l => l.label === severity)?.multiplier || 1;
    
    return (baseDose * area * cropMult * severityMult).toFixed(2);
  }, [selectedCrop, selectedMedicine, area, severity, medicine, crop]);

  const triggerCalculation = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 800);
  };

  useEffect(() => {
    triggerCalculation();
  }, [selectedCrop, selectedMedicine, area, severity]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden selection:bg-green-100">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-200/20 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100/20 blur-[150px] rounded-full -z-10" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-6 bg-green-600/10 text-green-700 border-green-200 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                Precision AI Diagnosis 🧪
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tighter mb-6">
                Calculate the <span className="text-green-600">Perfect Dose</span>
              </h1>
              <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
                Our smart engine analyzes crop type, area, and infestation severity to provide lab-accurate dosage recommendations.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Input Dashboard */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Crop Selection */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <Sprout size={20} />
                  </div>
                  <h3 className="text-xl font-black text-black uppercase tracking-tight">1. Select Your Crop</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {CROPS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCrop(c.id)}
                      className={`group relative flex flex-col items-center gap-3 p-6 rounded-3xl transition-all duration-500 ${
                        selectedCrop === c.id 
                        ? "bg-green-600 text-white shadow-2xl shadow-green-600/30 scale-105" 
                        : "bg-zinc-50 text-zinc-400 hover:bg-white hover:shadow-xl hover:text-green-600 border border-transparent hover:border-green-100"
                      }`}
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform">{c.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{c.name}</span>
                      {selectedCrop === c.id && (
                        <motion.div layoutId="activeCrop" className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 size={14} className="text-green-600" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Medicine Selection */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Beaker size={20} />
                    </div>
                    <h3 className="text-xl font-black text-black uppercase tracking-tight">2. Choose Medicine</h3>
                  </div>

                  {/* Search Bar */}
                  <div className="relative group/search max-w-xs w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/search:text-blue-600 transition-colors" size={16} />
                    <Input 
                      placeholder="Search formulas..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 rounded-2xl border-zinc-100 bg-zinc-50/50 focus-visible:ring-blue-600 focus-visible:bg-white h-11 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-hide">
                  <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                    .scrollbar-hide {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>
                  {filteredMedicines.length > 0 ? (
                    filteredMedicines.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMedicine(m.id)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border ${
                          selectedMedicine === m.id
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "bg-white border-zinc-100 hover:border-blue-100"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMedicine === m.id ? "bg-blue-600 text-white" : "bg-zinc-50 text-zinc-400"}`}>
                            <Droplet size={20} />
                          </div>
                          <div className="text-left">
                            <div className={`font-bold ${selectedMedicine === m.id ? "text-blue-900" : "text-black"}`}>{m.name}</div>
                            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{m.category} • {m.description.slice(0, 40)}...</div>
                          </div>
                        </div>
                        {selectedMedicine === m.id && <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white"><CheckCircle2 size={14} /></div>}
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Step 3: Area & Severity */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                      <Scaling size={20} />
                    </div>
                    <h3 className="text-lg font-black text-black uppercase tracking-tight">3. Total Area</h3>
                  </div>
                  <div className="relative">
                    <Input 
                      type="number" 
                      value={area} 
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="h-16 rounded-2xl text-2xl font-black border-zinc-100 focus-visible:ring-green-600 bg-zinc-50/50 pr-16"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-zinc-400 uppercase tracking-widest text-xs">Acres</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                      <AlertTriangle size={20} />
                    </div>
                    <h3 className="text-lg font-black text-black uppercase tracking-tight">4. Severity</h3>
                  </div>
                  <div className="flex bg-zinc-50 p-1 rounded-2xl border border-zinc-100">
                    {CALCULATOR_LOGIC.infestationLevels.map((lvl) => (
                      <button
                        key={lvl.label}
                        onClick={() => setSeverity(lvl.label)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-tighter transition-all ${
                          severity === lvl.label
                          ? "bg-white text-black shadow-md border border-zinc-100"
                          : "text-zinc-400 hover:text-zinc-600"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Result Sidebar */}
            <div className="lg:col-span-5 sticky top-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative p-10 rounded-[48px] bg-gradient-to-br from-[#1B5E20] to-[#113B13] text-white shadow-[0_40px_80px_rgba(27,94,32,0.3)] overflow-hidden"
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 blur-[80px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/5 blur-[50px] rounded-full" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Calculator size={28} className="text-[#4CAF50]" />
                    </div>
                    <Badge className="bg-green-500/20 text-[#4CAF50] border-green-500/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Live Result
                    </Badge>
                  </div>

                  <div className="mb-12">
                    <div className="text-sm font-bold text-green-300/70 uppercase tracking-[0.3em] mb-4">Required Quantity</div>
                    <div className="flex items-baseline gap-4">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={result}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`text-8xl font-black tracking-tighter ${isCalculating ? "blur-md" : ""}`}
                        >
                          {result}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-3xl font-bold text-green-400 uppercase tracking-widest">
                        {medicine?.category === "Fertilizers" ? "kg" : "Liters"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-12">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <Info size={16} className="text-[#4CAF50]" />
                        <span className="text-xs font-black uppercase tracking-widest text-green-200">Application Insight</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                        Based on <span className="text-white font-bold">{area} acres</span> of <span className="text-white font-bold">{crop?.name}</span> with <span className="text-white font-bold">{severity.toLowerCase()}</span> infestation. Use a standard spray nozzle for optimal coverage.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-green-900/40 border border-green-500/20">
                      <div className="w-8 h-8 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50]">
                        <Zap size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tight text-green-100">Recommended spray: 150L water/acre</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleAddToCart}
                      size="lg" 
                      className={`w-full rounded-full h-16 text-lg font-black shadow-xl shadow-black/20 group transition-all duration-300 ${
                        added 
                        ? "bg-green-100 text-green-700 border-green-200" 
                        : "bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white"
                      }`}
                    >
                      {added ? "Dose Added to Plan!" : (
                        <span className="flex items-center justify-center gap-2">
                          Add to Protection Plan <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                    <Link href={`/products/${selectedMedicine}`} className="block">
                      <Button variant="ghost" className="w-full text-green-300 hover:text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs h-12">
                        View Product Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Pro Tip Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 rounded-[32px] bg-white border border-zinc-100 shadow-lg flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center shrink-0">
                   <Target size={32} className="text-yellow-600" />
                </div>
                <div>
                   <div className="text-sm font-black text-black uppercase tracking-tight mb-1">Expert Strategy</div>
                   <p className="text-xs text-zinc-500 leading-relaxed font-medium">For {crop?.name}, apply early morning (before 9 AM) or evening (after 5 PM) to minimize evaporation and maximize absorption.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

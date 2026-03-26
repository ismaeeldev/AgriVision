import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, ArrowRight, RefreshCcw, MessageSquare, ChevronRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScanContext } from "./types";
import { PRODUCTS } from "@/data/products";

interface Props {
  context: ScanContext;
  onReset: () => void;
  onAskAI: () => void;
}

export function ScanResult({ context, onReset, onAskAI }: Props) {
  // Find the product data for the mini card
  const product = PRODUCTS.find((p) => p.id === context.productId);

  const getSeverityStyle = (severity: string) => {
    if (severity === "High") return "bg-red-50 text-red-700 border-red-100";
    if (severity === "Medium") return "bg-orange-50 text-orange-700 border-orange-100";
    return "bg-green-50 text-green-700 border-green-100";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-[#f8faf8] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-b-3xl relative"
    >
      <div className="p-5 space-y-4 pb-24">
        
        {/* Detected Issue */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Detected Issue
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getSeverityStyle(context.severity)}`}>
              {context.severity} Severity
            </span>
          </div>
          <p className="text-lg font-extrabold text-zinc-900 relative z-10">{context.issue}</p>
          <div className="mt-3 flex items-center gap-2">
             <div className="h-1.5 flex-1 bg-zinc-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${context.confidence}%` }}
                 transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                 className="h-full bg-[#4CAF50] rounded-full"
               />
             </div>
             <span className="text-[10px] font-bold text-zinc-400">{context.confidence}% Match</span>
          </div>
        </div>

        {/* Recommendation & AI Tip */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-zinc-100 bg-gradient-to-br from-green-50/50 to-white">
            <h3 className="text-[#1B5E20] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Recommendation
            </h3>
            <p className="text-zinc-800 text-sm font-medium leading-relaxed">{context.recommendation}</p>
          </div>
          <div className="p-4 bg-yellow-50/50 border-t border-yellow-100/50">
            <h3 className="text-yellow-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3 h-3" />
              AI Tip
            </h3>
            <p className="text-yellow-800/80 text-xs font-medium leading-relaxed">{context.aiTip}</p>
          </div>
        </div>

        {/* Mini Product Card */}
        {product && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">AI Recommended</span>
            </div>
            <Link href={`/products/${product.id}`} className="block group">
              <div className="bg-white rounded-2xl border border-[#C9A227]/30 shadow-[0_4px_20px_rgba(201,162,39,0.1)] p-3 flex gap-4 items-center group-hover:border-[#C9A227] group-hover:shadow-[0_8px_30px_rgba(201,162,39,0.2)] transition-all">
                <div className="w-16 h-16 relative bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 truncate text-sm">{product.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs text-zinc-500 line-clamp-1">{product.category}</span>
                  </div>
                  <div className="font-extrabold text-[#1B5E20] mt-1 text-sm">${product.price.toFixed(2)}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#1B5E20] text-[#1B5E20] group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Action Buttons Float Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f8faf8] via-[#f8faf8] to-transparent pt-10 flex gap-2">
        <button 
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-white border border-zinc-200 text-zinc-600 font-bold text-sm shadow-sm hover:bg-zinc-50 active:scale-95 transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Retake
        </button>
        <button 
          onClick={onAskAI}
          className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Ask AI
        </button>
      </div>

    </motion.div>
  );
}

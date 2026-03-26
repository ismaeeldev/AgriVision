import { motion } from "framer-motion";
import { ChatbotMode } from "./types";

interface Props {
  mode: ChatbotMode;
  setMode: (mode: ChatbotMode) => void;
}

export function ModeSwitcher({ mode, setMode }: Props) {
  return (
    <div className="flex bg-zinc-100 p-1 mx-4 mt-3 rounded-xl border border-zinc-200/60 shadow-inner relative z-10">
      <button
        onClick={() => setMode("chat")}
        className="relative flex-1 py-2 text-xs font-bold rounded-lg transition-colors focus:outline-none group"
      >
        {mode === "chat" && (
          <motion.div
            layoutId="mode-switch"
            className="absolute inset-0 bg-white shadow-sm rounded-lg border border-zinc-200/50"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className={`relative z-10 transition-colors ${mode === "chat" ? "text-[#1B5E20]" : "text-zinc-500 group-hover:text-zinc-700"}`}>
          💬 Ask AI
        </span>
      </button>

      <button
        onClick={() => setMode("scan")}
        className="relative flex-1 py-2 text-xs font-bold rounded-lg transition-colors focus:outline-none group"
      >
        {mode === "scan" && (
          <motion.div
            layoutId="mode-switch"
            className="absolute inset-0 bg-white shadow-sm rounded-lg border border-zinc-200/50"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className={`relative z-10 transition-colors ${mode === "scan" ? "text-[#1B5E20]" : "text-zinc-500 group-hover:text-zinc-700"}`}>
          📷 Diagnose Crop
        </span>
      </button>
    </div>
  );
}

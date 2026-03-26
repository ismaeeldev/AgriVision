import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Camera, AlertCircle } from "lucide-react";
import { ScanContext } from "./types";
import { ScanResult } from "./ScanResult";

interface Props {
  onScanComplete: (context: ScanContext) => void;
  onAskAI: (context: ScanContext) => void;
}

type ScanState = "idle" | "uploading" | "scanning" | "error" | "success";

const STAGES = [
  "Analyzing leaf texture...",
  "Detecting color patterns...",
  "Matching disease database..."
];

export function ScanMode({ onScanComplete, onAskAI }: Props) {
  const [state, setState] = useState<ScanState>("idle");
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanContext | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        handleUpload();
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock Result Data
  const MOCK_RESULT: ScanContext = {
    id: crypto.randomUUID(),
    issue: "Aphid infestation",
    severity: "High",
    recommendation: "Use AgriShield Pro for fast pest control. Apply immediately to affected foliage.",
    aiTip: "Avoid overwatering to reduce recurrence as aphids thrive in very humid, dense canopies.",
    productId: "prod-1",
    confidence: 94
  };

  const handleUpload = () => {
    // Simulate an upload action starting the scan
    setState("scanning");
    setStageIdx(0);
    setProgress(0);

    // Simulate multi-stage progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress === 30) setStageIdx(1);
      if (currentProgress === 65) setStageIdx(2);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Successful scan
        setTimeout(() => {
          setResult(MOCK_RESULT);
          setState("success");
          onScanComplete(MOCK_RESULT);
        }, 500);
      }
    }, 50); // 50 * 50 = ~2.5 seconds total scanning time
  };

  if (state === "success" && result) {
    return <ScanResult context={result} onReset={() => setState("idle")} onAskAI={() => onAskAI(result)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#f8faf8] px-5 py-6">

      {state === "idle" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-[#1B5E20] mb-2">Diagnose Crop Issues</h3>
            <p className="text-zinc-500 text-sm">Upload a crop image to detect diseases and get instant, AI-powered solutions.</p>
          </div>

          <div
            onClick={() => document.getElementById('upload-input')?.click()}
            className="flex-1 border-2 border-dashed border-green-300/60 rounded-3xl bg-white/50 backdrop-blur-md flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-green-50/50 hover:border-[#4CAF50] hover:shadow-[0_0_30px_rgba(76,175,80,0.15)] transition-all duration-300 group relative overflow-hidden"
          >
            <input type="file" accept="image/*" id="upload-input" className="hidden" onChange={onFileChange} />

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-[#4CAF50]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-[#1B5E20]">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="text-center pb-2">
              <p className="font-bold text-zinc-800 text-lg mb-1">Drag & Drop Image</p>
              <p className="text-zinc-400 text-xs font-medium">JPEG, PNG up to 10MB</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider w-full px-12" onClick={(e) => e.stopPropagation()}>
              <div className="h-px bg-zinc-200 flex-1" />
              <span>OR</span>
              <div className="h-px bg-zinc-200 flex-1" />
            </div>

            <label htmlFor="camera-input" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-zinc-200 shadow-sm text-sm font-bold text-zinc-700 hover:border-green-200 hover:text-[#1B5E20] transition-colors cursor-pointer relative z-10">
              <input type="file" accept="image/*" capture="environment" id="camera-input" className="hidden" onChange={onFileChange} />
              <Camera className="w-4 h-4" />
              Capture Photo
            </label>
          </div>
        </motion.div>
      )}

      {state === "scanning" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          {/* Fake Image Container */}
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-green-900/20 border border-white/40">
            {/* We use a mock blur transition to simulate sharpening */}
            <motion.div
              animate={{ filter: ["blur(8px)", "blur(0px)"] }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${uploadedImage || '/images/products/agrishield.png'}')`, // Shows real image
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            {/* Moving Scan Line */}
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-[#4CAF50] shadow-[0_0_20px_4px_#4CAF50] z-20 opacity-80"
            />

            <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay z-10" />
          </div>

          <div className="w-full max-w-[200px] mb-4">
            <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden w-full">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]"
              />
            </div>
            <div className="mt-2 flex justify-between items-center text-xs font-bold text-zinc-400">
              <span>AI Processing</span>
              <span>{progress}%</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={stageIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[#1B5E20] font-bold text-sm tracking-wide"
            >
              {STAGES[stageIdx]}
            </motion.p>
          </AnimatePresence>

        </motion.div>
      )}

    </div>
  );
}

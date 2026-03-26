"use client";

import dynamic from 'next/dynamic';
// import { Expert } from "@/data/experts";
import type { MapUIProps } from "./MapUI";

// Next.js explicitly prevents Leaflet from functioning on the server.
// We dynamically import the MapUI wrapper with ssr: false.
const MapUI = dynamic<MapUIProps>(() => import('./MapUI'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 rounded-2xl animate-pulse">
      <div className="w-16 h-16 border-4 border-zinc-200 border-t-[#4CAF50] rounded-full animate-spin mb-4" />
      <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Initializing Map Engine</p>
    </div>
  )
});

export default MapUI;

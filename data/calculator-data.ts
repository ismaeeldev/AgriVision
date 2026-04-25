export interface CropOption {
  id: string;
  name: string;
  icon: string;
}

export interface MedicineOption {
  id: string;
  name: string;
  baseDose: number; // liters/kg per acre
  unit: string;
  description: string;
}

export const CROPS: CropOption[] = [
  { id: "wheat", name: "Wheat", icon: "🌾" },
  { id: "rice", name: "Rice", icon: "🍚" },
  { id: "cotton", name: "Cotton", icon: "☁️" },
  { id: "maize", name: "Maize", icon: "🌽" },
  { id: "sugarcane", name: "Sugarcane", icon: "🎋" },
];

export const MEDICINES: MedicineOption[] = [
  { id: "prod-1", name: "AgriShield Pro", baseDose: 2.5, unit: "Liters", description: "Standard dose for wheat and maize." },
  { id: "prod-2", name: "CropGuard Max", baseDose: 1.8, unit: "Liters", description: "Effective for fungal protection." },
  { id: "prod-3", name: "BioGrow Spray", baseDose: 4.0, unit: "Liters", description: "High volume organic growth booster." },
  { id: "prod-6", name: "RootBoost X", baseDose: 2.0, unit: "kg", description: "Soil-applied nutrient booster." },
  { id: "prod-4", name: "PestKill Ultra", baseDose: 1.2, unit: "Liters", description: "Concentrated insecticide." },
];

export const CALCULATOR_LOGIC = {
  // Factors to adjust dose based on crop
  cropAdjustments: {
    wheat: 1.0,
    rice: 1.2,
    cotton: 1.1,
    maize: 0.9,
    sugarcane: 1.5,
  },
  // Factors based on infestation level
  infestationLevels: [
    { label: "Low", multiplier: 1.0, description: "Preventative or early signs." },
    { label: "Moderate", multiplier: 1.5, description: "Visible damage, active pests." },
    { label: "Severe", multiplier: 2.0, description: "Critical damage, immediate action." },
  ],
};

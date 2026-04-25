export interface CaseStudy {
  id: string;
  problem: string;
  solution: string;
  result: string;
  yieldIncrease: string;
  crop: string;
  location: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  productId: string;
  tags: string[];
  farmer: {
    name: string;
    avatar: string;
  };
  timeline: {
    day: number;
    title: string;
    description: string;
  }[];
  successRate: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    problem: "Aphid infestation in wheat",
    solution: "AgriShield Pro",
    result: "90% pest reduction in 3 days",
    yieldIncrease: "25%",
    crop: "Wheat",
    location: "Punjab",
    duration: "7 days",
    beforeImage: "/images/cases/before1.png",
    afterImage: "/images/cases/after1.png",
    productId: "prod-1",
    tags: ["🐛 Pest Attack", "fast-recovery"],
    farmer: {
      name: "Ahmed Raza",
      avatar: "/images/farmers/f1.png"
    },
    timeline: [
      { day: 1, title: "Applied", description: "AgriShield Pro applied across the affected 5-acre wheat plot." },
      { day: 3, title: "Pest reduced", description: "90% reduction in aphid population observed; crop yellowing stopped." },
      { day: 7, title: "Crop recovered", description: "Natural green color returned; plants showing vigorous growth." }
    ],
    successRate: 90
  },


  {
    id: "case-2",
    problem: "Leaf Rust in Maize",
    solution: "CropGuard Max",
    result: "Complete fungal clearance",
    yieldIncrease: "18%",
    crop: "Maize",
    location: "Sindh",
    duration: "10 days",
    beforeImage: "/images/cases/before2.png",
    afterImage: "/images/cases/after2.png",
    productId: "prod-2",
    tags: ["🍂 Leaf Disease", "fungal-control"],
    farmer: {
      name: "Sajid Ali",
      avatar: "/images/farmers/f2.png"
    },
    timeline: [
      { day: 1, title: "Sprayed", description: "First dose of CropGuard Max sprayed." },
      { day: 5, title: "Stabilized", description: "Rust spots stopped spreading to healthy leaves." },
      { day: 10, title: "Cleared", description: "New foliage emerged completely healthy and rust-free." }
    ],
    successRate: 85
  },
  {
    id: "case-3",
    problem: "Stunted growth in rice",
    solution: "BioGrow Spray",
    result: "Vibrant growth & stem strength",
    yieldIncrease: "30%",
    crop: "Rice",
    location: "Gujranwala",
    duration: "14 days",
    beforeImage: "/images/cases/before3.png",
    afterImage: "/images/cases/after3.png",
    productId: "prod-3",
    tags: ["🌾 Low Yield", "organic-boost"],
    farmer: {
      name: "Maria Bibi",
      avatar: "/images/farmers/f3.png"
    },
    timeline: [
      { day: 1, title: "Initiated", description: "BioGrow Spray integrated into the irrigation cycle." },
      { day: 7, title: "Visual Shift", description: "Deepening of leaf color and noticeable height increase." },
      { day: 14, title: "Peak Health", description: "Tillering increased by 40% compared to control plot." }
    ],
    successRate: 95
  },
  {
    id: "case-4",
    problem: "Nutrient deficiency in soil",
    solution: "RootBoost X",
    result: "Optimized soil pH & nutrients",
    yieldIncrease: "22%",
    crop: "Cotton",
    location: "Multan",
    duration: "21 days",
    beforeImage: "/images/cases/before4.png",
    afterImage: "/images/cases/after4.png",
    productId: "prod-6",
    tags: ["💧 Soil Issues", "nutrient-rich"],
    farmer: {
      name: "Zubair Khan",
      avatar: "/images/farmers/f4.png"
    },
    timeline: [
      { day: 1, title: "Soil Drench", description: "RootBoost X applied via soil drenching method." },
      { day: 10, title: "Root Expansion", description: "Excavation showed 2x root hair development." },
      { day: 21, title: "Total Recovery", description: "Plant biomass increased significantly; nutrient uptake stabilized." }
    ],
    successRate: 88
  }
];

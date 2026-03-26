export interface Expert {
  id: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  role: string;
  experience: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  availability: "Available Now" | "Busy" | "Offline";
  specializations: string[];
  distance?: number;
}

export const FIELD_OFFICERS: Expert[] = [
  {
    id: "off-live-1",
    name: "Dr. Kamran Iqbal",
    lat: 30.585000, // Very close to 30.583584
    lng: 73.838000, // Very close to 73.836688
    phone: "03009998887",
    whatsapp: "923009998887",
    role: "Senior Agronomist",
    experience: "15 years",
    image: "/images/profilePic.jpg",
    rating: 5.0,
    reviewsCount: 420,
    isVerified: true,
    availability: "Available Now",
    specializations: ["Soil Health", "Crop Nutrition", "Pest Management"],
  },
  {
    id: "off-1",
    name: "Ahmed Raza",
    lat: 31.565682,
    lng: 74.314183,
    phone: "03001234567",
    whatsapp: "923001234567",
    role: "Pest Control Specialist",
    experience: "8 years",
    image: "/images/profilePic.jpg",
    rating: 4.9,
    reviewsCount: 142,
    isVerified: true,
    availability: "Available Now",
    specializations: ["Pest Control", "Wheat Crops", "Soil Testing"],
  },
  {
    id: "off-2",
    name: "Sarah Khan",
    lat: 31.5100,
    lng: 74.3400,
    phone: "03001234568",
    whatsapp: "923001234568",
    role: "Irrigation Expert",
    experience: "5 years",
    image: "/images/avatars/avatar2.png",
    rating: 4.7,
    reviewsCount: 89,
    isVerified: true,
    availability: "Busy",
    specializations: ["Drip Irrigation", "Water Management", "Rice Cultivation"],
  },
  {
    id: "off-3",
    name: "Tariq Mahmood",
    lat: 31.5350,
    lng: 74.3750,
    phone: "03001234569",
    whatsapp: "923001234569",
    role: "Organic Farming Consultant",
    experience: "12 years",
    image: "/images/avatars/avatar3.png",
    rating: 5.0,
    reviewsCount: 310,
    isVerified: true,
    availability: "Offline",
    specializations: ["Organic Fertilizers", "Canopy Management", "Fruit Orchards"],
  },
  {
    id: "off-4",
    name: "Uzma Ali",
    lat: 31.4900,
    lng: 74.3800,
    phone: "03001234570",
    whatsapp: "923001234570",
    role: "Fungal Disease Analyst",
    experience: "4 years",
    image: "/images/avatars/avatar4.png",
    rating: 4.8,
    reviewsCount: 56,
    isVerified: false,
    availability: "Available Now",
    specializations: ["Fungal Defense", "Root Rot", "Vegetable Farming"],
  },
  {
    id: "off-5",
    name: "Usman Ghani",
    lat: 31.5600,
    lng: 74.3100,
    phone: "03001234571",
    whatsapp: "923001234571",
    role: "Agro-Technologist",
    experience: "7 years",
    image: "/images/avatars/avatar5.png",
    rating: 4.6,
    reviewsCount: 112,
    isVerified: true,
    availability: "Available Now",
    specializations: ["Precision Spraying", " (Drone) Mapping", "Soil Fertility"],
  }
];

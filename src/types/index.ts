export interface Partner {
  id: string;
  name: string;
  type: 'restaurant' | 'bakery' | 'cafe' | 'other';
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  wasteTypes: string[];
  totalWasteUpcycled: number;
  description?: string;
  logo?: string;
  website?: string;
  sustainabilityStory?: string;
  joinedDate: Date;
}

export interface Batch {
  batchId: string;
  productType: 'dried_koji' | 'fresh_koji' | 'miso' | 'shoyu' | 'garum';
  productName: string;
  productionDate: Date;

  source: {
    partnerId: string;
    partnerName: string;
    location: {
      lat: number;
      lng: number;
    };
    wasteType: string[];
    wasteWeight: number; // kg
  };

  fermentation: {
    startDate: Date;
    endDate: Date;
    duration: number; // days
    method: 'rice_koji' | 'barley_koji' | 'wheat_koji';
    temperature?: number;
    humidity?: number;
  };

  aging?: {
    startDate: Date;
    expectedEndDate: Date;
    currentAge: number; // days
    targetAge: number; // days
  };

  impact: {
    co2Saved: number; // kg
    wasteDiverted: number; // kg
    mealsEquivalent: number;
    waterSaved?: number; // liters
  };

  media: {
    photos: string[];
    videos: string[];
    liveStreamUrl?: string;
    timelapseUrl?: string;
  };

  journey: JourneyStep[];

  qrCode: string;
  status: 'inoculation' | 'fermentation' | 'aging' | 'ready' | 'sold';

  notes?: string;
  certifications?: string[];
}

export interface JourneyStep {
  id: string;
  day: number;
  title: string;
  description: string;
  date: Date;
  photo?: string;
  icon?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'dried_koji' | 'fresh_koji' | 'miso' | 'shoyu' | 'garum';
  price: number;
  currency: string;
  unit: string;
  inStock: boolean;
  images: string[];
  currentBatchId?: string;
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  usageInstructions?: string;
  recipes?: Recipe[];
  shelfLife: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: string[];
  instructions: string[];
  images: string[];
  videoUrl?: string;
  tags: string[];
  requiredProducts: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  favoriteProducts?: string[];
  scannedBatches?: string[];
  totalImpact?: {
    co2Saved: number;
    wasteDiverted: number;
  };
  newsletter: boolean;
  preferences?: {
    language: 'en' | 'da';
    notifications: boolean;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: Date;
  category: 'fermentation' | 'sustainability' | 'recipes' | 'partners' | 'news';
  tags: string[];
  featuredImage: string;
  readTime: number; // minutes
}
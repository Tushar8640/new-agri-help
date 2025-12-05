export interface MarketPrice {
  id: string;
  cropId: string;
  cropName: string;
  cropNameBn: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices';
  categoryBn: string;
  image?: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  marketId: string;
  marketName: string;
  marketNameBn: string;
  division: string;
  district: string;
  date: string;
  quality?: string;
}

export interface Market {
  id: string;
  name: string;
  nameBn: string;
  type: 'wholesale' | 'retail';
  division: string;
  district: string;
  marketDays: string[];
}

export interface PriceHistory {
  date: string;
  price: number;
}

export const DEMO_MARKETS: Market[] = [
  { id: 'm1', name: 'Kawran Bazar', nameBn: 'কাওরান বাজার', type: 'wholesale', division: 'Dhaka', district: 'Dhaka', marketDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  { id: 'm2', name: 'Karwan Bazar', nameBn: 'কারওয়ান বাজার', type: 'wholesale', division: 'Dhaka', district: 'Dhaka', marketDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  { id: 'm3', name: 'Gazipur Haat', nameBn: 'গাজীপুর হাট', type: 'retail', division: 'Dhaka', district: 'Gazipur', marketDays: ['Tuesday', 'Friday'] },
  { id: 'm4', name: 'Rajshahi Bazar', nameBn: 'রাজশাহী বাজার', type: 'wholesale', division: 'Rajshahi', district: 'Rajshahi', marketDays: ['Sunday', 'Wednesday', 'Saturday'] },
];

export const DEMO_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mp1',
    cropId: 'c1',
    cropName: 'Rice (BR-28)',
    cropNameBn: 'ধান (বিআর-২৮)',
    category: 'grains',
    categoryBn: 'শস্য',
    minPrice: 45,
    maxPrice: 52,
    avgPrice: 48,
    unit: 'কেজি',
    trend: 'up',
    changePercent: 3.5,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp2',
    cropId: 'c2',
    cropName: 'Potato',
    cropNameBn: 'আলু',
    category: 'vegetables',
    categoryBn: 'শাকসবজি',
    minPrice: 25,
    maxPrice: 30,
    avgPrice: 28,
    unit: 'কেজি',
    trend: 'down',
    changePercent: -2.1,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp3',
    cropId: 'c3',
    cropName: 'Onion',
    cropNameBn: 'পেঁয়াজ',
    category: 'vegetables',
    categoryBn: 'শাকসবজি',
    minPrice: 40,
    maxPrice: 48,
    avgPrice: 44,
    unit: 'কেজি',
    trend: 'up',
    changePercent: 5.2,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp4',
    cropId: 'c4',
    cropName: 'Tomato',
    cropNameBn: 'টমেটো',
    category: 'vegetables',
    categoryBn: 'শাকসবজি',
    minPrice: 35,
    maxPrice: 42,
    avgPrice: 38,
    unit: 'কেজি',
    trend: 'stable',
    changePercent: 0.5,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp5',
    cropId: 'c5',
    cropName: 'Eggplant',
    cropNameBn: 'বেগুন',
    category: 'vegetables',
    categoryBn: 'শাকসবজি',
    minPrice: 30,
    maxPrice: 38,
    avgPrice: 34,
    unit: 'কেজি',
    trend: 'down',
    changePercent: -1.8,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp6',
    cropId: 'c6',
    cropName: 'Mango',
    cropNameBn: 'আম',
    category: 'fruits',
    categoryBn: 'ফল',
    minPrice: 80,
    maxPrice: 120,
    avgPrice: 100,
    unit: 'কেজি',
    trend: 'up',
    changePercent: 8.5,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp7',
    cropId: 'c7',
    cropName: 'Banana',
    cropNameBn: 'কলা',
    category: 'fruits',
    categoryBn: 'ফল',
    minPrice: 40,
    maxPrice: 60,
    avgPrice: 50,
    unit: 'ডজন',
    trend: 'stable',
    changePercent: 0.2,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp8',
    cropId: 'c8',
    cropName: 'Turmeric',
    cropNameBn: 'হলুদ',
    category: 'spices',
    categoryBn: 'মসলা',
    minPrice: 200,
    maxPrice: 250,
    avgPrice: 225,
    unit: 'কেজি',
    trend: 'up',
    changePercent: 4.2,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp9',
    cropId: 'c9',
    cropName: 'Chili',
    cropNameBn: 'মরিচ',
    category: 'spices',
    categoryBn: 'মসলা',
    minPrice: 180,
    maxPrice: 220,
    avgPrice: 200,
    unit: 'কেজি',
    trend: 'down',
    changePercent: -3.5,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
  {
    id: 'mp10',
    cropId: 'c10',
    cropName: 'Garlic',
    cropNameBn: 'রসুন',
    category: 'spices',
    categoryBn: 'মসলা',
    minPrice: 150,
    maxPrice: 180,
    avgPrice: 165,
    unit: 'কেজি',
    trend: 'stable',
    changePercent: 0.8,
    marketId: 'm1',
    marketName: 'Kawran Bazar',
    marketNameBn: 'কাওরান বাজার',
    division: 'Dhaka',
    district: 'Dhaka',
    date: new Date().toISOString(),
  },
];

// Generate 7-day price history for demo
export const generatePriceHistory = (cropId: string, currentPrice: number): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random price variation (±10%)
    const variation = (Math.random() - 0.5) * 0.2;
    const price = Math.round(currentPrice * (1 + variation));
    
    history.push({
      date: date.toISOString().split('T')[0],
      price,
    });
  }
  
  return history;
};

export const CROP_CATEGORIES = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'vegetables', label: 'Vegetables', labelBn: 'শাকসবজি' },
  { id: 'fruits', label: 'Fruits', labelBn: 'ফল' },
  { id: 'grains', label: 'Grains', labelBn: 'শস্য' },
  { id: 'spices', label: 'Spices', labelBn: 'মসলা' },
];

export const TIME_RANGES = [
  { id: '7d', label: '7 Days', labelBn: '৭ দিন' },
  { id: '1m', label: '1 Month', labelBn: '১ মাস' },
  { id: '3m', label: '3 Months', labelBn: '৩ মাস' },
  { id: '1y', label: '1 Year', labelBn: '১ বছর' },
];

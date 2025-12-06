export interface Farm {
  id: string;
  name: string;
  nameBn: string;
  size: number;
  unit: 'bigha' | 'acre';
  unitBn: string;
  division: string;
  district: string;
  soilType: string;
  soilTypeBn: string;
  irrigation: string;
  irrigationBn: string;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  nameBn: string;
  size: number;
  unit: string;
  crop?: string;
  cropBn?: string;
  status: 'active' | 'harvested' | 'fallow';
  statusBn: string;
  plantedDate?: string;
  daysPlanted?: number;
}

export interface Activity {
  id: string;
  fieldId: string;
  fieldName: string;
  type: 'planting' | 'fertilizer' | 'watering' | 'pesticide' | 'weeding' | 'harvesting';
  typeBn: string;
  date: string;
  cost: number;
  notes: string;
  notesBn: string;
}

export interface Expense {
  id: string;
  category: 'seeds' | 'fertilizer' | 'pesticide' | 'labor' | 'irrigation' | 'equipment';
  categoryBn: string;
  amount: number;
  date: string;
  description: string;
  descriptionBn: string;
  fieldId?: string;
  fieldBn?: string;
}

export interface Harvest {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldNameBn: string;
  fieldBn: string;
  crop: string;
  cropBn: string;
  quantity: number;
  unit: 'kg' | 'mon';
  unitBn: string;
  quality: 'excellent' | 'good' | 'average';
  qualityBn: string;
  soldPrice: number;
  date: string;
  season: string;
  seasonBn: string;
}

export const ACTIVITY_TYPES = [
  { id: 'planting', label: 'Planting', labelBn: 'চারা রোপণ' },
  { id: 'fertilizer', label: 'Fertilizer', labelBn: 'সার' },
  { id: 'watering', label: 'Watering', labelBn: 'পানি' },
  { id: 'pesticide', label: 'Pesticide', labelBn: 'কীটনাশক' },
  { id: 'weeding', label: 'Weeding', labelBn: 'আগাছা' },
  { id: 'harvesting', label: 'Harvesting', labelBn: 'ফসল তোলা' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'seeds', label: 'Seeds', labelBn: 'বীজ' },
  { id: 'fertilizer', label: 'Fertilizer', labelBn: 'সার' },
  { id: 'pesticide', label: 'Pesticide', labelBn: 'কীটনাশক' },
  { id: 'labor', label: 'Labor', labelBn: 'শ্রমিক' },
  { id: 'irrigation', label: 'Irrigation', labelBn: 'সেচ' },
  { id: 'equipment', label: 'Equipment', labelBn: 'যন্ত্রপাতি' },
];

export const DEMO_FARMS: Farm[] = [
  {
    id: 'farm1',
    name: 'Main Farm',
    nameBn: 'প্রধান খামার',
    size: 5,
    unit: 'bigha',
    unitBn: 'বিঘা',
    division: 'Rajshahi',
    district: 'Rajshahi',
    soilType: 'Clay loam',
    soilTypeBn: 'এঁটেল দোআঁশ',
    irrigation: 'Canal',
    irrigationBn: 'খাল',
  },
];

export const DEMO_FIELDS: Field[] = [
  {
    id: 'f1',
    farmId: 'farm1',
    name: 'North Field',
    nameBn: 'উত্তর মাঠ',
    size: 2,
    unit: 'বিঘা',
    crop: 'Rice',
    cropBn: 'ধান',
    status: 'active',
    statusBn: 'সক্রিয়',
    plantedDate: '2024-11-15',
    daysPlanted: 21,
  },
  {
    id: 'f2',
    farmId: 'farm1',
    name: 'South Field',
    nameBn: 'দক্ষিণ মাঠ',
    size: 1.5,
    unit: 'বিঘা',
    crop: 'Tomato',
    cropBn: 'টমেটো',
    status: 'active',
    statusBn: 'সক্রিয়',
    plantedDate: '2024-11-20',
    daysPlanted: 16,
  },
  {
    id: 'f3',
    farmId: 'farm1',
    name: 'East Field',
    nameBn: 'পূর্ব মাঠ',
    size: 1.5,
    unit: 'বিঘা',
    status: 'fallow',
    statusBn: 'পতিত',
  },
];

export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    fieldId: 'f1',
    fieldName: 'উত্তর মাঠ',
    type: 'planting',
    typeBn: 'চারা রোপণ',
    date: '2024-11-15',
    cost: 3000,
    notes: 'Planted BR-28 rice variety',
    notesBn: 'বিআর-২৮ ধানের চারা রোপণ করা হয়েছে',
  },
  {
    id: 'a2',
    fieldId: 'f1',
    fieldName: 'উত্তর মাঠ',
    type: 'fertilizer',
    typeBn: 'সার',
    date: '2024-11-25',
    cost: 1500,
    notes: 'Applied urea fertilizer',
    notesBn: 'ইউরিয়া সার প্রয়োগ করা হয়েছে',
  },
  {
    id: 'a3',
    fieldId: 'f2',
    fieldName: 'দক্ষিণ মাঠ',
    type: 'planting',
    typeBn: 'চারা রোপণ',
    date: '2024-11-20',
    cost: 2000,
    notes: 'Planted tomato seedlings',
    notesBn: 'টমেটোর চারা রোপণ করা হয়েছে',
  },
];

export const DEMO_EXPENSES: Expense[] = [
  {
    id: 'e1',
    category: 'seeds',
    categoryBn: 'বীজ',
    amount: 5000,
    date: '2024-11-01',
    description: 'Rice seeds BR-28',
    descriptionBn: 'ধানের বীজ বিআর-২৮',
  },
  {
    id: 'e2',
    category: 'fertilizer',
    categoryBn: 'সার',
    amount: 3500,
    date: '2024-11-10',
    description: 'Urea and TSP fertilizer',
    descriptionBn: 'ইউরিয়া ও টিএসপি সার',
  },
  {
    id: 'e3',
    category: 'labor',
    categoryBn: 'শ্রমিক',
    amount: 8000,
    date: '2024-11-15',
    description: 'Labor for planting',
    descriptionBn: 'রোপণের জন্য শ্রমিক',
  },
  {
    id: 'e4',
    category: 'pesticide',
    categoryBn: 'কীটনাশক',
    amount: 2000,
    date: '2024-11-28',
    description: 'Organic pesticide',
    descriptionBn: 'জৈব কীটনাশক',
  },
  {
    id: 'e5',
    category: 'irrigation',
    categoryBn: 'সেচ',
    amount: 4000,
    date: '2024-12-01',
    description: 'Irrigation cost',
    descriptionBn: 'সেচের খরচ',
  },
];

export const DEMO_HARVESTS: Harvest[] = [
  {
    id: 'h1',
    fieldId: 'f1',
    fieldName: 'North Field',
    fieldNameBn: 'উত্তর মাঠ',
    fieldBn: 'উত্তর মাঠ',
    crop: 'Rice',
    cropBn: 'ধান',
    quantity: 1200,
    unit: 'kg',
    unitBn: 'কেজি',
    quality: 'excellent',
    qualityBn: 'চমৎকার',
    soldPrice: 48000,
    date: '2024-04-15',
    season: 'Rabi',
    seasonBn: 'রবি',
  },
  {
    id: 'h2',
    fieldId: 'f2',
    fieldName: 'South Field',
    fieldNameBn: 'দক্ষিণ মাঠ',
    fieldBn: 'দক্ষিণ মাঠ',
    crop: 'Potato',
    cropBn: 'আলু',
    quantity: 800,
    unit: 'kg',
    unitBn: 'কেজি',
    quality: 'good',
    qualityBn: 'ভালো',
    soldPrice: 24000,
    date: '2024-03-20',
    season: 'Rabi',
    seasonBn: 'রবি',
  },
];

// Calculate total expenses for current month
export function getCurrentMonthExpenses(expenses: Expense[] = DEMO_EXPENSES): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
}

// Calculate expenses by category for pie chart
export function getExpensesByCategory(expenses: Expense[] = DEMO_EXPENSES) {
  const categoryTotals: Record<string, number> = {};
  
  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;
  });
  
  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    categoryBn: EXPENSE_CATEGORIES.find((c) => c.id === category)?.labelBn || category,
    amount,
  }));
}

// Calculate total harvest value
export function getTotalHarvestValue(harvests: Harvest[] = DEMO_HARVESTS): number {
  return harvests.reduce((sum, harvest) => sum + harvest.soldPrice, 0);
}

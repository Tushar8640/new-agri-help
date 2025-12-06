export interface UserProfile {
  id: string;
  name: string;
  nameBn: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: 'farmer' | 'seller' | 'both';
  roleBn: string;
  division: string;
  district: string;
  location: string;
  locationBn: string;
  farmSize?: number;
  farmUnit?: 'bigha' | 'acre';
  farmUnitBn?: string;
  experience?: number;
  primaryCrops?: string[];
  primaryCropsBn?: string[];
  memberSince: string;
  verified: boolean;
}

export interface Settings {
  language: 'bn' | 'en';
  notifications: {
    push: boolean;
    sms: boolean;
    email: boolean;
    priceAlerts: boolean;
    diseaseAlerts: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'order' | 'price' | 'disease' | 'community' | 'system';
  typeBn: string;
  icon: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  time: string;
  read: boolean;
}

export const DEMO_USER: UserProfile = {
  id: 'user1',
  name: 'Kamal Hossain',
  nameBn: 'কামাল হোসেন',
  phone: '01712345678',
  email: 'kamal@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamal',
  role: 'farmer',
  roleBn: 'কৃষক',
  division: 'Rajshahi',
  district: 'Rajshahi',
  location: 'Rajshahi, Bangladesh',
  locationBn: 'রাজশাহী, বাংলাদেশ',
  farmSize: 5,
  farmUnit: 'bigha',
  farmUnitBn: 'বিঘা',
  experience: 15,
  primaryCrops: ['Rice', 'Wheat', 'Tomato'],
  primaryCropsBn: ['ধান', 'গম', 'টমেটো'],
  memberSince: '2023-01-15',
  verified: true,
};

export const DEMO_SETTINGS: Settings = {
  language: 'bn',
  notifications: {
    push: true,
    sms: true,
    email: false,
    priceAlerts: true,
    diseaseAlerts: true,
  },
};

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    typeBn: 'অর্ডার',
    icon: '📦',
    title: 'Order Delivered',
    titleBn: 'অর্ডার ডেলিভার হয়েছে',
    message: 'Your order #1234 has been delivered',
    messageBn: 'আপনার অর্ডার #১২৩৪ ডেলিভার হয়েছে',
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'price',
    typeBn: 'দাম',
    icon: '💰',
    title: 'Price Alert',
    titleBn: 'দামের সতর্কতা',
    message: 'Rice price increased to ৳45/kg',
    messageBn: 'ধানের দাম বেড়ে ৳৪৫/কেজি হয়েছে',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'disease',
    typeBn: 'রোগ',
    icon: '🔬',
    title: 'Disease Detection Complete',
    titleBn: 'রোগ শনাক্ত সম্পন্ন',
    message: 'Your rice crop has blast disease',
    messageBn: 'আপনার ধান ফসলে ব্লাস্ট রোগ আছে',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n4',
    type: 'community',
    typeBn: 'কমিউনিটি',
    icon: '💬',
    title: 'New Answer',
    titleBn: 'নতুন উত্তর',
    message: 'Someone answered your question about tomato',
    messageBn: 'কেউ টমেটো সম্পর্কে আপনার প্রশ্নের উত্তর দিয়েছে',
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n5',
    type: 'system',
    typeBn: 'সিস্টেম',
    icon: '🎉',
    title: 'Welcome to KrishiMitra',
    titleBn: 'কৃষিমিত্রায় স্বাগতম',
    message: 'Complete your profile to get started',
    messageBn: 'শুরু করতে আপনার প্রোফাইল সম্পূর্ণ করুন',
    time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export const PROFILE_STATS = {
  orders: 12,
  savedProducts: 8,
  questions: 5,
  posts: 3,
  farms: 1,
};

export const EXPERIENCE_OPTIONS = [
  { value: '0-2', label: '০-২ বছর' },
  { value: '3-5', label: '৩-৫ বছর' },
  { value: '6-10', label: '৬-১০ বছর' },
  { value: '11-20', label: '১১-২০ বছর' },
  { value: '20+', label: '২০+ বছর' },
];

export const CROP_OPTIONS = [
  { value: 'rice', label: 'ধান', labelEn: 'Rice' },
  { value: 'wheat', label: 'গম', labelEn: 'Wheat' },
  { value: 'potato', label: 'আলু', labelEn: 'Potato' },
  { value: 'tomato', label: 'টমেটো', labelEn: 'Tomato' },
  { value: 'onion', label: 'পেঁয়াজ', labelEn: 'Onion' },
  { value: 'garlic', label: 'রসুন', labelEn: 'Garlic' },
  { value: 'corn', label: 'ভুট্টা', labelEn: 'Corn' },
  { value: 'jute', label: 'পাট', labelEn: 'Jute' },
];

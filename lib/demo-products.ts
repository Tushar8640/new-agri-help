export interface Product {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  category: string;
  categoryBn: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  image?: string;
  rating: number;
  reviewCount: number;
  reviews: number;
  descriptionBn: string;
  seller: {
    id: string;
    name: string;
    isVerified: boolean;
    verified: boolean;
    location: string;
    rating: number;
  };
  description: string;
  features: string[];
  status: 'active' | 'out_of_stock';
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BR-28 Hybrid Rice Seeds',
    nameBn: 'বিআর-২৮ হাইব্রিড ধানের বীজ',
    slug: 'br-28-hybrid-rice-seeds',
    category: 'seeds',
    categoryBn: 'বীজ',
    price: 450,
    unit: 'কেজি',
    stock: 500,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.5,
    reviewCount: 45,
    reviews: 45,
    descriptionBn: 'উচ্চ ফলনশীল বিআর-২৮ হাইব্রিড ধানের বীজ। রোগ প্রতিরোধী এবং দ্রুত বৃদ্ধি পায়।',
    seller: {
      id: 's1',
      name: 'কৃষি বীজ ভান্ডার',
      isVerified: true,
      verified: true,
      location: 'ঢাকা',
      rating: 4.7,
    },
    description: 'উচ্চ ফলনশীল বিআর-২৮ হাইব্রিড ধানের বীজ। রোগ প্রতিরোধী এবং দ্রুত বৃদ্ধি পায়।',
    features: [
      'উচ্চ ফলনশীল জাত',
      'রোগ প্রতিরোধী',
      '১২০-১২৫ দিনে পরিপক্ক হয়',
      'বোরো মৌসুমের জন্য উপযুক্ত',
    ],
    status: 'active',
  },
  {
    id: '2',
    name: 'Organic Fertilizer',
    nameBn: 'জৈব সার',
    slug: 'organic-fertilizer',
    category: 'fertilizer',
    categoryBn: 'সার',
    price: 320,
    unit: '২০ কেজি ব্যাগ',
    stock: 200,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.8,
    reviewCount: 89,
    reviews: 89,
    descriptionBn: '১০০% জৈব সার যা মাটির উর্বরতা বৃদ্ধি করে এবং ফসলের বৃদ্ধি ত্বরান্বিত করে।',
    seller: {
      id: 's2',
      name: 'গ্রীন আর্থ এগ্রো',
      isVerified: true,
      verified: true,
      location: 'রাজশাহী',
      rating: 4.9,
    },
    description: '১০০% জৈব সার যা মাটির উর্বরতা বৃদ্ধি করে এবং ফসলের বৃদ্ধি ত্বরান্বিত করে।',
    features: [
      '১০০% জৈব উপাদান',
      'মাটির স্বাস্থ্য উন্নত করে',
      'দীর্ঘমেয়াদী ফলাফল',
      'সব ধরনের ফসলের জন্য',
    ],
    status: 'active',
  },
  {
    id: '3',
    name: 'Bio Pesticide',
    nameBn: 'জৈব কীটনাশক',
    slug: 'bio-pesticide',
    category: 'pesticide',
    categoryBn: 'কীটনাশক',
    price: 280,
    unit: 'লিটার',
    stock: 150,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.3,
    reviewCount: 34,
    reviews: 34,
    descriptionBn: 'নিরাপদ জৈব কীটনাশক যা পরিবেশ বান্ধব এবং স্বাস্থ্যের জন্য নিরাপদ।',
    seller: {
      id: 's3',
      name: 'বায়ো কৃষি সলিউশন',
      isVerified: true,
      verified: true,
      location: 'চট্টগ্রাম',
      rating: 4.5,
    },
    description: 'নিরাপদ জৈব কীটনাশক যা পরিবেশ বান্ধব এবং স্বাস্থ্যের জন্য নিরাপদ।',
    features: [
      'জৈব উপাদান থেকে তৈরি',
      'পরিবেশ বান্ধব',
      'ফসল ও মানুষের জন্য নিরাপদ',
      'কার্যকর কীট নিয়ন্ত্রণ',
    ],
    status: 'active',
  },
  {
    id: '4',
    name: 'Mini Tiller Machine',
    nameBn: 'মিনি টিলার যন্ত্র',
    slug: 'mini-tiller-machine',
    category: 'equipment',
    categoryBn: 'যন্ত্রপাতি',
    price: 35000,
    unit: 'পিস',
    stock: 15,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.6,
    reviewCount: 23,
    reviews: 23,
    descriptionBn: 'ছোট জমির জন্য আদর্শ মিনি টিলার মেশিন। জমি চাষের কাজ সহজ করে।',
    seller: {
      id: 's4',
      name: 'এগ্রো মেশিনারি',
      isVerified: true,
      verified: true,
      location: 'যশোর',
      rating: 4.8,
    },
    description: 'ছোট জমির জন্য আদর্শ মিনি টিলার মেশিন। জমি চাষের কাজ সহজ করে।',
    features: [
      'শক্তিশালী ইঞ্জিন',
      'জ্বালানি সাশ্রয়ী',
      'সহজ পরিচালনা',
      '১ বছরের ওয়ারেন্টি',
    ],
    status: 'active',
  },
  {
    id: '5',
    name: 'Tomato Seeds (Hybrid)',
    nameBn: 'টমেটো বীজ (হাইব্রিড)',
    slug: 'tomato-seeds-hybrid',
    category: 'seeds',
    categoryBn: 'বীজ',
    price: 850,
    unit: '১০ গ্রাম',
    stock: 80,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.7,
    reviewCount: 67,
    reviews: 67,
    descriptionBn: 'উচ্চ ফলনশীল হাইব্রিড টমেটোর বীজ। বড় এবং রসালো টমেটো উৎপাদন করে।',
    seller: {
      id: 's1',
      name: 'কৃষি বীজ ভান্ডার',
      isVerified: true,
      verified: true,
      location: 'ঢাকা',
      rating: 4.7,
    },
    description: 'উচ্চ ফলনশীল হাইব্রিড টমেটোর বীজ। বড় এবং রসালো টমেটো উৎপাদন করে।',
    features: [
      'উচ্চ ফলনশীল',
      'রোগ প্রতিরোধী',
      '৭৫-৮০ দিনে ফল পাওয়া যায়',
      'সব মৌসুমে চাষ যোগ্য',
    ],
    status: 'active',
  },
  {
    id: '6',
    name: 'NPK Fertilizer',
    nameBn: 'এনপিকে সার',
    slug: 'npk-fertilizer',
    category: 'fertilizer',
    categoryBn: 'সার',
    price: 420,
    unit: '২৫ কেজি ব্যাগ',
    stock: 100,
    images: ['/placeholder-product.jpg'],
    image: '/placeholder-product.jpg',
    rating: 4.4,
    reviewCount: 56,
    reviews: 56,
    descriptionBn: 'সুষম এনপিকে সার যা ফসলের পুষ্টি সরবরাহ করে এবং ফলন বৃদ্ধি করে।',
    seller: {
      id: 's2',
      name: 'গ্রীন আর্থ এগ্রো',
      isVerified: true,
      verified: true,
      location: 'রাজশাহী',
      rating: 4.9,
    },
    description: 'সুষম এনপিকে সার যা ফসলের পুষ্টি সরবরাহ করে এবং ফলন বৃদ্ধি করে।',
    features: [
      'নাইট্রোজেন, ফসফরাস, পটাশিয়াম',
      'দ্রুত কার্যকর',
      'সব ধরনের ফসলের জন্য',
      'মাটির উর্বরতা বৃদ্ধি করে',
    ],
    status: 'active',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All', labelBn: 'সব', labelEn: 'All' },
  { id: 'seeds', label: 'Seeds', labelBn: 'বীজ', labelEn: 'Seeds' },
  { id: 'fertilizer', label: 'Fertilizer', labelBn: 'সার', labelEn: 'Fertilizer' },
  { id: 'pesticide', label: 'Pesticide', labelBn: 'কীটনাশক', labelEn: 'Pesticide' },
  { id: 'equipment', label: 'Equipment', labelBn: 'যন্ত্রপাতি', labelEn: 'Equipment' },
];

import { 
  LayoutDashboard, 
  Bug, 
  ShoppingBag, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Tractor,
  Camera,
  type LucideIcon
} from 'lucide-react';

export interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  icon: LucideIcon;
  mobileOnly?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    label: 'Home',
    labelBn: 'হোম',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Disease Detection',
    labelBn: 'রোগ নির্ণয়',
    href: '/disease/detect',
    icon: Bug,
  },
  {
    label: 'Marketplace',
    labelBn: 'বাজার',
    href: '/marketplace',
    icon: ShoppingBag,
  },
  {
    label: 'Market Price',
    labelBn: 'বাজার দর',
    href: '/market-price',
    icon: TrendingUp,
  },
  {
    label: 'Knowledge',
    labelBn: 'জ্ঞান',
    href: '/knowledge',
    icon: BookOpen,
  },
  {
    label: 'Community',
    labelBn: 'সম্প্রদায়',
    href: '/community',
    icon: Users,
  },
  {
    label: 'Farm',
    labelBn: 'খামার',
    href: '/farm',
    icon: Tractor,
  },
];

// Mobile bottom navigation - 5 main items
export const mobileNavItems: NavItem[] = [
  navigationItems[0], // Home
  navigationItems[2], // Marketplace
  {
    label: 'Detect',
    labelBn: 'সনাক্ত',
    href: '/disease/detect',
    icon: Camera,
  },
  navigationItems[3], // Market Price
  navigationItems[5], // Community
];

// Breadcrumb labels
export const breadcrumbLabels: Record<string, { en: string; bn: string }> = {
  dashboard: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' },
  disease: { en: 'Disease', bn: 'রোগ' },
  detect: { en: 'Detection', bn: 'নির্ণয়' },
  history: { en: 'History', bn: 'ইতিহাস' },
  marketplace: { en: 'Marketplace', bn: 'বাজার' },
  cart: { en: 'Cart', bn: 'কার্ট' },
  checkout: { en: 'Checkout', bn: 'চেকআউট' },
  orders: { en: 'Orders', bn: 'অর্ডার' },
  'market-price': { en: 'Market Price', bn: 'বাজার দর' },
  trends: { en: 'Trends', bn: 'প্রবণতা' },
  alerts: { en: 'Alerts', bn: 'সতর্কতা' },
  knowledge: { en: 'Knowledge', bn: 'জ্ঞান' },
  community: { en: 'Community', bn: 'সম্প্রদায়' },
  farm: { en: 'Farm', bn: 'খামার' },
  profile: { en: 'Profile', bn: 'প্রোফাইল' },
  settings: { en: 'Settings', bn: 'সেটিংস' },
};

'use client';

import Link from 'next/link';
import { Camera, TrendingUp, ShoppingCart, HelpCircle, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickAction {
  title: string;
  icon: LucideIcon;
  href: string;
  color: 'green' | 'yellow' | 'blue' | 'brown';
}

const quickActions: QuickAction[] = [
  {
    title: 'রোগ শনাক্ত করুন',
    icon: Camera,
    href: '/disease/detect',
    color: 'green',
  },
  {
    title: 'বাজার দর দেখুন',
    icon: TrendingUp,
    href: '/market-price',
    color: 'yellow',
  },
  {
    title: 'পণ্য কিনুন',
    icon: ShoppingCart,
    href: '/marketplace',
    color: 'blue',
  },
  {
    title: 'প্রশ্ন করুন',
    icon: HelpCircle,
    href: '/community',
    color: 'brown',
  },
];

const colorClasses = {
  green: 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200',
  yellow: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200',
  blue: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200',
  brown: 'bg-amber-800/10 text-amber-800 hover:bg-amber-800/20 border-amber-200',
};

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.href} href={action.href}>
            <Card
              className={cn(
                'transition-all hover:scale-105 hover:shadow-lg cursor-pointer border-2',
                colorClasses[action.color]
              )}
            >
              <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[120px] md:min-h-[140px]">
                <Icon className="h-8 w-8 md:h-10 md:w-10" />
                <p className="font-semibold text-sm md:text-base">{action.title}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

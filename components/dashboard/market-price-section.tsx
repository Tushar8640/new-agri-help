'use client';

import Link from 'next/link';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CropPrice {
  name: string;
  price: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

const todayPrices: CropPrice[] = [
  { name: 'ধান', price: '৳৪৫-৫০', unit: 'কেজি', trend: 'up', change: '+৫%' },
  { name: 'পেঁয়াজ', price: '৳৬০-৭০', unit: 'কেজি', trend: 'down', change: '-৩%' },
  { name: 'আলু', price: '৳৩০-৩৫', unit: 'কেজি', trend: 'stable', change: '০%' },
  { name: 'টমেটো', price: '৳৮০-৯০', unit: 'কেজি', trend: 'up', change: '+৮%' },
  { name: 'বেগুন', price: '৳৪০-৪৫', unit: 'কেজি', trend: 'down', change: '-২%' },
];

export function MarketPriceSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold">আজকের বাজার দর</CardTitle>
        <Link href="/market-price">
          <Button variant="ghost" size="sm" className="text-primary">
            সব দেখুন →
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todayPrices.map((crop) => {
            const TrendIcon =
              crop.trend === 'up'
                ? ArrowUp
                : crop.trend === 'down'
                ? ArrowDown
                : Minus;

            const trendColor =
              crop.trend === 'up'
                ? 'text-green-600'
                : crop.trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600';

            return (
              <div
                key={crop.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {crop.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{crop.name}</p>
                    <p className="text-sm text-muted-foreground">প্রতি {crop.unit}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="font-bold text-lg">{crop.price}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{crop.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

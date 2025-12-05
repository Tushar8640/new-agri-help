'use client';

import Link from 'next/link';
import { Tractor, Sprout, TrendingDown, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FarmStat {
  label: string;
  value: string;
  icon: typeof Tractor;
  color: string;
}

const farmStats: FarmStat[] = [
  {
    label: 'মোট জমি',
    value: '০ বিঘা',
    icon: Tractor,
    color: 'text-green-600',
  },
  {
    label: 'সক্রিয় ফসল',
    value: '০টি',
    icon: Sprout,
    color: 'text-emerald-600',
  },
  {
    label: 'মাসিক খরচ',
    value: '৳০',
    icon: TrendingDown,
    color: 'text-red-600',
  },
  {
    label: 'মোট ফলন',
    value: '০ কেজি',
    icon: Package,
    color: 'text-blue-600',
  },
];

export function FarmSummarySection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold">খামারের সারসংক্ষেপ</CardTitle>
        <Link href="/farm">
          <Button variant="ghost" size="sm" className="text-primary">
            বিস্তারিত →
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {farmStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center gap-2"
              >
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            আপনার খামার যোগ করুন এবং ডিজিটালভাবে পরিচালনা করুন
          </p>
          <Link href="/farm">
            <Button className="w-full mt-3" size="sm">
              খামার যোগ করুন
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

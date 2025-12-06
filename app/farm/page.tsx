'use client';

import Link from 'next/link';
import { Tractor, MapPin, Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DEMO_FARMS,
  DEMO_FIELDS,
  DEMO_ACTIVITIES,
  DEMO_EXPENSES,
  DEMO_HARVESTS,
  getCurrentMonthExpenses,
  getTotalHarvestValue,
  ACTIVITY_TYPES,
} from '@/lib/demo-farm';
import { getRelativeTime } from '@/lib/demo-community';

export default function FarmPage() {
  const farm = DEMO_FARMS[0];
  const activeFields = DEMO_FIELDS.filter((f) => f.status === 'active');
  const currentMonthExpenses = getCurrentMonthExpenses(DEMO_EXPENSES);
  const totalHarvest = getTotalHarvestValue(DEMO_HARVESTS);
  const recentActivities = DEMO_ACTIVITIES.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Tractor className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold font-hind">{farm.nameBn}</h1>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{farm.district}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-white text-[#16A34A] hover:bg-white/90 px-4 py-2">
              {farm.size} {farm.unitBn}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-5 text-center">
            <MapPin className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
            <p className="text-3xl font-bold text-[#16A34A]">
              {farm.size}
            </p>
            <p className="text-sm text-gray-600">মোট জমি ({farm.unitBn})</p>
          </Card>

          <Card className="p-5 text-center">
            <Tractor className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">
              {activeFields.length}
            </p>
            <p className="text-sm text-gray-600">সক্রিয় ফসল</p>
          </Card>

          <Card className="p-5 text-center">
            <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-orange-600">
              ৳{currentMonthExpenses.toLocaleString('bn-BD')}
            </p>
            <p className="text-sm text-gray-600">এই মাসের খরচ</p>
          </Card>

          <Card className="p-5 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-600">
              ৳{totalHarvest.toLocaleString('bn-BD')}
            </p>
            <p className="text-sm text-gray-600">মোট ফলন মূল্য</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 font-hind">দ্রুত কাজ</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/farm/fields">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
                <Plus className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
                <p className="font-semibold text-sm font-hind">মাঠ যুক্ত করুন</p>
              </Card>
            </Link>
            <Link href="/farm/expenses">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
                <DollarSign className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
                <p className="font-semibold text-sm font-hind">খরচ লিখুন</p>
              </Card>
            </Link>
            <Link href="/farm/harvests">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
                <TrendingUp className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
                <p className="font-semibold text-sm font-hind">ফসল লিখুন</p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/farm/fields">
            <Card className="p-5 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-2">🌾</div>
              <h3 className="font-bold text-[#16A34A] font-hind">মাঠসমূহ</h3>
              <p className="text-sm text-gray-600 mt-1">{DEMO_FIELDS.length} টি মাঠ</p>
            </Card>
          </Link>
          <Link href="/farm/expenses">
            <Card className="p-5 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold text-[#16A34A] font-hind">খরচ</h3>
              <p className="text-sm text-gray-600 mt-1">{DEMO_EXPENSES.length} টি এন্ট্রি</p>
            </Card>
          </Link>
          <Link href="/farm/harvests">
            <Card className="p-5 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-bold text-[#16A34A] font-hind">ফসল</h3>
              <p className="text-sm text-gray-600 mt-1">{DEMO_HARVESTS.length} টি ফসল</p>
            </Card>
          </Link>
          <Link href="/farm/analytics">
            <Card className="p-5 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-bold text-[#16A34A] font-hind">বিশ্লেষণ</h3>
              <p className="text-sm text-gray-600 mt-1">রিপোর্ট দেখুন</p>
            </Card>
          </Link>
        </div>

        {/* Recent Activities */}
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold font-hind">সাম্প্রতিক কার্যক্রম</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => {
              const activityType = ACTIVITY_TYPES.find((t) => t.id === activity.type);
              return (
                <div key={activity.id} className="p-5 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-[#16A34A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="font-bold font-hind">{activityType?.labelBn}</p>
                          <p className="text-sm text-gray-600">{activity.fieldName}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          ৳{activity.cost}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{activity.notesBn}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

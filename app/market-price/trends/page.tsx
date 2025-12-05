'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DEMO_MARKET_PRICES, DEMO_MARKETS, TIME_RANGES, generatePriceHistory } from '@/lib/demo-market-prices';

export default function MarketPriceTrendsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [selectedCropId, setSelectedCropId] = useState('mp2'); // Potato
  const [selectedMarketId, setSelectedMarketId] = useState('m1');
  const [timeRange, setTimeRange] = useState('7d');

  const selectedPrice = DEMO_MARKET_PRICES.find((p) => p.id === selectedCropId);
  
  // Generate price history
  const priceHistory = useMemo(() => {
    if (!selectedPrice) return [];
    return generatePriceHistory(selectedPrice.cropId, selectedPrice.avgPrice);
  }, [selectedPrice]);

  // Calculate stats
  const stats = useMemo(() => {
    if (priceHistory.length === 0) {
      return { max: 0, min: 0, avg: 0, change: 0 };
    }

    const prices = priceHistory.map((h) => h.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const change = priceHistory.length > 1
      ? ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
      : 0;

    return { max, min, avg, change: Math.round(change * 10) / 10 };
  }, [priceHistory]);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'bn' ? 'ফিরে যান' : 'Back'}
          </Button>
          <h1 className="text-xl font-bold font-heading">
            {language === 'bn' ? 'দর প্রবণতা' : 'Price Trends'}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'bn' ? 'ফসল নির্বাচন করুন' : 'Select Crop'}
            </label>
            <Select value={selectedCropId} onValueChange={setSelectedCropId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEMO_MARKET_PRICES.map((price) => (
                  <SelectItem key={price.id} value={price.id}>
                    {language === 'bn' ? price.cropNameBn : price.cropName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'bn' ? 'বাজার নির্বাচন করুন' : 'Select Market'}
            </label>
            <Select value={selectedMarketId} onValueChange={setSelectedMarketId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEMO_MARKETS.map((market) => (
                  <SelectItem key={market.id} value={market.id}>
                    {language === 'bn' ? market.nameBn : market.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Time Range Tabs */}
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList className="w-full">
            {TIME_RANGES.map((range) => (
              <TabsTrigger key={range.id} value={range.id} className="flex-1">
                {language === 'bn' ? range.labelBn : range.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'bn' ? 'দর পরিবর্তন' : 'Price Change'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date: string) => {
                    const d = new Date(date);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date: string) => new Date(date).toLocaleDateString('bn-BD')}
                  formatter={(value: number) => [`৳${value}`, language === 'bn' ? 'দর' : 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#16A34A"
                  strokeWidth={2}
                  dot={{ fill: '#16A34A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'bn' ? 'সর্বোচ্চ' : 'Maximum'}
              </div>
              <div className="text-2xl font-bold text-primary">৳{stats.max}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'bn' ? 'সর্বনিম্ন' : 'Minimum'}
              </div>
              <div className="text-2xl font-bold text-primary">৳{stats.min}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'bn' ? 'গড়' : 'Average'}
              </div>
              <div className="text-2xl font-bold text-primary">৳{stats.avg}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'bn' ? 'পরিবর্তন%' : 'Change %'}
              </div>
              <div className={`text-2xl font-bold ${stats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.change >= 0 ? '+' : ''}{stats.change}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

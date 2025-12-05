'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Bell, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DEMO_MARKET_PRICES, CROP_CATEGORIES } from '@/lib/demo-market-prices';
import { BD_LOCATIONS } from '@/lib/bd-locations';
import { format } from 'date-fns';

export default function MarketPricePage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedLocation = BD_LOCATIONS.find((l) => l.division === selectedDivision);
  const districts = selectedLocation?.districts || [];

  // Filter prices
  const filteredPrices = useMemo(() => {
    let prices = [...DEMO_MARKET_PRICES];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      prices = prices.filter(
        (p) =>
          p.cropName.toLowerCase().includes(query) ||
          p.cropNameBn.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      prices = prices.filter((p) => p.category === selectedCategory);
    }

    // Location filter
    prices = prices.filter(
      (p) => p.division === selectedDivision && p.district === selectedDistrict
    );

    return prices;
  }, [searchQuery, selectedCategory, selectedDivision, selectedDistrict]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary font-heading">
              {language === 'bn' ? 'বাজার দর' : 'Market Prices'}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </Button>
          </div>

          {/* Location Selectors */}
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedDivision} onValueChange={(value) => {
              setSelectedDivision(value);
              setSelectedDistrict('');
            }}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'বিভাগ' : 'Division'} />
              </SelectTrigger>
              <SelectContent>
                {BD_LOCATIONS.map((location) => (
                  <SelectItem key={location.division} value={location.division}>
                    {language === 'bn' ? location.divisionBn : location.division}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedDivision}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'জেলা' : 'District'} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker and Search */}
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'bn' ? 'ফসল খুঁজুন...' : 'Search crops...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {CROP_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {language === 'bn' ? category.labelBn : category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Price Cards */}
      <div className="max-w-7xl mx-auto p-4">
        {filteredPrices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'bn'
                ? 'কোনো দর পাওয়া যায়নি'
                : 'No prices found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrices.map((price) => (
              <Card key={price.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-3">
                  {/* Crop Name */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {language === 'bn' ? price.cropNameBn : price.cropName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'bn' ? price.marketNameBn : price.marketName}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {language === 'bn' ? price.categoryBn : price.category}
                    </Badge>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ৳{price.minPrice}-৳{price.maxPrice}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{price.unit}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'bn' ? 'গড়:' : 'Avg:'} ৳{price.avgPrice}
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center gap-2">
                    {getTrendIcon(price.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                      {price.changePercent > 0 ? '+' : ''}
                      {price.changePercent}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {language === 'bn' ? 'গতকাল থেকে' : 'from yesterday'}
                    </span>
                  </div>

                  {/* Alert Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    {language === 'bn' ? 'এলার্ট সেট করুন' : 'Set Alert'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

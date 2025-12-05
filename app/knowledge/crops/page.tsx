'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Sprout, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_CROPS, CROP_CATEGORIES, SEASON_FILTERS } from '@/lib/demo-knowledge';

export default function CropsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredCrops = DEMO_CROPS.filter((crop) => {
    const matchesSearch =
      crop.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesSeason =
      selectedSeason === 'all' ||
      crop.seasons.includes(selectedSeason as 'kharif' | 'rabi' | 'year_round');
    return matchesSearch && matchesCategory && matchesSeason;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">ফসল গাইড</h1>
          </div>
          <p className="text-white/90">সকল ফসলের চাষ পদ্ধতি ও পরিচর্যা</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ফসল খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 bg-white border-gray-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">ফসলের ধরন</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CROP_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.labelBn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">মৌসুম</label>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEASON_FILTERS.map((season) => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.labelBn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredCrops.length} টি ফসল পাওয়া গেছে
          </p>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Link key={crop.id} href={`/knowledge/crops/${crop.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#16A34A] text-white">
                      {crop.categoryBn}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-1 font-hind">
                    {crop.nameBn}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">
                    {crop.scientificName}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {crop.seasonsBn.map((season, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-[#16A34A] text-[#16A34A]"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {season}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">চাষের সময়</p>
                      <p className="font-semibold">{crop.growingDays} দিন</p>
                    </div>
                    <div>
                      <p className="text-gray-500">তাপমাত্রা</p>
                      <p className="font-semibold">{crop.temperatureBn}</p>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-[#16A34A] hover:bg-[#15803D]">
                    বিস্তারিত দেখুন
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">কোনো ফসল পাওয়া যায়নি</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSeason('all');
              }}
            >
              ফিল্টার রিসেট করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

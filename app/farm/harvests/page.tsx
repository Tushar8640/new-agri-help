'use client';

import { useState } from 'react';
import { Plus, Package, TrendingUp, Calendar, Scale } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_HARVESTS, getTotalHarvestValue } from '@/lib/demo-farm';

const SEASON_FILTERS = [
  { value: 'all', label: 'সব' },
  { value: 'rabi', label: 'রবি' },
  { value: 'kharif', label: 'খরিফ' },
];

const QUALITY_OPTIONS = [
  { value: 'excellent', label: 'চমৎকার' },
  { value: 'good', label: 'ভালো' },
  { value: 'average', label: 'গড়' },
];

export default function HarvestsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [newHarvest, setNewHarvest] = useState({
    field: '',
    crop: '',
    quantity: '',
    unit: 'kg',
    quality: '',
    soldPrice: '',
    date: '',
  });

  const handleAddHarvest = () => {
    console.log('Adding harvest:', newHarvest);
    setIsAddModalOpen(false);
    setNewHarvest({
      field: '',
      crop: '',
      quantity: '',
      unit: 'kg',
      quality: '',
      soldPrice: '',
      date: '',
    });
  };

  const filteredHarvests = DEMO_HARVESTS.filter((harvest) =>
    seasonFilter === 'all' ? true : harvest.season === seasonFilter
  );

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      case 'average':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">ফসল তোলা</h1>
          </div>
          <p className="text-white/90">আপনার সকল ফসল সংগ্রহের তথ্য</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/80">মোট ফসল মূল্য</p>
            <TrendingUp className="h-5 w-5 text-white/60" />
          </div>
          <p className="text-4xl font-bold">৳{getTotalHarvestValue().toLocaleString('bn-BD')}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
            <Package className="h-4 w-4" />
            <span>{DEMO_HARVESTS.length}টি ফসল সংগ্রহ করা হয়েছে</span>
          </div>
        </Card>

        {/* Season Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {SEASON_FILTERS.map((filter) => (
            <Button
              key={filter.value}
              variant={seasonFilter === filter.value ? 'default' : 'outline'}
              className={
                seasonFilter === filter.value
                  ? 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
              }
              onClick={() => setSeasonFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Harvests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHarvests.map((harvest) => (
            <Card key={harvest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-hind mb-1">{harvest.cropBn}</h3>
                    <p className="text-sm text-gray-600">{harvest.fieldBn}</p>
                  </div>
                  <Badge className={getQualityColor(harvest.quality)}>
                    {harvest.qualityBn}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-[#16A34A]" />
                      <span className="text-sm text-gray-600">পরিমাণ</span>
                    </div>
                    <span className="font-bold">
                      {harvest.quantity} {harvest.unitBn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#16A34A]/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#16A34A]" />
                      <span className="text-sm text-gray-600">বিক্রয় মূল্য</span>
                    </div>
                    <span className="font-bold text-[#16A34A]">
                      ৳{harvest.soldPrice.toLocaleString('bn-BD')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-600">তারিখ</span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(harvest.date), 'PPP', { locale: bn })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="outline" className="text-xs">
                    {harvest.seasonBn}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    প্রতি {harvest.unitBn} ৳
                    {Math.round(harvest.soldPrice / harvest.quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredHarvests.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              {seasonFilter === 'all'
                ? 'কোনো ফসল সংগ্রহের তথ্য নেই'
                : 'এই মৌসুমে কোনো ফসল সংগ্রহ করা হয়নি'}
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg bg-[#16A34A] hover:bg-[#15803D] z-20"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-hind text-xl">ফসল সংগ্রহ লিপিবদ্ধ করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="field" className="mb-2 block">
                মাঠ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="field"
                placeholder="যেমন: উত্তর মাঠ"
                value={newHarvest.field}
                onChange={(e) => setNewHarvest({ ...newHarvest, field: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="crop" className="mb-2 block">
                ফসল <span className="text-red-500">*</span>
              </Label>
              <Input
                id="crop"
                placeholder="যেমন: ধান"
                value={newHarvest.crop}
                onChange={(e) => setNewHarvest({ ...newHarvest, crop: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity" className="mb-2 block">
                  পরিমাণ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="যেমন: ১২০০"
                  value={newHarvest.quantity}
                  onChange={(e) => setNewHarvest({ ...newHarvest, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="unit" className="mb-2 block">
                  একক
                </Label>
                <Select
                  value={newHarvest.unit}
                  onValueChange={(value) => setNewHarvest({ ...newHarvest, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">কেজি</SelectItem>
                    <SelectItem value="mon">মন</SelectItem>
                    <SelectItem value="pieces">পিস</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="quality" className="mb-2 block">
                মান <span className="text-red-500">*</span>
              </Label>
              <Select
                value={newHarvest.quality}
                onValueChange={(value) => setNewHarvest({ ...newHarvest, quality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="মান নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {QUALITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="soldPrice" className="mb-2 block">
                বিক্রয় মূল্য (টাকা) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="soldPrice"
                type="number"
                placeholder="যেমন: ৪৮০০০"
                value={newHarvest.soldPrice}
                onChange={(e) => setNewHarvest({ ...newHarvest, soldPrice: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="harvestDate" className="mb-2 block">
                সংগ্রহের তারিখ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="harvestDate"
                type="date"
                value={newHarvest.date}
                onChange={(e) => setNewHarvest({ ...newHarvest, date: e.target.value })}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                বাতিল
              </Button>
              <Button
                className="bg-[#16A34A] hover:bg-[#15803D]"
                onClick={handleAddHarvest}
                disabled={
                  !newHarvest.field ||
                  !newHarvest.crop ||
                  !newHarvest.quantity ||
                  !newHarvest.quality ||
                  !newHarvest.soldPrice ||
                  !newHarvest.date
                }
              >
                ফসল লিপিবদ্ধ করুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

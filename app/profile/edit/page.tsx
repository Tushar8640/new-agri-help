'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_USER, EXPERIENCE_OPTIONS, CROP_OPTIONS } from '@/lib/demo-profile';
import { BD_LOCATIONS } from '@/lib/bd-locations';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: DEMO_USER.nameBn,
    email: DEMO_USER.email || '',
    division: DEMO_USER.division,
    district: DEMO_USER.district,
    farmSize: DEMO_USER.farmSize?.toString() || '',
    farmUnit: DEMO_USER.farmUnit || 'bigha',
    experience: DEMO_USER.experience?.toString() || '',
    primaryCrops: DEMO_USER.primaryCrops || [],
  });

  const handleSave = () => {
    console.log('Saving profile:', formData);
    router.push('/profile');
  };

  const toggleCrop = (cropValue: string) => {
    setFormData({
      ...formData,
      primaryCrops: formData.primaryCrops.includes(cropValue)
        ? formData.primaryCrops.filter((c) => c !== cropValue)
        : [...formData.primaryCrops, cropValue],
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold font-hind">প্রোফাইল এডিট করুন</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={DEMO_USER.avatar}
                alt={DEMO_USER.nameBn}
                className="w-24 h-24 rounded-full border-4 border-[#16A34A] mb-4"
              />
              <Button variant="outline" className="border-[#16A34A] text-[#16A34A]">
                <Upload className="h-4 w-4 mr-2" />
                ছবি পরিবর্তন করুন
              </Button>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">নাম <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            {/* Phone (readonly) */}
            <div>
              <Label htmlFor="phone">ফোন নম্বর</Label>
              <Input
                id="phone"
                value={DEMO_USER.phone}
                readOnly
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">ফোন নম্বর পরিবর্তন করা যাবে না</p>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="division">বিভাগ <span className="text-red-500">*</span></Label>
                <Select value={formData.division} onValueChange={(value) => setFormData({ ...formData, division: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BD_LOCATIONS.map((div) => (
                      <SelectItem key={div.division} value={div.division}>
                        {div.divisionBn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">জেলা <span className="text-red-500">*</span></Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="জেলা লিখুন"
                />
              </div>
            </div>

            {/* Farm Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmSize">খামারের আকার (ঐচ্ছিক)</Label>
                <Input
                  id="farmSize"
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  placeholder="যেমন: ৫"
                />
              </div>
              <div>
                <Label htmlFor="farmUnit">একক</Label>
                <Select value={formData.farmUnit} onValueChange={(value: any) => setFormData({ ...formData, farmUnit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bigha">বিঘা</SelectItem>
                    <SelectItem value="acre">একর</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">অভিজ্ঞতা (বছর)</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="যেমন: ১৫"
              />
            </div>

            {/* Primary Crops */}
            <div>
              <Label>প্রধান ফসল (সর্বোচ্চ ৫টি নির্বাচন করুন)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {CROP_OPTIONS.map((crop) => (
                  <Button
                    key={crop.value}
                    variant={formData.primaryCrops.includes(crop.value) ? 'default' : 'outline'}
                    className={
                      formData.primaryCrops.includes(crop.value)
                        ? 'bg-[#16A34A] hover:bg-[#15803D]'
                        : 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
                    }
                    onClick={() => toggleCrop(crop.value)}
                    disabled={!formData.primaryCrops.includes(crop.value) && formData.primaryCrops.length >= 5}
                  >
                    {crop.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                বাতিল
              </Button>
              <Button
                className="flex-1 bg-[#16A34A] hover:bg-[#15803D]"
                onClick={handleSave}
              >
                সংরক্ষণ করুন
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

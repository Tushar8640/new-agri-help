'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Store, Upload, CreditCard } from 'lucide-react';
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

const BUSINESS_TYPES = [
  { value: 'seeds', label: 'বীজ ব্যবসায়ী' },
  { value: 'fertilizer', label: 'সার ব্যবসায়ী' },
  { value: 'pesticide', label: 'কীটনাশক ব্যবসায়ী' },
  { value: 'equipment', label: 'যন্ত্রপাতি ব্যবসায়ী' },
  { value: 'general', label: 'সাধারণ কৃষি পণ্য' },
];

export default function BecomeSellerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    bkashNumber: '',
    tradeLicense: null,
    nidCard: null,
  });

  const handleSubmit = () => {
    console.log('Seller application:', formData);
    // Show success message and redirect
    router.push('/profile');
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
            <h1 className="text-2xl font-bold font-hind">বিক্রেতা হন</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Info Card */}
        <Card className="p-6 mb-6 bg-linear-to-r from-[#16A34A]/10 to-[#92400E]/10 border-[#16A34A]">
          <div className="flex items-start gap-4">
            <div className="bg-[#16A34A] rounded-full p-3">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-hind mb-2">কৃষিমিত্রায় বিক্রেতা হিসেবে যোগ দিন</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ লক্ষাধিক কৃষকের কাছে পৌঁছান</li>
                <li>✓ অনলাইনে আপনার পণ্য বিক্রি করুন</li>
                <li>✓ সহজ পেমেন্ট ব্যবস্থা</li>
                <li>✓ বিনামূল্যে রেজিস্ট্রেশন</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Application Form */}
        <Card className="p-6">
          <h3 className="text-lg font-bold font-hind mb-6">আবেদন ফর্ম</h3>
          <div className="space-y-6">
            {/* Business Name */}
            <div>
              <Label htmlFor="businessName">
                ব্যবসার নাম <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="যেমন: রহিম সিডস হাউস"
              />
            </div>

            {/* Business Type */}
            <div>
              <Label htmlFor="businessType">
                ব্যবসার ধরন <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">
                ব্যবসার বিবরণ <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="আপনার ব্যবসা সম্পর্কে কিছু লিখুন..."
                rows={4}
              />
            </div>

            {/* bKash Number */}
            <div>
              <Label htmlFor="bkashNumber">
                bKash নম্বর <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <Input
                  id="bkashNumber"
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">পেমেন্ট গ্রহণের জন্য</p>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h4 className="font-semibold">ডকুমেন্টস (ঐচ্ছিক)</h4>
              
              <div>
                <Label htmlFor="tradeLicense">ট্রেড লাইসেন্স</Label>
                <div className="mt-2">
                  <Button variant="outline" className="w-full border-[#16A34A] text-[#16A34A]">
                    <Upload className="h-4 w-4 mr-2" />
                    ট্রেড লাইসেন্স আপলোড করুন
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="nidCard">জাতীয় পরিচয়পত্র</Label>
                <div className="mt-2">
                  <Button variant="outline" className="w-full border-[#16A34A] text-[#16A34A]">
                    <Upload className="h-4 w-4 mr-2" />
                    এনআইডি কার্ড আপলোড করুন
                  </Button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                আবেদন জমা দেওয়ার মাধ্যমে আপনি কৃষিমিত্রার{' '}
                <a href="#" className="text-[#16A34A] font-semibold">বিক্রেতা শর্তাবলী</a> ও{' '}
                <a href="#" className="text-[#16A34A] font-semibold">গোপনীয়তা নীতি</a> মেনে নিচ্ছেন।
              </p>
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
                onClick={handleSubmit}
                disabled={!formData.businessName || !formData.businessType || !formData.description || !formData.bkashNumber}
              >
                আবেদন জমা দিন
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

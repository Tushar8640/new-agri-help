'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QUESTION_CATEGORIES } from '@/lib/demo-community';

export default function NewQuestionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    crop: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting question:', formData);
    // In real app, this would call API
    router.push('/community/questions');
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.category;

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/community/questions">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              ফিরে যান
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-[#16A34A]" />
            <h1 className="text-xl font-bold font-hind">নতুন প্রশ্ন করুন</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base mb-2 block">
                প্রশ্নের শিরোনাম <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="যেমন: টমেটো গাছের পাতা হলুদ হয়ে যাচ্ছে"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-base"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                সংক্ষেপে এবং স্পষ্টভাবে আপনার প্রশ্ন লিখুন
              </p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base mb-2 block">
                বিস্তারিত বর্ণনা <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="আপনার সমস্যা বিস্তারিত বর্ণনা করুন। যেমন: কখন থেকে সমস্যা শুরু হয়েছে, কী কী লক্ষণ দেখছেন ইত্যাদি।"
                rows={8}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                বিস্তারিত তথ্য দিলে সঠিক উত্তর পেতে সুবিধা হবে
              </p>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-base mb-2 block">
                বিভাগ <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.labelBn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Crop */}
            <div>
              <Label htmlFor="crop" className="text-base mb-2 block">
                ফসল (ঐচ্ছিক)
              </Label>
              <Input
                id="crop"
                type="text"
                placeholder="যেমন: ধান, টমেটো, আলু"
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">
                কোন ফসল সম্পর্কে প্রশ্ন করছেন তা উল্লেখ করুন
              </p>
            </div>

            {/* Image Upload Placeholder */}
            <div>
              <Label className="text-base mb-2 block">ছবি সংযুক্ত করুন (ঐচ্ছিক)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#16A34A] transition-colors cursor-pointer">
                <p className="text-gray-500">ছবি আপলোড করতে ক্লিক করুন</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG (সর্বোচ্চ 5MB)</p>
              </div>
            </div>

            {/* Guidelines */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-bold mb-2 text-blue-900 font-hind">
                ভালো প্রশ্ন করার টিপস:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• স্পষ্ট এবং সংক্ষিপ্ত শিরোনাম দিন</li>
                <li>• সমস্যা বিস্তারিত বর্ণনা করুন</li>
                <li>• প্রয়োজনে ছবি যোগ করুন</li>
                <li>• সঠিক বিভাগ নির্বাচন করুন</li>
              </ul>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#16A34A] hover:bg-[#15803D]"
                disabled={!isFormValid}
              >
                প্রশ্ন পোস্ট করুন
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

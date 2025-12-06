'use client';

import Link from 'next/link';
import { User, MapPin, Calendar, Edit, Package, Bookmark, MessageSquare, FileText, Tractor, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_USER, PROFILE_STATS } from '@/lib/demo-profile';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function ProfilePage() {
  const user = DEMO_USER;
  const stats = PROFILE_STATS;

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold font-hind">প্রোফাইল</h1>
            <Link href="/profile/settings">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.nameBn}
                  className="w-24 h-24 rounded-full border-4 border-[#16A34A]"
                />
                {user.verified && (
                  <div className="absolute bottom-0 right-0 bg-[#16A34A] rounded-full p-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <Link href="/profile/edit" className="mt-3">
                <Button variant="outline" size="sm" className="border-[#16A34A] text-[#16A34A]">
                  <Edit className="h-4 w-4 mr-2" />
                  প্রোফাইল এডিট করুন
                </Button>
              </Link>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold font-hind">{user.nameBn}</h2>
                <Badge className="bg-[#16A34A] hover:bg-[#15803D]">
                  {user.roleBn}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{user.locationBn}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    সদস্য হয়েছেন{' '}
                    {format(new Date(user.memberSince), 'PPP', { locale: bn })}
                  </span>
                </div>
                {user.farmSize && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tractor className="h-4 w-4" />
                    <span>
                      খামারের আকার: {user.farmSize} {user.farmUnitBn}
                    </span>
                  </div>
                )}
                {user.experience && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>{user.experience} বছরের অভিজ্ঞতা</span>
                  </div>
                )}
              </div>

              {user.primaryCropsBn && user.primaryCropsBn.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">প্রধান ফসল:</p>
                  <div className="flex flex-wrap gap-2">
                    {user.primaryCropsBn.map((crop, index) => (
                      <Badge key={index} variant="outline" className="border-[#16A34A] text-[#16A34A]">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <Package className="h-8 w-8 text-[#16A34A] mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.orders}</p>
            <p className="text-sm text-gray-600">অর্ডার</p>
          </Card>
          <Card className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.questions}</p>
            <p className="text-sm text-gray-600">প্রশ্ন</p>
          </Card>
          <Card className="p-4 text-center">
            <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.posts}</p>
            <p className="text-sm text-gray-600">পোস্ট</p>
          </Card>
          <Card className="p-4 text-center">
            <Tractor className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.farms}</p>
            <p className="text-sm text-gray-600">খামার</p>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold font-hind">দ্রুত লিঙ্ক</h3>
          </div>
          <div className="divide-y divide-gray-100">
            <Link href="/marketplace/orders">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-[#16A34A]" />
                  <span className="font-semibold">আমার অর্ডার</span>
                </div>
                <Badge variant="outline">{stats.orders}</Badge>
              </div>
            </Link>
            <Link href="/marketplace?saved=true">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bookmark className="h-5 w-5 text-[#16A34A]" />
                  <span className="font-semibold">সংরক্ষিত পণ্য</span>
                </div>
                <Badge variant="outline">{stats.savedProducts}</Badge>
              </div>
            </Link>
            <Link href="/community/questions">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-[#16A34A]" />
                  <span className="font-semibold">আমার প্রশ্ন</span>
                </div>
                <Badge variant="outline">{stats.questions}</Badge>
              </div>
            </Link>
            <Link href="/community">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#16A34A]" />
                  <span className="font-semibold">আমার পোস্ট</span>
                </div>
                <Badge variant="outline">{stats.posts}</Badge>
              </div>
            </Link>
          </div>
        </Card>

        {/* Become Seller CTA */}
        {user.role === 'farmer' && (
          <Card className="p-6 bg-linear-to-r from-[#16A34A]/10 to-[#92400E]/10 border-[#16A34A]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-hind mb-2">বিক্রেতা হন</h3>
                <p className="text-gray-600">
                  কৃষিমিত্রায় আপনার পণ্য বিক্রি করুন এবং আয় করুন
                </p>
              </div>
              <Link href="/profile/become-seller">
                <Button className="bg-[#16A34A] hover:bg-[#15803D] whitespace-nowrap">
                  এখনই শুরু করুন
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}


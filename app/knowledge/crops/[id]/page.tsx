'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Thermometer, Droplets, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEMO_CROPS } from '@/lib/demo-knowledge';
import { DEMO_MARKET_PRICES } from '@/lib/demo-market-prices';

export default function CropDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const crop = DEMO_CROPS.find((c) => c.id === id);

  if (!crop) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">ফসল পাওয়া যায়নি</h1>
          <Link href="/knowledge/crops">
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }



  // Find related price data
  const priceData = DEMO_MARKET_PRICES.find(
    (p) => p.cropNameBn.toLowerCase().includes(crop.nameBn.split(' ')[0].toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/knowledge/crops">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              ফসল গাইড
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Image Gallery */}
        <div className="mb-6">
          <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-[#16A34A] text-white text-lg px-3 py-1">
                {crop.categoryBn}
              </Badge>
            </div>
          </div>
        </div>

        {/* Crop Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-hind">
            {crop.nameBn}
          </h1>
          <p className="text-gray-600 italic mb-4">{crop.scientificName}</p>
          <div className="flex flex-wrap gap-2">
            {crop.seasonsBn.map((season, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-[#16A34A] text-[#16A34A]"
              >
                <Calendar className="h-4 w-4 mr-1" />
                {season}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-2 text-[#16A34A] mb-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-600">চাষের সময়</p>
                <p className="font-bold text-lg">{crop.growingDays} দিন</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 text-[#16A34A] mb-2">
                  <Thermometer className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-600">তাপমাত্রা</p>
                <p className="font-bold text-lg">{crop.temperatureBn}</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 text-[#16A34A] mb-2">
                  <Package className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-600">মাটি</p>
                <p className="font-bold text-sm">{crop.soilBn.split(',')[0]}</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 text-[#16A34A] mb-2">
                  <Droplets className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-600">পানি</p>
                <p className="font-bold text-sm">{crop.waterBn.split(',')[0]}</p>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="cultivation" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cultivation">চাষ পদ্ধতি</TabsTrigger>
                <TabsTrigger value="care">যত্ন</TabsTrigger>
                <TabsTrigger value="harvest">ফসল তোলা</TabsTrigger>
                <TabsTrigger value="disease">রোগ ও পোকা</TabsTrigger>
              </TabsList>

              <TabsContent value="cultivation">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 font-hind">চাষ পদ্ধতি</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#16A34A] mb-1">মাটি:</p>
                      <p className="text-gray-700">{crop.soilBn}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#16A34A] mb-1">পানি:</p>
                      <p className="text-gray-700">{crop.waterBn}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#16A34A] mb-1">পদ্ধতি:</p>
                      <p className="text-gray-700 whitespace-pre-line">
                        {crop.cultivationBn}
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="care">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 font-hind">পরিচর্যা</h3>
                  <p className="text-gray-700 whitespace-pre-line">{crop.careBn}</p>
                </Card>
              </TabsContent>

              <TabsContent value="harvest">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 font-hind">ফসল তোলা</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {crop.harvestingBn}
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="disease">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 font-hind">
                    রোগ ও পোকা নিয়ন্ত্রণ
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {crop.diseasesBn}
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Market Price */}
            {priceData && (
              <Card className="p-5">
                <h3 className="font-bold text-lg mb-4 font-hind">বর্তমান বাজার দাম</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">গড় দাম</p>
                    <p className="text-2xl font-bold text-[#16A34A]">
                      ৳{priceData.avgPrice}
                      <span className="text-sm font-normal text-gray-600">
                        /{priceData.unit}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-600">সর্বনিম্ন</p>
                      <p className="font-semibold">৳{priceData.minPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">সর্বোচ্চ</p>
                      <p className="font-semibold">৳{priceData.maxPrice}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    {priceData.trend === 'up' && (
                      <>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          +{priceData.changePercent}% বৃদ্ধি
                        </span>
                      </>
                    )}
                    {priceData.trend === 'down' && (
                      <>
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <span className="text-sm font-medium text-red-600">
                          {priceData.changePercent}% হ্রাস
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 pt-2">
                    {priceData.marketNameBn}, {priceData.district}
                  </p>
                </div>

                <Link href="/market-price">
                  <Button className="w-full mt-4 bg-[#16A34A] hover:bg-[#15803D]">
                    আরও দাম দেখুন
                  </Button>
                </Link>
              </Card>
            )}

            {/* Buy Seeds/Inputs */}
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-4 font-hind">
                বীজ ও উপকরণ কিনুন
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {crop.nameBn} চাষের জন্য প্রয়োজনীয় বীজ ও উপকরণ কিনুন
              </p>
              <Link href="/marketplace">
                <Button className="w-full bg-[#92400E] hover:bg-[#7c3408]">
                  মার্কেটপ্লেস দেখুন
                </Button>
              </Link>
            </Card>

            {/* Related Crops */}
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-4 font-hind">সম্পর্কিত ফসল</h3>
              <div className="space-y-3">
                {DEMO_CROPS.filter(
                  (c) => c.category === crop.category && c.id !== crop.id
                )
                  .slice(0, 3)
                  .map((relatedCrop) => (
                    <Link
                      key={relatedCrop.id}
                      href={`/knowledge/crops/${relatedCrop.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {relatedCrop.nameBn}
                        </p>
                        <p className="text-xs text-gray-500">
                          {relatedCrop.growingDays} দিন
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

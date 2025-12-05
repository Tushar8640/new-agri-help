'use client';

import { useState } from 'react';
import { Play, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_VIDEOS } from '@/lib/demo-knowledge';

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredVideos = DEMO_VIDEOS.filter(
    (video) =>
      video.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Play className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">ভিডিও টিউটোরিয়াল</h1>
          </div>
          <p className="text-white/90">শিক্ষামূলক কৃষি ভিডিও</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ভিডিও খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 bg-white border-gray-200"
            />
          </div>
        </div>

        {/* Featured Video Player */}
        {selectedVideo && (
          <div className="mb-8">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredVideos.length} টি ভিডিও পাওয়া গেছে
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video.youtubeId)}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.titleBn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-[#16A34A] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <Badge className="mb-2 bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20 text-xs">
                  {video.categoryBn}
                </Badge>
                <h3 className="font-bold text-lg mb-2 font-hind line-clamp-2">
                  {video.titleBn}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {video.descriptionBn}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{video.viewCount.toLocaleString('bn-BD')} বার দেখা হয়েছে</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">কোনো ভিডিও পাওয়া যায়নি</p>
          </div>
        )}

        {/* Educational Note */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-[#16A34A]/5 to-[#92400E]/5 border-[#16A34A]">
          <h3 className="font-bold text-lg mb-2 font-hind text-[#16A34A]">
            📚 শিখুন এবং এগিয়ে যান
          </h3>
          <p className="text-gray-700">
            প্রতিটি ভিডিও অভিজ্ঞ কৃষি বিশেষজ্ঞদের দ্বারা তৈরি। সঠিক পদ্ধতি শিখে
            আপনার ফসলের ফলন বৃদ্ধি করুন।
          </p>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_ARTICLES, ARTICLE_CATEGORIES } from '@/lib/demo-knowledge';

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredArticles = DEMO_ARTICLES.slice(0, 3);
  const filteredArticles = DEMO_ARTICLES.filter((article) => {
    const matchesSearch = article.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">জ্ঞান ভাণ্ডার</h1>
          </div>
          <p className="text-white/90">কৃষি বিষয়ক সকল তথ্য এক জায়গায়</p>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-8">
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/knowledge/articles/${article.slug}`}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="mb-2 bg-[#EAB308] text-[#92400E]">
                      {article.categoryBn}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2 font-hind">{article.titleBn}</h3>
                    <p className="text-white/90 mb-3">{article.excerptBn}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime} মিনিট পড়া
                      </span>
                      <span>{article.authorBn}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-[#16A34A]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-[#16A34A]" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="নিবন্ধ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {ARTICLE_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={`shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category.labelBn}
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/knowledge/crops">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
              <div className="text-4xl mb-2">🌾</div>
              <h3 className="font-bold text-[#16A34A] font-hind">ফসল গাইড</h3>
              <p className="text-sm text-gray-600 mt-1">সকল ফসলের তথ্য</p>
            </Card>
          </Link>
          <Link href="/knowledge/videos">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
              <div className="text-4xl mb-2">📹</div>
              <h3 className="font-bold text-[#16A34A] font-hind">ভিডিও টিউটোরিয়াল</h3>
              <p className="text-sm text-gray-600 mt-1">শিক্ষামূলক ভিডিও</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 font-hind">সকল নিবন্ধ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/knowledge/articles/${article.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-3 right-3">
                    <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                      <Bookmark className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <Badge className="mb-2 bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20">
                    {article.categoryBn}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 font-hind line-clamp-2">
                    {article.titleBn}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerptBn}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime} মিনিট</span>
                    </div>
                    <span>{article.authorBn}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">কোনো নিবন্ধ পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
}

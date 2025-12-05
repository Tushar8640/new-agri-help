'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Bookmark, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_ARTICLES } from '@/lib/demo-knowledge';

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = DEMO_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">নিবন্ধ পাওয়া যায়নি</h1>
          <Link href="/knowledge">
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = DEMO_ARTICLES
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/knowledge">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              জ্ঞান ভাণ্ডার
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      <div className="h-64 md:h-96 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <Card className="p-6 md:p-8 mb-8">
          {/* Category Badge */}
          <Badge className="mb-4 bg-[#16A34A] text-white">
            {article.categoryBn}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-hind">
            {article.titleBn}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.authorBn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} মিনিট পড়া</span>
            </div>
            <div className="text-gray-500">
              {article.viewCount.toLocaleString('bn-BD')} বার দেখা হয়েছে
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="h-4 w-4" />
              সংরক্ষণ করুন
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              শেয়ার করুন
            </Button>
          </div>

          {/* Excerpt */}
          <div className="bg-[#16A34A]/5 border-l-4 border-[#16A34A] p-4 mb-8">
            <p className="text-lg text-gray-700">{article.excerptBn}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
              {article.contentBn}
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-hind">সম্পর্কিত নিবন্ধ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/knowledge/articles/${related.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-32 bg-gray-200" />
                    <div className="p-4">
                      <Badge className="mb-2 bg-[#16A34A]/10 text-[#16A34A] text-xs">
                        {related.categoryBn}
                      </Badge>
                      <h3 className="font-bold mb-2 font-hind line-clamp-2">
                        {related.titleBn}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{related.readTime} মিনিট</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

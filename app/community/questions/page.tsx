'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, HelpCircle, Eye, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { DEMO_QUESTIONS, QUESTION_FILTERS, getRelativeTime } from '@/lib/demo-community';

export default function QuestionsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredQuestions = DEMO_QUESTIONS.filter((question) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'solved') return question.isSolved;
    if (selectedFilter === 'unsolved') return !question.isSolved;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">প্রশ্ন-উত্তর</h1>
          </div>
          <p className="text-white/90">আপনার প্রশ্ন করুন এবং সমাধান পান</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {QUESTION_FILTERS.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(filter.id)}
              className={`shrink-0 ${
                selectedFilter === filter.id
                  ? 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {filter.labelBn}
            </Button>
          ))}
        </div>

        {/* Stats Card */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-[#16A34A]/10 to-[#92400E]/10 border-[#16A34A]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#16A34A]">{DEMO_QUESTIONS.length}</p>
              <p className="text-sm text-gray-600">মোট প্রশ্ন</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {DEMO_QUESTIONS.filter((q) => q.isSolved).length}
              </p>
              <p className="text-sm text-gray-600">সমাধান হয়েছে</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {DEMO_QUESTIONS.filter((q) => !q.isSolved).length}
              </p>
              <p className="text-sm text-gray-600">অমীমাংসিত</p>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Link key={question.id} href={`/community/questions/${question.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-10 h-10 bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                      {question.user.nameBn.charAt(0)}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-hind">
                          {question.user.nameBn}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {question.user.roleBn}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {getRelativeTime(question.createdAt)}
                      </p>
                    </div>
                    {question.isSolved && (
                      <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                    )}
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg font-bold mb-2 font-hind">
                    {question.titleBn}
                  </h3>

                  {/* Question Description Preview */}
                  <p className="text-gray-700 mb-3 line-clamp-2">
                    {question.descriptionBn}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-[#16A34A]/10 text-[#16A34A] text-xs">
                      {question.categoryBn}
                    </Badge>
                    {question.cropBn && (
                      <Badge
                        variant="outline"
                        className="border-[#92400E] text-[#92400E] text-xs"
                      >
                        {question.cropBn}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{question.answers} উত্তর</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views} বার দেখা হয়েছে</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">কোনো প্রশ্ন পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* Floating Ask Question Button */}
      <Link href="/community/questions/new">
        <Button
          className="fixed bottom-20 right-6 h-14 px-6 rounded-full shadow-lg bg-[#16A34A] hover:bg-[#15803D] z-20 gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="font-hind">প্রশ্ন করুন</span>
        </Button>
      </Link>
    </div>
  );
}

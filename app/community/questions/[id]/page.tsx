'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, CheckCircle2, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { DEMO_QUESTIONS, DEMO_ANSWERS, getRelativeTime } from '@/lib/demo-community';

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const question = DEMO_QUESTIONS.find((q) => q.id === id);
  const [newAnswer, setNewAnswer] = useState('');
  const answers = DEMO_ANSWERS[id] || [];

  if (!question) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">প্রশ্ন পাওয়া যায়নি</h1>
          <Link href="/community/questions">
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePostAnswer = () => {
    console.log('Posting answer:', newAnswer);
    setNewAnswer('');
  };

  const handleVote = (answerId: string, type: 'up' | 'down') => {
    console.log(`${type}voting answer:`, answerId);
  };

  const handleAcceptAnswer = (answerId: string) => {
    console.log('Accepting answer:', answerId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/community/questions">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              প্রশ্ন-উত্তর
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Question Card */}
        <Card className="mb-6">
          {/* Question Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="w-12 h-12 bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                {question.user.nameBn.charAt(0)}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold font-hind">{question.user.nameBn}</span>
                  <Badge variant="outline" className="text-xs">
                    {question.user.roleBn}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{question.user.locationBn}</span>
                  <span>•</span>
                  <span>{getRelativeTime(question.createdAt)}</span>
                </div>
              </div>
              {question.isSolved && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  সমাধান হয়েছে
                </Badge>
              )}
            </div>

            {/* Question Title */}
            <h1 className="text-2xl font-bold mb-3 font-hind">
              {question.titleBn}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#16A34A]/10 text-[#16A34A]">
                {question.categoryBn}
              </Badge>
              {question.cropBn && (
                <Badge
                  variant="outline"
                  className="border-[#92400E] text-[#92400E]"
                >
                  {question.cropBn}
                </Badge>
              )}
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6 border-b border-gray-100">
            <p className="text-gray-800 text-lg whitespace-pre-line mb-4">
              {question.descriptionBn}
            </p>

            {question.images && question.images.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {question.images.map((_, index) => (
                  <div key={index} className="h-64 bg-gray-200 rounded-lg" />
                ))}
              </div>
            )}
          </div>

          {/* Question Stats */}
          <div className="p-6 flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{question.views} বার দেখা হয়েছে</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>{answers.length} টি উত্তর</span>
            </div>
          </div>
        </Card>

        {/* Answers Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 font-hind">
            উত্তরসমূহ ({answers.length})
          </h2>

          <div className="space-y-4">
            {answers.map((answer) => (
              <Card
                key={answer.id}
                className={`${
                  answer.isAccepted ? 'border-2 border-green-500' : ''
                }`}
              >
                {answer.isAccepted && (
                  <div className="bg-green-50 border-b border-green-200 px-6 py-2">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-bold font-hind">সঠিক উত্তর</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Answer Header */}
                  <div className="flex gap-4">
                    {/* Voting */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleVote(answer.id, 'up')}
                        className={`p-2 rounded-lg transition-colors ${
                          answer.isUpvoted
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                      <span className="font-bold text-lg">
                        {answer.upvotes - answer.downvotes}
                      </span>
                      <button
                        onClick={() => handleVote(answer.id, 'down')}
                        className={`p-2 rounded-lg transition-colors ${
                          answer.isDownvoted
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsDown className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-10 h-10 bg-[#92400E] text-white flex items-center justify-center shrink-0">
                          {answer.user.nameBn.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold font-hind">
                              {answer.user.nameBn}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {answer.user.roleBn}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {getRelativeTime(answer.createdAt)}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-800 whitespace-pre-line mb-4">
                        {answer.contentBn}
                      </p>

                      {/* Accept Answer Button (only for question author) */}
                      {!answer.isAccepted && !question.isSolved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAcceptAnswer(answer.id)}
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          সঠিক উত্তর হিসেবে চিহ্নিত করুন
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {answers.length === 0 && (
            <Card className="p-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-1">এখনও কোনো উত্তর নেই</p>
              <p className="text-sm text-gray-400">প্রথম উত্তর দিন</p>
            </Card>
          )}
        </div>

        {/* Answer Input */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 font-hind">আপনার উত্তর</h3>
          <Textarea
            placeholder="উত্তর লিখুন... বিস্তারিত এবং সহায়ক উত্তর দিন।"
            rows={6}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button
              className="bg-[#16A34A] hover:bg-[#15803D]"
              onClick={handlePostAnswer}
              disabled={!newAnswer.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              উত্তর পোস্ট করুন
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

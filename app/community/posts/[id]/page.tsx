'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { DEMO_POSTS, DEMO_COMMENTS, getRelativeTime } from '@/lib/demo-community';

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = DEMO_POSTS.find((p) => p.id === id);
  const [newComment, setNewComment] = useState('');
  const comments = DEMO_COMMENTS[id] || [];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">পোস্ট পাওয়া যায়নি</h1>
          <Link href="/community">
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePostComment = () => {
    console.log('Posting comment:', newComment);
    setNewComment('');
  };

  const handleLike = () => {
    console.log('Liked post');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/community">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              সম্প্রদায়
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Post Card */}
        <Card className="mb-6">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="w-14 h-14 bg-[#16A34A] text-white flex items-center justify-center text-lg shrink-0">
                {post.user.nameBn.charAt(0)}
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg font-hind">{post.user.nameBn}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {post.user.roleBn}
                  </Badge>
                  <span>•</span>
                  <span>{post.user.locationBn}</span>
                  <span>•</span>
                  <span>{getRelativeTime(post.createdAt)}</span>
                </div>
              </div>
            </div>

            <Badge className="bg-[#16A34A]/10 text-[#16A34A]">
              {post.typeBn}
            </Badge>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <p className="text-gray-800 text-lg whitespace-pre-line mb-4">
              {post.contentBn}
            </p>

            {post.cropTagsBn && post.cropTagsBn.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.cropTagsBn.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#92400E] text-[#92400E]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {post.images.map((_, index) => (
                  <div key={index} className="h-96 bg-gray-200 rounded-lg" />
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                post.isLiked
                  ? 'text-red-600 hover:text-red-700'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart
                className={`h-6 w-6 ${post.isLiked ? 'fill-current' : ''}`}
              />
              <span className="font-semibold">{post.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageCircle className="h-6 w-6" />
              <span className="font-semibold">{comments.length}</span>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#16A34A] transition-colors">
              <Share2 className="h-6 w-6" />
              <span className="font-semibold">{post.shares}</span>
            </button>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold font-hind">
              মন্তব্য ({comments.length})
            </h2>
          </div>

          {/* Comment Input */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                আ
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="আপনার মন্তব্য লিখুন..."
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                />
                <Button
                  className="bg-[#16A34A] hover:bg-[#15803D]"
                  onClick={handlePostComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  মন্তব্য করুন
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-gray-100">
            {comments.map((comment) => (
              <div key={comment.id} className="p-6">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 bg-[#92400E] text-white flex items-center justify-center shrink-0">
                    {comment.user.nameBn.charAt(0)}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold font-hind">
                          {comment.user.nameBn}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {comment.user.roleBn}
                        </Badge>
                      </div>
                      <p className="text-gray-800">{comment.contentBn}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{getRelativeTime(comment.createdAt)}</span>
                      <button className="hover:text-[#16A34A]">পছন্দ</button>
                      <button className="hover:text-[#16A34A]">উত্তর</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>এখনও কোনো মন্তব্য নেই</p>
              <p className="text-sm mt-1">প্রথম মন্তব্য করুন</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

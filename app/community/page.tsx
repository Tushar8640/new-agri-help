'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Heart, MessageCircle, Share2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_POSTS, POST_TYPES, getRelativeTime } from '@/lib/demo-community';

export default function CommunityPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', type: 'general', cropTags: '' });

  const filteredPosts = DEMO_POSTS.filter(
    (post) => selectedType === 'all' || post.type === selectedType
  );

  const handleCreatePost = () => {
    // In real app, this would call API
    console.log('Creating post:', newPost);
    setIsCreateModalOpen(false);
    setNewPost({ content: '', type: 'general', cropTags: '' });
  };

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">কৃষক সম্প্রদায়</h1>
          </div>
          <p className="text-white/90">কৃষকদের সাথে যোগাযোগ করুন ও অভিজ্ঞতা শেয়ার করুন</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Type Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {POST_TYPES.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              onClick={() => setSelectedType(type.id)}
              className={`shrink-0 ${
                selectedType === type.id
                  ? 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type.labelBn}
            </Button>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/community/questions">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#16A34A]">
              <div className="text-3xl mb-2">❓</div>
              <h3 className="font-bold text-[#16A34A] font-hind">প্রশ্ন-উত্তর</h3>
              <p className="text-sm text-gray-600 mt-1">সমাধান খুঁজুন</p>
            </Card>
          </Link>
          <Card className="p-4 text-center bg-gradient-to-br from-[#16A34A]/10 to-[#92400E]/10 border-[#16A34A]">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-bold text-[#16A34A] font-hind">সক্রিয় সদস্য</h3>
            <p className="text-sm text-gray-600 mt-1">৫,২৫০+ কৃষক</p>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                    {post.user.nameBn.charAt(0)}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold font-hind">{post.user.nameBn}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">
                            {post.user.roleBn}
                          </Badge>
                          <span>•</span>
                          <span>{post.user.locationBn}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 shrink-0">
                        {getRelativeTime(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <Link href={`/community/posts/${post.id}`}>
                <div className="p-4">
                  <Badge className="mb-3 bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20">
                    {post.typeBn}
                  </Badge>
                  <p className="text-gray-800 whitespace-pre-line mb-3">
                    {post.contentBn}
                  </p>
                  {post.cropTagsBn && post.cropTagsBn.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.cropTagsBn.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-[#92400E] text-[#92400E]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {post.images && post.images.length > 0 && (
                    <div className="h-64 bg-gray-200 rounded-lg" />
                  )}
                </div>
              </Link>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    post.isLiked
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`}
                  />
                  <span>{post.likes}</span>
                </button>
                <Link
                  href={`/community/posts/${post.id}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16A34A] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </Link>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16A34A] transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">কোনো পোস্ট পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* Floating Create Post Button */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg bg-[#16A34A] hover:bg-[#15803D] z-20"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-hind text-xl">পোস্ট করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="type" className="mb-2 block">
                পোস্টের ধরন
              </Label>
              <Select
                value={newPost.type}
                onValueChange={(value) => setNewPost({ ...newPost, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_TYPES.filter((t) => t.id !== 'all').map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.labelBn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content" className="mb-2 block">
                আপনার পোস্ট লিখুন
              </Label>
              <Textarea
                id="content"
                placeholder="আপনার অভিজ্ঞতা, টিপস বা তথ্য শেয়ার করুন..."
                rows={6}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="tags" className="mb-2 block">
                ফসলের ট্যাগ (কমা দিয়ে আলাদা করুন)
              </Label>
              <input
                id="tags"
                type="text"
                placeholder="যেমন: ধান, টমেটো"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newPost.cropTags}
                onChange={(e) => setNewPost({ ...newPost, cropTags: e.target.value })}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                বাতিল
              </Button>
              <Button
                className="bg-[#16A34A] hover:bg-[#15803D]"
                onClick={handleCreatePost}
                disabled={!newPost.content.trim()}
              >
                পোস্ট করুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

const recentPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'করিম মিয়া',
      avatar: '',
    },
    title: 'জৈব সার তৈরির সহজ উপায়',
    excerpt: 'বাড়িতে সহজেই জৈব সার তৈরি করতে পারবেন...',
    likes: 45,
    comments: 12,
    timeAgo: '২ ঘন্টা আগে',
  },
  {
    id: '2',
    author: {
      name: 'রহিমা বেগম',
      avatar: '',
    },
    title: 'আধুনিক পদ্ধতিতে ধান চাষ',
    excerpt: 'আমার অভিজ্ঞতা থেকে কিছু টিপস শেয়ার করছি...',
    likes: 38,
    comments: 8,
    timeAgo: '৫ ঘন্টা আগে',
  },
  {
    id: '3',
    author: {
      name: 'সালাম হোসেন',
      avatar: '',
    },
    title: 'সবজি চাষে লাভবান হওয়ার উপায়',
    excerpt: 'ছোট পরিসরে সবজি চাষ করে ভালো আয়...',
    likes: 52,
    comments: 15,
    timeAgo: '১ দিন আগে',
  },
];

export function CommunityPostsSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold">সম্প্রদায় থেকে</CardTitle>
        <Link href="/community">
          <Button variant="ghost" size="sm" className="text-primary">
            সব দেখুন →
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.timeAgo}
                      </p>
                    </div>
                  </div>
                  <h4 className="font-semibold mt-2 text-foreground">
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                    <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, ShoppingCart, BookOpen, Users, Tractor, Camera, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FEATURES = [
  {
    icon: Camera,
    title: 'রোগ শনাক্ত করুন',
    description: 'ছবি তুলে ফসলের রোগ জানুন',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: TrendingUp,
    title: 'বাজার দর দেখুন',
    description: 'আজকের সব ফসলের দাম',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: ShoppingCart,
    title: 'বীজ ও সার কিনুন',
    description: 'যাচাইকৃত বিক্রেতা থেকে',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: BookOpen,
    title: 'জ্ঞান অর্জন করুন',
    description: 'চাষের গাইড ও টিপস',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Users,
    title: 'কৃষক সম্প্রদায়',
    description: 'প্রশ্ন করুন, অভিজ্ঞতা শেয়ার করুন',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Tractor,
    title: 'খামার ব্যবস্থাপনা',
    description: 'হিসাব রাখুন সহজে',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
];

const HOW_IT_WORKS = [
  {
    step: '১',
    title: 'অ্যাকাউন্ট খুলুন',
    description: 'মোবাইল নম্বর দিয়ে দ্রুত রেজিস্ট্রেশন করুন',
  },
  {
    step: '২',
    title: 'ফসলের ছবি তুলুন',
    description: 'ফসলের রোগ বা সমস্যার ছবি আপলোড করুন',
  },
  {
    step: '৩',
    title: 'সমাধান পান',
    description: 'AI দিয়ে তাৎক্ষণিক সমাধান এবং পরামর্শ পান',
  },
];

const STATS = [
  { value: '১০,০০০+', label: 'কৃষক' },
  { value: '৫০০+', label: 'বিক্রেতা' },
  { value: '১০০+', label: 'রোগ শনাক্ত' },
  { value: '৬৪', label: 'জেলা' },
];

const TESTIMONIALS = [
  {
    quote: 'কৃষিমিত্র অ্যাপ ব্যবহার করে আমার ধান ফসলের রোগ শনাক্ত করে সঠিক চিকিৎসা নিতে পেরেছি। খুবই উপকারী অ্যাপ।',
    name: 'করিম মিয়া',
    location: 'রাজশাহী',
    rating: 5,
  },
  {
    quote: 'বাজার দর জানতে পারি এবং সঠিক সময়ে ফসল বিক্রি করতে পারি। আমার আয় অনেক বেড়েছে।',
    name: 'রহিম উদ্দিন',
    location: 'বগুড়া',
    rating: 5,
  },
  {
    quote: 'অনলাইনে বীজ ও সার কিনতে পারি। ঘরে বসেই পণ্য পেয়ে যাই। সময় ও খরচ দুটোই বাঁচে।',
    name: 'আব্দুল হক',
    location: 'যশোর',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#16A34A] via-[#15803D] to-[#92400E] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                বাংলাদেশের প্রথম কৃষি সহায়ক অ্যাপ
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-hind leading-tight">
                বাংলাদেশের কৃষকদের ডিজিটাল সঙ্গী
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                ফসলের রোগ নির্ণয়, বাজার দর, বীজ কেনা - সব এক অ্যাপে
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-[#16A34A] hover:bg-white/90 text-lg px-8">
                    শুরু করুন
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  আরও জানুন
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-[3/4] bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Tractor className="h-32 w-32 mx-auto mb-4 text-white/60" />
                    <p className="text-white/80">অ্যাপ স্ক্রিনশট</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-hind text-gray-900">
              কৃষিমিত্র দিয়ে যা করতে পারবেন
            </h2>
            <p className="text-xl text-gray-600">
              আধুনিক প্রযুক্তি দিয়ে কৃষি কাজ হবে আরও সহজ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-[#16A34A]">
                <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-hind">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-hind text-gray-900">
              কিভাবে কাজ করে?
            </h2>
            <p className="text-xl text-gray-600">
              মাত্র তিন ধাপে শুরু করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-[#16A34A] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 font-hind">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-[#16A34A]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg md:text-xl text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-hind text-gray-900">
              কৃষকরা যা বলছেন
            </h2>
            <p className="text-xl text-gray-600">
              হাজারো কৃষক আমাদের সাথে আছেন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <Quote className="h-10 w-10 text-[#16A34A] mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold font-hind">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#16A34A] via-[#15803D] to-[#92400E] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-hind">
            আজই শুরু করুন
          </h2>
          <p className="text-xl mb-8 text-white/90">
            লক্ষাধিক কৃষকের সাথে যুক্ত হন এবং আধুনিক কৃষির অংশীদার হন
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-[#16A34A] hover:bg-white/90 text-lg px-12">
              ফ্রি রেজিস্ট্রেশন
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 font-hind text-[#16A34A]">কৃষিমিত্র</h3>
              <p className="text-gray-400 mb-4">
                বাংলাদেশের কৃষকদের ডিজিটাল সঙ্গী। ফসলের রোগ নির্ণয় থেকে শুরু করে বাজার দর জানা - সব কিছুই এক অ্যাপে।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 font-hind">দ্রুত লিঙ্ক</h4>
              <ul className="space-y-2">
                <li><Link href="/knowledge" className="text-gray-400 hover:text-[#16A34A]">জ্ঞান ভাণ্ডার</Link></li>
                <li><Link href="/marketplace" className="text-gray-400 hover:text-[#16A34A]">মার্কেটপ্লেস</Link></li>
                <li><Link href="/market-price" className="text-gray-400 hover:text-[#16A34A]">বাজার দর</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-[#16A34A]">সম্প্রদায়</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4 font-hind">সহায়তা</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#16A34A]">সাহায্য কেন্দ্র</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A34A]">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A34A]">শর্তাবলী</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A34A]">যোগাযোগ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© ২০২৫ কৃষিমিত্র। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

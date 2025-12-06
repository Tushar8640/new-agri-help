'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Bell, Lock, Info, Shield, FileText, Phone, Star, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DEMO_SETTINGS } from '@/lib/demo-profile';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState(DEMO_SETTINGS);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold font-hind">সেটিংস</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Language */}
        <Card>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#16A34A]" />
              <h3 className="font-bold font-hind">ভাষা</h3>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <Label>ভাষা নির্বাচন করুন</Label>
            <div className="flex gap-2">
              <Button
                variant={settings.language === 'bn' ? 'default' : 'outline'}
                className={settings.language === 'bn' ? 'bg-[#16A34A]' : ''}
                onClick={() => setSettings({ ...settings, language: 'bn' })}
              >
                বাংলা
              </Button>
              <Button
                variant={settings.language === 'en' ? 'default' : 'outline'}
                className={settings.language === 'en' ? 'bg-[#16A34A]' : ''}
                onClick={() => setSettings({ ...settings, language: 'en' })}
              >
                English
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#16A34A]" />
              <h3 className="font-bold font-hind">নোটিফিকেশন</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <Label>পুশ নোটিফিকেশন</Label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-[#16A34A]' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('push')}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications.push ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <Label>SMS নোটিফিকেশন</Label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.sms ? 'bg-[#16A34A]' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('sms')}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications.sms ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <Label>ইমেইল নোটিফিকেশন</Label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-[#16A34A]' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('email')}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications.email ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <Label>দামের সতর্কতা</Label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.priceAlerts ? 'bg-[#16A34A]' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('priceAlerts')}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications.priceAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <Label>রোগের সতর্কতা</Label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.diseaseAlerts ? 'bg-[#16A34A]' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('diseaseAlerts')}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications.diseaseAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Account */}
        <Card>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#16A34A]" />
              <h3 className="font-bold font-hind">অ্যাকাউন্ট</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <span className="font-semibold">পাসওয়ার্ড পরিবর্তন করুন</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors text-left text-red-600"
              onClick={() => setShowDeleteDialog(true)}
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span className="font-semibold">অ্যাকাউন্ট ডিলিট করুন</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Card>

        {/* Other */}
        <Card>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-[#16A34A]" />
              <h3 className="font-bold font-hind">অন্যান্য</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <span className="font-semibold">কৃষিমিত্রা সম্পর্কে</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <span className="font-semibold">গোপনীয়তা নীতি</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <span className="font-semibold">শর্তাবলী</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <span className="font-semibold">যোগাযোগ করুন</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#EAB308]" />
                <span className="font-semibold">অ্যাপ রেটিং দিন</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </Card>

        {/* Version */}
        <div className="text-center text-sm text-gray-500">
          <p>কৃষিমিত্রা v1.0.0</p>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-hind text-xl text-red-600">
              অ্যাকাউন্ট ডিলিট করুন
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">
              আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট ডিলিট করতে চান? এই প্রক্রিয়া পূর্বাবস্থায় ফেরানো যাবে না।
            </p>
            <p className="text-sm text-red-600 font-semibold">
              সকল ডেটা স্থায়ীভাবে মুছে যাবে।
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              বাতিল
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                console.log('Account deleted');
                setShowDeleteDialog(false);
              }}
            >
              ডিলিট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

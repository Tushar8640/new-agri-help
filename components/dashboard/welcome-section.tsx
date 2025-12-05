'use client';

import { useAuth } from '@/hooks/use-auth';
import { Cloud, CloudRain, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Bengali month names
const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

// Convert English numbers to Bengali
const toBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
};

export function WelcomeSection() {
  const { user } = useAuth();
  const now = new Date();
  const hour = now.getHours();

  // Time-based greeting in Bengali
  const getGreeting = () => {
    if (hour < 12) return 'সুপ্রভাত';
    if (hour < 17) return 'শুভ দুপুর';
    return 'শুভ সন্ধ্যা';
  };

  // Format date in Bengali
  const day = toBengaliNumber(now.getDate());
  const month = bengaliMonths[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  const bengaliDate = `${day} ${month}, ${year}`;

  // Mock weather data (in production, fetch from API)
  const weather = {
    temp: 28,
    condition: 'sunny',
    location: user?.district || 'ঢাকা',
  };

  const WeatherIcon = weather.condition === 'sunny' ? Sun : weather.condition === 'rainy' ? CloudRain : Cloud;

  return (
    <Card className="bg-linear-to-br from-primary/10 via-primary/5 to-background border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Greeting */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {getGreeting()}, {user?.nameBn || user?.name}!
            </h1>
            <p className="text-muted-foreground">{bengaliDate}</p>
          </div>

          {/* Weather Widget */}
          <div className="flex items-center gap-3 bg-background/60 backdrop-blur rounded-lg px-4 py-3 border">
            <WeatherIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{weather.temp}°C</p>
              <p className="text-xs text-muted-foreground">{weather.location}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

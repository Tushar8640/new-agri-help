'use client';

import { useState } from 'react';
import { Menu, Search, Bell, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick: () => void;
  language: 'bn' | 'en';
  onLanguageToggle: () => void;
}

export function Header({ onMenuClick, language, onLanguageToggle }: HeaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications] = useState([
    { id: 1, title: 'আপনার এলাকায় নতুন রোগ সতর্কতা', read: false },
    { id: 2, title: 'বাজার দর আপডেট', read: false },
    { id: 3, title: 'অর্ডার #1234 ডেলিভারি হয়েছে', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* Hamburger Menu - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo - Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="text-xl font-bold text-primary">কৃষিমিত্র</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === 'bn' ? 'অনুসন্ধান করুন...' : 'Search...'}
              className="pl-9 h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageToggle}
            className="hidden sm:flex items-center gap-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">
              {language === 'bn' ? 'বাং' : 'EN'}
            </span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>
                {language === 'bn' ? 'বিজ্ঞপ্তি' : 'Notifications'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 p-3 ${
                    !notification.read ? 'bg-accent/50' : ''
                  }`}
                >
                  <span className="text-sm">{notification.title}</span>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs">
                      নতুন
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium">
                  {language === 'bn' ? user?.nameBn : user?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {language === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                {language === 'bn' ? 'সেটিংস' : 'Settings'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/farm')}>
                {language === 'bn' ? 'আমার খামার' : 'My Farm'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/marketplace/orders')}>
                {language === 'bn' ? 'আমার অর্ডার' : 'My Orders'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                {language === 'bn' ? 'লগআউট' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

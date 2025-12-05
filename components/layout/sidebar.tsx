'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/lib/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { MapPin } from 'lucide-react';

interface SidebarProps {
  language: 'bn' | 'en';
}

export function Sidebar({ language }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 lg:z-50 lg:border-r lg:bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">কৃষিমিত্র</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                isActive
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">
                {language === 'bn' ? item.labelBn : item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Card at Bottom */}
      <div className="border-t p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || ''} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {language === 'bn' ? user?.nameBn : user?.name}
            </p>
            {user?.district && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{user.district}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}

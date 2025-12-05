'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/lib/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { MapPin } from 'lucide-react';

interface MobileSidebarProps {
  language: 'bn' | 'en';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ language, open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="text-2xl font-bold text-primary">
            কৃষিমিত্র
          </SheetTitle>
        </SheetHeader>

        {/* User Card at Top */}
        <div className="border-b p-4">
          <Link
            href="/profile"
            onClick={() => onOpenChange(false)}
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

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
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
      </SheetContent>
    </Sheet>
  );
}

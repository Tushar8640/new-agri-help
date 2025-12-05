'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { mobileNavItems } from '@/lib/navigation';

interface MobileNavProps {
  language: 'bn' | 'en';
}

export function MobileNav({ language }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 safe-area-inset-bottom">
      <div className="flex items-end justify-around px-2 py-2">
        {mobileNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const isCenter = index === 2; // Camera icon in center

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-lg transition-all',
                'min-w-11 min-h-11',
                isCenter
                  ? 'relative -mt-6 p-3'
                  : 'p-2',
                isActive && !isCenter
                  ? 'text-primary'
                  : 'text-muted-foreground',
                !isActive && 'hover:text-foreground'
              )}
            >
              {/* Center button with special styling */}
              {isCenter ? (
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full p-4 shadow-lg transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/90 text-primary-foreground hover:bg-primary'
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
              ) : (
                <>
                  <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isActive && 'font-semibold'
                    )}
                  >
                    {language === 'bn' ? item.labelBn : item.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

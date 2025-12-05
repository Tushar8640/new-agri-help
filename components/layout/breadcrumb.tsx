'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { breadcrumbLabels } from '@/lib/navigation';
import { Fragment } from 'react';

interface BreadcrumbProps {
  language: 'bn' | 'en';
}

export function Breadcrumb({ language }: BreadcrumbProps) {
  const pathname = usePathname();

  // Split pathname into segments and filter out empty strings
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumb on home/dashboard page
  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'dashboard')) {
    return null;
  }

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = breadcrumbLabels[segment]
      ? language === 'bn'
        ? breadcrumbLabels[segment].bn
        : breadcrumbLabels[segment].en
      : segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      href,
      label,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav className="flex items-center gap-2 px-4 py-3 text-sm" aria-label="Breadcrumb">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">
          {language === 'bn' ? 'হোম' : 'Home'}
        </span>
      </Link>

      {breadcrumbItems.map((item) => (
        <Fragment key={item.href}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.isLast ? (
            <span className="font-medium text-foreground" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

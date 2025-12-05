'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { Breadcrumb } from '@/components/layout/breadcrumb';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Pages that should not show the layout (auth pages)
const excludedRoutes = ['/login', '/register', '/verify'];

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Load language preference from localStorage on mount
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as 'bn' | 'en';
      return savedLanguage || 'bn';
    }
    return 'bn';
  };

  const [language, setLanguage] = useState<'bn' | 'en'>(getInitialLanguage);

  const toggleLanguage = () => {
    const newLanguage = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Check if current route should be excluded from layout
  const isExcludedRoute = excludedRoutes.some((route) => pathname.startsWith(route));

  if (isExcludedRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar language={language} />

      {/* Mobile Sidebar Sheet */}
      <MobileSidebar
        language={language}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-60">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          language={language}
          onLanguageToggle={toggleLanguage}
        />

        {/* Breadcrumb */}
        <Breadcrumb language={language} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background pb-20 lg:pb-4">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav language={language} />
      </div>
    </div>
  );
}

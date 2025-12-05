'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const publicRoutes = ['/login', '/register'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

    // If user is logged in and trying to access auth pages, redirect to home
    if (user && isAuthPage) {
      router.push('/');
      return;
    }

    // If user is not logged in and trying to access protected routes, redirect to login
    if (!user && !isPublicRoute) {
      router.push('/login');
      return;
    }
  }, [user, loading, pathname, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-lg">লোড হচ্ছে...</div>
      </div>
    );
  }

  return <>{children}</>;
}

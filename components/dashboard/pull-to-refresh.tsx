'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="relative">
      {/* Manual Refresh Button - Mobile */}
      <div className="lg:hidden fixed bottom-24 right-4 z-40">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      {children}
    </div>
  );
}

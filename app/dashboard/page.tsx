'use client';

import { Suspense, useState } from 'react';
import { WelcomeSection } from '@/components/dashboard/welcome-section';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { MarketPriceSection } from '@/components/dashboard/market-price-section';
import { DiseaseAlertsSection } from '@/components/dashboard/disease-alerts-section';
import { FarmSummarySection } from '@/components/dashboard/farm-summary-section';
import { CommunityPostsSection } from '@/components/dashboard/community-posts-section';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { PullToRefresh } from '@/components/dashboard/pull-to-refresh';

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="space-y-6" key={refreshKey}>
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-3">দ্রুত কাজ</h2>
            <QuickActions />
          </div>

          {/* Market Prices */}
          <MarketPriceSection />

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Disease Alerts */}
            <DiseaseAlertsSection />

            {/* Farm Summary */}
            <FarmSummarySection />
          </div>

          {/* Community Posts */}
          <CommunityPostsSection />
        </div>
      </Suspense>
    </PullToRefresh>
  );
}


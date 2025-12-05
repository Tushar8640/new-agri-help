'use client';

import { useAuth } from '@/hooks/use-auth';
import { AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DiseaseAlert {
  id: string;
  disease: string;
  crop: string;
  severity: 'low' | 'medium' | 'high';
  affectedAreas: string;
  date: string;
}

const mockAlerts: DiseaseAlert[] = [
  {
    id: '1',
    disease: 'পাতা পোড়া রোগ',
    crop: 'ধান',
    severity: 'high',
    affectedAreas: 'সাভার, ধামরাই',
    date: '২ দিন আগে',
  },
  {
    id: '2',
    disease: 'ব্যাকটেরিয়াল পচন',
    crop: 'টমেটো',
    severity: 'medium',
    affectedAreas: 'কালিয়াকৈর',
    date: '৫ দিন আগে',
  },
];

const severityConfig = {
  low: { color: 'bg-blue-500', label: 'নিম্ন' },
  medium: { color: 'bg-yellow-500', label: 'মাঝারি' },
  high: { color: 'bg-red-500', label: 'উচ্চ' },
};

export function DiseaseAlertsSection() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          এলাকায় সতর্কতা
        </CardTitle>
        {user?.district && (
          <p className="text-sm text-muted-foreground">
            {user.district} জেলায় সক্রিয় সতর্কতা
          </p>
        )}
      </CardHeader>
      <CardContent>
        {mockAlerts.length > 0 ? (
          <div className="space-y-3">
            {mockAlerts.map((alert) => {
              const severity = severityConfig[alert.severity];
              return (
                <Alert key={alert.id} className="border-l-4" style={{ borderLeftColor: severity.color.replace('bg-', '#') }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertDescription className="font-semibold text-foreground">
                          {alert.disease}
                        </AlertDescription>
                        <Badge
                          variant="secondary"
                          className={`${severity.color} text-white text-xs`}
                        >
                          {severity.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ফসল: <span className="font-medium">{alert.crop}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        এলাকা: {alert.affectedAreas}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.date}
                      </p>
                    </div>
                  </div>
                </Alert>
              );
            })}
          </div>
        ) : (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              আপনার এলাকায় বর্তমানে কোনো রোগ সতর্কতা নেই
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

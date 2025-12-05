'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-lg">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">কৃষিমিত্র</CardTitle>
            <CardDescription className="text-center text-base">
              আপনার কৃষি সহায়ক
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold mb-4">স্বাগতম, {user?.name}!</h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">ফোন:</span> {user?.phone}</p>
                <p><span className="font-medium">ভূমিকা:</span> {user?.role}</p>
                {user?.division && (
                  <p><span className="font-medium">বিভাগ:</span> {user.division}</p>
                )}
                {user?.district && (
                  <p><span className="font-medium">জেলা:</span> {user.district}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-14 text-base" variant="outline">
                আমার খামার
              </Button>
              <Button className="h-14 text-base" variant="outline">
                রোগ নির্ণয়
              </Button>
              <Button className="h-14 text-base" variant="outline">
                বাজার দর
              </Button>
              <Button className="h-14 text-base" variant="outline">
                কৃষি পণ্য
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={logout}
                variant="destructive"
                className="w-full h-11 text-base"
              >
                লগআউট
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

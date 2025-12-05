'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

// Demo orders data
const DEMO_ORDERS = [
  {
    id: 'ORD-1733501234567',
    date: '2024-12-05',
    status: 'delivered',
    items: 2,
    total: 770,
    products: ['BR-28 Rice Seeds', 'Organic Fertilizer'],
  },
  {
    id: 'ORD-1733414834567',
    date: '2024-12-03',
    status: 'shipping',
    items: 1,
    total: 35000,
    products: ['Mini Tiller'],
  },
  {
    id: 'ORD-1733328434567',
    date: '2024-12-01',
    status: 'pending',
    items: 3,
    total: 1550,
    products: ['Tomato Seeds', 'Bio Pesticide', 'NPK Fertilizer'],
  },
  {
    id: 'ORD-1733242034567',
    date: '2024-11-28',
    status: 'cancelled',
    items: 1,
    total: 320,
    products: ['Organic Fertilizer'],
  },
];

type OrderStatus = 'all' | 'pending' | 'shipping' | 'delivered' | 'cancelled';

export default function OrdersPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [filter, setFilter] = useState<OrderStatus>('all');

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: {
        variant: 'secondary' as const,
        labelBn: 'প্রক্রিয়াধীন',
        labelEn: 'Pending',
        icon: Clock,
      },
      shipping: {
        variant: 'default' as const,
        labelBn: 'পাঠানো হচ্ছে',
        labelEn: 'Shipping',
        icon: Package,
      },
      delivered: {
        variant: 'default' as const,
        labelBn: 'ডেলিভার হয়েছে',
        labelEn: 'Delivered',
        icon: CheckCircle,
      },
      cancelled: {
        variant: 'destructive' as const,
        labelBn: 'বাতিল',
        labelEn: 'Cancelled',
        icon: XCircle,
      },
    };

    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <Badge variant={badge.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {language === 'bn' ? badge.labelBn : badge.labelEn}
      </Badge>
    );
  };

  const filteredOrders =
    filter === 'all'
      ? DEMO_ORDERS
      : DEMO_ORDERS.filter((order) => order.status === filter);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'bn' ? 'ফিরে যান' : 'Back'}
          </Button>
          <h1 className="text-xl font-bold font-heading">
            {language === 'bn' ? 'আমার অর্ডার' : 'My Orders'}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as OrderStatus)}>
          <TabsList className="w-full justify-start overflow-x-auto mb-6">
            <TabsTrigger value="all">
              {language === 'bn' ? 'সব' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="pending">
              {language === 'bn' ? 'প্রক্রিয়াধীন' : 'Pending'}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              {language === 'bn' ? 'পাঠানো হচ্ছে' : 'Shipping'}
            </TabsTrigger>
            <TabsTrigger value="delivered">
              {language === 'bn' ? 'ডেলিভার হয়েছে' : 'Delivered'}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {language === 'bn' ? 'বাতিল' : 'Cancelled'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === 'bn'
                    ? 'কোনো অর্ডার পাওয়া যায়নি'
                    : 'No orders found'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-mono text-sm font-medium">
                            {order.id}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(order.date).toLocaleDateString('bn-BD', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="text-sm text-muted-foreground mb-2">
                        {language === 'bn' ? 'পণ্য:' : 'Products:'}
                      </div>
                      <ul className="text-sm space-y-1 mb-3">
                        {order.products.map((product, idx) => (
                          <li key={idx}>• {product}</li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {language === 'bn' ? 'মোট:' : 'Total:'}
                          </span>{' '}
                          <span className="font-bold text-primary">
                            ৳{order.total}
                          </span>
                        </div>
                        <Link href={`/marketplace/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

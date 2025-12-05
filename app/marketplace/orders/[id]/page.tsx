'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Package,
  CheckCircle,
  MapPin,
  Phone,
  User,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Demo order data
const DEMO_ORDER = {
  id: 'ORD-1733501234567',
  date: '2024-12-05T10:30:00',
  status: 'shipping',
  paymentMethod: 'cod',
  customer: {
    name: 'মোহাম্মদ রহিম',
    phone: '01712345678',
    address: 'গ্রাম: আলমপুর, পোস্ট: শ্রীপুর, উপজেলা: গাজীপুর সদর',
    district: 'Gazipur',
    division: 'Dhaka',
  },
  items: [
    {
      id: 'prod-1',
      name: 'BR-28 Rice Seeds',
      nameBn: 'BR-28 ধানের বীজ',
      price: 450,
      quantity: 1,
      unit: 'kg',
    },
    {
      id: 'prod-2',
      name: 'Organic Fertilizer',
      nameBn: 'জৈব সার',
      price: 320,
      quantity: 1,
      unit: '20kg bag',
    },
  ],
  timeline: [
    {
      status: 'ordered',
      label: 'অর্ডার নিশ্চিত',
      labelEn: 'Order Placed',
      date: '2024-12-05T10:30:00',
      completed: true,
    },
    {
      status: 'processing',
      label: 'প্রস্তুত করা হচ্ছে',
      labelEn: 'Processing',
      date: '2024-12-05T14:00:00',
      completed: true,
    },
    {
      status: 'shipping',
      label: 'পাঠানো হয়েছে',
      labelEn: 'Shipped',
      date: '2024-12-06T09:00:00',
      completed: true,
    },
    {
      status: 'delivered',
      label: 'ডেলিভার হবে',
      labelEn: 'To be Delivered',
      date: null,
      completed: false,
    },
  ],
  subtotal: 770,
  delivery: 0,
  total: 770,
};

export default function OrderDetailPage() {
  // const params = useParams(); // In real app, would use params.id to fetch order
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  // In a real app, fetch order by params.id
  const order = DEMO_ORDER;

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, { bn: string; en: string }> = {
      cod: { bn: 'ক্যাশ অন ডেলিভারি', en: 'Cash on Delivery' },
      bkash: { bn: 'bKash', en: 'bKash' },
      nagad: { bn: 'Nagad', en: 'Nagad' },
    };
    return language === 'bn'
      ? methods[method]?.bn || method
      : methods[method]?.en || method;
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<
      string,
      { variant: 'default' | 'secondary' | 'destructive'; labelBn: string; labelEn: string }
    > = {
      pending: { variant: 'secondary', labelBn: 'প্রক্রিয়াধীন', labelEn: 'Pending' },
      shipping: { variant: 'default', labelBn: 'পাঠানো হচ্ছে', labelEn: 'Shipping' },
      delivered: { variant: 'default', labelBn: 'ডেলিভার হয়েছে', labelEn: 'Delivered' },
      cancelled: { variant: 'destructive', labelBn: 'বাতিল', labelEn: 'Cancelled' },
    };

    const badge = badges[status];
    return (
      <Badge variant={badge.variant}>
        {language === 'bn' ? badge.labelBn : badge.labelEn}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-8">
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
            {language === 'bn' ? 'অর্ডার বিস্তারিত' : 'Order Details'}
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

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Order Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-mono text-sm font-medium">{order.id}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(order.date).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {language === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="space-y-4">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    {idx < order.timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.completed ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-medium">
                      {language === 'bn' ? step.label : step.labelEn}
                    </div>
                    {step.date && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(step.date).toLocaleDateString('bn-BD', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'bn' ? 'অর্ডার আইটেম' : 'Order Items'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="font-medium">
                      {language === 'bn' ? item.nameBn : item.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ৳{item.price} × {item.quantity} {item.unit}
                    </div>
                  </div>
                  <div className="font-medium">৳{item.price * item.quantity}</div>
                </div>
                {idx < order.items.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}
                </span>
                <span>৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery'}
                </span>
                <span className="text-green-600">
                  {language === 'bn' ? 'ফ্রি' : 'Free'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
                <span className="text-primary">৳{order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {language === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div>{order.customer.address}</div>
                <div className="text-sm text-muted-foreground">
                  {order.customer.district}, {order.customer.division}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{getPaymentMethodLabel(order.paymentMethod)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

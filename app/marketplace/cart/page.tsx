'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
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
              {language === 'bn' ? 'কার্ট' : 'Cart'}
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

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">
            {language === 'bn' ? 'আপনার কার্ট খালি' : 'Your cart is empty'}
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            {language === 'bn'
              ? 'বাজার থেকে পণ্য যোগ করুন'
              : 'Add products from the marketplace'}
          </p>
          <Button onClick={() => router.push('/marketplace')}>
            {language === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-8">
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
            {language === 'bn' ? 'কার্ট' : 'Cart'} ({items.length})
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
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/marketplace/${item.id}`}
                      className="shrink-0"
                    >
                      <div className="w-20 h-20 bg-muted rounded overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.nameBn}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            {language === 'bn' ? 'ছবি নেই' : 'No image'}
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/marketplace/${item.id}`}>
                        <h3 className="font-medium line-clamp-2 hover:text-primary">
                          {language === 'bn' ? item.nameBn : item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.sellerName}
                      </p>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-lg font-bold text-primary">
                          ৳{item.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{item.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-primary">
                        ৳{item.price * item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {item.quantity >= item.stock && (
                    <p className="text-xs text-destructive mt-2">
                      {language === 'bn'
                        ? 'সর্বোচ্চ স্টক পৌঁছেছে'
                        : 'Maximum stock reached'}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-bold">
                  {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
                </h2>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}
                    </span>
                    <span className="font-medium">৳{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery'}
                    </span>
                    <span className="font-medium text-green-600">
                      {language === 'bn' ? 'ফ্রি' : 'Free'}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
                  <span className="text-primary">৳{total}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => router.push('/marketplace/checkout')}
                >
                  {language === 'bn' ? 'চেকআউট করুন' : 'Proceed to Checkout'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/marketplace')}
                >
                  {language === 'bn' ? 'কেনাকাটা চালিয়ে যান' : 'Continue Shopping'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Phone, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart-store';
import { BD_LOCATIONS } from '@/lib/bd-locations';

export default function CheckoutPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division: '',
    district: '',
    address: '',
    paymentMethod: 'cod',
  });

  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    router.push('/marketplace');
    return null;
  }

  const selectedDivision = BD_LOCATIONS.find(
    (d) => d.division === formData.division
  );
  const districts = selectedDivision?.districts || [];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Reset district when division changes
    if (field === 'division') {
      setFormData((prev) => ({ ...prev, district: '' }));
    }
  };

  const handlePlaceOrder = () => {
    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.division ||
      !formData.district ||
      !formData.address
    ) {
      alert(
        language === 'bn'
          ? 'সব তথ্য পূরণ করুন'
          : 'Please fill all fields'
      );
      return;
    }

    // Create order (demo)
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    router.push(`/marketplace/orders/${orderId}`);
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
            {language === 'bn' ? 'চেকআউট' : 'Checkout'}
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
          {/* Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {language === 'bn' ? 'ডেলিভারি তথ্য' : 'Delivery Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'bn' ? 'নাম' : 'Full Name'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={
                        language === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'
                      }
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Division */}
                <div className="space-y-2">
                  <Label htmlFor="division">
                    {language === 'bn' ? 'বিভাগ' : 'Division'}
                  </Label>
                  <Select
                    value={formData.division}
                    onValueChange={(value) => handleInputChange('division', value)}
                  >
                    <SelectTrigger id="division">
                      <SelectValue
                        placeholder={
                          language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {BD_LOCATIONS.map((location) => (
                        <SelectItem key={location.division} value={location.division}>
                          {language === 'bn'
                            ? location.divisionBn
                            : location.division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <Label htmlFor="district">
                    {language === 'bn' ? 'জেলা' : 'District'}
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleInputChange('district', value)}
                    disabled={!formData.division}
                  >
                    <SelectTrigger id="district">
                      <SelectValue
                        placeholder={
                          language === 'bn'
                            ? 'জেলা নির্বাচন করুন'
                            : 'Select District'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">
                    {language === 'bn' ? 'বিস্তারিত ঠিকানা' : 'Detailed Address'}
                  </Label>
                  <textarea
                    id="address"
                    rows={3}
                    placeholder={
                      language === 'bn'
                        ? 'গ্রাম/রাস্তা, পোস্ট অফিস, থানা'
                        : 'Village/Street, Post Office, Upazila'
                    }
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
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
              <CardContent className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) =>
                      handleInputChange('paymentMethod', e.target.value)
                    }
                    className="h-4 w-4"
                  />
                  <div>
                    <div className="font-medium">
                      {language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'bn'
                        ? 'পণ্য পেয়ে টাকা দিন'
                        : 'Pay when you receive'}
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    name="payment"
                    value="bkash"
                    checked={formData.paymentMethod === 'bkash'}
                    onChange={(e) =>
                      handleInputChange('paymentMethod', e.target.value)
                    }
                    className="h-4 w-4"
                  />
                  <div>
                    <div className="font-medium">bKash</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'bn'
                        ? 'মোবাইল ব্যাংকিং'
                        : 'Mobile banking'}
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    name="payment"
                    value="nagad"
                    checked={formData.paymentMethod === 'nagad'}
                    onChange={(e) =>
                      handleInputChange('paymentMethod', e.target.value)
                    }
                    className="h-4 w-4"
                  />
                  <div>
                    <div className="font-medium">Nagad</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'bn'
                        ? 'মোবাইল ব্যাংকিং'
                        : 'Mobile banking'}
                    </div>
                  </div>
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>
                  {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1 min-w-0">
                        <div className="truncate">
                          {language === 'bn' ? item.nameBn : item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ৳{item.price} × {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ৳{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

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
                  onClick={handlePlaceOrder}
                >
                  {language === 'bn' ? 'অর্ডার নিশ্চিত করুন' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

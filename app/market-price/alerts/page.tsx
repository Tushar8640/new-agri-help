'use client';

import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Bell, BellOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAlertStore } from '@/store/alert-store';
import { DEMO_MARKET_PRICES, DEMO_MARKETS } from '@/lib/demo-market-prices';

export default function PriceAlertsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { alerts, addAlert, removeAlert, toggleAlert } = useAlertStore();

  // Form state
  const [cropId, setCropId] = useState('');
  const [marketId, setMarketId] = useState('');
  const [alertType, setAlertType] = useState<'price_increase' | 'price_decrease'>('price_increase');
  const [targetPrice, setTargetPrice] = useState('');

  const handleCreateAlert = () => {
    if (!cropId || !marketId || !targetPrice) {
      alert(language === 'bn' ? 'সব তথ্য পূরণ করুন' : 'Please fill all fields');
      return;
    }

    const selectedCrop = DEMO_MARKET_PRICES.find((p) => p.id === cropId);
    const selectedMarket = DEMO_MARKETS.find((m) => m.id === marketId);

    if (!selectedCrop || !selectedMarket) return;

    addAlert({
      cropId: selectedCrop.id,
      cropName: selectedCrop.cropName,
      cropNameBn: selectedCrop.cropNameBn,
      marketId: selectedMarket.id,
      marketName: selectedMarket.name,
      marketNameBn: selectedMarket.nameBn,
      alertType,
      targetPrice: parseFloat(targetPrice),
      isActive: true,
    });

    // Reset form
    setCropId('');
    setMarketId('');
    setTargetPrice('');
    setDialogOpen(false);
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
            {language === 'bn' ? 'দর এলার্ট' : 'Price Alerts'}
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

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Create Alert Button */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              {language === 'bn' ? 'নতুন এলার্ট তৈরি করুন' : 'Create New Alert'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'bn' ? 'দর এলার্ট সেট করুন' : 'Set Price Alert'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Crop Selection */}
              <div className="space-y-2">
                <Label htmlFor="crop">
                  {language === 'bn' ? 'ফসল নির্বাচন করুন' : 'Select Crop'}
                </Label>
                <Select value={cropId} onValueChange={setCropId}>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder={language === 'bn' ? 'ফসল বাছুন' : 'Choose crop'} />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_MARKET_PRICES.map((price) => (
                      <SelectItem key={price.id} value={price.id}>
                        {language === 'bn' ? price.cropNameBn : price.cropName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Market Selection */}
              <div className="space-y-2">
                <Label htmlFor="market">
                  {language === 'bn' ? 'বাজার নির্বাচন করুন' : 'Select Market'}
                </Label>
                <Select value={marketId} onValueChange={setMarketId}>
                  <SelectTrigger id="market">
                    <SelectValue placeholder={language === 'bn' ? 'বাজার বাছুন' : 'Choose market'} />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_MARKETS.map((market) => (
                      <SelectItem key={market.id} value={market.id}>
                        {language === 'bn' ? market.nameBn : market.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Alert Type */}
              <div className="space-y-2">
                <Label htmlFor="alertType">
                  {language === 'bn' ? 'এলার্ট টাইপ' : 'Alert Type'}
                </Label>
                <Select value={alertType} onValueChange={(value: 'price_increase' | 'price_decrease') => setAlertType(value)}>
                  <SelectTrigger id="alertType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_increase">
                      {language === 'bn' ? 'দাম বাড়লে' : 'When price increases'}
                    </SelectItem>
                    <SelectItem value="price_decrease">
                      {language === 'bn' ? 'দাম কমলে' : 'When price decreases'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Price */}
              <div className="space-y-2">
                <Label htmlFor="targetPrice">
                  {language === 'bn' ? 'লক্ষ্য দর (৳)' : 'Target Price (৳)'}
                </Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder="০"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
              </div>

              <Button onClick={handleCreateAlert} className="w-full">
                {language === 'bn' ? 'এলার্ট তৈরি করুন' : 'Create Alert'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {language === 'bn'
                ? 'কোনো এলার্ট নেই'
                : 'No alerts yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold">
                        {language === 'bn' ? alert.cropNameBn : alert.cropName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'bn' ? alert.marketNameBn : alert.marketName}
                      </p>
                    </div>
                    <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                      {alert.isActive
                        ? language === 'bn'
                          ? 'সক্রিয়'
                          : 'Active'
                        : language === 'bn'
                          ? 'নিষ্ক্রিয়'
                          : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {language === 'bn' ? 'টাইপ:' : 'Type:'}
                      </span>
                      <span>
                        {alert.alertType === 'price_increase'
                          ? language === 'bn'
                            ? 'দাম বাড়লে'
                            : 'Price increase'
                          : language === 'bn'
                            ? 'দাম কমলে'
                            : 'Price decrease'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {language === 'bn' ? 'লক্ষ্য দর:' : 'Target:'}
                      </span>
                      <span className="font-bold text-primary">
                        ৳{alert.targetPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAlert(alert.id)}
                      className="flex-1 gap-2"
                    >
                      {alert.isActive ? (
                        <>
                          <BellOff className="h-4 w-4" />
                          {language === 'bn' ? 'বন্ধ করুন' : 'Disable'}
                        </>
                      ) : (
                        <>
                          <Bell className="h-4 w-4" />
                          {language === 'bn' ? 'চালু করুন' : 'Enable'}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAlert(alert.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      {language === 'bn' ? 'মুছুন' : 'Delete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Plus, MapPin, Sprout, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEMO_FIELDS } from '@/lib/demo-farm';

export default function FieldsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newField, setNewField] = useState({
    name: '',
    size: '',
    crop: '',
  });

  const handleAddField = () => {
    console.log('Adding field:', newField);
    setIsAddModalOpen(false);
    setNewField({ name: '', size: '', crop: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'harvested':
        return 'bg-blue-100 text-blue-700';
      case 'fallow':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">মাঠসমূহ</h1>
          </div>
          <p className="text-white/90">আপনার খামারের সকল মাঠ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-[#16A34A]">{DEMO_FIELDS.length}</p>
            <p className="text-sm text-gray-600">মোট মাঠ</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {DEMO_FIELDS.filter((f) => f.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">সক্রিয়</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">
              {DEMO_FIELDS.filter((f) => f.status === 'fallow').length}
            </p>
            <p className="text-sm text-gray-600">পতিত</p>
          </Card>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_FIELDS.map((field) => (
            <Card key={field.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-hind mb-1">{field.nameBn}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {field.size} {field.unit}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(field.status)}>{field.statusBn}</Badge>
                </div>

                {field.crop && (
                  <div className="mb-4 p-3 bg-[#16A34A]/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="h-5 w-5 text-[#16A34A]" />
                      <span className="font-semibold text-[#16A34A]">{field.cropBn}</span>
                    </div>
                    {field.plantedDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>রোপণের {field.daysPlanted} দিন হয়েছে</span>
                      </div>
                    )}
                  </div>
                )}

                {!field.crop && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center text-gray-500">
                    <p className="text-sm">বর্তমানে কোনো ফসল নেই</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10"
                  >
                    কার্যক্রম যোগ করুন
                  </Button>
                  <Button variant="outline" className="flex-1">
                    বিস্তারিত
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {DEMO_FIELDS.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">কোনো মাঠ যুক্ত করা হয়নি</p>
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              প্রথম মাঠ যুক্ত করুন
            </Button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg bg-[#16A34A] hover:bg-[#15803D] z-20"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-hind text-xl">নতুন মাঠ যুক্ত করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fieldName" className="mb-2 block">
                মাঠের নাম <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fieldName"
                placeholder="যেমন: উত্তর মাঠ"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="size" className="mb-2 block">
                আয়তন (বিঘা) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="size"
                type="number"
                placeholder="যেমন: 2.5"
                value={newField.size}
                onChange={(e) => setNewField({ ...newField, size: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="crop" className="mb-2 block">
                বর্তমান ফসল (ঐচ্ছিক)
              </Label>
              <Input
                id="crop"
                placeholder="যেমন: ধান"
                value={newField.crop}
                onChange={(e) => setNewField({ ...newField, crop: e.target.value })}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                বাতিল
              </Button>
              <Button
                className="bg-[#16A34A] hover:bg-[#15803D]"
                onClick={handleAddField}
                disabled={!newField.name || !newField.size}
              >
                মাঠ যুক্ত করুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

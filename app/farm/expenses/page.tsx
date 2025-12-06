'use client';

import { useState } from 'react';
import { Plus, Wallet, TrendingUp, Calendar, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_EXPENSES, getExpensesByCategory, EXPENSE_CATEGORIES } from '@/lib/demo-farm';

const COLORS = ['#16A34A', '#92400E', '#EAB308', '#3B82F6', '#8B5CF6', '#EC4899'];

export default function ExpensesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  const handleAddExpense = () => {
    console.log('Adding expense:', newExpense);
    setIsAddModalOpen(false);
    setNewExpense({ category: '', amount: '', description: '', date: '' });
  };

  const categoryData = getExpensesByCategory().map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));

  const totalExpense = DEMO_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'seeds':
        return 'bg-green-100 text-green-700';
      case 'fertilizer':
        return 'bg-yellow-100 text-yellow-700';
      case 'pesticide':
        return 'bg-red-100 text-red-700';
      case 'labor':
        return 'bg-blue-100 text-blue-700';
      case 'irrigation':
        return 'bg-cyan-100 text-cyan-700';
      case 'equipment':
        return 'bg-purple-100 text-purple-700';
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
            <Wallet className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-hind">খরচ ব্যবস্থাপনা</h1>
          </div>
          <p className="text-white/90">আপনার সকল খরচ ট্র্যাক করুন</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/80">এই মাসের মোট খরচ</p>
            <Calendar className="h-5 w-5 text-white/60" />
          </div>
          <p className="text-4xl font-bold">৳{totalExpense.toLocaleString('bn-BD')}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
            <TrendingUp className="h-4 w-4" />
            <span>গত মাসের তুলনায় ১২% বেশি</span>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold font-hind mb-4">ক্যাটাগরি অনুসারে খরচ</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoryBn, percent }: any) => `${categoryBn} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `৳${value.toLocaleString('bn-BD')}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {categoryData.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-sm font-semibold">{item.categoryBn}</p>
                  <p className="text-xs text-gray-600">
                    ৳{item.amount.toLocaleString('bn-BD')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Expenses List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-hind">সাম্প্রতিক খরচ</h2>
            <Receipt className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {DEMO_EXPENSES.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getCategoryBadgeColor(expense.category)}>
                      {expense.categoryBn}
                    </Badge>
                    {expense.fieldId && (
                      <span className="text-sm text-gray-500">• {expense.fieldBn}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(expense.date), 'PPP', { locale: bn })}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#16A34A]">
                    ৳{expense.amount.toLocaleString('bn-BD')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
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
            <DialogTitle className="font-hind text-xl">নতুন খরচ যুক্ত করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category" className="mb-2 block">
                ক্যাটাগরি <span className="text-red-500">*</span>
              </Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.labelBn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="mb-2 block">
                পরিমাণ (টাকা) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="যেমন: ৫০০০"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="date" className="mb-2 block">
                তারিখ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description" className="mb-2 block">
                বিবরণ
              </Label>
              <Textarea
                id="description"
                placeholder="খরচ সম্পর্কে কিছু লিখুন..."
                rows={3}
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                বাতিল
              </Button>
              <Button
                className="bg-[#16A34A] hover:bg-[#15803D]"
                onClick={handleAddExpense}
                disabled={!newExpense.category || !newExpense.amount || !newExpense.date}
              >
                খরচ যুক্ত করুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

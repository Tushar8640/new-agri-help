'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_EXPENSES, DEMO_HARVESTS, getExpensesByCategory } from '@/lib/demo-farm';

const PERIOD_OPTIONS = [
  { value: '1m', label: 'এই মাস' },
  { value: '3m', label: '৩ মাস' },
  { value: '6m', label: '৬ মাস' },
  { value: '1y', label: '১ বছর' },
];

// Monthly expense data
const monthlyExpenseData = [
  { month: 'জানুয়ারি', amount: 18000 },
  { month: 'ফেব্রুয়ারি', amount: 22500 },
  { month: 'মার্চ', amount: 19500 },
  { month: 'এপ্রিল', amount: 25000 },
  { month: 'মে', amount: 21000 },
  { month: 'জুন', amount: 23500 },
];

// Harvest trend data
const harvestTrendData = [
  { month: 'জানুয়ারি', value: 32000 },
  { month: 'ফেব্রুয়ারি', value: 0 },
  { month: 'মার্চ', value: 48000 },
  { month: 'এপ্রিল', value: 0 },
  { month: 'মে', value: 24000 },
  { month: 'জুন', value: 0 },
];

// Profit trend data
const profitTrendData = [
  { month: 'জানুয়ারি', profit: 14000, loss: 0 },
  { month: 'ফেব্রুয়ারি', profit: 0, loss: -22500 },
  { month: 'মার্চ', profit: 28500, loss: 0 },
  { month: 'এপ্রিল', profit: 0, loss: -25000 },
  { month: 'মে', profit: 3000, loss: 0 },
  { month: 'জুন', profit: 0, loss: -23500 },
];

const COLORS = ['#16A34A', '#92400E', '#EAB308', '#3B82F6', '#8B5CF6', '#EC4899'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6m');

  const categoryData = getExpensesByCategory();
  const totalExpenses = DEMO_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
  const totalRevenue = DEMO_HARVESTS.reduce((sum, harvest) => sum + harvest.soldPrice, 0);
  const profit = totalRevenue - totalExpenses;
  const roi = totalExpenses > 0 ? ((profit / totalExpenses) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-8 w-8" />
                <h1 className="text-2xl font-bold font-hind">বিশ্লেষণ</h1>
              </div>
              <p className="text-white/90">আপনার খামারের পারফরম্যান্স</p>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Download className="h-4 w-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Period Selector */}
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-5 w-5 text-gray-600" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">মোট আয়</p>
            <p className="text-2xl font-bold text-[#16A34A] mb-2">
              ৳{totalRevenue.toLocaleString('bn-BD')}
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>১৮% বৃদ্ধি</span>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">মোট খরচ</p>
            <p className="text-2xl font-bold text-[#92400E] mb-2">
              ৳{totalExpenses.toLocaleString('bn-BD')}
            </p>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingUp className="h-3 w-3" />
              <span>১২% বৃদ্ধি</span>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">নিট লাভ</p>
            <p className={`text-2xl font-bold mb-2 ${profit >= 0 ? 'text-[#16A34A]' : 'text-red-600'}`}>
              ৳{profit.toLocaleString('bn-BD')}
            </p>
            <div className={`flex items-center gap-1 text-xs ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>গত মাস থেকে</span>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">ROI (রিটার্ন)</p>
            <p className={`text-2xl font-bold mb-2 ${parseFloat(roi) >= 0 ? 'text-[#16A34A]' : 'text-red-600'}`}>
              {roi}%
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>বিনিয়োগের উপর</span>
            </div>
          </Card>
        </div>

        {/* Monthly Expense Bar Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold font-hind mb-4">মাসিক খরচ</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip
                  formatter={(value: number) => `৳${value.toLocaleString('bn-BD')}`}
                  labelStyle={{ color: '#000' }}
                />
                <Bar dataKey="amount" fill="#16A34A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expense Category Pie Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold font-hind mb-4">খরচের ভাগ</h2>
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `৳${value.toLocaleString('bn-BD')}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {categoryData.map((item, index) => (
              <div key={item.category} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
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

        {/* Harvest Trend Line Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold font-hind mb-4">ফসল বিক্রয় প্রবণতা</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={harvestTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip
                  formatter={(value: number) => `৳${value.toLocaleString('bn-BD')}`}
                  labelStyle={{ color: '#000' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ fill: '#16A34A', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profit Trend Line Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-bold font-hind mb-4">লাভ/ক্ষতি প্রবণতা</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip
                  formatter={(value: number) => `৳${Math.abs(value).toLocaleString('bn-BD')}`}
                  labelStyle={{ color: '#000' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ fill: '#16A34A', r: 6 }}
                  name="লাভ"
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#DC2626"
                  strokeWidth={3}
                  dot={{ fill: '#DC2626', r: 6 }}
                  name="ক্ষতি"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Export Section */}
        <Card className="p-6 mt-6 bg-gradient-to-r from-[#16A34A]/10 to-[#92400E]/10 border-[#16A34A]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-hind mb-1">সম্পূর্ণ রিপোর্ট</h3>
              <p className="text-sm text-gray-600">
                আপনার সকল তথ্য PDF বা CSV ফরম্যাটে ডাউনলোড করুন
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#16A34A] text-[#16A34A]">
                CSV
              </Button>
              <Button className="bg-[#16A34A] hover:bg-[#15803D]">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

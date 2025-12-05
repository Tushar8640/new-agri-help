'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface DiseaseReport {
  id: string;
  disease: string;
  diseaseBn: string;
  crop: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  date: string;
  image: string;
  status: 'detected' | 'treated' | 'ongoing';
}

const DEMO_REPORTS: DiseaseReport[] = [
  {
    id: '1',
    disease: 'Bacterial Leaf Blight',
    diseaseBn: 'পাতা পোড়া রোগ',
    crop: 'ধান',
    severity: 'high',
    confidence: 92,
    date: '২০২৫-১২-০৫',
    image: '/placeholder-disease.jpg',
    status: 'ongoing',
  },
  {
    id: '2',
    disease: 'Brown Spot',
    diseaseBn: 'বাদামি দাগ রোগ',
    crop: 'ধান',
    severity: 'medium',
    confidence: 85,
    date: '২০২৫-১১-২৮',
    image: '/placeholder-disease.jpg',
    status: 'treated',
  },
  {
    id: '3',
    disease: 'Leaf Curl',
    diseaseBn: 'পাতা কোঁকড়ানো রোগ',
    crop: 'টমেটো',
    severity: 'low',
    confidence: 78,
    date: '২০২৫-১১-২০',
    image: '/placeholder-disease.jpg',
    status: 'treated',
  },
];

const severityConfig = {
  low: { label: 'নিম্ন', color: 'bg-blue-500' },
  medium: { label: 'মাঝারি', color: 'bg-yellow-500' },
  high: { label: 'উচ্চ', color: 'bg-red-500' },
};

const statusConfig = {
  detected: { label: 'শনাক্ত', color: 'bg-gray-500' },
  ongoing: { label: 'চলমান', color: 'bg-orange-500' },
  treated: { label: 'নিরাময়', color: 'bg-green-500' },
};

export default function DiseaseHistoryPage() {
  const [reports] = useState<DiseaseReport[]>(DEMO_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.diseaseBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || report.crop === selectedCrop;
    const matchesSeverity =
      selectedSeverity === 'all' || report.severity === selectedSeverity;

    return matchesSearch && matchesCrop && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">রোগ শনাক্তকরণের ইতিহাস</h1>
          <p className="text-muted-foreground mt-2">
            আপনার পূর্ববর্তী রোগ শনাক্তকরণ রিপোর্ট
          </p>
        </div>
        <Link href="/disease/detect">
          <Button>নতুন শনাক্তকরণ</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="রোগ বা ফসলের নাম অনুসন্ধান করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Crop Filter */}
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="ফসল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ফসল</SelectItem>
                <SelectItem value="ধান">ধান</SelectItem>
                <SelectItem value="টমেটো">টমেটো</SelectItem>
                <SelectItem value="আলু">আলু</SelectItem>
                <SelectItem value="বেগুন">বেগুন</SelectItem>
              </SelectContent>
            </Select>

            {/* Severity Filter */}
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="তীব্রতা" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব তীব্রতা</SelectItem>
                <SelectItem value="low">নিম্ন</SelectItem>
                <SelectItem value="medium">মাঝারি</SelectItem>
                <SelectItem value="high">উচ্চ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => {
            const severity = severityConfig[report.severity];
            const status = statusConfig[report.status];

            return (
              <Link key={report.id} href={`/disease/${report.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={report.image}
                          alt={report.diseaseBn}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg">
                            {report.diseaseBn}
                          </h3>
                          <div className="flex gap-2 shrink-0">
                            <Badge className={`${severity.color} text-white text-xs`}>
                              {severity.label}
                            </Badge>
                            <Badge className={`${status.color} text-white text-xs`}>
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.disease} • {report.crop}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{report.date}</span>
                          </div>
                          <span className="text-primary font-medium">
                            {report.confidence}% নিশ্চিত
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                কোনো রিপোর্ট পাওয়া যায়নি
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

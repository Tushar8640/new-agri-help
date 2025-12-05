'use client';

import { use } from 'react';
import { ArrowLeft, Calendar, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DetectionResultDisplay, type DetectionResult } from '@/components/disease/detection-result';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Demo data
const DEMO_REPORT: DetectionResult = {
  disease: {
    name: 'Bacterial Leaf Blight',
    nameBn: 'পাতা পোড়া রোগ',
    type: 'ব্যাকটেরিয়া',
  },
  confidence: 92,
  severity: 'high',
  crop: 'ধান',
  symptoms: [
    'পাতার কিনারা থেকে হলদে হয়ে যাওয়া',
    'পাতায় বাদামি দাগ দেখা দেওয়া',
    'সকালে পাতায় ছোট ছোট পানির ফোঁটা দেখা যায়',
    'আক্রান্ত পাতা শুকিয়ে মরে যায়',
  ],
  treatment: [
    'আক্রান্ত পাতা ও গাছ তুলে পুড়িয়ে ফেলুন',
    'স্ট্রেপটোসাইক্লিন ১ গ্রাম + কপার অক্সিক্লোরাইড ২৫ গ্রাম প্রতি ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন',
    '১০-১৫ দিন পর পুনরায় স্প্রে করুন',
    'প্রয়োজনে কৃষি কর্মকর্তার পরামর্শ নিন',
  ],
  prevention: [
    'রোগমুক্ত বীজ ব্যবহার করুন',
    'বীজ শোধন করে বপন করুন',
    'জমিতে সুষম সার প্রয়োগ করুন',
    'জমিতে পানি জমতে দেবেন না',
    'আক্রান্ত গাছের অবশিষ্ট অংশ পুড়িয়ে ফেলুন',
  ],
  organicSolutions: [
    'রসুন পেস্ট (৫০ গ্রাম) + নিম পাতার রস (১০০ মিলি) + ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন',
    'ত্রিকোডার্মা ব্যবহার করুন (৫ গ্রাম/লিটার পানি)',
    'কাঠের ছাই ও গোবর মিশ্রণ জমিতে প্রয়োগ করুন',
  ],
  image: '/placeholder-disease.jpg',
};

export default function DiseaseReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const handleConsultExpert = () => {
    router.push('/community?action=ask');
  };

  const handleDownload = () => {
    alert('রিপোর্ট ডাউনলোড করা হচ্ছে...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: DEMO_REPORT.disease.nameBn,
        text: `${DEMO_REPORT.disease.nameBn} - ${DEMO_REPORT.confidence}% নিশ্চিত`,
        url: window.location.href,
      });
    } else {
      alert('শেয়ার করার জন্য লিংক কপি করা হয়েছে!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/disease/history">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ইতিহাসে ফিরে যান
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            শেয়ার
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            ডাউনলোড
          </Button>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>রিপোর্ট #{ id} • ০৫ ডিসেম্বর, ২০২৫</span>
      </div>

      {/* Result Display */}
      <DetectionResultDisplay
        result={DEMO_REPORT}
        onConsultExpert={handleConsultExpert}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/disease/image-upload';
import { DetectionResultDisplay, type DetectionResult } from '@/components/disease/detection-result';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Demo disease data
const DEMO_RESULTS: DetectionResult[] = [
  {
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
  },
];

export default function DiseaseDetectPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setResult(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview('');
    setResult(null);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setIsDetecting(true);
    
    // Simulate API call with demo data
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const demoResult = {
      ...DEMO_RESULTS[0],
      image: preview,
    };
    
    setResult(demoResult);
    setIsDetecting(false);
  };

  const handleSave = async () => {
    if (!result) return;
    
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert('রিপোর্ট সফলভাবে সংরক্ষণ করা হয়েছে!');
    router.push('/disease/history');
  };

  const handleConsultExpert = () => {
    router.push('/community?action=ask');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">রোগ শনাক্তকরণ</h1>
        <p className="text-muted-foreground">
          ফসলের ছবি আপলোড করে রোগ শনাক্ত করুন এবং সমাধান পান
        </p>
      </div>

      {/* Image Upload */}
      <ImageUpload
        onImageSelect={handleImageSelect}
        preview={preview}
        onClear={handleClear}
      />

      {/* Detect Button */}
      {preview && !result && (
        <Button
          size="lg"
          className="w-full h-14 text-lg"
          onClick={handleDetect}
          disabled={isDetecting}
        >
          {isDetecting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              শনাক্ত করা হচ্ছে...
            </>
          ) : (
            'রোগ শনাক্ত করুন'
          )}
        </Button>
      )}

      {/* Detection Result */}
      {result && (
        <DetectionResultDisplay
          result={result}
          onSave={handleSave}
          onConsultExpert={handleConsultExpert}
        />
      )}
    </div>
  );
}


'use client';

import { AlertCircle, CheckCircle2, AlertTriangle, MessageCircle, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export interface DetectionResult {
  disease: {
    name: string;
    nameBn: string;
    type: string;
  };
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  crop: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  organicSolutions: string[];
  image: string;
}

interface DetectionResultDisplayProps {
  result: DetectionResult;
  onConsultExpert?: () => void;
  onSave?: () => void;
}

const severityConfig = {
  low: { label: 'নিম্ন', color: 'bg-blue-500', icon: CheckCircle2 },
  medium: { label: 'মাঝারি', color: 'bg-yellow-500', icon: AlertTriangle },
  high: { label: 'উচ্চ', color: 'bg-red-500', icon: AlertCircle },
};

export function DetectionResultDisplay({ result, onConsultExpert, onSave }: DetectionResultDisplayProps) {
  const severity = severityConfig[result.severity];
  const SeverityIcon = severity.icon;

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
              <Image
                src={result.image}
                alt="Detected disease"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {result.disease.nameBn}
                </h2>
                <Badge className={`${severity.color} text-white`}>
                  <SeverityIcon className="h-3 w-3 mr-1" />
                  {severity.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {result.disease.name} • {result.crop}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-primary">
                  {result.confidence}% নিশ্চিত
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            লক্ষণ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="flex-1">{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Treatment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            চিকিৎসা
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.treatment.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                  {index + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Prevention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            প্রতিরোধ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.prevention.map((measure, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="flex-1">{measure}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Organic Solutions */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <span className="text-2xl">🌿</span>
            জৈব সমাধান
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.organicSolutions.map((solution, index) => (
              <li key={index} className="flex items-start gap-2 text-green-900">
                <span className="text-green-600 mt-1">•</span>
                <span className="flex-1">{solution}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          size="lg"
          variant="outline"
          className="h-14"
          onClick={onConsultExpert}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          বিশেষজ্ঞের পরামর্শ নিন
        </Button>
        <Button
          size="lg"
          className="h-14"
          onClick={onSave}
        >
          <Save className="h-5 w-5 mr-2" />
          রিপোর্ট সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
}

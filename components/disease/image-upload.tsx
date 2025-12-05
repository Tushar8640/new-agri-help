'use client';

import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  preview?: string;
  onClear?: () => void;
}

export function ImageUpload({ onImageSelect, preview, onClear }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  if (preview) {
    return (
      <Card className="relative">
        <CardContent className="p-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          {onClear && (
            <Button
              variant="destructive"
              size="sm"
              className="mt-3 w-full"
              onClick={onClear}
            >
              <X className="h-4 w-4 mr-2" />
              ছবি পরিবর্তন করুন
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors cursor-pointer ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">
              ছবি তুলুন অথবা আপলোড করুন
            </p>
            <p className="text-sm text-muted-foreground">
              ফসলের পাতা বা আক্রান্ত অংশের ছবি তুলুন
            </p>
          </div>
          <Button type="button" variant="outline" size="lg">
            ছবি নির্বাচন করুন
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileInput}
        />
      </CardContent>
    </Card>
  );
}

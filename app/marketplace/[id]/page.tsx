'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Minus, Plus, ShoppingCart, Star, MapPin, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEMO_PRODUCTS } from '@/lib/demo-products';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addItem } = useCartStore();

  const product = DEMO_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'bn' ? 'পণ্য পাওয়া যায়নি' : 'Product not found'}
          </h1>
          <Button onClick={() => router.push('/marketplace')}>
            {language === 'bn' ? 'বাজারে ফিরে যান' : 'Back to Marketplace'}
          </Button>
        </div>
      </div>
    );
  }

  const images = product.image ? [product.image] : [];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      quantity,
      unit: product.unit,
      image: product.image || '',
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      stock: product.stock,
    });
    router.push('/marketplace/cart');
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      quantity,
      unit: product.unit,
      image: product.image || '',
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      stock: product.stock,
    });
    router.push('/marketplace/checkout');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Image Carousel */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="aspect-square bg-muted relative">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex]}
                  alt={product.nameBn}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex - 1 + images.length) %
                            images.length
                        )
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + 1) % images.length
                        )
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {language === 'bn' ? 'ছবি নেই' : 'No image'}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 p-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                    idx === currentImageIndex
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.nameBn} ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold font-heading">
              {language === 'bn' ? product.nameBn : product.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'bn' ? product.categoryBn : product.category}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-600 text-yellow-600" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} {language === 'bn' ? 'রিভিউ' : 'reviews'})
              </span>
            </div>
            <Badge variant="secondary">
              {language === 'bn' ? product.categoryBn : product.category}
            </Badge>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              ৳{product.price}
            </span>
            <span className="text-muted-foreground">/{product.unit}</span>
          </div>

          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="destructive">
              {language === 'bn'
                ? `মাত্র ${product.stock} টি বাকি`
                : `Only ${product.stock} left`}
            </Badge>
          )}

          {product.stock === 0 && (
            <Badge variant="destructive">
              {language === 'bn' ? 'স্টক নেই' : 'Out of Stock'}
            </Badge>
          )}
        </div>

        {/* Seller Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>
                {language === 'bn' ? 'বিক্রেতা তথ্য' : 'Seller Information'}
              </span>
              {product.seller.verified && (
                <Badge className="bg-blue-600 gap-1">
                  <Shield className="h-3 w-3" />
                  {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="flex items-center justify-between">
              <span className="font-medium">{product.seller.name}</span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
                <span>{product.seller.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{product.seller.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Selector */}
        {product.stock > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {language === 'bn' ? 'পরিমাণ নির্বাচন করুন' : 'Select Quantity'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'মোট:' : 'Total:'}{' '}
                  <span className="text-lg font-bold text-primary">
                    ৳{product.price * quantity}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">
              {language === 'bn' ? 'বিবরণ' : 'Description'}
            </TabsTrigger>
            <TabsTrigger value="features" className="flex-1">
              {language === 'bn' ? 'বৈশিষ্ট্য' : 'Features'}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              {language === 'bn' ? 'রিভিউ' : 'Reviews'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed">
                  {language === 'bn'
                    ? product.descriptionBn
                    : product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  {language === 'bn'
                    ? 'রিভিউ শীঘ্রই আসছে...'
                    : 'Reviews coming soon...'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Action Bar */}
      {product.stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
            </Button>
            <Button className="flex-1" onClick={handleBuyNow}>
              {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Action Buttons */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-4">
          <Button
            size="lg"
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5" />
            {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}

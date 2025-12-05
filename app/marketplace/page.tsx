'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEMO_PRODUCTS, CATEGORIES, Product } from '@/lib/demo-products';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import Image from 'next/image';

export default function MarketplacePage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState('0');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const { addItem, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...DEMO_PRODUCTS];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameBn.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.categoryBn.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Rating filter
    if (minRating !== '0') {
      const minRatingNum = parseFloat(minRating);
      products = products.filter((p) => p.rating >= minRatingNum);
    }

    // Verified seller filter
    if (verifiedOnly) {
      products = products.filter((p) => p.seller.verified);
    }

    // Sort
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [searchQuery, selectedCategory, sortBy, minRating, verifiedOnly]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      quantity: 1,
      unit: product.unit,
      image: product.image || '',
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      stock: product.stock,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 space-y-4">
          {/* Title and Search */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary font-heading">
              {language === 'bn' ? 'বাজার' : 'Marketplace'}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={
                language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {language === 'bn' ? category.labelBn : category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Filters and Sort */}
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {language === 'bn' ? 'ফিল্টার' : 'Filters'}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">
                  {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                </SelectItem>
                <SelectItem value="price-low">
                  {language === 'bn' ? 'কম দাম' : 'Price: Low to High'}
                </SelectItem>
                <SelectItem value="price-high">
                  {language === 'bn' ? 'বেশি দাম' : 'Price: High to Low'}
                </SelectItem>
                <SelectItem value="rating">
                  {language === 'bn' ? 'রেটিং' : 'Rating'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-3 border">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {language === 'bn' ? 'ন্যূনতম রেটিং' : 'Minimum Rating'}
                </label>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      {language === 'bn' ? 'সব' : 'All'}
                    </SelectItem>
                    <SelectItem value="4">4★ & above</SelectItem>
                    <SelectItem value="4.5">4.5★ & above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="verified" className="text-sm cursor-pointer">
                  {language === 'bn'
                    ? 'শুধুমাত্র যাচাইকৃত বিক্রেতা'
                    : 'Verified sellers only'}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'bn'
                ? 'কোনো পণ্য পাওয়া যায়নি'
                : 'No products found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Link href={`/marketplace/${product.id}`}>
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.nameBn}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        {language === 'bn' ? 'ছবি নেই' : 'No image'}
                      </div>
                    )}
                    {product.seller.verified && (
                      <Badge className="absolute top-2 right-2 bg-blue-600">
                        ✓
                      </Badge>
                    )}
                  </div>
                </Link>

                <CardContent className="p-3 space-y-2">
                  <Link href={`/marketplace/${product.id}`}>
                    <h3 className="font-medium text-sm line-clamp-2 hover:text-primary">
                      {language === 'bn' ? product.nameBn : product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{product.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-600">★</span>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {product.seller.name}
                  </p>

                  {product.stock < 10 && (
                    <Badge variant="destructive" className="text-xs">
                      {language === 'bn'
                        ? `মাত্র ${product.stock} টি বাকি`
                        : `Only ${product.stock} left`}
                    </Badge>
                  )}
                </CardContent>

                <CardFooter className="p-3 pt-0">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0
                      ? language === 'bn'
                        ? 'স্টক নেই'
                        : 'Out of Stock'
                      : language === 'bn'
                        ? 'কার্টে যোগ করুন'
                        : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <Link
          href="/marketplace/cart"
          className="fixed bottom-20 md:bottom-8 right-4 z-20"
        >
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg relative"
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 rounded-full">
              {cartItemCount}
            </Badge>
          </Button>
        </Link>
      )}
    </div>
  );
}

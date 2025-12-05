# KrishiMitra - Project Plan (Part 1 of 2)

## Project Overview
**Name:** KrishiMitra (কৃষিমিত্র)  
**Tech:** Next.js 14, TypeScript, Tailwind, shadcn/ui, Prisma, PostgreSQL

## Colors
```
Primary Green: #16A34A, #15803D, #22C55E
Secondary Brown: #92400E
Accent Yellow: #EAB308
Background: #FAFAF5
Text: #1C1917, #57534E
```

---

# PLAN-1: Project Setup

## Prompt
```
Create Next.js 14 project "krishimitra" with:
1. App Router, TypeScript, Tailwind CSS, ESLint
2. shadcn/ui components: button, card, input, label, select, textarea, dialog, sheet, dropdown-menu, table, tabs, avatar, badge, toast, form, skeleton, separator, command, popover, calendar, accordion, alert
3. Dependencies: @prisma/client, @tanstack/react-query, zustand, react-hook-form, @hookform/resolvers, zod, next-auth, lucide-react, date-fns, framer-motion, recharts, uploadthing
4. Custom Tailwind colors: Primary green #16A34A, Secondary brown #92400E, Accent yellow #EAB308, Background #FAFAF5
5. Bengali fonts: Hind Siliguri (headings), Noto Sans Bengali (body)
6. Initialize Prisma with PostgreSQL
7. Create .env with DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
```

---

# PLAN-2: Database Schema

## Prompt
```
Create Prisma schema with models:

USER: id, phone (unique), email, password, name, nameBn, avatar, role (FARMER/SELLER/EXPERT/ADMIN), status, isVerified, language, division, district, upazila, village, farmSize, experience, primaryCrops[]

SELLER: id, userId, businessName, businessNameBn, businessType, isVerified, rating, totalSales, contactPhone, address, bkashNumber, nagadNumber, status

FARM: id, userId, name, size, sizeUnit (BIGHA/ACRE), division, district, soilType, irrigationType
FIELD: id, farmId, name, size, currentCropId, plantingDate, status (ACTIVE/FALLOW)
EXPENSE: id, farmId, category, description, amount, date
HARVEST: id, farmId, cropId, quantity, unit, harvestDate, soldPrice

CROP: id, name, nameBn, category, season[], growingDays, plantingGuide, careGuide
DISEASE: id, name, nameBn, type, symptoms[], treatment, prevention, severity
DISEASE_REPORT: id, userId, fieldId, diseaseId, images[], aiDetected, aiConfidence, status

PRODUCT: id, sellerId, name, nameBn, slug, category, price, unit, stock, images[], rating, status
SEED: id, cropId, variety, germination, suitableSeasons[], diseaseResistance[]
ORDER: id, orderNumber, userId, sellerId, total, deliveryAddress, paymentMethod (COD/BKASH/NAGAD), status
ORDER_ITEM: id, orderId, productId, quantity, price
REVIEW: id, userId, productId, rating, comment, images[]

MARKET: id, name, nameBn, type (WHOLESALE/RETAIL), division, district, marketDays[]
MARKET_PRICE: id, marketId, cropId, minPrice, maxPrice, avgPrice, trend, date
PRICE_ALERT: id, userId, cropId, alertType, targetPrice, isActive

COMMUNITY_POST: id, userId, type, title, content, images[], likeCount, commentCount
COMMENT: id, userId, postId, parentId, content
QUESTION: id, userId, title, content, category, isSolved, acceptedAnswerId
ANSWER: id, userId, questionId, content, upvotes, isAccepted

ARTICLE: id, slug, title, titleBn, content, category, authorName, viewCount
NOTIFICATION: id, userId, type, title, message, isRead

Add proper relations and indexes.
```

---

# PLAN-3: Authentication

## Prompt
```
Create auth system for KrishiMitra:

1. NextAuth.js with credentials provider (phone + OTP)
2. JWT with userId, role, name in token

3. API Routes:
   - POST /api/auth/send-otp: Validate BD phone (01X), generate 6-digit OTP, 5min expiry
   - POST /api/auth/verify-otp: Verify OTP, create user, return session
   - POST /api/auth/register: Create user with phone, name, location

4. Pages:
   - /login: Phone input, OTP input, countdown timer
   - /register: Phone, name, division dropdown, district dropdown
   - /verify: 6-digit OTP input with auto-focus

5. Middleware: Protect (main) routes, redirect auth pages if logged in

6. Hooks: useAuth(), useRequireAuth()

UI: Mobile-first, Bengali labels, 44px touch targets, loading states
```

---

# PLAN-4: Layout & Navigation

## Prompt
```
Create layout for KrishiMitra:

1. Main Layout:
   - Desktop: 240px sidebar + content
   - Mobile: Bottom navigation (5 items)
   - Header: Logo, search, notifications, user dropdown

2. Navigation Items (Bengali):
   - হোম - LayoutDashboard icon
   - রোগ নির্ণয় - Bug icon
   - বাজার - ShoppingBag icon
   - বাজার দর - TrendingUp icon
   - জ্ঞান - BookOpen icon
   - সম্প্রদায় - Users icon
   - খামার - Tractor icon

3. Sidebar: Logo "কৃষিমিত্র", nav items, user card at bottom

4. Mobile Bottom Nav: 5 items, center item larger (camera icon)

5. Header: Hamburger menu, search "অনুসন্ধান করুন...", notifications, language toggle বাং/EN

6. Breadcrumb: Auto from route, Bengali labels

Colors: Primary green active, muted inactive
```

---

# PLAN-5: Dashboard

## Prompt
```
Create dashboard at /dashboard:

1. Welcome: Time-based greeting (সুপ্রভাত/শুভ দুপুর/শুভ সন্ধ্যা), user name, date, weather widget

2. Quick Actions (2x2 grid):
   - রোগ শনাক্ত করুন - Camera, green
   - বাজার দর দেখুন - TrendingUp, yellow
   - পণ্য কিনুন - ShoppingCart, blue
   - প্রশ্ন করুন - HelpCircle, brown

3. আজকের বাজার দর: Top 5 crops (ধান, পেঁয়াজ, আলু, টমেটো, বেগুন), prices, trend arrows

4. এলাকায় সতর্কতা: Disease alerts in user's district, severity badge

5. Farm Summary: Total land, active crops, expenses, harvests

6. সম্প্রদায় থেকে: 3 recent posts with avatar, title, likes

Skeleton loading, pull-to-refresh, Bengali locale
```

---

# PLAN-6: Disease Detection

## Prompt
```
Create disease module:

1. /disease/detect:
   - Upload area "ছবি তুলুন অথবা আপলোড করুন"
   - Image preview, crop selector
   - "রোগ শনাক্ত করুন" button
   - Result: Disease name, confidence %, severity badge
   - Sections: লক্ষণ, চিকিৎসা, প্রতিরোধ, জৈব সমাধান
   - "বিশেষজ্ঞের পরামর্শ" and "সংরক্ষণ" buttons

2. /disease/history: Past reports list with filters

3. /disease/[id]: Full report details

4. API:
   - POST /api/disease/detect: Image to AI, return result
   - GET /api/disease/history: User reports
   - POST /api/disease/save: Save report

5. AI Prompt: "Analyze crop image for diseases. Return JSON with disease name, confidence, symptoms, treatment for Bangladesh agriculture."

Green theme, large touch targets, Bengali labels
```

---

# PLAN-7: Marketplace

## Prompt
```
Create marketplace module:

1. /marketplace:
   - Search bar, category tabs (সব, বীজ, সার, কীটনাশক, যন্ত্রপাতি)
   - Filters: Price, Rating, Location, Verified sellers
   - Sort: জনপ্রিয়, কম দাম, বেশি দাম
   - Product grid (2 cols mobile, 4 desktop)
   - Floating cart button

2. Product Card: Image, name, price (৳), rating, seller, "কার্টে যোগ করুন"

3. /marketplace/[id]: Image carousel, price, seller card, quantity, "কার্টে যোগ করুন", "এখনই কিনুন", tabs (বিবরণ, বৈশিষ্ট্য, রিভিউ)

4. /marketplace/cart: Items list, quantity, subtotal, "চেকআউট করুন"

5. /marketplace/checkout: Address form, Division>District, payment (COD/bKash/Nagad), "অর্ডার নিশ্চিত করুন"

6. /marketplace/orders: Order list with status badges
7. /marketplace/orders/[id]: Status timeline, items, cancel/review buttons

8. Cart Store (Zustand): items[], addItem, removeItem, updateQuantity, clearCart

9. API: GET/POST products, orders, reviews

BDT format, Bengali labels
```

---

# PLAN-8: Market Prices

## Prompt
```
Create market price module:

1. /market-price:
   - Location: Division>District selector
   - Date picker, crop search
   - Category tabs: সব, শাকসবজি, ফল, শস্য, মসলা
   - Price cards: Crop image, name, ৳XX-৳XX/কেজি, trend arrow, % change
   - "এলার্ট সেট করুন" on each

2. Price Detail Sheet: Today's price, quality grades, nearby markets, 7-day chart

3. /market-price/trends:
   - Crop/Market selectors
   - Time range: ৭ দিন, ১ মাস, ৩ মাস, ১ বছর
   - Line chart (Recharts)
   - Stats: সর্বোচ্চ, সর্বনিম্ন, গড়, পরিবর্তন%

4. /market-price/alerts:
   - Active alerts list with toggle
   - Create alert: Crop, market, দাম বাড়লে/কমলে, target price

5. API:
   - GET /api/market-price: Today's prices
   - GET /api/market-price/trends: Historical data
   - CRUD /api/price-alerts

Charts: green up, red down, gray stable
```

---

Continue to Part 2 for Plans 9-16...

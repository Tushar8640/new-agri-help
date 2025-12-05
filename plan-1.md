plaintext

# KrishiMitra (কৃষিমিত্র) - Complete Project Plan

## Project Overview

**Project Name:** KrishiMitra (কৃষিমিত্র) - "Farming Friend"  
**Purpose:** Digital platform for Bangladeshi farmers - disease detection, seed marketplace, market prices, knowledge sharing  
**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL

---

# PLAN-1: Project Initialization

## Requirements
- Create Next.js 14 project with App Router, TypeScript, Tailwind CSS
- Setup shadcn/ui component library
- Configure custom color theme (green primary, brown secondary, yellow accent)
- Setup Bengali fonts (Hind Siliguri, Noto Sans Bengali)
- Create basic folder structure
- Setup Prisma with PostgreSQL connection
- Configure environment variables

## Color Palette
```
Primary Green: #16A34A (main), #15803D (dark), #22C55E (light)
Secondary Brown: #92400E
Accent Yellow: #EAB308
Sky Blue: #0EA5E9
Background: #FAFAF5
Text: #1C1917 (primary), #57534E (muted)
Border: #E7E5E4
```

## Prompt for IDE
```
Create a Next.js 14 project called "krishimitra" with:
1. App Router, TypeScript, Tailwind CSS, ESLint
2. Install and setup shadcn/ui with these components: button, card, input, label, select, textarea, dialog, sheet, dropdown-menu, table, tabs, avatar, badge, toast, form, skeleton, separator, command, popover, calendar, accordion, alert
3. Install: @prisma/client, @tanstack/react-query, zustand, react-hook-form, @hookform/resolvers, zod, next-auth, lucide-react, date-fns, framer-motion, recharts, uploadthing
4. Configure Tailwind with custom colors:
   - Primary: green (#16A34A)
   - Secondary: brown (#92400E)
   - Accent: yellow (#EAB308)
   - Background: #FAFAF5
5. Setup Bengali fonts: Hind Siliguri for headings, Noto Sans Bengali for body
6. Initialize Prisma with PostgreSQL
7. Create .env file with DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL placeholders
```

---

# PLAN-2: Database Schema

## Requirements
- User management with phone-based auth (Bangladesh phone numbers)
- Multi-role system: FARMER, SELLER, EXPERT, ADMIN
- Location hierarchy: Division > District > Upazila > Village
- Bengali language support (nameBn fields)
- Farm and field tracking with soil types, irrigation
- Crop and disease database with symptoms, treatments
- Product marketplace with seeds, fertilizers, tools
- Order management with bKash/Nagad payment
- Market price tracking by location
- Community posts and Q&A
- Notifications system

## Main Tables
1. User, Seller (business profiles)
2. Farm, Field, FieldActivity, Expense, Harvest
3. Crop, Disease, CropDisease, DiseaseReport
4. Product, Seed, Order, OrderItem, Review
5. Market, MarketPrice, PriceAlert
6. CommunityPost, Comment, Like, Question, Answer
7. Article, ExpertConsultation, Message, Notification

## Prompt for IDE
```
Create Prisma schema for agricultural platform with these models:

USER & AUTH:
- User: id, phone (unique), email, password, name, nameBn, avatar, role (FARMER/SELLER/EXPERT/ADMIN), status, isVerified, language (BN/EN), division, district, upazila, village, farmSize, farmSizeUnit, experience, primaryCrops[], timestamps
- Seller: id, userId (unique), businessName, businessNameBn, businessType, description, logo, isVerified, rating, totalReviews, totalSales, contactPhone, address, division, district, bkashNumber, nagadNumber, status, timestamps

FARM MANAGEMENT:
- Farm: id, userId, name, nameBn, size, sizeUnit (BIGHA/ACRE/HECTARE), division, district, upazila, village, latitude, longitude, soilType, irrigationType, timestamps
- Field: id, farmId, name, size, currentCropId, plantingDate, expectedHarvest, status (ACTIVE/FALLOW/HARVESTED), timestamps
- FieldActivity: id, fieldId, activityType (PLANTING/FERTILIZING/WATERING/PESTICIDE/WEEDING/HARVESTING), description, date, cost, notes, images[], timestamp
- Expense: id, farmId, category (SEEDS/FERTILIZER/PESTICIDE/LABOR/IRRIGATION/EQUIPMENT/TRANSPORT), description, amount, date, receiptImage, timestamp
- Harvest: id, farmId, cropId, quantity, unit (KG/MON/QUINTAL/TON), quality, harvestDate, soldQuantity, soldPrice, notes, timestamp

CROPS & DISEASES:
- Crop: id, name, nameBn, nameLocal, scientificName, category (RICE/WHEAT/VEGETABLES/FRUITS/PULSES/OILSEEDS/SPICES/JUTE), image, season[], growingDays, optimalTemp, waterRequirement, soilTypes[], plantingGuide, careGuide, harvestGuide, timestamps
- Disease: id, name, nameBn, scientificName, type (FUNGAL/BACTERIAL/VIRAL/PEST/NUTRIENT_DEFICIENCY), description, descriptionBn, symptoms[], symptomsBn[], images[], treatment, treatmentBn, prevention, preventionBn, organicTreatment, chemicalTreatment, severity (LOW/MEDIUM/HIGH/CRITICAL), spreadRate, timestamps
- CropDisease: cropId, diseaseId, prevalence, peakSeason[] (composite key)
- DiseaseReport: id, userId, fieldId, diseaseId, images[], description, aiDetected, aiConfidence, aiSuggestions (JSON), division, district, latitude, longitude, status (PENDING/IDENTIFIED/UNDER_REVIEW/RESOLVED), expertReview, reviewedBy, reviewedAt, timestamps

MARKETPLACE:
- Product: id, sellerId, name, nameBn, slug (unique), description, descriptionBn, category (SEEDS/FERTILIZERS/PESTICIDES/TOOLS/EQUIPMENT/IRRIGATION), subcategory, tags[], price, comparePrice, unit (PIECE/KG/GRAM/LITER/PACKET/BAG), minOrderQty, stock, sku, images[], thumbnail, seedId, rating, totalReviews, totalSold, viewCount, status (DRAFT/ACTIVE/OUT_OF_STOCK), isFeatured, timestamps
- Seed: id, cropId, variety, varietyBn, brand, germination, purity, yieldPotential, maturityDays, suitableRegions[], suitableSoils[], suitableSeasons[], diseaseResistance[], pestResistance[], isCertified, certifications[], timestamps
- Order: id, orderNumber (unique), userId, sellerId, subtotal, deliveryFee, discount, total, deliveryAddress, deliveryDivision, deliveryDistrict, deliveryPhone, deliveryNotes, paymentMethod (COD/BKASH/NAGAD/ROCKET), paymentStatus (PENDING/PAID/FAILED/REFUNDED), transactionId, status (PENDING/CONFIRMED/PROCESSING/SHIPPED/DELIVERED/CANCELLED/RETURNED), cancelReason, estimatedDelivery, deliveredAt, timestamps
- OrderItem: id, orderId, productId, quantity, price, total
- OrderStatusHistory: id, orderId, status, note, timestamp
- Review: id, userId, productId, rating (1-5), title, comment, images[], isVerifiedPurchase, helpfulCount, timestamps (unique: userId+productId)
- SavedProduct: id, userId, productId, timestamp (unique: userId+productId)

MARKET PRICES:
- Market: id, name, nameBn, type (WHOLESALE/RETAIL/BOTH), division, district, upazila, address, latitude, longitude, marketDays[], openTime, closeTime, isActive, timestamps
- MarketPrice: id, marketId, cropId, minPrice, maxPrice, avgPrice, unit (PER_KG/PER_MON/PER_QUINTAL), quality (PREMIUM/GRADE_A/GRADE_B/GRADE_C), priceChange, priceChangePercent, trend (UP/DOWN/STABLE), source (MANUAL/DAM/API/CROWDSOURCED), reportedBy, date, timestamp
- PriceAlert: id, userId, cropId, marketId, alertType (PRICE_ABOVE/PRICE_BELOW/PRICE_CHANGE_PERCENT), targetPrice, isActive, lastTriggered, timestamp

COMMUNITY:
- CommunityPost: id, userId, type (GENERAL/SUCCESS_STORY/TIP/NEWS/EVENT), title, content, images[], category (GENERAL/CROPS/LIVESTOCK/MACHINERY/WEATHER/MARKET), tags[], cropId, viewCount, likeCount, commentCount, status (DRAFT/ACTIVE/HIDDEN), isPinned, timestamps
- Comment: id, userId, postId, parentId (self-reference for replies), content, images[], likeCount, status, timestamps
- Like: id, userId, postId, timestamp (unique: userId+postId)
- Question: id, userId, title, content, images[], category (DISEASE/PEST/CULTIVATION/SEEDS/FERTILIZER/WEATHER/MARKET/EQUIPMENT/GOVERNMENT_SCHEME), cropId, tags[], viewCount, answerCount, status, isSolved, acceptedAnswerId, timestamps
- Answer: id, userId, questionId, content, images[], upvotes, downvotes, isAccepted, status, timestamps

KNOWLEDGE:
- Article: id, slug (unique), title, titleBn, excerpt, content, contentBn, featuredImage, images[], videoUrl, category (GUIDE/NEWS/RESEARCH/GOVERNMENT_SCHEME/SUCCESS_STORY/TIPS/WEATHER/MARKET_ANALYSIS), tags[], cropId, authorName, authorRole, authorImage, viewCount, shareCount, readTime, status, isFeatured, publishedAt, timestamps

CONSULTATION:
- ExpertConsultation: id, farmerId, expertId, subject, description, images[], cropId, status (PENDING/IN_PROGRESS/RESOLVED/CLOSED), priority (LOW/NORMAL/HIGH/URGENT), response, responseImages[], respondedAt, rating, feedback, timestamps
- Message: id, consultationId, senderId, receiverId, content, images[], isRead, readAt, timestamp

NOTIFICATIONS:
- Notification: id, userId, type (ORDER/PRICE_ALERT/DISEASE_ALERT/WEATHER_ALERT/COMMUNITY/CONSULTATION/SYSTEM/PROMOTION), title, titleBn, message, messageBn, actionUrl, data (JSON), isRead, readAt, timestamp
- WeatherAlert: id, division, district, alertType (FLOOD/DROUGHT/STORM/HEATWAVE/COLDWAVE/HEAVY_RAIN/PEST_OUTBREAK), severity (LOW/MODERATE/HIGH/EXTREME), title, titleBn, description, descriptionBn, affectedCrops[], recommendations[], startsAt, endsAt, timestamp

Add proper indexes on frequently queried fields. Add all necessary relations between models.
```

---

# PLAN-3: Authentication System

## Requirements
- Phone number based registration (01XXXXXXXXX format)
- OTP verification via SMS
- NextAuth.js with credentials provider
- Session management with JWT
- Role-based access control
- Profile completion flow
- Password optional (OTP primary)

## Pages
- /login - Phone input + OTP
- /register - Phone, name, division, district
- /verify - OTP verification
- /complete-profile - Additional details after registration

## Prompt for IDE
```
Create authentication system for KrishiMitra with:

1. NextAuth.js configuration:
   - Credentials provider with phone + OTP
   - JWT strategy with user role in token
   - Custom sign-in page at /login
   - Session callback to include userId, role, name

2. Auth API routes:
   - POST /api/auth/send-otp: Validate BD phone (01X), generate 6-digit OTP, store in DB with 5min expiry, send SMS
   - POST /api/auth/verify-otp: Verify OTP, create/update user, return session
   - POST /api/auth/register: Create new user with phone, name, location

3. Auth pages with shadcn/ui:
   - /login: Phone input with BD format validation, OTP input after sending, "Send OTP" button with countdown timer
   - /register: Form with phone, name (Bengali support), division dropdown, district dropdown (filtered by division)
   - /verify: 6-digit OTP input with auto-focus, resend option with 60s cooldown

4. Middleware:
   - Protect /dashboard and all (main) routes
   - Redirect authenticated users from auth pages
   - Role-based route protection

5. Auth hooks:
   - useAuth(): Returns user, isLoading, isAuthenticated, login, logout, register
   - useRequireAuth(): Redirects to login if not authenticated

UI Requirements:
- Mobile-first design
- Bengali labels with English placeholders
- Large touch targets (min 44px)
- Loading states on all buttons
- Error messages in Bengali
```

---

# PLAN-4: Main Layout & Navigation

## Requirements
- Responsive layout (mobile-first)
- Bottom navigation for mobile
- Sidebar for desktop
- Header with user menu, notifications, language toggle
- Bengali/English language switch
- Breadcrumb navigation

## Navigation Items
1. হোম (Dashboard) - Home icon
2. রোগ নির্ণয় (Disease) - Bug icon
3. বাজার (Marketplace) - ShoppingBag icon
4. বাজার দর (Prices) - TrendingUp icon
5. জ্ঞান (Knowledge) - BookOpen icon
6. সম্প্রদায় (Community) - Users icon
7. খামার (Farm) - Tractor icon

## Prompt for IDE
```
Create main layout and navigation for KrishiMitra:

1. Main Layout (/app/(main)/layout.tsx):
   - Desktop: Fixed sidebar (240px) on left, main content area
   - Mobile: Full-width content with bottom navigation
   - Header: Logo, search bar, notification bell with badge, user avatar dropdown
   - Responsive breakpoint at 768px (md)

2. Sidebar Component:
   - Logo at top with app name "কৃষিমিত্র"
   - Navigation items with icons and Bengali labels
   - Active state with primary green background
   - User profile card at bottom with name, role badge
   - Collapse toggle for desktop

3. Mobile Bottom Navigation:
   - Fixed at bottom, 5 main items
   - Center item larger (Disease Detection with camera icon)
   - Active indicator with primary color
   - Labels below icons in Bengali

4. Header Component:
   - Hamburger menu for mobile (opens sheet with full nav)
   - Search input with Bangla placeholder "অনুসন্ধান করুন..."
   - Notification dropdown with recent notifications
   - User dropdown: Profile, Settings, Language toggle, Logout
   - Language toggle: বাং/EN switch

5. Navigation items with icons (lucide-react):
   - হোম (Home) - LayoutDashboard
   - রোগ নির্ণয় (Disease) - Bug
   - বাজার (Marketplace) - ShoppingBag
   - বাজার দর (Prices) - TrendingUp
   - জ্ঞান (Knowledge) - BookOpen
   - সম্প্রদায় (Community) - Users
   - খামার (Farm) - Tractor

6. Breadcrumb component:
   - Auto-generate from route
   - Bengali labels from route mapping
   - Home icon for first item

Colors: Use primary green for active states, muted text for inactive, background #FAFAF5
```

---

# PLAN-5: Dashboard Page

## Requirements
- Welcome message with user name
- Today's weather widget
- Quick action buttons
- Today's market prices summary (top 5 crops)
- Recent disease alerts in area
- Farm summary stats
- Recent community posts

## Prompt for IDE
```
Create dashboard page for KrishiMitra at /app/(main)/dashboard/page.tsx:

1. Welcome Section:
   - Greeting based on time (সুপ্রভাত/শুভ দুপুর/শুভ সন্ধ্যা)
   - User name in Bengali
   - Today's date in Bengali format
   - Weather widget: temperature, condition icon, rain probability

2. Quick Actions Grid (2x2 on mobile, 4 columns on desktop):
   - রোগ শনাক্ত করুন (Detect Disease) - Camera icon, primary green
   - বাজার দর দেখুন (View Prices) - TrendingUp icon, accent yellow
   - পণ্য কিনুন (Buy Products) - ShoppingCart icon, sky blue
   - প্রশ্ন করুন (Ask Question) - HelpCircle icon, secondary brown

3. Today's Market Prices Card:
   - Title: আজকের বাজার দর
   - Top 5 crops with prices (ধান, পেঁয়াজ, আলু, টমেটো, বেগুন)
   - Price trend arrow (up/down/stable)
   - "সব দেখুন" link to /market-price

4. Disease Alerts Card:
   - Title: আপনার এলাকায় সতর্কতা
   - Recent disease outbreaks in user's district
   - Severity badge (LOW/MEDIUM/HIGH)
   - Affected crop name
   - Empty state if no alerts

5. Farm Summary Card (if user has farms):
   - Total land size
   - Active crops count
   - Pending harvests
   - This month's expenses
   - Link to /farm

6. Recent Community Posts:
   - Title: সম্প্রদায় থেকে
   - 3 recent posts with author avatar, title, like count
   - Link to /community

7. Loading states with skeletons for each section
8. Pull-to-refresh on mobile
9. All text in Bengali with data formatted for BD locale
```

---

# PLAN-6: Disease Detection Module

## Requirements
- Camera/gallery image upload
- AI-powered disease detection (OpenAI Vision or Google Gemini)
- Disease details with symptoms, treatment
- Save report to history
- Expert consultation option
- Nearby disease outbreak map

## Pages
- /disease/detect - Upload and detect
- /disease/history - Past reports
- /disease/[id] - Report details

## Prompt for IDE
```
Create disease detection module for KrishiMitra:

1. Disease Detection Page (/disease/detect):
   - Large upload area with camera/gallery options
   - "ছবি তুলুন অথবা আপলোড করুন" instruction
   - Image preview after selection
   - Crop type selector (optional, helps AI accuracy)
   - "রোগ শনাক্ত করুন" submit button
   - Loading state with progress indicator
   
2. Detection Result Component:
   - Detected disease name (Bengali + English)
   - Confidence percentage with visual meter
   - Severity badge with color coding
   - Expandable sections:
     - লক্ষণ (Symptoms) - bullet list
     - চিকিৎসা (Treatment) - step by step
     - প্রতিরোধ (Prevention) - tips
     - জৈব সমাধান (Organic Solution)
     - রাসায়নিক সমাধান (Chemical Solution)
   - Related products from marketplace
   - "বিশেষজ্ঞের পরামর্শ নিন" button
   - "রিপোর্ট সংরক্ষণ করুন" save button

3. Disease History Page (/disease/history):
   - List of past reports with:
     - Thumbnail image
     - Disease name
     - Date
     - Status badge
   - Filter by: date range, crop, status
   - Empty state for no reports

4. Report Detail Page (/disease/[id]):
   - Full report with uploaded images
   - AI detection results
   - Expert review if available
   - Actions: Share, Get consultation, Delete

5. API Routes:
   - POST /api/disease/detect: Accept image, call AI API, return detection result
   - GET /api/disease/history: User's reports with pagination
   - GET /api/disease/[id]: Single report details
   - POST /api/disease/save: Save detection as report

6. AI Integration:
   - Use OpenAI Vision API or Google Gemini
   - Prompt: "Analyze this crop image for diseases. Identify the disease, confidence level, symptoms visible, and provide treatment recommendations suitable for Bangladesh agriculture. Respond in JSON format."
   - Fallback to manual expert review if confidence < 70%

UI: Green theme, large touch targets, Bengali labels, loading animations
```

---

# PLAN-7: Marketplace Module

## Requirements
- Product listing with filters
- Product details with reviews
- Shopping cart (Zustand store)
- Checkout with address and payment
- Order tracking
- Seller ratings and reviews

## Pages
- /marketplace - Product listing
- /marketplace/[id] - Product details
- /marketplace/cart - Shopping cart
- /marketplace/checkout - Checkout flow
- /marketplace/orders - Order history
- /marketplace/orders/[id] - Order details

## Prompt for IDE
```
Create marketplace module for KrishiMitra:

1. Product Listing Page (/marketplace):
   - Search bar with Bengali placeholder
   - Category tabs: সব, বীজ, সার, কীটনাশক, যন্ত্রপাতি
   - Filter sheet: Price range, Rating, Location, Verified sellers
   - Sort dropdown: জনপ্রিয়, কম দাম, বেশি দাম, নতুন
   - Product grid (2 columns mobile, 4 desktop)
   - Infinite scroll pagination
   - Floating cart button with item count

2. Product Card Component:
   - Product image with save/wishlist button
   - Product name (Bengali)
   - Price with old price strikethrough if discounted
   - Rating stars with review count
   - Seller name with verified badge
   - "কার্টে যোগ করুন" button

3. Product Detail Page (/marketplace/[id]):
   - Image carousel with zoom
   - Product name, price, unit
   - Seller card with rating, location, contact
   - Quantity selector
   - "কার্টে যোগ করুন" and "এখনই কিনুন" buttons
   - Product description tabs:
     - বিবরণ (Description)
     - বৈশিষ্ট্য (Features) - for seeds: germination %, suitable regions
     - রিভিউ (Reviews) with photos
   - Related products section

4. Cart Page (/marketplace/cart):
   - Cart items with image, name, quantity selector, price
   - Remove item button
   - Cart summary: Subtotal, delivery estimate
   - "চেকআউট করুন" button
   - Empty cart state with "কেনাকাটা শুরু করুন" link

5. Checkout Page (/marketplace/checkout):
   - Delivery address form:
     - Name, Phone
     - Division > District dropdown
     - Full address textarea
   - Saved addresses selection
   - Order summary
   - Payment method selection:
     - ক্যাশ অন ডেলিভারি (COD)
     - বিকাশ (bKash)
     - নগদ (Nagad)
   - "অর্ডার নিশ্চিত করুন" button

6. Order Success Page:
   - Success animation
   - Order number
   - Estimated delivery date
   - "অর্ডার ট্র্যাক করুন" button

7. Orders Page (/marketplace/orders):
   - Order list with status badges
   - Filter by status
   - Each order: Order number, date, total, status, items preview

8. Order Detail Page (/marketplace/orders/[id]):
   - Order status timeline
   - Items list
   - Delivery address
   - Payment info
   - Cancel button (if pending)
   - "রিভিউ দিন" button (if delivered)

9. Cart Store (Zustand):
   - items[], addItem, removeItem, updateQuantity, clearCart, total

10. API Routes:
    - GET /api/products: List with filters, pagination
    - GET /api/products/[id]: Product details with reviews
    - POST /api/orders: Create order
    - GET /api/orders: User's orders
    - GET /api/orders/[id]: Order details
    - PATCH /api/orders/[id]: Update status, cancel
    - POST /api/reviews: Add review

UI: Cards with shadows, price in BDT format, Bengali labels
```

---

# PLAN-8: Market Price Module

## Requirements
- Today's prices for all crops
- Price by market/location
- Historical price trends (charts)
- Price alerts
- Price comparison across markets

## Pages
- /market-price - Today's prices
- /market-price/trends - Historical trends
- /market-price/alerts - Manage alerts

## Prompt for IDE
```
Create market price module for KrishiMitra:

1. Today's Prices Page (/market-price):
   - Location selector: Division > District
   - Date selector (default today)
   - Search crop by name
   - Category filter tabs: সব, শাকসবজি, ফল, শস্য, মসলা
   - Price cards grid:
     - Crop image and name (Bengali)
     - Min-Max price range
     - Average price highlighted
     - Trend indicator (↑↓→) with color
     - Change percentage
   - "এলার্ট সেট করুন" button on each card

2. Price Card Component:
   - Crop thumbnail
   - Crop name in Bengali
   - Price: ৳XX - ৳XX /কেজি
   - Average: ৳XX
   - Trend arrow with percentage
   - Tap to see details

3. Price Detail Sheet (bottom sheet on tap):
   - Crop name and image
   - Today's price details
   - Price by quality grade (A/B/C)
   - Nearby markets with prices
   - 7-day mini chart
   - "বিস্তারিত দেখুন" link to trends
   - "এলার্ট সেট করুন" button

4. Price Trends Page (/market-price/trends):
   - Crop selector dropdown
   - Market selector
   - Time range: ৭ দিন, ১ মাস, ৩ মাস, ১ বছর
   - Line chart with Recharts:
     - Price on Y-axis
     - Date on X-axis
     - Min/Max/Avg lines
   - Statistics cards:
     - সর্বোচ্চ দাম (Highest)
     - সর্বনিম্ন দাম (Lowest)
     - গড় দাম (Average)
     - পরিবর্তন (Change %)
   - Best selling time recommendation
   - Compare with other markets toggle

5. Price Alerts Page (/market-price/alerts):
   - Active alerts list:
     - Crop name
     - Alert type (above/below)
     - Target price
     - Toggle to enable/disable
     - Delete button
   - "নতুন এলার্ট" button
   - Alert creation form:
     - Select crop
     - Select market (or all)
     - Alert when: দাম বাড়লে / দাম কমলে
     - Target price input
   - Empty state for no alerts

6. API Routes:
   - GET /api/market-price: Today's prices with filters
   - GET /api/market-price/[cropId]: Single crop prices across markets
   - GET /api/market-price/trends: Historical data for charts
   - GET /api/markets: List of markets
   - POST /api/price-alerts: Create alert
   - GET /api/price-alerts: User's alerts
   - DELETE /api/price-alerts/[id]: Remove alert

7. Data:
   - Seed database with major crops of Bangladesh
   - Major markets by district
   - Mock price data for development

UI: Charts in primary green, trend up in green, down in red, stable in gray
```

---

# PLAN-9: Knowledge Hub Module

## Requirements
- Farming articles and guides
- Crop-specific information
- Video tutorials
- Search and filter
- Bookmarks

## Pages
- /knowledge - Article listing
- /knowledge/articles/[slug] - Article detail
- /knowledge/crops - Crop guides
- /knowledge/crops/[id] - Crop detail
- /knowledge/videos - Video tutorials

## Prompt for IDE
```
Create knowledge hub module for KrishiMitra:

1. Knowledge Home Page (/knowledge):
   - Featured article banner/carousel
   - Category tabs: সব, চাষ গাইড, রোগ ও পোকা, সার ও সেচ, সরকারি প্রকল্প, সফলতার গল্প
   - Search bar
   - Article cards grid:
     - Featured image
     - Category badge
     - Title (Bengali)
     - Read time
     - View count
   - Quick links: ফসল তালিকা, ভিডিও টিউটোরিয়াল

2. Article Card Component:
   - Thumbnail image
   - Category badge (colored)
   - Title
   - Excerpt (2 lines)
   - Read time: X মিনিট পড়া
   - Bookmark button

3. Article Detail Page (/knowledge/articles/[slug]):
   - Featured image (full width)
   - Category and date
   - Title
   - Author info card
   - Article content (rich text)
   - Related crops tags
   - Share buttons
   - Related articles
   - Bookmark button

4. Crop Guides Page (/knowledge/crops):
   - Search crops
   - Category filter: ধান, সবজি, ফল, ডাল, তৈলবীজ, মসলা
   - Season filter: খরিফ, রবি, সারাবছর
   - Crop cards:
     - Crop image
     - Name (Bengali + English)
     - Season badges
     - Growing days

5. Crop Detail Page (/knowledge/crops/[id]):
   - Crop image gallery
   - Basic info: Name, Scientific name, Category
   - Growing info cards:
     - মৌসুম (Season)
     - সময়কাল (Duration)
     - তাপমাত্রা (Temperature)
     - মাটি (Soil type)
     - পানি (Water needs)
   - Tabs:
     - চাষ পদ্ধতি (Cultivation guide)
     - যত্ন (Care tips)
     - ফসল তোলা (Harvesting)
     - রোগ ও পোকা (Diseases) - links to disease details
   - Current market price widget
   - Available seeds in marketplace

6. Video Page (/knowledge/videos):
   - Video categories
   - Video cards with thumbnail, duration, title
   - Play in modal or new page
   - YouTube embed support

7. API Routes:
   - GET /api/articles: List with filters
   - GET /api/articles/[slug]: Article detail
   - GET /api/crops: Crop list with filters
   - GET /api/crops/[id]: Crop detail with diseases
   - POST /api/bookmarks: Save bookmark
   - GET /api/bookmarks: User's bookmarks

UI: Clean reading experience, good typography, Bengali-first content
```

---

# PLAN-10: Community Module

## Requirements
- Community posts feed
- Create posts with images
- Like and comment
- Q&A section
- Success stories
- Report inappropriate content

## Pages
- /community - Feed
- /community/posts/[id] - Post detail
- /community/questions - Q&A listing
- /community/questions/new - Ask question
- /community/questions/[id] - Question with answers

## Prompt for IDE
```
Create community module for KrishiMitra:

1. Community Feed Page (/community):
   - Create post button (floating on mobile)
   - Tab filters: সব, সাফল্যের গল্প, টিপস, প্রশ্ন-উত্তর
   - Post cards in feed:
     - Author avatar, name, time ago
     - Post content (expandable if long)
     - Images (grid if multiple)
     - Like button with count
     - Comment button with count
     - Share button
   - Infinite scroll

2. Create Post Sheet/Modal:
   - Textarea for content
   - Image upload (multiple)
   - Post type selector
   - Crop tag selector
   - "পোস্ট করুন" button

3. Post Detail Page (/community/posts/[id]):
   - Full post content
   - All images (swipeable)
   - Like and share actions
   - Comments section:
     - Comment input at bottom
     - Comments list with replies
     - Like on comments
   - Related posts

4. Questions Page (/community/questions):
   - "প্রশ্ন করুন" button
   - Filter: সব, অমীমাংসিত, সমাধান হয়েছে
   - Category filter
   - Question cards:
     - Title
     - Category badge
     - Answer count
     - Solved badge if applicable
     - Author and time

5. Ask Question Page (/community/questions/new):
   - Title input
   - Description textarea
   - Category selector
   - Related crop selector
   - Image upload
   - "প্রশ্ন জমা দিন" button

6. Question Detail Page (/community/questions/[id]):
   - Question with full details
   - Answer count
   - Answers list:
     - Answer content
     - Author info
     - Upvote/Downvote
     - "সঠিক উত্তর" badge if accepted
   - Answer input at bottom
   - Only question author can mark accepted answer

7. API Routes:
   - GET /api/community/posts: Feed with filters
   - POST /api/community/posts: Create post
   - GET /api/community/posts/[id]: Post detail
   - POST /api/community/posts/[id]/like: Toggle like
   - POST /api/community/posts/[id]/comments: Add comment
   - GET /api/community/questions: Questions list
   - POST /api/community/questions: Create question
   - GET /api/community/questions/[id]: Question with answers
   - POST /api/community/questions/[id]/answers: Add answer
   - PATCH /api/community/answers/[id]/accept: Mark as accepted

UI: Social media feel, easy interactions, Bengali timestamps (X মিনিট আগে)
```

---

# PLAN-11: Farm Management Module

## Requirements
- Multiple farms per user
- Fields within farms
- Activity logging
- Expense tracking
-
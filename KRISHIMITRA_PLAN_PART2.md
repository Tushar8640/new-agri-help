# KrishiMitra - Project Plan (Part 2 of 2)

# PLAN-9: Knowledge Hub

## Prompt
```
Create knowledge module:

1. /knowledge:
   - Featured article carousel
   - Category tabs: সব, চাষ গাইড, রোগ ও পোকা, সার ও সেচ, সরকারি প্রকল্প, সফলতার গল্প
   - Search bar
   - Article cards: Image, category badge, title, "X মিনিট পড়া", bookmark

2. /knowledge/articles/[slug]: Featured image, title, author, content, share, related articles

3. /knowledge/crops:
   - Search, category filter (ধান, সবজি, ফল, ডাল, মসলা)
   - Season filter: খরিফ, রবি, সারাবছর
   - Crop cards: Image, name (Bengali+English), season badges

4. /knowledge/crops/[id]:
   - Image gallery, basic info
   - Cards: মৌসুম, সময়কাল, তাপমাত্রা, মাটি, পানি
   - Tabs: চাষ পদ্ধতি, যত্ন, ফসল তোলা, রোগ ও পোকা
   - Current price widget, marketplace seeds

5. /knowledge/videos: Video cards with YouTube embed

6. API: GET articles, crops, bookmarks

Clean reading UX, Bengali-first
```

---

# PLAN-10: Community

## Prompt
```
Create community module:

1. /community:
   - Floating "পোস্ট করুন" button
   - Tabs: সব, সাফল্যের গল্প, টিপস, প্রশ্ন-উত্তর
   - Post cards: Avatar, name, time, content, images, like/comment/share
   - Infinite scroll

2. Create Post Modal: Textarea, image upload, post type, crop tags

3. /community/posts/[id]: Full content, images, comments section

4. /community/questions:
   - "প্রশ্ন করুন" button
   - Filters: সব, অমীমাংসিত, সমাধান হয়েছে
   - Question cards: Title, category, answer count, solved badge

5. /community/questions/new: Title, description, category, crop, images

6. /community/questions/[id]:
   - Question details
   - Answers with upvote/downvote
   - "সঠিক উত্তর" badge
   - Answer input

7. API:
   - CRUD posts, questions, answers
   - POST like, comment
   - PATCH accept answer

Social media feel, Bengali timestamps "X মিনিট আগে"
```

---

# PLAN-11: Farm Management

## Prompt
```
Create farm module:

1. /farm:
   - Farm selector (if multiple)
   - Summary cards: মোট জমি, সক্রিয় ফসল, এই মাসের খরচ, মোট ফলন
   - Quick actions: Add field, Log expense, Record harvest
   - Recent activities timeline

2. Add Farm Form: Name, size (বিঘা/একর), Division>District, soil type, irrigation

3. /farm/fields:
   - Field cards: Name, size, current crop, status badge, days since planting
   - Add field button

4. Field Detail: Info, crop, activity log, disease reports

5. Add Activity: Type (চারা রোপণ/সার/পানি/কীটনাশক/আগাছা/ফসল তোলা), date, cost, notes, photo

6. /farm/expenses:
   - Month selector, total card
   - Pie chart by category
   - Expense list
   - Add: Category (বীজ/সার/কীটনাশক/শ্রমিক/সেচ/যন্ত্রপাতি), amount, date

7. /farm/harvests:
   - Season filter
   - Harvest cards: Crop, quantity, quality, sold price
   - Add: Field, quantity (কেজি/মণ), quality, sold amount

8. /farm/analytics:
   - Period selector
   - Cards: Revenue, Expenses, Profit/Loss, ROI
   - Charts: Monthly expense bar, category pie, harvest trend, profit line
   - Export report

9. API: CRUD farms, fields, activities, expenses, harvests, analytics

Dashboard style, charts in primary colors
```

---

# PLAN-12: Profile & Settings

## Prompt
```
Create profile module:

1. /profile:
   - Header: Avatar (editable), name, role badge, location, member since
   - Stats: Orders, questions, posts, farms
   - Links: আমার অর্ডার, সংরক্ষিত পণ্য, আমার প্রশ্ন, আমার পোস্ট

2. Edit Profile: Avatar, name, phone (readonly), email, location, farm size, experience, primary crops

3. /profile/settings:
   - ভাষা: বাংলা/English toggle
   - নোটিফিকেশন: Push, SMS, Email, Price alerts, Disease alerts toggles
   - অ্যাকাউন্ট: Change password, Delete account
   - অন্যান্য: About, Privacy, Terms, Contact, Rate app

4. Become Seller: "বিক্রেতা হন" CTA, form with business name, type, bKash number, documents

5. /notifications:
   - "সব পড়া হয়েছে" button
   - Filter: সব, অপঠিত
   - List: Icon, title, message, time, unread dot
   - Swipe to delete

6. API: GET/PATCH profile, settings, notifications

Clean settings layout, confirmation dialogs
```

---

# PLAN-13: Landing Page

## Prompt
```
Create landing page at / (public):

1. Hero:
   - Gradient background with farming pattern
   - "বাংলাদেশের কৃষকদের ডিজিটাল সঙ্গী"
   - "ফসলের রোগ নির্ণয়, বাজার দর, বীজ কেনা - সব এক অ্যাপে"
   - CTAs: "শুরু করুন" (primary), "আরও জানুন"
   - Hero image/app screenshot

2. Features "কৃষিমিত্র দিয়ে যা করতে পারবেন":
   - রোগ শনাক্ত করুন - ছবি তুলে ফসলের রোগ জানুন
   - বাজার দর দেখুন - আজকের সব ফসলের দাম
   - বীজ ও সার কিনুন - যাচাইকৃত বিক্রেতা থেকে
   - জ্ঞান অর্জন করুন - চাষের গাইড ও টিপস
   - কৃষক সম্প্রদায় - প্রশ্ন করুন, অভিজ্ঞতা শেয়ার করুন
   - খামার ব্যবস্থাপনা - হিসাব রাখুন সহজে

3. How It Works "কিভাবে কাজ করে?":
   - অ্যাকাউন্ট খুলুন
   - ফসলের ছবি তুলুন
   - সমাধান পান

4. Stats (green background): X+ কৃষক, X+ বিক্রেতা, X+ রোগ, X+ জেলা

5. Testimonials "কৃষকরা যা বলছেন": Quote cards with name, location

6. CTA "আজই শুরু করুন": "ফ্রি রেজিস্ট্রেশন" button

7. Footer: Logo, links, social, copyright

Framer Motion animations, SEO meta tags
```

---

# PLAN-14: API Routes

## Prompt
```
Create API routes with proper patterns:

1. Response Format:
   - Success: { success: true, data: {...} }
   - Error: { success: false, error: string }
   - Paginated: { success: true, data: [], pagination: { page, limit, total } }

2. Auth middleware: withAuth wrapper, extract user, 401 if not authenticated

3. Validation: Zod schemas in /lib/validators/

4. Routes:

AUTH:
- POST /api/auth/send-otp
- POST /api/auth/verify-otp

USERS:
- GET/PATCH /api/users/me

DISEASE:
- POST /api/disease/detect
- GET /api/disease/history
- GET /api/disease/[id]

PRODUCTS:
- GET /api/products (filters: category, price, rating, search)
- GET /api/products/[id]

ORDERS:
- POST /api/orders
- GET /api/orders
- GET/PATCH /api/orders/[id]

REVIEWS:
- POST /api/reviews

MARKET PRICE:
- GET /api/market-price
- GET /api/market-price/trends
- CRUD /api/price-alerts

COMMUNITY:
- CRUD /api/posts
- POST /api/posts/[id]/like
- POST /api/posts/[id]/comments
- CRUD /api/questions
- POST /api/questions/[id]/answers

KNOWLEDGE:
- GET /api/articles
- GET /api/crops

FARM:
- CRUD /api/farms
- POST /api/farms/[id]/fields
- POST /api/farms/[id]/activities
- CRUD /api/expenses
- CRUD /api/harvests
- GET /api/farms/[id]/analytics

NOTIFICATIONS:
- GET /api/notifications
- PATCH /api/notifications/read-all

Error codes: AUTH_REQUIRED, INVALID_OTP, NOT_FOUND, VALIDATION_ERROR
```

---

# PLAN-15: Seed Data

## Prompt
```
Create seed data:

1. /constants/locations.ts - Bangladesh divisions and districts:
   - ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর, ময়মনসিংহ
   - Districts under each with Bengali names

2. /prisma/seed/crops.ts - Major BD crops:
   - ধান (Rice): আমন, বোরো, আউশ
   - গম, ভুট্টা, পাট, আলু, পেঁয়াজ, রসুন
   - টমেটো, বেগুন, ফুলকপি, বাঁধাকপি, লাউ, কুমড়া
   - শসা, করলা, ঢেঁড়স, মরিচ
   - আম, কাঁঠাল, কলা, পেঁপে, লিচু
   - মসুর, ছোলা, সরিষা
   - Fields: name, nameBn, category, seasons, growingDays

3. /prisma/seed/diseases.ts - Common diseases:
   - ধানের ব্লাস্ট, বাদামী দাগ
   - টমেটোর ঢলে পড়া
   - আলুর মড়ক
   - Fields: name, nameBn, type, symptoms, treatment, severity

4. /prisma/seed/markets.ts - Major markets:
   - কারওয়ান বাজার, শ্যামবাজার (Dhaka)
   - কাপ্তান বাজার (Chittagong)
   - Fields: name, nameBn, type, division, district, marketDays

5. /prisma/seed.ts: Import data, clear dev, insert all, create relations

Add to package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
```

---

# PLAN-16: Polish & Deploy

## Prompt
```
Final polish:

1. Loading: Skeleton components, page spinner, button loading, infinite scroll indicator

2. Errors: Global error boundary, API error toasts, offline detection, retry

3. Empty States: No products, no orders, no notifications, empty cart - with illustrations and CTAs

4. SEO:
   - Metadata: "কৃষিমিত্র - বাংলাদেশের কৃষকদের ডিজিটাল সঙ্গী"
   - OG tags, Twitter cards
   - Dynamic meta for products/articles
   - sitemap.xml, robots.txt

5. Performance:
   - Next/Image everywhere
   - Dynamic imports
   - API caching
   - Debounced search
   - Virtualized lists

6. PWA: next-pwa config, manifest.json, service worker, install prompt

7. Deploy to Vercel:
   - vercel.json
   - Env vars in dashboard
   - PostgreSQL on Railway/Neon
   - Domain setup

8. Checklist:
   - Mobile responsive
   - Bengali text renders
   - Forms validated
   - Bengali error messages
   - No console errors
```

---

# Summary Table

| Plan | Title | Focus |
|------|-------|-------|
| 1 | Project Setup | Dependencies, colors, fonts, Prisma |
| 2 | Database | All Prisma models and relations |
| 3 | Auth | Phone OTP, NextAuth, middleware |
| 4 | Layout | Sidebar, bottom nav, header |
| 5 | Dashboard | Widgets, quick actions, summary |
| 6 | Disease | AI detection, history, reports |
| 7 | Marketplace | Products, cart, orders, reviews |
| 8 | Prices | Today's prices, trends, alerts |
| 9 | Knowledge | Articles, crop guides, videos |
| 10 | Community | Posts, Q&A, comments |
| 11 | Farm | Fields, expenses, harvests, analytics |
| 12 | Profile | Settings, notifications, seller |
| 13 | Landing | Public homepage, features |
| 14 | APIs | All backend endpoints |
| 15 | Seed Data | BD locations, crops, diseases |
| 16 | Deploy | Polish, SEO, PWA, Vercel |

---

# Timeline

| Week | Plans | Deliverables |
|------|-------|--------------|
| 1-2 | 1, 2, 3 | Setup, database, auth |
| 3-4 | 4, 5, 6 | Layout, dashboard, disease |
| 5-6 | 7, 8 | Marketplace, prices |
| 7-8 | 9, 10 | Knowledge, community |
| 9-10 | 11, 12 | Farm, profile |
| 11 | 13, 14, 15 | Landing, APIs, seed |
| 12 | 16 | Polish, deploy |

---

# How to Use

1. Copy each PLAN's "Prompt" section
2. Paste into your AI coding assistant (Cursor, Copilot, Claude)
3. Work through plans sequentially
4. Each plan builds on previous ones

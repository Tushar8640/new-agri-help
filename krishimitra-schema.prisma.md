// KrishiMitra - Agricultural Platform Database Schema
// This schema is designed for the MVP using Next.js API routes
// Later migration to NestJS will use the same schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// USER & AUTHENTICATION
// ==========================================

model User {
  id                String    @id @default(cuid())
  phone             String    @unique // Primary login method for BD farmers
  email             String?   @unique
  password          String?
  name              String
  namebn            String?   @map("name_bn") // Bengali name
  avatar            String?
  role              UserRole  @default(FARMER)
  status            UserStatus @default(ACTIVE)
  isVerified        Boolean   @default(false) @map("is_verified")
  language          Language  @default(BN)
  
  // Location
  division          String?
  district          String?
  upazila           String?
  village           String?
  
  // Profile details
  farmSize          Float?    @map("farm_size") // in bigha/acres
  farmSizeUnit      FarmSizeUnit? @map("farm_size_unit")
  experience        Int?      // years of farming experience
  primaryCrops      String[]  @map("primary_crops")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  lastLoginAt       DateTime? @map("last_login_at")
  
  // Relations
  farms             Farm[]
  diseaseReports    DiseaseReport[]
  orders            Order[]
  reviews           Review[]
  posts             CommunityPost[]
  comments          Comment[]
  likes             Like[]
  questions         Question[]
  answers           Answer[]
  priceAlerts       PriceAlert[]
  notifications     Notification[]
  expertConsults    ExpertConsultation[] @relation("FarmerConsultations")
  expertSessions    ExpertConsultation[] @relation("ExpertConsultations")
  sellerProfile     Seller?
  savedProducts     SavedProduct[]
  messagesSent      Message[] @relation("MessagesSent")
  messagesReceived  Message[] @relation("MessagesReceived")
  
  @@map("users")
}

model Seller {
  id                String    @id @default(cuid())
  userId            String    @unique @map("user_id")
  businessName      String    @map("business_name")
  businessNameBn    String?   @map("business_name_bn")
  businessType      BusinessType @map("business_type")
  description       String?
  logo              String?
  coverImage        String?   @map("cover_image")
  
  // Verification & Trust
  isVerified        Boolean   @default(false) @map("is_verified")
  verificationDocs  String[]  @map("verification_docs")
  rating            Float     @default(0)
  totalReviews      Int       @default(0) @map("total_reviews")
  totalSales        Int       @default(0) @map("total_sales")
  
  // Contact & Address
  contactPhone      String    @map("contact_phone")
  contactEmail      String?   @map("contact_email")
  address           String
  division          String
  district          String
  
  // Banking
  bankName          String?   @map("bank_name")
  accountNumber     String?   @map("account_number")
  bkashNumber       String?   @map("bkash_number")
  nagadNumber       String?   @map("nagad_number")
  
  status            SellerStatus @default(PENDING)
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  products          Product[]
  orders            Order[]
  
  @@map("sellers")
}

// ==========================================
// FARM MANAGEMENT
// ==========================================

model Farm {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  name              String
  nameBn            String?   @map("name_bn")
  size              Float     // in bigha
  sizeUnit          FarmSizeUnit @default(BIGHA) @map("size_unit")
  
  // Location
  division          String
  district          String
  upazila           String?
  village           String?
  latitude          Float?
  longitude         Float?
  
  // Soil & Water
  soilType          SoilType? @map("soil_type")
  irrigationType    IrrigationType? @map("irrigation_type")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  fields            Field[]
  expenses          Expense[]
  harvests          Harvest[]
  
  @@map("farms")
}

model Field {
  id                String    @id @default(cuid())
  farmId            String    @map("farm_id")
  name              String
  size              Float     // in bigha
  
  // Current crop
  currentCropId     String?   @map("current_crop_id")
  plantingDate      DateTime? @map("planting_date")
  expectedHarvest   DateTime? @map("expected_harvest")
  status            FieldStatus @default(FALLOW)
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  farm              Farm      @relation(fields: [farmId], references: [id], onDelete: Cascade)
  currentCrop       Crop?     @relation(fields: [currentCropId], references: [id])
  activities        FieldActivity[]
  diseaseReports    DiseaseReport[]
  
  @@map("fields")
}

model FieldActivity {
  id                String    @id @default(cuid())
  fieldId           String    @map("field_id")
  activityType      ActivityType @map("activity_type")
  description       String?
  date              DateTime
  cost              Float?
  notes             String?
  images            String[]
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  field             Field     @relation(fields: [fieldId], references: [id], onDelete: Cascade)
  
  @@map("field_activities")
}

model Expense {
  id                String    @id @default(cuid())
  farmId            String    @map("farm_id")
  category          ExpenseCategory
  description       String
  amount            Float
  date              DateTime
  receiptImage      String?   @map("receipt_image")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  farm              Farm      @relation(fields: [farmId], references: [id], onDelete: Cascade)
  
  @@map("expenses")
}

model Harvest {
  id                String    @id @default(cuid())
  farmId            String    @map("farm_id")
  cropId            String    @map("crop_id")
  quantity          Float
  unit              HarvestUnit
  quality           CropQuality?
  harvestDate       DateTime  @map("harvest_date")
  soldQuantity      Float?    @map("sold_quantity")
  soldPrice         Float?    @map("sold_price")
  notes             String?
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  farm              Farm      @relation(fields: [farmId], references: [id], onDelete: Cascade)
  crop              Crop      @relation(fields: [cropId], references: [id])
  
  @@map("harvests")
}

// ==========================================
// CROPS & DISEASES
// ==========================================

model Crop {
  id                String    @id @default(cuid())
  name              String
  nameBn            String    @map("name_bn")
  nameLocal         String?   @map("name_local") // Regional names
  scientificName    String?   @map("scientific_name")
  category          CropCategory
  image             String?
  
  // Growing info
  season            Season[]
  growingDays       Int?      @map("growing_days")
  optimalTemp       String?   @map("optimal_temp") // e.g., "20-30°C"
  waterRequirement  WaterRequirement? @map("water_requirement")
  soilTypes         SoilType[] @map("soil_types")
  
  // Guides
  plantingGuide     String?   @map("planting_guide")
  careGuide         String?   @map("care_guide")
  harvestGuide      String?   @map("harvest_guide")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  diseases          CropDisease[]
  fields            Field[]
  harvests          Harvest[]
  marketPrices      MarketPrice[]
  seeds             Seed[]
  
  @@map("crops")
}

model Disease {
  id                String    @id @default(cuid())
  name              String
  nameBn            String    @map("name_bn")
  scientificName    String?   @map("scientific_name")
  type              DiseaseType
  description       String
  descriptionBn     String?   @map("description_bn")
  
  // Identification
  symptoms          String[]
  symptomsBn        String[]  @map("symptoms_bn")
  images            String[]
  
  // Treatment
  treatment         String
  treatmentBn       String?   @map("treatment_bn")
  prevention        String
  preventionBn      String?   @map("prevention_bn")
  organicTreatment  String?   @map("organic_treatment")
  chemicalTreatment String?   @map("chemical_treatment")
  
  // Severity
  severity          DiseaseSeverity
  spreadRate        SpreadRate? @map("spread_rate")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  crops             CropDisease[]
  reports           DiseaseReport[]
  
  @@map("diseases")
}

model CropDisease {
  cropId            String    @map("crop_id")
  diseaseId         String    @map("disease_id")
  prevalence        Prevalence?
  peakSeason        Season[]  @map("peak_season")
  
  crop              Crop      @relation(fields: [cropId], references: [id], onDelete: Cascade)
  disease           Disease   @relation(fields: [diseaseId], references: [id], onDelete: Cascade)
  
  @@id([cropId, diseaseId])
  @@map("crop_diseases")
}

model DiseaseReport {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  fieldId           String?   @map("field_id")
  diseaseId         String?   @map("disease_id") // Null if AI couldn't identify
  
  // Report details
  images            String[]
  description       String?
  
  // AI Detection
  aiDetected        Boolean   @default(false) @map("ai_detected")
  aiConfidence      Float?    @map("ai_confidence")
  aiSuggestions     Json?     @map("ai_suggestions")
  
  // Location
  division          String?
  district          String?
  latitude          Float?
  longitude         Float?
  
  // Status
  status            ReportStatus @default(PENDING)
  expertReview      String?   @map("expert_review")
  reviewedBy        String?   @map("reviewed_by")
  reviewedAt        DateTime? @map("reviewed_at")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  field             Field?    @relation(fields: [fieldId], references: [id])
  disease           Disease?  @relation(fields: [diseaseId], references: [id])
  
  @@map("disease_reports")
}

// ==========================================
// MARKETPLACE
// ==========================================

model Product {
  id                String    @id @default(cuid())
  sellerId          String    @map("seller_id")
  name              String
  nameBn            String?   @map("name_bn")
  slug              String    @unique
  description       String
  descriptionBn     String?   @map("description_bn")
  
  // Categorization
  category          ProductCategory
  subcategory       String?
  tags              String[]
  
  // Pricing
  price             Float
  comparePrice      Float?    @map("compare_price") // Original price for discounts
  unit              ProductUnit
  minOrderQty       Int       @default(1) @map("min_order_qty")
  
  // Inventory
  stock             Int       @default(0)
  sku               String?
  
  // Media
  images            String[]
  thumbnail         String?
  
  // Details (for seeds)
  seedId            String?   @map("seed_id")
  
  // Stats
  rating            Float     @default(0)
  totalReviews      Int       @default(0) @map("total_reviews")
  totalSold         Int       @default(0) @map("total_sold")
  viewCount         Int       @default(0) @map("view_count")
  
  // Status
  status            ProductStatus @default(DRAFT)
  isFeatured        Boolean   @default(false) @map("is_featured")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  seller            Seller    @relation(fields: [sellerId], references: [id], onDelete: Cascade)
  seed              Seed?     @relation(fields: [seedId], references: [id])
  orderItems        OrderItem[]
  reviews           Review[]
  savedBy           SavedProduct[]
  
  @@index([category])
  @@index([sellerId])
  @@map("products")
}

model Seed {
  id                String    @id @default(cuid())
  cropId            String    @map("crop_id")
  variety           String
  varietyBn         String?   @map("variety_bn")
  brand             String?
  
  // Characteristics
  germination       Float?    // percentage
  purity            Float?    // percentage
  yieldPotential    String?   @map("yield_potential")
  maturityDays      Int?      @map("maturity_days")
  
  // Suitability
  suitableRegions   String[]  @map("suitable_regions")
  suitableSoils     SoilType[] @map("suitable_soils")
  suitableSeasons   Season[]  @map("suitable_seasons")
  
  // Resistance
  diseaseResistance String[]  @map("disease_resistance")
  pestResistance    String[]  @map("pest_resistance")
  
  // Certifications
  isCertified       Boolean   @default(false) @map("is_certified")
  certifications    String[]
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  crop              Crop      @relation(fields: [cropId], references: [id])
  products          Product[]
  
  @@map("seeds")
}

model Order {
  id                String    @id @default(cuid())
  orderNumber       String    @unique @map("order_number")
  userId            String    @map("user_id")
  sellerId          String    @map("seller_id")
  
  // Totals
  subtotal          Float
  deliveryFee       Float     @map("delivery_fee")
  discount          Float     @default(0)
  total             Float
  
  // Delivery
  deliveryAddress   String    @map("delivery_address")
  deliveryDivision  String    @map("delivery_division")
  deliveryDistrict  String    @map("delivery_district")
  deliveryPhone     String    @map("delivery_phone")
  deliveryNotes     String?   @map("delivery_notes")
  
  // Payment
  paymentMethod     PaymentMethod @map("payment_method")
  paymentStatus     PaymentStatus @default(PENDING) @map("payment_status")
  transactionId     String?   @map("transaction_id")
  
  // Status
  status            OrderStatus @default(PENDING)
  cancelReason      String?   @map("cancel_reason")
  
  // Tracking
  estimatedDelivery DateTime? @map("estimated_delivery")
  deliveredAt       DateTime? @map("delivered_at")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id])
  seller            Seller    @relation(fields: [sellerId], references: [id])
  items             OrderItem[]
  statusHistory     OrderStatusHistory[]
  
  @@index([userId])
  @@index([sellerId])
  @@map("orders")
}

model OrderItem {
  id                String    @id @default(cuid())
  orderId           String    @map("order_id")
  productId         String    @map("product_id")
  quantity          Int
  price             Float     // Price at time of order
  total             Float
  
  // Relations
  order             Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product           Product   @relation(fields: [productId], references: [id])
  
  @@map("order_items")
}

model OrderStatusHistory {
  id                String    @id @default(cuid())
  orderId           String    @map("order_id")
  status            OrderStatus
  note              String?
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  order             Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@map("order_status_history")
}

model Review {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  productId         String    @map("product_id")
  rating            Int       // 1-5
  title             String?
  comment           String?
  images            String[]
  
  // Verification
  isVerifiedPurchase Boolean  @default(false) @map("is_verified_purchase")
  
  // Helpful votes
  helpfulCount      Int       @default(0) @map("helpful_count")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  product           Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([userId, productId])
  @@map("reviews")
}

model SavedProduct {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  productId         String    @map("product_id")
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  product           Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([userId, productId])
  @@map("saved_products")
}

// ==========================================
// MARKET PRICES & ANALYTICS
// ==========================================

model Market {
  id                String    @id @default(cuid())
  name              String
  nameBn            String    @map("name_bn")
  type              MarketType
  
  // Location
  division          String
  district          String
  upazila           String?
  address           String?
  latitude          Float?
  longitude         Float?
  
  // Operations
  marketDays        String[]  @map("market_days") // e.g., ["Saturday", "Wednesday"]
  openTime          String?   @map("open_time")
  closeTime         String?   @map("close_time")
  
  isActive          Boolean   @default(true) @map("is_active")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  prices            MarketPrice[]
  
  @@map("markets")
}

model MarketPrice {
  id                String    @id @default(cuid())
  marketId          String    @map("market_id")
  cropId            String    @map("crop_id")
  
  // Prices
  minPrice          Float     @map("min_price")
  maxPrice          Float     @map("max_price")
  avgPrice          Float     @map("avg_price")
  unit              PriceUnit
  
  // Quality grades
  quality           CropQuality?
  
  // Trends
  priceChange       Float?    @map("price_change") // vs yesterday
  priceChangePercent Float?   @map("price_change_percent")
  trend             PriceTrend?
  
  // Source
  source            PriceSource @default(MANUAL)
  reportedBy        String?   @map("reported_by")
  
  date              DateTime  @default(now())
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  market            Market    @relation(fields: [marketId], references: [id], onDelete: Cascade)
  crop              Crop      @relation(fields: [cropId], references: [id])
  
  @@index([marketId, cropId, date])
  @@map("market_prices")
}

model PriceAlert {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  cropId            String    @map("crop_id")
  marketId          String?   @map("market_id") // Null = all markets
  
  // Alert conditions
  alertType         AlertType @map("alert_type")
  targetPrice       Float     @map("target_price")
  
  isActive          Boolean   @default(true) @map("is_active")
  lastTriggered     DateTime? @map("last_triggered")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("price_alerts")
}

// ==========================================
// COMMUNITY & KNOWLEDGE
// ==========================================

model CommunityPost {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  type              PostType
  title             String
  content           String
  images            String[]
  
  // Categorization
  category          PostCategory?
  tags              String[]
  cropId            String?   @map("crop_id")
  
  // Stats
  viewCount         Int       @default(0) @map("view_count")
  likeCount         Int       @default(0) @map("like_count")
  commentCount      Int       @default(0) @map("comment_count")
  
  // Status
  status            ContentStatus @default(ACTIVE)
  isPinned          Boolean   @default(false) @map("is_pinned")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  comments          Comment[]
  likes             Like[]
  
  @@index([category])
  @@map("community_posts")
}

model Comment {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  postId            String    @map("post_id")
  parentId          String?   @map("parent_id") // For replies
  content           String
  images            String[]
  
  likeCount         Int       @default(0) @map("like_count")
  status            ContentStatus @default(ACTIVE)
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  post              CommunityPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent            Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies           Comment[] @relation("CommentReplies")
  
  @@map("comments")
}

model Like {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  postId            String    @map("post_id")
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  post              CommunityPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  @@unique([userId, postId])
  @@map("likes")
}

model Question {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  title             String
  content           String
  images            String[]
  
  // Categorization
  category          QuestionCategory
  cropId            String?   @map("crop_id")
  tags              String[]
  
  // Stats
  viewCount         Int       @default(0) @map("view_count")
  answerCount       Int       @default(0) @map("answer_count")
  
  // Status
  status            ContentStatus @default(ACTIVE)
  isSolved          Boolean   @default(false) @map("is_solved")
  acceptedAnswerId  String?   @map("accepted_answer_id")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  answers           Answer[]
  
  @@index([category])
  @@map("questions")
}

model Answer {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  questionId        String    @map("question_id")
  content           String
  images            String[]
  
  // Voting
  upvotes           Int       @default(0)
  downvotes         Int       @default(0)
  isAccepted        Boolean   @default(false) @map("is_accepted")
  
  status            ContentStatus @default(ACTIVE)
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  question          Question  @relation(fields: [questionId], references: [id], onDelete: Cascade)
  
  @@map("answers")
}

model Article {
  id                String    @id @default(cuid())
  slug              String    @unique
  title             String
  titleBn           String?   @map("title_bn")
  excerpt           String?
  content           String
  contentBn         String?   @map("content_bn")
  
  // Media
  featuredImage     String?   @map("featured_image")
  images            String[]
  videoUrl          String?   @map("video_url")
  
  // Categorization
  category          ArticleCategory
  tags              String[]
  cropId            String?   @map("crop_id")
  
  // Author
  authorName        String    @map("author_name")
  authorRole        String?   @map("author_role")
  authorImage       String?   @map("author_image")
  
  // Stats
  viewCount         Int       @default(0) @map("view_count")
  shareCount        Int       @default(0) @map("share_count")
  readTime          Int?      @map("read_time") // minutes
  
  // Status
  status            ContentStatus @default(DRAFT)
  isFeatured        Boolean   @default(false) @map("is_featured")
  
  publishedAt       DateTime? @map("published_at")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  @@index([category])
  @@map("articles")
}

// ==========================================
// EXPERT CONSULTATION
// ==========================================

model ExpertConsultation {
  id                String    @id @default(cuid())
  farmerId          String    @map("farmer_id")
  expertId          String    @map("expert_id")
  
  // Consultation details
  subject           String
  description       String
  images            String[]
  cropId            String?   @map("crop_id")
  
  // Status
  status            ConsultationStatus @default(PENDING)
  priority          Priority @default(NORMAL)
  
  // Response
  response          String?
  responseImages    String[]  @map("response_images")
  respondedAt       DateTime? @map("responded_at")
  
  // Rating
  rating            Int?
  feedback          String?
  
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  // Relations
  farmer            User      @relation("FarmerConsultations", fields: [farmerId], references: [id])
  expert            User      @relation("ExpertConsultations", fields: [expertId], references: [id])
  messages          Message[]
  
  @@map("expert_consultations")
}

model Message {
  id                String    @id @default(cuid())
  consultationId    String    @map("consultation_id")
  senderId          String    @map("sender_id")
  receiverId        String    @map("receiver_id")
  content           String
  images            String[]
  
  isRead            Boolean   @default(false) @map("is_read")
  readAt            DateTime? @map("read_at")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  consultation      ExpertConsultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
  sender            User      @relation("MessagesSent", fields: [senderId], references: [id])
  receiver          User      @relation("MessagesReceived", fields: [receiverId], references: [id])
  
  @@map("messages")
}

// ==========================================
// NOTIFICATIONS
// ==========================================

model Notification {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  type              NotificationType
  title             String
  titleBn           String?   @map("title_bn")
  message           String
  messageBn         String?   @map("message_bn")
  
  // Action
  actionUrl         String?   @map("action_url")
  data              Json?
  
  isRead            Boolean   @default(false) @map("is_read")
  readAt            DateTime? @map("read_at")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, isRead])
  @@map("notifications")
}

// ==========================================
// WEATHER (Optional integration)
// ==========================================

model WeatherAlert {
  id                String    @id @default(cuid())
  division          String
  district          String?
  
  alertType         WeatherAlertType @map("alert_type")
  severity          AlertSeverity
  title             String
  titleBn           String?   @map("title_bn")
  description       String
  descriptionBn     String?   @map("description_bn")
  
  // Impact
  affectedCrops     String[]  @map("affected_crops")
  recommendations   String[]
  
  startsAt          DateTime  @map("starts_at")
  endsAt            DateTime? @map("ends_at")
  
  createdAt         DateTime  @default(now()) @map("created_at")
  
  @@map("weather_alerts")
}

// ==========================================
// ENUMS
// ==========================================

enum UserRole {
  FARMER
  SELLER
  EXPERT
  ADMIN
  MODERATOR
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  BANNED
}

enum Language {
  BN
  EN
}

enum FarmSizeUnit {
  BIGHA
  ACRE
  HECTARE
  KATHA
  DECIMAL
}

enum SoilType {
  CLAY
  SANDY
  LOAMY
  SILT
  PEAT
  CHALKY
  ALLUVIAL
}

enum IrrigationType {
  RAINFED
  CANAL
  TUBEWELL
  POND
  RIVER
  DRIP
  SPRINKLER
}

enum FieldStatus {
  ACTIVE
  FALLOW
  HARVESTED
  PREPARATION
}

enum ActivityType {
  PLANTING
  FERTILIZING
  WATERING
  PESTICIDE
  WEEDING
  HARVESTING
  SOIL_PREPARATION
  PRUNING
  OTHER
}

enum ExpenseCategory {
  SEEDS
  FERTILIZER
  PESTICIDE
  LABOR
  IRRIGATION
  EQUIPMENT
  TRANSPORT
  OTHER
}

enum HarvestUnit {
  KG
  MON  // মণ (40 kg)
  QUINTAL
  TON
}

enum CropCategory {
  RICE
  WHEAT
  VEGETABLES
  FRUITS
  PULSES
  OILSEEDS
  SPICES
  JUTE
  SUGARCANE
  TEA
  FLOWERS
  OTHER
}

enum Season {
  KHARIF    // Monsoon (Apr-Oct)
  RABI      // Winter (Oct-Mar)
  ZAID      // Summer (Mar-Jun)
  ALL_YEAR
}

enum WaterRequirement {
  LOW
  MEDIUM
  HIGH
  VERY_HIGH
}

enum DiseaseType {
  FUNGAL
  BACTERIAL
  VIRAL
  PEST
  NUTRIENT_DEFICIENCY
  ENVIRONMENTAL
  OTHER
}

enum DiseaseSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum SpreadRate {
  SLOW
  MODERATE
  FAST
  VERY_FAST
}

enum Prevalence {
  RARE
  UNCOMMON
  COMMON
  VERY_COMMON
}

enum ReportStatus {
  PENDING
  IDENTIFIED
  UNDER_REVIEW
  RESOLVED
  DISMISSED
}

enum ProductCategory {
  SEEDS
  FERTILIZERS
  PESTICIDES
  TOOLS
  EQUIPMENT
  IRRIGATION
  PACKAGING
  OTHER
}

enum ProductUnit {
  PIECE
  KG
  GRAM
  LITER
  ML
  PACKET
  BAG
  BOX
}

enum ProductStatus {
  DRAFT
  ACTIVE
  OUT_OF_STOCK
  DISCONTINUED
}

enum BusinessType {
  INDIVIDUAL
  COMPANY
  COOPERATIVE
  GOVERNMENT
}

enum SellerStatus {
  PENDING
  APPROVED
  SUSPENDED
  REJECTED
}

enum PaymentMethod {
  COD
  BKASH
  NAGAD
  ROCKET
  BANK_TRANSFER
  CARD
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum MarketType {
  WHOLESALE
  RETAIL
  BOTH
}

enum PriceUnit {
  PER_KG
  PER_MON
  PER_QUINTAL
  PER_PIECE
  PER_DOZEN
}

enum CropQuality {
  PREMIUM
  GRADE_A
  GRADE_B
  GRADE_C
}

enum PriceTrend {
  UP
  DOWN
  STABLE
}

enum PriceSource {
  MANUAL
  DAM     // Department of Agricultural Marketing
  API
  CROWDSOURCED
}

enum AlertType {
  PRICE_ABOVE
  PRICE_BELOW
  PRICE_CHANGE_PERCENT
}

enum PostType {
  GENERAL
  SUCCESS_STORY
  TIP
  NEWS
  EVENT
}

enum PostCategory {
  GENERAL
  CROPS
  LIVESTOCK
  MACHINERY
  WEATHER
  MARKET
  GOVERNMENT
}

enum QuestionCategory {
  DISEASE
  PEST
  CULTIVATION
  SEEDS
  FERTILIZER
  WEATHER
  MARKET
  EQUIPMENT
  GOVERNMENT_SCHEME
  OTHER
}

enum ArticleCategory {
  GUIDE
  NEWS
  RESEARCH
  GOVERNMENT_SCHEME
  SUCCESS_STORY
  TIPS
  WEATHER
  MARKET_ANALYSIS
}

enum ConsultationStatus {
  PENDING
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum Priority {
  LOW
  NORMAL
  HIGH
  URGENT
}

enum NotificationType {
  ORDER
  PRICE_ALERT
  DISEASE_ALERT
  WEATHER_ALERT
  COMMUNITY
  CONSULTATION
  SYSTEM
  PROMOTION
}

enum WeatherAlertType {
  FLOOD
  DROUGHT
  STORM
  HEATWAVE
  COLDWAVE
  HEAVY_RAIN
  PEST_OUTBREAK
}

enum AlertSeverity {
  LOW
  MODERATE
  HIGH
  EXTREME
}

enum ContentStatus {
  DRAFT
  ACTIVE
  HIDDEN
  DELETED
}

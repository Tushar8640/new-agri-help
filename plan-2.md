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

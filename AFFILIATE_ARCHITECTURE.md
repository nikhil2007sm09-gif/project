# 🏗️ Affiliate System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     AFFILIATE MARKETING SYSTEM                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│  AFFILIATE   │
│  REGISTERS   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ User Model           │
│ - role: 'affiliate'  │
│ - affiliateCode:     │
│   "AFF-XXXXXX"       │
│ - approved: true     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                    AFFILIATE DASHBOARD                        │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Overview   │  │   Links     │  │ Commissions │         │
│  │   Stats     │  │  Generator  │  │   History   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │  Analytics  │  │  Settings   │                           │
│  │   Charts    │  │   Account   │                           │
│  └─────────────┘  └─────────────┘                           │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │  GENERATE LINK      │
                  │                     │
                  │  General:           │
                  │  site.com?ref=CODE  │
                  │                     │
                  │  Product:           │
                  │  site.com/          │
                  │  products/ID?       │
                  │  ref=CODE           │
                  └──────┬──────────────┘
                         │
                         ▼
                  ┌─────────────────┐
                  │  SHARE LINK     │
                  │  (Social Media, │
                  │   Email, etc.)  │
                  └──────┬──────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                      CUSTOMER JOURNEY                           │
└────────────────────────────────────────────────────────────────┘

┌──────────────┐
│  CUSTOMER    │
│  CLICKS LINK │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  ProductDetail.jsx                                            │
│  - Detects ?ref=CODE in URL                                  │
│  - Stores in localStorage                                    │
│  - Calls /api/affiliate/track-click                          │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  AffiliateClick Model                                         │
│  - affiliate: ObjectId                                        │
│  - product: ObjectId (optional)                              │
│  - ipAddress: String                                          │
│  - userAgent: String                                          │
│  - converted: false                                           │
│  - createdAt: Date                                            │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│  CUSTOMER    │
│  SHOPS       │
│  (Browses,   │
│   Adds Cart) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  CUSTOMER    │
│  CHECKS OUT  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Checkout.jsx                                                 │
│  - Gets affiliateCode from localStorage                      │
│  - Includes in order data                                    │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  POST /api/orders                                             │
│  - Validates affiliateCode                                   │
│  - Finds affiliate user                                      │
│  - Creates order with affiliate reference                    │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Order Model                                                  │
│  - user: ObjectId                                             │
│  - items: Array                                               │
│  - totalAmount: Number                                        │
│  - affiliateCode: "AFF-XXXXXX"                               │
│  - affiliate: ObjectId (ref: User)                           │
│  - status: 'pending'                                          │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  AUTO-CREATE COMMISSION                                       │
│  - Calculate: totalAmount * 0.10 (10%)                       │
│  - Create AffiliateCommission document                       │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  AffiliateCommission Model                                    │
│  - affiliate: ObjectId                                        │
│  - order: ObjectId                                            │
│  - amount: Number (10% of order)                             │
│  - status: 'pending'                                          │
│  - createdAt: Date                                            │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  UPDATE CLICK RECORD                                          │
│  - Set converted: true                                        │
│  - Link click to order                                        │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                    ADMIN WORKFLOW                             │
│                                                               │
│  1. Review Commission                                         │
│  2. Approve/Reject                                            │
│  3. Mark as Paid                                              │
│                                                               │
│  Status Flow:                                                 │
│  PENDING → APPROVED → PAID                                    │
└──────┬───────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│              AFFILIATE SEES UPDATED STATUS                    │
│              IN DASHBOARD                                     │
└───────────────────────────────────────────────────────────────┘
```

---

## Database Schema Relationships

```
┌─────────────────┐
│      User       │
│  (Affiliate)    │
│                 │
│ - _id           │
│ - name          │
│ - email         │
│ - role          │
│ - affiliateCode │◄─────────┐
│ - approved      │          │
└────────┬────────┘          │
         │                   │
         │ 1:N               │
         │                   │
         ▼                   │
┌─────────────────┐          │
│ AffiliateLink   │          │
│                 │          │
│ - affiliate ────┼──────────┘
│ - code          │
│ - product       │
│ - clicks        │
│ - conversions   │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│ AffiliateClick  │
│                 │
│ - affiliate     │
│ - affiliateLink │
│ - product       │
│ - ipAddress     │
│ - userAgent     │
│ - converted     │
└─────────────────┘

┌─────────────────┐
│      User       │
│  (Affiliate)    │
│                 │
│ - _id           │◄─────────┐
│ - affiliateCode │          │
└─────────────────┘          │
                              │
                              │
┌─────────────────┐          │
│     Order       │          │
│                 │          │
│ - _id           │          │
│ - user          │          │
│ - items         │          │
│ - totalAmount   │          │
│ - affiliateCode │          │
│ - affiliate ────┼──────────┘
│ - status        │
└────────┬────────┘
         │
         │ 1:1
         │
         ▼
┌─────────────────────┐
│ AffiliateCommission │
│                     │
│ - affiliate         │
│ - order ────────────┤
│ - amount            │
│ - status            │
└─────────────────────┘
```

---

## API Endpoints Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AFFILIATE API ROUTES                      │
│                    /api/affiliate                            │
└─────────────────────────────────────────────────────────────┘

POST /generate-link
├─ Input: { productId? }
├─ Process:
│  ├─ Get affiliate from JWT token
│  ├─ Find or create AffiliateLink
│  └─ Generate URL with ref code
└─ Output: { link, code }

GET /links
├─ Input: JWT token
├─ Process:
│  └─ Find all links for affiliate
└─ Output: [{ code, product, clicks, conversions }]

POST /track-click
├─ Input: { affiliateCode, productId? }
├─ Process:
│  ├─ Find affiliate by code
│  ├─ Create AffiliateClick record
│  ├─ Increment link clicks
│  └─ Store IP and user agent
└─ Output: { success: true }

GET /stats
├─ Input: JWT token
├─ Process:
│  ├─ Count total clicks
│  ├─ Count conversions
│  ├─ Sum commissions
│  └─ Generate affiliate link
└─ Output: { stats, affiliateLink, affiliateCode }

GET /commissions
├─ Input: JWT token
├─ Process:
│  └─ Find all commissions for affiliate
└─ Output: [{ order, amount, status, createdAt }]

GET /recent-clicks
├─ Input: JWT token
├─ Process:
│  └─ Find last 20 clicks
└─ Output: [{ product, converted, createdAt }]

GET /analytics
├─ Input: JWT token
├─ Process:
│  ├─ Calculate overview metrics
│  ├─ Get sales by day (7 days)
│  ├─ Find top customers
│  ├─ Get recent orders
│  └─ Calculate conversion rate
└─ Output: { overview, salesByDay, topCustomers, recentOrders }
```

---

## Frontend Component Structure

```
AffiliateDashboard
│
├─ State Management
│  ├─ activeTab
│  ├─ stats
│  ├─ affiliateLink
│  ├─ affiliateCode
│  ├─ analytics
│  ├─ products
│  ├─ searchTerm
│  ├─ selectedProduct
│  ├─ generatedLink
│  ├─ recentClicks
│  └─ commissions
│
├─ Tab Navigation
│  ├─ Overview
│  ├─ Generate Links
│  ├─ Commissions
│  ├─ Analytics
│  └─ Settings
│
├─ Overview Tab
│  ├─ Stats Cards (Clicks, Sales, Commission)
│  └─ General Link Display
│
├─ Generate Links Tab
│  ├─ General Link Section
│  ├─ Product Search
│  ├─ Product Grid
│  ├─ Link Generator
│  ├─ Generated Link Display
│  └─ Recent Clicks Feed
│
├─ Commissions Tab
│  ├─ Commission Stats Cards
│  └─ Commission History Table
│
├─ Analytics Tab
│  ├─ Key Metrics Cards
│  ├─ Commission Trend Chart
│  ├─ Top Customers List
│  └─ Recent Orders Feed
│
└─ Settings Tab
   ├─ Account Settings
   └─ Delete Account
```

---

## Data Flow Example

### Example: Customer Makes Purchase via Affiliate Link

```
1. Affiliate generates link:
   POST /api/affiliate/generate-link
   → Returns: https://site.com/products/123?ref=AFF-ABC123

2. Customer clicks link:
   → Browser opens: /products/123?ref=AFF-ABC123
   → ProductDetail.jsx detects ref parameter
   → localStorage.setItem('affiliateCode', 'AFF-ABC123')
   → POST /api/affiliate/track-click
   → AffiliateClick created in DB

3. Customer shops:
   → Adds products to cart
   → Goes to checkout
   → Fills shipping details

4. Customer completes payment:
   → Checkout.jsx gets affiliateCode from localStorage
   → POST /api/orders with affiliateCode
   → Backend validates affiliate
   → Order created with affiliate reference
   → Commission auto-created (10% of total)
   → AffiliateClick updated (converted: true)

5. Affiliate sees results:
   → Dashboard stats update
   → New commission appears in Commissions tab
   → Click shows as "Converted" in Recent Clicks
   → Analytics charts update
   → Top customers list updates
```

---

## Security & Validation

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY MEASURES                         │
└─────────────────────────────────────────────────────────────┘

1. Affiliate Validation
   ├─ Check role === 'affiliate'
   ├─ Check approved === true
   └─ Verify affiliateCode exists

2. JWT Authentication
   ├─ All affiliate routes require auth
   ├─ Token verified on each request
   └─ User ID extracted from token

3. Code Uniqueness
   ├─ affiliateCode is unique in User model
   ├─ Auto-generated with format AFF-XXXXXX
   └─ Collision prevention

4. IP Tracking
   ├─ Store IP address on each click
   ├─ Detect potential fraud
   └─ Geographic analysis

5. Commission Validation
   ├─ Only approved affiliates earn
   ├─ Commission rate controlled server-side
   ├─ Order must exist and be valid
   └─ Prevent duplicate commissions
```

---

## Performance Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                    OPTIMIZATION                              │
└─────────────────────────────────────────────────────────────┘

1. Database Indexes
   ├─ User.affiliateCode (unique, sparse)
   ├─ Order.affiliateCode
   ├─ AffiliateClick.affiliate
   └─ AffiliateCommission.affiliate

2. Caching
   ├─ Affiliate stats (can be cached for 5 minutes)
   ├─ Product list (cache for link generation)
   └─ Analytics data (cache for 1 hour)

3. Pagination
   ├─ Commission history (limit 50)
   ├─ Recent clicks (limit 20)
   └─ Product search (limit 100)

4. Lazy Loading
   ├─ Analytics loaded only when tab active
   ├─ Products loaded only in Links tab
   └─ Commissions loaded only in Commissions tab

5. Aggregation
   ├─ Use MongoDB aggregation for analytics
   ├─ Pre-calculate stats where possible
   └─ Batch updates for click counts
```

---

## Scalability

The system is designed to handle:
- ✅ Thousands of affiliates
- ✅ Millions of clicks
- ✅ Hundreds of thousands of orders
- ✅ Real-time tracking
- ✅ Concurrent requests

---

## 🎉 Architecture Complete

This architecture supports a production-ready affiliate marketing system with all the features of major platforms like Amazon Associates!

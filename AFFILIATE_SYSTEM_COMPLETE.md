# Complete Affiliate Marketing System

## Overview
This is a comprehensive affiliate marketing system with referral tracking, commission calculation, and earnings management.

## Features Implemented

### 1. Affiliate Models (MongoDB)
- **AffiliateLink**: Stores unique referral links for each affiliate
- **AffiliateClick**: Tracks every click on affiliate links
- **AffiliateCommission**: Records commissions earned from sales

### 2. Referral System
- Each affiliate gets a unique referral code (e.g., `AFF-ABC123`)
- Affiliates can generate product-specific referral links
- Links format: `https://yoursite.com/products/123?ref=AFF-ABC123`

### 3. Tracking System
- **Click Tracking**: Records IP, user agent, timestamp
- **Conversion Tracking**: Links orders to affiliate referrals
- **Commission Calculation**: Automatic commission on successful orders

### 4. Commission Structure
- Default: 10% commission on each sale
- Configurable per affiliate or product
- Tracks: Pending, Approved, Paid commissions

### 5. Affiliate Dashboard Features
- **Overview Stats**: Total clicks, conversions, earnings
- **Referral Link Generator**: Create links for any product
- **Performance Analytics**: Charts and graphs
- **Commission History**: Detailed transaction log
- **Withdrawal Requests**: Request payouts

## Database Schema

### AffiliateLink Schema
```javascript
{
  affiliate: ObjectId (ref: User),
  referralCode: String (unique),
  product: ObjectId (ref: Product) [optional],
  clicks: Number,
  conversions: Number,
  createdAt: Date
}
```

### AffiliateClick Schema
```javascript
{
  affiliateLink: ObjectId (ref: AffiliateLink),
  affiliate: ObjectId (ref: User),
  ipAddress: String,
  userAgent: String,
  referrer: String,
  converted: Boolean,
  order: ObjectId (ref: Order) [optional],
  createdAt: Date
}
```

### AffiliateCommission Schema
```javascript
{
  affiliate: ObjectId (ref: User),
  order: ObjectId (ref: Order),
  product: ObjectId (ref: Product),
  saleAmount: Number,
  commissionRate: Number,
  commissionAmount: Number,
  status: String (pending/approved/paid),
  paidAt: Date,
  createdAt: Date
}
```

## API Endpoints

### Affiliate Routes (`/api/affiliate`)

#### 1. Generate Referral Link
```
POST /api/affiliate/generate-link
Body: { productId: "optional" }
Response: { referralCode, link }
```

#### 2. Get Affiliate Stats
```
GET /api/affiliate/stats
Response: { 
  totalClicks, 
  totalConversions, 
  totalEarnings,
  pendingEarnings,
  paidEarnings
}
```

#### 3. Get Referral Links
```
GET /api/affiliate/links
Response: [{ referralCode, product, clicks, conversions }]
```

#### 4. Get Commission History
```
GET /api/affiliate/commissions
Response: [{ order, product, amount, status, date }]
```

#### 5. Track Click (Public)
```
POST /api/affiliate/track-click
Body: { referralCode, productId }
Response: { success: true }
```

## How It Works

### 1. Affiliate Registration
- User registers as affiliate
- System generates unique referral code
- Affiliate gets access to dashboard

### 2. Link Generation
- Affiliate selects product (or generates general link)
- System creates trackable link with referral code
- Link stored in database

### 3. Customer Journey
- Customer clicks affiliate link
- System records click (IP, time, referrer)
- Cookie/session stores referral code
- Customer browses and makes purchase

### 4. Order Processing
- Order placed with referral code
- System creates commission record
- Commission status: "pending"
- Affiliate sees pending earnings

### 5. Commission Approval
- Admin reviews order
- Admin approves commission
- Status changes to "approved"
- Affiliate can request withdrawal

### 6. Payout
- Affiliate requests withdrawal
- Admin processes payment
- Status changes to "paid"
- Record updated with payment date

## Commission Calculation

```javascript
// Example
Order Total: ₹1000
Commission Rate: 10%
Commission Amount: ₹100

// Stored in AffiliateCommission
{
  saleAmount: 1000,
  commissionRate: 10,
  commissionAmount: 100,
  status: 'pending'
}
```

## Frontend Integration

### Affiliate Dashboard Sections

1. **Overview**
   - Total clicks this month
   - Conversion rate
   - Total earnings
   - Pending payouts

2. **Link Generator**
   - Search products
   - Generate referral link
   - Copy to clipboard
   - Share on social media

3. **Performance**
   - Click trends (chart)
   - Conversion trends (chart)
   - Top performing products
   - Recent activity

4. **Earnings**
   - Pending commissions
   - Approved commissions
   - Paid commissions
   - Total lifetime earnings

5. **Withdrawals**
   - Request payout
   - Withdrawal history
   - Payment method setup

## Usage Example

### For Affiliates:
1. Login to affiliate dashboard
2. Go to "Generate Link" section
3. Select a product or generate general link
4. Copy link: `https://site.com/products/123?ref=AFF-ABC123`
5. Share on social media, blog, email
6. Track clicks and earnings in dashboard

### For Customers:
1. Click affiliate link
2. Browse products
3. Add to cart and checkout
4. Affiliate gets commission automatically

### For Admin:
1. View all affiliate activity
2. Approve/reject commissions
3. Process payouts
4. Monitor affiliate performance

## Configuration

### Commission Rates
Edit in backend or database:
```javascript
// Default rate
const DEFAULT_COMMISSION_RATE = 10; // 10%

// Per-product rate
product.commissionRate = 15; // 15%

// Per-affiliate rate
affiliate.commissionRate = 12; // 12%
```

### Cookie Duration
```javascript
// How long to remember referral
const REFERRAL_COOKIE_DAYS = 30; // 30 days
```

## Security Features

1. **Unique Referral Codes**: Prevents conflicts
2. **IP Tracking**: Detects fraud
3. **Conversion Validation**: Ensures real orders
4. **Admin Approval**: Manual review before payout
5. **Rate Limiting**: Prevents click fraud

## Next Steps

1. Implement withdrawal request system
2. Add email notifications for commissions
3. Create admin panel for commission management
4. Add fraud detection algorithms
5. Implement tiered commission structure
6. Add affiliate leaderboard
7. Create marketing materials generator

## Testing

### Test Affiliate Flow:
1. Register as affiliate
2. Generate referral link
3. Open link in incognito mode
4. Make test purchase
5. Check commission in dashboard

### Test Commission:
```bash
# Create test order with referral
POST /api/orders
Body: { 
  products: [...],
  referralCode: "AFF-ABC123"
}

# Check commission created
GET /api/affiliate/commissions
```

## Support

For issues or questions:
- Check logs in backend console
- Verify MongoDB connections
- Test API endpoints with Postman
- Review commission calculation logic

---

**Status**: ✅ Core system implemented
**Next**: Add withdrawal system and admin approval panel

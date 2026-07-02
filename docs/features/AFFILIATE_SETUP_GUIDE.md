# Affiliate System Setup Guide

## ✅ Files Created

### Backend Models (MongoDB Schemas)
1. `backend/models/AffiliateLink.js` - Referral links
2. `backend/models/AffiliateClick.js` - Click tracking
3. `backend/models/AffiliateCommission.js` - Commission records

### Backend Routes
1. `backend/routes/affiliate.js` - All affiliate APIs

## 🚀 Setup Steps

### Step 1: Add Route to Server
Open `backend/server.js` and add:

```javascript
const affiliateRoutes = require('./routes/affiliate')
app.use('/api/affiliate', affiliateRoutes)
```

### Step 2: Update User Model (if needed)
Make sure User model has `referralCode` field for affiliates:

```javascript
referralCode: {
  type: String,
  unique: true,
  sparse: true
}
```

### Step 3: Update Order Model
Add referral tracking to Order model:

```javascript
referralCode: String,
affiliate: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}
```

### Step 4: Restart Backend
```bash
cd backend
npm start
```

## 📡 API Endpoints Available

### 1. Generate Referral Link
```
POST /api/affiliate/generate-link
Headers: Authorization: Bearer <token>
Body: { "productId": "optional_product_id" }
```

### 2. Get All Links
```
GET /api/affiliate/links
Headers: Authorization: Bearer <token>
```

### 3. Track Click (Public)
```
POST /api/affiliate/track-click
Body: { 
  "referralCode": "AFF-ABC123",
  "productId": "optional"
}
```

### 4. Get Stats
```
GET /api/affiliate/stats
Headers: Authorization: Bearer <token>
```

### 5. Get Commissions
```
GET /api/affiliate/commissions?status=pending&page=1
Headers: Authorization: Bearer <token>
```

### 6. Get Analytics
```
GET /api/affiliate/analytics?period=30
Headers: Authorization: Bearer <token>
```

## 🔄 Integration with Existing Code

### In Product Detail Page
Add click tracking when page loads with referral code:

```javascript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const refCode = urlParams.get('ref')
  
  if (refCode) {
    // Store in localStorage
    localStorage.setItem('referralCode', refCode)
    
    // Track click
    axios.post('/api/affiliate/track-click', {
      referralCode: refCode,
      productId: productId
    })
  }
}, [])
```

### In Checkout/Order Creation
Include referral code:

```javascript
const referralCode = localStorage.getItem('referralCode')

const orderData = {
  // ... other order data
  referralCode: referralCode
}

// After order is created, create commission
if (referralCode) {
  // Backend will handle commission creation
}
```

### Backend Order Route
In `backend/routes/orders.js`, after creating order:

```javascript
// If order has referral code, create commission
if (order.referralCode) {
  const affiliateLink = await AffiliateLink.findOne({ 
    referralCode: order.referralCode 
  })
  
  if (affiliateLink) {
    // Mark click as converted
    await AffiliateClick.updateOne(
      { 
        affiliateLink: affiliateLink._id,
        converted: false
      },
      { 
        converted: true,
        order: order._id
      }
    )
    
    // Create commission for each product
    for (const item of order.items) {
      const commission = new AffiliateCommission({
        affiliate: affiliateLink.affiliate,
        order: order._id,
        product: item.product,
        affiliateLink: affiliateLink._id,
        saleAmount: item.price * item.quantity,
        commissionRate: 10 // or get from product/affiliate
      })
      
      await commission.save()
    }
    
    // Increment conversion count
    affiliateLink.conversions += 1
    await affiliateLink.save()
  }
}
```

## 🎨 Frontend Dashboard Features

The existing AffiliateDashboard can be enhanced with:

1. **Link Generator Section**
   - Search products
   - Generate link button
   - Copy to clipboard
   - Share buttons

2. **Stats Cards**
   - Total Clicks
   - Conversions
   - Earnings
   - Conversion Rate

3. **Recent Activity**
   - Latest clicks
   - Recent commissions

4. **Analytics Charts**
   - Clicks over time
   - Earnings trend
   - Top products

## 🧪 Testing

### 1. Test Link Generation
```bash
curl -X POST http://localhost:5000/api/affiliate/generate-link \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": "PRODUCT_ID"}'
```

### 2. Test Click Tracking
```bash
curl -X POST http://localhost:5000/api/affiliate/track-click \
  -H "Content-Type: application/json" \
  -d '{"referralCode": "AFF-ABC123", "productId": "PRODUCT_ID"}'
```

### 3. Test Stats
```bash
curl http://localhost:5000/api/affiliate/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Commission Flow

1. **Affiliate generates link** → AffiliateLink created
2. **Customer clicks link** → AffiliateClick created, referralCode stored
3. **Customer makes purchase** → Order created with referralCode
4. **Backend processes order** → AffiliateCommission created (status: pending)
5. **Admin approves** → Status changes to 'approved'
6. **Admin pays** → Status changes to 'paid', paidAt timestamp added

## 🔐 Security Features

- Unique referral codes prevent conflicts
- IP tracking detects fraud
- Admin approval required for payouts
- Commission validation before payment

## 📈 Commission Rates

Default: 10%

Can be customized:
- Per affiliate: `user.commissionRate = 15`
- Per product: `product.commissionRate = 12`
- Per category: `category.commissionRate = 8`

## 🎯 Next Steps

1. ✅ Backend models created
2. ✅ API routes created
3. ⏳ Add route to server.js
4. ⏳ Update Order model
5. ⏳ Integrate with checkout
6. ⏳ Enhance dashboard UI
7. ⏳ Add admin commission management
8. ⏳ Add withdrawal system

## 💡 Tips

- Test with incognito mode to simulate new users
- Use different IPs to test click tracking
- Check MongoDB to verify data is being saved
- Monitor backend logs for errors

## 🆘 Troubleshooting

**Links not generating?**
- Check if user has 'affiliate' role
- Verify auth middleware is working

**Clicks not tracking?**
- Check if referralCode is valid
- Verify IP address is being captured

**Commissions not creating?**
- Ensure order has referralCode
- Check if AffiliateLink exists
- Verify commission calculation logic

---

**Status**: ✅ Core backend implemented
**Ready for**: Frontend integration and testing

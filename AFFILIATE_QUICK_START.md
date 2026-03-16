# 🚀 Affiliate System - Quick Start Guide

## How to Test the Complete Affiliate Marketing System

### Step 1: Register as Affiliate

1. Go to `/affiliate-register`
2. Fill in the registration form:
   - Name
   - Email
   - Password
   - Business details (optional)
3. Click "Register as Affiliate"
4. Wait for admin approval (or manually approve in database)

### Step 2: Login to Affiliate Dashboard

1. Go to `/affiliate-login`
2. Login with your affiliate credentials
3. You'll be redirected to `/affiliate-dashboard`

### Step 3: Generate Affiliate Links

#### Option A: Use General Link
1. In the **Overview** tab, copy your general affiliate link
2. Format: `http://localhost:5173?ref=AFF-XXXXXX`
3. Share this link anywhere

#### Option B: Generate Product-Specific Link
1. Go to **Generate Links** tab
2. Search for a product
3. Click "Generate Link" on any product
4. Copy the generated link
5. Format: `http://localhost:5173/products/PRODUCT_ID?ref=AFF-XXXXXX`

### Step 4: Test Click Tracking

1. Open the affiliate link in a new browser/incognito window
2. The click will be automatically tracked
3. Check **Generate Links** tab → **Recent Clicks** section
4. You should see the click recorded

### Step 5: Test Commission Earning

1. With the affiliate link open (referral code in localStorage):
2. Browse products and add to cart
3. Go to checkout
4. Complete the order (use demo payment if Razorpay not configured)
5. Order will be created with your affiliate code

### Step 6: View Commission

1. Go back to Affiliate Dashboard
2. Check **Commissions** tab
3. You should see a new commission with status "PENDING"
4. Amount will be 10% of order total

### Step 7: View Analytics

1. Go to **Analytics** tab
2. View comprehensive stats:
   - Total commission earned
   - This month's earnings
   - Total sales
   - Conversion rate
   - Sales trend (last 7 days)
   - Top customers
   - Recent orders

---

## 🎯 Testing Scenarios

### Scenario 1: General Link
```
1. Copy general affiliate link
2. Open in new browser
3. Browse any product
4. Add to cart and checkout
5. Commission created for that order
```

### Scenario 2: Product-Specific Link
```
1. Generate link for Product A
2. Customer clicks link → lands on Product A
3. Customer buys Product A
4. Commission created
5. Analytics shows Product A in top products
```

### Scenario 3: Multiple Clicks
```
1. Share affiliate link to 5 people
2. All 5 click the link
3. Dashboard shows 5 clicks
4. 2 people make purchases
5. Dashboard shows 2 conversions
6. Conversion rate = 40%
```

### Scenario 4: Commission Lifecycle
```
1. Customer makes purchase → Commission: PENDING
2. Admin reviews → Commission: APPROVED
3. Admin pays → Commission: PAID
4. Affiliate sees updated status in Commissions tab
```

---

## 📊 Dashboard Features to Test

### Overview Tab:
- [ ] Total clicks counter
- [ ] Total sales counter
- [ ] Total commission amount
- [ ] General affiliate link display
- [ ] Copy link button

### Generate Links Tab:
- [ ] General affiliate link section
- [ ] Product search functionality
- [ ] Product grid display
- [ ] Generate link button
- [ ] Generated link display
- [ ] Copy link button
- [ ] Recent clicks feed

### Commissions Tab:
- [ ] Total earned stat
- [ ] Pending commissions stat
- [ ] Approved commissions stat
- [ ] Paid commissions stat
- [ ] Commission history table
- [ ] Status badges

### Analytics Tab:
- [ ] Total commission card
- [ ] This month commission card
- [ ] Total sales card
- [ ] Conversion rate card
- [ ] Commission trend chart
- [ ] Top customers list
- [ ] Recent orders feed

### Settings Tab:
- [ ] Account settings section
- [ ] Delete account button
- [ ] Confirmation dialog

---

## 🔍 Database Verification

### Check Affiliate Code:
```javascript
// In MongoDB
db.users.findOne({ role: 'affiliate' })
// Should have: affiliateCode: "AFF-XXXXXX"
```

### Check Clicks:
```javascript
db.affiliateclicks.find({ affiliate: AFFILIATE_ID })
// Shows all tracked clicks
```

### Check Commissions:
```javascript
db.affiliatecommissions.find({ affiliate: AFFILIATE_ID })
// Shows all commissions
```

### Check Orders with Affiliate:
```javascript
db.orders.find({ affiliateCode: "AFF-XXXXXX" })
// Shows orders from affiliate referrals
```

---

## 🐛 Troubleshooting

### Issue: Affiliate code not generated
**Solution:** Check User model has `affiliateCode` field and it's set during registration

### Issue: Clicks not tracking
**Solution:** 
- Check browser console for errors
- Verify `/api/affiliate/track-click` endpoint is working
- Check localStorage has `affiliateCode` stored

### Issue: Commission not created
**Solution:**
- Verify order has `affiliateCode` field
- Check affiliate is approved (`approved: true`)
- Verify commission calculation in orders.js

### Issue: Dashboard shows 0 stats
**Solution:**
- Make sure you're logged in as affiliate
- Check API endpoints are returning data
- Verify affiliate has made some activity

---

## 📱 Mobile Testing

1. Open affiliate link on mobile device
2. Verify responsive design
3. Test all dashboard tabs
4. Check copy to clipboard works
5. Verify tables are scrollable

---

## 🎨 UI Elements to Verify

### Colors:
- Blue gradient: Overview stats
- Green gradient: Sales/earnings
- Purple gradient: Commission
- Orange gradient: Conversion rate

### Icons:
- 📊 Overview
- 🔗 Generate Links
- 💰 Commissions
- 📈 Analytics
- ⚙️ Settings

### Animations:
- Hover effects on cards
- Button transitions
- Progress bars
- Loading spinners

---

## ✅ Complete Test Checklist

- [ ] Register as affiliate
- [ ] Login to dashboard
- [ ] View overview stats
- [ ] Copy general link
- [ ] Search products
- [ ] Generate product link
- [ ] Track click (open link in new browser)
- [ ] Make purchase with referral
- [ ] View commission created
- [ ] Check analytics data
- [ ] View recent clicks
- [ ] View commission history
- [ ] Test all tabs
- [ ] Test responsive design
- [ ] Test copy to clipboard
- [ ] Verify database records

---

## 🎉 Success Criteria

✅ Affiliate can register and login
✅ Unique affiliate code generated
✅ Links can be generated and copied
✅ Clicks are tracked automatically
✅ Commissions created on purchases
✅ Dashboard shows accurate stats
✅ Analytics display comprehensive data
✅ All tabs work correctly
✅ Responsive on all devices
✅ No console errors

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify backend server is running
3. Check MongoDB connection
4. Review API endpoint responses
5. Check network tab in DevTools

---

## 🚀 Ready to Launch!

The affiliate system is complete and ready for production. Follow this guide to test all features and ensure everything works perfectly!

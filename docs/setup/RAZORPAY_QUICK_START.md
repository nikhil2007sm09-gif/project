# 🚀 Razorpay Quick Start - 5 Minutes Setup

## Current Issue
You're seeing: **"⚠️ Razorpay not configured. Using test mode."**

This means payment gateway is not properly configured.

## Solution (5 Easy Steps)

### Step 1: Get Razorpay Account (2 minutes)
1. Open: https://razorpay.com/
2. Click **"Sign Up"**
3. Enter:
   - Email: Your email
   - Phone: Your phone
   - Business Name: ClothesShop
4. Verify email and phone

### Step 2: Get API Keys (1 minute)
1. Login to: https://dashboard.razorpay.com/
2. Click **"Settings"** (bottom left)
3. Click **"API Keys"**
4. Click **"Generate Test Key"** button
5. You'll see:
   ```
   Key ID: rzp_test_XXXXXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```
6. **Copy both keys** (keep them safe!)

### Step 3: Update .env File (1 minute)
1. Open file: `backend/.env`
2. Find these lines:
   ```env
   RAZORPAY_KEY_ID=test_key
   RAZORPAY_KEY_SECRET=test_secret
   ```
3. Replace with your keys:
   ```env
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_HERE
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_HERE
   ```
4. **Save the file**

### Step 4: Restart Backend (30 seconds)
1. Stop backend server (press `Ctrl+C` in terminal)
2. Start again:
   ```bash
   cd backend
   npm run dev
   ```
3. You should see: **"Server running on port 5000"**
4. **NO MORE** "Razorpay not configured" warning!

### Step 5: Test Payment (1 minute)
1. Go to your website
2. Add any product to cart
3. Go to checkout
4. Fill shipping details
5. Click **"Pay ₹XXX Securely"**
6. Razorpay modal will open
7. Use test card:
   ```
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   Name: Test User
   ```
8. Complete payment
9. See confetti celebration! 🎉

## ✅ Success Checklist

After setup, you should see:
- ✅ No "test mode" warning in console
- ✅ Razorpay modal opens smoothly
- ✅ All payment options visible (Cards, UPI, Netbanking, Wallets)
- ✅ Test payment works
- ✅ Order created successfully
- ✅ Confetti animation shows
- ✅ Email confirmation sent

## 🎯 Quick Test Cards

### Credit/Debit Cards:
```
Visa: 4111 1111 1111 1111
Mastercard: 5555 5555 5555 4444
Rupay: 6073 8499 9000 0000 00
CVV: Any 3 digits
Expiry: Any future date
```

### UPI:
```
UPI ID: success@razorpay
```

### Netbanking:
- Select any bank
- Will succeed automatically in test mode

## 📝 Example Configuration

Your `backend/.env` should look like:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clothesshop
JWT_SECRET=clothesshop_secret_key_2026
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=nikhil2007sm09@gmail.com
EMAIL_PASS=psjuqnooeavqylph

# Razorpay Configuration - UPDATE THESE!
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 🔥 Common Mistakes

### ❌ Wrong:
```env
RAZORPAY_KEY_ID=test_key
RAZORPAY_KEY_SECRET=test_secret
```

### ✅ Correct:
```env
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 🆘 Troubleshooting

### Still seeing "test mode" warning?
1. Check if you saved .env file
2. Check if you restarted backend
3. Check if keys start with `rzp_test_`
4. Check for typos in keys

### Payment modal not opening?
1. Clear browser cache
2. Check browser console (F12) for errors
3. Verify Razorpay script loaded
4. Try different browser

### Payment fails?
1. Use exact test card numbers
2. Try different test card
3. Check Razorpay dashboard for errors
4. Verify keys are correct

## 💰 Razorpay Pricing

### Test Mode:
- **FREE** - No charges
- Unlimited test transactions
- All features available

### Live Mode:
- **2%** per transaction (domestic cards)
- **3%** per transaction (international cards)
- **0%** for UPI (promotional)
- No setup fees
- No monthly fees

## 🎓 Video Tutorial

If you prefer video, watch:
1. Razorpay Setup: https://www.youtube.com/watch?v=XXXXX
2. Test Payment: https://www.youtube.com/watch?v=XXXXX

## 📞 Need Help?

### Razorpay Support:
- Email: support@razorpay.com
- Phone: 1800-102-0480
- Chat: https://dashboard.razorpay.com/

### Documentation:
- Razorpay Docs: https://razorpay.com/docs/
- Our Guide: RAZORPAY_SETUP_GUIDE.md
- Payment Methods: PAYMENT_METHODS_COMPLETE.md

## 🚀 Ready to Go Live?

After testing, to go live:
1. Complete KYC on Razorpay
2. Generate **Live Keys** (rzp_live_xxx)
3. Update .env with live keys
4. Test with small real amounts
5. Deploy to production

## ⏱️ Time Required

- Razorpay signup: 2 minutes
- Get API keys: 1 minute
- Update .env: 1 minute
- Restart server: 30 seconds
- Test payment: 1 minute

**Total: ~5 minutes** ⚡

## 🎉 That's It!

Once you update the keys and restart, your payment gateway will work perfectly with all payment methods:
- 💳 Cards
- 📱 UPI (PhonePe, Google Pay, Paytm)
- 🏦 Netbanking
- 👛 Wallets

No more test mode warnings! 🎊

# 🚀 Payment Gateway - Quick Start (2 Minutes)

## ⚡ Fast Setup

### 1️⃣ Get Razorpay Keys (1 min)

```
1. Visit: https://dashboard.razorpay.com/signup
2. Sign up with email
3. Go to: Settings → API Keys
4. Click: "Generate Test Key"
5. Copy both keys
```

### 2️⃣ Add to .env File (30 sec)

Open `backend/.env` and add:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
```

### 3️⃣ Verify & Start (30 sec)

```bash
cd backend
npm run verify-payment
npm start
```

**Done! ✅**

---

## 🧪 Quick Test

1. Add product to cart
2. Go to checkout
3. Fill address
4. Click "Pay Securely"
5. Use test card: `4111 1111 1111 1111`
6. CVV: `123`, Expiry: `12/25`
7. Complete payment
8. Check MongoDB - order saved! ✅

---

## 💳 What Works

✅ Google Pay
✅ PhonePe  
✅ Paytm
✅ All UPI Apps
✅ Credit/Debit Cards
✅ Net Banking
✅ Wallets
✅ UPI Scanner (QR Code)

---

## 📊 Data Saved in MongoDB

Every order saves:
- Payment ID
- Order ID
- Payment Method (upi/card/netbanking/wallet)
- Payment Status (completed/pending/failed)
- Customer details
- Order items
- Total amount

---

## 📖 Full Documentation

- **Complete Guide:** `RAZORPAY_PAYMENT_SETUP.md`
- **Hindi Guide:** `PAYMENT_GATEWAY_READY.md`

---

## 🎉 That's It!

**3 steps. 2 minutes. Production-ready payment gateway!**

Happy Selling! 💰

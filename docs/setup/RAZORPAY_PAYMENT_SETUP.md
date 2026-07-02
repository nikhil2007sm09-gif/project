# 🔐 Razorpay Payment Gateway - Complete Setup Guide

## ✅ Features Implemented

### Payment Methods Supported:
- 💳 **Credit/Debit Cards** - All major cards (Visa, Mastercard, RuPay, Amex)
- 📱 **UPI** - Google Pay, PhonePe, Paytm, BHIM, WhatsApp Pay, Amazon Pay
- 🏦 **Net Banking** - All major banks
- 💰 **Wallets** - Paytm, PhonePe, Mobikwik, Freecharge
- 📲 **UPI Scanner** - QR code scanning support
- 💵 **UPI ID** - Direct UPI ID payment
- 🎯 **UPI Intent** - Direct app opening (PhonePe, Google Pay, etc.)

### Database Integration:
- ✅ All payment data saved in MongoDB
- ✅ Payment ID, Order ID, Payment Method tracked
- ✅ Payment status (pending, completed, failed, refunded)
- ✅ Order status tracking
- ✅ Affiliate tracking integrated

---

## 🚀 Setup Instructions

### Step 1: Get Razorpay API Keys

1. **Create Razorpay Account**
   - Visit: https://dashboard.razorpay.com/signup
   - Sign up with your business email
   - Complete KYC verification (for live mode)

2. **Get Test Keys** (For Development)
   - Login to: https://dashboard.razorpay.com/
   - Go to Settings → API Keys
   - Click "Generate Test Key"
   - Copy both:
     - `Key ID` (starts with `rzp_test_`)
     - `Key Secret`

3. **Get Live Keys** (For Production)
   - Complete KYC verification
   - Go to Settings → API Keys
   - Switch to "Live Mode"
   - Click "Generate Live Key"
   - Copy both:
     - `Key ID` (starts with `rzp_live_`)
     - `Key Secret`

### Step 2: Configure Backend

1. **Open** `backend/.env` file

2. **Add Razorpay Keys:**
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_key_secret_here
```

3. **Example with Real Test Keys:**
```env
RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMnOp
RAZORPAY_KEY_SECRET=xYz123456789AbCdEfGhIjKlMnOp
```

### Step 3: Restart Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Razorpay configured successfully
```

---

## 🧪 Testing Payment Gateway

### Test Mode (Development)

Razorpay provides test cards and UPI IDs for testing:

#### Test Cards:
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name

Card Number: 5555 5555 5555 4444 (Mastercard)
CVV: Any 3 digits
Expiry: Any future date
```

#### Test UPI:
```
UPI ID: success@razorpay
Status: Payment will succeed

UPI ID: failure@razorpay
Status: Payment will fail
```

#### Test Wallets:
- Select any wallet
- Use OTP: `0000` or `1234`

### Testing Flow:

1. **Add products to cart**
2. **Go to checkout**
3. **Fill shipping address**
4. **Click "Pay Securely"**
5. **Razorpay popup will open with all payment options:**
   - UPI (Google Pay, PhonePe, etc.)
   - Cards
   - Net Banking
   - Wallets
6. **Select payment method and complete**
7. **Order will be created in MongoDB**

---

## 📊 Database Schema

### Order Model Fields:

```javascript
{
  user: ObjectId,              // User reference (optional for guest)
  items: [{
    product: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    size: String
  }],
  shippingAddress: {
    fullName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String
  },
  totalAmount: Number,
  paymentId: String,           // Razorpay payment ID
  orderId: String,             // Razorpay order ID
  paymentMethod: String,       // upi, card, netbanking, wallet
  paymentStatus: String,       // pending, completed, failed, refunded
  status: String,              // pending, processing, shipped, delivered
  affiliateCode: String,
  affiliate: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔍 Verify Payment in Database

### Using MongoDB Compass:

1. Connect to your MongoDB
2. Open `clothesshop` database
3. Open `orders` collection
4. Check latest order:
   - `paymentId` - Razorpay payment ID (pay_xxxxx)
   - `orderId` - Razorpay order ID (order_xxxxx)
   - `paymentMethod` - upi/card/netbanking/wallet
   - `paymentStatus` - completed
   - `totalAmount` - Amount paid

### Using MongoDB Shell:

```bash
mongosh
use clothesshop
db.orders.find().sort({createdAt: -1}).limit(1).pretty()
```

---

## 🎯 Payment Flow

### Frontend → Backend → Razorpay → Database

```
1. User clicks "Pay Securely"
   ↓
2. Frontend calls: POST /api/payment/create-order
   ↓
3. Backend creates Razorpay order
   ↓
4. Frontend opens Razorpay checkout popup
   ↓
5. User selects payment method (UPI/Card/etc.)
   ↓
6. User completes payment
   ↓
7. Razorpay sends payment response
   ↓
8. Frontend calls: POST /api/payment/verify
   ↓
9. Backend verifies payment signature
   ↓
10. Frontend calls: POST /api/orders
    ↓
11. Order saved in MongoDB with payment details
    ↓
12. User redirected to success page
```

---

## 🛡️ Security Features

✅ **Payment Signature Verification** - Every payment is verified using HMAC SHA256
✅ **SSL Encryption** - All data encrypted in transit
✅ **PCI DSS Compliant** - Razorpay handles card data securely
✅ **No card data stored** - Card details never touch your server
✅ **Webhook support** - For payment status updates
✅ **Refund support** - Built-in refund API

---

## 🌐 Production Deployment

### Before Going Live:

1. **Complete KYC** on Razorpay dashboard
2. **Get Live API Keys** (rzp_live_xxx)
3. **Update .env** with live keys:
```env
RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
```
4. **Test thoroughly** with real small amounts
5. **Enable webhooks** for payment notifications
6. **Set up refund policy**

### Webhook Setup (Optional but Recommended):

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events:
   - payment.authorized
   - payment.captured
   - payment.failed
   - refund.created
4. Copy webhook secret
5. Add to .env:
```env
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

## 📱 Supported Payment Apps

### UPI Apps:
- ✅ Google Pay (GPay)
- ✅ PhonePe
- ✅ Paytm
- ✅ BHIM
- ✅ Amazon Pay
- ✅ WhatsApp Pay
- ✅ All bank UPI apps

### Wallets:
- ✅ Paytm Wallet
- ✅ PhonePe Wallet
- ✅ Mobikwik
- ✅ Freecharge
- ✅ Airtel Money

### Cards:
- ✅ Visa
- ✅ Mastercard
- ✅ RuPay
- ✅ American Express
- ✅ Diners Club

---

## 🐛 Troubleshooting

### Error: "Payment gateway not configured"
**Solution:** Check if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in backend/.env

### Error: "Invalid signature"
**Solution:** Make sure RAZORPAY_KEY_SECRET is correct in .env file

### Payment succeeds but order not created
**Solution:** Check backend logs for order creation errors

### Razorpay popup not opening
**Solution:** Check browser console for errors. Make sure Razorpay script is loaded.

### Test payment not working
**Solution:** Use test cards/UPI provided by Razorpay (see Testing section above)

---

## 📞 Support

### Razorpay Support:
- Email: support@razorpay.com
- Docs: https://razorpay.com/docs/
- Dashboard: https://dashboard.razorpay.com/

### Test Environment:
- Test Dashboard: https://dashboard.razorpay.com/test/dashboard
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/

---

## ✨ What's Changed

### Removed:
- ❌ Test/Demo mode
- ❌ Fake payment processing
- ❌ Mock orders

### Added:
- ✅ Real Razorpay integration
- ✅ All payment methods (UPI, Cards, Netbanking, Wallets)
- ✅ Payment verification
- ✅ Payment method tracking in database
- ✅ Proper error handling
- ✅ Payment status tracking
- ✅ Configuration validation

---

## 🎉 Ready to Use!

Your payment gateway is now fully configured and ready to accept payments!

**Next Steps:**
1. Add your Razorpay keys to backend/.env
2. Restart backend server
3. Test with Razorpay test cards/UPI
4. Go live with real keys after KYC

**Happy Selling! 🚀**

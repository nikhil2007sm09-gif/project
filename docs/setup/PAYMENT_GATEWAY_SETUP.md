# Razorpay Payment Gateway - Complete Setup Guide

## Overview

Razorpay payment gateway ab properly configured hai with:
- ✅ Order creation
- ✅ Payment verification
- ✅ Signature validation
- ✅ Error handling
- ✅ Test mode support

---

## Setup Steps

### Step 1: Create Razorpay Account

1. **Visit:** https://razorpay.com/
2. **Sign Up** for free account
3. **Verify** email and phone
4. **Complete KYC** (for live mode, optional for test mode)

### Step 2: Get API Keys

1. **Login** to Razorpay Dashboard
2. **Go to:** Settings → API Keys
3. **Generate Keys** (Test Mode)
4. **Copy:**
   - Key ID (starts with `rzp_test_`)
   - Key Secret

**Example:**
```
Key ID: rzp_test_1234567890abcd
Key Secret: abcdefghijklmnopqrstuvwxyz123456
```

### Step 3: Configure Backend

1. **Open:** `backend/.env` file
2. **Add your keys:**

```env
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

3. **Save** the file

### Step 4: Restart Backend

```bash
cd backend
npm run dev
```

---

## Testing Payment

### Test Mode

Razorpay provides test cards for testing:

**Test Card Details:**
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Any name
```

**Test UPI:**
```
UPI ID: success@razorpay
```

**Test Netbanking:**
- Select any bank
- Use credentials provided on test page

### Test Flow

1. **Add products to cart**
2. **Go to checkout**
3. **Fill shipping address**
4. **Click "Pay Now"**
5. **Razorpay popup opens**
6. **Select payment method:**
   - Card
   - UPI
   - Netbanking
   - Wallet
7. **Use test credentials**
8. **Payment success!**
9. **Order created**

---

## Features Implemented

### 1. Order Creation
**Endpoint:** `POST /api/payment/create-order`

**Request:**
```json
{
  "amount": 1050
}
```

**Response:**
```json
{
  "id": "order_abc123",
  "amount": 105000,
  "currency": "INR",
  "receipt": "receipt_1234567890",
  "key_id": "rzp_test_xxx"
}
```

### 2. Payment Verification
**Endpoint:** `POST /api/payment/verify`

**Request:**
```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "signature_hash"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentId": "pay_xyz789",
  "orderId": "order_abc123"
}
```

### 3. Signature Validation

Backend validates payment using HMAC SHA256:

```javascript
const sign = razorpay_order_id + '|' + razorpay_payment_id
const expectedSign = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(sign)
  .digest('hex')

if (razorpay_signature === expectedSign) {
  // Payment verified ✅
}
```

---

## Frontend Features

### 1. Razorpay Script Loading

```javascript
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://checkout.razorpay.com/v1/checkout.js'
  script.async = true
  document.body.appendChild(script)
}, [])
```

### 2. Form Validation

- Address required
- City required
- State required
- Pincode (6 digits)
- Phone (10 digits)

### 3. Payment Options

Razorpay popup shows:
- 💳 Credit/Debit Cards
- 📱 UPI
- 🏦 Netbanking
- 💰 Wallets (Paytm, PhonePe, etc.)
- 💵 EMI options

### 4. User Experience

**Before Payment:**
```
┌─────────────────────────────┐
│ Shipping Address            │
│ [Form fields]               │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Order Summary               │
│ Item 1: ₹500                │
│ Item 2: ₹500                │
│ Subtotal: ₹1000             │
│ Shipping: ₹50               │
│ Total: ₹1050                │
│                             │
│ [💳 Pay ₹1050]              │
│ 🔒 Secure payment           │
└─────────────────────────────┘
```

**During Payment:**
```
┌─────────────────────────────┐
│ Razorpay Checkout           │
│                             │
│ Pay ₹1050 to ClothesShop    │
│                             │
│ [Card] [UPI] [Netbanking]   │
│                             │
│ Card Number: ____________   │
│ Expiry: __/__  CVV: ___     │
│                             │
│ [Pay Securely]              │
└─────────────────────────────┘
```

**After Payment:**
```
✅ Payment successful!
✅ Order placed.
→ Redirecting to orders page...
```

---

## Error Handling

### 1. Payment Failed

```javascript
razorpay.on('payment.failed', function (response) {
  alert('❌ Payment failed: ' + response.error.description)
})
```

### 2. Payment Cancelled

```javascript
modal: {
  ondismiss: function() {
    alert('Payment cancelled')
  }
}
```

### 3. Verification Failed

```javascript
if (!verifyRes.data.success) {
  alert('❌ Payment verification failed')
}
```

### 4. Order Creation Failed

```javascript
catch (error) {
  alert('❌ Error placing order: ' + error.message)
}
```

---

## Security Features

### 1. Authentication Required

```javascript
router.post('/create-order', authenticate, async (req, res) => {
  // Only logged-in users can create orders
})
```

### 2. Signature Verification

```javascript
// Backend verifies Razorpay signature
// Prevents payment tampering
```

### 3. Amount Validation

```javascript
if (!amount || amount <= 0) {
  return res.status(400).json({ message: 'Invalid amount' })
}
```

### 4. HTTPS Required

```javascript
// In production, use HTTPS
// Razorpay requires secure connection
```

---

## Test vs Live Mode

### Test Mode (Development)

**Keys:**
```
Key ID: rzp_test_xxx
Key Secret: xxx
```

**Features:**
- Free to use
- Test cards work
- No real money
- No KYC required

**Test Cards:**
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

### Live Mode (Production)

**Keys:**
```
Key ID: rzp_live_xxx
Key Secret: xxx
```

**Requirements:**
- KYC completed
- Bank account verified
- Business details submitted
- Real money transactions

**Activation:**
1. Complete KYC
2. Submit documents
3. Wait for approval (1-2 days)
4. Get live keys
5. Update .env file

---

## Payment Flow Diagram

```
Customer                Frontend              Backend              Razorpay
   |                       |                     |                     |
   |--[Add to Cart]------->|                     |                     |
   |                       |                     |                     |
   |--[Checkout]---------->|                     |                     |
   |                       |                     |                     |
   |--[Fill Address]------>|                     |                     |
   |                       |                     |                     |
   |--[Pay Now]----------->|--[Create Order]---->|--[Create Order]---->|
   |                       |                     |                     |
   |                       |<-[Order ID]---------|<-[Order ID]---------|
   |                       |                     |                     |
   |<-[Razorpay Popup]-----|                     |                     |
   |                       |                     |                     |
   |--[Enter Card]-------->|-------------------->|--[Process Payment]->|
   |                       |                     |                     |
   |<-[Payment Success]----|<-[Payment ID]-------|<-[Payment ID]-------|
   |                       |                     |                     |
   |                       |--[Verify Payment]-->|--[Verify Signature] |
   |                       |                     |                     |
   |                       |<-[Verified]---------|                     |
   |                       |                     |                     |
   |                       |--[Create Order]---->|                     |
   |                       |                     |                     |
   |<-[Order Placed]-------|<-[Order Created]----|                     |
   |                       |                     |                     |
```

---

## Troubleshooting

### Issue 1: "Razorpay is not defined"

**Cause:** Script not loaded

**Solution:**
```javascript
// Check if script is loaded
if (typeof window.Razorpay === 'undefined') {
  alert('Razorpay script not loaded. Please refresh.')
  return
}
```

### Issue 2: "Invalid key_id"

**Cause:** Wrong API key

**Solution:**
1. Check `.env` file
2. Verify key from Razorpay dashboard
3. Restart backend server

### Issue 3: "Signature verification failed"

**Cause:** Wrong key secret

**Solution:**
1. Check `RAZORPAY_KEY_SECRET` in `.env`
2. Copy correct secret from dashboard
3. Restart backend

### Issue 4: Payment success but order not created

**Cause:** Backend error after payment

**Solution:**
1. Check backend logs
2. Verify database connection
3. Check order creation endpoint

### Issue 5: "Amount must be at least INR 1.00"

**Cause:** Amount too low

**Solution:**
```javascript
// Minimum amount is ₹1
if (amount < 1) {
  alert('Minimum order amount is ₹1')
  return
}
```

---

## Production Checklist

Before going live:

- [ ] Complete Razorpay KYC
- [ ] Get live API keys
- [ ] Update `.env` with live keys
- [ ] Test with real card (small amount)
- [ ] Enable HTTPS
- [ ] Set up webhooks (optional)
- [ ] Configure settlement account
- [ ] Test refund flow
- [ ] Set up email notifications
- [ ] Monitor transactions

---

## Webhooks (Optional)

For advanced features, set up webhooks:

**Endpoint:** `POST /api/payment/webhook`

**Events:**
- `payment.authorized`
- `payment.captured`
- `payment.failed`
- `order.paid`
- `refund.created`

**Configuration:**
1. Go to Razorpay Dashboard
2. Settings → Webhooks
3. Add webhook URL
4. Select events
5. Save secret

---

## Refunds

To implement refunds:

```javascript
router.post('/refund', authenticate, async (req, res) => {
  const { paymentId, amount } = req.body
  
  const refund = await razorpay.payments.refund(paymentId, {
    amount: amount * 100,
    speed: 'normal'
  })
  
  res.json(refund)
})
```

---

## Support

### Razorpay Support
- **Email:** support@razorpay.com
- **Phone:** +91-80-6890-6890
- **Docs:** https://razorpay.com/docs/

### Test Environment
- **Dashboard:** https://dashboard.razorpay.com/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/

---

## Summary

✅ **Order Creation:** Backend creates Razorpay order
✅ **Payment Processing:** Razorpay handles payment
✅ **Verification:** Backend verifies signature
✅ **Order Storage:** Order saved in database
✅ **Error Handling:** Proper error messages
✅ **Test Mode:** Use test cards for testing
✅ **Security:** Signature validation & authentication
✅ **User Experience:** Clean checkout flow

**Payment gateway ab fully functional hai!** 🎉

**Next Steps:**
1. Get Razorpay test keys
2. Add to `.env` file
3. Test with test cards
4. Go live when ready

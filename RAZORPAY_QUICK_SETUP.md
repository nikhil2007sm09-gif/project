# Razorpay Payment Gateway - Quick Setup (5 Minutes)

## Step 1: Get Razorpay Keys (2 minutes)

1. **Visit:** https://razorpay.com/
2. **Sign Up** (free account)
3. **Login** to dashboard
4. **Go to:** Settings → API Keys → Generate Test Keys
5. **Copy both keys:**
   ```
   Key ID: rzp_test_xxxxxxxxxxxxx
   Key Secret: xxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Step 2: Add Keys to Backend (1 minute)

1. **Open:** `backend/.env` file
2. **Add your keys:**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. **Save** file

## Step 3: Restart Backend (1 minute)

```bash
cd backend
npm run dev
```

## Step 4: Test Payment (1 minute)

1. **Frontend:** http://localhost:3000
2. **Add products** to cart
3. **Go to checkout**
4. **Fill address**
5. **Click "Pay Now"**
6. **Use test card:**
   ```
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   ```
7. **Payment success!** ✅

---

## Test Cards

### Success Card
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name
```

### Failure Card
```
Card Number: 4000 0000 0000 0002
```

### Test UPI
```
UPI ID: success@razorpay
```

---

## Troubleshooting

### "Invalid key_id"
- Check `.env` file has correct key
- Restart backend server

### "Razorpay is not defined"
- Refresh browser page
- Check internet connection

### Payment not working
- Verify keys are test mode keys (start with `rzp_test_`)
- Check backend is running
- Check browser console for errors

---

## What's Implemented

✅ Order creation
✅ Payment processing
✅ Signature verification
✅ Order storage in database
✅ Error handling
✅ Test mode support

---

## Next Steps

**For Production:**
1. Complete KYC on Razorpay
2. Get live keys (rzp_live_xxx)
3. Update `.env` with live keys
4. Test with real card
5. Go live!

**For detailed guide, see:** `PAYMENT_GATEWAY_SETUP.md`

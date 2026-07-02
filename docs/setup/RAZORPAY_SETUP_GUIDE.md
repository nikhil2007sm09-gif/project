# Razorpay Payment Gateway Setup Guide

## Current Status
⚠️ Payment gateway is in TEST MODE because Razorpay keys are not configured.

## Quick Setup (5 Minutes)

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Click "Sign Up" button
3. Enter your details:
   - Business Name: ClothesShop (or your business name)
   - Email: Your email
   - Phone: Your phone number
4. Verify email and phone
5. Complete basic KYC (can use test mode without full KYC)

### Step 2: Get API Keys

#### For Testing (Recommended First):
1. Login to Razorpay Dashboard: https://dashboard.razorpay.com/
2. Go to Settings → API Keys
3. Click "Generate Test Key"
4. You'll get:
   - **Key ID**: Starts with `rzp_test_`
   - **Key Secret**: Long string (keep it secret!)

#### For Production (After Testing):
1. Complete full KYC verification
2. Go to Settings → API Keys
3. Switch to "Live Mode"
4. Click "Generate Live Key"
5. You'll get:
   - **Key ID**: Starts with `rzp_live_`
   - **Key Secret**: Long string (keep it secret!)

### Step 3: Update Backend Configuration

Open `backend/.env` file and update:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

**Example with real test keys:**
```env
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

### Step 4: Restart Backend Server

Stop the backend server (Ctrl+C) and start again:
```bash
cd backend
npm run dev
```

### Step 5: Test Payment

1. Go to your website
2. Add products to cart
3. Go to checkout
4. Fill shipping details
5. Click "Pay Securely"
6. Razorpay modal will open with all payment options
7. Use test credentials to complete payment

## Test Credentials

### Test Credit/Debit Cards:
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date (e.g., 12/25)
Name: Any name
```

**Other Test Cards:**
- Mastercard: 5555 5555 5555 4444
- Rupay: 6073 8499 9000 0000 00
- Amex: 3782 822463 10005

### Test UPI:
```
UPI ID: success@razorpay
```
This will simulate successful payment.

### Test Netbanking:
- Select any bank
- Use any credentials
- Payment will succeed in test mode

### Test Wallets:
- Select any wallet
- Payment will succeed in test mode

## Verification

### Check if Razorpay is Working:
1. Open browser console (F12)
2. Go to checkout page
3. Click "Pay Securely"
4. You should see Razorpay modal open
5. Console should NOT show "test mode" warning

### Success Indicators:
- ✅ No "test mode" warning in console
- ✅ Razorpay modal opens properly
- ✅ All payment methods visible (Cards, UPI, Netbanking, Wallets)
- ✅ Test payment completes successfully
- ✅ Order created in database
- ✅ Confetti celebration shown
- ✅ Email confirmation sent

## Production Deployment

### Before Going Live:
1. ✅ Complete full KYC on Razorpay
2. ✅ Get Live API keys (rzp_live_xxx)
3. ✅ Update .env with live keys
4. ✅ Test thoroughly with real small amounts
5. ✅ Setup webhook for payment notifications
6. ✅ Configure refund policy
7. ✅ Add terms & conditions
8. ✅ Setup customer support

### Live Keys Configuration:
```env
# Production Razorpay Keys
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

## Security Best Practices

### DO:
- ✅ Keep API keys secret
- ✅ Never commit .env to git
- ✅ Use environment variables
- ✅ Verify payment signatures
- ✅ Use HTTPS in production
- ✅ Log all transactions
- ✅ Monitor failed payments

### DON'T:
- ❌ Share API keys publicly
- ❌ Hardcode keys in code
- ❌ Skip payment verification
- ❌ Use test keys in production
- ❌ Ignore webhook events

## Webhook Setup (Optional but Recommended)

### Why Webhooks?
- Get real-time payment notifications
- Handle payment failures
- Process refunds automatically
- Update order status

### Setup Webhook:
1. Go to Razorpay Dashboard
2. Settings → Webhooks
3. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
4. Select events: payment.captured, payment.failed, refund.created
5. Copy webhook secret
6. Add to .env: `RAZORPAY_WEBHOOK_SECRET=xxxxx`

## Troubleshooting

### Issue: "Razorpay not configured" message
**Solution**: Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env

### Issue: Payment modal not opening
**Solution**: 
1. Check browser console for errors
2. Verify Razorpay script is loaded
3. Check API keys are correct
4. Clear browser cache

### Issue: Payment succeeds but order not created
**Solution**:
1. Check backend logs
2. Verify payment verification logic
3. Check database connection
4. Review order creation code

### Issue: Test cards not working
**Solution**:
1. Ensure using test mode keys (rzp_test_)
2. Use exact test card numbers
3. Try different test cards
4. Check Razorpay dashboard for errors

## Cost & Pricing

### Razorpay Charges:
- **Domestic Cards**: 2% per transaction
- **International Cards**: 3% per transaction
- **UPI**: 0% (Free during promotional period)
- **Netbanking**: 2% per transaction
- **Wallets**: 2% per transaction

### No Setup Fees:
- ✅ Free account creation
- ✅ Free API access
- ✅ Free test mode
- ✅ No monthly fees
- ✅ Pay only for successful transactions

## Support

### Razorpay Support:
- Email: support@razorpay.com
- Phone: 1800-102-0480
- Dashboard: https://dashboard.razorpay.com/
- Docs: https://razorpay.com/docs/

### Your Support:
- Check backend logs: `backend/` folder
- Check frontend console: Browser F12
- Review documentation: PAYMENT_METHODS_COMPLETE.md

## Quick Commands

### Start Backend:
```bash
cd backend
npm run dev
```

### Check Backend Logs:
Look for:
- "Razorpay not configured" - Keys missing
- "Payment order created" - Success
- "Payment verified" - Success

### Test Payment Flow:
1. Add product to cart
2. Checkout
3. Fill details
4. Pay with test card: 4111 1111 1111 1111
5. Check order created
6. Check email received

## Next Steps

1. **Get Razorpay Account** (5 min)
   - Sign up at razorpay.com
   - Verify email/phone

2. **Get Test Keys** (2 min)
   - Dashboard → API Keys
   - Generate Test Key

3. **Update .env** (1 min)
   - Copy keys to backend/.env
   - Save file

4. **Restart Server** (1 min)
   - Stop backend (Ctrl+C)
   - Start again (npm run dev)

5. **Test Payment** (2 min)
   - Go to checkout
   - Use test card
   - Complete payment

**Total Time: ~11 minutes to go live!** 🚀

## Current Configuration Needed

Replace these lines in `backend/.env`:
```env
RAZORPAY_KEY_ID=test_key
RAZORPAY_KEY_SECRET=test_secret
```

With your actual keys:
```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
```

Then restart backend server and payment gateway will work perfectly! 💳✨

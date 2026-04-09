# Payment Flow Diagram

## Current Test Mode Flow (With Placeholder Keys)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER CHECKOUT                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Fill Shipping    │
                    │ Details          │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Click "Pay       │
                    │ Securely"        │
                    └──────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: POST /api/payment/create-order │
        │ Body: { amount: 1050 }                   │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Check Razorpay Keys            │
        │                                          │
        │ RAZORPAY_KEY_ID =                       │
        │   "rzp_test_your_key_id_here"           │
        │ RAZORPAY_KEY_SECRET =                   │
        │   "your_key_secret_here"                │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ isRazorpayConfigured = FALSE            │
        │ (Placeholder keys detected)             │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Return Mock Order:                      │
        │ {                                        │
        │   id: "order_test_1234567890",          │
        │   amount: 105000,                       │
        │   currency: "INR",                      │
        │   test_mode: true,                      │
        │   key_id: "rzp_test_demo"               │
        │ }                                        │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: Detect test_mode = true       │
        │ Show Confirmation Dialog:               │
        │                                          │
        │ "⚠️ TEST MODE - Demo Payment            │
        │  Razorpay not configured...             │
        │  Click OK to proceed"                   │
        └─────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              [OK Clicked]         [Cancel]
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐   ┌──────────────────┐
        │ Continue         │   │ Stop             │
        │ Checkout         │   │ Cart Saved       │
        └──────────────────┘   └──────────────────┘
                    │
                    ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: POST /api/orders              │
        │ Body: {                                  │
        │   items: [...],                         │
        │   shippingAddress: {...},               │
        │   totalAmount: 1050,                    │
        │   paymentId: "demo_1234567890",         │
        │   orderId: "order_test_1234567890",     │
        │   paymentMethod: "demo",                │
        │   paymentStatus: "completed"            │
        │ }                                        │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Create Order in MongoDB        │
        │ ✅ Order saved with ID                  │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Send Email Confirmation        │
        │ To: customer@email.com                  │
        │ Subject: Order Confirmation             │
        │ Body: Beautiful HTML template with:     │
        │   - Order ID                            │
        │   - Items list                          │
        │   - Total amount                        │
        │   - Shipping address                    │
        │   - Order date                          │
        │ ✅ Email sent                           │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: Navigate to Order Success     │
        │ Page with Order Details                 │
        │ ✅ Cart cleared                         │
        │ ✅ Success message shown                │
        └─────────────────────────────────────────┘
```

---

## Real Mode Flow (When Real Keys Added)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER CHECKOUT                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Fill Shipping    │
                    │ Details          │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Click "Pay       │
                    │ Securely"        │
                    └──────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: POST /api/payment/create-order │
        │ Body: { amount: 1050 }                   │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Check Razorpay Keys            │
        │                                          │
        │ RAZORPAY_KEY_ID =                       │
        │   "rzp_live_abc123xyz789"               │
        │ RAZORPAY_KEY_SECRET =                   │
        │   "real_secret_key_here"                │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ isRazorpayConfigured = TRUE             │
        │ (Real keys detected)                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Call Razorpay API              │
        │ Create real order                       │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Return Real Razorpay Order:             │
        │ {                                        │
        │   id: "order_abc123xyz789",             │
        │   amount: 105000,                       │
        │   currency: "INR",                      │
        │   test_mode: false,                     │
        │   key_id: "rzp_live_abc123xyz789"       │
        │ }                                        │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: Detect test_mode = false      │
        │ Open Razorpay Payment Modal             │
        │ Show all payment methods:               │
        │ - Cards                                 │
        │ - UPI                                   │
        │ - Net Banking                           │
        │ - Wallets                               │
        │ - Mobile Wallets                        │
        └─────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
            [Payment Success]    [Payment Failed]
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐   ┌──────────────────┐
        │ Verify Payment   │   │ Show Error       │
        │ Signature        │   │ Message          │
        └──────────────────┘   └──────────────────┘
                    │
                    ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: POST /api/payment/verify      │
        │ Body: {                                  │
        │   razorpay_order_id: "...",             │
        │   razorpay_payment_id: "...",           │
        │   razorpay_signature: "..."             │
        │ }                                        │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Verify Signature               │
        │ ✅ Signature valid                      │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: POST /api/orders              │
        │ Create order in MongoDB                 │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Backend: Send Email Confirmation        │
        │ ✅ Email sent                           │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Frontend: Navigate to Order Success     │
        │ Page with Order Details                 │
        │ ✅ Cart cleared                         │
        │ ✅ Success message shown                │
        └─────────────────────────────────────────┘
```

---

## Key Differences

| Aspect | Test Mode | Real Mode |
|--------|-----------|-----------|
| **Keys** | Placeholder values | Real Razorpay keys |
| **Order Creation** | Mock order returned | Razorpay API called |
| **Payment Modal** | Not shown | Razorpay modal opens |
| **User Action** | Confirm dialog | Complete payment |
| **Verification** | Auto-verified | Signature verified |
| **Database** | Order saved | Order saved |
| **Email** | Sent | Sent |
| **Cost** | Free (test) | Real charges apply |

---

## Status Indicators

### Test Mode Active ✅
```
RAZORPAY_KEY_ID = rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET = your_key_secret_here
↓
isRazorpayConfigured = FALSE
↓
Test mode activated
```

### Real Mode Active ✅
```
RAZORPAY_KEY_ID = rzp_live_abc123xyz789
RAZORPAY_KEY_SECRET = real_secret_key_here
↓
isRazorpayConfigured = TRUE
↓
Real Razorpay API used
```

---

## Troubleshooting

### "Payment order creation failed"
- ❌ Old code (before fix)
- ✅ Fixed now - test mode works

### "Test mode not triggering"
- Check `.env` for placeholder keys
- Restart backend server
- Clear browser cache

### "Email not sending"
- Check Gmail credentials in `.env`
- Verify "Less secure apps" enabled
- Check spam folder

### "Order not saving"
- Check MongoDB connection
- Check order data format
- Check browser console for errors

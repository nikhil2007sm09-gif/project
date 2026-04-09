# Payment 404 Error - Debugging Guide

## Issue
Payment initialization still failing with 404 error

## Root Cause
The backend server needs to be **restarted** to load the new payment routes.

## Solution Steps

### Step 1: Stop the Backend Server
If your backend is running, stop it:
- Press `Ctrl+C` in the terminal where backend is running
- Or kill the Node process

### Step 2: Restart the Backend Server
```bash
cd backend
npm run dev
```

Or if using regular start:
```bash
cd backend
npm start
```

### Step 3: Verify Backend is Running
You should see:
```
Server running on port 5000
```

### Step 4: Test the Payment Endpoint
Run this test script:
```bash
cd backend
node scripts/testPayment.js
```

Expected output:
```
Testing payment endpoint...
✅ Payment endpoint working!
Response: {
  "test_mode": true,
  "id": "order_1234567890",
  "amount": 10000,
  "currency": "INR"
}
```

### Step 5: Try Payment Again
1. Go to checkout page
2. Fill shipping details
3. Click "Continue to Payment"
4. Click "Pay" button
5. Should see test mode confirmation dialog

## If Still Getting 404

### Check 1: Backend Server Running?
```bash
# Windows PowerShell
Get-Process node
```

### Check 2: Port 5000 Available?
```bash
# Windows PowerShell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

### Check 3: Frontend Axios Config
Check `frontend/src/utils/axios.js`:
```javascript
baseURL: 'http://localhost:5000'  // Should be this
```

### Check 4: Payment Route Registered
Backend server.js should have:
```javascript
app.use('/api/payment', paymentRoutes)
```

## Common Issues

### Issue: "Cannot find module 'razorpay'"
**Solution:** Install dependencies
```bash
cd backend
npm install
```

### Issue: "RAZORPAY_KEY_ID is undefined"
**Solution:** This is normal! The code detects placeholder values and uses test mode.

### Issue: CORS Error
**Solution:** Backend has CORS enabled. Make sure:
- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`

## Files Modified
- `backend/routes/payment.js` - Fixed payment routes
- `backend/scripts/testPayment.js` - Test script

## Next Steps
1. Restart backend server
2. Run test script
3. Try checkout again
4. Report any new errors with exact message

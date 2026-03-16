# Quick Start Guide

## 🚀 Setup in 5 Minutes

### 1. Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongosh
# If not running, start it based on your OS
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed    # Creates test users and products
npm run dev     # Starts backend on port 5000
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev     # Starts frontend on port 3000
```

### 4. Open Browser
Go to: http://localhost:3000

## 🧪 Test Accounts

### Easy Login (Recommended)
Go to: http://localhost:3000/login

Then click on the user type button:
- Customer
- Vendor  
- Affiliate
- Admin

### Approved Accounts (Can Login)

**Customer:**
- Email: customer@test.com
- Password: customer123

**Vendor:**
- Email: vendor@test.com
- Password: vendor123

**Affiliate:**
- Email: affiliate@test.com
- Password: affiliate123

**Admin:**
- Email: admin@test.com
- Password: admin123

### Pending Approval Accounts (For Testing)

**Pending Vendor:**
- Email: pending.vendor@test.com
- Password: vendor123
- Status: Waiting for admin approval

**Pending Affiliate:**
- Email: pending.affiliate@test.com
- Password: affiliate123
- Status: Waiting for admin approval

## 📝 Registration

### Vendor Registration
1. Go to: http://localhost:3000/vendor/register
2. Fill in business details
3. Submit registration
4. Wait for admin approval
5. Login after approval

### Affiliate Registration
1. Go to: http://localhost:3000/affiliate/register
2. Fill in affiliate details
3. Submit registration
4. Wait for admin approval
5. Login after approval

## ✅ What to Test

1. **Customer Flow:**
   - Browse products
   - Add to cart
   - Checkout (payment will be in test mode)

2. **Vendor Registration & Approval:**
   - Register new vendor at /vendor/register
   - Try to login (should show pending message)
   - Login as admin
   - Go to "Pending Approvals" tab
   - Approve the vendor
   - Now vendor can login

3. **Affiliate Registration & Approval:**
   - Register new affiliate at /affiliate/register
   - Try to login (should show pending message)
   - Login as admin
   - Approve the affiliate
   - Now affiliate can login

4. **Vendor Flow:**
   - Login as approved vendor
   - Add new products
   - View your products

5. **Affiliate Flow:**
   - Login as approved affiliate
   - Get your affiliate link
   - View commission stats

6. **Admin Flow:**
   - Login as admin
   - View dashboard with all stats
   - Check "Pending Approvals" tab (shows 2 pending users)
   - Approve or reject users
   - View all users and orders

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running on port 27017
- Check connection string in `backend/.env`

### Port Already in Use
- Backend: Change PORT in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### Login Not Working
- Clear browser localStorage
- Make sure backend is running
- Check browser console for errors

# Quick Start - New Features

## 🚀 Vendor Activity Tracking

### Kya Hai Ye?
Admin ab dekh sakta hai:
- Vendor kitni der active tha
- Kab login kiya
- Kab logout kiya
- Kaun abhi online hai
- Login history with duration

### Kaise Use Karein?

#### Step 1: Backend Start Karo
```bash
cd backend
npm start
```

#### Step 2: Vendor Se Login Karo
```
1. Browser mein jao: http://localhost:5173/vendor/login
2. Login karo
3. Kuch kaam karo (products add karo, etc.)
4. Logout karo
```

#### Step 3: Admin Se Login Karo
```
1. Browser mein jao: http://localhost:5173/login
2. Admin credentials se login karo
3. Admin Dashboard pe jao
```

#### Step 4: Vendor Activity Dekho
```
1. "Vendor Activity" tab click karo
2. Dekho:
   - Kaun vendor online hai (green pulse)
   - Total active time
   - Last login/logout
   - Recent login history
```

### Screenshot Kya Dikhega?
```
┌─────────────────────────────────────────┐
│ Vendor Activity Tracking                │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Test Vendor          🟢 Online      │ │
│ │ 📧 vendor@example.com               │ │
│ │                                     │ │
│ │ Total Active: 2h 30m                │ │
│ │ Sessions: 15                        │ │
│ │ Last Login: 9 Mar 2026, 10:30 AM   │ │
│ │ Last Logout: 9 Mar 2026, 9:00 AM   │ │
│ │                                     │ │
│ │ Recent Login History:               │ │
│ │ 📅 9 Mar 2026, 10:30 AM  ⏱️ 45m 30s│ │
│ │ 📅 9 Mar 2026, 9:00 AM   ⏱️ 1h 15m │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🔍 Affiliate Login Debugging

### Problem Kya Hai?
Affiliate login nahi ho raha? "Invalid credentials" error aa raha?

### Solution - 3 Steps

#### Step 1: Backend Logs Dekho
```bash
cd backend
npm start
```

Ab affiliate login try karo aur console mein ye logs dikhenge:
```
🔐 Login attempt: { email: 'test@example.com', userType: 'affiliate' }
✅ User found: { email: 'test@example.com', role: 'affiliate', approved: true }
✅ Password matched for: test@example.com
✅ Login successful for: test@example.com
```

Agar error hai to dikha dega:
```
❌ User not found: test@example.com
// Ya
❌ Password mismatch for: test@example.com
// Ya
⏳ Account pending approval: test@example.com
```

#### Step 2: Check Affiliate Script Run Karo
```bash
cd backend
npm run check-affiliate
```

Output:
```
✅ Connected to MongoDB

📧 Affiliate Found!
=====================================
Name: Test Affiliate
Email: test@example.com
Role: affiliate
Approved: ✅ YES
Affiliate Code: ABC123
Created: 2026-03-09
=====================================

✅ Account is approved! You can login now.
```

#### Step 3: Fix Based on Output

**Agar "Affiliate user not found":**
```
1. Dobara register karo: http://localhost:5173/affiliate/register
2. Email spelling check karo
```

**Agar "Approved: ❌ NO":**
```
1. Admin se login karo
2. Admin Dashboard > Pending Approvals
3. Affiliate ko approve karo
```

**Agar "Password test: ❌ Wrong password":**
```
1. Password reset karo
2. Ya dobara register karo
```

## 📝 Complete Testing Flow

### Test 1: Vendor Activity Tracking

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

**Browser:**
1. Vendor login: http://localhost:5173/vendor/login
2. Kuch products add karo
3. 5-10 minutes wait karo
4. Logout karo
5. Admin login: http://localhost:5173/login
6. Admin Dashboard > Vendor Activity tab
7. ✅ Vendor ka activity dikha!

### Test 2: Affiliate Login Debug

```bash
# Terminal 1 - Backend (logs dekho)
cd backend
npm start

# Terminal 2 - Check Script
cd backend
npm run check-affiliate
```

**Browser:**
1. Affiliate register: http://localhost:5173/affiliate/register
2. Admin se approve karo
3. Affiliate login try karo
4. Backend console logs dekho
5. ✅ Login successful!

## 🎯 Expected Results

### Vendor Activity Tab
- ✅ Vendors list with activity
- ✅ Online status indicator
- ✅ Total active time
- ✅ Login history
- ✅ Session durations

### Affiliate Login
- ✅ Detailed console logs
- ✅ Easy debugging
- ✅ Clear error messages
- ✅ Check script working

## 🐛 Troubleshooting

### Backend Not Starting?
```bash
cd backend
npm install
npm start
```

### Frontend Not Starting?
```bash
cd frontend
npm install
npm run dev
```

### MongoDB Not Connected?
Check `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/clothes-shop
```

### Still Issues?
1. Backend console logs share karo
2. `npm run check-affiliate` output share karo
3. Browser console errors share karo

## 📚 Documentation Files

- `VENDOR_ACTIVITY_TRACKING.md` - Complete vendor activity guide
- `AFFILIATE_LOGIN_DEBUG.md` - Detailed debugging guide
- `LATEST_UPDATES.md` - Summary of changes
- `QUICK_START_NEW_FEATURES.md` - This file

## ✨ Summary

### Vendor Activity Tracking
- ✅ Fully implemented
- ✅ Working automatically
- ✅ Data saved in MongoDB
- ✅ Admin dashboard tab ready

### Affiliate Login Debugging
- ✅ Enhanced console logs
- ✅ Check script available
- ✅ Easy troubleshooting
- ✅ Clear error messages

## 🎉 Next Steps

1. Backend start karo
2. Vendor se login/logout karo
3. Admin dashboard mein activity dekho
4. Affiliate login issue debug karo using logs
5. Enjoy! 🚀

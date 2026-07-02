# Troubleshooting Guide - Dashboard Not Opening

## Step-by-Step Debugging

### Step 1: Check Backend is Running

```bash
# Backend terminal should show:
MongoDB connected
Server running on port 5000
```

If not running:
```bash
cd backend
npm run dev
```

### Step 2: Check Frontend is Running

```bash
# Frontend terminal should show:
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

If not running:
```bash
cd frontend
npm run dev
```

### Step 3: Test Auth System

1. Open browser: http://localhost:3000/test-auth
2. This page shows:
   - If user is logged in
   - User details (name, email, role)
   - Token in localStorage

### Step 4: Clear Cache and Re-login

```javascript
// Open browser console (F12) and run:
localStorage.clear()
// Then refresh page and login again
```

### Step 5: Test Login Flow

1. Go to: http://localhost:3000/login
2. Click on "Admin" button
3. Enter credentials:
   - Email: admin@test.com
   - Password: admin123
4. Check browser console (F12) for:
   - "Login result:" log
   - "User data:" log
5. Should redirect to /admin/dashboard

### Step 6: Check Browser Console for Errors

Open browser console (F12) and look for:
- Red error messages
- Network errors (failed API calls)
- Authentication errors

Common errors:
```
401 Unauthorized - Token invalid or expired
403 Forbidden - User doesn't have permission
404 Not Found - API endpoint not found
500 Server Error - Backend error
```

### Step 7: Test Backend Directly

```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","userType":"admin"}'

# Should return:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin",
    "approved": true
  }
}
```

### Step 8: Check Database

```bash
mongosh
use clothesshop
db.users.find({ email: "admin@test.com" }).pretty()

# Should show admin user with:
# - role: "admin"
# - approved: true
```

### Step 9: Re-seed Database

If users are missing or incorrect:
```bash
cd backend
npm run seed
```

This will:
- Delete all existing users
- Create fresh test users
- Set proper approved status

### Step 10: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to login
4. Check API calls:
   - POST /api/auth/login - Should return 200
   - GET /api/auth/me - Should return 200
   - GET /api/admin/stats - Should return 200

## Common Issues and Solutions

### Issue 1: "Access Denied" Message

**Cause:** User role doesn't match required role

**Solution:**
1. Go to /test-auth
2. Check user role
3. Make sure:
   - Admin can access /admin/dashboard
   - Vendor can access /vendor/dashboard
   - Affiliate can access /affiliate/dashboard

### Issue 2: Redirects to Login Page

**Cause:** User not authenticated or token expired

**Solution:**
```javascript
// Clear localStorage and re-login
localStorage.clear()
```

### Issue 3: "Pending Approval" Message

**Cause:** Vendor/Affiliate account not approved

**Solution:**
1. Login as admin
2. Go to "Pending Approvals" tab
3. Approve the user
4. Logout and login as that user

### Issue 4: Dashboard Shows Blank/White Screen

**Cause:** JavaScript error or API error

**Solution:**
1. Check browser console for errors
2. Check Network tab for failed API calls
3. Make sure backend is running
4. Check backend terminal for errors

### Issue 5: "Cannot read property of undefined"

**Cause:** User object not properly loaded

**Solution:**
1. Check /test-auth page
2. Make sure user object has all fields:
   - id
   - name
   - email
   - role
   - approved

### Issue 6: CORS Error

**Cause:** Backend not allowing frontend requests

**Solution:**
Backend should have:
```javascript
app.use(cors())
```

Already configured in backend/server.js

### Issue 7: MongoDB Connection Error

**Cause:** MongoDB not running

**Solution:**
```bash
# Start MongoDB
mongod

# Or check if running:
mongosh
```

## Quick Fix Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB running on port 27017
- [ ] Database seeded with test users
- [ ] localStorage cleared
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls
- [ ] /test-auth shows user logged in
- [ ] User role matches dashboard (admin → admin dashboard)

## Test Each Dashboard

### Admin Dashboard
```
URL: http://localhost:3000/login?type=admin
Email: admin@test.com
Password: admin123
Expected: Should see admin dashboard with stats
```

### Vendor Dashboard
```
URL: http://localhost:3000/login?type=vendor
Email: vendor@test.com
Password: vendor123
Expected: Should see vendor dashboard with products
```

### Affiliate Dashboard
```
URL: http://localhost:3000/login?type=affiliate
Email: affiliate@test.com
Password: affiliate123
Expected: Should see affiliate dashboard with stats
```

## Still Not Working?

1. Stop both servers (Ctrl+C)
2. Clear everything:
```bash
# Backend
cd backend
rm -rf node_modules
npm install
npm run seed

# Frontend
cd frontend
rm -rf node_modules
npm install
```

3. Start fresh:
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

4. Clear browser:
   - Clear localStorage
   - Clear cookies
   - Hard refresh (Ctrl+Shift+R)

5. Test again from /login page

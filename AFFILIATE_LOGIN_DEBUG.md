# Affiliate Login Debugging Guide

## Issue
Affiliate cannot login even after registration and admin approval. Shows "Invalid credentials" error.

## Enhanced Debugging

### Backend Console Logs Added
The login route now has detailed console logs to help diagnose issues:

```
🔐 Login attempt: { email, userType }
✅ User found: { email, role, approved }
✅ Password matched
⏳ Account pending approval (if not approved)
✅ Login successful
❌ Various error states
```

## Debugging Steps

### Step 1: Check Backend Logs
1. Make sure backend is running with `npm start`
2. Watch the console when attempting affiliate login
3. Look for the emoji logs to see where it fails

### Step 2: Run Affiliate Check Script
```bash
cd backend
npm run check-affiliate
```

This will show:
- If affiliate user exists
- Email and role
- Approval status
- Affiliate code
- All affiliates in database

### Step 3: Update Check Script
Edit `backend/checkAffiliate.js`:
```javascript
const email = 'your-affiliate-email@example.com' // Change this
const testPassword = 'your-password' // Change this
```

### Step 4: Common Issues & Solutions

#### Issue 1: User Not Found
**Symptoms:**
```
❌ User not found: email@example.com
```

**Solution:**
- Register again from frontend
- Check email spelling
- Verify database connection

#### Issue 2: Not Approved
**Symptoms:**
```
⏳ Account pending approval
```

**Solution:**
1. Login as admin
2. Go to Admin Dashboard
3. Click "Pending Approvals" tab
4. Approve the affiliate

#### Issue 3: Wrong Password
**Symptoms:**
```
❌ Password mismatch for: email@example.com
```

**Solution:**
- Reset password or register new account
- Check for typos
- Ensure password meets requirements

#### Issue 4: Role Mismatch
**Symptoms:**
```
❌ Role mismatch: { expected: 'affiliate', actual: 'customer' }
```

**Solution:**
- User registered as wrong role
- Register new account as affiliate
- Or login without specifying userType

## Testing Procedure

### 1. Fresh Registration
```
1. Go to /affiliate/register
2. Fill form with:
   - Name: Test Affiliate
   - Email: test@example.com
   - Password: Test123!
3. Submit
4. Should see: "Registration successful! Your account is pending admin approval"
5. Check email for welcome message
```

### 2. Admin Approval
```
1. Login as admin
2. Go to Admin Dashboard
3. Click "Pending Approvals" tab
4. Find the affiliate
5. Click "Approve"
6. Affiliate should receive approval email
```

### 3. Affiliate Login
```
1. Go to /affiliate/login
2. Enter email and password
3. Watch backend console logs
4. Should see:
   🔐 Login attempt
   ✅ User found
   ✅ Password matched
   ✅ Login successful
5. Should redirect to /affiliate/dashboard
```

## Backend Login Flow

```javascript
1. Receive login request { email, password, userType: 'affiliate' }
2. Find user by email
3. Check if user exists
4. Verify userType matches role
5. Compare password with bcrypt
6. Check if approved (for vendor/affiliate)
7. Track login activity (NEW!)
8. Generate JWT token
9. Return token and user data
```

## Frontend Login Flow

```javascript
1. User submits form
2. Call AuthContext.login(email, password, 'affiliate')
3. POST to /api/auth/login
4. Save token to localStorage
5. Set axios Authorization header
6. Update user state
7. Navigate to dashboard
```

## Database Check

### Using MongoDB Compass or CLI
```javascript
// Find affiliate user
db.users.findOne({ 
  email: "test@example.com",
  role: "affiliate" 
})

// Check fields
{
  _id: ObjectId("..."),
  name: "Test Affiliate",
  email: "test@example.com",
  password: "$2a$10$...", // Hashed
  role: "affiliate",
  approved: true, // Must be true!
  affiliateCode: "ABC123",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

## Network Tab Check

### In Browser DevTools
1. Open Network tab
2. Attempt login
3. Find POST request to `/api/auth/login`
4. Check Request Payload:
```json
{
  "email": "test@example.com",
  "password": "Test123!",
  "userType": "affiliate"
}
```
5. Check Response:
```json
// Success (200)
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test Affiliate",
    "email": "test@example.com",
    "role": "affiliate",
    "approved": true
  }
}

// Error (400/403)
{
  "message": "Invalid credentials"
}
// or
{
  "message": "Your account is pending approval",
  "pending": true
}
```

## Quick Fix Checklist

- [ ] Backend server is running
- [ ] MongoDB is connected
- [ ] User exists in database
- [ ] User role is "affiliate"
- [ ] User approved is true
- [ ] Password is correct
- [ ] Email is correct (no typos)
- [ ] Using /affiliate/login page
- [ ] Network request shows userType: "affiliate"
- [ ] No CORS errors in console
- [ ] JWT_SECRET is set in .env

## Still Not Working?

### Create Test Affiliate Manually
```bash
cd backend
node createTestUser.js
# Edit the script to create affiliate instead of admin
```

Or use MongoDB directly:
```javascript
db.users.insertOne({
  name: "Test Affiliate",
  email: "test@example.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "affiliate",
  approved: true,
  affiliateCode: "TEST123",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Contact Support
If issue persists after all checks:
1. Share backend console logs
2. Share network tab screenshots
3. Share database user document
4. Share any error messages

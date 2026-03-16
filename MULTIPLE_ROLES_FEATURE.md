# Multiple Roles Feature - Complete Guide

## Overview
Users can now have multiple roles with the same email. Ek user vendor bhi ho sakta hai aur affiliate bhi, same email se!

## What Changed?

### Before:
- ❌ One email = One role only
- ❌ Vendor ban gaye to affiliate nahi ban sakte
- ❌ Email already exists error

### After:
- ✅ One email = Multiple roles
- ✅ Vendor + Affiliate dono ban sakte ho
- ✅ Same email, same password, different dashboards

## Features Implemented

### 1. User Model Updates (`backend/models/User.js`)

**New Fields:**
```javascript
{
  role: String,              // Primary role (backward compatible)
  roles: [String],           // Array of all roles
  vendorApproved: Boolean,   // Vendor approval status
  affiliateApproved: Boolean // Affiliate approval status
}
```

**Example User:**
```javascript
{
  email: "john@example.com",
  password: "hashed_password",
  role: "vendor",            // Primary role
  roles: ["customer", "vendor", "affiliate"], // All roles
  vendorApproved: true,      // Vendor approved
  affiliateApproved: false,  // Affiliate pending
  affiliateCode: "ABC123"
}
```

### 2. Registration Logic (`backend/routes/auth.js`)

**Scenario 1: New User**
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "vendor"
}

Response:
{
  "message": "Registration successful! Your account is pending admin approval.",
  "pending": true
}
```

**Scenario 2: Existing User Adding Role**
```javascript
// User already exists as customer
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com", // Same email
  "password": "password123",    // Same password
  "role": "affiliate"           // New role
}

Response:
{
  "message": "Affiliate role added successfully! Your account is pending admin approval.",
  "pending": true
}
```

### 3. Login Logic (`backend/routes/auth.js`)

**Login as Vendor:**
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123",
  "userType": "vendor"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "vendor",
    "roles": ["customer", "vendor", "affiliate"],
    "approved": true
  }
}
```

**Login as Affiliate:**
```javascript
POST /api/auth/login
{
  "email": "john@example.com",  // Same email
  "password": "password123",     // Same password
  "userType": "affiliate"        // Different role
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "affiliate",
    "roles": ["customer", "vendor", "affiliate"],
    "approved": false,
    "affiliateCode": "ABC123"
  }
}
```

### 4. Admin Approval (`backend/routes/admin.js`)

**Approve Specific Role:**
```javascript
PATCH /api/admin/approve-user/:userId
{
  "roleToApprove": "vendor"  // or "affiliate"
}

Response:
{
  "message": "User approved successfully",
  "user": { ... }
}
```

## User Flow Examples

### Example 1: Customer → Vendor → Affiliate

**Step 1: Register as Customer**
```
Email: john@example.com
Password: pass123
Role: customer
Status: ✅ Active (no approval needed)
```

**Step 2: Register as Vendor (Same Email)**
```
Email: john@example.com (same)
Password: pass123 (same)
Role: vendor (new)
Status: ⏳ Pending approval
```

**Step 3: Admin Approves Vendor**
```
Admin clicks "Approve" for vendor role
Status: ✅ Vendor approved
```

**Step 4: Register as Affiliate (Same Email)**
```
Email: john@example.com (same)
Password: pass123 (same)
Role: affiliate (new)
Status: ⏳ Pending approval
Affiliate Code: ABC123 (generated)
```

**Step 5: Admin Approves Affiliate**
```
Admin clicks "Approve" for affiliate role
Status: ✅ Affiliate approved
```

**Final User State:**
```javascript
{
  email: "john@example.com",
  roles: ["customer", "vendor", "affiliate"],
  vendorApproved: true,
  affiliateApproved: true,
  affiliateCode: "ABC123"
}
```

### Example 2: Vendor Wants to Become Affiliate

**Current State:**
```
Email: vendor@example.com
Roles: ["vendor"]
Vendor Approved: ✅ Yes
```

**Register as Affiliate:**
```
1. Go to /affiliate/register
2. Use same email: vendor@example.com
3. Use same password
4. Submit form
```

**Result:**
```
Roles: ["vendor", "affiliate"]
Vendor Approved: ✅ Yes
Affiliate Approved: ⏳ Pending
Message: "Affiliate role added successfully!"
```

**After Admin Approval:**
```
Roles: ["vendor", "affiliate"]
Vendor Approved: ✅ Yes
Affiliate Approved: ✅ Yes
```

**Login Options:**
```
1. Login as Vendor: /vendor/login
2. Login as Affiliate: /affiliate/login
(Same email, same password, different dashboards)
```

## Login Behavior

### Vendor Login
```
URL: /vendor/login
Email: john@example.com
Password: pass123
UserType: vendor

Checks:
1. ✅ User exists?
2. ✅ Password correct?
3. ✅ Has vendor role?
4. ✅ Vendor approved?

Success: Redirect to /vendor/dashboard
```

### Affiliate Login
```
URL: /affiliate/login
Email: john@example.com (same)
Password: pass123 (same)
UserType: affiliate

Checks:
1. ✅ User exists?
2. ✅ Password correct?
3. ✅ Has affiliate role?
4. ✅ Affiliate approved?

Success: Redirect to /affiliate/dashboard
```

## Error Messages

### Registration Errors

**Already Have This Role:**
```
{
  "message": "You already have a vendor account with this email"
}
```

**Role Added Successfully:**
```
{
  "message": "Affiliate role added successfully! Your account is pending admin approval.",
  "pending": true
}
```

### Login Errors

**Don't Have Requested Role:**
```
{
  "message": "You don't have a affiliate account. Please register as affiliate first."
}
```

**Pending Approval:**
```
{
  "message": "Your vendor account is pending approval. Please wait for admin approval.",
  "pending": true
}
```

## Admin Dashboard Changes

### Pending Approvals Tab

**Before:**
```
Shows users with approved: false
```

**After:**
```
Shows users with:
- vendorApproved: false AND roles includes 'vendor'
- affiliateApproved: false AND roles includes 'affiliate'
```

**Display:**
```
User: John Doe (john@example.com)
Roles: Vendor ⏳, Affiliate ✅
Actions: 
- Approve Vendor
- Approve Affiliate
```

## Database Schema

### User Document Example
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...",
  
  // Primary role (backward compatible)
  role: "vendor",
  
  // All roles
  roles: ["customer", "vendor", "affiliate"],
  
  // Approval status
  approved: true,           // Legacy field
  vendorApproved: true,     // Vendor specific
  affiliateApproved: true,  // Affiliate specific
  
  // Affiliate specific
  affiliateCode: "ABC123",
  
  // Business details (vendor)
  businessDetails: {
    businessName: "John's Store",
    phone: "+91 1234567890"
  },
  
  // Activity tracking
  lastLoginAt: ISODate("..."),
  loginHistory: [...]
}
```

## Migration Notes

### Existing Users
Existing users will automatically get:
```javascript
{
  roles: [role],  // Single role converted to array
  vendorApproved: approved,    // If role === 'vendor'
  affiliateApproved: approved  // If role === 'affiliate'
}
```

### No Data Loss
- All existing data preserved
- Backward compatible
- Old `role` and `approved` fields still work

## Testing

### Test Case 1: New User Multiple Roles
```bash
# 1. Register as vendor
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "role": "vendor"
}

# 2. Admin approves vendor
PATCH /api/admin/approve-user/:userId
{ "roleToApprove": "vendor" }

# 3. Login as vendor
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "test123",
  "userType": "vendor"
}
✅ Success

# 4. Register as affiliate (same email)
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "role": "affiliate"
}
✅ Affiliate role added

# 5. Admin approves affiliate
PATCH /api/admin/approve-user/:userId
{ "roleToApprove": "affiliate" }

# 6. Login as affiliate
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "test123",
  "userType": "affiliate"
}
✅ Success
```

### Test Case 2: Login Without Approval
```bash
# Register as vendor
POST /api/auth/register (vendor)

# Try to login (not approved yet)
POST /api/auth/login (vendor)
❌ Error: "Your vendor account is pending approval"
```

### Test Case 3: Login Wrong Role
```bash
# User only has vendor role
POST /api/auth/login
{
  "email": "vendor@example.com",
  "userType": "affiliate"
}
❌ Error: "You don't have a affiliate account. Please register as affiliate first."
```

## Benefits

### For Users:
- ✅ One email for everything
- ✅ One password to remember
- ✅ Multiple business roles
- ✅ Easy role switching

### For Business:
- ✅ Better user management
- ✅ Flexible role system
- ✅ Individual role approvals
- ✅ Detailed tracking

## Summary

Ab users ek email se multiple roles rakh sakte hain:
- ✅ Vendor + Affiliate same email
- ✅ Same password, different dashboards
- ✅ Individual approval for each role
- ✅ Backward compatible
- ✅ No data loss

Perfect for users jo multiple businesses chalate hain! 🎉

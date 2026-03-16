# Vendor & Affiliate Approval System

## Overview

Vendor aur Affiliate accounts ko admin approval ki zarurat hoti hai. Customer aur Admin accounts automatically approved hote hain.

## Registration Flow

### Vendor Registration

1. **Registration Page:** `/vendor/register`
2. **Required Information:**
   - Full Name
   - Email
   - Password
   - Business Name
   - Business Address
   - Phone Number
   - GST Number (Optional)

3. **After Registration:**
   - Account create ho jata hai
   - Status: `approved: false`
   - Success message dikhta hai
   - Redirect to login page

4. **Login Attempt:**
   - Login karne par error message: "Your account is pending approval"
   - Dashboard access nahi milta

5. **After Admin Approval:**
   - Admin approve karta hai
   - Status: `approved: true`
   - Ab login kar sakte hain
   - Dashboard access mil jata hai

### Affiliate Registration

1. **Registration Page:** `/affiliate/register`
2. **Required Information:**
   - Full Name
   - Email
   - Password
   - Phone Number
   - Website/Blog URL (Optional)
   - Social Media Profile (Optional)

3. **After Registration:**
   - Account create ho jata hai
   - Unique affiliate code generate hota hai
   - Status: `approved: false`
   - Success message dikhta hai
   - Redirect to login page

4. **Login Attempt:**
   - Login karne par error message: "Your account is pending approval"
   - Dashboard access nahi milta

5. **After Admin Approval:**
   - Admin approve karta hai
   - Status: `approved: true`
   - Ab login kar sakte hain
   - Dashboard aur affiliate link access mil jata hai

## Admin Approval Process

### Admin Dashboard

1. **Login as Admin:**
   - Email: admin@test.com
   - Password: admin123

2. **Pending Approvals Tab:**
   - Red badge shows pending count
   - Click "Pending Approvals" tab
   - List of all pending vendors and affiliates

3. **Review User Details:**
   - Name, Email, Role
   - Registration date
   - Business details (for vendors)
   - Contact information (for affiliates)

4. **Approve User:**
   - Click "Approve" button
   - User status changes to `approved: true`
   - User can now login

5. **Reject User:**
   - Click "Reject" button
   - Confirmation dialog appears
   - User account gets deleted
   - User cannot login

## Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: 'customer' | 'vendor' | 'affiliate' | 'admin',
  approved: Boolean,
  affiliateCode: String (only for affiliates),
  businessDetails: {
    businessName: String,
    businessAddress: String,
    phone: String,
    gstNumber: String,
    website: String,
    socialMedia: String
  }
}
```

### Approval Logic

```javascript
approved: {
  type: Boolean,
  default: function() {
    // Customer aur Admin automatically approved
    return this.role === 'customer' || this.role === 'admin'
  }
}
```

## API Endpoints

### Registration
- `POST /api/auth/register`
- Body: `{ name, email, password, role, businessDetails }`
- Response: Success message (no token if pending approval)

### Login
- `POST /api/auth/login`
- Body: `{ email, password, userType }`
- Response: 
  - If approved: `{ token, user }`
  - If pending: `{ message: "Pending approval", pending: true }`

### Admin Endpoints
- `GET /api/admin/pending-approvals` - Get all pending users
- `PATCH /api/admin/approve-user/:userId` - Approve user
- `PATCH /api/admin/reject-user/:userId` - Reject and delete user

## Testing

### Test Pending Accounts

Database seed creates 2 pending accounts:

1. **Pending Vendor:**
   - Email: pending.vendor@test.com
   - Password: vendor123
   - Try to login - will show pending message

2. **Pending Affiliate:**
   - Email: pending.affiliate@test.com
   - Password: affiliate123
   - Try to login - will show pending message

### Test Approval Flow

1. Login as admin
2. Go to "Pending Approvals" tab
3. See 2 pending users
4. Click "Approve" on one
5. Logout
6. Login with that approved user
7. Should work now!

## User Experience

### Registration Success Screen

```
✓ Registration Successful!

Your [vendor/affiliate] account has been created successfully.
Your account is pending admin approval.

You will be able to login once an admin approves your account.

Redirecting to login page...
```

### Login Pending Message

```
⚠️ Your account is pending admin approval. Please wait for approval.
```

### Admin Notification

```
⚠️ Action Required
You have 2 pending approvals. Review now
```

## Benefits

1. **Quality Control:** Admin can review business details before approval
2. **Fraud Prevention:** Prevents fake vendor/affiliate accounts
3. **Better Management:** Admin has full control over who can sell
4. **Professional:** Shows business is serious about partnerships
5. **Compliance:** Can verify GST numbers and business details

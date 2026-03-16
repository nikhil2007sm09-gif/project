# Admin Login Fix - Quick Guide

## Problem
Admin login showing error: "You don't have a admin account. Please register as admin first."

## Cause
Existing admin users don't have the new `roles` array field. The new multi-role system checks `roles` array, but old users only have `role` field.

## Solution

### Option 1: Run Migration Script (Recommended)

This will update all existing users to have the new fields:

```bash
cd backend
npm run migrate-users
```

**What it does:**
- Adds `roles` array to all users (based on their `role` field)
- Sets `vendorApproved` for vendors
- Sets `affiliateApproved` for affiliates
- Preserves all existing data

**Output:**
```
✅ Connected to MongoDB

📊 Found 5 users to migrate

➕ Adding roles array to admin@example.com: [admin]
✅ Migrated: admin@example.com

➕ Adding roles array to vendor@example.com: [vendor]
➕ Setting vendorApproved for vendor@example.com: true
✅ Migrated: vendor@example.com

📈 Migration Summary:
✅ Migrated: 5 users
⏭️  Skipped: 0 users (already up to date)
📊 Total: 5 users

✅ Database connection closed
```

### Option 2: Create New Admin User

If you want to create a fresh admin user:

```bash
cd backend
npm run create-users
```

Then edit `createTestUser.js` to create admin:
```javascript
const user = new User({
  name: 'Admin',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
  roles: ['admin'],
  approved: true
})
```

### Option 3: Manual Database Update

Using MongoDB Compass or CLI:

```javascript
// Update all users to have roles array
db.users.updateMany(
  { roles: { $exists: false } },
  [
    {
      $set: {
        roles: ["$role"],
        vendorApproved: {
          $cond: {
            if: { $eq: ["$role", "vendor"] },
            then: "$approved",
            else: false
          }
        },
        affiliateApproved: {
          $cond: {
            if: { $eq: ["$role", "affiliate"] },
            then: "$approved",
            else: false
          }
        }
      }
    }
  ]
)
```

## Verification

After running migration, verify admin user:

```bash
# Using MongoDB CLI
mongosh
use clothesshop
db.users.findOne({ role: 'admin' })
```

**Should see:**
```javascript
{
  _id: ObjectId("..."),
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...",
  role: "admin",
  roles: ["admin"],  // ✅ This should be present
  approved: true,
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

## Testing Admin Login

After migration:

1. **Go to Login Page**
   ```
   http://localhost:5173/login
   ```

2. **Enter Admin Credentials**
   ```
   Email: admin@example.com
   Password: admin123
   ```

3. **Should Login Successfully**
   ```
   ✅ Redirects to /admin/dashboard
   ```

## Backend Console Logs

Successful admin login should show:
```
🔐 Login attempt: { email: 'admin@example.com', userType: undefined }
✅ User found: { email: 'admin@example.com', role: 'admin', roles: ['admin'], approved: true }
✅ Password matched for: admin@example.com
✅ Login successful for: admin@example.com
```

## Troubleshooting

### Still Getting Error?

1. **Check if migration ran:**
   ```bash
   cd backend
   npm run migrate-users
   ```

2. **Check database:**
   ```javascript
   db.users.find({ role: 'admin' }).pretty()
   ```

3. **Verify roles array exists:**
   ```javascript
   db.users.findOne({ email: 'admin@example.com' }).roles
   // Should return: ["admin"]
   ```

4. **Check backend logs:**
   - Look for "User found" log
   - Check if `roles` array is present

### Create Fresh Admin

If migration doesn't work, create new admin:

```bash
cd backend
node -e "
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const admin = new User({
    name: 'Admin',
    email: 'newadmin@example.com',
    password: 'admin123',
    role: 'admin',
    roles: ['admin'],
    approved: true
  });
  await admin.save();
  console.log('✅ Admin created');
  process.exit(0);
});
"
```

## Summary

**Quick Fix:**
```bash
cd backend
npm run migrate-users
```

This will fix all existing users including admin! ✅

**Then test:**
```
1. Go to http://localhost:5173/login
2. Login with admin credentials
3. Should work! 🎉
```

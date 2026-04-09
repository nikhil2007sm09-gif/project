# Registration & Approval Flow

## Vendor Registration Process

### Step 1: Vendor Registration
**URL:** http://localhost:3000/vendor/register

**Fill Details:**
- Full Name
- Email
- Password
- Confirm Password
- Business Name
- Business Address
- Phone Number
- GST Number (optional)

**Click:** "Register as Vendor"

### Step 2: Success Message
```
✓ Registration Successful!

Your vendor account has been created successfully.
Your account is pending admin approval.

You will be able to login once an admin approves your account.

Redirecting to login page...
```

### Step 3: Try to Login
**URL:** http://localhost:3000/vendor/login

**Enter:**
- Email: (your registered email)
- Password: (your password)

**Result:** Error message dikhega:
```
⚠️ Your account is pending admin approval. Please wait for approval.
```

### Step 4: Admin Approval
**Admin Login:**
- URL: http://localhost:3000/login?type=admin
- Email: admin@test.com
- Password: admin123

**Admin Dashboard:**
1. Click "Pending Approvals" tab
2. See your vendor account
3. Review business details
4. Click "Approve" button

### Step 5: Vendor Can Now Login
**Go back to:** http://localhost:3000/vendor/login

**Enter:**
- Email: (your email)
- Password: (your password)

**Result:** ✅ Login successful! Redirect to Vendor Dashboard

---

## Affiliate Registration Process

### Step 1: Affiliate Registration
**URL:** http://localhost:3000/affiliate/register

**Fill Details:**
- Full Name
- Email
- Password
- Confirm Password
- Phone Number
- Website/Blog URL (optional)
- Social Media Profile (optional)

**Click:** "Register as Affiliate"

### Step 2: Success Message
```
✓ Registration Successful!

Your affiliate account has been created successfully.
Your account is pending admin approval.

You will be able to login once an admin approves your account.

Redirecting to login page...
```

### Step 3: Try to Login
**URL:** http://localhost:3000/affiliate/login

**Enter:**
- Email: (your registered email)
- Password: (your password)

**Result:** Error message dikhega:
```
⚠️ Your account is pending admin approval. Please wait for approval.
```

### Step 4: Admin Approval
**Admin Login:**
- URL: http://localhost:3000/login?type=admin
- Email: admin@test.com
- Password: admin123

**Admin Dashboard:**
1. Click "Pending Approvals" tab
2. See your affiliate account
3. Review contact details
4. Click "Approve" button

### Step 5: Affiliate Can Now Login
**Go back to:** http://localhost:3000/affiliate/login

**Enter:**
- Email: (your email)
- Password: (your password)

**Result:** ✅ Login successful! Redirect to Affiliate Dashboard

---

## Customer Registration (No Approval Needed)

### Direct Registration & Login
**URL:** http://localhost:3000/register

**Fill Details:**
- Full Name
- Email
- Password
- Confirm Password

**Click:** "Register"

**Result:** ✅ Automatically logged in! No approval needed.

---

## Technical Details

### Database Status

**Before Approval:**
```javascript
{
  name: "Vendor Name",
  email: "vendor@example.com",
  role: "vendor",
  approved: false  // ← Cannot login
}
```

**After Approval:**
```javascript
{
  name: "Vendor Name",
  email: "vendor@example.com",
  role: "vendor",
  approved: true   // ← Can login now
}
```

### Backend Logic

**Registration (backend/routes/auth.js):**
```javascript
// Vendor/Affiliate registration
const user = new User({
  name, email, password,
  role: 'vendor', // or 'affiliate'
  approved: false  // Default false for vendor/affiliate
})

// Customer registration
const user = new User({
  name, email, password,
  role: 'customer',
  approved: true   // Default true for customer
})
```

**Login Check (backend/routes/auth.js):**
```javascript
// Check if vendor/affiliate is approved
if ((user.role === 'vendor' || user.role === 'affiliate') && !user.approved) {
  return res.status(403).json({ 
    message: 'Your account is pending approval.',
    pending: true
  })
}
```

### Frontend Handling

**Registration Success (VendorRegister.jsx):**
```javascript
if (success) {
  return (
    <div className="bg-green-50">
      <h2>Registration Successful!</h2>
      <p>Your account is pending admin approval.</p>
      <p>You will be able to login once approved.</p>
    </div>
  )
}
```

**Login Error (VendorLogin.jsx):**
```javascript
if (err.response?.data?.pending) {
  setError('Your account is pending admin approval.')
}
```

---

## Testing the Flow

### Test Vendor Registration

1. **Register:**
   ```
   URL: http://localhost:3000/vendor/register
   Name: Test Vendor
   Email: testvendor@example.com
   Password: test123
   Business: Test Shop
   ```

2. **Try Login:**
   ```
   URL: http://localhost:3000/vendor/login
   Email: testvendor@example.com
   Password: test123
   Result: ❌ Pending approval message
   ```

3. **Admin Approve:**
   ```
   Login as admin
   Go to Pending Approvals
   Click Approve on Test Vendor
   ```

4. **Login Again:**
   ```
   URL: http://localhost:3000/vendor/login
   Email: testvendor@example.com
   Password: test123
   Result: ✅ Success! Dashboard opens
   ```

### Test Affiliate Registration

1. **Register:**
   ```
   URL: http://localhost:3000/affiliate/register
   Name: Test Affiliate
   Email: testaffiliate@example.com
   Password: test123
   Phone: 1234567890
   ```

2. **Try Login:**
   ```
   URL: http://localhost:3000/affiliate/login
   Email: testaffiliate@example.com
   Password: test123
   Result: ❌ Pending approval message
   ```

3. **Admin Approve:**
   ```
   Login as admin
   Go to Pending Approvals
   Click Approve on Test Affiliate
   ```

4. **Login Again:**
   ```
   URL: http://localhost:3000/affiliate/login
   Email: testaffiliate@example.com
   Password: test123
   Result: ✅ Success! Dashboard opens
   ```

---

## Admin Approval Interface

### Pending Approvals Tab

**Shows:**
- User name and email
- Role (Vendor or Affiliate)
- Registration date
- Business details (for vendors)
- Contact details (for affiliates)

**Actions:**
- **Approve Button:** Sets `approved: true`, user can login
- **Reject Button:** Deletes user account permanently

**Badge:**
- Red badge shows count of pending approvals
- Example: "Pending Approvals (2)"

---

## User Experience

### For Vendor/Affiliate

**Registration:**
1. Fill detailed form
2. Submit
3. See success message
4. Redirected to login page

**First Login Attempt:**
1. Enter credentials
2. See "Pending approval" message
3. Cannot access dashboard

**After Approval:**
1. Enter same credentials
2. Login successful
3. Access dashboard

### For Admin

**Notification:**
- Red badge on "Pending Approvals" tab
- Shows count of pending users

**Review:**
- See all user details
- Business information
- Contact information

**Decision:**
- Approve: User can login
- Reject: User account deleted

---

## Troubleshooting

### Issue: "Invalid credentials" instead of "Pending approval"

**Cause:** User not in database

**Solution:**
```bash
# Check database
mongosh
use clothesshop
db.users.find({ email: "your@email.com" })
```

### Issue: Can login without approval

**Cause:** User has `approved: true`

**Solution:**
```bash
# Check user status
db.users.findOne({ email: "your@email.com" })

# Should show: approved: false
```

### Issue: Registration not working

**Check:**
1. Backend running on port 5000
2. MongoDB running
3. Browser console for errors
4. Network tab for API calls

---

## Summary

✅ **Vendor:** Register → Pending → Admin Approve → Login
✅ **Affiliate:** Register → Pending → Admin Approve → Login
✅ **Customer:** Register → Auto Login (No approval needed)
✅ **Admin:** Always approved by default

**System is working as designed!** 🎉

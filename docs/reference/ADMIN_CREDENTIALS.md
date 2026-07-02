# 🔐 Admin Credentials

## Admin Login Details

### Email
```
admin@test.com
```

### Password
```
admin123
```

---

## 🎯 How to Login

1. Go to Admin Login page: `http://localhost:5173/admin/login`
2. Enter email: `admin@test.com`
3. Enter password: `admin123`
4. Click "Login"

---

## 📊 Other Test Accounts

### Vendor Account
- **Email:** `vendor@test.com`
- **Password:** `vendor123`
- **Status:** Approved ✅

### Affiliate Account
- **Email:** `affiliate@test.com`
- **Password:** `affiliate123`
- **Status:** Approved ✅

### Customer Account
- **Email:** `customer@test.com`
- **Password:** `customer123`
- **Status:** Approved ✅

### Pending Vendor (For Testing)
- **Email:** `pending.vendor@test.com`
- **Password:** `vendor123`
- **Status:** Pending (Not Approved) ⏳

### Pending Affiliate (For Testing)
- **Email:** `pending.affiliate@test.com`
- **Password:** `affiliate123`
- **Status:** Pending (Not Approved) ⏳

---

## 🚀 Admin Features Available

After login as admin, you can:

✅ **Team Management** - `/admin/team`
- Add team members
- Edit team members
- Delete team members
- Upload member images

✅ **Product Management**
- Add/Edit/Delete products
- Manage inventory
- View product analytics

✅ **Order Management**
- View all orders
- Update order status
- Track shipments

✅ **User Management**
- View all users
- Approve/Reject vendors
- Approve/Reject affiliates
- Manage user roles

✅ **Analytics Dashboard**
- View sales statistics
- Track revenue
- Monitor user activity

✅ **Content Management**
- Manage blog posts
- Manage testimonials
- Manage sliders
- Manage categories

---

## 💡 Important Notes

1. **Password:** `admin123` is a test password. Change it in production!
2. **Email:** `admin@test.com` is a test email. Use real email in production!
3. **Database:** These credentials are created by `seedData.js` script
4. **Reset:** Run `npm run seed` to reset all test data

---

## 🔄 Reset Admin Credentials

If you need to reset admin credentials:

1. Run the seed script:
```bash
cd backend
npm run seed
```

2. This will:
   - Clear all existing users
   - Create new test users with default credentials
   - Create sample products

---

## 🛡️ Security Tips

1. **Change Password:** After first login, change the admin password
2. **Use Strong Password:** In production, use a strong password
3. **Secure Email:** Use a real email address for admin account
4. **Backup:** Keep backup of admin credentials
5. **2FA:** Consider enabling 2-factor authentication

---

## 📝 First Time Setup

1. Login with admin credentials
2. Go to `/admin/team`
3. Add your team members
4. Customize your store settings
5. Add products
6. Configure payment gateway
7. Set up email notifications

---

**Status:** ✅ Ready to Use  
**Date:** April 2026  
**Version:** 1.0

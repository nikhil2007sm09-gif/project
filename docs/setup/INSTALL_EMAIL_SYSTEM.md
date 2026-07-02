# Quick Email System Installation

## Step 1: Install Nodemailer
```bash
cd backend
npm install nodemailer
```

## Step 2: Start Backend (Development Mode)
```bash
npm run dev
```

**Note:** Email system will work in development mode WITHOUT any configuration! Emails will be logged to console.

## Step 3: Test It!

1. Go to frontend: `http://localhost:5173/vendor/register`
2. Register a new vendor account
3. Check backend console - you'll see the email output!

Example console output:
```
📧 ===== VENDOR REGISTRATION EMAIL =====
To: vendor@example.com
Subject: Welcome to ClothesShop - Vendor Registration Successful
Vendor Name: John Doe
Status: Pending Admin Approval
========================================
```

## Optional: Setup Real Email Sending (Production)

### For Gmail (Quick Setup):

1. **Enable 2FA on Gmail**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Create password for "Mail"
   - Copy the 16-character password

3. **Update backend/.env**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   FRONTEND_URL=http://localhost:5173
   ```

4. **Restart Backend**
   ```bash
   npm run dev
   ```

Now real emails will be sent! 📧

## What Emails Are Sent?

### 1. Vendor Registration Email
- Sent when vendor registers
- Beautiful welcome template
- Shows pending approval status
- Includes next steps

### 2. Vendor Approval Email
- Sent when admin approves vendor
- Congratulations message
- Login button
- Getting started guide

## Need Help?

Check `EMAIL_SETUP_GUIDE.md` for detailed documentation!

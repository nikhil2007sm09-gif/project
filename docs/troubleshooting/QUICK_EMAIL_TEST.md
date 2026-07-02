# Quick Email Test Guide

## Current Status
✅ Nodemailer installed (v6.10.1)

## Test Email Service

### Option 1: Console Mode (No Email Setup Needed)

1. **Test Email Service:**
   ```bash
   cd backend
   npm run test-email
   ```
   
   You'll see email output in console like:
   ```
   📧 ===== VENDOR REGISTRATION EMAIL =====
   To: test@example.com
   Subject: Welcome to ClothesShop
   ...
   ```

2. **Start Backend:**
   ```bash
   npm run dev
   ```

3. **Register a Vendor:**
   - Go to: http://localhost:5173/vendor/register
   - Fill the form and submit
   - Check backend console for email output

### Option 2: Send Real Emails (Gmail Setup)

#### Step 1: Get Gmail App Password

1. **Enable 2FA on Gmail:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow steps to enable

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "ClothesShop Backend"
   - Click "Generate"
   - Copy the 16-character password (e.g., "abcd efgh ijkl mnop")

#### Step 2: Update .env File

Open `backend/.env` and update these lines:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

Replace:
- `your-actual-email@gmail.com` with your Gmail address
- `abcd efgh ijkl mnop` with your 16-character app password

#### Step 3: Restart Backend

```bash
# Stop backend (Ctrl+C)
# Start again
npm run dev
```

#### Step 4: Test Real Email

1. Register a new vendor
2. Check your Gmail inbox
3. You should receive a beautiful welcome email!

## Troubleshooting

### Email Not Showing in Console?

Check if backend is running:
```bash
npm run dev
```

Look for this line when vendor registers:
```
📧 ===== VENDOR REGISTRATION EMAIL =====
```

### Real Email Not Sending?

1. **Check .env file:**
   ```bash
   cat .env | grep EMAIL
   ```
   
   Should show:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

2. **Check App Password:**
   - Make sure you used App Password, not regular password
   - App Password is 16 characters with spaces

3. **Check Gmail Security:**
   - Go to: https://myaccount.google.com/notifications
   - Check for any blocked sign-in attempts
   - Allow the sign-in if blocked

4. **Test Email Service:**
   ```bash
   npm run test-email
   ```
   
   Check for error messages

### Common Errors

**Error: "Invalid login"**
- Using regular password instead of App Password
- Solution: Generate App Password from Google

**Error: "Connection timeout"**
- Firewall blocking port 587
- Solution: Check firewall settings

**Error: "Authentication failed"**
- Wrong email or password in .env
- Solution: Double-check credentials

## What Emails Are Sent?

### 1. Vendor Registration Email
**When:** Vendor creates account
**To:** Vendor's email
**Content:**
- Welcome message
- Account details
- Pending approval status
- What happens next
- Tips for success

### 2. Vendor Approval Email
**When:** Admin approves vendor
**To:** Vendor's email
**Content:**
- Congratulations message
- Login button
- Getting started guide

## Quick Commands

```bash
# Test email service
npm run test-email

# Start backend
npm run dev

# Check if nodemailer is installed
npm list nodemailer

# Reinstall nodemailer (if needed)
npm install nodemailer
```

## Need Help?

1. Check backend console for error messages
2. Run `npm run test-email` to test email service
3. Check `EMAIL_SETUP_GUIDE.md` for detailed setup
4. Make sure backend is running with `npm run dev`

## Current Mode

Without email configuration in .env:
- ✅ Emails log to console
- ✅ No real emails sent
- ✅ Perfect for testing

With email configuration in .env:
- ✅ Real emails sent to inbox
- ✅ Beautiful HTML templates
- ✅ Production ready

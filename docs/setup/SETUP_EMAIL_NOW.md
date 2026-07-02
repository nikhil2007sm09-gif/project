# 📧 Setup Email in 2 Minutes!

## Quick Setup (Automated)

### Step 1: Run Setup Script
```bash
cd backend
npm run setup-email
```

### Step 2: Follow Prompts
The script will ask you:
1. Choose Gmail setup or skip
2. Enter your Gmail address
3. Enter your App Password

### Step 3: Done!
The script will:
- ✅ Update .env file automatically
- ✅ Test email sending
- ✅ Send test email to your inbox

## Get Gmail App Password

### Quick Steps:
1. **Enable 2FA:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" → Enable it

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other"
   - Name it: "ClothesShop"
   - Click "Generate"
   - Copy the 16-character password

3. **Use in Setup:**
   - Run `npm run setup-email`
   - Paste your Gmail and App Password
   - Done!

## Preview Email Templates

Open this file in browser to see how emails look:
```
backend/emailPreview.html
```

Just double-click the file or open in Chrome/Firefox!

## Manual Setup (If Needed)

Edit `backend/.env` and add:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

Then restart backend:
```bash
npm run dev
```

## Test Email

After setup, test it:
```bash
npm run test-email
```

You should receive email in your inbox!

## What Happens After Setup?

When vendor registers:
- ✅ Beautiful welcome email sent automatically
- ✅ Shows pending approval status
- ✅ Includes next steps guide

When admin approves vendor:
- ✅ Congratulations email sent
- ✅ Login button included
- ✅ Getting started checklist

## Troubleshooting

### "Invalid login" error?
- Make sure you're using App Password, not regular password
- App Password is 16 characters (like: abcd efgh ijkl mnop)

### Email not received?
- Check spam folder
- Wait 2-3 minutes
- Verify email address is correct

### Still not working?
- Run: `npm run test-email`
- Check console for error messages
- Make sure 2FA is enabled on Gmail

## Commands

```bash
# Setup email (interactive)
npm run setup-email

# Test email service
npm run test-email

# Start backend
npm run dev
```

## Need Help?

1. Open `backend/emailPreview.html` to see templates
2. Check `EMAIL_SETUP_GUIDE.md` for detailed docs
3. Run `npm run test-email` to debug

That's it! Email system ready in 2 minutes! 🚀

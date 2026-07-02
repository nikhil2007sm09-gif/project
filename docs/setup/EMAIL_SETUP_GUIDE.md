# Email Notification System Setup Guide

## Overview
The email notification system sends beautiful HTML emails to vendors when they:
1. Register on the platform (Welcome email with pending approval status)
2. Get approved by admin (Approval confirmation email)

## Features
- ✅ Beautiful HTML email templates
- ✅ Responsive design for mobile and desktop
- ✅ Professional branding
- ✅ Development mode (logs to console)
- ✅ Production mode (sends real emails)

## Installation

### Step 1: Install Nodemailer
```bash
cd backend
npm install nodemailer
```

### Step 2: Configure Environment Variables

Add these to your `backend/.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173
```

## Gmail Setup (Recommended for Testing)

### Option 1: Using Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "ClothesShop Backend"
   - Copy the 16-character password

3. **Update .env file**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-character app password
   ```

### Option 2: Using Less Secure Apps (Not Recommended)

1. Go to: https://myaccount.google.com/lesssecureapps
2. Turn on "Allow less secure apps"
3. Use your regular Gmail password in EMAIL_PASS

⚠️ **Note:** This option is less secure and may not work with newer Gmail accounts.

## Other Email Providers

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-mailgun-username
EMAIL_PASS=your-mailgun-password
```

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

## Development Mode

If email credentials are NOT configured, the system will:
- Log emails to console instead of sending
- Show all email details in terminal
- Allow testing without real email setup

Example console output:
```
📧 ===== VENDOR REGISTRATION EMAIL =====
To: vendor@example.com
Subject: Welcome to ClothesShop - Vendor Registration Successful
Vendor Name: John Doe
Status: Pending Admin Approval
========================================
```

## Testing the Email System

### Test 1: Vendor Registration Email

1. Register a new vendor account:
   ```bash
   # Frontend: Go to /vendor/register
   # Fill the form and submit
   ```

2. Check console output (dev mode) or email inbox (production mode)

3. You should receive a welcome email with:
   - Welcome message
   - Account details
   - Pending approval status
   - Next steps information

### Test 2: Vendor Approval Email

1. Login as admin
2. Go to Admin Dashboard → Pending Approvals
3. Approve a vendor
4. Vendor should receive approval email with:
   - Congratulations message
   - Login button
   - Getting started guide

## Email Templates

### Registration Email Includes:
- 🎉 Welcome header with gradient
- 📧 Account information box
- ⏳ Pending approval badge
- 📋 What happens next section
- 🚀 Features after approval
- 💡 Tips for success

### Approval Email Includes:
- 🎊 Congratulations header
- ✅ Success icon
- 🔗 Login to dashboard button
- 🚀 Getting started checklist

## Customization

### Change Email Templates

Edit `backend/services/emailService.js`:

```javascript
const getVendorRegistrationTemplate = (vendorName, vendorEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <!-- Your custom HTML here -->
    </html>
  `
}
```

### Change Email Sender Name

In `emailService.js`:
```javascript
from: `"Your Store Name" <${process.env.EMAIL_USER}>`,
```

### Add More Email Types

1. Create new template function:
```javascript
const getCustomTemplate = (data) => {
  return `<!-- HTML template -->`
}
```

2. Create send function:
```javascript
export const sendCustomEmail = async (email, data) => {
  // Implementation
}
```

3. Import and use in routes:
```javascript
import { sendCustomEmail } from '../services/emailService.js'
await sendCustomEmail(user.email, data)
```

## Troubleshooting

### Email Not Sending

1. **Check Environment Variables**
   ```bash
   # In backend folder
   cat .env | grep EMAIL
   ```

2. **Check Console for Errors**
   - Look for error messages in terminal
   - Common issues: wrong password, blocked by Gmail

3. **Test SMTP Connection**
   ```javascript
   // Add to emailService.js temporarily
   transporter.verify((error, success) => {
     if (error) {
       console.log('SMTP Error:', error)
     } else {
       console.log('SMTP Ready:', success)
     }
   })
   ```

### Gmail Blocking Emails

1. Enable "Less secure app access" (temporary)
2. Use App Password instead (recommended)
3. Check Gmail security alerts
4. Whitelist your server IP

### Emails Going to Spam

1. Add SPF record to your domain
2. Add DKIM signature
3. Use verified email service (SendGrid, Mailgun)
4. Avoid spam trigger words in subject/body

## Production Deployment

### Recommended Services

1. **SendGrid** (Free tier: 100 emails/day)
   - Sign up: https://sendgrid.com
   - Get API key
   - Update .env with SendGrid credentials

2. **Mailgun** (Free tier: 5,000 emails/month)
   - Sign up: https://mailgun.com
   - Verify domain
   - Get SMTP credentials

3. **AWS SES** (Very cheap, pay as you go)
   - Sign up: https://aws.amazon.com/ses
   - Verify email/domain
   - Get SMTP credentials

### Environment Variables for Production

```env
# Production Email (SendGrid example)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxxxxxxxxxxxxxxxxxx

# Production Frontend URL
FRONTEND_URL=https://yourdomain.com
```

## Security Best Practices

1. ✅ Never commit .env file to git
2. ✅ Use App Passwords instead of real passwords
3. ✅ Use environment variables for all credentials
4. ✅ Enable 2FA on email accounts
5. ✅ Use dedicated email service in production
6. ✅ Monitor email sending limits
7. ✅ Implement rate limiting for email sending

## Email Sending Limits

### Gmail
- Free: 500 emails/day
- Google Workspace: 2,000 emails/day

### SendGrid
- Free: 100 emails/day
- Paid: Starting at $14.95/month for 40,000 emails

### Mailgun
- Free: 5,000 emails/month
- Paid: Pay as you go

## Future Enhancements

- [ ] Email queue system (Bull/Redis)
- [ ] Email templates in database
- [ ] Email analytics and tracking
- [ ] Unsubscribe functionality
- [ ] Email preferences for users
- [ ] Scheduled emails
- [ ] Email attachments support
- [ ] Multi-language email templates

## Support

If you face any issues:
1. Check console logs for errors
2. Verify .env configuration
3. Test with development mode first
4. Check email provider documentation
5. Review troubleshooting section above

## Files Modified

- ✅ `backend/services/emailService.js` - Email service with templates
- ✅ `backend/routes/auth.js` - Send email on vendor registration
- ✅ `backend/routes/admin.js` - Send email on vendor approval
- ✅ `backend/package.json` - Added nodemailer dependency
- ✅ `backend/.env.example` - Added email configuration

## Quick Start

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Configure .env (optional for testing)
# If not configured, emails will log to console

# 3. Start backend
npm run dev

# 4. Test vendor registration
# Go to frontend and register as vendor

# 5. Check console for email output (dev mode)
# Or check email inbox (production mode)
```

That's it! Your email notification system is ready! 🎉

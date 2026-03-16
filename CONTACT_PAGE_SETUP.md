# Contact Page - Complete Setup Guide

## Overview
Complete contact page implementation with backend API, email notifications, and beautiful frontend design. Contact messages are saved to MongoDB and admin receives email notifications.

## Features Implemented

### Backend Features
1. **Contact Model** (`backend/models/Contact.js`)
   - Name, email, phone, subject, message
   - Status tracking (new, read, replied, resolved)
   - Reply functionality
   - Timestamps (createdAt, updatedAt)

2. **Contact Routes** (`backend/routes/contact.js`)
   - `POST /api/contact` - Submit contact form (public)
   - `GET /api/contact` - Get all messages (admin only)
   - `GET /api/contact/:id` - Get single message (admin only)
   - `PATCH /api/contact/:id/status` - Update status (admin only)
   - `POST /api/contact/:id/reply` - Reply to message (admin only)
   - `DELETE /api/contact/:id` - Delete message (admin only)

3. **Email Notifications**
   - Admin receives email when user submits contact form
   - User receives confirmation email
   - User receives email when admin replies
   - Beautiful HTML email templates

### Frontend Features
1. **Contact Page** (`frontend/src/pages/Contact.jsx`)
   - Hero section with gradient background
   - Contact information cards (Email, Phone, Address, Hours)
   - Contact form with validation
   - FAQ section
   - Business hours display
   - Google Maps integration
   - Success/error messages
   - Loading states
   - Responsive design

2. **Form Fields**
   - Full Name (required)
   - Email Address (required)
   - Phone Number (optional)
   - Subject (required)
   - Message (required)

3. **Contact Info Cards**
   - Email: support@clothesshop.com
   - Phone: +91 1234567890
   - Address: Mumbai, Maharashtra, India
   - Hours: Mon-Sat 9AM-6PM

## File Structure

```
backend/
├── models/
│   └── Contact.js          # Contact message model
├── routes/
│   └── contact.js          # Contact API routes
├── services/
│   └── emailService.js     # Email templates (updated)
└── server.js               # Added contact routes

frontend/
├── src/
│   ├── pages/
│   │   └── Contact.jsx     # Contact page component
│   ├── components/
│   │   └── Navbar.jsx      # Added Contact link
│   └── App.jsx             # Added Contact route
```

## API Endpoints

### Public Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "subject": "Product Inquiry",
  "message": "I have a question about..."
}

Response: 201 Created
{
  "message": "Thank you for contacting us! We will get back to you soon.",
  "success": true
}
```

### Admin Endpoints (Require Authentication)

#### Get All Contact Messages
```http
GET /api/contact
Authorization: Bearer <admin_token>

Query Parameters:
- status: Filter by status (new, read, replied, resolved)

Response: 200 OK
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 1234567890",
    "subject": "Product Inquiry",
    "message": "I have a question...",
    "status": "new",
    "createdAt": "2026-03-09T10:30:00.000Z",
    "updatedAt": "2026-03-09T10:30:00.000Z"
  }
]
```

#### Get Single Contact Message
```http
GET /api/contact/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question...",
  "status": "read",
  "reply": null,
  "repliedAt": null,
  "repliedBy": null,
  "createdAt": "2026-03-09T10:30:00.000Z"
}
```

#### Update Contact Status
```http
PATCH /api/contact/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "read"
}

Response: 200 OK
{
  "message": "Status updated successfully",
  "contact": { ... }
}
```

#### Reply to Contact Message
```http
POST /api/contact/:id/reply
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reply": "Thank you for contacting us. Here's the answer..."
}

Response: 200 OK
{
  "message": "Reply sent successfully",
  "contact": { ... }
}
```

#### Delete Contact Message
```http
DELETE /api/contact/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "message": "Contact message deleted successfully"
}
```

## Email Templates

### 1. Contact Notification Email (to Admin)
Sent when user submits contact form:
- Contact details (name, email, phone)
- Subject and message
- Timestamp
- Reply-to functionality

### 2. Contact Reply Email (to User)
Sent when admin replies:
- Original subject
- Admin's reply
- Professional formatting
- Support contact info

## Database Schema

```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  status: String (enum: ['new', 'read', 'replied', 'resolved']),
  reply: String,
  repliedAt: Date,
  repliedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Add to `backend/.env`:
```env
# Email Configuration (already configured)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (optional, defaults to EMAIL_USER)
ADMIN_EMAIL=admin@clothesshop.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173
```

## Usage

### For Users

1. **Visit Contact Page**
   ```
   http://localhost:5173/contact
   ```

2. **Fill Contact Form**
   - Enter name, email, subject, message
   - Optional: phone number
   - Click "Send Message"

3. **Receive Confirmation**
   - Success message on page
   - Confirmation email (if configured)

### For Admins

1. **View Contact Messages**
   ```javascript
   // In Admin Dashboard (future enhancement)
   GET /api/contact
   ```

2. **Read Message**
   ```javascript
   GET /api/contact/:id
   // Status automatically changes to 'read'
   ```

3. **Reply to Message**
   ```javascript
   POST /api/contact/:id/reply
   {
     "reply": "Your response here..."
   }
   // User receives email with reply
   ```

4. **Update Status**
   ```javascript
   PATCH /api/contact/:id/status
   {
     "status": "resolved"
   }
   ```

## Testing

### Test Contact Form Submission

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Submit Form**
   - Go to http://localhost:5173/contact
   - Fill all required fields
   - Click "Send Message"
   - Check for success message

4. **Check Backend Console**
   ```
   📧 ===== CONTACT NOTIFICATION EMAIL =====
   To: admin@clothesshop.com
   From: John Doe <john@example.com>
   Subject: Product Inquiry
   Message: I have a question...
   ========================================
   ```

5. **Check MongoDB**
   ```javascript
   db.contacts.find().pretty()
   ```

### Test Admin Reply

```bash
# Using curl or Postman
curl -X POST http://localhost:5000/api/contact/:id/reply \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"reply": "Thank you for your inquiry..."}'
```

## Design Features

### Hero Section
- Gradient background (purple-pink-red)
- Animated background elements
- Clear heading and description
- Badge with icon

### Contact Info Cards
- 4 cards with icons
- Gradient backgrounds
- Hover effects (scale, shadow)
- Clickable links

### Contact Form
- Clean, modern design
- Input validation
- Loading states
- Success/error messages
- Required field indicators
- Focus states with purple ring

### FAQ Section
- 4 common questions
- Card-based layout
- Hover effects
- Easy to read

### Business Hours
- Clear schedule display
- Border separators
- Highlighted closed days

### Google Maps
- Embedded map
- Rounded corners
- Shadow effect
- Full width responsive

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked form and FAQ
- Touch-friendly inputs
- Mobile-optimized map

### Tablet (768px - 1024px)
- 2 column grid for contact info
- Side-by-side form and FAQ
- Balanced spacing

### Desktop (> 1024px)
- 4 column grid for contact info
- Optimal spacing
- Full-width map
- Large, readable text

## Future Enhancements

### Admin Dashboard Integration
1. Contact messages tab
2. Inbox with filters (new, read, replied)
3. Quick reply functionality
4. Status management
5. Search and filter
6. Export to CSV

### Additional Features
1. File attachments
2. Priority levels
3. Department routing
4. Auto-responses
5. Ticket system
6. Live chat integration
7. WhatsApp integration
8. Social media links

### Analytics
1. Response time tracking
2. Message volume stats
3. Common topics analysis
4. Customer satisfaction ratings

## Troubleshooting

### Form Not Submitting
- Check backend is running
- Check MongoDB connection
- Check console for errors
- Verify API endpoint

### Email Not Sending
- Check EMAIL_* env variables
- Check email service logs
- Verify SMTP credentials
- Check spam folder

### Success Message Not Showing
- Check form validation
- Check API response
- Check state updates
- Check console errors

## Security

### Implemented
- Input validation
- XSS protection (React escapes by default)
- CORS configuration
- Admin-only endpoints
- Authentication required for admin routes

### Recommendations
- Rate limiting for contact form
- CAPTCHA for spam prevention
- Email verification
- Content filtering
- IP blocking for abuse

## Conclusion

Contact page ab fully functional hai with:
- ✅ Beautiful, modern design
- ✅ Form validation
- ✅ Email notifications
- ✅ MongoDB storage
- ✅ Admin management
- ✅ Reply functionality
- ✅ Mobile responsive
- ✅ Google Maps integration
- ✅ FAQ section
- ✅ Business hours

Users ab easily contact kar sakte hain aur admin messages manage kar sakta hai! 🎉

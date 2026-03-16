# Complete E-Commerce Website Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Features Overview](#features-overview)
3. [Installation Guide](#installation-guide)
4. [User Guides](#user-guides)
5. [Admin Guide](#admin-guide)
6. [Developer Guide](#developer-guide)
7. [Troubleshooting](#troubleshooting)

---

## Introduction

Yeh ek complete e-commerce website hai jo clothes shop ke liye banayi gayi hai. Ismein customer shopping, vendor product management, affiliate marketing, aur admin control - sab kuch hai.

### Key Highlights
- ✅ Multiple user roles (Customer, Vendor, Affiliate, Admin)
- ✅ Product management with 5 images per product
- ✅ Blog system with categories
- ✅ Approval system for vendors and affiliates
- ✅ Payment gateway integration (Razorpay)
- ✅ Responsive design (Mobile, Tablet, Desktop)

---

## Features Overview

### 1. Customer Features
**Shopping:**
- Browse products by category
- View product details with image gallery
- Select size (S, M, L, XL, XXL)
- Add to cart with quantity
- Checkout with shipping details
- Razorpay payment integration

**Account:**
- Register and login
- View profile
- Order history
- Track orders

**Blog:**
- Read blog articles
- Filter by category
- View blog details

### 2. Vendor Features
**Registration:**
- Fill business details
- GST number (optional)
- Wait for admin approval

**Product Management:**
- Add products with up to 5 images
- Set price, stock, category
- Edit existing products
- Delete products
- View all products in dashboard

### 3. Affiliate Features
**Registration:**
- Fill contact details
- Website/social media (optional)
- Wait for admin approval

**Marketing:**
- Get unique affiliate link
- Share with audience
- Track clicks and sales
- Earn 10% commission on sales

### 4. Admin Features
**User Management:**
- Approve/reject vendor registrations
- Approve/reject affiliate registrations
- View all users
- Manage user accounts

**Content Management:**
- Create blog categories
- Write and publish blogs
- Add images to blogs
- Manage blog tags

**Analytics:**
- Total users, products, orders
- Revenue tracking
- Recent orders
- User statistics

---

## Installation Guide

### Step 1: Prerequisites

Install karna hai:
- Node.js (v16+): https://nodejs.org
- MongoDB: https://www.mongodb.com/try/download/community
- Git (optional): https://git-scm.com

### Step 2: Download Project

```bash
# If using git
git clone <repository-url>
cd e-commerce-clothes-shop

# Or download ZIP and extract
```

### Step 3: Backend Setup

```bash
cd backend
npm install
```

### Step 4: Create Test Data

```bash
# Create test users
npm run create-users

# Create sample blogs and categories
npm run seed-blogs
```

Output dikhega:
```
✅ Admin user created: admin@test.com
✅ Vendor user created: vendor@test.com
✅ Affiliate user created: affiliate@test.com
✅ All test users ready!
```

### Step 5: Start Backend

```bash
npm run dev
```

Terminal mein dikhega:
```
MongoDB connected
Server running on port 5000
```

### Step 6: Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

Terminal mein dikhega:
```
VITE ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Step 7: Open Browser

Go to: http://localhost:3000

---

## User Guides

### Customer Guide

**1. Registration:**
- Click "Login" → "Register"
- Fill: Name, Email, Password
- Click "Register"
- Automatically logged in

**2. Shopping:**
- Browse products on homepage
- Click category (Men/Women/Kids)
- Click product to view details
- Select size and quantity
- Click "Add to Cart"

**3. Checkout:**
- Click cart icon (top right)
- Review items
- Click "Proceed to Checkout"
- Fill shipping address
- Click "Pay Now"
- Complete Razorpay payment

**4. View Orders:**
- Click profile icon → "Orders"
- See all your orders
- Check order status

### Vendor Guide

**1. Registration:**
- Go to: http://localhost:3000/vendor/register
- Fill all details:
  - Name, Email, Password
  - Business Name
  - Business Address
  - Phone Number
  - GST Number (optional)
- Click "Register as Vendor"
- Wait for admin approval

**2. Login (After Approval):**
- Go to: http://localhost:3000/vendor/login
- Enter email and password
- Click "Login as Vendor"

**3. Add Product:**
- Click "Add Product" button
- Fill product details:
  - Name
  - Description
  - Price
  - Stock quantity
  - Category (Men/Women/Kids)
- Add up to 5 image URLs
- Click "Add Product"

**4. Manage Products:**
- View all products in dashboard
- Click "Edit" to update product
- Click "Delete" to remove product

### Affiliate Guide

**1. Registration:**
- Go to: http://localhost:3000/affiliate/register
- Fill details:
  - Name, Email, Password
  - Phone Number
  - Website (optional)
  - Social Media (optional)
- Click "Register as Affiliate"
- Wait for admin approval

**2. Get Affiliate Link:**
- Login after approval
- Copy your unique affiliate link
- Share on social media, website, etc.

**3. Track Performance:**
- View total clicks
- View total sales
- View commission earned

---

## Admin Guide

### Login
- Email: admin@test.com
- Password: admin123

### Dashboard Overview

**Tabs:**
1. Overview - Statistics
2. Pending Approvals - Approve vendors/affiliates
3. All Users - User management
4. Orders - Order management
5. Categories - Blog categories
6. Blogs - Blog management

### Approve Vendors/Affiliates

**Step 1:** Click "Pending Approvals" tab

**Step 2:** Review user details:
- Name, Email, Role
- Business details
- Registration date

**Step 3:** Decision:
- Click "Approve" - User can now login
- Click "Reject" - User account deleted

### Manage Blog Categories

**Step 1:** Click "Categories" tab

**Step 2:** Click "Add Category"

**Step 3:** Fill:
- Name (e.g., "Fashion Tips")
- Description
- Image URL (optional)
- Active checkbox

**Step 4:** Click "Create Category"

### Manage Blogs

**Step 1:** Click "Blogs" tab

**Step 2:** Click "Add Blog"

**Step 3:** Fill:
- Title
- Excerpt (short description)
- Content (full article)
- Image URL
- Select Category
- Tags (comma separated)
- Check "Published" to make live

**Step 4:** Click "Create Blog"

**View Blog:** Go to http://localhost:3000/blog

---

## Developer Guide

### Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # State management
│   ├── pages/          # Page components
│   ├── utils/          # Utilities (axios)
│   └── App.jsx         # Main app component

backend/
├── models/             # Database schemas
├── routes/             # API endpoints
├── middleware/         # Auth middleware
└── server.js           # Express server
```

### Database Models

**User:**
- name, email, password (hashed)
- role: customer/vendor/affiliate/admin
- approved: boolean
- businessDetails: object

**Product:**
- name, description, price
- category: men/women/kids
- stock: number
- images: array (up to 5)
- vendor: reference to User

**Order:**
- user: reference to User
- items: array of products
- shippingAddress: object
- totalAmount: number
- status: pending/processing/shipped/delivered
- paymentId: string

**Blog:**
- title, slug, content
- excerpt, image
- category: reference to Category
- author: reference to User
- published: boolean
- views: number
- tags: array

**Category:**
- name, slug
- description, image
- active: boolean

### API Endpoints

**Authentication:**
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

**Products:**
```
GET    /api/products
GET    /api/products/:id
POST   /api/products (vendor/admin)
PUT    /api/products/:id (vendor/admin)
DELETE /api/products/:id (vendor/admin)
GET    /api/products/vendor/my-products (vendor)
```

**Orders:**
```
POST /api/orders
GET  /api/orders/my-orders
```

**Blogs:**
```
GET    /api/blogs
GET    /api/blogs/:slug
GET    /api/blogs/admin/all (admin)
POST   /api/blogs (admin)
PUT    /api/blogs/:id (admin)
DELETE /api/blogs/:id (admin)
```

**Categories:**
```
GET    /api/categories
POST   /api/categories (admin)
PUT    /api/categories/:id (admin)
DELETE /api/categories/:id (admin)
```

**Admin:**
```
GET   /api/admin/stats
GET   /api/admin/pending-approvals
PATCH /api/admin/approve-user/:id
PATCH /api/admin/reject-user/:id
GET   /api/admin/users
GET   /api/admin/orders
```

### Adding New Features

**1. Add New Model:**
```javascript
// backend/models/NewModel.js
import mongoose from 'mongoose'

const newSchema = new mongoose.Schema({
  field1: String,
  field2: Number
}, { timestamps: true })

export default mongoose.model('NewModel', newSchema)
```

**2. Add New Route:**
```javascript
// backend/routes/newRoute.js
import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  // Your logic
})

export default router
```

**3. Register Route:**
```javascript
// backend/server.js
import newRoutes from './routes/newRoute.js'
app.use('/api/new', newRoutes)
```

**4. Add Frontend Page:**
```javascript
// frontend/src/pages/NewPage.jsx
const NewPage = () => {
  return <div>New Page</div>
}
export default NewPage
```

**5. Add Route:**
```javascript
// frontend/src/App.jsx
import NewPage from './pages/NewPage'
<Route path="/new" element={<NewPage />} />
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Not Running**
```bash
# Start MongoDB
mongod

# Check if running
mongosh
```

**2. Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in backend/.env
PORT=5001
```

**3. Login Not Working**
```bash
# Re-create users
cd backend
npm run create-users
```

**4. Images Not Showing**
- Check image URL is valid
- Check image URL starts with http:// or https://
- Try opening URL in browser

**5. Blog Not Appearing**
- Make sure "Published" is checked
- Check category is created
- Refresh page

**6. Vendor/Affiliate Can't Login**
- Check if admin approved the account
- Login as admin
- Go to "Pending Approvals"
- Approve the user

### Debug Mode

**Browser Console (F12):**
- See error messages
- Check API calls in Network tab
- View localStorage data

**Backend Terminal:**
- See API requests
- Check database queries
- View error logs

### Reset Everything

```bash
# Stop both servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules
npm install
npm run create-users
npm run seed-blogs
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm run dev

# Browser
# Clear localStorage
localStorage.clear()
# Hard refresh (Ctrl+Shift+R)
```

---

## Support

**Documentation Files:**
- README.md - Quick start
- QUICKSTART.md - Fast setup
- BLOG_SETUP.md - Blog features
- APPROVAL_SYSTEM.md - Approval workflow
- TROUBLESHOOTING.md - Debug guide
- COMPLETE_GUIDE.md - This file

**Test URLs:**
- Homepage: http://localhost:3000
- Products: http://localhost:3000/products
- Blog: http://localhost:3000/blog
- Admin: http://localhost:3000/admin/dashboard
- Vendor: http://localhost:3000/vendor/dashboard
- Affiliate: http://localhost:3000/affiliate/dashboard

---

**Happy Coding! 🚀**

Made with ❤️ using React, Node.js, and MongoDB

# Pura Project - Folder Structure Guide

## Current Status: ✅ WELL-ORGANIZED

Aapka project structure bilkul sahi hai! Yeh ek professional aur scalable structure hai.

---

## 📁 BACKEND STRUCTURE

```
backend/
├── config/                 # Configuration files
│   ├── config.js          # General configuration
│   └── db.js              # Database connection
├── controllers/           # Business logic (currently empty - routes mein logic hai)
├── middleware/            # Express middleware
│   ├── auth.js            # Authentication middleware
│   └── upload.js          # File upload middleware
├── models/                # Database models (Mongoose schemas)
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   ├── AffiliateLink.js
│   ├── AffiliateCommission.js
│   ├── Blog.js
│   ├── Testimonial.js
│   ├── Slider.js
│   ├── Contact.js
│   ├── Color.js
│   ├── Size.js
│   └── ... (Archive models)
├── routes/                # API routes
│   ├── auth.js            # Authentication routes
│   ├── admin.js           # Admin routes
│   ├── affiliate.js       # Affiliate system routes
│   ├── products.js        # Product routes
│   ├── orders.js          # Order routes
│   ├── payment.js         # Payment routes
│   ├── blogs.js           # Blog routes
│   ├── contact.js         # Contact routes
│   └── ... (other routes)
├── services/              # Business logic & external services
│   ├── emailService.js    # Email sending
│   ├── smsService.js      # SMS/OTP service
│   └── archiveService.js  # Archive operations
├── scripts/               # Utility scripts
│   ├── seedData.js        # Database seeding
│   ├── testEmail.js       # Email testing
│   └── ... (other scripts)
├── uploads/               # Uploaded files (images, etc.)
├── utils/                 # Utility functions (currently empty)
├── .env                   # Environment variables
├── .env.example           # Example env file
├── package.json           # Dependencies
└── server.js              # Main server file
```

---

## 📁 FRONTEND STRUCTURE

```
frontend/
├── src/
│   ├── assets/
│   │   └── images/        # Static images
│   ├── components/        # Reusable React components
│   │   ├── common/        # Common components (Header, Footer, etc.)
│   │   ├── layout/        # Layout components
│   │   ├── ui/            # UI components (Buttons, Cards, etc.)
│   │   ├── CartDrawer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ... (other components)
│   ├── constants/         # Constants & configuration
│   │   └── api.js         # API endpoints
│   ├── context/           # React Context (State management)
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/             # Custom React hooks (currently empty)
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSizes.jsx
│   │   │   └── ...
│   │   ├── affiliate/     # Affiliate pages
│   │   │   └── AffiliateDashboard.jsx
│   │   ├── auth/          # Authentication pages
│   │   ├── customer/      # Customer pages
│   │   │   ├── Home.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── ...
│   │   ├── vendor/        # Vendor pages
│   │   └── ProductDetail.jsx
│   ├── services/          # API services
│   │   ├── api.js         # API calls
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── axios.js       # Axios configuration
│   │   ├── wishlistUtils.js
│   │   └── affiliateTracker.js
│   ├── img/               # Images folder
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .gitignore
```

---

## ✅ STRUCTURE KE FAYDE

1. **Separation of Concerns** - Har cheez apni jagah par hai
2. **Scalability** - Naye features add karna aasan hai
3. **Maintainability** - Code ko samajhna aur maintain karna aasan hai
4. **Team Collaboration** - Multiple developers easily kaam kar sakte hain

---

## 🔧 IMPROVEMENTS (Optional)

### Backend Improvements:

1. **Controllers folder ko use karo** - Routes se logic nikaal kar controllers mein rakh do
   ```
   backend/controllers/
   ├── authController.js
   ├── productController.js
   ├── orderController.js
   └── ...
   ```

2. **Utils folder ko populate karo** - Common utility functions
   ```
   backend/utils/
   ├── validators.js
   ├── errorHandler.js
   ├── helpers.js
   └── ...
   ```

3. **Constants folder banao**
   ```
   backend/constants/
   ├── messages.js
   ├── statusCodes.js
   └── ...
   ```

### Frontend Improvements:

1. **Hooks folder ko use karo** - Custom hooks banao
   ```
   frontend/src/hooks/
   ├── useAuth.js
   ├── useCart.js
   ├── useFetch.js
   └── ...
   ```

2. **Common components organize karo**
   ```
   frontend/src/components/common/
   ├── Header.jsx
   ├── Footer.jsx
   ├── Navbar.jsx
   └── ...
   ```

3. **UI components separate karo**
   ```
   frontend/src/components/ui/
   ├── Button.jsx
   ├── Card.jsx
   ├── Modal.jsx
   └── ...
   ```

---

## 📊 CURRENT FEATURES STRUCTURE

- ✅ Authentication (User, Admin, Affiliate)
- ✅ Product Management
- ✅ Shopping Cart
- ✅ Orders & Payments (Razorpay)
- ✅ Affiliate System
- ✅ Admin Dashboard
- ✅ Blog System
- ✅ Contact Form
- ✅ Email & SMS Services
- ✅ Archive System
- ✅ Testimonials & Sliders

---

## 🚀 NEXT STEPS

1. Controllers folder ko implement karo
2. Utils folder ko organize karo
3. Custom hooks banao
4. Components ko better organize karo

**Aapka structure already professional level ka hai!** 🎉

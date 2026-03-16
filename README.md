# ClothesShop E-Commerce Website

Complete full-stack e-commerce website for clothes shop with React frontend and Node.js backend.

## 🌟 Quick Links

- **Complete Guide:** [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) - Full documentation
- **Quick Start:** [QUICKSTART.md](QUICKSTART.md) - Fast setup in 5 minutes
- **Blog Setup:** [BLOG_SETUP.md](BLOG_SETUP.md) - Blog system guide
- **Approval System:** [APPROVAL_SYSTEM.md](APPROVAL_SYSTEM.md) - Vendor/Affiliate approval
- **Troubleshooting:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Debug guide

## ✨ Features

- 🛍️ **Shopping:** Browse products, cart, checkout with Razorpay
- 📦 **Vendor:** Product management with 5 images per product
- 💰 **Affiliate:** Marketing with commission tracking
- 👨‍💼 **Admin:** Complete dashboard with approval system
- 📝 **Blog:** Content management with categories
- 🔐 **Security:** JWT auth, role-based access
- 📱 **Responsive:** Mobile, tablet, desktop friendly

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### 2. Create Test Data

```bash
cd backend
npm run create-users    # Creates test users
npm run seed-blogs      # Creates sample blogs
```

### 3. Start Servers

```bash
# Backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

### 4. Open Browser

Go to: http://localhost:3000

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| Vendor | vendor@test.com | vendor123 |
| Affiliate | affiliate@test.com | affiliate123 |
| Customer | customer@test.com | customer123 |

## 📚 Documentation

### For Users
- [Customer Guide](COMPLETE_GUIDE.md#customer-guide) - Shopping and orders
- [Vendor Guide](COMPLETE_GUIDE.md#vendor-guide) - Product management
- [Affiliate Guide](COMPLETE_GUIDE.md#affiliate-guide) - Marketing and commissions

### For Admins
- [Admin Guide](COMPLETE_GUIDE.md#admin-guide) - Dashboard and approvals
- [Blog Management](BLOG_SETUP.md) - Create and manage blogs
- [User Approval](APPROVAL_SYSTEM.md) - Approve vendors/affiliates

### For Developers
- [Developer Guide](COMPLETE_GUIDE.md#developer-guide) - API and architecture
- [Project Structure](COMPLETE_GUIDE.md#project-structure) - Code organization
- [Adding Features](COMPLETE_GUIDE.md#adding-new-features) - Extend the system

## 🛠️ Tech Stack

**Frontend:** React 18, Tailwind CSS, React Router, Axios, Vite

**Backend:** Node.js, Express, MongoDB, JWT, Razorpay

## 📦 Key Features

### Multiple Images Per Product
- Upload up to 5 images per product
- Image gallery with thumbnails
- Click to view different images

### Blog System
- Create and publish blogs
- Category management
- Tags support
- View counter

### Approval System
- Vendors need admin approval
- Affiliates need admin approval
- Review business details before approval

### Payment Integration
- Razorpay payment gateway
- Secure transactions
- Order tracking

## 🐛 Troubleshooting

**MongoDB not running?**
```bash
mongod
```

**Port already in use?**
```bash
npx kill-port 5000
```

**Login not working?**
```bash
cd backend
npm run create-users
```

**More help:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📞 Support

Check these files for help:
1. [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) - Everything you need
2. [QUICKSTART.md](QUICKSTART.md) - Fast setup
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

## 🎯 What's Included

✅ Complete authentication system
✅ Product management with images
✅ Shopping cart and checkout
✅ Payment gateway integration
✅ Blog system with categories
✅ Vendor approval workflow
✅ Affiliate marketing system
✅ Admin dashboard
✅ Order management
✅ Responsive design
✅ Test data and accounts

## 📄 License

Open source for educational purposes.

---

**Made with ❤️ using React, Node.js, and MongoDB**

**Happy Coding! 🚀**

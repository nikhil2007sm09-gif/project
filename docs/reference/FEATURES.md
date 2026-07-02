# Features List

## 🛍️ Customer Features

### Shopping
- Browse all products
- Filter by category (Men, Women, Kids)
- View product details
- Select size (S, M, L, XL, XXL)
- Add to cart with quantity
- View cart
- Update cart quantities
- Remove items from cart

### Checkout
- Enter shipping address
- View order summary
- Razorpay payment integration
- Order confirmation

### Account
- Register new account
- Login/Logout
- View profile
- View order history
- Track order status

## 👔 Vendor Features

### Product Management
- Add new products
- Set product details:
  - Name
  - Description
  - Price
  - Category
  - Stock quantity
- View all vendor products
- Product listing in vendor dashboard

### Dashboard
- View all products added by vendor
- Product statistics

## 🤝 Affiliate Features

### Tracking
- Unique affiliate code
- Affiliate link generation
- Click tracking
- Sales tracking
- Commission calculation (10% of sales)

### Dashboard
- Total clicks
- Total sales
- Total commission earned
- Copy affiliate link

## 👨‍💼 Admin Features

### Analytics Dashboard
- Total users count
- Total products count
- Total orders count
- Total revenue

### User Management
- View all users
- User details (name, email, role)
- Recent users list

### Order Management
- View all orders
- Order details
- Order status
- Customer information
- Recent orders list

### Product Management
- View all products from all vendors
- Product statistics

## 🔐 Authentication System

### Multiple User Types
- Customer
- Vendor
- Affiliate
- Admin

### Unified Login Page
- Single page for all user types
- Switch between user types
- Role-based access control
- JWT token authentication

### Security
- Password hashing (bcrypt)
- JWT tokens
- Protected routes
- Role-based authorization

## 💳 Payment Integration

### Razorpay
- Secure payment gateway
- Test mode ready
- Order creation
- Payment verification
- Transaction tracking

## 🎨 UI/UX Features

### Responsive Design
- Mobile-friendly
- Tablet-friendly
- Desktop optimized
- Tailwind CSS styling

### Navigation
- Sticky navbar
- Shopping cart icon with badge
- User dropdown menu
- Role-based menu items
- Footer with links

### User Experience
- Loading states
- Error messages
- Success notifications
- Form validation
- Smooth transitions

## 🔧 Technical Features

### Frontend
- React 18
- React Router for navigation
- Context API for state management
- Axios for API calls
- Lucide React icons
- Vite build tool

### Backend
- Node.js + Express
- MongoDB database
- Mongoose ODM
- JWT authentication
- RESTful API
- CORS enabled

### Database Models
- User (with roles)
- Product
- Order
- Affiliate tracking

### API Endpoints
- `/api/auth/*` - Authentication
- `/api/products/*` - Products
- `/api/orders/*` - Orders
- `/api/payment/*` - Payments
- `/api/admin/*` - Admin operations
- `/api/affiliate/*` - Affiliate tracking

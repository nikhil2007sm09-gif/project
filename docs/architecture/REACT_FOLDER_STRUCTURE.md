# React Folder Structure Guide

## Current Structure
```
frontend/src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/
│   ├── About.jsx
│   ├── AdminBlogs.jsx
│   ├── AdminCategories.jsx
│   ├── AdminDashboard.jsx
│   ├── AffiliateDashboard.jsx
│   ├── AffiliateLogin.jsx
│   ├── AffiliateRegister.jsx
│   ├── BlogDetail.jsx
│   ├── BlogList.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Orders.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── TestAuth.jsx
│   ├── UnifiedLogin.jsx
│   ├── VendorDashboard.jsx
│   ├── VendorLogin.jsx
│   └── VendorRegister.jsx
├── utils/
│   └── axios.js
├── App.jsx
├── index.css
└── main.jsx
```

## Recommended Improved Structure

```
frontend/src/
├── assets/                          # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── placeholder.png
│   ├── icons/
│   │   └── social-icons/
│   └── fonts/
│
├── components/                      # Reusable components
│   ├── common/                      # Common UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.module.css
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── Card.module.css
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.module.css
│   │   ├── Loader/
│   │   │   ├── Loader.jsx
│   │   │   └── Loader.module.css
│   │   └── Badge/
│   │       ├── Badge.jsx
│   │       └── Badge.module.css
│   │
│   ├── layout/                      # Layout components
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.module.css
│   │   └── Layout.jsx
│   │
│   ├── features/                    # Feature-specific components
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   └── ProductSearch.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CartEmpty.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── blog/
│   │       ├── BlogCard.jsx
│   │       ├── BlogList.jsx
│   │       └── BlogContent.jsx
│   │
│   └── index.js                     # Export all components
│
├── context/                         # React Context API
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ThemeContext.jsx
│   └── index.js
│
├── hooks/                           # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useFetch.js
│   └── index.js
│
├── pages/                           # Page components (organized by role)
│   ├── public/                      # Public pages
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Products/
│   │   │   ├── Products.jsx
│   │   │   └── Products.module.css
│   │   ├── ProductDetail/
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ProductDetail.module.css
│   │   └── Blog/
│   │       ├── BlogList.jsx
│   │       └── BlogDetail.jsx
│   │
│   ├── customer/                    # Customer pages
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── Register/
│   │   │   └── Register.jsx
│   │   ├── Profile/
│   │   │   └── Profile.jsx
│   │   ├── Cart/
│   │   │   └── Cart.jsx
│   │   ├── Checkout/
│   │   │   └── Checkout.jsx
│   │   └── Orders/
│   │       └── Orders.jsx
│   │
│   ├── vendor/                      # Vendor pages
│   │   ├── Login/
│   │   │   └── VendorLogin.jsx
│   │   ├── Register/
│   │   │   └── VendorRegister.jsx
│   │   └── Dashboard/
│   │       └── VendorDashboard.jsx
│   │
│   ├── affiliate/                   # Affiliate pages
│   │   ├── Login/
│   │   │   └── AffiliateLogin.jsx
│   │   ├── Register/
│   │   │   └── AffiliateRegister.jsx
│   │   └── Dashboard/
│   │       └── AffiliateDashboard.jsx
│   │
│   └── admin/                       # Admin pages
│       ├── Dashboard/
│       │   └── AdminDashboard.jsx
│       ├── Products/
│       │   └── AdminProducts.jsx
│       ├── Categories/
│       │   └── AdminCategories.jsx
│       └── Blogs/
│           └── AdminBlogs.jsx
│
├── services/                        # API services
│   ├── api/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   ├── blogService.js
│   │   └── categoryService.js
│   ├── axios.js                     # Axios instance
│   └── index.js
│
├── utils/                           # Utility functions
│   ├── formatters.js                # Format currency, dates, etc.
│   ├── validators.js                # Form validation
│   ├── helpers.js                   # Helper functions
│   └── constants.js                 # App constants
│
├── constants/                       # Constants and configs
│   ├── routes.js                    # Route paths
│   ├── apiEndpoints.js              # API endpoints
│   └── config.js                    # App configuration
│
├── styles/                          # Global styles
│   ├── globals.css
│   ├── variables.css
│   └── themes.css
│
├── App.jsx                          # Main App component
├── index.css                        # Global CSS
└── main.jsx                         # Entry point
```

## Benefits of This Structure

### 1. **Scalability**
- Easy to add new features without cluttering
- Clear separation of concerns
- Organized by feature and role

### 2. **Maintainability**
- Easy to find and update components
- Consistent naming conventions
- Clear file organization

### 3. **Reusability**
- Common components can be reused across pages
- Custom hooks for shared logic
- Centralized services for API calls

### 4. **Team Collaboration**
- Clear structure for multiple developers
- Easy to understand project organization
- Reduced merge conflicts

## File Naming Conventions

### Components
- **PascalCase** for component files: `ProductCard.jsx`
- **PascalCase** for component folders: `ProductCard/`
- **camelCase** for utility files: `formatters.js`

### Folders
- **lowercase** for feature folders: `products/`, `cart/`
- **PascalCase** for component folders: `Button/`, `Modal/`

## Example Component Structure

```jsx
// components/common/Button/Button.jsx
import './Button.module.css'

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
```

## Example Service Structure

```javascript
// services/api/productService.js
import axios from '../axios'

export const productService = {
  getAll: async (params) => {
    const response = await axios.get('/api/products', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await axios.get(`/api/products/${id}`)
    return response.data
  },
  
  create: async (data) => {
    const response = await axios.post('/api/products', data)
    return response.data
  },
  
  update: async (id, data) => {
    const response = await axios.put(`/api/products/${id}`, data)
    return response.data
  },
  
  delete: async (id) => {
    const response = await axios.delete(`/api/products/${id}`)
    return response.data
  }
}
```

## Example Custom Hook

```javascript
// hooks/useAuth.js
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  
  return context
}
```

## Migration Steps (Optional)

If you want to migrate to this structure:

### Step 1: Create New Folders
```bash
cd frontend/src
mkdir -p assets/images assets/icons assets/fonts
mkdir -p components/common components/layout components/features
mkdir -p hooks services constants styles
mkdir -p pages/public pages/customer pages/vendor pages/affiliate pages/admin
```

### Step 2: Move Existing Files
```bash
# Move layout components
mv components/Navbar.jsx components/layout/Navbar/
mv components/Footer.jsx components/layout/Footer/

# Move auth component
mv components/ProtectedRoute.jsx components/features/auth/

# Organize pages by role
mv pages/Home.jsx pages/public/Home/
mv pages/About.jsx pages/public/About/
mv pages/Products.jsx pages/public/Products/
mv pages/ProductDetail.jsx pages/public/ProductDetail/

mv pages/Login.jsx pages/customer/Login/
mv pages/Register.jsx pages/customer/Register/
mv pages/Cart.jsx pages/customer/Cart/
mv pages/Checkout.jsx pages/customer/Checkout/
mv pages/Orders.jsx pages/customer/Orders/
mv pages/Profile.jsx pages/customer/Profile/

mv pages/VendorLogin.jsx pages/vendor/Login/
mv pages/VendorRegister.jsx pages/vendor/Register/
mv pages/VendorDashboard.jsx pages/vendor/Dashboard/

mv pages/AffiliateLogin.jsx pages/affiliate/Login/
mv pages/AffiliateRegister.jsx pages/affiliate/Register/
mv pages/AffiliateDashboard.jsx pages/affiliate/Dashboard/

mv pages/AdminDashboard.jsx pages/admin/Dashboard/
mv pages/AdminCategories.jsx pages/admin/Categories/
mv pages/AdminBlogs.jsx pages/admin/Blogs/
```

### Step 3: Update Imports
Update all import paths in files to reflect new structure.

### Step 4: Create Index Files
Create `index.js` files to export components for easier imports.

## Best Practices

### 1. **Component Organization**
- One component per file
- Keep components small and focused
- Use composition over inheritance

### 2. **State Management**
- Use Context for global state
- Use local state for component-specific data
- Consider Redux for complex state

### 3. **Code Splitting**
- Use React.lazy() for route-based splitting
- Load heavy components on demand
- Optimize bundle size

### 4. **Performance**
- Memoize expensive calculations
- Use React.memo for pure components
- Optimize re-renders

### 5. **Testing**
- Write unit tests for utilities
- Write integration tests for features
- Use React Testing Library

## Additional Folders (As Needed)

```
├── __tests__/           # Test files
├── types/               # TypeScript types (if using TS)
├── locales/             # i18n translations
├── config/              # Configuration files
└── lib/                 # Third-party library configs
```

## Conclusion

This structure provides:
- ✅ Clear organization
- ✅ Easy navigation
- ✅ Scalable architecture
- ✅ Better maintainability
- ✅ Team-friendly structure

You can adopt this structure gradually or all at once based on your project needs!

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyOtp: '/auth/verify-otp',
    sendOtp: '/auth/send-otp',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  products: {
    getAll: '/products',
    getById: '/products/:id',
    getByCategory: '/products/category/:categoryId',
    search: '/products/search'
  },
  orders: {
    getAll: '/orders',
    getById: '/orders/:id',
    create: '/orders',
    updateStatus: '/orders/:id/status'
  },
  payment: {
    create: '/payment/create',
    verify: '/payment/verify'
  },
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    products: '/admin/products',
    orders: '/admin/orders',
    stats: '/admin/stats'
  },
  affiliate: {
    dashboard: '/affiliate/dashboard',
    links: '/affiliate/links',
    commissions: '/affiliate/commissions',
    clicks: '/affiliate/clicks'
  },
  vendor: {
    dashboard: '/vendor/dashboard',
    products: '/vendor/products',
    orders: '/vendor/orders'
  },
  categories: {
    getAll: '/categories',
    getById: '/categories/:id'
  },
  blogs: {
    getAll: '/blogs',
    getById: '/blogs/:id',
    getByCategory: '/blogs/category/:categoryId'
  },
  contact: {
    submit: '/contact'
  },
  upload: {
    single: '/upload/single',
    multiple: '/upload/multiple'
  },
  sizes: {
    getAll: '/sizes'
  },
  colors: {
    getAll: '/colors'
  },
  testimonials: {
    getAll: '/testimonials'
  },
  sliders: {
    getAll: '/sliders'
  }
}

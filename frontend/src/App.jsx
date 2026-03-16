import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import UnifiedLogin from './pages/UnifiedLogin'
import Login from './pages/Login'
import Register from './pages/Register'
import VendorLogin from './pages/VendorLogin'
import VendorRegister from './pages/VendorRegister'
import AffiliateLogin from './pages/AffiliateLogin'
import AffiliateRegister from './pages/AffiliateRegister'
import VendorDashboard from './pages/VendorDashboard'
import AffiliateDashboard from './pages/AffiliateDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminBlogs from './pages/AdminBlogs'
import AdminCategories from './pages/AdminCategories'
import AdminSizes from './pages/AdminSizes'
import AdminColors from './pages/AdminColors'
import AdminLogin from './pages/AdminLogin'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import TestAuth from './pages/TestAuth'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ShippingDelivery from './pages/ShippingDelivery'
import CancellationRefund from './pages/CancellationRefund'
import Product from './pages/Product'






function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Product />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-delivery" element={<ShippingDelivery />} />
                <Route path="/cancellation-refund" element={<CancellationRefund />} />
                <Route path="/login" element={<UnifiedLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/customer/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vendor/login" element={<VendorLogin />} />
                <Route path="/vendor/register" element={<VendorRegister />} />
                <Route path="/affiliate/login" element={<AffiliateLogin />} />
                <Route path="/affiliate/register" element={<AffiliateRegister />} />
                <Route path="/test-auth" element={<TestAuth />} />
                <Route 
                  path="/vendor/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                      <VendorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/affiliate/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['affiliate', 'admin']}>
                      <AffiliateDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blogs" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminBlogs />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/categories" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminCategories />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/sizes" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminSizes />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/colors" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminColors />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
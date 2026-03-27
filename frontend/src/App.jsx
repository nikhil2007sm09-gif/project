import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider, CartContext } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnMount from './components/ScrollToTopOnMount'
import ProtectedRoute from './components/ProtectedRoute'
import { getAffiliateCodeFromURL, storeAffiliateCode, trackAffiliateClick } from './utils/affiliateTracker'
import Home from './pages/customer/Home'
import About from './pages/customer/About'
import Contact from './pages/customer/Contact'

import ProductDetail from './pages/customer/ProductDetail'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderSuccess from './pages/customer/OrderSuccess'
import UnifiedLogin from './pages/auth/UnifiedLogin'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VendorLogin from './pages/vendor/VendorLogin'
import VendorRegister from './pages/vendor/VendorRegister'
import AffiliateLogin from './pages/affiliate/AffiliateLogin'
import AffiliateRegister from './pages/affiliate/AffiliateRegister'
import VendorDashboard from './pages/vendor/VendorDashboard'
import AffiliateDashboard from './pages/affiliate/AffiliateDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminCategories from './pages/admin/AdminCategories'
import AdminSizes from './pages/admin/AdminSizes'
import AdminColors from './pages/admin/AdminColors'
import AdminLogin from './pages/admin/AdminLogin'
import Profile from './pages/customer/Profile'
import Orders from './pages/customer/Orders'
import BlogList from './pages/customer/BlogList'
import BlogDetail from './pages/customer/BlogDetail'
import TermsConditions from './pages/customer/TermsConditions'
import PrivacyPolicy from './pages/customer/PrivacyPolicy'
import ShippingDelivery from './pages/customer/ShippingDelivery'
import CancellationRefund from './pages/customer/CancellationRefund'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminSliders from './pages/admin/AdminSliders'
import Product from './pages/customer/Product'

function AffiliateTracker() {
  useEffect(() => {
    // Check for affiliate code in URL
    const affiliateCode = getAffiliateCodeFromURL()
    if (affiliateCode) {
      // Store affiliate code
      storeAffiliateCode(affiliateCode)
      
      // Track the click
      trackAffiliateClick(affiliateCode)
      
      // Clean URL (remove ref parameter) without page reload
      const url = new URL(window.location)
      url.searchParams.delete('ref')
      window.history.replaceState({}, document.title, url.toString())
    }
  }, [])

  return null
}

function AppContent() {
  const { isCartDrawerOpen, closeCartDrawer } = useContext(CartContext)
  
  return (
    <>
      <AffiliateTracker />
      <ScrollToTopOnMount />
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
              path="/admin/testimonials" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTestimonials />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/sliders" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSliders />
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
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
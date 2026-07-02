import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'

// Components
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CartDrawer from '../components/Cart/CartDrawer'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToTopOnMount from '../components/common/ScrollToTopOnMount'
import ProtectedRoute from '../components/ProtectedRoute'

// Utils
import { getAffiliateCodeFromURL, storeAffiliateCode, trackAffiliateClick } from '../utils/affiliateTracker'

// Pages
import Home from '../pages/customer/Home'
import About from '../pages/customer/About'
import ContactPage from '../pages/customer/ContactPage'
import Product from '../components/AllProduct/Product'
import ProductDetail from '../components/AllProduct/ProductDetail'
import ProductShare from '../components/AllProduct/ProductShare'
import Cart from '../components/Cart/Cart'
import Checkout from '../pages/customer/Checkout'
import OrderSuccess from '../pages/customer/OrderSuccess'
import BlogList from '../components/AllBlogPages/BlogList'
import BlogDetail from '../components/AllBlogPages/BlogDetail'
import Profile from '../pages/customer/Profile'
import Orders from '../pages/customer/Orders'

// Legal Pages
import TermsConditions from '../components/FooterPages/TermsConditions'
import PrivacyPolicy from '../components/FooterPages/PrivacyPolicy'
import ShippingDelivery from '../components/FooterPages/ShippingDelivery'
import CancellationRefund from '../components/FooterPages/CancellationRefund'

// Auth Pages
import UnifiedLogin from '../pages/auth/UnifiedLogin'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VendorLogin from '../components/vendor/VendorLogin'
import VendorRegister from '../components/vendor/VendorRegister'
import AffiliateLogin from '../pages/affiliate/AffiliateLogin'
import AffiliateRegister from '../pages/affiliate/AffiliateRegister'

// Dashboards
import VendorDashboard from '../components/vendor/VendorDashboard'
import AffiliateDashboard from '../pages/affiliate/AffiliateDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminBlogs from '../pages/admin/AdminBlogs'
import AdminCategories from '../pages/admin/AdminCategories'
import AdminSizes from '../pages/admin/AdminSizes'
import AdminColors from '../pages/admin/AdminColors'
import AdminTestimonials from '../pages/admin/AdminTestimonials'
import AdminSliders from '../pages/admin/AdminSliders'
import AdminTeam from '../pages/admin/AdminTeam'

// Affiliate Tracking Component
function AffiliateTracker() {
  useEffect(() => {
    const affiliateCode = getAffiliateCodeFromURL()
    if (affiliateCode) {
      storeAffiliateCode(affiliateCode)
      trackAffiliateClick(affiliateCode)
      
      const url = new URL(window.location)
      url.searchParams.delete('ref')
      window.history.replaceState({}, document.title, url.toString())
    }
  }, [])

  return null
}

export default function AppRoutes() {
  const { isCartDrawerOpen, closeCartDrawer } = useContext(CartContext)
  
  return (
    <>
      <AffiliateTracker />
      <ScrollToTopOnMount />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Customer Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/:id/share" element={<ProductShare />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            
            {/* Legal Routes */}
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/cancellation-refund" element={<CancellationRefund />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<UnifiedLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/customer/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/affiliate/login" element={<AffiliateLogin />} />
            <Route path="/affiliate/register" element={<AffiliateRegister />} />
            
            {/* Protected Customer Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            
            {/* Protected Vendor Routes */}
            <Route 
              path="/vendor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                  <VendorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Affiliate Routes */}
            <Route 
              path="/affiliate/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['affiliate', 'admin']}>
                  <AffiliateDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute allowedRoles={['admin']}><AdminBlogs /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/sizes" element={<ProtectedRoute allowedRoles={['admin']}><AdminSizes /></ProtectedRoute>} />
            <Route path="/admin/colors" element={<ProtectedRoute allowedRoles={['admin']}><AdminColors /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute allowedRoles={['admin']}><AdminTestimonials /></ProtectedRoute>} />
            <Route path="/admin/sliders" element={<ProtectedRoute allowedRoles={['admin']}><AdminSliders /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute allowedRoles={['admin']}><AdminTeam /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
      
      {/* Global UI Drawers */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />
    </>
  )
}
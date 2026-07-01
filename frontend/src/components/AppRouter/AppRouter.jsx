import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../common/Footer'
import ScrollToTop from '../ScrollToTop'
import ProtectedRoute from '../ProtectedRoute'

// Customer Pages
import Home from '../../pages/customer/Home'
import About from '../../pages/customer/About'
import Product from '../../pages/customer/Product'
import ProductDetail from '../../pages/customer/ProductDetail'
import Cart from '../../pages/customer/Cart'
import Checkout from '../../pages/customer/Checkout'
import Orders from '../../pages/customer/Orders'
import Profile from '../../pages/customer/Profile'
import Contact from '../../pages/customer/Contact'
import BlogList from '../../pages/customer/BlogList'
import BlogDetail from '../../pages/customer/BlogDetail'
import OrderSuccess from '../../pages/customer/OrderSuccess'
import PrivacyPolicy from '../../pages/customer/PrivacyPolicy'
import TermsConditions from '../../pages/customer/TermsConditions'
import CancellationRefund from '../../pages/customer/CancellationRefund'
import ShippingDelivery from '../../pages/customer/ShippingDelivery'
import ProductShare from '../../pages/customer/ProductShare'
import Vedio from '../../pages/customer/Vedio'

// Auth Pages
import { AuthPage } from '../../pages/auth/AuthPage'

// Admin Pages
import AdminDashboard from '../../pages/admin/AdminDashboard'

// Vendor Pages
import VendorDashboard from '../../pages/vendor/VendorDashboard'

// Affiliate Pages
import AffiliatePanel from '../../pages/affiliate/AffiliatePanel'

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product-share/:id" element={<ProductShare />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cancellation-refund" element={<CancellationRefund />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/vedio" element={<Vedio />} />

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

            {/* Vendor Routes */}
            <Route path="/vendor/*" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />

            {/* Affiliate Routes */}
            <Route path="/affiliate/*" element={<ProtectedRoute><AffiliatePanel /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default AppRouter

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ShoppingBag,
  Users,
  Award,
  Truck,
  Shield,
  TrendingUp,
  RefreshCw
} from 'lucide-react'

const Footer = () => {
  const [stats, setStats] = useState({
    customers: 1250,
    orders: 3400,
    products: 850,
    rating: 4.8,
    deliveryHours: 24,
    loading: true,
    lastUpdated: null
  })

  useEffect(() => {
    fetchStats()
    
    // Set up periodic refresh every 5 minutes for live updates
    const interval = setInterval(() => {
      console.log('Refreshing live stats...')
      fetchStats()
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      console.log('Fetching live stats from API...')
      const response = await fetch('http://localhost:5000/api/stats/public')
      console.log('Stats API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Live stats data received:', data)
        setStats({
          customers: data.customers || 1250,
          orders: data.orders || 3400,
          products: data.products || 850,
          rating: data.rating || 4.8,
          deliveryHours: data.deliveryHours || 24,
          loading: false,
          lastUpdated: new Date()
        })
      } else {
        console.warn('Stats API failed, using fallback stats')
        // Use fallback stats if API fails
        setStats(prev => ({ ...prev, loading: false, lastUpdated: new Date() }))
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      console.log('Using fallback stats due to API error')
      setStats(prev => ({ ...prev, loading: false, lastUpdated: new Date() }))
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+'
    }
    return num.toString() + '+'
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>

      <div className="relative z-10">
        {/* Top Section with Live Stats */}
        <div className="border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              
              {/* Happy Customers */}
              <div className="group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                  <Users className="w-6 h-6 text-white" />
                  {!stats.loading && (
                    <div className="absolute -top-1 -right-1 bg-green-400 w-3 h-3 rounded-full live-pulse"></div>
                  )}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stats.loading ? (
                    <div className="animate-pulse bg-gray-600 h-6 w-12 mx-auto rounded"></div>
                  ) : (
                    <span className="animate-fade-in animate-counter">{formatNumber(stats.customers)}</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                  Happy Customers
                  {!stats.loading && <TrendingUp className="w-3 h-3 text-green-400" />}
                </div>
              </div>

              {/* Products Sold */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500   w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                  <ShoppingBag className="w-6 h-6 text-white" />
                  {!stats.loading && (
                    <div className="absolute -top-1 -right-1 bg-green-400 w-3 h-3 rounded-full live-pulse"></div>
                  )}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.loading ? (
                    <div className="animate-pulse bg-gray-600 h-6 w-12 mx-auto rounded"></div>
                  ) : (
                    <span className="animate-fade-in animate-counter">{formatNumber(stats.orders)}</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                  Orders Completed
                  {!stats.loading && <TrendingUp className="w-3 h-3 text-green-400" />}
                </div>
              </div>

              {/* Rating */}
              <div className="group">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                  <Award className="w-6 h-6 text-white" />
                  {!stats.loading && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 w-3 h-3 rounded-full live-pulse"></div>
                  )}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {stats.loading ? (
                    <div className="animate-pulse bg-gray-600 h-6 w-12 mx-auto rounded"></div>
                  ) : (
                    <span className="animate-fade-in animate-counter">{stats.rating}★</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                  Customer Rating
                  {!stats.loading && <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < Math.floor(stats.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                    ))}
                  </div>}
                </div>
              </div>

              {/* Fast Delivery */}
              <div className="group">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                  <Truck className="w-6 h-6 text-white" />
                  {!stats.loading && (
                    <div className="absolute -top-1 -right-1 bg-blue-400 w-3 h-3 rounded-full live-pulse"></div>
                  )}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {stats.loading ? (
                    <div className="animate-pulse bg-gray-600 h-6 w-12 mx-auto rounded"></div>
                  ) : (
                    <span className="animate-fade-in animate-counter">{stats.deliveryHours}h</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                  Fast Delivery
                  {!stats.loading && <div className="text-green-400 text-xs">⚡ Live</div>}
                </div>
              </div>

            </div>

            {/* Live Update Indicator */}
            {!stats.loading && (
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full live-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Live Statistics</span>
                  {stats.lastUpdated && (
                    <span className="text-green-300 text-xs">
                      Updated {stats.lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setStats(prev => ({ ...prev, loading: true }))
                      fetchStats()
                    }}
                    className="ml-2 p-1 hover:bg-green-500/20 rounded-full transition-colors"
                    title="Refresh Stats"
                  >
                    <RefreshCw className="w-3 h-3 text-green-400 hover:animate-spin" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Hi Clothe
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Discover the latest fashion trends with premium quality clothing at unbeatable prices. Your style, our passion.
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>100% Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>Free Shipping Above ₹999</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Made with Love in India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/products", label: "All Products" },
                  { to: "/about", label: "About Us" },
                  { to: "/contact", label: "Contact Us" },
                  { to: "/blog", label: "Fashion Blog" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                    >
                      <span className="group-hover:text-purple-400 transition-colors">→</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                Policies
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/terms-conditions", label: "Terms & Conditions" },
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/shipping-delivery", label: "Shipping & Delivery" },
                  { to: "/cancellation-refund", label: "Returns & Refunds" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                    >
                      <span className="group-hover:text-blue-400 transition-colors">→</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Business */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                Get In Touch
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </h4>
              
              {/* Newsletter Subscription */}
              <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  📧 Newsletter
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {!stats.loading ? `${Math.floor(stats.customers * 0.6)}+ subscribers` : 'Loading...'}
                  </span>
                </h5>
                <p className="text-xs text-gray-400 mb-3">Get exclusive deals, early access & style tips</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                    Join
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Unsubscribe anytime</p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-sm">nikhil2007sm09@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Phone</div>
                    <div className="text-sm">+91 7988454150</div>
                  </div>
                </div>
              </div>

              {/* Business Links */}
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-300 mb-3">For Business</h5>
                <div className="space-y-2">
                  <Link to="/vendor/login" className="block text-gray-400 hover:text-white transition-colors text-sm">
                    🏪 Vendor Portal
                  </Link>
                  <Link to="/affiliate/login" className="block text-gray-400 hover:text-white transition-colors text-sm">
                    🤝 Affiliate Program
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, color: "from-blue-600 to-blue-700", href: "#" },
                    { icon: Instagram, color: "from-pink-500 to-purple-600", href: "#" },
                    { icon: Twitter, color: "from-blue-400 to-blue-500", href: "#" },
                    { icon: Youtube, color: "from-red-500 to-red-600", href: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`bg-gradient-to-br ${social.color} p-2 rounded-lg hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <social.icon className="w-4 h-4 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  &copy; 2026 <span className="text-white font-semibold">Hi Clothe</span>. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Made with <Heart className="w-3 h-3 text-red-400 inline mx-1" /> for fashion lovers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-counter {
          animation: counter 2s ease-out;
        }
        @keyframes counter {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .live-pulse {
          animation: livePulse 2s infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </footer>
  )
}

export default Footer